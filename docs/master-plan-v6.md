# Home Assistant — Master Plan v4
**Edward's Fresh Start Build Spec — Definitive Build Version**
*Updated: 6 April 2026 8:26 PM — v6*

---

> **Deployment policy:** All changes will be deployed directly to HA via API or delivered as a ready-to-deploy zip. Edward will not be asked to edit YAML files or run terminal commands.

---

> **How to use this document**
> This is the single source of truth for rebuilding Home Assistant from scratch.
> - Pre-install: Entity renames to apply before build
> - Part 1: Scripts to keep (with exact fixes)
> - Part 2: Automations to build (numbered, full spec)
> - Part 3: Everything being removed and why
> - Part 4: Dashboard views spec (9 views)
> - Part 5: Package file structure

---

## Rule: Scripts vs Automations

| Type | When to use |
|------|-------------|
| **Automation** | Anything with a trigger, OR anything triggered from a dashboard button |
| **Script** | Reusable sequences called by 2+ automations. Never triggered directly. |

Scripts that had their own triggers or duplicated automations have been removed and replaced with automations.

---

# Pre-Install: Entity Renames

Apply these renames in HA before running any automations. Use Settings → Devices & Services → find the device → rename the entity, OR deploy via API.

| Current Entity ID | New Entity ID | Reason |
|-------------------|---------------|--------|
| `binary_sensor.0x8c65a3fffef76686_occupancy` | `binary_sensor.kitchen_motion_sensor` | Matches naming convention of other motion sensors: `binary_sensor.lucass_room_motion`, `binary_sensor.garden_motion`, etc. |

> **Note:** After renaming, all automations referencing the old Zigbee entity ID (`binary_sensor.0x8c65a3fffef76686_occupancy`) — particularly automation #10 (Kitchen Motion Lights) — will automatically use the new entity ID. No YAML edits required.

---

# Part 1 — Scripts (Kept)

12 scripts survive. All serve as shared callable logic.

---

## S1 · Goodnight Routine

| Field | Detail |
|-------|--------|
| **Package** | `scripts/routines.yaml` |
| **Purpose** | Full household goodnight sequence, called by dashboard button and potentially other automations |
| **Fixes needed** | 1. Replace `bedroom_sleepy` with correct scene entity ID. 2. Remove all `browser_mod.delay` calls — use native `delay:` action instead. 3. Audit all switch entities for availability before including (mark unavailable ones with `# FIXME` comments). |

**Actions (in order):**
1. Run All Lights Off script
2. Activate bedroom sleepy scene (fix scene ID)
3. Set any remaining lights to off
4. Lock doors if lock entities available
5. Set house mode to appropriate state

---

## S2 · All Lights Off

| Field | Detail |
|-------|--------|
| **Package** | `scripts/lights.yaml` |
| **Purpose** | Universal off — turns off every light group in the house |
| **Fixes needed** | None. Keep as-is. |

---

## S3 · Lucas Wind Down

| Field | Detail |
|-------|--------|
| **Package** | `scripts/lucas.yaml` |
| **Purpose** | Called by Lucas Wind Down automation |
| **Fixes needed** | 1. Fix cloud lamp entity — correct entity ID is `switch.cloud_lamp`. 2. Add Spotify playback sequence (see below). |

**Spotify sequence to add (Lucas Wind Down):**

Play "Following the Leader" by Oliver Wallace on Lucas's Echo Show (`media_player.lucas_s_echo_show`). Start muted, begin playback, wait 11 seconds, fade to 25% volume.

```yaml
  # Spotify — Following the Leader (Oliver Wallace)
  - service: media_player.volume_set
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      volume_level: 0
  - service: media_player.play_media
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      media_content_id: "spotify:track:6SVWpFA6p0nQrxM4z4dGVb"
      media_content_type: music
  - delay: "00:00:11"
  - service: media_player.volume_set
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      volume_level: 0.25
```

**Entity IDs:**
- `media_player.lucas_s_echo_show`
- `spotify:track:6SVWpFA6p0nQrxM4z4dGVb` — "Following the Leader" by Oliver Wallace

---

## S4 · Lucas Bedtime

| Field | Detail |
|-------|--------|
| **Package** | `scripts/lucas.yaml` |
| **Purpose** | Full Lucas bedtime sequence |
| **Fixes needed** | 1. Fix cloud lamp → `switch.cloud_lamp`. 2. Confirm `input_boolean.lucas_sleeping` is turned ON within this script. 3. Add lullaby playlist sequence (see below). |

**Spotify lullaby sequence to add (Lucas Bedtime / Goodnight Lucas):**

Play lullaby playlist on `media_player.lucas_s_echo_show`. Volume starts at 25%, fades to 10% after 10 minutes, stops after 15 minutes.

> ✅ **RESOLVED:** Lullaby playlist confirmed — "Disney Lullaby" playlist by Walt Disney Records.

```yaml
  # Spotify — Disney Lullaby Playlist (Walt Disney Records)
  - service: media_player.volume_set
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      volume_level: 0.25
  - service: media_player.play_media
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      media_content_id: "spotify:playlist:37i9dQZF1DX0zmsulfyDdq"
      media_content_type: music
  - delay: "00:10:00"
  - service: media_player.volume_set
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      volume_level: 0.10
  - delay: "00:05:00"
  - service: media_player.media_stop
    target:
      entity_id: media_player.lucas_s_echo_show
```

**Entity IDs:**
- `media_player.lucas_s_echo_show`
- `spotify:playlist:37i9dQZF1DX0zmsulfyDdq` — "Disney Lullaby" playlist by Walt Disney Records

---

## S5 · Lucas Nightlight

| Field | Detail |
|-------|--------|
| **Package** | `scripts/lucas.yaml` |
| **Purpose** | Nightlight mode for Lucas's room |
| **Fixes needed** | None. Keep as-is. |

---

## S6 · Lucas Bathtime

| Field | Detail |
|-------|--------|
| **Package** | `scripts/lucas.yaml` |
| **Purpose** | Sets bathtime lighting across Lucas's bathroom and room — called by Lucas Bathtime automation |
| **Status** | **REBUILD** |

**Actions to build:**

```yaml
sequence:
  - service: light.turn_on
    target:
      entity_id: light.lucass_bathroom_spotlights
    data:
      brightness_pct: 60
  - service: light.turn_on
    target:
      entity_id: light.lucass_room_spot_lights
    data:
      brightness_pct: 40
  - service: light.turn_on
    target:
      entity_id: light.lucass_room_iris
  - service: switch.turn_on
    target:
      entity_id: switch.cloud_lamp
  # Spotify — Following the Leader (Oliver Wallace)
  - service: media_player.volume_set
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      volume_level: 0
  - service: media_player.play_media
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      media_content_id: "spotify:track:6SVWpFA6p0nQrxM4z4dGVb"
      media_content_type: music
  - delay: "00:00:11"
  - service: media_player.volume_set
    target:
      entity_id: media_player.lucas_s_echo_show
    data:
      volume_level: 0.25
```

**Entity IDs:**
- `light.lucass_bathroom_spotlights`
- `light.lucass_room_spot_lights`
- `light.lucass_room_iris`
- `switch.cloud_lamp`
- `media_player.lucas_s_echo_show`
- `spotify:track:6SVWpFA6p0nQrxM4z4dGVb`

---

## S7 · Lucas Morning Routine

| Field | Detail |
|-------|--------|
| **Package** | `scripts/lucas.yaml` |
| **Purpose** | Morning wake-up sequence for Lucas |
| **Fixes needed** | Fix Spotify placeholder — replace with actual media_player entity for Lucas's room (`media_player.lucas_s_echo_show`). |

---

## S8 · Edward Sleeptime

| Field | Detail |
|-------|--------|
| **Package** | `scripts/routines.yaml` |
| **Purpose** | Edward's personal bedtime sequence |
| **Fixes needed** | None. Keep as-is. |

---

## S9 · Morning Routine

| Field | Detail |
|-------|--------|
| **Package** | `scripts/routines.yaml` |
| **Purpose** | Household morning sequence |
| **Fixes needed** | 1. Remove/replace `media_player.kitchen` — this entity does not exist. Substitute with correct kitchen speaker entity or remove that step. 2. Change `weather.home` → `weather.forecast_home` throughout. |

---

## S10 · Show Nanit

| Field | Detail |
|-------|--------|
| **Package** | `scripts/cameras.yaml` |
| **Purpose** | Displays Nanit baby camera on all 4 display devices |
| **Status** | **REBUILD** |

**Target devices:**

| Device | Entity ID |
|--------|-----------|
| Lounge Fire Cube | `media_player.lounge_fire_cube` |
| Echo Show 15 | `media_player.echo_show_15` |
| Echo Show 21 | `media_player.edward_s_echo_show_21` |
| Lounge Echo Hub | `media_player.lounge_echo_hub` |

**Actions to build:**

```yaml
sequence:
  - service: media_player.play_media
    target:
      entity_id: media_player.lounge_fire_cube
    data:
      media_content_id: "{{ states.camera.nanit.attributes.entity_picture }}"
      media_content_type: image
  - delay: "00:00:01"
  - service: media_player.play_media
    target:
      entity_id: media_player.echo_show_15
    data:
      media_content_id: "{{ states.camera.nanit.attributes.entity_picture }}"
      media_content_type: image
  - delay: "00:00:01"
  - service: media_player.play_media
    target:
      entity_id: media_player.edward_s_echo_show_21
    data:
      media_content_id: "{{ states.camera.nanit.attributes.entity_picture }}"
      media_content_type: image
  - delay: "00:00:01"
  - service: media_player.play_media
    target:
      entity_id: media_player.lounge_echo_hub
    data:
      media_content_id: "{{ states.camera.nanit.attributes.entity_picture }}"
      media_content_type: image
```

> **Build note:** Use `media_player.play_media` with 1-second delays between each device call. Confirm Nanit camera entity ID — likely `camera.nanit` but verify in Settings → Devices after Nanit integration is confirmed. Casting method may differ per device type — test individually.

---

## S11 · Show Lucas

| Field | Detail |
|-------|--------|
| **Package** | `scripts/cameras.yaml` |
| **Purpose** | Displays Lucas Ring camera on all 4 display devices |
| **Status** | **REBUILD** |

**Single camera only (camera 1 removed — see Change #7):**

| Camera | Entity ID |
|--------|-----------|
| Lucas Room Camera | `camera.lucass_room_live_view_2` |

**Target devices:** Same 4 as Show Nanit above.

**Actions to build:**

```yaml
sequence:
  - service: media_player.play_media
    target:
      entity_id: media_player.lounge_fire_cube
    data:
      media_content_id: "{{ state_attr('camera.lucass_room_live_view_2', 'entity_picture') }}"
      media_content_type: image
  - delay: "00:00:01"
  - service: media_player.play_media
    target:
      entity_id: media_player.echo_show_15
    data:
      media_content_id: "{{ state_attr('camera.lucass_room_live_view_2', 'entity_picture') }}"
      media_content_type: image
  - delay: "00:00:01"
  - service: media_player.play_media
    target:
      entity_id: media_player.edward_s_echo_show_21
    data:
      media_content_id: "{{ state_attr('camera.lucass_room_live_view_2', 'entity_picture') }}"
      media_content_type: image
  - delay: "00:00:01"
  - service: media_player.play_media
    target:
      entity_id: media_player.lounge_echo_hub
    data:
      media_content_id: "{{ state_attr('camera.lucass_room_live_view_2', 'entity_picture') }}"
      media_content_type: image
```

> **Note:** Only `camera.lucass_room_live_view_2` is used. First camera (`camera.lucass_room_live_view`) has been removed from all scripts and automations.

---

## S12 · Leaving Home

| Field | Detail |
|-------|--------|
| **Package** | `scripts/routines.yaml` |
| **Purpose** | Departure sequence — counterpart to Welcome Home automation |
| **Fixes needed** | None. Keep as-is. Review entity IDs during rebuild. |

---

# Part 2 — Automations (Final List)

**50 automations total.** Numbered sequentially. Grouped by domain.

---

## Lighting — Presence

### #1 · Welcome Home

| Field | Detail |
|-------|--------|
| **Package** | `core/presence.yaml` |
| **Replaces** | `automation.welcome_home_lights` + `script.arriving_home` |
| **Trigger** | `person.edward` OR `person.loretta` → state changes to `home` |

**Conditional actions:**

| Condition | Actions |
|-----------|---------|
| **Between sunrise and sunset** | Run Day Start actions: Flo lamp on, bubble light on, hallway lamp post OFF, Signe → default day 100%, kitchen spots 60%, lounge → Rise and Shine scene 60%. PLUS: office Edison on, office floor lamp on. |
| **After sunset** | Run Evening/Sunset actions: lounge → Rolling Hills scene, lamp post → default 100%, bubble light off. PLUS: office Edison on, office floor lamp on. |

**Entity IDs used:**
- `person.edward`, `person.loretta`
- `light.flo_lamp` (confirm entity ID)
- `light.bubble_light` (confirm entity ID)
- `light.hallway_lamp_post` (confirm entity ID)
- `light.hallway_signe` (confirm entity ID)
- `light.kitchen_spots` (confirm entity ID)
- `light.lounge` or scene group (confirm)
- `light.office_edison` (confirm entity ID)
- `light.office_floor_lamp` (confirm entity ID)
- `sun.sun` for condition

**Fixes needed:** Confirm all light entity IDs during build.

---

### #2 · Hallway Always On

| Field | Detail |
|-------|--------|
| **Package** | `core/presence.yaml` |
| **Replaces** | `automation.hallway_signe_always_on` (expanded) |
| **Trigger** | `light.hallway_lamp_post` OR `light.hallway_signe` → turns off, for 5 seconds |
| **Condition** | `input_select.house_mode` is NOT `All Out` AND NOT `Vacation` |
| **Actions** | Turn lamp post back on (default settings). Turn Signe back on (default day 100%). |

**Fixes needed:** Expand from Signe-only to cover lamp post too. Confirm house mode input_select entity and state values.

---

## Lighting — Time of Day

### #3 · Day Start

| Field | Detail |
|-------|--------|
| **Package** | `lighting/time_of_day.yaml` |
| **Trigger** | Time: 07:30 daily. OR: `binary_sensor.lucas_door` (or equivalent) opens AND time is after 06:30. |
| **Condition** | None (runs regardless of presence — adjust if needed) |

**Actions:**

| Light / Device | Setting |
|----------------|---------|
| Flo lamp | Turn on |
| Bubble light | Turn on |
| Hallway lamp post | Turn OFF |
| Hallway Signe | Default day, 100% |
| Kitchen spots | 60% |
| Lounge | Rise and Shine scene, 60% |

**Fixes needed:** Confirm Lucas door sensor entity ID. Confirm all light entity IDs.

---

### #4 · Evening / Sunset

| Field | Detail |
|-------|--------|
| **Package** | `lighting/time_of_day.yaml` |
| **Replaces** | `automation.sunset_routine` + `script.sunset_routine` + `automation.evening_scene` |
| **Trigger** | `sun.sun` → sets (sunset event) |

**Actions:**

| Light / Device | Setting |
|----------------|---------|
| Lounge | Rolling Hills scene |
| Hallway lamp post | Default 100% |
| Bubble light | Turn OFF |

**Fixes needed:** Remove old sunset_routine automation and script after this is built.

---

### #5 · End Goodnight at Sunrise

| Field | Detail |
|-------|--------|
| **Package** | `lighting/time_of_day.yaml` |
| **Trigger** | `sun.sun` → rises |
| **Actions** | Turn off goodnight/sleep mode flags, restore any overnight-locked settings |
| **Fixes needed** | Keep as-is. Confirm entity IDs. |

---

## Lighting — Motion & Sensors

### #6 · Cloakroom Door Lights

| Field | Detail |
|-------|--------|
| **Package** | `lighting/motion.yaml` |
| **Status** | Keep as-is ✅ |
| **Fixes needed** | None |

---

### #7 · Lucas Bathroom Door Lights

| Field | Detail |
|-------|--------|
| **Package** | `lighting/motion.yaml` |
| **Trigger** | Lucas bathroom door sensor opens/closes |
| **Fixes needed** | Change automation mode to `restart` (prevents stacking when door opened/closed quickly) |

---

### #8 · Office Motion Lights

| Field | Detail |
|-------|--------|
| **Package** | `lighting/motion.yaml` |
| **Trigger** | Office motion sensor active |
| **Fixes needed** | Add 2-hour timeout safety net on `wait_for_trigger` — if motion clears within timeout, lights off; if 2hr passes with no clear trigger, turn lights off anyway to prevent lights-on-forever scenario. |

```yaml
# Pattern to add:
- wait_for_trigger:
    - platform: state
      entity_id: binary_sensor.office_motion
      to: "off"
  timeout: "02:00:00"
  continue_on_timeout: true
- service: light.turn_off
  target:
    entity_id: light.office_lights
```

---

### #9 · Garden Motion Lights

| Field | Detail |
|-------|--------|
| **Package** | `lighting/motion.yaml` |
| **Trigger** | `binary_sensor.garden_motion` active |
| **Fixes needed** | Add condition: `sun.sun` is below horizon (after sunset, before sunrise). Garden lights should only activate at night. |

```yaml
condition:
  - condition: sun
    after: sunset
    before: sunrise
```

---

### #10 · Kitchen Motion Lights

| Field | Detail |
|-------|--------|
| **Package** | `lighting/motion.yaml` |
| **Trigger** | `binary_sensor.kitchen_motion_sensor` active (renamed from `binary_sensor.0x8c65a3fffef76686_occupancy` — see Pre-Install renames above) |
| **Fixes needed** | Apply entity rename first (Pre-Install section). Update automation to use `binary_sensor.kitchen_motion_sensor`. |

---

### #11 · Garden Door Lights

| Field | Detail |
|-------|--------|
| **Package** | `lighting/motion.yaml` |
| **Trigger** | Outside garden door sensor |
| **Fixes needed** | Hardware fix needed on outside door sensor — Edward to fix sensor first, then test automation. |

---

## Lighting — Modes & Scenes

### #12 · Bedroom Default Lights

| Field | Detail |
|-------|--------|
| **Package** | `lighting/modes.yaml` |
| **Replaces** | `automation.bedroom_on` + `script.bedroom_on` |
| **Trigger** | Bedroom-relevant trigger (e.g. bedroom switch, scene button, or dashboard call) |
| **Actions** | Activate Rolling Hills scene at 100%. Turn spot lights OFF. |
| **Fixes needed** | Confirm trigger source. Confirm scene entity ID for Rolling Hills in bedroom context. |

---

### #13 · Disco Mode On

| Field | Detail |
|-------|--------|
| **Package** | `lighting/modes.yaml` |
| **Trigger** | `input_boolean.disco_disco` → on (or dashboard button — see Quick Actions view) |
| **Actions** | Set ALL of: lounge, kitchen, hallway, bedroom lights → Soho scene |
| **Fixes needed** | Change from pink/previous scene → Soho scene. Confirm Soho scene entity IDs for each room. |

---

### #14 · Disco Mode Off

| Field | Detail |
|-------|--------|
| **Package** | `lighting/modes.yaml` |
| **Trigger** | `input_boolean.disco_disco` → off |
| **Actions** | Restore previous state for all affected lights |
| **Fixes needed** | Confirm scene snapshot/restore mechanism works correctly. |

---

### #15 · Quiet Mode On

| Field | Detail |
|-------|--------|
| **Package** | `lighting/modes.yaml` |
| **Status** | **REBUILD** |
| **Trigger** | `input_boolean.quiet_mode` → on (or dashboard button) |

**Actions:**

| Device type | Action |
|-------------|--------|
| All Alexa devices (Echo, Show, Hub) | Set volume to 0 via `media_player.volume_set` |
| Doorbell automation | Disable (`automation.turn_off`) |
| All TTS / announcement automations | Disable (`automation.turn_off`) |
| Fire TVs, Echo Shows, mobile push | **KEEP ON** — visual/push notifications preserved |

**Alexa entities to silence (set volume 0):**
- Enumerate all `media_player.*` entities that are Echo/Alexa devices
- Use `media_player.volume_set` with `volume_level: 0`

**Automations to disable:**
- List all TTS-triggering automations by ID in this action block
- `automation.doorbell_unified` (automation #34)
- Any other automations that call `tts.*` or `alexa_media_player.alexa_tts`

---

### #16 · Quiet Mode Off

| Field | Detail |
|-------|--------|
| **Package** | `lighting/modes.yaml` |
| **Trigger** | `input_boolean.quiet_mode` → off |
| **Actions** | Restore all Alexa volumes to pre-quiet levels (store in `input_number` helpers before silencing). Re-enable all disabled automations. |
| **Fixes needed** | Create `input_number` helpers for each Alexa device's volume to store pre-quiet state. |

---

### #17 · Do Not Disturb On/Off

| Field | Detail |
|-------|--------|
| **Package** | `lighting/modes.yaml` |
| **Trigger** | `input_boolean.do_not_disturb` → on / off |
| **Fixes needed** | Audit and fix all entity IDs referenced in current DND automations. |

---

## Scenes — Defined

### Evening Chill Scene

> ✅ **DEFINED** — Entity IDs confirmed.

#### Lounge Evening Chill

| Step | Action |
|------|--------|
| 1 | Activate `scene.lounge_rolling_hills` (friendly name: "Lounge Chill") |
| 2 | Turn OFF lounge spotlights |
| 3 | Play YouTube video on `media_player.lounge_fire_cube` via `media_player.play_media` with `media_content_type: video/youtube` and `media_content_id: https://www.youtube.com/watch?v=Zwr6poBEtyo` ("Cigarette in Paris") |

```yaml
- service: scene.turn_on
  target:
    entity_id: scene.lounge_rolling_hills
- service: light.turn_off
  target:
    entity_id: light.lounge_spot_lights  # confirm entity ID
- service: media_player.play_media
  target:
    entity_id: media_player.lounge_fire_cube
  data:
    media_content_type: video/youtube
    media_content_id: https://www.youtube.com/watch?v=Zwr6poBEtyo
```

#### Bedroom Evening Chill

| Step | Action |
|------|--------|
| 1 | Activate `scene.bedroom_rolling_hills` (Rolling Hills) |
| 2 | Turn OFF bedroom spotlights |
| 3 | No YouTube playback in bedroom |

```yaml
- service: scene.turn_on
  target:
    entity_id: scene.bedroom_rolling_hills
- service: light.turn_off
  target:
    entity_id: light.bedroom_spot_lights  # confirm entity ID
```

---

### Evening Soiree Scene

> ✅ **DEFINED** — Entity IDs confirmed.

#### Lounge Evening Soiree

| Step | Action |
|------|--------|
| 1 | Activate `scene.lounge_island_warmth` (Island Warmth) at 100% brightness |
| 2 | Turn OFF lounge spotlights |

```yaml
- service: scene.turn_on
  target:
    entity_id: scene.lounge_island_warmth
  data:
    transition: 1  # optional
- service: light.turn_off
  target:
    entity_id: light.lounge_spot_lights  # confirm entity ID
```

> **Note:** Hue scenes do not expose a brightness parameter via `scene.turn_on`. To force 100% brightness, call `light.turn_on` on the relevant light group after the scene activates, or use the Hue scene at its native setting (which is full brightness for Island Warmth).

---

## Lighting — Security

### #18 · Away Security Lights

| Field | Detail |
|-------|--------|
| **Package** | `security/alerts.yaml` |
| **Trigger** | House mode = Away (or all persons = not_home) |
| **Fixes needed** | Fix entity ID: `light.hallway_spotlights` → `light.hallway_spot_lights`. Spotify playlist entity TBD — leave placeholder comment `# TODO: confirm Spotify playlist URI`. |

---

## Climate (Tado)

> **⚠ Tado Re-auth Required**
> All Tado climate entities are currently unavailable — token expired.
> **Fix first:** Settings → Integrations → Tado → Reconfigure (enter credentials).
> The Tado mode sensors show HOME but climate entities are unavailable — this confirms it's an auth issue, not a hardware issue.
> All 3 Tado automations below should be reviewed and tested after re-auth.

---

### #19 · Daytime Heating

| Field | Detail |
|-------|--------|
| **Package** | `climate/tado.yaml` |
| **Trigger** | Time-based (morning, confirm time) |
| **Actions** | Set Tado zones to daytime temperatures |
| **Fixes needed** | Re-auth Tado first. Then verify all `climate.tado_*` entity IDs are correct post-reconnect. |

---

### #20 · Night Setback

| Field | Detail |
|-------|--------|
| **Package** | `climate/tado.yaml` |
| **Trigger** | Time-based (evening, confirm time) |
| **Actions** | Set Tado zones to setback/overnight temperatures |
| **Fixes needed** | Re-auth Tado first. Verify entity IDs. |

---

### #21 · Office Heating Lock

| Field | Detail |
|-------|--------|
| **Package** | `climate/tado.yaml` |
| **Trigger** | Office Tado schedule or manual trigger |
| **Actions** | Lock office heating to specific temperature |
| **Fixes needed** | Add condition: `input_boolean.loretta_working` = `off`. (Office heating lock should NOT activate when Loretta is working.) Re-auth Tado first. |

---

## Lucas

### #22 · Lucas Bathtime

| Field | Detail |
|-------|--------|
| **Package** | `lucas/routines.yaml` |
| **Status** | **REBUILD** |
| **Trigger** | Dashboard button (Quick Actions view) OR time-based trigger (confirm with Edward) |
| **Actions** | Call `script.lucas_bathtime` (S6 above) — includes lights AND Spotify playback |

**Entity IDs (for reference):**
- `light.lucass_bathroom_spotlights` → 60%
- `light.lucass_room_spot_lights` → 40%
- `light.lucass_room_iris` → on
- `switch.cloud_lamp` → on
- `media_player.lucas_s_echo_show` → "Following the Leader" (spotify:track:6SVWpFA6p0nQrxM4z4dGVb), start muted, fade to 25% after 11s

> Note: The script (S6) handles the actual light and Spotify actions. This automation is the trigger wrapper.

---

### #23 · Lucas Wind Down

| Field | Detail |
|-------|--------|
| **Package** | `lucas/routines.yaml` |
| **Trigger** | Time-based or dashboard button (Quick Actions view) |
| **Actions** | Call `script.lucas_wind_down` (S3) — includes lights AND Spotify playback |
| **Fixes needed** | Fix cloud lamp in script S3 → `switch.cloud_lamp`. Spotify sequence added (see S3). |

---

### #24 · Lucas Bedtime

| Field | Detail |
|-------|--------|
| **Package** | `lucas/routines.yaml` |
| **Trigger** | Time-based or dashboard button (Quick Actions view) |
| **Actions** | Call `script.lucas_bedtime` (S4). Script activates `input_boolean.lucas_sleeping`. Plays lullaby playlist on `media_player.lucas_s_echo_show`. |
| **Fixes needed** | Confirm `input_boolean.lucas_sleeping` is turned ON inside S4. Lullaby playlist confirmed — `spotify:playlist:37i9dQZF1DX0zmsulfyDdq` ("Disney Lullaby" by Walt Disney Records). |

---

### #25 · Lucas Door Night Alert

| Field | Detail |
|-------|--------|
| **Package** | `lucas/alerts.yaml` |
| **Trigger** | `input_boolean.lucas_sleeping` → turns ON |
| **Actions** | Wait 1 minute (delay). Then: enable door alert monitoring (turn on door sensor alert automation). |
| **Fixes needed** | **CHANGE trigger:** Do not trigger on door sensor directly at bedtime. Instead trigger on `lucas_sleeping` → on, delay 1 minute, THEN enable door monitoring. This prevents false alerts during the bedtime routine itself. |

```yaml
trigger:
  - platform: state
    entity_id: input_boolean.lucas_sleeping
    to: "on"
actions:
  - delay: "00:01:00"
  - service: automation.turn_on
    target:
      entity_id: automation.lucas_door_monitoring  # the actual door sensor watcher
```

---

### #26 · Edward Bedroom Lucas Door Alert

| Field | Detail |
|-------|--------|
| **Package** | `lucas/alerts.yaml` |
| **Status** | Keep as-is |
| **Fixes needed** | None |

---

### #27 · Lucas Wake Notification

| Field | Detail |
|-------|--------|
| **Package** | `lucas/alerts.yaml` |
| **Status** | Keep as-is |
| **Fixes needed** | None |

---

### #28 · Lucas Is Up

| Field | Detail |
|-------|--------|
| **Package** | `lucas/routines.yaml` |
| **Status** | **NEW** |
| **Trigger** | Motion detected on `binary_sensor.lucass_room_motion_2` OR `event.lucass_room_motion_2` fires |
| **Condition** | `input_boolean.lucas_sleeping` = `on` |

> **Note:** Only `*_2` entities are used (camera 1 removed — see Change #7).

**Actions:**

| Action | Detail |
|--------|--------|
| Push notification | Send to Edward AND Loretta mobile apps — "Lucas is up!" |
| Visual alert — Lounge Echo Hub | Non-verbal visual notification on `media_player.lounge_echo_hub` |
| Visual alert — Bedroom Show 21 | Non-verbal visual notification on `media_player.edward_s_echo_show_21` |

> Use `notify.mobile_app_*` for push. For Echo Shows, use `alexa_media_player` announce or Fire TV notification — confirm working service for non-verbal/visual alert.

---

### #29 · Lucas Temp Cold

| Field | Detail |
|-------|--------|
| **Package** | `lucas/environment.yaml` |
| **Trigger** | `sensor.lucass_room_air_quality_monitor_temperature` drops below **18°C** |
| **Actions** | Push notification: "Lucas's room is cold: [temp]°C" |
| **Fixes needed** | Fix Tado entity reference if used. Use air quality monitor temperature sensor above as primary. |

---

### #30 · Lucas Temp Hot

| Field | Detail |
|-------|--------|
| **Package** | `lucas/environment.yaml` |
| **Trigger** | `sensor.lucass_room_air_quality_monitor_temperature` rises above **24°C** |
| **Actions** | Push notification: "Lucas's room is hot: [temp]°C" |
| **Fixes needed** | Same as above. |

---

### #31 · Lucas Humidity Low / OK

| Field | Detail |
|-------|--------|
| **Package** | `lucas/environment.yaml` |
| **Trigger** | `sensor.lucass_room_air_quality_monitor_humidity` drops below 40% (low alert) OR recovers above 45% (OK notification) |
| **Actions** | Push notification with current humidity reading |
| **Fixes needed** | **Fix humidifier entity:** Correct entity ID is `humidifier.bedroom_humidifier_humidifier` (this IS Lucas's room humidifier despite the bedroom name). Update all references. |

---

### #32 · Lucas Sleeping Toggle

| Field | Detail |
|-------|--------|
| **Package** | `lucas/routines.yaml` |
| **Trigger** | `input_boolean.lucas_sleeping` → turns ON |
| **Actions** | Turn off Flo lamp. Turn off hallway wall lights. |
| **Status** | Keep as-is |

---

### #33 · Air Quality Alerts

| Field | Detail |
|-------|--------|
| **Package** | `monitoring/air_quality.yaml` |
| **Status** | **NEW** |

**Monitored locations and entity IDs:**

#### Office Air Quality Monitor
| Sensor | Entity ID | Current | Threshold |
|--------|-----------|---------|-----------|
| AQI | `sensor.office_air_quality_monitor_air_quality_index` | 95 | < 50 → alert |
| PM2.5 | `sensor.office_air_quality_monitor_pm2_5` | 2 µg/m³ | > 25 → alert |
| PM10 | `sensor.office_air_quality_monitor_pm10` | 2 µg/m³ | (informational) |
| VOC Index | `sensor.office_air_quality_monitor_volatile_organic_compounds_index` | 1 | > 50 → alert |
| CO | `sensor.office_air_quality_monitor_carbon_monoxide_2` | 0 ppm | > 5 → CRITICAL |
| Temperature | `sensor.office_air_quality_monitor_temperature` | 17.75°C | (informational) |
| Humidity | `sensor.office_air_quality_monitor_humidity` | 42% | < 30% or > 60% → comfort alert |

#### Lucas's Room Air Quality Monitor
| Sensor | Entity ID | Current | Threshold |
|--------|-----------|---------|-----------|
| AQI | `sensor.lucass_room_air_quality_monitor_air_quality_index` | 62 | < 50 → alert |
| PM2.5 | `sensor.lucass_room_air_quality_monitor_pm2_5` | 1 µg/m³ | > 25 → alert |
| PM10 | `sensor.lucass_room_air_quality_monitor_pm10` | 1 µg/m³ | (informational) |
| VOC Index | `sensor.lucass_room_air_quality_monitor_volatile_organic_compounds_index` | 28 | > 50 → alert |
| CO | `sensor.lucass_room_air_quality_monitor_carbon_monoxide_2` | 0 ppm | > 5 → CRITICAL |
| Temperature | `sensor.lucass_room_air_quality_monitor_temperature` | 18.5°C | (informational, covered by #29/#30) |
| Humidity | `sensor.lucass_room_air_quality_monitor_humidity` | 44% | < 30% or > 60% → comfort alert |

#### Bedroom Air Quality Monitor (Loretta's Bedside)
| Sensor | Entity ID | Current | Threshold |
|--------|-----------|---------|-----------|
| AQI | `sensor.lorettas_bedside_air_quality_air_quality_index` | 98 | < 50 → alert |
| PM2.5 | `sensor.lorettas_bedside_air_quality_pm2_5` | 2 µg/m³ | > 25 → alert |
| PM10 | `sensor.lorettas_bedside_air_quality_pm10` | 2 µg/m³ | (informational) |
| VOC Index | `sensor.lorettas_bedside_air_quality_volatile_organic_compounds_index` | 1 | > 50 → alert |
| CO | `sensor.lorettas_bedside_air_quality_carbon_monoxide_2` | 0 ppm | > 5 → CRITICAL |
| Temperature | `sensor.lorettas_bedside_air_quality_temperature` | 21°C | (informational) |
| Humidity | `sensor.lorettas_bedside_air_quality_humidity` | 40% | < 30% or > 60% → comfort alert |

#### Levoit Core 400S Air Purifier
| Sensor | Entity ID | Current |
|--------|-----------|---------|
| Air Quality | `sensor.core_400s_air_quality` | "excellent" |
| PM2.5 | `sensor.core_400s_pm2_5` | 7 µg/m³ |

> Note: Amazon AQ monitors use a 0–100 scale where **higher = better**. Threshold < 50 means air quality is poor.

> **⚠ Edward's bedside monitor is fully unavailable** — hardware needs physical inspection. Do not include in this automation until resolved.

**Notification format:**
```
"⚠ Air Quality Alert — [Room Name]
[Metric]: [Value] ([threshold exceeded])
Check ventilation or air purifier."
```

CO alert format (CRITICAL):
```
"🚨 CARBON MONOXIDE ALERT — [Room Name]
CO level: [X] ppm — OPEN WINDOWS AND EVACUATE"
```

**Automation structure:** One automation per room (3 automations), each with multiple triggers (one per metric threshold), actions send push to Edward with room name and metric detail.

---

## Security & Alerts

### #34 · Doorbell Unified

| Field | Detail |
|-------|--------|
| **Package** | `security/alerts.yaml` |
| **Status** | Keep, fix as needed |
| **Fixes needed** | Verify Ring doorbell entity IDs post Ring integration review. |

---

### #35 · Stairs Motion Camera

| Field | Detail |
|-------|--------|
| **Package** | `security/alerts.yaml` |
| **Status** | Keep as-is |

---

### #36 · Camera Offline Alert

| Field | Detail |
|-------|--------|
| **Package** | `security/alerts.yaml` |
| **Status** | Keep as-is |

---

### #37 · Water Leak Kitchen

| Field | Detail |
|-------|--------|
| **Package** | `security/alerts.yaml` |
| **Trigger** | Kitchen water leak sensor → wet |
| **Fixes needed** | **Fix sensor entity** — currently returning `unknown`. Check device in Settings → Devices. May need re-pairing. Placeholder: `binary_sensor.kitchen_water_leak` — verify correct ID. |

---

### #38 · Water Leak Laundry

| Field | Detail |
|-------|--------|
| **Package** | `security/alerts.yaml` |
| **Trigger** | Laundry water leak sensor → wet |
| **Fixes needed** | Same as kitchen — sensor entity returning `unknown`. Verify/fix entity ID. |

---

## Appliances

> All appliance automations: keep all. Review entity IDs during build. All will appear in the dedicated Appliances dashboard view (#6 — expanded).

### #39 · Washing Machine Done
### #40 · Tumble Dryer Done
### #41 · Dishwasher Done
### #42 · Dishwasher Salt Low
### #43 · Oven Alert
### #44 · Fridge Alert
### #45 · Humidifier Water Low / Air Filter Replace

| Field | Detail |
|-------|--------|
| **Package** | `appliances/notifications.yaml` |
| **Status** | Keep all — verify entity IDs during rebuild |
| **Fixes needed** | Review each sensor entity ID. Confirm power monitoring entities are correctly named. |

---

## Health & Monitoring

### #46 · Low Battery Alert

| Field | Detail |
|-------|--------|
| **Package** | `monitoring/health.yaml` |
| **Trigger** | Any battery sensor drops below **20%** |
| **Actions** | Push notification: device name + battery level |
| **Status** | Keep as-is |

---

### #47 · Critical Battery Alert

| Field | Detail |
|-------|--------|
| **Package** | `monitoring/health.yaml` |
| **Trigger** | Any battery sensor drops below **5%** |
| **Actions** | Urgent push notification |
| **Status** | Keep as-is |

---

### #48 · Integration Health Monitor

| Field | Detail |
|-------|--------|
| **Package** | `monitoring/health.yaml` |
| **Status** | **NEW** |
| **Trigger** | Any `sensor.*` or `binary_sensor.*` or `switch.*` or `light.*` entity state changes to `unavailable` for > 5 minutes |

**Actions:**
1. Send **push notification** to Edward: integration/device name + entity ID that went unavailable
2. Send **email** to Edward: full report including:
   - Which integration/entity failed
   - Newly offline entities (changed to unavailable in last hour)
   - Complete list of ALL currently offline/unavailable entities at time of alert

**Email content template:**
```
Subject: ⚠ HA Integration Alert — [entity_id] offline

An entity has gone unavailable:
Entity: [entity_id]
Friendly name: [friendly_name]
Domain: [domain]
Time: [timestamp]

--- All currently offline entities ---
[list of all unavailable entities]
```

> Build note: Use `notify.notify` for push and `notify.smtp` (or equivalent configured notifier) for email. The full offline entity list can be generated with a template sensor or via `integration_entities()` template function.

---

## Vacation

### #49 · Vacation Mode On

| Field | Detail |
|-------|--------|
| **Package** | `vacation/vacation.yaml` |
| **Status** | Keep, fix |
| **Fixes needed** | Review all entity IDs. Confirm house mode input_select value for Vacation. |

---

### #50 · Vacation Mode Off

| Field | Detail |
|-------|--------|
| **Package** | `vacation/vacation.yaml` |
| **Status** | Keep, fix |
| **Fixes needed** | Review all entity IDs. |

---

# Part 3 — Removed Items

Everything below is **deleted** from the new system. Reason given for each.

## Automations Removed

| Automation | Reason |
|------------|--------|
| House Mode Away | Redundant — presence-based logic handled by Welcome Home + Leaving Home script + Vacation Mode |
| House Mode Home | Redundant — same as above |
| Return Home Heating | Removed per Edward — Tado handles this natively |
| Loretta Working On | Removed per Edward |
| Loretta Working Off | Removed per Edward |
| Lucas Wind Down Reminder | Replaced by time-based routine automations |
| Lucas Bedtime Reminder | Replaced by time-based routine automations |
| Entertaining Guests On | Removed for now |
| Entertaining Guests Off | Removed for now |
| Guests Arriving Welcome | Removed for now |
| Movie Night On | Come back to later — not in fresh start |
| Movie Night Off | Come back to later — not in fresh start |
| bad_weather_auto | Come back to later |
| bad_weather_notification | Come back to later |
| Nanny Tracking (all 4) | All 4 nanny tracking automations removed entirely |
| Auto Arm Ring Alarm | Removed |
| Auto Disarm Ring Alarm | Removed |
| Bubble Light at Sunset | Captured in Day Start (#3) and Evening/Sunset (#4) |
| Evening Chill Mode | Convert to a scene instead — not an automation |
| Office Security Lights | Covered by Office Motion Lights (#8) + Away Security Lights (#18) |
| TV Hue Sync On | Dashboard button only — no automation needed |
| TV Hue Sync Off | Dashboard button only — no automation needed |
| Daily System Health Check | Replaced by Integration Health Monitor (#48) + Health dashboard view |
| Weekly Energy Digest | Replaced by Climate/Energy dashboard view |
| Weekly Battery Digest | Replaced by Health & Maintenance dashboard view |

## Scripts Removed

| Script | Reason |
|--------|--------|
| `script.arriving_home` | Duplicate of Welcome Home automation (#1) — merged in |
| `script.sunset_routine` | Merged into Evening/Sunset automation (#4) |
| `script.bedroom_on` | Duplicate of Bedroom Default Lights automation (#12) — replaced |

## Lucas Camera Entities Removed

The first Lucas Ring camera and all associated entities have been removed. Only `*_2` entities are used throughout.

| Removed Entity | Replacement |
|----------------|-------------|
| `camera.lucass_room_live_view` | `camera.lucass_room_live_view_2` |
| `binary_sensor.lucass_room_motion` | `binary_sensor.lucass_room_motion_2` |
| `event.lucass_room_motion` | `event.lucass_room_motion_2` |
| `camera.lucass_room_snapshot` | `camera.lucass_room_snapshot_2` |
| `switch.lucass_room_motion_detection` (non-_3) | `switch.lucass_room_motion_detection_3` |

---

# Part 4 — Dashboard Views

**9 views** in Kohbo style. Build these after automations are stable.

---

## View 1 · Home (Overview)

**Purpose:** At-a-glance household status on a single screen.

| Section | Content |
|---------|---------|
| Presence | Edward / Loretta home/away status |
| House Mode | Current mode (input_select) — Day / Evening / Goodnight / Away / Vacation |
| Quick Actions | Buttons: Goodnight, All Lights Off, Leaving Home, Day Start |
| Weather | Current conditions + forecast (`weather.forecast_home`) |
| Active Alerts | Any triggered alerts (leak, battery, AQI, camera offline) |
| Cameras | Thumbnail: Nanit + Lucas room camera (`camera.lucass_room_live_view_2`) |

---

## View 2 · Quick Actions

**Purpose:** One-tap control of all modes and common scene/routine triggers. All buttons visible in a single glance — no navigation required.

### Section A — Mode Toggles

| Button Label | Entity | Type |
|--------------|--------|------|
| Edward Bedroom | `input_boolean.edward_bedroom` | Toggle |
| Edward Alone | `input_boolean.edward_alone` | Toggle |
| Lucas Sleeping | `input_boolean.lucas_sleeping` | Toggle |
| Guests Arriving | `input_boolean.guests_arriving` | Toggle |
| Motion Light | `input_boolean.motion_detection` | Toggle |
| Loretta Working | `input_boolean.loretta_working` | Toggle |
| Mom Over | `input_boolean.mom_over` | Toggle |
| Entertaining | `input_boolean.entertaining_guests` | Toggle |
| Movie Night | `input_boolean.movie_night` | Toggle |
| Disco Disco | `input_boolean.disco_disco` | Toggle |

> All `input_boolean.*` helpers above must be created if not already present.

### Section B — Scene / Action Buttons

| Button Label | Action | Type |
|--------------|--------|------|
| Lounge Evening Chill | 1. Activate `scene.lounge_rolling_hills` (Lounge Chill). 2. Turn OFF lounge spotlights. 3. `media_player.play_media` on `media_player.lounge_fire_cube` — `media_content_type: video/youtube`, `media_content_id: https://www.youtube.com/watch?v=Zwr6poBEtyo` ("Cigarette in Paris") | Tap |
| Lounge Evening Soiree | 1. Activate `scene.lounge_island_warmth` (Island Warmth) at 100% brightness. 2. Turn OFF lounge spotlights. | Tap |
| Lounge Music | `media_player.play_media` on lounge Marshall/WiiM — `media_content_type: spotify`, `media_content_id: spotify:playlist:58lLaGmeasS5F1L9kO3M0w` | Tap |
| Lounge Disco Disco | Activate `scene.lounge_soho` on all lounge/kitchen/hallway/bedroom lights | Tap |
| Bedroom Evening Chill | 1. Activate `scene.bedroom_rolling_hills` (Rolling Hills). 2. Turn OFF bedroom spotlights. | Tap |
| Bedroom Music | `media_player.play_media` on bedroom Marshall/WiiM — `media_content_type: spotify`, `media_content_id: spotify:playlist:7xwPszrgjvANd8kQ3CXw3V` | Tap |
| Lucas Bathtime | Trigger `script.lucas_bathtime` (S6) | Tap |
| Lucas Wind Down | Trigger `script.lucas_wind_down` (S3) | Tap |
| Lucas Bedtime | Trigger `script.lucas_bedtime` (S4) | Tap |
| Lucas Music | Play music on `media_player.lucas_s_echo_show` (TBD playlist) | Tap |
| Show Lucas | Trigger `script.show_lucas` (S11) — Ring camera on all screens | Tap |
| View Upstairs Door | Show `camera.upstairs_live_view` on screens | Tap |
| View Basement Door | Show `camera.basement_door_live_view` on screens | Tap |
| View Garden | Show `camera.garden_live_view` on screens | Tap |
| Lobby Buzzer | Call `button.press` on `button.lobby_open_door` (Ring MQTT) — buzzes/unlocks lobby door | Tap |

> Lounge/Bedroom Music playlists resolved. Speaker entity targets will use whichever lounge/bedroom WiiM is online (finalise once remaining WiiMs are powered on). All scene and lobby buzzer actions are now resolved.

---

## View 3 · Rooms

**Purpose:** Per-room lighting and scene control.

| Room | Controls |
|------|---------|
| Lounge | Scene selector, brightness slider, individual lights |
| Kitchen | Lights on/off, spots brightness |
| Hallway | Signe + lamp post controls |
| Bedroom | Rolling Hills scene, spot lights, DND toggle |
| Office | Lights, Edison, floor lamp, motion lights toggle |
| Lucas's Room | All lights, cloud lamp, Iris, spot lights |
| Lucas's Bathroom | Spotlights brightness |
| Garden | Garden lights, motion trigger status |

---

## View 4 · Climate / Energy / Air Quality

**Purpose:** Temperature control, energy usage, air quality per room.

| Section | Content |
|---------|---------|
| Tado Zones | Per-room thermostat cards (requires Tado re-auth) |
| Energy Usage | Power monitoring graph (daily/weekly) |
| Air Quality — Office | AQI, PM2.5, VOC, CO, Temp, Humidity gauges |
| Air Quality — Lucas | Same metrics for Lucas's room |
| Air Quality — Bedroom | Same metrics for Loretta's Bedside monitor |
| Levoit Core 400S | AQ status + PM2.5 reading |
| Note | Edward's bedside monitor currently offline — hardware check needed |

---

## View 5 · Security

**Purpose:** All security-related monitoring in one place.

| Section | Content |
|---------|---------|
| Cameras | Live thumbnails: Nanit, Lucas cam (`camera.lucass_room_live_view_2`), stairs camera, front door |
| Door/Window Sensors | Binary status for all door and window sensors |
| Ring Alarm | Alarm status + arm/disarm controls |
| Doorbell | Last ring timestamp + camera feed |
| Water Leaks | Kitchen sensor, laundry sensor (both need entity fix — see #37/#38) |
| Quick Actions | Buttons: Show Nanit (calls S10), Show Lucas (calls S11) |
| **Lobby (Ring MQTT)** | Lock status (`lock.lobby_lock`), battery (`sensor.lobby_battery` / `sensor.lobby_battery_2` — 100%), ding events (`event.lobby_ding`, `binary_sensor.lobby_ding`), intercom unlock event (`event.lobby_intercom_unlock`), **Open Door button** — calls `button.press` on `button.lobby_open_door` |

**Lobby Entity Reference (Ring MQTT):**

| Entity | Purpose |
|--------|---------|
| `button.lobby_open_door` | Press to buzz/unlock the lobby door |
| `lock.lobby_lock` | Lock/unlock control |
| `event.lobby_ding` | Doorbell ding event |
| `event.lobby_intercom_unlock` | Intercom unlock event |
| `number.lobby_doorbell_volume` | Doorbell volume (currently 8) |
| `number.lobby_mic_volume` | Mic volume (currently 11) |
| `number.lobby_voice_volume` | Voice volume (currently 11) |
| `sensor.lobby_battery` | Battery level (100%) |
| `sensor.lobby_battery_2` | Battery level 2 (100%) |
| `binary_sensor.lobby_ding` | Ding binary sensor |

---

## View 6 · Appliances

**Purpose:** Status and alerts for all smart appliances, including energy monitoring per outlet via Tapo strips.

### Standard Appliances
| Appliance | Shows |
|-----------|-------|
| Washing Machine | Power draw, cycle status, done notification history |
| Tumble Dryer | Power draw, cycle status |
| Dishwasher | Cycle status, salt level indicator |
| Oven | Status, alert |
| Fridge | Status, alert |
| Humidifier (Lucas) | Water level, current humidity, on/off control (`humidifier.bedroom_humidifier_humidifier`) |
| Levoit Air Purifier | Mode, AQ reading, filter status (`sensor.core_400s_air_quality`) |

### TVs
| Device | Entity IDs |
|--------|-----------|
| Lounge Samsung TV | `media_player.lounge_tv_2` / `switch.lounge_tv_strip_samsung_tv` |
| LG OLED Bedroom | `media_player.lg_webos_tv_oled55g54lw` / `switch.bedroom_av_strip_lg_tv` |
| Lounge Fire Cube | `media_player.lounge_fire_cube` |
| Bedroom Fire Cube | `media_player.bedroom_fire_cube` / `switch.unnamed_p304m_fire_cube` (Bedroom Power Strip) |

### Air Conditioner (Powrmatic Vision Maxi 3.6 DW via Sensibo)

Already integrated via Sensibo. Entity: `climate.edward_s_device` (currently in heat mode, 25°C target, 17.8°C actual).

| Entity | Purpose |
|--------|---------|
| `climate.edward_s_device` | Main climate control — cool/heat/dry/fan_only/heat_cool/off, fan (low/medium/high/auto), swing (stopped/rangefull), temp 16-31°C |
| `binary_sensor.edward_s_device_filter_clean_required` | Filter needs cleaning (currently: on) |
| `button.edward_s_device_reset_filter` | Reset filter reminder |
| `switch.edward_s_device_climate_react` | Climate React automation (currently: on) |
| `switch.edward_s_device_timer` | Timer control |
| `update.edward_s_device_firmware` | Firmware updates |

> **Action needed:** Rename entity from `climate.edward_s_device` to `climate.lounge_ac` (or similar) during build. Also: filter clean alert is active — Edward should clean the AC filter.

### NAS (Synology DS224+ "Eidam")

Already integrated via Synology DSM (6 devices, 43 entities). Location: Hallway.

| Entity | Purpose |
|--------|---------|
| `sensor.eidam_cpu_utilisation_total` | CPU usage (%) |
| `sensor.eidam_memory_usage_real` | Memory usage (%) |
| `sensor.eidam_temperature` | System temperature |
| `sensor.eidam_volume_1_volume_used` | Volume 1 usage (%) |
| `sensor.eidam_volume_1_used_space` | Volume 1 used space (TB) |
| `sensor.eidam_drive_1_status` / `sensor.eidam_drive_2_status` | Drive health |
| `sensor.eidam_drive_1_temperature` / `sensor.eidam_drive_2_temperature` | Drive temps |
| `sensor.eidam_upload_throughput` / `sensor.eidam_download_throughput` | Network throughput |
| `binary_sensor.eidam_security_status` | Security status |
| `update.eidam_dsm_update` | DSM update available |
| `button.eidam_reboot` / `button.eidam_shutdown` | Reboot/Shutdown controls |
| `sensor.eidam_usb_disk_1_partition_1_partition_used` | USB backup disk usage (%) |

### Tapo Power Strips (Energy Monitoring Per Outlet)

#### Lounge TV / Entertainment Strip
| Outlet | Device |
|--------|--------|
| 1 | Samsung TV (`switch.lounge_tv_strip_samsung_tv`) |
| 2 | Sonos Arc |
| 3 | Sub Mini |
| 4 | PS5 |
| 5 | Hue TV Lights |
| 6 | Fire Cube |

#### Lounge Accessories Strip
| Outlet | Device |
|--------|--------|
| 1 | Echo Show 15 |
| 2 | Echo Hub |
| 3 | Macbook Charger |
| 4 | USB-C Charger |
| 5 | Piano |
| 6 | Piano Lamp |
| 7 | Air Purifier |
| 8 | Air Monitor |
| 9 | Hue Sync Box |
| 10 | Sonos Speaker |

#### Bedroom AV Strip
| Outlet | Device |
|--------|--------|
| 1 | LG TV (`switch.bedroom_av_strip_lg_tv`) |
| 2 | Fire Cube |
| 3 | Marshall Speaker |
| 4 | Sonos Beam |

#### Hallway / Lucas Strip
| Outlet | Device |
|--------|--------|
| 1 | Nanit |
| 2 | Air Filter |
| 3 | Humidifier |
| 4–7 | Smart Plugs 1–4 |

#### Kitchen Coffee Strip
| Outlet | Device |
|--------|--------|
| 1 | Grinder |
| 2 | Coffee Pot |
| 3 | Espresso Machine |

> Show per-outlet power draw (watts), daily energy (kWh), and on/off toggle for each outlet in the dashboard.

---

## View 7 · Health & Maintenance

**Purpose:** Replaces weekly digests — always-current system health view.

| Section | Content |
|---------|---------|
| Battery Levels | Table: all battery sensors, sorted by % ascending. Highlight < 20% yellow, < 5% red. |
| Integration Status | Status of all integrations (Tado, Ring, Sonos, Hue, Zigbee, etc.) |
| Offline Entities | List of all entities currently in `unavailable` or `unknown` state |
| Entity Health | Count of unavailable entities by domain |
| Alert History | Last 10 integration health alerts |

---

## View 8 · Lucas

**Purpose:** Everything Lucas in one place.

| Section | Content |
|---------|---------|
| Room Status | Lights status, cloud lamp, Iris, temperature, humidity |
| Sleep Status | `input_boolean.lucas_sleeping` toggle + last changed |
| Routine Buttons | Bathtime, Wind Down, Bedtime, Morning Routine, Nightlight |
| Camera | Lucas cam live view — `camera.lucass_room_live_view_2` only |
| Environment | Temperature (warn if < 18°C or > 24°C), Humidity, AQI gauges |
| Door Sensor | Lucas room door status + Night Alert toggle |
| Motion | Last motion detected (`binary_sensor.lucass_room_motion_2`, `event.lucass_room_motion_2`) |
| Nanit | Nanit baby camera feed + Show Nanit button (calls S10) |
| Snapshot | `camera.lucass_room_snapshot_2` — last saved snapshot |

> Note: Camera 1 entities (without `_2` suffix) have been removed. Only `_2` entities are used.

---

## View 9 · Media

**Purpose:** Centralized media control for all speakers and display devices.

| Section | Content |
|---------|---------|
| Marshall / WiiM Speakers | Per-room Marshall speaker controls via WiiM — volume slider, now playing, source selector |
| WiiM Controls | `media_player.edward_s_wiim_mini` (idle), `media_player.wiim_mini_ac9e` (idle). Note: `media_player.stanmore_ii_2`, `media_player.edward_s_2nd_wiim_mini`, `media_player.wiim_mini_2614` are currently unavailable — power on/reconnect during setup. |
| Sonos Zones | Lounge (Arc + Sub Mini via Tapo lounge TV strip), Bedroom (Beam via Tapo bedroom AV strip) — now playing, volume, group controls |
| Echo / Alexa | All Echo devices — volume sliders, TTS quick-send |
| Fire TVs | `media_player.lounge_fire_cube`, Bedroom Fire Cube — now playing, source selector |
| Echo Shows | `media_player.echo_show_15`, `media_player.edward_s_echo_show_21`, `media_player.lounge_echo_hub` — display controls, camera cast buttons |
| Volume per Room | Per-room volume control card for all active speakers |
| Quick Actions | Quiet Mode on/off, Show Nanit (S10), Show Lucas (S11) |

### Marshall / WiiM Speaker Inventory

| Entity ID | Device | Status |
|-----------|--------|--------|
| `media_player.stanmore_ii` | Stanmore II | idle — working ✅ |
| `media_player.stanmore_ii_2` | Stanmore II (2nd) | unavailable — likely duplicate/stale entity |
| `media_player.edward_s_wiim_mini` | Edward's WiiM Mini | idle — working ✅ |
| `media_player.edward_s_2nd_wiim_mini` | Edward's 2nd WiiM Mini | unavailable — power on/reconnect during setup |
| `media_player.wiim_mini_ac9e` | WiiM Mini-AC9E | idle — working ✅ |
| `media_player.wiim_mini_2614` | WiiM Mini-2614 | unavailable — power on/reconnect during setup |

> **Note:** Edward has 5–6 Marshall speakers on WiiMs total. Only 2 WiiMs are currently showing online. Additional WiiMs will need to be powered on and reconnected during setup. They will appear as new `media_player.*` entities once online. Marshall/WiiM speakers are the **standard music speakers** for all music-related automations and scripts.

### Sonos System

| Zone | Speakers | Power via |
|------|----------|-----------|
| Lounge | Sonos Arc + Sub Mini | Tapo Lounge TV/Entertainment strip |
| Bedroom | Sonos Beam | Tapo Bedroom AV strip |

---

# Part 5 — Package File Structure

```
packages/
├── core/
│   └── presence.yaml           # #1 Welcome Home, #2 Hallway Always On
│
├── lighting/
│   ├── time_of_day.yaml        # #3 Day Start, #4 Evening/Sunset, #5 End Goodnight
│   ├── motion.yaml             # #6 Cloakroom, #7 Lucas Bathroom, #8 Office,
│   │                           #   #9 Garden, #10 Kitchen, #11 Garden Door
│   └── modes.yaml              # #12 Bedroom Default, #13-14 Disco, #15-16 Quiet Mode,
│                               #   #17 DND, #18 Away Security Lights
│
├── climate/
│   └── tado.yaml               # #19 Daytime Heating, #20 Night Setback,
│                               #   #21 Office Heating Lock
│
├── lucas/
│   ├── routines.yaml           # #22 Bathtime, #23 Wind Down, #24 Bedtime,
│   │                           #   #28 Lucas Is Up, #32 Lucas Sleeping Toggle
│   ├── environment.yaml        # #29 Temp Cold, #30 Temp Hot, #31 Humidity Low/OK
│   └── alerts.yaml             # #25 Door Night Alert, #26 Bedroom Door Alert,
│                               #   #27 Wake Notification
│
├── security/
│   └── alerts.yaml             # #34 Doorbell, #35 Stairs Camera, #36 Camera Offline,
│                               #   #37 Water Leak Kitchen, #38 Water Leak Laundry
│
├── appliances/
│   └── notifications.yaml      # #39-45 All appliance done/alert automations
│
├── monitoring/
│   ├── health.yaml             # #46 Low Battery, #47 Critical Battery,
│   │                           #   #48 Integration Health Monitor
│   └── air_quality.yaml        # #33 Air Quality Alerts (Office, Lucas, Bedroom, Levoit)
│
├── vacation/
│   └── vacation.yaml           # #49 Vacation Mode On, #50 Vacation Mode Off
│
└── scripts/
    ├── routines.yaml           # S1 Goodnight, S8 Edward Sleeptime, S9 Morning Routine,
    │                           #   S12 Leaving Home
    ├── lucas.yaml              # S3 Lucas Wind Down, S4 Lucas Bedtime, S5 Nightlight,
    │                           #   S6 Bathtime, S7 Lucas Morning Routine
    ├── lights.yaml             # S2 All Lights Off
    └── cameras.yaml            # S10 Show Nanit, S11 Show Lucas
```

**configuration.yaml additions:**

```yaml
homeassistant:
  packages: !include_dir_named packages
```

> Place this in your `configuration.yaml`. Each `.yaml` file in the packages tree can contain `automation:`, `script:`, `input_boolean:`, `input_number:`, `input_select:` blocks. All package files are merged by HA at startup.

---

# Quick Reference: Open Issues & TODOs

| # | Issue | Action |
|---|-------|--------|
| 1 | **Tado re-auth** | Settings → Integrations → Tado → Reconfigure — deployed via API |
| 2 | **Kitchen motion sensor rename** | `binary_sensor.0x8c65a3fffef76686_occupancy` → `binary_sensor.kitchen_motion_sensor` — deploy via API before build |
| 3 | **Water leak sensors** (#37, #38) | Both returning `unknown` — check device pairing in Settings → Devices |
| 4 | **Edward's bedside air monitor** | Fully unavailable — physical hardware check needed |
| 5 | **Garden door sensor** (#11) | Hardware fix needed before automation will work |
| 6 | **media_player.kitchen** | Does not exist — remove from Morning Routine script (S9) |
| 7 | **browser_mod.delay** | Remove from Goodnight Routine (S1) — replace with native `delay:` |
| 8 | **Bedroom sleepy scene** | Fix scene entity ID in Goodnight Routine (S1) |
| 9 | **Show Nanit/Show Lucas** | Casting method varies by device — test each target device individually |
| 10 | **Additional WiiM speakers** | 5–6 Marshalls on WiiMs total — only 2 online. Power on/reconnect remaining units during setup |
| 11 | ~~**Air Conditioner integration**~~ | ✅ **RESOLVED** — Powrmatic Vision Maxi 3.6 DW, already integrated via Sensibo as `climate.edward_s_device`. Has climate control, filter alert, Climate React, timer. Rename entity to `climate.lounge_ac` during build. |
| 12 | ~~**NAS integration**~~ | ✅ **RESOLVED** — Synology DS224+ named "Eidam", already integrated via Synology DSM. 6 devices, 43 entities. Includes CPU, memory, drives, volume, USB disk, temperature, security status, reboot/shutdown buttons, Plex. Location: Hallway. |
| 13 | ~~**Bedroom Fire Cube entity**~~ | ✅ **RESOLVED** — `media_player.bedroom_fire_cube` (idle, connected). Fire TV Cube 3rd Gen (A1VGB7MHSIEYFK). Also: `media_player.bedroom_fire_tv` (off), `remote.bedroom_fire_tv`, `switch.bedroom_fire_cube_do_not_disturb`, `notify.bedroom_fire_cube_speak`, `notify.bedroom_fire_cube_announce`. Powered via `switch.unnamed_p304m_fire_cube` (Bedroom Power Strip Fire Cube). |
| 14 | ~~**Lounge Music / Bedroom Music source**~~ | ✅ **RESOLVED** — Lounge Music: Spotify playlist `spotify:playlist:58lLaGmeasS5F1L9kO3M0w` on lounge Marshall/WiiM. Bedroom Music: Spotify playlist `spotify:playlist:7xwPszrgjvANd8kQ3CXw3V` on bedroom Marshall/WiiM. Speaker entities TBD once remaining WiiMs are powered on. |
| 15 | **Stanmore II duplicate** | `media_player.stanmore_ii_2` likely stale — review and remove if confirmed duplicate |
| 16 | **Lucas camera 1 cleanup** | Remove first camera entities from HA UI once confirmed `_2` entities are working |

> ✅ **Resolved in v4:** Lullaby playlist URI (`spotify:playlist:37i9dQZF1DX0zmsulfyDdq` — Disney Lullaby), Evening Chill scene (lounge + bedroom), Evening Soiree scene (lounge), Lobby Buzzer (Ring MQTT — `button.lobby_open_door`).
> ✅ **Resolved in v5:** NAS = Synology DS224+ "Eidam" (already integrated, 43 entities). Bedroom Fire Cube = `media_player.bedroom_fire_cube` (3rd Gen, connected).
> ✅ **Resolved in v6:** AC = Powrmatic Vision Maxi 3.6 DW via Sensibo (`climate.edward_s_device`, working). Lounge Music = `spotify:playlist:58lLaGmeasS5F1L9kO3M0w`. Bedroom Music = `spotify:playlist:7xwPszrgjvANd8kQ3CXw3V`.

---

# Appendix: Available Hue Scenes Reference

All confirmed Hue scene entity IDs for Lounge and Bedroom. Use these in automations, scripts, and dashboard buttons.

## Lounge Scenes

| Entity ID | Friendly Name |
|-----------|---------------|
| `scene.lounge_rolling_hills` | Lounge Chill |
| `scene.lounge_island_warmth` | Island Warmth |
| `scene.lounge_soho` | Soho |
| `scene.lounge_dreamy_dusk` | Dreamy Dusk |
| `scene.lounge_natural_light` | Natural Light |
| `scene.lounge_golden_hours_6` | Rise and Shine |
| `scene.lounge_arise` | Arise |
| `scene.lounge_energise` | Energise |
| `scene.lounge_concentrate` | Concentrate |
| `scene.lounge_read` | Read |
| `scene.lounge_relax` | Relax |
| `scene.lounge_rest` | Rest |
| `scene.lounge_shine` | Shine |
| `scene.lounge_sleepy` | Sleepy |
| `scene.lounge_night_time` | Night-time |
| `scene.lounge_nightlight` | Nightlight |
| `scene.lounge_storybook` | Storybook |
| `scene.lounge_unwind` | Unwind |
| `scene.lounge_among_the_pines` | Among the Pines |

## Lounge TV Scenes

| Entity ID | Friendly Name |
|-----------|---------------|
| `scene.lounge_tv_island_warmth` | Island Warmth |
| `scene.lounge_tv_tokyo` | Tokyo |
| `scene.lounge_tv_relax` | Relax |
| `scene.lounge_tv_motown` | Motown |

## Bedroom Scenes

| Entity ID | Friendly Name |
|-----------|---------------|
| `scene.bedroom_rolling_hills` | Rolling Hills |
| `scene.bedroom_soho` | Soho |
| `scene.bedroom_dreamy_dusk` | Dreamy Dusk |
| `scene.bedroom_arise` | Arise |
| `scene.bedroom_dimmed` | Dimmed |
| `scene.bedroom_golden_hours_2` | Golden Hours |
| `scene.bedroom_night_time` | Night-time |
| `scene.bedroom_nightlight` | Nightlight |
| `scene.bedroom_read` | Read |
| `scene.bedroom_relax` | Relax |
| `scene.bedroom_shine` | Shine |
| `scene.bedroom_sleepy` | Sleepy |
| `scene.bedroom_storybook` | Storybook |
| `scene.bedroom_unwind` | Unwind |

---

*Document v4 — Updated 6 April 2026 4:12 PM — Definitive build spec. All changes deployed via API. Edward will not be asked to edit YAML or run terminal commands.*
