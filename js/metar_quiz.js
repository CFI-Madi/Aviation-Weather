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
  }
};
