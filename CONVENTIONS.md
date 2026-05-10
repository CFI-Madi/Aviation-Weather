# Conventions

Standing rules that apply to ongoing work on this codebase. Different from
[FOLLOWUPS.md](FOLLOWUPS.md), which lists one-off items to revisit.

---

## Persistence (localStorage)

The app stores user state under a single localStorage key
(`aviation_weather_v1` today). The version is encoded in the key name.

**Additive schema changes** (new fields, new defaults) do **not** bump the
storage key. They go into `Storage.defaultState()`; the load-time spread
merge initialises the new field for existing users automatically:

```js
return raw ? { ...this.defaultState(), ...JSON.parse(raw) } : this.defaultState();
```

Recent example: `recentToolsUsed: []` in chunk 4 of the Study Tools redesign.

**Storage key bumps** (`v1` → `v2`) are reserved for **destructive** schema
changes — renaming a field, changing its type, or removing one. Bumping the
key requires:

1. Adding the new key constant.
2. Writing a migration in `Storage.load()` that reads the old key, transforms
   the payload, writes it under the new key, and removes the old.
3. Extending the legacy chain (e.g. `charlotte_aviation_v1` → `aviation_weather_v1`
   → `aviation_weather_v2`).

When in doubt: prefer additive. The spread merge is forgiving.

## Service worker cache

Bump `CACHE_NAME` in `sw.js` (e.g. `wx-academy-v12` → `wx-academy-v13`) on
**every** PR that changes any asset listed in `APP_SHELL` — JS, CSS, HTML,
icons, FAA images. Returning users won't pick up the changes otherwise.

The cache version is conceptually distinct from the localStorage key version.
Cache version = "force returning users to re-fetch the shell." Storage key
version = "the shape of saved user data is incompatible with the prior shape."
They're bumped on different cadences.

## Module data shape

Module IDs are `m1`, `m1a`, `m2` … `m20`. Section IDs are typically `sN_M`
numeric within a module, but can be non-numeric (`s12_practice`) when needed
to avoid renumbering existing sections that other systems reference (daily
challenges, FAA validation metadata).

Section IDs are referenced by:
- `js/data/achievements.js` (DAILY_CHALLENGES `sectionId` field)
- `js/data/faa_validation.js` (per-section validation records)

If you renumber a section ID you have to grep both files and update them.
Inserting a section with a non-numeric ID is the lighter move.

## "Reviewed in Module N: <title>" strings

Always derive the title from `MODULES.find(m => m.id === modId).title` at
render time. Never hardcode. A module rename should be a single-file edit
(`js/data/modules.js`), not a hunt across copy strings.

## Tool render functions

Render functions in `js/diagrams.js` (e.g. `densityAltCalc`, `renderMetarDecoder`)
return a string of HTML and use stable element ID namespaces (`da-*`, `fc-*`,
`ic-*`, `fg-*`, `metar-*`, `taf-*`). They MUST work standalone (no module
context dependencies) — the Study Tools tool-detail screen calls them directly,
the same way lesson sections do.

If a render function ever needs lesson context, it should accept that context
as an explicit argument, not pull from a global. Forking the function for
standalone vs lesson contexts is not allowed.

## Init dispatch

`Diagrams._initToolByKey(key)` is the single dispatch table for first-render
init calls (e.g. `calcDA()`, `calcFlightCategory()`). Both
`Screens._initDiagram` (lesson-embedded path) and `Screens.tool_detail`
(standalone path) call it. Don't duplicate the switch.
