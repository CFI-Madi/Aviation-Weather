# FAA Correction Pass

## Scope

This pass used the existing FAA validation audit and validation map as the driver for targeted corrections. The goal was to reduce product-risk wording, improve traceability reliability, and keep the app honest about where it is teaching FAA-backed concepts versus study-oriented simplifications.

## Corrections Made

### Rewritten as safer FAA-consistent paraphrase

- `m1a:s1a_1` reframed the weather-service overview as a simplified study model rather than an official three-tier hierarchy.
- `m1a:s1a_2` relabeled the six-part briefing structure as a training simplification and softened the sequencing language.
- `m1a:s1a_3` softened “start here every time” and similar absolute briefing guidance.
- `m1a:s1a_4` changed issue-time guidance from a hard rule to a current-data reminder.
- `m6:s6_5` replaced absolute thunderstorm “rule” language with conservative study guidance and softened the distance table.
- `m9:s9_4` changed fog departure and burn-off language from absolute operational instructions to cautious training guidance.
- `m13:s13_4` removed “duty to report” framing and replaced it with practical reporting guidance.
- `m15:s15_2` removed legal-violation language around Convective SIGMETs.
- `m15:s15_5` softened G-AIRMET Zulu “no-go” phrasing into serious reassessment guidance.
- `m15:s15_6` relabeled the advisory order as a study note rather than an official priority ladder.
- `m16:s16_1` and `m16:s16_3` softened briefing/self-briefing wording that sounded more authoritative than the source support.
- `m20:s20_4` softened volcanic ash, tropical cyclone, and space-weather wording that sounded overly absolute.
- `m20:s20_5` relabeled the full briefing flow as a practical study flow rather than a prescribed professional process.

### Relabeled or preserved as training simplification

- `m7:s7_5` remains a practical study summary because it blends weather concepts with aircraft-system handling and POH/AFM-dependent procedures.
- `m20:s20_5` remains an app-authored training workflow even after the safer wording pass.
- `m11:s11_4b` is explicitly treated as a study aid (“Weather Code Builder”), not a separate FAA presentation layer.

### Softened absolute or regulatory-sounding language

- Removed “professional obligation” and “duty to report” wording from the PIREP lesson.
- Removed “must be obtained before any IFR flight” and “regulatory violation” wording from the Convective SIGMET lesson.
- Removed “creates a legal record that the pilot was warned” from the VNR quiz explanation.
- Replaced “single most powerful accident-prevention tool” and “file IFR even for VFR” with more precise decision-making language.
- Replaced “Zero Tolerance” and “required for operators” phrasing in the advanced advisory lesson with safer operational awareness language.

### Fixed traceability/data reliability issues

- Removed the duplicate `m7` section ID by keeping a single `s7_5`.
- Renamed the second duplicate `m11` section from `s11_4` to `s11_4b` with the title `Weather Code Builder`.
- Updated validation metadata so section-level mapping is no longer undermined by the duplicate-ID issue.

### Fixed content bugs

- Corrected `q_m20_1` so `9900` now maps to light and variable winds.
- Corrected `q_m20_9` so `7545` now decodes to wind from 250 degrees at 145 kt.
- Reworked `q_m7_11` to remove unsupported illegality framing while keeping the safety outcome intact.

## Validation Alignment

- `m11:s11_4` note updated to reflect that it now covers the main present-weather/remarks lesson block cleanly.
- Added `m11:s11_4b` as a separate validation record and marked it `training_simplification`.
- `m13:s13_4` title and note updated to reflect practical-reporting guidance rather than a claimed duty.
- `m7:engine-icing` remains `needs_review`; the wording is safer, but the topic still mixes FAA weather teaching with aircraft-specific operating material.

## Remaining Issues Blocking Stronger Trust Claims

- `m7:s7_5` still needs a tighter source pass if the product wants stronger public claims around engine-icing guidance.
- `m9:s9_4` still carries operational coaching language and remains `needs_review`.
- `m13:s13_4` still needs tighter AIM-backed sourcing if the product wants stronger claims about when pilots should file PIREPs.
- Some advanced-product and operational lessons outside this pass still use instructional shorthand that should not be marketed as verbatim FAA doctrine.

## Safer Public Claims After This Pass

- The app is less likely to present study shortcuts as mandatory FAA procedure.
- High-risk advisory, PIREP, briefing, fog, and advanced-product lessons now read as guidance or simplification where appropriate.
- Section-level traceability for `m7` and `m11` is materially more reliable than before this pass.
