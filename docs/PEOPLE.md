# People

[Back to main README](../README.md)

## Household

| Person | Entity | Role |
|--------|--------|------|
| Edward | `person.edward_eidam` | Primary admin |
| Loretta | `person.loretta_eidam` | Household member |
| Lucas | — | Child (monitored via room sensors) |

## Presence Detection

Presence is tracked via the Home Assistant mobile app on Edward's and Loretta's phones. The `input_boolean.house_occupied` is set based on whether either person is home.

### Notification Targets

| Target | Entity | Used For |
|--------|--------|----------|
| Edward's iPhone | `notify.mobile_app_ee_iphone_16_pro_max` | Critical alerts, daily summaries |
| Alexa devices | `notify.alexa_media` | TTS announcements |
| Lounge Echo Hub | `media_player.lounge_echo_hub` | Visual/audio alerts |
| Bedroom Echo | `media_player.bedroom_2` | Bedroom announcements |
