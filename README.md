# 🏠 Eidam Smart Home

Home Assistant configuration for the Eidam household — Edward, Loretta, Lucas, three dogs, and nanny Ankii.

## Hardware

| Component | Details |
|---|---|
| Hub | Home Assistant Green |
| NAS | Synology DS224+ |
| Lighting | Philips Hue (spots, Iris, Signe, Go, Play bars, strips, piano lamp, cloud lamp) |
| Heating | Tado smart radiator valves (6 zones) |
| Security | Ring alarm, 4 cameras, 3 doorbells |
| Power | 16+ TP-Link Tapo P304M smart plugs |
| Media | Sonos (lounge, kitchen, Lucas room, bedroom), Samsung TV (lounge), LG TV (bedroom) |
| Appliances | Miele washing machine, Bosch dishwasher, dryer, oven, fridge-freezer, coffee machine |
| Air Quality | Levoit Core 400S purifier, Lucas room air quality monitor, humidifier |
| Sensors | Zigbee2MQTT door/motion sensors, Hue motion sensors, Nanit baby monitor |
| Buttons | ~20 Flic buttons (including Duo models) |
| Sync | Philips Hue Sync Box (lounge) |

## Architecture

```
configuration.yaml          # Main config with includes
├── automation/             # 78 automations organised by area
│   ├── house/modes/        # 8 — house mode activations + departure
│   ├── doorbell/           # 3 — visual alerts + silent mode
│   ├── outside/            # 1 — garden lights
│   ├── hallway/            # 2 — ambient + night off
│   ├── lounge/modes/       # 5 — movie sync/no-sync, music, standard, off
│   ├── lounge/other/       # 1 — bad weather ambient
│   ├── bedroom/modes/      # 3 — relaxing, bedtime, off
│   ├── lucas_room/modes/   # 5 — standard, bathtime, wind down, bedtime, night
│   ├── lucas_room/triggers/# 2 — night wake alert, morning
│   ├── lucas_room/environment/ # 5 — bath temp, room temp, nanit, air quality
│   ├── office/modes/       # 3 — work, evening, guests
│   ├── cloakroom/          # 1 — motion lights
│   ├── lucas_bathroom/     # 1 — motion lights (no auto-off)
│   ├── bathroom/           # 1 — door sensor lights
│   ├── edward_alone/       # 4 — motion + door sensor lights
│   ├── weather/            # 2 — bad weather on/off
│   ├── alerts/             # 2 — cloud offline, daily energy
│   ├── boolean_actions/    # 4 — disco disco, evening entertaining
│   ├── monitoring/         # 16 — appliances, ring batteries, air quality, energy
│   └── maintenance/        # 9 — scheduled reminders
├── scripts/                # 10 scripts
│   ├── house/              # all lights off, silent doorbell flash
│   └── routines/           # morning, sunset, goodnight, lucas routines
├── input_select/           # House mode + 4 room sub-modes
├── input_boolean/          # 6 overlay booleans
├── input_number/           # Media player volumes
├── binary_sensors/         # Time-of-day sensors
├── sensors/                # Sun elevation, time, weather
├── packages/               # Energy monitoring package
├── dashboards/             # Lovelace YAML dashboards
├── group/                  # Light + media player groups
└── themes/                 # Eidam custom theme
```

## House Modes

All modes are **manually triggered** via dashboard or Flic buttons — no automatic mode switching.

| Mode | Description |
|---|---|
| Away | Holiday. Alarm armed, frost protection (14°C), presence simulation |
| All Out | Everyone + dogs out. No alarm, heating lowered, all off |
| Dogs Alone | People out, dogs home. Calming music, doorbell silent, comfortable heat |
| Day Time | Standard operation. Normal heating and lighting |
| Evening Time | Lucas in bed, adults up. Mood lighting, doorbell silent |
| Night Time | Everyone in bed. Arm home, nightlights, monitoring active |

A **smart departure notification** fires when both phones leave home, offering an actionable notification to select All Out, Dogs Alone, or Away.

## Overlay Booleans

These can be toggled independently of house modes:

| Boolean | Effect |
|---|---|
| Lucas Sleeping | Suppress TTS, doorbell silent, dim hallway, door monitoring |
| Important Meeting | Suppress TTS + doorbell, office quiet |
| Evening Entertaining | Mood lighting, relaxed automations, music-friendly |
| Disco Disco | Disco lights + colour cycling + party playlist |
| Bad Weather | Auto-triggered. Piano lamp, hallway lights, cosy scene |
| Edward Alone | Full motion/door automation, Hue Sync Box enabled |

## Room Sub-Modes

| Room | Modes |
|---|---|
| Lounge | Standard, Movie with Sync, Movie without Sync, Music, Off |
| Bedroom | Relaxing, Bedtime, Off |
| Lucas Room | Standard, Bathtime, Wind Down, Bedtime, Night Time |
| Office | Standard Work, Standard Evening, Arriving Guests |

## Monitoring

- **Appliance cycle completion** — washing machine, dryer, dishwasher (power-based detection)
- **Safety alerts** — oven left on, fridge/freezer power loss, high power draw
- **Ring battery** — low (20%) and critical (5%) alerts for all 4 cameras
- **Air quality** — PM2.5 monitoring, purifier filter life, humidifier water level
- **Energy** — daily summary, weekly/monthly reports, high usage alerts (27p/kWh)
- **Maintenance** — 9 scheduled reminders (HVAC, smoke detectors, boiler, appliances, gutters)

## Docs

- [AUTOMATIONS.md](docs/AUTOMATIONS.md) — Complete automation reference
- [DEVICES.md](docs/DEVICES.md) — Hardware inventory
- [ROOMS.md](docs/ROOMS.md) — Room-by-room setup
- [PEOPLE.md](docs/PEOPLE.md) — Household members
