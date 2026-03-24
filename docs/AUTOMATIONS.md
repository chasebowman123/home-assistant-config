# Automations

[Back to main README](../README.md)

This document describes the key automations in the Eidam Smart Home.

## Architecture

Automations are split into individual files organized by room and category:

```
automation/
├── alerts/                    # System alerts and notifications
├── bedroom/modes/             # Bedroom state automations
├── hallway/lights/            # Hallway motion lighting
├── house/modes/               # House-level mode changes
├── house/occupancy/           # Presence-based house state
├── kitchen/lights/            # Kitchen motion lighting
├── kitchen/modes/             # Kitchen state automations
├── lounge/                    # Lounge modes + auto-movie detection
├── lucas_room/modes/          # Lucas room state automations
├── lucas_room/                # Door alerts, morning triggers
├── office/lights/             # Office motion lighting
├── office/modes/              # Office state automations
├── security/                  # Alarm arm/disarm, doorbell, outside lights
└── weather/                   # Bad weather detection
```

## Highlights

### Lucas Door Night Alert
When Lucas's room door opens between 10pm and 7am, the lounge Iris and Signe lights flash red for 1 second, then restore to their previous state. A visual cue that he's out of bed.

### Auto Movie Detection
When the Samsung TV starts playing after dark and the lounge is in Auto mode, it automatically switches to Movie mode (dims lights). Returns to Auto when the TV stops for 5 minutes.

### Bad Weather Response
When weather conditions deteriorate (heavy rain, thunder, snow), the `bad_weather` boolean turns on. The hallway and lounge respond with warm ambient lighting.

### Quiet Mode Cascade
When Lucas starts napping, `lucas_napping` turns on → house mode switches to Quiet → TTS is suppressed, hallway dims, doorbell volume lowers.

### Goodnight Routine
Triggered by Flic button. Sets `goodnight_active` → house mode to Bedtime → dims/turns off non-essential lights → sets climate to night temperatures → arms Ring alarm in home mode.

### Security Arm/Disarm
- Auto-arms away when nobody's home for 5 minutes (unless dogs are out)
- Auto-arms home at bedtime
- Auto-disarms when Edward or Loretta arrive home
