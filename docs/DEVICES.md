# Devices

[Back to main README](../README.md)

Complete hardware inventory for the Eidam Smart Home.

## Menu

[Hub](#hub) | [Lighting](#lighting) | [Climate](#climate) | [Security](#security) | [Media](#media) | [Smart Plugs](#smart-plugs) | [Appliances](#appliances) | [Sensors](#sensors) | [Network](#network)

## Hub

| Device | Connection | Home Assistant | Notes |
|--------|-----------|----------------|-------|
| [Home Assistant Green](https://www.home-assistant.io/green/) | Ethernet | Core | Primary HA instance |
| [Philips Hue Bridge](https://www.philips-hue.com/) | Ethernet | [Hue](https://www.home-assistant.io/integrations/hue/) | Controls all Hue lights |
| [Eero Pro 6E](https://eero.com/) | Ethernet | — | Mesh WiFi system |
| [Synology DS224+](https://www.synology.com/) | Ethernet | — | NAS, Docker host, media server |

## Lighting

| Device | Qty | Location | Connection |
|--------|-----|----------|-----------|
| Hue Spotlights | ~20 | Throughout | Hue Bridge (Zigbee) |
| Hue Iris | 1 | Lounge | Hue Bridge (Zigbee) |
| Hue Signe Floor Lamp | 3 | Lounge, Bedroom, Hallway | Hue Bridge (Zigbee) |
| Hue Play | 2 | Lounge (TV) | Hue Bridge (Zigbee) |
| Hue Pendant Lights | 2+ | Lounge | Hue Bridge (Zigbee) |
| Hue Go | 1 | Lucas Room | Hue Bridge (Zigbee) |
| Hue Color Lamp | 1 | Hallway (Flo lamp) | Hue Bridge (Zigbee) |
| Hue Strip Light | 2+ | Lounge, Bedroom | Hue Bridge (Zigbee) |
| Cloud Lamp | 1 | Lucas Room | Smart plug |
| Various plug lights | 5+ | Throughout | Shelly/Tapo plugs |

## Climate

| Device | Qty | Location | Connection |
|--------|-----|----------|-----------|
| [Tado Smart Thermostat](https://www.tado.com/) | 6 | Hallway, Lounge, Kitchen, Office, Lucas Room, Bedroom | WiFi |
| Air Purifier | 1+ | Lucas Room | WiFi |
| Humidifier | 1 | Lucas Room | Smart plug |

## Security

| Device | Qty | Location | Connection |
|--------|-----|----------|-----------|
| [Ring Alarm](https://ring.com/) | 1 | Hallway | WiFi |
| Ring Doorbell | 1+ | Front door | WiFi |
| Ring Cameras | 7 | Throughout | WiFi |
| Door/Window Sensors | 5+ | Cloakroom, Lucas Bathroom, Outside, Lucas Room, Office | Zigbee |
| Motion Sensors | 3+ | Kitchen/Hallway, Office, Hue sensors | Mixed |

## Media

| Device | Location | Connection |
|--------|----------|-----------|
| Samsung 55" OLED | Lounge | WiFi/LAN |
| LG OLED55G5 | Bedroom | WiFi/LAN |
| Sonos Arc | Lounge | WiFi |
| Sonos speakers | Various | WiFi |
| Echo Show 21 | Hallway | WiFi |
| Echo Show 15 | Lounge | WiFi |
| Echo Hub | Lounge, Bedroom | WiFi |
| Echo Show (small) | Lucas Room | WiFi |

## Smart Plugs

| Device | Qty | Connection | Notes |
|--------|-----|-----------|-------|
| [TP-Link Tapo P304M](https://www.tp-link.com/) | ~40 | WiFi | Power strips — need renaming |
| Shelly Plugs | 5+ | WiFi | Individual plug lights |

## Appliances

| Device | Location | Connection |
|--------|----------|-----------|
| Miele Washing Machine | Utility | Home Connect |
| Miele Dryer | Utility | Home Connect |
| Bosch Dishwasher | Kitchen | Home Connect |
| Coffee Machine | Kitchen | Smart plug |
| Nanit Baby Monitor | Lucas Room | WiFi |

## Sensors

| Device | Location | Purpose |
|--------|----------|---------|
| Hue Motion Sensors | Office, others | Motion + light level |
| Sonoff Temperature | Lucas Room | Temp/humidity |
| Hallway Temp Sensor | Hallway | Temperature monitoring |

## Network

| Device | Purpose |
|--------|---------|
| Eero Pro 6E (3-pack) | Mesh WiFi |
| Synology DS224+ | NAS, Docker, Plex |
| Various Ethernet | Wired backbone |
