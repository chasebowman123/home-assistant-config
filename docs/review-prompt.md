# HA Fresh Start — Review & QA Prompt

Paste this into a new session to pick up where we left off and do a thorough review.

---

## Context

I've just completed a major Home Assistant fresh start build. Everything has been deployed to my HA instance via API. I need you to do a thorough review of everything that was deployed to ensure perfection before I start using it daily and remove the old automations.

## What was deployed

- **67 automations** across 11 package YAML files
- **12 scripts** across 4 package YAML files  
- **1 Lovelace dashboard** ("Eidam Fresh" at /eidam-fresh) with 9 views and 233 cards
- **Entity renames**: `climate.edward_s_device` → `climate.lounge_ac` (+ all Sensibo sub-entities)

## Files to review

All package YAML files are at `/home/user/workspace/ha-packages/`:
```
packages/
├── core/presence.yaml              # Welcome Home, Hallway Always On, input_select.house
├── lighting/time_of_day.yaml       # Day Start, Evening Sunset, End Goodnight
├── lighting/motion.yaml            # Cloakroom, Lucas Bathroom, Office, Garden, Kitchen, Garden Door
├── lighting/modes.yaml             # Bedroom Default, Disco, Quiet Mode, DND, Away Security
├── climate/tado.yaml               # Daytime Heating, Night Setback, Office Heating Lock
├── lucas/routines.yaml             # Wind Down Reminder/Action, Bedtime Reminder/Action, Is Up, Sleeping Toggle
├── lucas/environment.yaml          # Temp Cold/Hot, Humidity Low/OK
├── lucas/alerts.yaml               # Door Night Alert, Bedroom Door Alert, Wake Notification
├── security/alerts.yaml            # Doorbell, Stairs Motion, Camera Offline, Water Leaks
├── appliances/notifications.yaml   # Washing Machine/Dryer/Dishwasher Done, Salt, Oven, Fridge, Humidifier
├── monitoring/health.yaml          # Low Battery, Critical Battery, Integration Health
├── monitoring/air_quality.yaml     # Air Quality alerts (Office, Lucas, Bedroom, Levoit)
├── vacation/vacation.yaml          # Vacation Mode On/Off
├── scripts/routines.yaml           # S1 Goodnight, S8 Edward Sleeptime, S9 Morning, S12 Leaving Home
├── scripts/lucas.yaml              # S3 Wind Down, S4 Bedtime, S5 Nightlight, S6 Bathtime, S7 Morning
├── scripts/lights.yaml             # S2 All Lights Off
└── scripts/cameras.yaml            # S10 Show Nanit, S11 Show Lucas
```

The dashboard JSON is at `/home/user/workspace/ha-dashboard.json`.

The master plan (definitive build spec) is at `/home/user/workspace/ha-final-master-plan.md` (v6).

The full entity reference is at `/home/user/workspace/ha-entity-reference.txt`.

## What I need you to do

### 1. Cross-reference every automation/script against the master plan
- Read the master plan (`ha-final-master-plan.md`) Part 1 (Scripts) and Part 2 (Automations)
- For each of the 50 automations and 12 scripts spec'd in the plan, verify the deployed YAML matches the spec exactly
- Flag any missing automations, wrong entity IDs, incorrect triggers/conditions/actions, or deviations from the plan

### 2. Validate all entity IDs against live HA
- Connect to HA at `https://nujraxh1k9mt9kk0ul8x56dxac9afine.ui.nabu.casa` with token `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmYWUxZDUyYTdkMDY0YzljODc5NmZjYzY5ZGM4YTlmMSIsImlhdCI6MTc3NTQ3Mzc2OCwiZXhwIjoyMDkwODMzNzY4fQ.-AH3Lx47zsrqwi1UZcCyNEPaVQfH7oxa8ZlmGZD-gS4`
- Pull fresh entity states from `/api/states`
- Check every entity_id referenced in every YAML file exists in HA (excluding known placeholders marked with ⚠ PLACEHOLDER)
- Flag any entity IDs that don't exist or are misspelt

### 3. Review the dashboard
- Pull the dashboard config from HA via WebSocket (`lovelace/config` for url_path `eidam-fresh`)
- Verify all 9 views are present with the correct sections per the master plan Part 4
- Check all entity_ids in card configs exist
- Look for any cards referencing old entity names (e.g. `climate.edward_s_device` should be `climate.lounge_ac`)
- Check that Quick Actions buttons call the correct scripts/automations
- Verify the Lobby Buzzer button calls `button.lobby_open_door`

### 4. Check for conflicts with old automations
- The old automations are still running alongside the new ones
- Identify any old automations that duplicate new ones (same triggers, same actions)
- Give me a list of old automation entity_ids that should be disabled/removed

### 5. Smoke test key automations
- Trigger a few automations via API to verify they execute correctly
- Suggested tests: Day Start, Lucas Wind Down script (just the lighting part), All Lights Off script
- Check HA logs after each test for errors

### 6. Compile a fix list
- Present a table of every issue found with: file, issue description, severity (critical/medium/low), and fix
- Fix all critical and medium issues directly via API
- Present the updated files

## Important rules
- Do NOT ask me to edit YAML or run terminal commands — make all fixes yourself via API
- My HA URL: `https://nujraxh1k9mt9kk0ul8x56dxac9afine.ui.nabu.casa`
- My HA token: (same as above)
- Notification target: `notify.mobile_app_ee_iphone_16_pro_max`
- All dashboards should follow the Kohbo dark theme style (clean, modern, dark cards)
