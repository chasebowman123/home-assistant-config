# Eidam Smart Home — Home Assistant Configuration

Home Assistant configuration for our London flat, managed with version control and Claude AI assistance.

## System Architecture

| Component | Platform |
|-----------|----------|
| Host | Synology NAS |
| Lighting | Philips Hue (50+ lights) |
| Security | Ring (doorbell, cameras, alarm) |
| Climate | Tado (radiator thermostats) |
| Power | Tapo P304M power strips |
| Voice | Amazon Echo devices |
| Zigbee | Zigbee2MQTT via Mosquitto |
| Media | Sonos, Fire TV Cube |

## Rooms

Lounge · Bedroom · Lucas's Room · Kitchen · Office · Hallway · Bathroom · Boudoir · Cloakroom

## Key Automations

- Lighting scenes (Morning, Day, Evening, Night, Movie, etc.)
- Weather dashboard for Alexa/Fire TV
- Silent doorbell (light-flash notifications)
- Climate control with Tado
- Ring security integration

## Setup

- Configuration managed via VS Code Server add-on
- Secrets excluded from version control — see secrets_template.yaml

*Managed with Claude AI assistance · Version controlled since February 2026*