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

(future entries land below this line)
