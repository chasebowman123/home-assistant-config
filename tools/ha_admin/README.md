# HA Admin Tools

Scripts for administering the Home Assistant instance remotely (entity
cleanup, bulk audits, etc.). These are **tooling**, not HA `scripts:` — they
live under `tools/` to stay out of HA's config scan path.

## Prerequisites

All scripts read credentials from environment variables. Never hardcode.

```bash
# macOS: load from Keychain into the current shell
export HA_TOKEN=$(security find-generic-password -a "$USER" -s HA_TOKEN -w)
export HA_WS_URL="wss://<your-nabu-casa-id>.ui.nabu.casa/api/websocket"
```

Python 3.10+ and the `websockets` package:

```bash
python3 -m pip install --user websockets
```

## Scripts

### `list_entities_by_platform.py`

Dump entity_ids filtered by integration platform. Used to build target lists
for bulk cleanup.

```bash
# all entities for a platform
python3 tools/ha_admin/list_entities_by_platform.py browser_mod

# only the ones currently unavailable/unknown
python3 tools/ha_admin/list_entities_by_platform.py tplink --unavailable-only

# inventory every platform with counts
python3 tools/ha_admin/list_entities_by_platform.py --all-platforms
```

Output goes to stdout (one entity_id per line), diagnostics to stderr, so
you can pipe it safely:

```bash
python3 tools/ha_admin/list_entities_by_platform.py browser_mod \
  > tools/ha_admin/targets/01_browser_mod.txt
```

## Safety

- Scripts never print the token.
- Mutating scripts (future `cleanup_entities.py`) default to dry-run and
  require `--apply` to actually change anything.
- Target lists are committed so every run is reviewable in git.
