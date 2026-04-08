# Kohbo Dashboard Build — Peer Review Briefing

**Project:** Eidam Smart Home — Kohbo-style Dashboard
**Branch:** `kohbo-dashboard` on `chasebowman123/home-assistant-config`
**Checkpoint:** RC-0 (Phase 0 — Foundation)
**Date:** 2026-04-08
**Builder:** Claude (Opus 4.6)
**Review requested by:** Edward (homeowner)

---

## 1. Project Background

### What Is This?
Edward has a Home Assistant smart home ("Eidam Smart Home") running on Nabu Casa. He recently completed a "fresh start" rebuild — 67 automations, 12 scripts, and a 9-view storage-mode dashboard called "Eidam Fresh".

He now wants a **second dashboard** built in YAML mode, styled after the [Kohbo dashboard](https://github.com/johnkoht/hassio-config/tree/master/dashboards/kohbo) — a dark, modern HA dashboard built on custom:button-card templates, decluttering-card, layout-card, and a custom dark theme.

This new dashboard will run **alongside** the existing "Eidam Fresh" dashboard. It does NOT replace it. Edward will test the new dashboard and switch when ready.

### What Was Already In The Repo
The repo already contains the full Kohbo template infrastructure, copied from the original Kohbo project and partially adapted in a previous session:
- **77 button card templates** at `dashboards/templates/button_cards/`
- **23 decluttering templates** at `dashboards/templates/decluttering/`
- **38 include/style files** at `dashboards/templates/includes/`
- **Kohbo dark theme** at `themes/kohbo/kohbo.yaml`
- **An earlier Kohbo-Eidam adaptation** at `dashboards/kohbo-eidam/` (partially built, used as reference)

### What Phase 0 Added
18 new files under `dashboards/eidam/` — a complete dashboard structure adapted to Edward's home, rooms, and entities. All files reference the existing Kohbo template infrastructure via `!include` paths.

---

## 2. Key Decisions Made By The Owner

| Decision | Owner's Choice |
|----------|---------------|
| Theme | **Original Kohbo dark theme** (`theme: kohbo`) — no modifications. A pastel theme was initially explored but scrapped. |
| Dashboard mode | **YAML mode** — file-based, not UI-editable |
| Navbar views (6) | Speed Dial, Home, Rooms, Environment, Cameras, Lucas |
| Room subviews (8) | Lounge, Bedroom, Lucas's Room, Kitchen, Office, Hallway, Garden, Bathroom |
| Popups | **Bubble Card** slide-up panels (confirmed) |
| Person tracking | Edward, Lucas, Nanny (TBD), Mother (TBD) |
| Media players | Lounge: TV (Firecube) + Sonos + 2x Marshall · Bedroom: TV (Firecube) + Sonos + 2x Marshall · Roaming: 1x Marshall + 1x Sonos |
| Cameras | Lucas Ring camera (live feed) + Nanit (info card only — no native HA integration) |
| Custom icons | Owner will create custom SVG icons (30 needed). mdi: placeholders used for now. |
| No physical actions | **CRITICAL**: No automation triggers, no service calls, no enabling/disabling automations without explicit owner approval. Read-only operations only. |

---

## 3. Files Delivered (Phase 0)

### Dashboard Entry
| File | Purpose |
|------|---------|
| `dashboards/eidam/dashboard.yaml` | Main entry — loads button_card_templates + decluttering_templates via `!include_dir_merge_named`, enables kiosk_mode, includes all views |

### Navigation
| File | Purpose |
|------|---------|
| `dashboards/eidam/includes/navbar.yaml` | 6-tab bottom navbar (Speed Dial, Home, Rooms, Environment, Cameras, Lucas) + rooms submenu popup on hold |

### Main Views (6)
| File | View | Path |
|------|------|------|
| `dashboards/eidam/views/speed-dial.yaml` | Speed Dial | `/dashboard-eidam/speed-dial` |
| `dashboards/eidam/views/home.yaml` | Home | `/dashboard-eidam/home` |
| `dashboards/eidam/views/rooms/rooms-index.yaml` | Rooms | `/dashboard-eidam/rooms` |
| `dashboards/eidam/views/environment.yaml` | Environment | `/dashboard-eidam/environment` |
| `dashboards/eidam/views/cameras.yaml` | Cameras | `/dashboard-eidam/cameras` |
| `dashboards/eidam/views/lucas.yaml` | Lucas | `/dashboard-eidam/lucas` |

### Room Subviews (8)
| File | Room | Path |
|------|------|------|
| `dashboards/eidam/views/rooms/lounge.yaml` | Lounge | `/dashboard-eidam/rooms-lounge` |
| `dashboards/eidam/views/rooms/bedroom.yaml` | Bedroom | `/dashboard-eidam/rooms-bedroom` |
| `dashboards/eidam/views/rooms/lucas-room.yaml` | Lucas's Room | `/dashboard-eidam/rooms-lucas-room` |
| `dashboards/eidam/views/rooms/kitchen.yaml` | Kitchen | `/dashboard-eidam/rooms-kitchen` |
| `dashboards/eidam/views/rooms/office.yaml` | Office | `/dashboard-eidam/rooms-office` |
| `dashboards/eidam/views/rooms/hallway.yaml` | Hallway | `/dashboard-eidam/rooms-hallway` |
| `dashboards/eidam/views/rooms/garden.yaml` | Garden | `/dashboard-eidam/rooms-garden` |
| `dashboards/eidam/views/rooms/bathroom.yaml` | Bathroom | `/dashboard-eidam/rooms-bathroom` |

### Reference Documents
| File | Purpose |
|------|---------|
| `docs/entity-map.md` | Complete entity mapping by room — all entity_ids used in the dashboard |
| `themes/eidam-pastel/eidam-pastel.yaml` | Abandoned pastel theme (not referenced by anything — can be deleted) |

---

## 4. Architecture

### How The Dashboard Works
```
dashboard.yaml
├── Loads button_card_templates from /config/dashboards/templates/button_cards/
├── Loads decluttering_templates from /config/dashboards/templates/decluttering/
├── kiosk_mode: hide_header: true
└── views:
    ├── speed-dial.yaml (tab 0)
    ├── home.yaml (tab 1)
    ├── rooms-index.yaml (tab 2)
    │   └── subviews: lounge, bedroom, lucas-room, kitchen, office, hallway, garden, bathroom
    ├── environment.yaml (tab 3)
    ├── cameras.yaml (tab 4)
    └── lucas.yaml (tab 5)
```

Each view file:
1. Uses `type: custom:vertical-layout` with `layout: !include .../kohbo_page_layout.yaml`
2. Sets `theme: kohbo`
3. Has a header toolbar using `kohbo_header_page_title` template
4. Ends with `!include .../navbar.yaml`
5. Room subviews set `subview: true` and use `room_page_top_toolbar` decluttering template

### Template Dependencies
The new dashboard files reference these existing template files (NOT part of this PR — they were already in the repo):

**Button Card Templates Used:**
- `kohbo_header_page_title` — Page title in toolbar
- `kohbo_header_chip_card` — Chip button in toolbar
- `kohbo_chip_card` — Status chip (house mode, energy)
- `kohbo_device_entity` — Standard device card (155px height, icon + name + state)
- `kohbo_thermostat_entity` — Climate zone card
- `kohbo_security_item` — Security status item
- `kohbo_card_small_header` — Section header within stack-in-card
- `kohbo_popup_page_title` — Popup title
- `kohbo_person_entity` — Person avatar with status
- `section_title` — Section divider
- `empty_column` — Spacer

**Decluttering Templates Used:**
- `room_page_top_toolbar` — Room subview header with back button + settings
- `media_player` — Media player card
- `media_player_pop_up` — Media player popup panel

**Include Files Used:**
- `includes/layouts/kohbo_page_layout.yaml` — Page layout config
- `includes/card_mod/kohbo_nested_page_toolbar.yaml` — Toolbar styling
- `includes/card_mod/kohbo_layout_card_mod.yaml` — Layout card styling
- `includes/card_mod/base/kohbo_vertical_stack.yaml` — Vertical stack styling
- `includes/card_mod/base/kohbo_horizontal_stack_bg.yaml` — Horizontal stack bg
- `includes/card_mod/climate_card/kohbo_climate_card_stack_styles.yaml` — Climate card stack
- `includes/card_mod/entities/entity_no_icon.yaml` — Entity row no icon
- `includes/card_mod/chips/page_chip_layout.yaml` — Chip layout
- `includes/people/kohbo_person_entities_layout.yaml` — Person entity layout
- `includes/kohbo_boolean_entity_layout.yaml` — Boolean toggle layout
- `includes/kohbo_popup_styles.yaml` — Popup panel styling

---

## 5. Entity Reference

### Verified Entities (from live HA instance)
All entity_ids in the dashboard files were sourced from a live API pull of the HA instance. The full mapping is in `docs/entity-map.md`.

### Entities That Need Setup (TBD)
| Entity | Why TBD |
|--------|---------|
| person.lucas | May need to create |
| person.nanny / device_tracker for nanny | Not yet set up |
| person.mother / device_tracker for mother | Not yet set up |
| media_player.lounge_marshall_1 | In entity map but NOT yet used in dashboard cards |
| media_player.lounge_marshall_2 | In entity map but NOT yet used in dashboard cards |
| media_player.bedroom_marshall_1 | In entity map but NOT yet used in dashboard cards |
| media_player.bedroom_marshall_2 | In entity map but NOT yet used in dashboard cards |
| media_player.roaming_marshall | In entity map but NOT yet used in dashboard cards |
| media_player.roaming_sonos | In entity map but NOT yet used in dashboard cards |

### Known Entity Issues From Earlier Review
These were found during the automation review (separate from dashboard work) and some may affect dashboard entity references:

| Entity Used | Should Be | Status |
|------------|-----------|--------|
| person.edward location | Stuck on holiday location | Owner needs to reset iOS Companion App location permissions |

---

## 6. HACS Custom Components Required

All required custom components are already installed except one:

| Component | Installed? |
|-----------|------------|
| button-card | ✅ |
| card-mod | ✅ |
| stack-in-card | ✅ |
| decluttering-card | ✅ |
| layout-card | ✅ |
| navbar-card | ✅ |
| bubble-card | ✅ |
| browser-mod | ✅ |
| mini-graph-card | ✅ |
| apexcharts-card | ✅ |
| mushroom | ✅ |
| swipe-card | ✅ |
| template-entity-row | ✅ |
| horizon-card | ✅ |
| mediocre-media-player | ✅ |
| kiosk-mode | ✅ |
| **auto-entities** | ❌ **Needs install** |

---

## 7. What The Reviewer Should Check

### 7.1 File Structure & Includes
- [ ] Every `!include` path in `dashboard.yaml` resolves to a file that exists in the repo
- [ ] Every `!include` path in view files resolves to a file that exists in the repo (both new files and existing template infrastructure)
- [ ] Navbar URLs match the `path:` values in each view file
- [ ] Room subview `path:` values follow the pattern `rooms-{name}`
- [ ] All room subviews set `subview: true`
- [ ] The `dashboard.yaml` URL path (`/dashboard-eidam`) is consistent across all navbar routes

### 7.2 Entity Validation
- [ ] Every `entity:` value in view files exists in `docs/entity-map.md`
- [ ] No entity_id typos (compare against entity-map.md exactly)
- [ ] No references to old entity names (e.g., `climate.edward_s_device` should be `climate.lounge_ac`)
- [ ] Entities marked TBD in entity-map.md are not used in dashboard cards (or are appropriately handled)
- [ ] Marshall speakers (6 total) and roaming speakers (2 total) from entity-map.md are NOT yet in any view files — flag this as Phase 1 work

### 7.3 Template Usage
- [ ] All `template:` references in button-card configs exist in the repo's `dashboards/templates/button_cards/` directory
- [ ] All decluttering-card `template:` references exist in `dashboards/templates/decluttering/` directory
- [ ] Template variables passed to decluttering cards match expected parameters
- [ ] No templates are used with wrong parameters

### 7.4 Theme Consistency
- [ ] All 14 view files set `theme: kohbo` (NOT `eidam-pastel`)
- [ ] No hardcoded colour values that conflict with the Kohbo dark theme
- [ ] The abandoned `themes/eidam-pastel/eidam-pastel.yaml` file is not referenced anywhere

### 7.5 Navigation & Popups
- [ ] Navbar has exactly 6 routes: speed-dial, home, rooms, environment, cameras, lucas
- [ ] Rooms hold-action popup has correct subview URLs
- [ ] Every popup (`type: custom:bubble-card`, `card_type: pop-up`) has a matching `hash:` and a triggering element that navigates to that hash
- [ ] Every view ends with the navbar include
- [ ] Room subview back buttons navigate to `/dashboard-eidam/rooms`

### 7.6 Card Content Review
- [ ] **Speed Dial**: 7 boolean toggles present (lucas_sleeping, evening_entertaining, edward_alone, important_meeting, disco_disco, nanny_present, bad_weather)
- [ ] **Speed Dial**: Lobby Buzzer button calls `button.press` on `button.lobby_open_door`
- [ ] **Speed Dial**: 4 room mode selectors (lounge, bedroom, lucas_room, office)
- [ ] **Home**: House mode chip with state-based icons and colours
- [ ] **Home**: Person entity for Edward
- [ ] **Home**: Security section with 3 doorbell sensors + cameras + leaks
- [ ] **Home**: Climate grid with 5 thermostat cards (lounge, bedroom, lucas_room, office, lounge_ac) + lights overview
- [ ] **Rooms Index**: 8 room cards with navigation to correct subview paths
- [ ] **Each Room Subview**: Has mode selector, climate, lights, and settings popup (where applicable)
- [ ] **Environment**: 6 Tado heating zones + Sensibo AC + air quality + temperature graph + humidity
- [ ] **Cameras**: Ring camera live feed + 3 doorbell cards + Nanit info + lobby buzzer
- [ ] **Lucas**: Status (sleeping + room mode) + environment sensors + lights + climate + camera + media

### 7.7 Potential Issues to Flag
- [ ] The Lounge AC tile in environment.yaml uses `type: tile` (native HA card) while everything else uses Kohbo button-card templates — visual inconsistency?
- [ ] Lucas view uses `type: tile` for lights and climate — same inconsistency vs button-card approach used in other views
- [ ] Kitchen and bathroom subviews are sparse (1-2 cards each) — may need content for later phases
- [ ] Garden subview only has garden_lights — missing garden_door_light from entity map
- [ ] No Marshall speaker cards in any view yet (in entity map but not in dashboard)
- [ ] No roaming speaker cards yet
- [ ] media_player.kitchen entity used in kitchen subview — needs verification against HA
- [ ] `sensor.energy_daily` used in Home view chip — needs verification against HA

---

## 8. Project Phases Remaining

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Foundation — structure, entity map, theme, all views | ✅ **Complete (under review)** |
| 1 | Home View polish — person cards (4 people), security detail, light summary | Pending |
| 2 | Room Views — add Marshall speakers, missing lights, refine popups | Pending |
| 3 | Climate — Tado zone detail popups, AQ graphs, humidity tracking | Pending |
| 4 | Security — camera detail, door sensor popups, leak sensor cards | Pending |
| 5 | Appliances + Lucas — appliance monitoring, Lucas routine cards | Pending |
| 6 | Media + Polish — all media players, final QA, deployment guide | Pending |
| 7 | Deployment — deploy alongside Eidam Fresh (owner approval required) | Pending |

---

## 9. Critical Constraints

1. **NO physical actions**: Never trigger services, enable/disable automations, turn lights on/off, send notifications, or affect the live HA instance without explicit owner approval.
2. **Read-only is safe**: Reading entity states, checking logs, verifying configs — all fine.
3. **Smoke tests require approval**: Even "harmless" scripts like all_lights_off were triggered at 10pm without approval in a previous session. This must never happen again.
4. **No script.all_lights_off**: Owner has explicitly stated no script or automation should trigger all lights off. The script has been deleted from HA.
5. **Dashboard is additive**: This dashboard runs alongside the existing "Eidam Fresh" dashboard. It does not replace or modify it.

---

## 10. Actual File Contents

The reviewer should read all files on the `kohbo-dashboard` branch under `dashboards/eidam/`. The key files are:

```
dashboards/eidam/
├── dashboard.yaml                    # Main entry point
├── includes/
│   └── navbar.yaml                   # Bottom navigation bar
└── views/
    ├── speed-dial.yaml               # Quick toggles & actions
    ├── home.yaml                     # Overview dashboard
    ├── environment.yaml              # Climate & air quality
    ├── cameras.yaml                  # Camera feeds & doorbells
    ├── lucas.yaml                    # Dedicated Lucas view
    └── rooms/
        ├── rooms-index.yaml          # Room list
        ├── lounge.yaml               # Lounge subview
        ├── bedroom.yaml              # Bedroom subview
        ├── lucas-room.yaml           # Lucas's Room subview
        ├── kitchen.yaml              # Kitchen subview
        ├── office.yaml               # Office subview
        ├── hallway.yaml              # Hallway subview
        ├── garden.yaml               # Garden subview
        └── bathroom.yaml             # Bathroom subview
```

Additional reference: `docs/entity-map.md`

---

## 11. How To Submit Review Findings

Please structure your review as:

### Critical (will break rendering)
| # | File | Line/Section | Issue | Suggested Fix |
|---|------|-------------|-------|---------------|

### Medium (functional but incorrect)
| # | File | Line/Section | Issue | Suggested Fix |
|---|------|-------------|-------|---------------|

### Low (cosmetic or enhancement)
| # | File | Line/Section | Issue | Suggested Fix |
|---|------|-------------|-------|---------------|

### Observations (no action needed)
Bullet list of general observations about the build quality, patterns used, and recommendations for future phases.
