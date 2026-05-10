// ============================================================
// Aviation Weather Academy — ASOS Quick Reference Card
// ============================================================
// Verbatim content from the ASOS User's Guide, Appendix C
// "Content of ASOS-Generated METAR — A Quick Reference Guide"
// (U.S. Department of Commerce / NOAA / National Weather Service /
//  Observing Systems Branch, 1325 East-West Highway, Silver Spring,
//  Maryland 20910 — METAR\TA2\2-8-96).
//
// Public-domain U.S. Government work. All `description` strings are
// quoted verbatim from the FAA source — DO NOT paraphrase or summarise.
// The METAR Quiz feedback strings cite this file by field id, so any
// edit here ripples into quiz explanations.
//
// Data shape:
//   {
//     attribution_short:  "Source: ASOS User's Guide, Appendix C ..."
//     attribution_full:   "U.S. Department of Commerce — NOAA — ..."
//     canonical_body:     "METAR KABC ..."
//     canonical_rmk:      "RMK AO2 ..."
//     body_fields: [{ id, name, tokens[], description, value }, ...]
//     rmk_fields:  [{ id, name, tokens[], description, value }, ...]
//   }
//
// `tokens` is the array of space-delimited chunks that belong to this
// field in the canonical METAR. Fields that span multiple chunks (e.g.,
// PEAK WIND = "PK WND 20032/25") list all three.
// ============================================================

const ASOS_REFERENCE = {
  attribution_short: "Source: ASOS User's Guide, Appendix C — U.S. Department of Commerce / NOAA / National Weather Service.",
  attribution_full: "U.S. Department of Commerce — National Oceanic and Atmospheric Administration — National Weather Service — Observing Systems Branch, 1325 East-West Highway, Silver Spring, Maryland 20910 (METAR\\TA2\\2-8-96).",

  canonical_body: "METAR KABC 121755Z AUTO 21016G24KT 180V240 1SM R11/P6000FT -RA BR BKN015 OVC025 06/04 A2990",
  canonical_rmk:  "RMK AO2 PK WND 20032/25 WSHFT 1715 VIS 3/4V1 1/2 VIS 3/4 RWY11 RAB07 CIG 013V017 CIG 017 RWY11 PRESFR SLP125 P0003 60009 T00640036 10066 21012 58033 TSNO $",

  // ── Body group ───────────────────────────────────────────────────────────
  body_fields: [
    {
      id: 'type',
      name: 'Type of report',
      tokens: ['METAR'],
      description: 'METAR: hourly (scheduled) report; SPECI: special (unscheduled) report.',
      value: 'METAR'
    },
    {
      id: 'station',
      name: 'Station identifier',
      tokens: ['KABC'],
      description: 'Four alphabetic characters; ICAO location identifier.',
      value: 'KABC'
    },
    {
      id: 'datetime',
      name: 'Date/Time',
      tokens: ['121755Z'],
      description: 'All dates and times in UTC using a 24-hour clock; two-digit date and four-digit time; always appended with Z to indicate UTC.',
      value: '121755Z'
    },
    {
      id: 'modifier',
      name: 'Report modifier',
      tokens: ['AUTO'],
      description: 'Fully automated report, no human intervention; removed when observer signed-on.',
      value: 'AUTO'
    },
    {
      id: 'wind',
      name: 'Wind direction and speed',
      tokens: ['21016G24KT', '180V240'],
      description: 'Direction in tens of degrees from true north (first three digits); next two digits: speed in whole knots; as needed Gusts (character) followed by maximum observed speed; always appended with KT to indicate knots; 00000KT for calm; if direction varies by 60° or more a Variable wind direction group is reported.',
      value: '21016G24KT 180V240'
    },
    {
      id: 'visibility',
      name: 'Visibility',
      tokens: ['1SM'],
      description: 'Prevailing visibility in statute miles and fractions (space between whole miles and fractions); always appended with SM to indicate statute miles; values <1/4 reported as M1/4.',
      value: '1SM'
    },
    {
      id: 'rvr',
      name: 'Runway visual range',
      tokens: ['R11/P6000FT'],
      description: '10-minute RVR value in hundreds of feet; reported if prevailing visibility is ≤ one mile or RVR ≤ 6000 feet; always appended with FT to indicate feet; value prefixed with M or P to indicate value is lower or higher than the reportable RVR value.',
      value: 'R11/P6000FT'
    },
    {
      id: 'weather',
      name: 'Weather phenomena',
      tokens: ['-RA', 'BR'],
      description: 'RA: liquid precipitation that does not freeze; SN: frozen precipitation other than hail; UP: precipitation of unknown type; intensity prefixed to precipitation: light (-), moderate (no sign), heavy (+); FG: fog; FZFG: freezing fog (temperature below 0°C); BR: mist; HZ: haze; SQ: squall; maximum of three groups reported; augmented by observer: FC (funnel cloud/tornado/waterspout); TS (thunderstorm); GR (hail); GS (small hail; <1/4 inch); FZRA (intensity; freezing rain); VA (volcanic ash).',
      value: '-RA BR'
    },
    {
      id: 'sky',
      name: 'Sky condition',
      tokens: ['BKN015', 'OVC025'],
      description: 'Cloud amount and height: CLR (no clouds detected below 12000 feet); FEW (few); SCT (scattered); BKN (broken); OVC (overcast); followed by 3-digit height in hundreds of feet; or vertical visibility (VV) followed by height for indefinite ceiling.',
      value: 'BKN015 OVC025'
    },
    {
      id: 'temp_dew',
      name: 'Temperature / Dew point',
      tokens: ['06/04'],
      description: 'Each is reported in whole degrees Celsius using two digits; values are separated by a solidus; sub-zero values are prefixed with an M (minus).',
      value: '06/04'
    },
    {
      id: 'altimeter',
      name: 'Altimeter',
      tokens: ['A2990'],
      description: 'Altimeter always prefixed with an A indicating inches of mercury; reported using four digits: tens, units, tenths, and hundredths.',
      value: 'A2990'
    }
  ],

  // ── Remarks group ────────────────────────────────────────────────────────
  rmk_fields: [
    {
      id: 'rmk_marker',
      name: 'Remarks identifier',
      tokens: ['RMK'],
      description: 'RMK marks the start of the remarks group. All elements after RMK are supplementary to the body of the report.',
      value: 'RMK'
    },
    {
      id: 'auto_type',
      name: 'Type of automated station',
      tokens: ['AO2'],
      description: 'AO2; automated station with precipitation discriminator.',
      value: 'AO2'
    },
    {
      id: 'peak_wind',
      name: 'Peak wind',
      tokens: ['PK', 'WND', '20032/25'],
      description: 'PK WND dddff(f)/(hh)mm; direction in tens of degrees, speed in whole knots, and time.',
      value: 'PK WND 20032/25'
    },
    {
      id: 'wind_shift',
      name: 'Wind shift',
      tokens: ['WSHFT', '1715'],
      description: 'WSHFT (hh)mm.',
      value: 'WSHFT 1715'
    },
    {
      id: 'var_vis',
      name: 'Variable prevailing visibility',
      tokens: ['VIS', '3/4V1', '1/2'],
      description: 'VIS vnvnvnvnvnVvxvxvxvxvx; reported if prevailing visibility is < 3 miles and variable.',
      value: 'VIS 3/4V1 1/2'
    },
    {
      id: 'vis_second_loc',
      name: 'Visibility at second location',
      tokens: ['VIS', '3/4', 'RWY11'],
      description: 'VIS vvvvv [LOC]; reported if different than the reported prevailing visibility in body of report.',
      value: 'VIS 3/4 RWY11'
    },
    {
      id: 'precip_begin_end',
      name: 'Beginning of precipitation',
      tokens: ['RAB07'],
      description: "Beginning and ending of precipitation and thunderstorms: w'w'B(hh)mmE(hh)mm; TSB(hh)mmE(hh)mm.",
      value: 'RAB07'
    },
    {
      id: 'var_ceiling',
      name: 'Variable ceiling height',
      tokens: ['CIG', '013V017'],
      description: 'CIG hnhnhnVhxhxhx; reported if ceiling in body of report is < 3000 feet and variable.',
      value: 'CIG 013V017'
    },
    {
      id: 'ceiling_second_loc',
      name: 'Ceiling at second location',
      tokens: ['CIG', '017', 'RWY11'],
      description: 'CIG hhh [LOC]; ceiling height reported if secondary ceilometer site is different than the ceiling height in the body of the report.',
      value: 'CIG 017 RWY11'
    },
    {
      id: 'pressure_change',
      name: 'Pressure rising or falling rapidly',
      tokens: ['PRESFR'],
      description: 'PRESRR or PRESFR; pressure rising or falling rapidly at time of observation.',
      value: 'PRESFR'
    },
    {
      id: 'slp',
      name: 'Sea-level pressure',
      tokens: ['SLP125'],
      description: 'SLPppp; tens, units, and tenths of SLP in hPa.',
      value: 'SLP125'
    },
    {
      id: 'hourly_precip',
      name: 'Hourly precipitation amount',
      tokens: ['P0003'],
      description: 'Prrrr; in .01 inches since last METAR; a trace is P0000.',
      value: 'P0003'
    },
    {
      id: '36hr_precip',
      name: '3- and 6-hour precipitation amount',
      tokens: ['60009'],
      description: '6RRRR; precipitation amount in .01 inches for past 6 hours reported in 00, 06, 12, and 18 UTC observations and for past 3 hours in 03, 09, 15, and 21 UTC observations; a trace is 60000.',
      value: '60009'
    },
    {
      id: 'hourly_temp',
      name: 'Hourly temperature and dew point',
      tokens: ['T00640036'],
      description: "TsnTaTaTasnTd'Td'Td'; tenth of degree Celsius; sn: 1 if temperature below 0°C and 0 if temperature 0°C or higher.",
      value: 'T00640036'
    },
    {
      id: 'max_6hr',
      name: '6-hour maximum temperature',
      tokens: ['10066'],
      description: '1snTxTxTx; tenth of degree Celsius; 00, 06, 12, 18 UTC; sn: 1 if temperature below 0°C and 0 if temperature 0°C or higher.',
      value: '10066'
    },
    {
      id: 'min_6hr',
      name: '6-hour minimum temperature',
      tokens: ['21012'],
      description: '2snTnTnTn; tenth of degree Celsius; 00, 06, 12, 18 UTC; sn: 1 if temperature below 0°C and 0 if temperature 0°C or higher.',
      value: '21012'
    },
    {
      id: 'pressure_tendency',
      name: 'Pressure tendency',
      tokens: ['58033'],
      description: '5appp; the character (a) and change in pressure (ppp; tenths of hPa) the past 3 hours.',
      value: '58033'
    },
    {
      id: 'sensor_status',
      name: 'Sensor status indicators',
      tokens: ['TSNO'],
      description: 'RVRNO: RVR missing; PWINO: precipitation identifier information not available; PNO: precipitation amount not available; FZRANO: freezing rain information not available; TSNO: thunderstorm information not available; VISNO [LOC]: visibility at secondary location not available, e.g., VISNO RWY06; CHINO [LOC]: (cloud-height-indicator) sky condition at secondary location not available, e.g., CHINO RWY06.',
      value: 'TSNO'
    },
    {
      id: 'maintenance',
      name: 'Maintenance check indicator',
      tokens: ['$'],
      description: 'Maintenance needed on the system.',
      value: '$'
    }
  ]
};
