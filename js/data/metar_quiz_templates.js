// ============================================================
// Aviation Weather Academy — METAR Quiz Templates
// ============================================================
// Ten scenario templates that drive the synthetic METAR generator
// (`js/metar_quiz.js`). Each template defines parameter ranges that
// produce plausible weather combinations. The generator picks a
// template, rolls within constraints, and emits a complete,
// format-valid METAR string plus per-field decoded values.
//
// ICAO pools per template are deliberately small and regional so
// the generated METARs feel like they came from somewhere real:
//   Carolinas (KCLT, KJQF, KGSO, KAVL) for VFR / TS / fog
//   Northern tier (KORD, KMSP)         for winter scenarios
//   Pacific NW (KSEA, KPDX)            for marine-fog IFR
//   Southwest (KPHX, KLAS)             for hot summer haze
//
// Time windows are UTC; pick hours that match the template's
// climatology in the local timezone (e.g., afternoon TS = 18-22Z
// for the Carolinas, IFR fog = 09-14Z for the Pacific NW).
//
// Constraint vocabulary used below (consumed by `MetarQuiz._buildOnce`):
//   wind: { dirRange, spdRange, gust?: {range}, vrb?: bool }
//   visibility: { mode: 'fixed'|'sm_value'|'fraction', value?, range?, options? }
//   weather: array of fixed tokens, OR { primary: string|array, intensityOptions?, extras? }
//            (object form supports temp-conditional FG/FZFG via 'fg_or_fzfg')
//   sky: { mode, ... }      — modes documented in metar_quiz.js _rollSky
//   temp: { range: [min, max] }
//   tdSpread: { range: [min, max] }
//   altimeter: { range: [min, max] }   — integer 4-digit form (2990 = 29.90 inHg)
//
// ============================================================

const METAR_QUIZ_TEMPLATES = [
  {
    id: 'clean_vfr',
    label: 'Clean VFR',
    summary: 'Light wind, clear sky, large T-Td spread.',
    icaoPool: ['KCLT', 'KJQF', 'KGSO', 'KAVL'],
    timeWindowZ: { startHour: 14, endHour: 22 },
    wind: { dirRange: [0, 359], spdRange: [0, 8], gust: false, vrb: false },
    visibility: { mode: 'fixed', value: 10 },
    weather: [],
    sky: { mode: 'clear_or_few_high' },
    temp: { range: [10, 30] },
    tdSpread: { range: [8, 18] },
    altimeter: { range: [2980, 3020] }
  },
  {
    id: 'marginal_br',
    label: 'Marginal VFR with mist',
    summary: 'BR mist at 3-6 SM, low BKN/SCT, narrow T-Td spread.',
    icaoPool: ['KAVL', 'KCLT', 'KGSO', 'KJQF'],
    timeWindowZ: { startHour: 11, endHour: 15 },
    wind: { dirRange: [0, 359], spdRange: [3, 10], gust: false, vrb: false },
    visibility: { mode: 'sm_value', range: [3, 6] },
    weather: ['BR'],
    sky: { mode: 'sct_or_bkn_low', altRange: [10, 25] },
    temp: { range: [4, 18] },
    tdSpread: { range: [0, 3] },
    altimeter: { range: [2990, 3020] }
  },
  {
    id: 'ifr_fg',
    label: 'IFR with fog',
    summary: 'Calm/light wind, FG (or FZFG below 0 °C), OVC very low.',
    icaoPool: ['KSEA', 'KPDX', 'KGSO', 'KCLT'],
    timeWindowZ: { startHour: 9, endHour: 14 },
    wind: { dirRange: [0, 359], spdRange: [0, 5], gust: false, vrb: true },
    visibility: { mode: 'fraction', options: ['1/4', '1/2', '5/8'] },
    weather: { primary: 'fg_or_fzfg' },
    sky: { mode: 'ovc_very_low', altRange: [1, 5] },
    temp: { range: [-2, 14] },
    tdSpread: { range: [0, 1] },
    altimeter: { range: [2990, 3020] }
  },
  {
    id: 'tsra_pm',
    label: 'Afternoon thunderstorm',
    summary: 'Gusty wind, TSRA with CB layer, warm humid airmass.',
    icaoPool: ['KCLT', 'KJQF', 'KGSO', 'KAVL'],
    timeWindowZ: { startHour: 18, endHour: 22 },
    wind: { dirRange: [180, 320], spdRange: [8, 15], gust: { range: [18, 30] }, vrb: false },
    visibility: { mode: 'sm_value', range: [1, 5] },
    weather: { primary: 'TSRA', intensityOptions: ['', '+', '-'], extras: { BR: 0.4 } },
    sky: { mode: 'cb_with_overcast', cbAltRange: [25, 50], ovcAltRange: [60, 90] },
    temp: { range: [22, 32] },
    tdSpread: { range: [2, 6] },
    altimeter: { range: [2960, 2990] }
  },
  {
    id: 'winter_clear',
    label: 'Winter clear cold',
    summary: 'Light wind, vis 10 SM, sub-freezing.',
    icaoPool: ['KORD', 'KMSP', 'KGSO'],
    timeWindowZ: { startHour: 14, endHour: 22 },
    wind: { dirRange: [0, 359], spdRange: [0, 10], gust: false, vrb: false },
    visibility: { mode: 'fixed', value: 10 },
    weather: [],
    sky: { mode: 'clear_or_few_high' },
    temp: { range: [-15, -2] },
    tdSpread: { range: [5, 15] },
    altimeter: { range: [3010, 3050] }
  },
  {
    id: 'winter_precip',
    label: 'Winter precipitation',
    summary: 'Sub-freezing, OVC low, FZRA / SN / -SN / PL.',
    icaoPool: ['KORD', 'KMSP'],
    timeWindowZ: { startHour: 6, endHour: 22 },
    wind: { dirRange: [0, 359], spdRange: [5, 15], gust: false, vrb: false },
    visibility: { mode: 'sm_value', range: [1, 5] },
    weather: { primary: ['FZRA', 'SN', '-SN', 'PL'], extras: { BR: 0.2 } },
    sky: { mode: 'ovc_low', altRange: [5, 25] },
    temp: { range: [-12, -1] },
    tdSpread: { range: [0, 3] },
    altimeter: { range: [2960, 3000] }
  },
  {
    id: 'high_wind',
    label: 'High wind day',
    summary: 'Sustained 18-28 kt with gusts 28-45, vis 10 SM.',
    icaoPool: ['KCLT', 'KGSO', 'KJQF', 'KORD', 'KMSP', 'KAVL'],
    timeWindowZ: { startHour: 12, endHour: 23 },
    wind: { dirRange: [0, 359], spdRange: [18, 28], gust: { range: [28, 45] }, vrb: false },
    visibility: { mode: 'fixed', value: 10 },
    weather: [],
    sky: { mode: 'clear_few_or_sct', altRange: [25, 80] },
    temp: { range: [-5, 25] },
    tdSpread: { range: [5, 15] },
    altimeter: { range: [2950, 2990] }
  },
  {
    id: 'low_ceiling_high_vis',
    label: 'Low ceiling, high visibility',
    summary: 'Vis 10 SM but OVC at 500-1200 ft, narrow T-Td spread.',
    icaoPool: ['KCLT', 'KJQF', 'KGSO', 'KAVL'],
    timeWindowZ: { startHour: 11, endHour: 16 },
    wind: { dirRange: [0, 359], spdRange: [0, 8], gust: false, vrb: false },
    visibility: { mode: 'fixed', value: 10 },
    weather: [],
    sky: { mode: 'ovc_low', altRange: [5, 12] },
    temp: { range: [4, 22] },
    tdSpread: { range: [0, 3] },
    altimeter: { range: [2990, 3020] }
  },
  {
    id: 'hot_summer_haze',
    label: 'Hot summer haze',
    summary: 'High temps, 4-7 SM with HZ, large T-Td spread.',
    icaoPool: ['KPHX', 'KLAS'],
    timeWindowZ: { startHour: 17, endHour: 21 },
    wind: { dirRange: [0, 359], spdRange: [3, 10], gust: false, vrb: false },
    visibility: { mode: 'sm_value', range: [4, 7] },
    weather: ['HZ'],
    sky: { mode: 'few_high_or_sct_high', altRange: [80, 250] },
    temp: { range: [28, 38] },
    tdSpread: { range: [10, 25] },
    altimeter: { range: [2990, 3020] }
  },
  {
    id: 'vrb_light',
    label: 'Variable winds, light',
    summary: 'VRB at 0-5 kt, vis 10 SM, mostly clear.',
    icaoPool: ['KCLT', 'KJQF', 'KGSO', 'KAVL', 'KORD'],
    timeWindowZ: { startHour: 11, endHour: 17 },
    wind: { vrb: true, spdRange: [0, 5], gust: false },
    visibility: { mode: 'fixed', value: 10 },
    weather: [],
    sky: { mode: 'clear_or_few_high' },
    temp: { range: [4, 22] },
    tdSpread: { range: [3, 12] },
    altimeter: { range: [2990, 3020] }
  }
];
