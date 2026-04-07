# Eidam Smart Home - Entity Map

Complete mapping of all entities by room, extracted from live HA instance.
Used as the reference for the Kohbo-style dashboard build.

## People

| Person | Entity | Device Tracker | Notes |
|--------|--------|---------------|-------|
| Edward | person.edward | device_tracker.ee_iphone_16_pro_max | Location stuck - needs iOS companion app location reset |
| Lucas | person.lucas | TBD | May need to create |
| Nanny | TBD | TBD | Needs device_tracker setup |
| Mother | TBD | TBD | Needs device_tracker setup |

## Rooms

### Lounge
| Type | Entity ID | Name |
|------|-----------|------|
| Climate | climate.lounge | Lounge Heating (Tado) |
| Climate | climate.lounge_ac | Lounge AC (Sensibo) |
| Light | light.lounge_spots | Spots |
| Light | light.lounge_play_light_bar | Play Light Bar |
| Light | light.lounge_light_strip | Light Strip |
| Light | light.lounge_piano_lamp | Piano Lamp |
| Light | light.lounge_iris | Iris |
| Switch | switch.bubble_light | Bubble Light |
| Switch | switch.banana_light | Banana Light |
| Switch | switch.bar_light | Bar Light |
| Switch | switch.disco_lights | Disco Lights |
| Media | media_player.lounge_sonos | Lounge Sonos |
| Media | media_player.lounge_tv | Lounge TV (Firecube) |
| Media | media_player.lounge_marshall_1 | Marshall Speaker 1 |
| Media | media_player.lounge_marshall_2 | Marshall Speaker 2 |
| Switch | switch.lounge_hue_sync_box | Hue Sync Box |
| Input | input_select.lounge | Lounge Mode |

### Bedroom
| Type | Entity ID | Name |
|------|-----------|------|
| Climate | climate.bedroom | Bedroom Heating (Tado) |
| Light | light.bedroom_spots | Spots |
| Light | light.bedroom_signe | Signe |
| Light | light.bedroom_tv_strip | TV Strip |
| Media | media_player.bedroom_sonos | Bedroom Sonos |
| Media | media_player.bedroom_tv | Bedroom TV (Firecube) |
| Media | media_player.bedroom_marshall_1 | Marshall Speaker 1 |
| Media | media_player.bedroom_marshall_2 | Marshall Speaker 2 |
| Input | input_select.bedroom | Bedroom Mode |

### Lucas's Room
| Type | Entity ID | Name |
|------|-----------|------|
| Climate | climate.lucas_room | Lucas Room Heating (Tado) |
| Light | light.lucas_room_spots | Spots |
| Light | light.lucas_room_iris | Iris |
| Light | light.lucas_cloud_lamp | Cloud Lamp |
| Light | light.lucas_go_nightlight | Go Nightlight |
| Light | light.lucas_bathroom_lights | Lucas Bathroom |
| Switch | switch.cloud_lamp | Cloud Lamp Switch |
| Switch | switch.lucas_strip_humidifier | Humidifier |
| Fan | fan.core_400s | Air Purifier |
| Sensor | sensor.lucas_room_temperature | Room Temperature |
| Sensor | sensor.lucas_bath_temp_sensor_temperature | Bath Temperature |
| Sensor | sensor.lucass_room_air_quality_monitor_indoor_air_quality | Air Quality |
| Sensor | sensor.core_400s_pm2_5 | PM2.5 |
| Media | media_player.lucas_room_sonos | Lucas Room Sonos |
| Input | input_select.lucas_room | Room Mode |
| Input | input_boolean.lucas_sleeping | Lucas Sleeping |
| Camera | camera.lucas_ring | Ring Camera |

### Kitchen
| Type | Entity ID | Name |
|------|-----------|------|
| Climate | climate.kitchen | Kitchen Heating (Tado) |
| Light | light.kitchen_spotlights | Spotlights |
| Media | media_player.kitchen | Kitchen Speaker |

### Office
| Type | Entity ID | Name |
|------|-----------|------|
| Climate | climate.office | Office Heating (Tado) |
| Light | light.office_spots | Spots |
| Light | light.office_lamp | Floor Lamp |
| Switch | switch.office_edison_light | Edison Light |
| Input | input_select.office | Office Mode |
| Input | input_boolean.important_meeting | Important Meeting |

### Hallway
| Type | Entity ID | Name |
|------|-----------|------|
| Climate | climate.hallway | Hallway Heating (Tado) |
| Light | light.hallway_spots | Spots |
| Light | light.hallway_lamp_post | Lamp Post |
| Light | light.hallway_signe_light | Signe |
| Light | light.cloakroom_light | Cloakroom |

### Garden
| Type | Entity ID | Name |
|------|-----------|------|
| Light | light.garden_lights | Garden Lights |
| Light | light.garden_door_light | Garden Door Light |

### Bathroom
| Type | Entity ID | Name |
|------|-----------|------|
| Light | light.bathroom_spots | Bathroom Spotlights |

## Global Entities

### House Modes
| Entity | Options |
|--------|--------|
| input_select.house | Home, Away, All Out, Day Time, Evening Time, Night Time, Dogs Alone |

### Booleans
| Entity | Purpose |
|--------|--------|
| input_boolean.lucas_sleeping | Lucas sleeping state |
| input_boolean.evening_entertaining | Evening entertaining mode |
| input_boolean.edward_alone | Edward alone mode |
| input_boolean.important_meeting | Important meeting mode |
| input_boolean.disco_disco | Disco mode |
| input_boolean.nanny_present | Nanny present |
| input_boolean.bad_weather | Bad weather flag |
| input_boolean.goodnight_active | Goodnight routine active |

### Security
| Entity | Purpose |
|--------|--------|
| binary_sensor.basement_door_ding | Ring Doorbell - Basement |
| binary_sensor.upstairs_ding | Ring Doorbell - Upstairs |
| binary_sensor.lobby_ding | Ring Doorbell - Lobby |
| button.lobby_open_door | Lobby Buzzer |

### Media Players (Roaming)
| Entity | Name |
|--------|------|
| media_player.roaming_marshall | Roaming Marshall |
| media_player.roaming_sonos | Roaming Sonos |

### Energy
| Entity | Purpose |
|--------|--------|
| sensor.energy_daily | Daily energy usage |
