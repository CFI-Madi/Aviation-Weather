# Aviation Weather Academy

A study tool for Part 61 private pilot students, built around the **FAA Aviation Weather Handbook (FAA-H-8083-28B)**. Maintained by [Charlotte Flight Academy](https://github.com/CFI-Madi).

## What's in it

- **20+ study modules** organized into three acts — atmospheric foundations, hazardous weather, and operational products (METAR, TAF, PIREP, radar, advisories, charts, space weather).
- **NTSB case studies** with weather-decision walkthroughs, including verified links to the official NTSB docket or final report where applicable.
- **METAR Practice** with a 10-example annotated library covering clean VFR, marginal mist, fog, thunderstorms, freezing rain, gusty winds, ceiling-only IFR, CAVOK, peak-wind remarks, and AUTO-with-maintenance reports. Plus tap-to-decode TAF and PIREP reference cards.
- **Study Tools tab** — Density Altitude, Flight Category, Icing Severity, and Fog Formation calculators alongside METAR & TAF Practice pickers, all reachable in one tap from anywhere. METAR Quiz and TAF Quiz are coming soon.
- **Checkride prep mode** — full-length practice exam with a per-module weak-areas readout.
- **Spaced repetition** of missed questions and a daily challenge.
- **Offline support** via service worker — once the app shell is cached, the app works without a network connection.

## Source

The curriculum is structured around **FAA-H-8083-28B — Aviation Weather Handbook (Apr. 2026)**. Section text paraphrases handbook concepts for learner clarity rather than reproducing FAA copy verbatim; figure references use FAA-H-8083-28B figure numbers where the in-app diagram corresponds to a handbook figure.

This app is an educational study tool. It is **not a substitute** for FAA-approved training, a certified ground school, or instruction from a qualified CFI. Always verify weather decisions with official sources and current briefings.

## Running it locally

The app is vanilla HTML / CSS / JavaScript with no build step. Just serve the directory over local HTTP — the service worker and any future network features won't work from `file://`.

```bash
# Any of these will work from the repo root:
python -m http.server 8000
npx serve
# or any other static file server
```

Then open `http://localhost:8000/` in a browser.

## Status

Active development. **Diagram replacement with FAA handbook figures is in progress** — several hand-coded SVGs are scheduled for replacement with the corresponding FAA figures in a coming pass. Calculators, decoders, and animated multi-stage diagrams (cyclone life cycle, microburst approach, density altitude) will remain custom because they earn their keep pedagogically.

See `AUDIT_2026-05-07.md` and `DIAGRAM_INVENTORY.md` for the current Phase-1 audit findings and the per-diagram replace-or-keep plan.

## Tech notes

- Vanilla JS, no frameworks or bundlers.
- localStorage for progress, XP, achievements, spaced-repetition queue, and resume state.
- Hash-based router (`#/dashboard`, `#/lesson/<id>`, `#/quiz/<id>`, `#/case/<id>`, `#/metar`).
- PWA-installable via `manifest.json` with maskable icons.
- Service worker `wx-academy-v2` pre-caches the full app shell on install; bump the cache version string in `sw.js` to force a refresh on deploy.
- Plausible analytics is wired but disabled until a real domain is configured (see comment in `index.html`).

## Layout

```
index.html, styles.css, sw.js, manifest.json
icons/                    # PWA icons + generator script
img/awh/                  # FAA handbook figures used by PROCESS_DIAGRAMS
js/
├── app.js                # Bootstrap
├── router.js             # Hash routing
├── engine.js             # Game/progress engine
├── storage.js            # localStorage layer
├── screens.js            # All screen renderers
├── diagrams.js           # SVG and FAA-image diagram renderers
└── data/
    ├── config.js
    ├── modules.js        # All lesson + quiz content
    ├── case_studies.js   # NTSB case study data
    ├── achievements.js
    └── faa_validation.js # Per-topic FAA-source validation metadata
```
