# Diagram Inventory — Charlotte Aviation Weather Academy

**Source:** `js/diagrams.js` (2113 lines) + `PROCESS_DIAGRAMS` (FAA PNGs already in use from `img/awh/`)
**Reference standard:** FAA-H-8083-28A
**Audit date:** 2026-05-07
**Companion to:** `AUDIT_2026-05-07.md`

Verdict legend:
- ✅ accurate — correctly depicts the concept at Part 61 student level
- ⚠️ misleading — factually defensible but easy to misread, or oversimplified to teach the wrong intuition
- ❌ wrong — depicts physics or symbology incorrectly
- 🤷 stylized — illustrative-only, no physical claim made

---

## Act 1 — Atmosphere / Wind / Clouds / Fronts / Pressure / Stability

| Diagram (function) | Concept taught | Verdict | Specific issue | FAA equiv? | Replace / Keep |
|---|---|---|---|---|---|
| `atmosphereSVG` | Atmospheric layers (troposphere → thermosphere) with tap-to-learn | ⚠️ misleading | Layer thicknesses not to scale (thermosphere ~280k+ ft drawn 60px; tropopause 25px). Pedagogically OK but visual proportions oversell troposphere. | Yes (Ch 4) | Keep — interactive tap-to-learn earns its keep; consider scale callout |
| `windForcesSVG` | PGF + Coriolis = geostrophic wind | ⚠️ misleading | PGF arrow direction correct, Coriolis curve correct for NH, but resulting "Wind" arrow has no clear geometric relationship to the 90° Coriolis rotation. Doesn't communicate steady-state PGF/Coriolis balance. | Yes (Ch 7) | Replace or redraw — interactive value low; FAA Ch 7 figures are clearer |
| `frontsSVG` | Cold/warm/stationary/occluded front symbology | ✅ accurate | Cold blue triangles, warm red semicircles, stationary alternating triangles ABOVE / semicircles BELOW (correct opposing-direction convention), occluded purple alternating same-side. | Yes (Ch 12) | **Keep** — symbology drawn correctly, interactive tap-to-learn is good |
| `cloudGallerySVG` + `showCloudInfo` | 8 cloud genera identification | 🤷 stylized | CSS-illustrated thumbnails are abstract impressions, not photographic ID. Cb has no anvil. Cu/Sc/Ac visually indistinguishable. Text descriptions accurate; visuals don't enable real-world ID. | Yes — FAA has photo plates per cloud (Ch 9) | **Replace** — FAA cloud photos are the standard for ID training |
| `jetStreamSVG` | Polar & subtropical jets, CAT zones, jet streak entrance/exit | ⚠️ misleading | CAT ellipses centered on the jet rather than offset to cyclonic (poleward/cold) side where strongest CAT lives. Jet-streak quadrants drawn as left/right blocks, not the four quadrants the (correct) text describes. | Yes (Ch 17) | **Replace** — visual contradicts the explanation text |
| `pressureSystemsSVG` | High/Low/Ridge/Trough cards | 🤷 stylized | Colored cards with text — no isobars, rotation arrows, or air-flow vectors. Text is accurate. | Yes (Ch 7) — FAA has actual H/L isobar diagrams | Replace — FAA isobar diagrams teach the rotation/flow that cards can't |
| `coldFrontCrossSectionSVG` | Vertical cross-section of advancing cold front | ❌ **wrong** | Cold-air polygon `points="0,185 300,185 0,22"` puts cold air filling the upper-left of the canvas at ~30,000 ft. **Inverts** FAA Fig 11-6, which shows cold air as a low wedge with warm air above at all altitudes. CB ellipses at ~y=130 (~22,000 ft) — too low; should reach the tropopause. | Yes — and **PROCESS_DIAGRAMS already uses `frontal_lifting_02.png`** for the same concept | **Delete** — redundant with the FAA PNG already in use |
| `densityAltCalc` | DA computed from PA + OAT slider | ✅ accurate | Formula `pa + 120*(oat - isaTemp)` and ISA `59 - (pa/1000 * 3.5)` are standard rule-of-thumb. *(Note: lesson-text version of this formula is wrong — uses °F instead of °C — but this calculator itself is correct.)* | No physical diagram equivalent | **Keep — high-value interactive** |
| `stabilitySlider` | Side-by-side stable vs unstable atmosphere | 🤷 stylized | Pure illustrative comparison. Bottom legend "ELR < MALR stable / ELR > DALR unstable" is correct. | No layout equivalent in FAA | **Keep** — earns its keep as a comparison |
| `waveCycloneSVG` (5 stages) | Norwegian wave cyclone life cycle | ✅ accurate | All 5 stages match textbook progression. Stationary front symbols correct. Stage 4 occlusion to NW of low (correct NH geometry). Stage 5 post-frontal Canadian high. | Yes (Ch 12) but FAA shows snapshots only | **Keep — animated stage progression teaches better than FAA stills** |
| `altimeterErrorSVG` + scenarios | High-to-low / hot-to-cold altimeter errors | ✅ accurate | "High to Low look out below" mnemonic correct; numbers (600 ft over-read at 5000 ft) illustrative-realistic; cold-temp error correctly shown as actual altitude lower than indicated. | No FAA visual equivalent | **Keep — earns its keep** |
| `lapseRateGraph` (interactive) | ELR vs DALR vs MALR stability | ✅ accurate | DALR 3°C/1000 ft and MALR ~1.5°C/1000 ft are conventional values. Classification thresholds correct. Minor display quibble at very low ELR (line clips off-screen). | No interactive equivalent | **Keep — physics correct, no FAA interactive** |
| `inversionTypesSVG` | Radiation/Subsidence/Frontal inversions cards | 🤷 stylized | Card layout, no physical sounding-curve depiction. | Yes (Ch 5 Fig 5-9 used elsewhere) | Replace — sounding curves teach inversions properly |

---

## Act 2 — Hazards: Storms, Icing, Turbulence, Fog, Mountain

| Diagram (function) | Concept taught | Verdict | Specific issue | FAA equiv? | Replace / Keep |
|---|---|---|---|---|---|
| `cbIngredients` | 3 ingredients: moisture / instability / lift | 🤷 stylized | Three SEPARATE triangles imply independence; the "ingredient triangle" metaphor in FAA Fig 22-1 is one triangle with three sides. Text accurate. | Yes (Ch 16, Fig 22-1) — and **PROCESS_DIAGRAMS already uses it** | **Delete** — redundant with FAA PNG already in use |
| `cbLifecycle` (3 stages) | Towering Cu / Mature / Dissipating | ⚠️ misleading | Mature stage anvil drawn as a thin trapezoid at y=30-45 while CB body is at y=100 — anvil is *separated* from the cloud top. In reality the anvil grows out of the top. | Yes (Ch 16, Fig 22-2) — **PROCESS_DIAGRAMS uses it** | **Delete** — redundant; the FAA figure is correct |
| `iceTypes` | Rime / Clear / Mixed cards | 🤷 stylized | Cards only — no airfoil shape, no horn depiction, no comparison of ice growth pattern. | Yes (Ch 18) — FAA has airfoil-with-ice diagrams | **Replace** — airfoil-ice diagrams teach what cards can't |
| `turbulenceSources` | CAT / Convective / Mechanical zones | ⚠️ misleading | Mountain peaks at y=110 don't reach the "JET STREAM CAT ZONE" band at y=0-60. CB cloud at y=110 also fails to reach the CAT zone (real CBs reach the tropopause). Mountain wave doesn't propagate. "INVERSION/SHEAR" indicated by a free-floating dashed line. Composition fails to teach where each turbulence type lives in the vertical column. | Yes (Ch 17) | **Replace** — needs proper vertical-column figure |
| `fogTypes` | Radiation/Advection/Upslope/Steam fog cards | 🤷 stylized | Tile-card layout. No formation mechanism depicted physically. Text accurate. | Yes (Ch 19) | Replace — FAA mechanism diagrams better |
| `mountainWave` | Lenticular crests, rotor, up/downdrafts | ⚠️ misleading | Wave path Q-curves place lenticulars just above the peak (peak y=100, lenticulars y=82). Real mountain-wave lenticulars form well above ridge height (often FL250+) with the rotor downwind, separated from the ridge by the wave length. Here the rotor is right next to the peak. Up/downdraft sides correct but pedagogically muddled. | Yes (Ch 20, Fig 16-13) — **PROCESS_DIAGRAMS already uses the FAA image** | **Delete** — redundant with the FAA PNG already in use |
| `microburstApproach` (4 phases) | Headwind→downdraft→tailwind→go-around | ✅ accurate | Phase progression matches FAA training material. Headwind first (airspeed-up trap), downdraft, then tailwind (airspeed collapses), recovery limited to phase 1. | Yes (Ch 16) | **Keep — animated phase walk teaches what stills cannot** |
| `icingSeverityCalc` | OAT × cloud type → severity | ✅ accurate | Severity mapping reasonable: peak risk -8 to -15°C, cumuliform > stratiform, SLD risk near 0°C. | No interactive equivalent | **Keep — interactive earns keep** |
| `turbulenceScale` | Light / Mod / Sev / Extreme reference cards | ✅ accurate | FAA AIM definitions correctly summarized. | Yes (Ch 17 table) | Keep or replace with FAA table — toss-up; current is accurate |
| `fogFormationCalc` | T-Td spread × wind → fog risk | ✅ accurate | T-Td ≤2°C with light wind = high radiation-fog risk; strong wind disperses; >5°C unlikely. Matches Ch 19. | No interactive equivalent | **Keep — interactive earns keep** |

---

## Act 3 — METAR / TAF / Products / Practice

| Diagram (function) | Concept taught | Verdict | Specific issue | FAA equiv? | Replace / Keep |
|---|---|---|---|---|---|
| `renderMetarDecoder` | METAR token decoder (uses `SAMPLE_METAR`) | ✅ accurate | Pure text decoder; tokens and detail strings are correct. | Yes (Fig 24-1) — **PROCESS_DIAGRAMS uses metar_syntax.png** for the format chart | **Keep** — interactive decoder + FAA syntax chart complement, not duplicate |
| `renderTafDecoder` | TAF group decoder | ✅ accurate | FM, TEMPO, PROB30, validity period DDHH/DDHH all accurate. | Yes (Table 27-3) | **Keep — interactive earns keep** |
| `renderPirepDecoder` | PIREP element decoder | ✅ accurate | UUA criteria, /OV /TM /FL /TP /IC /TB /TA /RM all correct. | No interactive FAA equivalent | **Keep — interactive earns keep** |
| `renderRadarGuide` | dBZ → intensity scale | ✅ accurate | dBZ thresholds <26, 26-40, 41-50, 50+ — *but content-accuracy audit flags these as slightly off vs FAA Table 24-1 (<30, 30-40, 40-50, >50)*. Update thresholds in lesson text and here. | Yes (Ch 24) | **Keep — interactive earns keep**, but fix threshold values |
| `renderFlightCategoryCalc` | Ceiling × visibility → LIFR/IFR/MVFR/VFR | ✅ accurate | Thresholds match FAA/AWC (LIFR <500/<1, IFR <1000/<3, MVFR <3000/<5, VFR else). | No interactive | **Keep — high-value calculator** |
| `renderWeatherCodeBuilder` | Build present-wx code from intensity / descriptor / phenomenon | ✅ accurate | Intensity (- moderate +) and most descriptors/phenomena present. Missing some less-common codes (DR, MI, PR, BC, PL, GS, IC, SQ, FC, DS, PO) — labeled as builder, not exhaustive, so OK. | No interactive | **Keep** — could optionally add the missing codes |
| `renderAdvisoryHierarchy` | Pyramid of Convective SIGMET / SIGMET / AIRMET / CWA | ⚠️ misleading | Pyramid metaphor implies strict priority ranking, but these advisories have *different domains* not strictly different priority levels. CWA at the bottom mis-suggests low priority when CWAs can be highly time-critical. Text accurate; visual metaphor misleads. | No FAA visual equivalent | **Keep but redesign** — four parallel cards (or a Venn-style domain diagram) > pyramid |
| `renderDecodePractice` | Practice decode of 2 sample METARs (KDEN, KSFO) | ✅ accurate | Sample METARs well-formed, decoding correct, density-altitude and LIFR commentary accurate. | No interactive | **Keep — interactive earns keep** |

---

## PROCESS_DIAGRAMS (already FAA-image-backed — for completeness)

These eight directly embed FAA PNGs from `img/awh/`. Verdict ✅ accurate by virtue of being FAA source material:

| Key | Files | Concept |
|---|---|---|
| `frontal_lifting` | `frontal_lifting_01/02/03.png` | Frontal lifting (cold/warm/occluded cross-sections) |
| `thunderstorm_lifecycle` | `thunderstorm_lifecycle_01/02.png` | CB stages |
| `density_altitude` | `density_altitude_01/02.png` | DA effect |
| `orographic_effect` | `orographic_effect_01/02/03.png` | Upslope / downslope / rain shadow |
| `temperature_inversion` | `temperature_inversion_01/02.png` | Inversion soundings |
| `icing_accretion` | `icing_accretion_01/02/03.png` | Ice growth on airfoil |
| `metar_syntax` | `metar_syntax.png` | METAR format chart |
| `taf_change_groups` | `taf_change_groups.png` | TAF change groups |

These are the template for the FAA-image-replacement pattern.

---

## Summary tally

- **30 SVG-based diagrams audited.** (Plus 8 PROCESS_DIAGRAMS already FAA-backed.)
- **Verdicts:**
  - ✅ Accurate: 13
  - ⚠️ Misleading: 7
  - ❌ Wrong: 1 (`coldFrontCrossSectionSVG`)
  - 🤷 Stylized-only: 9
- **Replace / delete recommendations: 13** (the misleading + wrong + stylized-where-FAA-exists)
- **Keep recommendations: 14** (calculators, decoders, animated sequences, interactive correct-physics SVGs)
- **Redesign recommendations: 2** (`renderAdvisoryHierarchy` pyramid, `windForcesSVG` if no FAA Ch 7 figure works)
- **Delete-as-redundant (PROCESS_DIAGRAMS already covers): 4** (`coldFrontCrossSectionSVG`, `cbIngredients`, `cbLifecycle`, `mountainWave`)

## Top 5 to fix first (audit consensus)

1. `coldFrontCrossSectionSVG` — wrong geometry; PROCESS_DIAGRAMS already has the FAA image
2. `mountainWave` — rotor placement / lenticular geometry wrong; PROCESS_DIAGRAMS already has FAA Fig 16-13/14
3. `cloudGallerySVG` — non-distinguishable thumbnails; FAA cloud photos are the standard
4. `jetStreamSVG` — CAT placement contradicts the (correct) text
5. `turbulenceSources` — vertical-column composition fails to teach geography of turbulence types

## Top 5+ keepers (do NOT replace with rasters)

1. `densityAltCalc`
2. `waveCycloneSVG` (5-stage tabbed)
3. `microburstApproach` (4-phase)
4. `icingSeverityCalc` / `fogFormationCalc` / `renderFlightCategoryCalc`
5. `renderMetarDecoder` / `renderTafDecoder` / `renderPirepDecoder` / `renderDecodePractice`
6. `lapseRateGraph` (bonus)
