# Rooms

[Back to main README](../README.md)

This document explains how rooms work in the Eidam Smart Home.

## Overview

Every room is treated as an independent unit with its own state machine. Rooms have:
- An `input_select` that manages the current **mode** (Auto, Off, etc.)
- An `input_boolean` that tracks **occupancy** (where applicable)
- Automations that respond to mode and occupancy changes

This approach allows granular control and avoids complex, monolithic automations.

---

## Room Modes

| Room | Modes | Description |
|------|-------|-------------|
| **House** | Auto, Away, Bedtime, Quiet, Vacation | Global state — rooms respond to this |
| **Lounge** | Auto, Movie, Music, Off | Auto-detects TV playing for Movie mode |
| **Bedroom** | Auto, Relaxing, Bedtime, Off | Gradual wind-down with Relaxing → Bedtime |
| **Lucas Room** | Awake, Napping, Bedtime, Away | Tied to lucas_napping boolean for quiet mode |
| **Kitchen** | Auto, Cooking, Off | Cooking mode = full brightness, no auto-off |
| **Office** | Available, DnD, Off | DnD dims lights and suppresses TTS |

---

## House State Cascade

When the house state changes, rooms respond:

| House State | Effect |
|-------------|--------|
| **Auto** | Normal operation — all room automations active |
| **Away** | Lights off, climate to eco, security armed |
| **Bedtime** | Triggered by Goodnight routine. Dims everything, arms home security |
| **Quiet** | Triggered by Lucas napping. Suppresses TTS, dims hallway |
| **Vacation** | Extended away — minimal climate, full security |

---

## Key Booleans

| Boolean | Purpose | Triggered By |
|---------|---------|-------------|
| `house_occupied` | Anyone home? | Person tracking |
| `guest_mode` | Guests visiting | Manual toggle |
| `quiet_mode` | Suppress noise | Lucas napping |
| `lighting_automations` | Global light auto toggle | Manual toggle |
| `bad_weather` | Weather is poor | Weather automation |
| `goodnight_active` | Bedtime sequence active | Goodnight routine |
| `dogs_are_out` | Dogs in garden | Manual toggle |
| `lucas_napping` | Lucas sleeping | Room state change |

---

## Anatomy of a Room: The Lounge

The Lounge demonstrates the full room lifecycle.

### Entities

| Entity | Purpose |
|--------|---------|
| `input_select.lounge` | Mode: Auto, Movie, Music, Off |
| `input_boolean.lounge_occupied` | Is someone in the lounge? |
| `media_player.55_oled` | Samsung OLED TV |
| `media_player.lounge` | Sonos Arc |

### A Day in the Life

**7:15 AM — Morning Routine fires**
The morning script sets the Rolling Hills scene. Lounge is in Auto mode.

**6:30 PM — TV starts playing**
The auto-movie-detection automation notices `media_player.55_oled` is "playing" after dark. It switches the lounge to Movie mode: spotlights off, strip light at 30%, Hue Play at 20%.

**9:00 PM — TV off for 5 minutes**
Auto-movie-off fires, returning the lounge to Auto mode.

**10:30 PM — Goodnight Routine**
House state changes to Bedtime. The goodnight script sets the lounge to the "Rest" scene.
