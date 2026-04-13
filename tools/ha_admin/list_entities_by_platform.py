#!/usr/bin/env python3
"""
List entities in the HA entity registry, filtered by platform (integration).

Reads credentials from env:
    HA_TOKEN   — long-lived access token
    HA_WS_URL  — e.g. wss://<id>.ui.nabu.casa/api/websocket

Usage:
    python3 tools/ha_admin/list_entities_by_platform.py browser_mod
    python3 tools/ha_admin/list_entities_by_platform.py tplink --unavailable-only
    python3 tools/ha_admin/list_entities_by_platform.py --all-platforms  # just counts

Output: one entity_id per line to stdout (sorted), diagnostics to stderr.
Never prints the token.
"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
from collections import Counter

try:
    import websockets  # type: ignore
except ImportError:
    sys.stderr.write(
        "error: `websockets` package missing. Install with:\n"
        "  python3 -m pip install --user websockets\n"
    )
    sys.exit(2)


def _require_env(name: str) -> str:
    val = os.environ.get(name, "")
    if not val:
        sys.stderr.write(
            f"error: ${name} is not set. Export it before running, e.g.:\n"
            f'  export HA_TOKEN=$(security find-generic-password -a "$USER" -s HA_TOKEN -w)\n'
            f'  export HA_WS_URL="wss://<your-nabu-casa-id>.ui.nabu.casa/api/websocket"\n'
        )
        sys.exit(2)
    return val


async def fetch_entity_registry() -> list[dict]:
    url = _require_env("HA_WS_URL")
    token = _require_env("HA_TOKEN")

    async with websockets.connect(url, max_size=None) as ws:
        hello = json.loads(await ws.recv())
        if hello.get("type") != "auth_required":
            raise RuntimeError(f"unexpected handshake: {hello}")

        await ws.send(json.dumps({"type": "auth", "access_token": token}))
        auth_result = json.loads(await ws.recv())
        if auth_result.get("type") != "auth_ok":
            raise RuntimeError(
                f"auth failed: {auth_result.get('message', auth_result)}"
            )

        await ws.send(json.dumps({"id": 1, "type": "config/entity_registry/list"}))
        reply = json.loads(await ws.recv())
        if not reply.get("success", False):
            raise RuntimeError(f"registry list failed: {reply}")

        return reply["result"]


async def fetch_states() -> dict[str, str]:
    """Fetch current states so we can mark entities as unavailable/unknown."""
    url = _require_env("HA_WS_URL")
    token = _require_env("HA_TOKEN")

    async with websockets.connect(url, max_size=None) as ws:
        json.loads(await ws.recv())
        await ws.send(json.dumps({"type": "auth", "access_token": token}))
        json.loads(await ws.recv())
        await ws.send(json.dumps({"id": 1, "type": "get_states"}))
        reply = json.loads(await ws.recv())
        if not reply.get("success", False):
            raise RuntimeError(f"get_states failed: {reply}")
        return {s["entity_id"]: s["state"] for s in reply["result"]}


async def main_async(args: argparse.Namespace) -> int:
    entities = await fetch_entity_registry()

    if args.all_platforms:
        counts = Counter(e.get("platform", "<none>") for e in entities)
        sys.stderr.write(f"total entities: {len(entities)}\n")
        sys.stderr.write("per-platform counts:\n")
        for platform, n in counts.most_common():
            print(f"{n:5d}  {platform}")
        return 0

    platform = args.platform
    matching = [e for e in entities if e.get("platform") == platform]

    if not matching:
        sys.stderr.write(f"no entities found with platform={platform!r}\n")
        sys.stderr.write(
            f"hint: run with --all-platforms to see available platforms\n"
        )
        return 1

    if args.unavailable_only:
        states = await fetch_states()
        bad = {"unavailable", "unknown", "none"}
        matching = [
            e
            for e in matching
            if states.get(e["entity_id"], "unavailable").lower() in bad
        ]

    ids = sorted(e["entity_id"] for e in matching)
    sys.stderr.write(f"found {len(ids)} entities on platform={platform!r}")
    if args.unavailable_only:
        sys.stderr.write(" (unavailable/unknown only)")
    sys.stderr.write("\n")

    for eid in ids:
        print(eid)
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    group = p.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "platform",
        nargs="?",
        help="platform name to filter by, e.g. browser_mod, tplink, mobile_app",
    )
    group.add_argument(
        "--all-platforms",
        action="store_true",
        help="instead of filtering, print a count per platform",
    )
    p.add_argument(
        "--unavailable-only",
        action="store_true",
        help="only include entities whose current state is unavailable/unknown",
    )
    args = p.parse_args()

    try:
        return asyncio.run(main_async(args))
    except KeyboardInterrupt:
        return 130
    except Exception as e:
        sys.stderr.write(f"error: {e}\n")
        return 1


if __name__ == "__main__":
    sys.exit(main())
