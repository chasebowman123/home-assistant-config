# Eidam Smart Home — Home Assistant Configuration

[Home Assistant](https://home-assistant.io/) is the core of the Eidam household smart home. This repo includes all custom packages, sensors, automations, scripts, and dashboards.

## Deployment

Home Assistant runs on a [Home Assistant Green](https://www.home-assistant.io/green/) with a [Synology DS224+](https://www.synology.com/) NAS for Docker containers, media serving (Plex), and backups. [Nabu Casa](https://www.nabucasa.com/) provides remote access.

## Key Software

- [Home Assistant](https://home-assistant.io/)
- [Philips Hue](https://www.philips-hue.com/) for lighting
- [Tado](https://www.tado.com/) for climate control
- [Ring](https://ring.com/) for security
- [Sonos](https://www.sonos.com/) for audio
- [TP-Link Tapo](https://www.tp-link.com/) for smart plugs

---

## Documentation

| Document | Description |
|----------|-------------|
| [Rooms](docs/ROOMS.md) | Room modes, state management, and occupancy |
| [People](docs/PEOPLE.md) | Person entities, presence detection, notifications |
| [Automations](docs/AUTOMATIONS.md) | Automation architecture and highlights |
| [Devices](docs/DEVICES.md) | Complete hardware inventory |

---

## Architecture

The configuration follows a modular, room-centric approach inspired by [johnkoht/hassio-config](https://github.com/johnkoht/hassio-config). Instead of large monolithic automations, each room is an independent state machine with its own modes, occupancy tracking, and automations.

### Room State Machines

Every room has an `input_select` that manages its current mode. Automations respond to mode changes, creating a clean separation of concerns.

```
House State (Auto/Away/Bedtime/Quiet/Vacation)
  ├── Lounge (Auto/Movie/Music/Off)
  ├── Bedroom (Auto/Relaxing/Bedtime/Off)
  ├── Lucas Room (Awake/Napping/Bedtime/Away)
  ├── Kitchen (Auto/Cooking/Off)
  └── Office (Available/DnD/Off)
```

### Key Booleans

| Boolean | Purpose |
|---------|---------|
| `house_occupied` | Person tracking — is anyone home? |
| `guest_mode` | Guests visiting — less aggressive automations |
| `quiet_mode` | Lucas sleeping — suppress TTS, dim hallway |
| `lighting_automations` | Global toggle for motion-triggered lighting |
| `bad_weather` | Weather is poor — add warm ambient lighting |
| `goodnight_active` | Bedtime routine has fired |

### File Structure

```
├── automation/              # Individual automation files by room/category
│   ├── alerts/              # System alerts and notifications
│   ├── bedroom/modes/       # Bedroom state automations
│   ├── hallway/lights/      # Hallway motion lighting
│   ├── house/modes/         # House-level mode changes
│   ├── house/occupancy/     # Presence-based house state
│   ├── kitchen/             # Kitchen modes + lighting
│   ├── lounge/              # Lounge modes + auto-movie detection
│   ├── lucas_room/          # Lucas room + door alerts
│   ├── office/              # Office modes + motion lighting
│   ├── security/            # Alarm, doorbell, outside lights
│   └── weather/             # Bad weather detection
├── binary_sensors/          # Template binary sensors (time-of-day)
├── dashboards/              # Lovelace dashboard YAML
├── docs/                    # Documentation
├── group/                   # Entity groups
├── input_boolean/           # House and room booleans
│   ├── house/               # House-level toggles
│   ├── people/              # Person-specific booleans
│   └── rooms/               # Room occupancy booleans
├── input_number/            # Volume levels, thresholds
├── input_select/            # Room state machines
│   ├── house/               # House mode
│   └── rooms/               # Per-room modes
├── packages/                # Complex packages (energy monitoring)
├── scripts/                 # Reusable action sequences
│   ├── house/               # House-level scripts
│   └── routines/            # Morning, bedtime, Lucas routines
├── sensors/                 # Template sensors (weather, time)
├── themes/                  # Custom themes
└── www/                     # Static assets
```

---

## Highlights

Some favourite automations:

- **Auto Movie Detection** — Lounge auto-switches to Movie mode when the TV plays after dark
- **Lucas Door Night Alert** — Lounge lights flash red if Lucas's door opens between 10pm–7am
- **Quiet Mode Cascade** — Lucas napping triggers house-wide quiet behavior
- **Goodnight Routine** — One button: dims lights, sets climate, arms security, sets scenes
- **Bad Weather Ambient** — Warm lighting automatically activates when weather deteriorates
- **Security Auto-Arm** — Arms when nobody's home, arms home at bedtime, disarms on arrival

---

## Devices

Extensive device ecosystem including Hue lighting (20+ bulbs), Tado climate (6 zones), Ring security (7 cameras), Sonos audio, Samsung/LG TVs, Tapo smart plugs (~40), and Miele/Bosch appliances.

For the complete inventory, see [Devices](docs/DEVICES.md).
