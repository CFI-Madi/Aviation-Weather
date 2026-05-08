# Phase 2b — FAA Figure Picks (sign-off requested)

**Status:** Sign-off needed before any 2b implementation begins.
**Branch:** `phase-2a-deletes` (Pass 2a is committed; this doc is part of the same branch lineage but no 2b code changes have been made).
**References:** `PHASE_2_DIAGRAM_STRATEGY.md` · `DIAGRAM_INVENTORY.md` · `claude-code-phase-3-prompt.md`

---

## Pass 2a — Executed and committed

Three pure-delete dead-code paths removed on branch `phase-2a-deletes`:

| Function | Helper(s) also removed | Dispatcher entry | Live call sites |
|---|---|---|---|
| `coldFrontCrossSectionSVG()` | `showCFInfo(id)` | hotspot config `cold_front_cross` | 0 |
| `cbLifecycle()` | `showLifecycleStage(n)` | interactive key `cb_lifecycle` | 0 |
| `mountainWave()` | `showWaveZone(id)` | interactive key `mountain_wave` | 0 |

Plus one dead post-render hook line in `js/screens.js`:
- `if (k === 'cb_lifecycle') Diagrams.showLifecycleStage(0);` (the only consumer for the deleted `showLifecycleStage` outside its own diagram)

**Net change:** `js/diagrams.js` -235 lines, `js/screens.js` -1 line. Two commits on `phase-2a-deletes`:
- `d454731` — docs: add Phase 2 diagram replacement strategy
- `1d93741` — chore: remove dead diagram registrations

**Smoke test (cache cleared, fresh reload):**
- All 6 deleted function names resolve to `undefined` on `Diagrams` ✓
- M1 (atmosphere hotspot), M5 (frontal_lifting via PROCESS_DIAGRAMS), M6 (cbIngredients still wired), M10 (orographic_effect via PROCESS_DIAGRAMS) all render correctly ✓
- Zero console errors across all four module loads ✓

### The 4th "redundant with PROCESS_DIAGRAMS" SVG

You asked which the 4th was. It's **`cbIngredients`**, and it has a **live call site**:
- `js/data/modules.js:1071` — m6/s6_3 wires `diagram:{type:'interactive',key:'cb_ingredients'}`

So it cannot be deleted in 2a. It's a replace-then-delete candidate. There's no FAA Figure 22-1 in the extraction (Ch 22 is "Thunderstorms" but the AWH numbering puts thunderstorms in Ch 19). The FAA equivalent of "ingredients for a thunderstorm" appears textually in the handbook but I did not find a single dedicated illustration for it in the image library. **Recommend deferring to Pass 2c** — either redraw the SVG as one unified triangle (matching the metaphor) or substitute a different teaching approach (3 ingredient cards each linked to relevant FAA figures elsewhere).

---

## `frontsSVG` review (per amendment in Prompt D)

**One-sentence verdict on what the visual depicts:**
> The visual is purely the four front symbols (line + markers) laid out as a 2×2 reference grid; mechanics (slope ratios, speed, weather characteristics, cloud sequences) live in tap-to-expand popup text, not in the visual.

**Recommendation: ESCALATE TO REPLACEMENT LIST.**

Symbology accuracy is reference-card behavior, and FAA Figure 11-4 (verified visually) presents the same four symbols in a cleaner table that includes the definitions as columns rather than tap-to-expand text. The interactive popup pattern was the SVG's main pedagogical claim, but the popup content is a paraphrase of FAA Ch 11 — using the FAA figure preserves the source-of-truth signal without losing teaching content (we can keep the popup-on-tap interaction as a wrapper around the FAA image if the engagement matters).

If kept as a swap, the picks table includes `frontsSVG` (see below).

---

## Pass 2b — Figure-pick table (sign-off needed before implementation)

**Important chapter-numbering correction.** My earlier strategy doc referenced "Ch 7 / Ch 12 / Ch 17" for pressure, fronts, and turbulence. The actual FAA-H-8083-28A (Dec 2024 edition) puts these in **Ch 9 (Atmospheric Circulation, jet streams)**, **Ch 10 (Wind, PGF/Coriolis)**, **Ch 11 (Air Masses & Fronts)**, **Ch 19 (Turbulence)**, and **Ch 25 (Surface Charts)**. The picks below reference the correct -28A figure numbers and the actual page numbers from the extraction at `C:\FAA Images\aviation weather handbook images\images_png\`.

### 6 swaps (5 strategy-doc originals + 1 escalated)

| SVG name | Concept it teaches | Proposed FAA figure | File path | Why this figure for this concept | Live call sites |
|---|---|---|---|---|---|
| **`cloudGallerySVG`** | Cloud-genera identification (Cb, Cu, St, Sc, Ns, As, Ac, Ci) | **Appendix A · Figs A-1 through A-12** (12 photos) | `images_png/awh_p0492_img_001.png` (Ci) through `awh_p0501_img_002.png` (Stfra/Cufra) — full file list at end of this doc | Appendix A is FAA's official cloud-genera photo plate set. They are real cloud photographs, not stylized icons — exactly what the audit said cloud ID needs. Verified visually: A-1 Cirrus is a clean photo of high wispy cirrus against blue sky. The 12 plates expand the SVG's 8 genera by adding Cc (cirrocumulus), ACSL (lenticular), TCu (towering Cu), and the Fractus types — pedagogical bonus. | `m4/s4_3` and possibly elsewhere; verify via `svgKey:'cloud_gallery'` grep before swap |
| **`jetStreamSVG`** | Polar + subtropical jet location, jet altitude, CAT zone, jet-streak quadrants | **Fig 9-5** (Polar and Subtropical Jet Streams Around the Globe) | `images_png/awh_p0119_img_002.png` | Verified visually: clean globe view with both jets winding around, polar (blue) at higher latitude, subtropical (red) at temperate latitude. **Caveat:** Fig 9-5 covers jet *location only* — it does not show CAT zones or streak quadrants. Those two pieces of the SVG's teaching content do not have a single matching FAA figure. **Recommendation:** swap with Fig 9-5 for jet location, and move the CAT-near-jet teaching content into a separate small diagram in the turbulence/CAT lesson section, paired with the relevant Ch 19 turbulence figure (or with no figure — leave as text + the existing M8 CAT lesson). Streak quadrants should drop or move to text. **Alternative if you want one figure that combines jets + speeds:** Fig 9-6 "Jet Stream Wind Speeds" (`awh_p0120_img_001.png`). | `m3/s3_3` (Jet Streams hotspot diagram); verify `svgKey:'jet_stream'` |
| **`turbulenceSources`** | Four turbulence categories (CAT, convective, mechanical, inversion/shear) in one composite | **Figs 19-1 · 19-4 · 19-5 · 19-6** rendered as a 2×2 grid | `images_png/awh_p0237_img_001.png` (19-1 Convective), `awh_p0239_img_002.png` (19-4 Mechanical), `awh_p0240_img_001.png` (19-5 Wind Shear), `awh_p0241_img_001.png` (19-6 Wind Shear w/ Inversion) | Verified visually: 19-1 shows aircraft above smooth cumuliform vs aircraft inside turbulence over uneven heating; 19-4 shows wind/eddies past an airport tower (helicopter on ramp); 19-6 shows the warm-air-over-cold-air inversion with eddies at the boundary. Together these four cover the SVG's intent (turbulence types by mechanism) with FAA-source authority. **CAT is not represented** in Ch 19 — the FAA discusses CAT in jet-stream context (Ch 9) and on SIGWX charts (Ch 27). **Recommendation:** the 2×2 grid uses 19-1 / 19-4 / 19-5 / 19-6, and the CAT teaching content moves to text in M8/s8_3 (which is already where CAT lives — the audit's content-accuracy fixes already adjusted this section). | `m8/s8_2`; verify via `key:'turbulence_sources'` |
| **`pressureSystemsSVG`** | High / Low / Ridge / Trough patterns and their isobar shapes on a surface analysis chart | **Fig 25-5** (Schematic of Surface Chart Pressure Patterns) | `images_png/awh_p0354_img_001.png` | Verified visually: a US map with H/L pressure systems labeled, isobars at 4mb intervals (1024, 1020, 1016, 1012, 1008), troughs as dashed blue lines, drainage axes as brown dashed lines. This is the canonical FAA depiction of synoptic surface pressure patterns — exactly what `pressureSystemsSVG` was attempting with stylized cards. The figure also acts as a bridge to surface-analysis chart reading, which is a skill `m25` (charts) covers. | `m3/s3_2` Upper Air vs Surface Wind hotspot; verify via `svgKey:'pressure_systems'` |
| **`windForcesSVG`** | PGF + Coriolis = geostrophic wind (steady-state balance) | **Fig 10-8** (Geostrophic Wind) | `images_png/awh_p0126_img_001.png` | Verified visually: this is THE textbook PGF/Coriolis-balance diagram. Two-panel layout — the LEFT panel shows the parcel accelerating (NET FORCE), the RIGHT panel shows the parcel at the geostrophic-balance steady state (NO NET FORCE) with PGF pointing toward lower heights, Coriolis pointing perpendicular and equal-and-opposite, and resultant wind parallel to the height contours. Captures exactly what the SVG was failing to show. **Companion:** `Fig 10-10 Surface Wind Forces` (`awh_p0127_img_002.png`) for the surface-wind sub-topic if the lesson distinguishes upper-air vs surface (it does — m3/s3_2). | `m3/s3_1` Wind Forces hotspot; verify via `svgKey:'wind_forces'` |
| **`frontsSVG`** *(escalated)* | Cold/Warm/Stationary/Occluded front symbology | **Fig 11-4** (Fronts — chart symbols + definitions table) | `images_png/awh_p0142_img_002.png` | Verified visually: a clean four-row table (Cold / Warm / Stationary / Occluded) showing chart symbol + definition, with the footnote "Frontal symbols point in the direction of frontal movement." This is everything `frontsSVG` was teaching, in the FAA's voice. **Alternative if you want individual diagrams per front type:** Fig 11-5 (Warm), 11-6 (Cold), 11-7 (Stationary), 11-8 (Occluded) at pages 143-146 — but those are deeper cross-sections / synoptic views rather than reference-card material, and would actually go further than `frontsSVG` claimed to teach. **Recommendation:** start with the single Fig 11-4 table (preserves the SVG's reference-card framing) and keep the existing `Diagrams.showPopup` interaction as a tap-to-expand wrapper around the rendered FAA image. | `m5/s5_1`; verify via `svgKey:'fronts_diagram'` |

### Cloud genera — full file list for `cloudGallerySVG`

| Genus | FAA fig | File |
|---|---|---|
| Cirrus (Ci) | A-1 | `awh_p0492_img_001.png` |
| Cirrocumulus (Cc) | A-2 | `awh_p0493_img_001.png` |
| Cirrostratus (Cs) | A-3 | `awh_p0494_img_001.png` |
| Altocumulus (Ac) | A-4 | `awh_p0495_img_001.png` |
| Altocumulus Standing Lenticular (ACSL) | A-5 | `awh_p0496_img_001.png` |
| Thin Altostratus (As) | A-6 | `awh_p0497_img_001.png` |
| Thick Altostratus / Nimbostratus (Ns) | A-7 | `awh_p0498_img_001.png` |
| Cumulus (Cu) | A-8 | `awh_p0499_img_001.png` |
| Towering Cumulus (TCu) | A-9 | `awh_p0499_img_002.png` |
| Stratocumulus (Sc) | A-10 | `awh_p0500_img_001.png` |
| Stratus (St) | A-11 | `awh_p0501_img_001.png` |
| Stratus Fractus / Cumulus Fractus | A-12 | `awh_p0501_img_002.png` |

### No-clear-FAA-equivalent flags

Two areas where the FAA library does not cleanly map to the SVG's teaching content:

1. **`jetStreamSVG`'s CAT-near-jet and streak-quadrant content.** Fig 9-5 covers jet location only. CAT is discussed in Ch 19 (turbulence) and on SIGWX charts (Ch 27) but not in a single combined "where CAT lives relative to the jet core" diagram. **My recommendation:** the SVG's two extra teaching pieces (CAT placement + streak quadrants) should NOT block the swap — they should move to lesson text. The lesson body in m3/s3_3 already covers the right-exit/left-entrance mnemonic textually; we can lean on that instead of a visual.

2. **`turbulenceSources`'s CAT panel.** Same issue. Ch 19's four turbulence figures cover the four mechanisms minus CAT. CAT is its own specialized topic in Ch 9 / Ch 19 / Ch 27. **My recommendation:** drop the CAT panel from the 2×2 grid — the FAA itself splits this content, and m8/s8_3 already covers CAT thoroughly in text. If you really want a CAT panel, the closest visual is Fig 9-5 (jet location) repurposed, which is awkward. Better to be explicit: this lesson's diagram covers the four mechanism types; CAT is treated separately in the next sub-section.

3. **`cbIngredients`** (deferred to 2c, mentioned earlier). No clean FAA figure for "moisture + instability + lift triangle". Either redraw the SVG to fix the metaphor (one triangle with three sides) or substitute three small linked cards. Defer the decision until 2c starts.

---

## `renderAdvisoryHierarchy` redraw — design proposal

**Layout**: 2×2 grid on desktop (≥768px), single-column stack on mobile (<768px). Order per your decision: **Convective SIGMET → SIGMET → CWA → AIRMET**.

```
DESKTOP (≥768px)                 MOBILE (<768px)
┌────────────┬────────────┐      ┌────────────┐
│ Convective │ SIGMET     │      │ Conv SIGMET│
│   SIGMET   │ (non-conv) │      ├────────────┤
├────────────┼────────────┤      │ SIGMET     │
│   CWA      │  AIRMET    │      ├────────────┤
│            │  (Sierra/  │      │   CWA      │
│            │  Tango/    │      ├────────────┤
│            │  Zulu)     │      │  AIRMET    │
└────────────┴────────────┘      └────────────┘
```

**Per-card structure** (4 zones top-to-bottom):

```
┌─────────────────────────────────────┐
│ ⛈️  CONVECTIVE SIGMET    [WST]      │  ← Header: emoji + name + product code
│                                      │      (var(--font-display), bold)
├─────────────────────────────────────┤
│ Valid: up to 2 hours                 │  ← Validity (var(--font-mono), small)
├─────────────────────────────────────┤
│ Embedded thunderstorms · severe      │  ← Coverage list (var(--font-body))
│ convective turbulence · winds >50kt  │     bullet-style or comma-separated
│ from convection · hail ≥3/4" · lines │
│ of CBs >60 NM · areas of CBs >3,000  │
│ sq mi · tornadoes                    │
├─────────────────────────────────────┤
│ Issued by: AWC (Kansas City)         │  ← Issuing agency (small, color-tinted)
└─────────────────────────────────────┘
```

**Card content (4 cards in order):**

| # | Header | Validity | Coverage | Issuing agency |
|---|---|---|---|---|
| 1 | ⛈️ **Convective SIGMET** *(WST)* | Up to **2 hours** (issued at H+55, special bulletins as needed) | Embedded thunderstorms · severe/extreme convective turbulence · convective surface winds >50 kt · hail ≥3/4" · lines of CBs >60 NM · areas of CBs >3,000 sq mi · tornadoes | Aviation Weather Center (AWC), Kansas City |
| 2 | 🌋 **SIGMET** *(WS, non-convective)* | Up to **4 hours** (6 hr for volcanic ash and tropical cyclones) | Severe icing not from thunderstorms · severe/extreme non-convective turbulence · volcanic ash · widespread dust/sandstorms (≥3/8 sky and >5,000 ft) | Aviation Weather Center (AWC) |
| 3 | 📍 **CWA** *(Center Weather Advisory)* | Up to **2 hours** (issued only when needed) | Short-term hazardous weather affecting NAS traffic flow within an ARTCC's airspace; supplements SIGMETs for rapidly developing conditions | Center Weather Service Unit (CWSU), co-located with each ARTCC |
| 4 | 🌫️💥❄️ **AIRMET** *(WA / G-AIRMET — Sierra/Tango/Zulu)* | **6 hours** per forecast period (issued every 6 hours, with updates) | **Sierra:** IFR (cigs <1,000 ft and/or vis <3 SM affecting >50% of area), mountain obscuration · **Tango:** moderate turbulence, surface wind ≥30 kt, LLWS · **Zulu:** moderate icing, freezing levels | Aviation Weather Center (AWC) |

**Color treatment:**
- Each card has a small left-border color strip matching its existing palette in `js/diagrams.js` (Convective SIGMET = `#DC2626` red, SIGMET = `#7C3AED` purple, CWA = `#059669` green, AIRMET = `#F59E0B` amber).
- Background of each card: very light tint of that color (e.g., `#FEF2F2`, `#F5F3FF`, `#ECFDF5`, `#FEF3C7`).
- The order is non-arbitrary (validity-period framing per your decision) but the visual treatment makes it clear that this is a *category* layout, not a *severity* ranking.

**CSS structure** (vanilla, no framework):

```css
.advisory-grid {
  display: grid;
  grid-template-columns: 1fr;            /* mobile default */
  gap: 12px;
}
@media (min-width: 768px) {
  .advisory-grid {
    grid-template-columns: 1fr 1fr;       /* 2×2 on desktop */
  }
}
```

Under 200 lines of HTML once rendered (vs the current pyramid SVG, which is ~80 lines and misleads). The pyramid metaphor goes away entirely; the four advisories are presented as a category set with their actual operational characteristics.

---

## Summary — what you're approving (or amending) before 2b implementation begins

1. **Six swaps** with the figure picks and file paths above.
2. **`frontsSVG` escalation** to the swap list, with Fig 11-4 as the replacement.
3. **Two no-clean-FAA-equivalent flags**: jetStream's CAT/streak content moves to lesson text; turbulenceSources drops the CAT panel and notes CAT is treated separately. Both are expectation-setters, not blockers.
4. **`cbIngredients` deferred** to Pass 2c (live call site + no FAA Fig 22-1 equivalent in the extraction).
5. **`renderAdvisoryHierarchy` redraw**: 2×2 grid as designed above, content per the four-card table, with the color treatment listed.

Pending your sign-off, the next implementation step is to write the `renderFaaFigure({ src, figureNumber, title, caption })` helper and execute the six swaps, then the advisory-hierarchy redraw — all on the same `phase-2a-deletes` branch (which I'll likely rename to `phase-2-diagrams` once 2b code lands).

Stopping per Prompt D's "do not start writing the helper, do not start swapping diagrams" gate.
