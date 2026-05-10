// ============================================================
// Aviation Weather Academy — METAR Quiz Generator
// ============================================================
// Pure-data generator (no DOM, no globals beyond MetarQuiz itself).
// Picks a template from METAR_QUIZ_TEMPLATES, rolls parameters within
// the template's constraints, and emits:
//   {
//     metar: "KCLT 091755Z 22008KT 10SM FEW250 24/12 A3010",
//     template: "clean_vfr",
//     station: "KCLT",
//     fields: {
//       wind:        { value, token, slots: 1 },
//       visibility:  { value, token, slots: 1 },
//       sky:         [{ value, token }, ...],   // 1..3 entries
//       weather:     [{ value, token }, ...],   // 0..3 entries
//       temperature: { value, token },
//       dewpoint:    { value, token },
//       altimeter:   { value, token }
//     }
//   }
//
// generateSession(difficulty, sessionSize, prevSessionTemplateIds)
//   returns N questions with no template repeats within the session
//   AND no overlap with prevSessionTemplateIds (the previous session's
//   used templates) — held-out tracking prevents back-to-back identical
//   sessions when the user starts a new session immediately after.
//
// Plausibility validation runs after construction; up to 10 re-rolls
// before falling back to the last attempt (with a console warning).
// ============================================================

const MetarQuiz = {

  // ── Public API ────────────────────────────────────────────────────────────

  generateQuestion(difficulty, heldOutTemplateIds) {
    const tmpl = this._pickTemplate(heldOutTemplateIds || []);
    const built = this._buildWithRetry(tmpl);
    return {
      metar: built.metarString,
      template: tmpl.id,
      station: built.station,
      fields: built.fields
    };
  },

  generateSession(difficulty, sessionSize, prevSessionTemplateIds) {
    const N = sessionSize || 8;
    const prev = prevSessionTemplateIds || [];
    const out = [];
    const usedThisSession = new Set();
    for (let i = 0; i < N; i++) {
      const heldOut = prev.concat(Array.from(usedThisSession));
      const q = this.generateQuestion(difficulty, heldOut);
      out.push(q);
      usedThisSession.add(q.template);
    }
    return out;
  },

  // ── Template picking + retry loop ────────────────────────────────────────

  _pickTemplate(heldOutTemplateIds) {
    const available = METAR_QUIZ_TEMPLATES.filter(t => heldOutTemplateIds.indexOf(t.id) === -1);
    const pool = available.length > 0 ? available : METAR_QUIZ_TEMPLATES;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  _buildWithRetry(tmpl) {
    let attempts = 0;
    while (attempts++ < 10) {
      const built = this._buildOnce(tmpl);
      if (this._isPlausible(built, tmpl)) return built;
    }
    console.warn('[MetarQuiz] 10 plausibility re-rolls failed for', tmpl.id);
    return this._buildOnce(tmpl);
  },

  // ── Construction ─────────────────────────────────────────────────────────

  _buildOnce(tmpl) {
    const station = this._pick(tmpl.icaoPool);
    const dateZ = this._rollDateZ(tmpl.timeWindowZ);
    const wind = this._rollWind(tmpl.wind);

    const tempC = this._rollInt(tmpl.temp.range[0], tmpl.temp.range[1]);
    const tdSpread = this._rollInt(tmpl.tdSpread.range[0], tmpl.tdSpread.range[1]);
    const dewC = tempC - tdSpread;

    const wxList = this._rollWeather(tmpl.weather, tempC);
    const vis = this._rollVisibility(tmpl.visibility);
    const skyList = this._rollSky(tmpl.sky);
    const altim = this._rollInt(tmpl.altimeter.range[0], tmpl.altimeter.range[1]);

    // Per-field decoded values + tokens
    const fields = {
      wind: { value: wind.value, token: wind.token, slots: 1 },
      visibility: { value: vis.value, token: vis.token, slots: 1 },
      sky: skyList,
      weather: wxList,
      temperature: { value: this._tempValue(tempC), token: this._tempToken(tempC) },
      dewpoint: { value: this._tempValue(dewC), token: this._tempToken(dewC) },
      altimeter: { value: this._altimeterValue(altim), token: this._altimeterToken(altim) }
    };

    // METAR string — standard body order
    const skyTokenStr = skyList.map(s => s.token).join(' ');
    const wxTokenStr = wxList.map(w => w.token).join(' ');
    const tempTokenStr = `${this._tempToken(tempC)}/${this._tempToken(dewC)}`;
    const metarString = [
      station,
      dateZ,
      wind.token,
      vis.token,
      wxTokenStr,
      skyTokenStr,
      tempTokenStr,
      this._altimeterToken(altim)
    ].filter(s => s && s.length > 0).join(' ');

    return { station, dateZ, metarString, fields, tempC, dewC, vis, wxList, skyList };
  },

  // ── Rollers ──────────────────────────────────────────────────────────────

  _rollDateZ(window) {
    const today = new Date();
    const dd = today.getUTCDate();
    const hh = this._rollInt(window.startHour, window.endHour);
    const mm = this._pick([50, 53, 55, 56, 58]); // realistic METAR issue minutes
    return `${this._pad2(dd)}${this._pad2(hh)}${this._pad2(mm)}Z`;
  },

  _rollWind(spec) {
    const spd = this._rollInt(spec.spdRange[0], spec.spdRange[1]);
    if (spec.vrb) {
      if (spd === 0) return { token: '00000KT', value: 'Calm' };
      return {
        token: `VRB${this._pad2(spd)}KT`,
        value: `Variable at ${spd} kt`
      };
    }
    if (spd === 0) return { token: '00000KT', value: 'Calm' };

    let dir = Math.round(this._rollInt(spec.dirRange[0], spec.dirRange[1]) / 10) * 10;
    if (dir === 0) dir = 360;
    if (dir > 360) dir = 360;

    if (spec.gust && spd >= 8) {
      const gRoll = this._rollInt(spec.gust.range[0], spec.gust.range[1]);
      const gust = Math.max(gRoll, spd + 5); // ensure gust > spd by ≥ 5
      return {
        token: `${this._pad3(dir)}${this._pad2(spd)}G${this._pad2(gust)}KT`,
        value: `${this._pad3(dir)}° at ${spd} kt, gusting ${gust} kt`
      };
    }
    return {
      token: `${this._pad3(dir)}${this._pad2(spd)}KT`,
      value: `${this._pad3(dir)}° at ${spd} kt`
    };
  },

  _rollVisibility(spec) {
    if (spec.mode === 'fixed') {
      return { token: `${spec.value}SM`, value: `${spec.value} SM` };
    }
    if (spec.mode === 'sm_value') {
      const v = this._rollInt(spec.range[0], spec.range[1]);
      return { token: `${v}SM`, value: `${v} SM` };
    }
    if (spec.mode === 'fraction') {
      const opt = this._pick(spec.options); // '1/4' | '1/2' | '5/8'
      return { token: `${opt}SM`, value: `${opt} SM` };
    }
    return { token: '10SM', value: '10 SM' };
  },

  _rollWeather(spec, tempC) {
    // Static array form: ['BR'] | ['HZ'] | []
    if (Array.isArray(spec)) {
      return spec.map(t => ({ token: t, value: this._weatherValue(t) }));
    }
    if (!spec || !spec.primary) return [];

    // Conditional FG/FZFG based on temperature
    if (spec.primary === 'fg_or_fzfg') {
      const tok = tempC < 0 ? 'FZFG' : 'FG';
      return [{ token: tok, value: this._weatherValue(tok) }];
    }

    // Primary token (string) or array of options
    let primary = Array.isArray(spec.primary)
      ? this._pick(spec.primary)
      : spec.primary;

    // Intensity prefix (TSRA-style)
    if (spec.intensityOptions && spec.intensityOptions.length) {
      const intensity = this._pick(spec.intensityOptions);
      // Only prefix if not already present (e.g., '-SN' already has it)
      if (intensity && !primary.startsWith('-') && !primary.startsWith('+')) {
        primary = intensity + primary;
      }
    }

    const out = [{ token: primary, value: this._weatherValue(primary) }];

    // Extras (BR alongside thunderstorm, etc.) with probability
    if (spec.extras) {
      Object.keys(spec.extras).forEach(k => {
        if (Math.random() < spec.extras[k]) {
          out.push({ token: k, value: this._weatherValue(k) });
        }
      });
    }
    return out;
  },

  // Sky modes — each emits an array of {value, token} entries, 1-3 layers.
  _rollSky(spec) {
    const altRange = spec.altRange;
    switch (spec.mode) {
      case 'clear_or_few_high':
        if (Math.random() < 0.5) {
          return [this._skyEntry('CLR')];
        }
        return [this._skyEntry('FEW', this._rollInt(200, 300))];

      case 'sct_or_bkn_low': {
        const cover = Math.random() < 0.5 ? 'SCT' : 'BKN';
        const alt = this._rollInt(altRange[0], altRange[1]);
        const layers = [this._skyEntry(cover, alt)];
        // 30% chance of OVC layer above
        if (cover === 'BKN' && Math.random() < 0.3) {
          const above = this._rollInt(alt + 5, alt + 30);
          layers.push(this._skyEntry('OVC', Math.min(above, 250)));
        }
        return layers;
      }

      case 'ovc_very_low': {
        const alt = this._rollInt(altRange[0], altRange[1]);
        return [this._skyEntry('OVC', alt)];
      }

      case 'ovc_low': {
        const alt = this._rollInt(altRange[0], altRange[1]);
        const layers = [];
        // 30% chance of BKN below the OVC
        if (Math.random() < 0.3 && alt > 6) {
          layers.push(this._skyEntry('BKN', this._rollInt(Math.max(2, alt - 8), alt - 2)));
        }
        layers.push(this._skyEntry('OVC', alt));
        return layers;
      }

      case 'cb_with_overcast': {
        const cbAlt = this._rollInt(spec.cbAltRange[0], spec.cbAltRange[1]);
        const ovcAlt = this._rollInt(spec.ovcAltRange[0], spec.ovcAltRange[1]);
        return [
          this._skyEntry('BKN', cbAlt, 'CB'),
          this._skyEntry('OVC', Math.max(ovcAlt, cbAlt + 10))
        ];
      }

      case 'clear_few_or_sct': {
        const r = Math.random();
        if (r < 0.34) return [this._skyEntry('CLR')];
        const cover = r < 0.67 ? 'FEW' : 'SCT';
        return [this._skyEntry(cover, this._rollInt(altRange[0], altRange[1]))];
      }

      case 'few_high_or_sct_high': {
        const cover = Math.random() < 0.5 ? 'FEW' : 'SCT';
        return [this._skyEntry(cover, this._rollInt(altRange[0], altRange[1]))];
      }

      default:
        return [this._skyEntry('CLR')];
    }
  },

  _skyEntry(cover, altInHundreds, suffix) {
    if (cover === 'CLR' || cover === 'SKC') {
      return { token: cover, value: 'Sky clear' };
    }
    const altFt = altInHundreds * 100;
    const coverWord = { FEW: 'Few', SCT: 'Scattered', BKN: 'Broken', OVC: 'Overcast' }[cover];
    const cb = suffix === 'CB' ? ' with cumulonimbus' : '';
    const tcu = suffix === 'TCU' ? ' (towering cumulus)' : '';
    return {
      token: `${cover}${this._pad3(altInHundreds)}${suffix || ''}`,
      value: `${coverWord} at ${altFt.toLocaleString()} ft${cb}${tcu}`
    };
  },

  // ── Plausibility validation ──────────────────────────────────────────────

  _isPlausible(built, tmpl) {
    const wxTokens = built.wxList.map(w => w.token);

    // No FZRA / FZFG when temperature is at or above freezing
    if (built.tempC >= 0) {
      if (wxTokens.indexOf('FZRA') !== -1) return false;
      if (wxTokens.indexOf('FZFG') !== -1) return false;
    }
    // No SN or PL above ~3 °C
    if (built.tempC > 3) {
      if (wxTokens.indexOf('SN') !== -1) return false;
      if (wxTokens.indexOf('-SN') !== -1) return false;
      if (wxTokens.indexOf('PL') !== -1) return false;
    }

    // No FG with vis 10 SM (FG should always be ≤ 5/8 SM per FAA convention)
    const hasFG = wxTokens.indexOf('FG') !== -1 || wxTokens.indexOf('FZFG') !== -1;
    if (hasFG && built.vis.value === '10 SM') return false;

    // Dewpoint cannot exceed temperature
    if (built.dewC > built.tempC) return false;

    return true;
  },

  // ── Token + value formatters ─────────────────────────────────────────────

  _tempToken(c) {
    const a = Math.abs(Math.round(c));
    return c < 0 ? `M${this._pad2(a)}` : this._pad2(a);
  },
  _tempValue(c) {
    return `${Math.round(c)} °C`;
  },

  _altimeterToken(n) {
    return `A${this._pad4(n)}`;
  },
  _altimeterValue(n) {
    const inHg = n / 100;
    return `${inHg.toFixed(2)} inHg`;
  },

  _weatherValue(token) {
    // Decode METAR weather tokens into human-readable text.
    // Handles intensity prefix + descriptor + phenomenon.
    const lookup = {
      BR: 'Mist',
      FG: 'Fog',
      FZFG: 'Freezing fog',
      HZ: 'Haze',
      RA: 'Moderate rain',
      '-RA': 'Light rain',
      '+RA': 'Heavy rain',
      SN: 'Moderate snow',
      '-SN': 'Light snow',
      '+SN': 'Heavy snow',
      PL: 'Ice pellets',
      FZRA: 'Freezing rain',
      '-FZRA': 'Light freezing rain',
      '+FZRA': 'Heavy freezing rain',
      TS: 'Thunderstorm',
      TSRA: 'Thunderstorm with moderate rain',
      '-TSRA': 'Thunderstorm with light rain',
      '+TSRA': 'Thunderstorm with heavy rain',
      DZ: 'Moderate drizzle',
      '-DZ': 'Light drizzle',
      SH: 'Showers',
      SHRA: 'Rain showers',
      '-SHRA': 'Light rain showers',
      '+SHRA': 'Heavy rain showers'
    };
    return lookup[token] || token;
  },

  // ── Tiny helpers ─────────────────────────────────────────────────────────

  _pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  _rollInt(lo, hi) {
    return Math.floor(Math.random() * (hi - lo + 1)) + lo;
  },
  _pad2(n) {
    return String(Math.abs(Math.round(n))).padStart(2, '0');
  },
  _pad3(n) {
    return String(Math.abs(Math.round(n))).padStart(3, '0');
  },
  _pad4(n) {
    return String(Math.abs(Math.round(n))).padStart(4, '0');
  },

  // ════════════════════════════════════════════════════════════════════════
  // DISTRACTOR GENERATION
  // ════════════════════════════════════════════════════════════════════════
  // generateDistractors(question) returns a per-field map of plausible
  // misparses of the source METAR's own characters. Each entry is
  // { text, category } where category is a key from
  // METAR_QUIZ_DISTRACTOR_CATEGORIES (loaded from
  // js/data/metar_quiz_distractors.js).
  //
  // The runtime uses these candidates as the raw pool; difficulty-specific
  // selection (Beginner: small per-field; Intermediate: shared; Advanced:
  // shared with traps) happens in the UI layer (Chunk 4).

  generateDistractors(question) {
    const f = question.fields;
    return {
      wind:        this._distractWind(f.wind),
      visibility:  this._distractVisibility(f.visibility),
      sky:         this._distractSky(f.sky),
      weather:     this._distractWeather(f.weather),
      temperature: this._distractTemp(f.temperature, f.dewpoint, false),
      dewpoint:    this._distractTemp(f.dewpoint, f.temperature, true),
      altimeter:   this._distractAltimeter(f.altimeter),
      // Trap chips that don't belong to any field; the UI uses these only
      // at Advanced difficulty. Filtered against correct values below.
      trap:        this._distractTraps(f)
    };
  },

  // ── Wind ─────────────────────────────────────────────────────────────────

  _distractWind(field) {
    const tok = field.token;
    const out = [];

    if (tok === '00000KT') {
      out.push({ text: '0° at 0 kt', category: 'literal_zero' });
      out.push({ text: 'Variable at 0 kt', category: 'calm_as_vrb' });
      return out;
    }

    if (tok.startsWith('VRB')) {
      const spd = parseInt(tok.slice(3, 5), 10);
      out.push({ text: `0° at ${spd} kt`, category: 'vrb_as_zero' });
      out.push({ text: `360° at ${spd} kt`, category: 'vrb_as_north' });
      return out;
    }

    // Standard form: DDDFFKT or DDDFFGFFKT
    const dir = parseInt(tok.slice(0, 3), 10);
    const spdStr = tok.slice(3, 5);
    const spd = parseInt(spdStr, 10);
    const hasGust = tok.includes('G');
    const gust = hasGust ? parseInt(tok.slice(tok.indexOf('G') + 1, tok.indexOf('KT')), 10) : null;

    // Truncate direction to first 2 digits (220 → 22)
    out.push({ text: `${this._pad2(Math.floor(dir / 10))}° at ${spd} kt`, category: 'truncate_direction' });
    // Speed digits read as the direction
    out.push({ text: `${this._pad3(spd)}° at ${dir % 100} kt`, category: 'speed_as_direction' });
    // Drop trailing zero (220 → 22°) — meaningful only if direction ends in 0
    if (dir % 10 === 0) {
      out.push({ text: `${dir / 10}° at ${spd} kt`, category: 'drop_trailing_zero' });
    }
    // Gust value misread as the sustained
    if (hasGust) {
      out.push({ text: `${this._pad3(dir)}° at ${gust} kt sustained, no gust`, category: 'gust_as_speed' });
    }
    // Direction extended into speed digits (5-digit reading)
    out.push({ text: `${dir}${spdStr}° at 0 kt`, category: 'over_extend_direction' });

    return this._dedup(out);
  },

  // ── Visibility ───────────────────────────────────────────────────────────

  _distractVisibility(field) {
    const tok = field.token;
    const out = [];

    // Whole-number form e.g. "10SM", "5SM"
    const wholeM = tok.match(/^(\d+)SM$/);
    if (wholeM) {
      const n = parseInt(wholeM[1], 10);
      if (n >= 10) {
        out.push({ text: `${String(n).slice(0, 1)} SM`, category: 'truncate_first_digit' });
      }
      out.push({ text: `${n} km`, category: 'wrong_unit_km' });
      out.push({ text: `${n} NM`, category: 'wrong_unit_nm' });
      return this._dedup(out);
    }

    // Fraction form e.g. "1/4SM"
    const fracM = tok.match(/^(\d)\/(\d)SM$/);
    if (fracM) {
      const num = parseInt(fracM[1], 10);
      const den = parseInt(fracM[2], 10);
      out.push({ text: `${num} SM`, category: 'drop_fraction' });
      out.push({ text: `${num}/${den} km`, category: 'wrong_unit_km' });
      out.push({ text: `${num}/${den} ft`, category: 'treat_as_sky_height' });
      // wrong_fraction_parse: invert the fraction
      out.push({ text: `${den}/${num} SM`, category: 'wrong_phenomenon' });
      return this._dedup(out);
    }

    return out;
  },

  // ── Sky ──────────────────────────────────────────────────────────────────

  _distractSky(skyList) {
    const out = [];
    skyList.forEach((entry, idx) => {
      const tok = entry.token;
      if (tok === 'CLR' || tok === 'SKC') {
        out.push({ text: 'Few at 5,000 ft', category: 'wrong_clear' });
        out.push({ text: 'Scattered at 12,000 ft', category: 'wrong_clear' });
        return;
      }
      const m = tok.match(/^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/);
      if (!m) return;
      const cover = m[1];
      const altHundreds = parseInt(m[2], 10);
      const suffix = m[3];
      const cw = { FEW: 'Few', SCT: 'Scattered', BKN: 'Broken', OVC: 'Overcast' };
      const altFt = altHundreds * 100;
      const cbStr = suffix === 'CB' ? ' with cumulonimbus'
        : suffix === 'TCU' ? ' (towering cumulus)' : '';

      // No height multiplication — raw altitude digits used as feet
      out.push({ text: `${cw[cover]} at ${altHundreds} ft${cbStr}`, category: 'no_height_multiplication' });
      // Multiply by 10 only
      out.push({ text: `${cw[cover]} at ${altHundreds * 10} ft${cbStr}`, category: 'multiply_by_10_only' });
      // Multiply by 1000
      out.push({ text: `${cw[cover]} at ${(altHundreds * 1000).toLocaleString()} ft${cbStr}`, category: 'multiply_by_1000' });
      // Wrong layer type at the correct altitude
      const wrongCover = { FEW: 'SCT', SCT: 'BKN', BKN: 'OVC', OVC: 'BKN' }[cover];
      out.push({ text: `${cw[wrongCover]} at ${altFt.toLocaleString()} ft${cbStr}`, category: 'wrong_layer_type' });
      // Cross-layer altitude (from another layer in the same METAR)
      if (skyList.length > 1) {
        for (let j = 0; j < skyList.length; j++) {
          if (j === idx) continue;
          const om = skyList[j].token.match(/^(FEW|SCT|BKN|OVC)(\d{3})/);
          if (om) {
            const otherFt = parseInt(om[2], 10) * 100;
            out.push({ text: `${cw[cover]} at ${otherFt.toLocaleString()} ft${cbStr}`, category: 'cross_layer_swap' });
          }
        }
      }
    });
    return this._dedup(out);
  },

  // ── Weather ──────────────────────────────────────────────────────────────

  _distractWeather(wxList) {
    const out = [];
    wxList.forEach(entry => {
      const tok = entry.token;

      if (tok === 'BR') {
        out.push({ text: 'Fog', category: 'wrong_phenomenon' });
        out.push({ text: 'Light drizzle', category: 'wrong_phenomenon' });
        out.push({ text: 'Haze', category: 'wrong_phenomenon' });
        return;
      }
      if (tok === 'HZ') {
        out.push({ text: 'Mist', category: 'wrong_phenomenon' });
        out.push({ text: 'Smoke', category: 'wrong_phenomenon' });
        return;
      }
      if (tok === 'FG') {
        out.push({ text: 'Mist', category: 'wrong_phenomenon' });
        out.push({ text: 'Freezing fog', category: 'temp_confusion' });
        return;
      }
      if (tok === 'FZFG') {
        out.push({ text: 'Fog', category: 'strip_freezing' });
        out.push({ text: 'Freezing rain', category: 'wrong_phenomenon' });
        return;
      }

      // Intensity-prefixed phenomena: "-RA", "+RA", "RA", "-TSRA", etc.
      const intensityM = tok.match(/^([-+])?(.+)$/);
      const prefix = intensityM[1] || '';
      const rest = intensityM[2];

      if (prefix) {
        // Strip intensity (- or +) → moderate
        out.push({ text: this._weatherValue(rest), category: 'strip_intensity' });
        // Wrong intensity (flip - and +)
        const opp = prefix === '-' ? '+' : '-';
        out.push({ text: this._weatherValue(opp + rest), category: 'wrong_intensity' });
      } else if (!rest.startsWith('FZ')) {
        // No prefix means moderate — distractors: light or heavy
        out.push({ text: this._weatherValue('-' + rest), category: 'wrong_intensity' });
        out.push({ text: this._weatherValue('+' + rest), category: 'wrong_intensity' });
      }

      // TSRA → strip TS → "moderate rain"; or strip RA → "thunderstorm"
      if (rest === 'TSRA') {
        out.push({ text: 'Moderate rain', category: 'strip_descriptor' });
        out.push({ text: 'Thunderstorm', category: 'strip_phenomenon' });
      }
      // FZRA → strip FZ → "moderate rain"; wrong precip → ice pellets
      if (rest === 'FZRA') {
        out.push({ text: 'Moderate rain', category: 'strip_freezing' });
        out.push({ text: 'Ice pellets', category: 'wrong_phenomenon' });
      }
      // SN family → wrong phenomenon (PL, hail-style)
      if (rest === 'SN' || tok === '-SN' || tok === '+SN') {
        out.push({ text: 'Ice pellets', category: 'wrong_phenomenon' });
        out.push({ text: 'Light freezing rain', category: 'wrong_phenomenon' });
      }
      // PL → wrong phenomenon
      if (tok === 'PL') {
        out.push({ text: 'Light snow', category: 'wrong_phenomenon' });
        out.push({ text: 'Hail', category: 'wrong_phenomenon' });
      }
    });
    return this._dedup(out);
  },

  // ── Temperature / Dewpoint ──────────────────────────────────────────────

  _distractTemp(field, partner, isDewpoint) {
    const tok = field.token;
    const out = [];
    const isM = tok.startsWith('M');
    const num = parseInt(isM ? tok.slice(1) : tok, 10);
    const c = isM ? -num : num;

    if (isM) {
      // Missed minus sign — sub-zero read as positive
      out.push({ text: `${num} °C`, category: 'missed_m_sign' });
      // Treated digits as tens (M05 → -50)
      if (num < 10) {
        out.push({ text: `${-num * 10} °C`, category: 'treated_as_tens' });
      }
    } else {
      // Added a minus sign that isn't there
      if (num > 0) {
        out.push({ text: `-${num} °C`, category: 'added_m_sign' });
      }
    }

    // Always-available: wrong-unit Fahrenheit reading. Same numeric value,
    // wrong unit. Works at every temperature including 0 °C / 0 °C
    // (saturation, where most other distractors collapse).
    out.push({ text: `${c} °F`, category: 'wrong_unit_f' });

    // Swap with partner field
    if (partner && partner.value !== field.value) {
      out.push({ text: partner.value, category: 'swap_t_d' });
    }

    return this._dedup(out);
  },

  // ── Altimeter ────────────────────────────────────────────────────────────

  _distractAltimeter(field) {
    const tok = field.token;            // "A2990"
    const n = parseInt(tok.slice(1), 10); // 2990
    const inHg = n / 100;
    const out = [];

    out.push({ text: `${n} inHg`, category: 'no_decimal' });
    out.push({ text: `${(n / 10).toFixed(1)} inHg`, category: 'decimal_wrong_place' });
    out.push({ text: `${(n / 1000).toFixed(3)} inHg`, category: 'decimal_wrong_place' });
    out.push({ text: tok, category: 'raw_token' });
    out.push({ text: `${inHg.toFixed(2)} hPa`, category: 'as_hpa' });

    return this._dedup(out);
  },

  // ── Trap chips (global; Advanced only) ──────────────────────────────────

  _distractTraps(fields) {
    // A pool of plausible-looking values that don't appear in this METAR.
    // Filtered against the question's correct values below so we never
    // accidentally surface a "trap" that's actually correct for some field.
    const pool = [
      'Variable at 3 kt', 'Calm', '180° at 5 kt', '270° at 12 kt',
      '6 SM', '1/2 SM', '7 SM',
      'Sky clear', 'Few at 8,000 ft', 'Scattered at 12,000 ft', 'Broken at 4,500 ft',
      'Light rain', 'Moderate snow', 'Mist', 'Haze', 'Light drizzle',
      '5 °C', '-3 °C', '15 °C', '0 °C',
      '29.92 inHg', '30.05 inHg'
    ];

    // Collect every correct value for this question to filter against
    const correctSet = new Set();
    [fields.wind, fields.visibility, fields.temperature, fields.dewpoint, fields.altimeter]
      .forEach(f => correctSet.add(f.value));
    fields.sky.forEach(s => correctSet.add(s.value));
    fields.weather.forEach(w => correctSet.add(w.value));

    const filtered = pool.filter(t => !correctSet.has(t));
    // Shuffle and take 4-6
    const shuffled = filtered.slice().sort(() => Math.random() - 0.5);
    const n = this._rollInt(4, 6);
    return shuffled.slice(0, n).map(text => ({ text, category: 'trap' }));
  },

  // Remove duplicate distractors (same text) — different categories may
  // converge on the same text for some inputs (e.g., 220° at 8 kt yields
  // "22° at 8 kt" via both truncate_direction and drop_trailing_zero).
  _dedup(arr) {
    const seen = new Set();
    return arr.filter(d => {
      if (seen.has(d.text)) return false;
      seen.add(d.text);
      return true;
    });
  }
};
