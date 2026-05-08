# Phase 2c — Stylized-Cards Picks (sign-off requested)

**Status:** Sign-off needed before any of the three swap/delete actions land in code.
**Branch:** `phase-2-diagrams` (Pass 2b shipped + Pass 2c structural fixes already committed; this doc is the gate before the stylized-card cleanup).
**References:** `PHASE_2_DIAGRAM_STRATEGY.md` · `PHASE_2B_PICKS.md` · `claude-code-pass-2c-prompt.md`

---

## Pass 2c work landed so far (no gate)

| Commit | Item |
|---|---|
| `91aa6c3` | refactor: move advisory_hierarchy diagram to s15_1, drop redundant cards |
| `5c8b868` | feat: add data-faa-figure sentinel for inline FAA figures |
| `64f11c0` | refactor: wire surface_wind_forces to s3_2, relocate Fig 25-5 to m19 |
| `797c00d` | feat: redraw cbIngredients as unified triangle |
| `808f745` | feat: add not-to-scale callout to atmosphereSVG |

---

## The big finding

Two of the three "remaining stylized cards" the prompt called out are **dead code**, the same pattern Pass 2a's deletes followed:

| SVG | Live call site? | What's actually wired in the section that should logically use it |
|---|---|---|
| `iceTypes()` | ❌ none | m7/s7_2 ('Three Types of Structural Ice') uses `diagram:{type:'process',key:'icing_accretion'}` — already routes to FAA Figs 20-1/20-2 via PROCESS_DIAGRAMS |
| `inversionTypesSVG()` | ❌ none | m4/s4_4 ('Temperature Inversions') uses `diagram:{type:'process',key:'temperature_inversion'}` — already routes to FAA Fig 5-9 via PROCESS_DIAGRAMS |
| `fogTypes()` | ✅ m9/s9_2 'Five Types of Fog' via `key:'fog_types'` | (real swap candidate below) |

Both dead SVGs are registered in their dispatchers (`ice_types` in the interactive map, `inversion_types` in the slider map) but no module section references those keys. The SVGs render only if a future section's `diagram:` config wires them, which currently nothing does. Same dead-code shape Pass 2a deleted three times over.

Verification grep:
- `grep -rn "ice_types\|inversion_types" js/` → only the dispatcher entries themselves; zero hits in `js/data/modules.js`.

So the work in Section 3 narrows to:
1. **`iceTypes`** — pure delete (no FAA pick needed)
2. **`inversionTypesSVG`** — pure delete (no FAA pick needed)
3. **`fogTypes`** — real FAA swap (figure picks below)

---

## fogTypes swap — picks table

The current `fogTypes` SVG renders five fog-type tiles with characteristic descriptions: Radiation, Advection, Upslope, Frontal/Precipitation-Induced, Steam. It's wired to **m9/s9_2 'Five Types of Fog'** via `diagram:{type:'interactive',key:'fog_types'}`.

The section's lesson body **also** has its own five-tile inline list in m9/s9_2's content (matching characteristics), so the current diagram block is partially redundant. The FAA equivalent is **formation diagrams** — they teach the *mechanism* visually rather than just labeling characteristics. Replacing the diagram with FAA formation figures gives the section two complementary visual treatments: the existing characteristics cards in the lesson body, and a new formation-mechanism grid as the diagram.

FAA-H-8083-28A has a clean 1:1 mapping for all five fog types in **Chapter 18**:

| Current SVG tile | FAA figure | File path | Why |
|---|---|---|---|
| 🌙 Radiation Fog | **Fig 18-1** Radiation Fog Formation | `awh_p0225_img_001.png` | Cross-section showing nighttime surface cooling and shallow saturation layer — the textbook formation mechanism for the section's "morning fog" framing. |
| 🌊 Advection Fog | **Fig 18-5** Advection Fog Formation | `awh_p0228_img_001.png` | Warm moist air moving over a cooler surface — the mechanism the section's lesson body describes. |
| ⛰️ Upslope Fog | **Fig 18-7** Upslope Fog Formation | `awh_p0229_img_001.png` | Moist stable air cooling adiabatically as it lifts up terrain — directly matches the section's "eastern slopes of Rockies" example. |
| 🌧️ Frontal / Precipitation-Induced Fog | **Fig 18-8** Frontal Fog Formation | `awh_p0230_img_001.png` | Warm rain falling through cooler air below a warm front — the precipitation-induced mechanism the section names. |
| ♨️ Steam Fog | **Fig 18-9** Steam Fog Formation | `awh_p0231_img_001.png` | Cold air over warm water producing visible vapor — the autumn-lakes scenario the section describes. |

**Implementation plan (post-sign-off):**
- Replace `fogTypes()` body with a 5-figure 2×3 grid (`.faa-fig-grid.cols-2-3`, like cloud gallery) using `renderFaaFigure` per cell.
- Each cell carries the FAA figure number, the official handbook caption as title, and a short operational hint in the caption (one line per fog type — distilled from the section's existing characteristic descriptions, NOT duplicating the inline cards).
- Drop the existing tap-to-popup `showFogInfo` mechanism (~30 lines) — content already lives in s9_2's inline cards above the grid.
- Hotspot dispatcher key stays `fog_types` (unchanged); section config unchanged.
- Copy the five new files into `img/awh/` keeping their `awh_p####_img_###.png` filenames; add to SW shell list and bump cache to v4.

**Alternative I considered and rejected:** swapping the section's inline characteristic cards FOR the FAA formation figures (one block instead of two). Rejected because the inline cards carry operational implications (wind speed thresholds, "burns off after sunrise", coastal vs land-locked, etc.) that the FAA formation figures don't. Two blocks teach more than one would.

---

## iceTypes — pure delete

No live call site. Pure dead-code removal, same as Pass 2a's `coldFrontCrossSectionSVG` / `cbLifecycle` / `mountainWave`.

| Function | Helper(s) also removed | Dispatcher entry | Live call sites |
|---|---|---|---|
| `iceTypes()` | `showIceDetail(id)` | interactive key `ice_types` | 0 |

The section that should logically have wired this (m7/s7_2 'Three Types of Structural Ice') already routes to the FAA `icing_accretion` PROCESS_DIAGRAMS, so no replacement is needed — the FAA images are already showing the correct content there.

---

## inversionTypesSVG — pure delete

No live call site. Pure dead-code removal.

| Function | Helper(s) also removed | Dispatcher entry | Live call sites |
|---|---|---|---|
| `inversionTypesSVG()` | `showInvInfo(id)` | slider key `inversion_types` | 0 |

The section that should logically have wired this (m4/s4_4 'Temperature Inversions') already routes to the FAA `temperature_inversion` PROCESS_DIAGRAMS (Fig 5-9 — sounding curve), which is dramatically more useful than a card layout for sounding-curve reading.

---

## Summary — what you're approving

1. **fogTypes swap to a 5-figure 2×3 FAA grid** using Figs 18-1, 18-5, 18-7, 18-8, 18-9 from FAA Ch 18 (file paths above).
2. **iceTypes deletion** as dead code (function + `showIceDetail` helper + dispatcher entry).
3. **inversionTypesSVG deletion** as dead code (function + `showInvInfo` helper + dispatcher entry).

Pending sign-off, the implementation order is: copy the 5 new fog images into `img/awh/`, swap `fogTypes()` to use them, delete the two dead SVGs in a single cleanup commit, then SW shell update + cache bump to v4.

After that: mobile responsive verification (Section 4) → final smoke pass + merge proposal (Section 5 / gate 2).

Stopping per Prompt F's "Stop after Section 3's pick table" gate.
