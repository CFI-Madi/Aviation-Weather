// ============================================================
// Aviation Weather Academy — METAR Quiz Distractor Categories
// ============================================================
// Pure-data table of every parse-error category the quiz uses.
// Each category has:
//   - applies: which field group the parse error targets
//              ('wind' | 'visibility' | 'sky' | 'weather' | 'tempdew' |
//               'altimeter' | 'any')
//   - description: short human-readable label for explanations
//                  ("Direction truncated to two digits — …")
//
// The runtime that *generates* distractor values from a source METAR
// lives in js/metar_quiz.js (MetarQuiz._distract*); this file just
// lists the categories so explanations can reference them by id.
//
// Adding a category here is purely additive. Removing one requires
// updating any explanation text that referenced it.
// ============================================================

const METAR_QUIZ_DISTRACTOR_CATEGORIES = {
  // ── Wind ─────────────────────────────────────────────────────────────
  truncate_direction:    { applies: 'wind', description: 'Direction truncated to its first two digits.' },
  speed_as_direction:    { applies: 'wind', description: 'Speed digits misread as the direction.' },
  drop_trailing_zero:    { applies: 'wind', description: 'Trailing zero dropped from a cardinal direction.' },
  gust_as_speed:         { applies: 'wind', description: 'Gust value read as the sustained wind speed.' },
  over_extend_direction: { applies: 'wind', description: 'Direction read into the speed digits (5-digit direction).' },
  vrb_as_zero:           { applies: 'wind', description: 'VRB treated as a numeric direction of zero.' },
  vrb_as_north:          { applies: 'wind', description: 'VRB treated as 360° (north).' },
  literal_zero:          { applies: 'wind', description: 'Calm (00000KT) misread as 0° at 0 kt.' },
  calm_as_vrb:           { applies: 'wind', description: 'Calm (00000KT) misread as variable.' },

  // ── Visibility ───────────────────────────────────────────────────────
  truncate_first_digit:  { applies: 'visibility', description: 'Visibility truncated to its first digit (10 SM read as 1 SM).' },
  wrong_unit_km:         { applies: 'visibility', description: 'Visibility unit misread as kilometers.' },
  wrong_unit_nm:         { applies: 'visibility', description: 'Visibility unit misread as nautical miles.' },
  drop_fraction:         { applies: 'visibility', description: 'Fraction dropped from a mixed visibility (1 1/2 → 1).' },
  treat_as_sky_height:   { applies: 'visibility', description: 'Visibility number treated as a cloud height.' },

  // ── Sky ──────────────────────────────────────────────────────────────
  no_height_multiplication: { applies: 'sky', description: 'Cloud height read as raw digits — forgot to multiply by 100.' },
  multiply_by_10_only:      { applies: 'sky', description: 'Cloud height multiplied by 10 instead of 100.' },
  multiply_by_1000:         { applies: 'sky', description: 'Cloud height multiplied by 1000 instead of 100.' },
  wrong_layer_type:         { applies: 'sky', description: 'Cloud cover code misread (FEW/SCT/BKN/OVC swap).' },
  cross_layer_swap:         { applies: 'sky', description: 'Altitude from a different layer in the same METAR.' },
  wrong_clear:              { applies: 'sky', description: 'Sky-clear misread as having clouds.' },

  // ── Weather ──────────────────────────────────────────────────────────
  strip_intensity:    { applies: 'weather', description: 'Intensity prefix dropped (- or + missed).' },
  wrong_intensity:    { applies: 'weather', description: 'Wrong intensity (light read as heavy or vice versa).' },
  strip_descriptor:   { applies: 'weather', description: 'Descriptor dropped (TS/SH/FZ missed).' },
  strip_phenomenon:   { applies: 'weather', description: 'Phenomenon dropped — only the descriptor read.' },
  strip_freezing:     { applies: 'weather', description: 'FZ prefix dropped — freezing condition lost.' },
  wrong_phenomenon:   { applies: 'weather', description: 'Wrong precipitation type (right intensity, wrong precip).' },
  temp_confusion:     { applies: 'weather', description: 'Fog vs freezing-fog confusion — temperature condition flipped.' },

  // ── Temperature / Dewpoint ──────────────────────────────────────────
  missed_m_sign:    { applies: 'tempdew', description: 'M (minus) sign missed — sub-zero read as positive.' },
  added_m_sign:     { applies: 'tempdew', description: 'M sign added where none exists — positive read as negative.' },
  treated_as_tens:  { applies: 'tempdew', description: 'Two-digit value misread by an order of magnitude.' },
  swap_t_d:         { applies: 'tempdew', description: 'Temperature and dewpoint swapped.' },
  wrong_unit_f:     { applies: 'tempdew', description: 'Number read as Fahrenheit instead of Celsius.' },

  // ── Altimeter ────────────────────────────────────────────────────────
  no_decimal:          { applies: 'altimeter', description: 'Decimal dropped from altimeter (29.90 read as 2990).' },
  decimal_wrong_place: { applies: 'altimeter', description: 'Decimal placed wrong (29.90 read as 299.0 or 2.990).' },
  raw_token:           { applies: 'altimeter', description: 'Altimeter left in its raw A-prefix token form.' },
  as_hpa:              { applies: 'altimeter', description: 'Altimeter treated as hectopascals instead of inches of mercury.' },

  // ── Global trap (unrelated to any field; only used in Advanced) ─────
  trap: { applies: 'any', description: 'Plausible-looking value that does not belong to any field in this METAR.' }
};
