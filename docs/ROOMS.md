# Rooms

Room-by-room configuration and sub-modes.

## Hallway

**Automations:**
- Ambient warm dim lighting when sun drops below 3° elevation
- All lights off when Night Time activates

**Edward Alone additions:**
- Motion-activated lights (dim at night, normal during day)
- Front door sensor activates lights

---

## Lounge

**Sub-modes** (`input_select.lounge`):

| Mode | Lighting | Sync Box | Media |
|---|---|---|---|
| Standard | Spots 80%, play bar + strip 50% @ 3000K | Off | — |
| Movie with Sync | Spots off, strip + play 15% @ 2200K | On | — |
| Movie without Sync | Spots off, strip + play 15% @ 2200K | Off | — |
| Music | Piano lamp + strip 60% @ 2700K | Off | — |
| Off | All off | Off | Sonos paused |

**Other automations:**
- Bad weather → piano lamp on (cosy ambiance)
- Doorbell → Iris + Signe flash blue/red

---

## Bedroom

**Sub-modes** (`input_select.bedroom`):

| Mode | Lighting | Media |
|---|---|---|
| Relaxing | Signe 30% + TV strip 20% @ 2200K | — |
| Bedtime | All off | TV paused |
| Off | All off | — |

---

## Lucas Room

**Sub-modes** (`input_select.lucas_room`):

| Mode | Lighting | Music |
|---|---|---|
| Standard | Spots 80% @ 3500K | — |
| Bathtime | Spots 50%, Iris blue, bathroom lights on | Bathtime playlist |
| Wind Down | Iris + spots dim @ 2200K, cloud lamp | Calm music |
| Bedtime | Go nightlight 3% only | Lullaby (fades out over 30 min) |
| Night Time | Everything off | — |

**Triggers:**
- Night wake alert: door opens 10pm–7am → phone notification + lounge light flash
- Morning: first door open after 7am → morning routine

**Environment monitoring:**
- Bath temperature > 38°C → critical alert
- Room too hot (> 24°C) / too cold (< 18°C)
- Nanit lost power → critical alert + Alexa announcement
- Poor air quality (IAQ < 50)

---

## Office

**Sub-modes** (`input_select.office`):

| Mode | Lighting | Other |
|---|---|---|
| Standard Work | Spots 100% @ 4000K | — |
| Standard Evening | Spots 40% @ 2700K | — |
| Arriving Guests | Office + hallway 80% @ 3000K | Heating boost to 22°C |

---

## Kitchen

No automations (per requirement). Lights manually controlled.

**Edward Alone additions:**
- Motion-activated spots (dim at night, normal during day)

---

## Cloakroom

- Motion sensor activates light
- Auto-off after 5 minutes of no motion
- Uses motion sensor (not door sensor) — handles cases where door is already open

---

## Lucas Bathroom

- Motion sensor activates lights
- **No auto-off** (per requirement)

---

## Main Bathroom

- Zigbee door contact sensor activates lights on open
- Auto-off 5 minutes after door closes

---

## Outside

- Garden lights on motion after sunset (5 minute timeout)
- No courtyard automations
