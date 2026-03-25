# Automations Reference

Complete list of all 78 automations in the Eidam smart home.

## House Modes (8)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `house_mode_away` | House - Away Mode | `input_select.house` → Away | `automation/house/modes/house_away.yaml` |
| `house_mode_all_out` | House - All Out Mode | `input_select.house` → All Out | `automation/house/modes/house_all_out.yaml` |
| `house_mode_dogs_alone` | House - Dogs Alone Mode | `input_select.house` → Dogs Alone | `automation/house/modes/house_dogs_alone.yaml` |
| `house_mode_day_time` | House - Day Time Mode | `input_select.house` → Day Time | `automation/house/modes/house_day_time.yaml` |
| `house_mode_evening_time` | House - Evening Time Mode | `input_select.house` → Evening Time | `automation/house/modes/house_evening_time.yaml` |
| `house_mode_night_time` | House - Night Time Mode | `input_select.house` → Night Time | `automation/house/modes/house_night_time.yaml` |
| `house_departure_notification` | House - Departure Notification | Both phones leave home | `automation/house/modes/house_departure_notification.yaml` |
| `house_departure_response` | House - Departure Response | Mobile notification action | `automation/house/modes/house_departure_response.yaml` |

## Doorbell (3)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `doorbell_visual_alert` | Doorbell - Visual Alert | Any Ring doorbell rings | `automation/doorbell/doorbell_visual_alert.yaml` |
| `doorbell_silent_mode_on` | Doorbell - Silent Mode On | Evening/Night/Dogs Alone or Lucas Sleeping/Meeting | `automation/doorbell/doorbell_silent_mode.yaml` |
| `doorbell_silent_mode_off` | Doorbell - Silent Mode Off | Day Time + no silencing booleans | `automation/doorbell/doorbell_silent_mode_off.yaml` |

## Outside (1)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `outside_garden_lights_motion` | Outside - Garden Lights Night Motion | Motion after sunset | `automation/outside/garden_lights_motion.yaml` |

## Hallway (2)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `hallway_ambient_dark` | Hallway - Ambient After Dark | Sun elevation < 3° | `automation/hallway/hallway_ambient_dark.yaml` |
| `hallway_lights_off_night` | Hallway - Lights Off Night Time | House → Night Time | `automation/hallway/hallway_lights_off_night.yaml` |

## Lounge Modes (5)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `lounge_movie_with_sync` | Lounge - Movie with Sync | `input_select.lounge` → Movie with Sync | `automation/lounge/modes/lounge_movie_with_sync.yaml` |
| `lounge_movie_without_sync` | Lounge - Movie without Sync | `input_select.lounge` → Movie without Sync | `automation/lounge/modes/lounge_movie_without_sync.yaml` |
| `lounge_music` | Lounge - Music | `input_select.lounge` → Music | `automation/lounge/modes/lounge_music.yaml` |
| `lounge_standard` | Lounge - Standard | `input_select.lounge` → Standard | `automation/lounge/modes/lounge_standard.yaml` |
| `lounge_off` | Lounge - Off | `input_select.lounge` → Off | `automation/lounge/modes/lounge_off.yaml` |

## Lounge Other (1)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `lounge_bad_weather` | Lounge - Bad Weather Ambient | `input_boolean.bad_weather` → on | `automation/lounge/other/lounge_bad_weather.yaml` |

## Bedroom Modes (3)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `bedroom_relaxing` | Bedroom - Relaxing | `input_select.bedroom` → Relaxing | `automation/bedroom/modes/bedroom_relaxing.yaml` |
| `bedroom_bedtime` | Bedroom - Bedtime | `input_select.bedroom` → Bedtime | `automation/bedroom/modes/bedroom_bedtime.yaml` |
| `bedroom_off` | Bedroom - Off | `input_select.bedroom` → Off | `automation/bedroom/modes/bedroom_off.yaml` |

## Lucas Room Modes (5)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `lucas_room_standard` | Lucas - Standard | `input_select.lucas_room` → Standard | `automation/lucas_room/modes/lucas_standard.yaml` |
| `lucas_room_bathtime` | Lucas - Bathtime | `input_select.lucas_room` → Bathtime | `automation/lucas_room/modes/lucas_bathtime.yaml` |
| `lucas_room_wind_down` | Lucas - Wind Down | `input_select.lucas_room` → Wind Down | `automation/lucas_room/modes/lucas_wind_down.yaml` |
| `lucas_room_bedtime` | Lucas - Bedtime | `input_select.lucas_room` → Bedtime | `automation/lucas_room/modes/lucas_bedtime.yaml` |
| `lucas_room_night_time` | Lucas - Night Time | `input_select.lucas_room` → Night Time | `automation/lucas_room/modes/lucas_night_time.yaml` |

## Lucas Triggers (2)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `lucas_night_wake_alert` | Lucas - Night Wake Alert | Door opens 10pm–7am while sleeping | `automation/lucas_room/triggers/lucas_night_wake_alert.yaml` |
| `lucas_morning` | Lucas - Morning | Door opens 7am–10am while sleeping | `automation/lucas_room/triggers/lucas_morning.yaml` |

## Lucas Environment (5)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `lucas_bath_too_hot` | Lucas - Bath Too Hot | Bath temp > 38°C | `automation/lucas_room/environment/lucas_bath_too_hot.yaml` |
| `lucas_room_too_hot` | Lucas - Room Too Hot | Room temp > 24°C for 10 min | `automation/lucas_room/environment/lucas_room_too_hot.yaml` |
| `lucas_room_too_cold` | Lucas - Room Too Cold | Room temp < 18°C for 10 min | `automation/lucas_room/environment/lucas_room_too_cold.yaml` |
| `lucas_nanit_power_lost` | Lucas - Nanit Lost Power | Nanit off for 2 min | `automation/lucas_room/environment/lucas_nanit_power_lost.yaml` |
| `lucas_air_quality_poor` | Lucas - Air Quality Poor | IAQ < 50 for 15 min | `automation/lucas_room/environment/lucas_air_quality_poor.yaml` |

## Office Modes (3)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `office_standard_work` | Office - Standard Work | `input_select.office` → Standard Work | `automation/office/modes/office_standard_work.yaml` |
| `office_standard_evening` | Office - Standard Evening | `input_select.office` → Standard Evening | `automation/office/modes/office_standard_evening.yaml` |
| `office_arriving_guests` | Office - Arriving Guests | `input_select.office` → Arriving Guests | `automation/office/modes/office_arriving_guests.yaml` |

## Cloakroom (1)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `cloakroom_motion_lights` | Cloakroom - Motion Lights | Motion detected, off after 5 min | `automation/cloakroom/cloakroom_motion_lights.yaml` |

## Lucas Bathroom (1)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `lucas_bathroom_motion_lights` | Lucas Bathroom - Motion Lights | Motion detected, no auto-off | `automation/lucas_bathroom/lucas_bathroom_motion_lights.yaml` |

## Main Bathroom (1)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `bathroom_door_lights` | Bathroom - Door Lights | Door opens → on, off 5 min after close | `automation/bathroom/bathroom_door_lights.yaml` |

## Edward Alone (4)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `edward_alone_hallway_motion` | Edward Alone - Hallway Motion Lights | Motion, dim at night, 10 min timeout | `automation/edward_alone/edward_alone_hallway_motion.yaml` |
| `edward_alone_kitchen_motion` | Edward Alone - Kitchen Motion Lights | Motion, dim at night, 10 min timeout | `automation/edward_alone/edward_alone_kitchen_motion.yaml` |
| `edward_alone_office_motion` | Edward Alone - Office Motion Lights | Motion, 15 min timeout | `automation/edward_alone/edward_alone_office_motion.yaml` |
| `edward_alone_door_lights` | Edward Alone - All Door Sensor Lights | Door opens → room lights | `automation/edward_alone/edward_alone_door_lights.yaml` |

## Weather (2)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `bad_weather_on` | Weather - Bad Weather On | Rain/storm/snow conditions | `automation/weather/bad_weather_on.yaml` |
| `bad_weather_off` | Weather - Bad Weather Off | Clear/cloudy conditions | `automation/weather/bad_weather_off.yaml` |

## Alerts (2)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `cloud_integration_offline` | Alert - Cloud Integration Offline | Remote UI off for 5 min | `automation/alerts/cloud_integration_offline.yaml` |
| `daily_energy_summary` | Alert - Daily Energy Summary | Daily at 21:00 | `automation/alerts/daily_energy_summary.yaml` |

## Boolean Actions (4)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `disco_disco_activate` | Disco Disco - Activate | `input_boolean.disco_disco` → on | `automation/boolean_actions/disco_disco_activate.yaml` |
| `disco_disco_deactivate` | Disco Disco - Deactivate | `input_boolean.disco_disco` → off | `automation/boolean_actions/disco_disco_deactivate.yaml` |
| `evening_entertaining_activate` | Evening Entertaining - Activate | `input_boolean.evening_entertaining` → on | `automation/boolean_actions/evening_entertaining_activate.yaml` |
| `evening_entertaining_deactivate` | Evening Entertaining - Deactivate | `input_boolean.evening_entertaining` → off | `automation/boolean_actions/evening_entertaining_deactivate.yaml` |

## Appliance Monitoring (8)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `washing_machine_done` | Appliance - Washing Machine Done | Power < 5W for 3 min | `automation/monitoring/appliances/washing_machine_done.yaml` |
| `dryer_done` | Appliance - Dryer Done | Power < 5W for 3 min | `automation/monitoring/appliances/dryer_done.yaml` |
| `dishwasher_done` | Appliance - Dishwasher Done | Power < 5W for 3 min | `automation/monitoring/appliances/dishwasher_done.yaml` |
| `oven_left_on` | Appliance - Oven Left On | Power > 50W for 2 hours | `automation/monitoring/appliances/oven_left_on.yaml` |
| `fridge_freezer_power_alert` | Appliance - Fridge Freezer Power Alert | Power < 1W for 30 min | `automation/monitoring/appliances/fridge_freezer_power_alert.yaml` |
| `coffee_machine_done` | Appliance - Coffee Machine Done | Power < 5W for 30 min | `automation/monitoring/appliances/coffee_machine_done.yaml` |
| `high_power_alert` | Appliance - High Power Alert | Any appliance > 3000W for 5 min | `automation/monitoring/appliances/high_power_alert.yaml` |
| `appliance_left_on_overnight` | Appliance - Left On Overnight | Midnight check | `automation/monitoring/appliances/appliance_left_on_overnight.yaml` |

## Ring Batteries (2)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `ring_battery_low` | Ring - Battery Low Alert | Any Ring battery < 20% | `automation/monitoring/ring_batteries/ring_battery_low.yaml` |
| `ring_battery_critical` | Ring - Battery Critical Alert | Any Ring battery < 5% | `automation/monitoring/ring_batteries/ring_battery_critical.yaml` |

## Air Quality & Humidifier (3)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `air_purifier_filter_low` | Air Quality - Purifier Filter Low | Filter lifetime < 10% | `automation/monitoring/air_quality/air_purifier_filter_low.yaml` |
| `air_quality_poor_house` | Air Quality - PM2.5 High | PM2.5 > 50 for 15 min | `automation/monitoring/air_quality/air_quality_poor_house.yaml` |
| `humidifier_water_low` | Humidifier - Water Level Low | Water level < 15% | `automation/monitoring/air_quality/humidifier_water_low.yaml` |

## Energy Monitoring (3)

| ID | Alias | Trigger | File |
|---|---|---|---|
| `weekly_energy_report` | Energy - Weekly Report | Sundays at 21:00 | `automation/monitoring/energy/weekly_energy_report.yaml` |
| `monthly_energy_report` | Energy - Monthly Report | 1st of month at 09:00 | `automation/monitoring/energy/monthly_energy_report.yaml` |
| `high_daily_usage_alert` | Energy - High Daily Usage Alert | Daily usage > 30 kWh | `automation/monitoring/energy/high_daily_usage_alert.yaml` |

## Maintenance Reminders (9)

| ID | Alias | Schedule | File |
|---|---|---|---|
| `hvac_filter_reminder` | Maintenance - HVAC Filter | Quarterly (Jan, Apr, Jul, Oct) | `automation/maintenance/hvac_filter_reminder.yaml` |
| `smoke_detector_test` | Maintenance - Smoke Detector Test | 1st of every month | `automation/maintenance/smoke_detector_test.yaml` |
| `boiler_service_reminder` | Maintenance - Boiler Service | Annually (September) | `automation/maintenance/boiler_service_reminder.yaml` |
| `washing_machine_clean` | Maintenance - Washing Machine Clean | 15th of every month | `automation/maintenance/washing_machine_clean.yaml` |
| `fridge_freezer_defrost` | Maintenance - Fridge/Freezer Defrost | Quarterly (Mar, Jun, Sep, Dec) | `automation/maintenance/fridge_freezer_defrost.yaml` |
| `gutter_clean` | Maintenance - Gutter Clean | Bi-annual (Apr, Oct) | `automation/maintenance/gutter_clean.yaml` |
| `dryer_lint_reminder` | Maintenance - Dryer Lint | Every Sunday | `automation/maintenance/dryer_lint_reminder.yaml` |
| `dishwasher_salt_reminder` | Maintenance - Dishwasher Salt | 1st of every month | `automation/maintenance/dishwasher_salt_reminder.yaml` |
| `air_purifier_deep_clean` | Maintenance - Air Purifier Clean | Quarterly (Feb, May, Aug, Nov) | `automation/maintenance/air_purifier_deep_clean.yaml` |
