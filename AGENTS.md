# Home Assistant Configuration — Agent Rules

## Owner
Edward Eidam (edwarde@gmail.com)

## System
- **HA Instance**: HA Green running Home Assistant 2026.3.x
- **Remote Access**: Nabu Casa (WebSocket + MCP)
- **Repo**: `chasebowman123/home-assistant-config` (main branch)
- **Architecture**: UI-created automations live in `.storage/` on the live system; this repo holds YAML-based automations in `automation/` subdirectories

## YAML Format (2024+ required)

All automation YAML **must** use the current format:

| Correct (2024+) | Deprecated (do not use) |
|---|---|
| `triggers:` | ~~`trigger:`~~ |
| `conditions:` | ~~`condition:`~~ |
| `actions:` | ~~`action:`~~ |
| `action: light.turn_on` | ~~`service: light.turn_on`~~ |
| `action: switch.turn_off` | ~~`service: switch.turn_off`~~ |

Service calls use `action:` not `service:` inside action blocks.

## Safety Rules

1. **No physical environment changes without explicit approval** — read-only operations by default
2. **Never store credentials in files** — use environment variables (`HA_TOKEN`, `HA_WS_URL`) only
3. **Check `input_boolean.loretta_notifications`** before sending any notification to Loretta's phone
4. **Check `input_boolean.edward_bedroom`** before triggering bedroom alert automations (e.g. Lucas door alerts at night)
5. Do not modify `.storage/` files directly — use the HA API or UI for live system changes

## Key Entities

### Notification Targets
- Edward's iPhone: `notify.mobile_app_ee_iphone_16_pro_max`
- Loretta's notifications gated by: `input_boolean.loretta_notifications`

### Important Toggles
- `input_boolean.motion_detection` — global motion-triggered lighting
- `input_boolean.loretta_working` — Loretta working from home (suppresses office automations)
- `input_boolean.edward_bedroom` — Edward bedroom mode (gates bedroom alerts)
- `input_boolean.loretta_notifications` — Loretta notification consent

### Media Players (Bridstow Place)
- `media_player.edward_s_firetvstick` — Fire TV Stick Lite
- `media_player.edward_s_fire_tv` — Fire TV Stick
- `media_player.edward_s_fire` — Fire TV Cube (lounge)
- `media_player.bridstow_fire_cube` — Fire TV Cube (other)

## Directory Structure

```
automation/          # YAML automations organised by room/function
  alerts/
  bathroom/
  bedroom/
  cloakroom/
  climate/
  doorbell/
  hallway/
  house/
  loretta/
  lounge/
  lucas_room/
  lucas_bathroom/
  maintenance/
  monitoring/
  nanny/
  office/
  outside/
  routines/
  security/
binary_sensors/      # Custom binary sensor templates
dashboards/          # Lovelace dashboard YAML
input_boolean/       # Toggle helpers
input_datetime/      # DateTime helpers
input_number/        # Number helpers
input_select/        # Dropdown helpers
input_text/          # Text helpers
packages/            # Package configurations
scripts/             # Script definitions
sensors/             # Custom sensor templates
themes/              # UI themes
```

## Commit Conventions

- Use clear, descriptive commit messages
- Prefix with area: `automation: fix office light trigger`, `dashboard: update lounge layout`
- One logical change per commit where possible

## Known Issues

- `automations.yaml` in repo root is empty — all live automations are UI-created in `.storage/`
- Several integrations have stale/unavailable entities (Alexa accounts for ~140)
- `light.office_lamp` (Edison bulb) frequently goes unavailable
- Motion sensors: use `binary_sensor.office_motion_sensor_occupancy` (Zigbee, reliable), not `binary_sensor.office_motion` (dead)
