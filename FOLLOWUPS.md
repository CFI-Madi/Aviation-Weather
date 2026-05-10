# Follow-ups Discovered During Week-1 Fixes

Things spotted while executing `aviation-weather-week1-fixes.md` that were
out of scope for that pass. Each one is a candidate for a future PR; flag
which (if any) the maintainer wants picked up.

---

## Task 4 reconciliation — audit-report.md CRIT-4 was already resolved

`audit-report.md`'s CRIT-4 ("the four redundant SVGs are still present")
was based on a stale read of the codebase. Git history shows the work was
done in May:

- **`coldFrontCrossSectionSVG`, `cbLifecycle`, `mountainWave`** — removed
  in commit `1d93741` ("chore: remove dead diagram registrations") on
  2026-05-07. None had a live call site at deletion; routes through
  `PROCESS_DIAGRAMS` were already in place.
- **`cbIngredients`** — redrawn in commit `797c00d` ("feat: redraw
  cbIngredients as unified triangle") in Phase 2c, addressing the
  original "three separate triangles imply independence" concern. It
  still has a live call site at [js/data/modules.js:1274](js/data/modules.js:1274)
  (m6 §s6_1) and renders correctly, with `Moisture`/`Instability`/`Lifting
  Mechanism` all present per a browser-side `innerText` check.

**Action taken:** None required. Task 4 was a no-op; the verification
greps (zero hits for the three deleted names; live but correct call site
for cbIngredients) confirm the resolved state. No SW cache bump.

**Audit-report update:** [audit-report.md](audit-report.md) CRIT-4 should
be marked closed in the next audit revision, with a one-line note that
the May-7 audit's diagram inventory was outdated.

**Optional future move:** If a clean extraction of FAA-H-8083-28B Fig 22-1
("the three ingredients" triangle) becomes available, the `cbIngredients()`
SVG could be retired in favor of the FAA figure for full source-fidelity.
[PHASE_2_DIAGRAM_STRATEGY.md:93](PHASE_2_DIAGRAM_STRATEGY.md:93) notes that
no clean extraction was available at the time of the redraw. Low priority
— the redrawn SVG is pedagogically sound.

---

## Live AWC fetch — deferred to Study Tools Phase 4

The "Live Weather" screen and More-tab card retired in the Study Tools
Phase 1 redesign (commit chunk 6 of `feat/study-tools-phase1`). Live AWC
airport-METAR fetching is planned for Phase 4 of the same redesign,
integrated into the upcoming **METAR Quiz** and **TAF Quiz** tools at
their higher difficulty levels (real airport data instead of synthetic
generators). The Phase-1 stub copy ("Live weather temporarily
unavailable") was a holding pattern; the feature returns under a quiz
banner where it has a clearer pedagogical home.

---

## Tool render-function ID namespaces — single-screen-active assumption

The six tool render functions in `js/diagrams.js` (Density Altitude, Flight
Category, Icing Severity, Fog Formation, METAR Practice, TAF Practice) use
stable element ID namespaces — `da-*`, `fc-*`, `ic-*`, `fg-*`, `metar-*`,
`taf-*`. These IDs would collide if two instances of the same tool were ever
rendered in visible contexts simultaneously (e.g. one inside a lesson and
one on the Study Tools detail screen).

The current routing prevents that — only one `.screen.active` element is
visible at a time, so duplicate IDs never co-exist in the visible DOM. But
the assumption is fragile. Things to watch for:

- A future "Recently used tools" preview row on the Study Tools landing page
  that renders mini-versions of recently-opened tools.
- A dashboard tile that previews the user's current density altitude.
- A side-by-side comparison view.

If any of those land, the render functions need to accept an ID-prefix
argument (e.g. `densityAltCalc({prefix:'preview-'})`) or be refactored to
namespace via a host-element data attribute. Until then: leave the IDs
alone, and revisit this note before adding any feature that renders the
same tool in two simultaneous places.

---

## Split `js/data/config.js` into content + config (deferred)

The new "content data vs app configuration" convention added in
[CONVENTIONS.md](CONVENTIONS.md) during Phase 2 says content lives in
`js/data/` and configuration lives in `js/config.js`. Today
`js/data/config.js` mixes both:

- **Configuration** (should move to `js/config.js`): RANKS, LEVELS,
  LEVEL_META.
- **Content** (stays in `js/data/`): METAR_LIBRARY, TAF_LIBRARY,
  SAMPLE_METAR, SAMPLE_TAF.

Also: `TOOL_REGISTRY` currently lives inside `js/screens.js`. The
"app configuration" bucket would be its natural home.

The split is straightforward but touches every script-tag order in
`index.html`, the SW APP_SHELL list, and any code that imports from
`js/data/config.js`. Out of scope for the Phase 2 PR; a one-PR
refactor candidate when there's a quiet moment between phases.

---

(future entries land below this line)
