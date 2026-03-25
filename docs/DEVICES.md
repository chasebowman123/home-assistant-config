# Device Inventory

Complete hardware list for the Eidam smart home.

## Hub & Infrastructure

| Device | Model | Notes |
|---|---|---|
| Home Assistant | HA Green | Primary hub |
| NAS | Synology DS224+ | Storage, backups |
| Zigbee | Zigbee2MQTT | Door/motion sensors |

## Lighting — Philips Hue

| Room | Devices |
|---|---|
| Hallway | Spots, Lamp Post, Signe Light |
| Lounge | Spots, Play Light Bar, Light Strip, Piano Lamp, Iris |
| Bedroom | Spots, Signe, TV Strip |
| Lucas Room | Spots, Iris, Cloud Lamp, Go Nightlight |
| Lucas Bathroom | Lights |
| Kitchen | Spotlights |
| Office | Spots |
| Cloakroom | Light |
| Main Bathroom | Spots |
| Outside | Garden Lights |

## Hue Sync Box

| Entity | Location |
|---|---|
| `switch.lounge_hue_sync_box` | Lounge — syncs with Samsung TV |

## Heating — Tado

| Zone | Entity |
|---|---|
| Hallway | `climate.hallway` |
| Lounge | `climate.lounge` |
| Kitchen | `climate.kitchen` |
| Bedroom | `climate.bedroom` |
| Lucas Room | `climate.lucas_room` |
| Office | `climate.office` |

## Security — Ring

| Device | Entity |
|---|---|
| Basement Door Camera | `sensor.basement_door_battery` |
| Basement Stairs Camera | `sensor.basement_stairs_battery` |
| Garden Camera | `sensor.garden_battery` |
| Upstairs Camera | `sensor.upstairs_battery` |
| Basement Door Doorbell | `binary_sensor.basement_door_ding` |
| Upstairs Doorbell | `binary_sensor.upstairs_ding` |
| Lobby Doorbell | `binary_sensor.lobby_ding` |

## Smart Plugs — TP-Link Tapo P304M

16+ plugs monitoring various appliances including:
- Washing machine, dryer, dishwasher
- Oven, fridge-freezer, coffee machine
- Various other appliances

Each plug provides power monitoring (`sensor.{name}_power`) and on/off control (`switch.{name}`).

## Media

| Device | Entity | Location |
|---|---|---|
| Sonos | `media_player.lounge_sonos` | Lounge |
| Sonos | `media_player.kitchen` | Kitchen |
| Sonos | `media_player.lucas_room_sonos` | Lucas Room |
| Sonos | `media_player.bedroom_sonos` | Bedroom |
| Samsung TV | `media_player.lounge_tv` | Lounge |
| LG TV | `media_player.bedroom_tv` | Bedroom |
| Alexa | `notify.alexa_media` | Kitchen + others |

## Air Quality

| Device | Entities |
|---|---|
| Levoit Core 400S | `fan.core_400s`, `sensor.core_400s_filter_lifetime`, `sensor.core_400s_pm2_5` |
| Lucas Air Quality Monitor | `sensor.lucass_room_air_quality_monitor_indoor_air_quality` |
| Lucas Humidifier | `switch.lucas_strip_humidifier`, `sensor.lucas_strip_humidifier_water_level` |

## Sensors

| Sensor | Entity | Location |
|---|---|---|
| Lucas Bath Temp | `sensor.lucas_bath_temp_sensor_temperature` | Lucas Bathroom |
| Bathroom Door | `binary_sensor.bathroom_sensor_contact` | Main Bathroom |
| Lucas Door | `binary_sensor.lucas_room_door` | Lucas Room |
| Hallway Temp | `sensor.hallway_temp_temperature` | Hallway |
| Nanit Power | `binary_sensor.nanit_power` | Lucas Room |

## Flic Buttons

~20 buttons (including Duo models). Planned placements:
- Bedside Edward (Duo): Night Time / toggle lamp
- Bedside Loretta (Duo): Night Time / toggle lamp
- Front door (Single): Day Time / All Out / Dogs Alone
- Lounge coffee table (Duo): cycle scenes / toggle lights
- Lucas door frame (Single): Standard / Wind Down / Bedtime
- Kitchen (Single): toggle spots / Disco Disco
- Hallway (Single): toggle hallway / All Lights Off
- Office desk (Single): toggle Meeting / cycle modes
- Bathroom (Single): toggle lights
- Lounge sofa arm (Single): Evening Time / Edward Alone / Disco Disco
- 8–10 spare
