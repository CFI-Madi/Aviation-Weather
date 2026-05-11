// ============================================================
// Aviation Weather Academy — Diagrams
// ============================================================

const Diagrams = {
  // Shared init dispatch — used by both lesson sections (Screens._initDiagram)
  // and the standalone tool-detail screen (Screens.tool_detail). The key may
  // be a section's svgKey/key/type or a registered tool's renderFn name.
  _initToolByKey(k) {
    if (!k) return;
    if (k === 'density_altitude' || k === 'densityAltCalc') this.calcDA();
    else if (k === 'lapse_rate_graph') this.updateLapseGraph();
    else if (k === 'wave_cyclone') this.showCycloneStage(0);
    else if (k === 'microburst_approach') this.showMicroburstPhase(0);
    else if (k === 'icing_severity' || k === 'icingSeverityCalc') this.calcIcingRisk();
    else if (k === 'fog_formation' || k === 'fogFormationCalc') this.calcFogRisk();
    else if (k === 'flight_category_calc' || k === 'renderFlightCategoryCalc') this.calcFlightCategory();
  },

  // Unified render — dispatches every diagram type the lessons can ask for
  render(type, key) {
    // Foundations: hotspot / slider patterns (atmosphere, wind, fronts, clouds)
    if (type === 'hotspot') return this.renderHotspot(key);
    if (type === 'slider') return this.renderSlider(key);
    // Hazard interactives (turbulence, fog, microburst, calculators).
    // cb_ingredients was removed in the M6 §s6_1 redesign — that key now routes
    // to thunderstorm_ingredients via renderHotspot() (selfTitled hotspot,
    // dispatched from Screens._initDiagram). The interactive type itself is
    // retained as a documented capability for future use.
    if (type === 'interactive') {
      const fns = {
        turbulence_sources:()=>this.turbulenceSources(),
        fog_types:()=>this.fogTypes(),
        microburst_approach:()=>this.microburstApproach(),
        icing_severity:()=>this.icingSeverityCalc(),
        turbulence_scale:()=>this.turbulenceScale(),
        fog_formation:()=>this.fogFormationCalc(),
      };
      return fns[key] ? fns[key]() : '';
    }
    // Operational products (METAR/TAF/PIREP decoders, radar, advisories, calculators)
    if (type === 'metar_decoder') return this.renderMetarDecoder();
    if (type === 'taf_decoder') return this.renderTafDecoder();
    if (type === 'pirep_decoder') return this.renderPirepDecoder();
    if (type === 'radar_guide') return this.renderRadarGuide();
    if (type === 'flight_category_calc') return this.renderFlightCategoryCalc();
    if (type === 'weather_code_builder') return this.renderWeatherCodeBuilder();
    if (type === 'advisory_hierarchy') return this.renderAdvisoryHierarchy();
    if (type === 'decode_practice') return this.renderDecodePractice();
    if (type === 'process') {
      // density_altitude is a bespoke 3-step interactive module with its
      // own header/stepper/footer chrome (replaces FAA Fig 8-15 + C-1 in
      // M2 §s2_1). All other process diagrams keep the generic chrome.
      if (key === 'density_altitude') return this.renderDaModule();
      return this.renderProcess(key);
    }
    return '';
  },

  // ===== SHARED HELPERS =====
  // Single render path for every FAA-handbook PNG swap.
  // Renders an image with an attribution strip on top (mono font, sky-blue on navy)
  // and an optional teaching caption below. Image sizing follows the existing
  // PROCESS_DIAGRAMS convention (width:100%, max-height:320px, object-fit:contain).
  // Graceful degradation: missing figureNumber → "FAA-H-8083-28B" only;
  // missing alt → derive from title, otherwise warn and use a generic fallback.
  renderFaaFigure({ src, figureNumber, title, caption, alt } = {}) {
    if (!src) {
      console.warn('[renderFaaFigure] src is required');
      return '';
    }
    const attribParts = ['FAA-H-8083-28B'];
    if (figureNumber) attribParts.push(`Fig ${figureNumber}`);
    const attribText = attribParts.join(' · ');
    const titleSuffix = title ? ` <span class="faa-fig-title">— ${title}</span>` : '';

    let altText = alt;
    if (!altText && title) altText = title;
    if (!altText) {
      console.warn('[renderFaaFigure] missing alt and title for', src);
      altText = 'FAA aviation weather handbook figure';
    }
    const altEsc = String(altText).replace(/"/g, '&quot;');

    const captionHtml = caption
      ? `<div class="faa-fig-caption">${caption}</div>`
      : '';

    return `<figure class="faa-figure">
      <div class="faa-fig-tag">${attribText}${titleSuffix}</div>
      <img src="${src}" alt="${altEsc}">
      ${captionHtml}
    </figure>`;
  },

  // ===== ACT 1 DIAGRAMS =====
  renderHotspot(key) {
    const configs = {
      atmosphere_layers: {
        title: '🔍 Atmospheric Layers — Tap a Layer',
        svgContent: this.atmosphereSVG(),
      },
      wind_forces: {
        // Module renders its own header + FAA attribution strip.
        title: '🌬️ Geostrophic Wind — PGF + Coriolis Balance',
        selfTitled: true,
        svgContent: this.windForcesSVG(),
      },
      fronts_diagram: {
        title: '🌀 Front Symbols — Tap Each Row',
        svgContent: this.frontsSVG(),
      },
      cloud_gallery: {
        title: '☁️ Cloud Identification — FAA Handbook Appendix A',
        svgContent: this.cloudGallerySVG(),
      },
      jet_stream: {
        // Module renders its own header + FAA attribution strip.
        title: '✈️ Polar and Subtropical Jet Streams',
        selfTitled: true,
        svgContent: this.jetStreamSVG(),
      },
      pressure_systems: {
        title: '🗺️ Surface Chart Pressure Patterns',
        svgContent: this.pressureSystemsSVG(),
      },
      surface_wind_forces: {
        // Module renders its own header + FAA attribution strip.
        title: '🌬️ Surface Wind Forces — Friction at Work',
        selfTitled: true,
        svgContent: this.surfaceWindForcesSVG(),
      },
      thunderstorm_lifecycle: {
        // Module renders its own header + FAA attribution strip.
        title: '⛈️ Single-Cell Thunderstorm Lifecycle',
        selfTitled: true,
        svgContent: this.tsLifecycleSVG(),
      },
      thunderstorm_ingredients: {
        // Module renders its own header + FAA attribution strip.
        title: '⛈️ Three Ingredients of a Thunderstorm',
        selfTitled: true,
        svgContent: this.tsIngredientsSVG(),
      }
    };
    const cfg = configs[key];
    if (!cfg) return '';
    // Hotspot diagrams that render their own title heading set
    // selfTitled:true (the conceptual data-self-titled flag — see
    // CONVENTIONS.md). The wrapper suppresses its own title bar in that
    // case so we don't double-title the figure. M3 redesign keys
    // (wind_forces, surface_wind_forces, jet_stream) all set this; older
    // hotspots (atmosphere_layers, fronts_diagram, cloud_gallery,
    // pressure_systems) continue to get the default wrapper title.
    if (cfg.selfTitled === true) {
      return `<div class="diagram-container" data-self-titled="true" style="background:transparent;box-shadow:none">${cfg.svgContent}</div>`;
    }
    return `<div class="diagram-container">
      <div class="diagram-header">
        <span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">${cfg.title}</span>
      </div>
      <div style="padding:0;background:#F8FAFC">${cfg.svgContent}</div>
    </div>`;
  },

  atmosphereSVG() {
    const layers = [
      { name: 'Thermosphere', range: '280,000+ ft', color: '#1E1B4B', info: '🌌 Ultra-thin air. Aurora Borealis occurs here. Spacecraft orbit in this layer.', y: 0, h: 60 },
      { name: 'Mesosphere', range: '160,000–280,000 ft', color: '#312E81', info: '☄️ Where meteors burn up. Very cold (~-90°C). Temperature decreases with altitude.', y: 60, h: 50 },
      { name: 'Stratosphere', range: '36,000–160,000 ft', color: '#1D4ED8', info: '☀️ Ozone layer absorbs UV here. Temperature increases with altitude. Very stable — almost no weather.', y: 110, h: 70 },
      { name: 'Tropopause', range: '~36,000 ft', color: '#0369A1', info: '✈️ KEY BOUNDARY: Temperature stops decreasing. Jet streams live here. Caps convective storms. Commercial jets cruise just below this.', y: 180, h: 25, highlight: true },
      { name: 'Troposphere', range: '0–36,000 ft', color: '#0EA5E9', info: '🌩️ WHERE ALL WEATHER OCCURS. Contains 75% of atmosphere mass. Standard lapse rate: 2°C/1,000 ft. This is your operating environment.', y: 205, h: 100, highlight: true },
    ];
    return `<div style="position:relative;cursor:pointer" id="atmo-diagram">
      <svg viewBox="0 0 400 305" style="width:100%;display:block">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0C0A2E"/>
            <stop offset="30%" stop-color="#1E3A8A"/>
            <stop offset="60%" stop-color="#0EA5E9"/>
            <stop offset="100%" stop-color="#BAE6FD"/>
          </linearGradient>
        </defs>
        <rect width="400" height="305" fill="url(#skyGrad)"/>
        ${layers.map((l,i) => `
          <g onclick="Diagrams.showPopup('atmo-${i}','${l.name}','${l.info.replace(/'/g,'&apos;')}')" style="cursor:pointer" tabindex="0" role="button" aria-label="${l.name}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
            <rect x="0" y="${l.y}" width="400" height="${l.h}" fill="${l.color}" opacity="0.3" class="hotspot-layer"/>
            <rect x="0" y="${l.y}" width="3" height="${l.h}" fill="${l.highlight?'#F59E0B':'#38BDF8'}"/>
            <text x="12" y="${l.y + l.h/2 + 5}" fill="white" font-family="Nunito" font-size="13" font-weight="800">${l.name}</text>
            <text x="12" y="${l.y + l.h/2 + 20}" fill="rgba(255,255,255,0.6)" font-family="Space Mono" font-size="9">${l.range}</text>
            <circle cx="385" cy="${l.y + l.h/2}" r="8" fill="${l.highlight?'#F59E0B':'rgba(255,255,255,0.3)'}" stroke="white" stroke-width="1.5"/>
            <text x="385" y="${l.y + l.h/2 + 4}" fill="white" font-family="Nunito" font-size="11" text-anchor="middle" font-weight="900">i</text>
          </g>`).join('')}
        <!-- Aircraft icon -->
        <text x="200" y="240" font-size="22" text-anchor="middle">✈️</text>
      </svg>
      <!-- Pass 2c scale-callout: layer rectangles use equal vertical bands for legibility — strict-to-scale would render the troposphere as a sliver and the upper layers as full screens. -->
      <div style="background:rgba(12,27,51,0.05);padding:6px 12px;font-family:var(--font-mono);font-size:10px;color:#64748B;text-align:center;letter-spacing:.02em;border-top:1px solid rgba(12,27,51,0.08)">Not to scale — layer thicknesses exaggerated for clarity</div>
      <div id="atmo-popup" style="display:none;position:absolute;bottom:0;left:0;right:0;background:rgba(12,27,51,0.96);color:white;padding:16px;font-family:var(--font-display);font-size:13px;line-height:1.5">
        <strong id="atmo-popup-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
        <span id="atmo-popup-text"></span>
      </div>
    </div>`;
  },

  // M3 §s3_1 — bespoke 4-stage interactive Geostrophic Wind module that
  // replaced the FAA Fig 10-8 still image. Animated: PGF acts alone (rest)
  // → parcel accelerates and Coriolis grows → forces nearly balanced → at
  // steady state PGF and Coriolis balance and the parcel flows parallel
  // to the contours (geostrophic wind). Pressure-height contour values
  // (5520 / 5580 / 5640 / 5700 ft) match FAA-H-8083-28B Fig 10-8.
  // Init logic in _initGeostrophicWindModule (called from
  // Screens._initDiagram after innerHTML inject).
  windForcesSVG() {
    return this.renderGeostrophicWindModule();
  },

  renderGeostrophicWindModule() {
    return `
<div class="gw-module" id="gwModule" role="region" aria-label="Geostrophic wind teaching figure">
  <div class="gw-module__header">
    <h2 class="gw-module__title">Geostrophic Wind</h2>
  </div>
  <div class="gw-module__attr">FAA-H-8083-28B · Fig 10-8 — Geostrophic Wind</div>

  <div class="gw-module__figure">
    <svg id="gwFigure" viewBox="0 0 600 380" preserveAspectRatio="xMidYMid meet" aria-label="Air parcel accelerating to geostrophic balance">
      <defs>
        <radialGradient id="gwParcelGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="60%" stop-color="#E0F2FE" />
          <stop offset="100%" stop-color="#7DD3FC" />
        </radialGradient>
      </defs>

      <text class="height-label" x="14" y="22">LOWER</text>
      <text class="height-label" x="14" y="36">HEIGHTS</text>
      <text class="height-label" x="14" y="332">HIGHER</text>
      <text class="height-label" x="14" y="346">HEIGHTS</text>

      <line class="contour-line" x1="70" y1="60" x2="590" y2="60" />
      <text class="contour-label" x="70" y="54">5520</text>
      <line class="contour-line" x1="70" y1="150" x2="590" y2="150" />
      <text class="contour-label" x="70" y="144">5580</text>
      <line class="contour-line" x1="70" y1="240" x2="590" y2="240" />
      <text class="contour-label" x="70" y="234">5640</text>
      <line class="contour-line" x1="70" y1="320" x2="590" y2="320" />
      <text class="contour-label" x="70" y="314">5700</text>

      <rect id="gwSteadyBox" class="steady-box" x="470" y="40" width="120" height="300" rx="2" opacity="0.25" />
      <text id="gwSteadyLabel" class="panel-label" x="530" y="356" text-anchor="middle" opacity="0.4">NO NET FORCE</text>
      <text id="gwNetforceLabel" class="panel-label" x="270" y="356" text-anchor="middle" opacity="0.7">NET FORCE ACTING ON PARCEL</text>

      <path id="gwTrajectory" class="trajectory" d="" />
      <g id="gwStages"></g>
    </svg>

    <div class="gw-legend" aria-hidden="true">
      <div class="gw-legend__item"><span class="gw-legend__chip gw-legend__chip--parcel"></span><span><strong>Air parcel</strong></span></div>
      <div class="gw-legend__item"><span class="gw-legend__chip gw-legend__chip--pgf"></span><span><strong>PGF</strong> · pressure gradient</span></div>
      <div class="gw-legend__item"><span class="gw-legend__chip gw-legend__chip--wind"></span><span><strong>Resultant wind</strong></span></div>
      <div class="gw-legend__item"><span class="gw-legend__chip gw-legend__chip--cor"></span><span><strong>Coriolis force</strong></span></div>
    </div>
  </div>

  <div class="gw-module__caption" aria-live="polite">
    <span class="gw-caption__stage" id="gwCapStage">Stage 1 of 4 · 5700 ft</span>
    <span class="gw-caption__text" id="gwCapText">PGF acts alone — the parcel begins to accelerate from rest toward lower heights.</span>
  </div>

  <div class="gw-controls">
    <div class="gw-controls__row">
      <button class="gw-btn" id="gwPlayBtn" aria-pressed="false" aria-label="Play animation">
        <svg id="gwPlayIcon" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 2 L12 7 L3 12 Z" fill="currentColor"/></svg>
        <span id="gwPlayLabel">Play</span>
      </button>
      <button class="gw-btn gw-btn--ghost" id="gwResetBtn" aria-label="Reset to stage 1">Reset</button>
      <span class="gw-stage-readout" id="gwStageReadout">STAGE 1 / 4</span>
    </div>
    <div class="gw-slider-wrap">
      <input type="range" id="gwStageSlider" min="0" max="3" step="1" value="0" aria-label="Step through stages" />
      <div class="gw-stage-ticks" aria-hidden="true">
        <span>At rest</span><span>Accel.</span><span>Faster</span><span>Steady</span>
      </div>
    </div>
  </div>
</div>`;
  },

  // Interactive init for the Geostrophic Wind module. Idempotent via
  // dataset.gwInit. Called by Screens._initDiagram for hotspot key
  // 'wind_forces' after innerHTML injection.
  _initGeostrophicWindModule() {
    const root = document.getElementById('gwModule');
    if (!root || root.dataset.gwInit === 'done') return;
    root.dataset.gwInit = 'done';

    const SVG_NS = 'http://www.w3.org/2000/svg';

    const stages = [
      { label: 'Stage 1 of 4 · 5700 ft', text: 'At rest. PGF acts alone — the parcel begins to accelerate toward lower heights.',
        parcel: { x: 110, y: 320 }, pgf: 36, coriolis: 0, wind: 0, windAngle: 0 },
      { label: 'Stage 2 of 4 · 5640 ft', text: 'Accelerating. PGF is strong; Coriolis appears and grows as the wind builds.',
        parcel: { x: 220, y: 240 }, pgf: 56, coriolis: 26, wind: 36, windAngle: -22 },
      { label: 'Stage 3 of 4 · 5580 ft', text: 'Faster. PGF and Coriolis are nearly balanced; the wind nears its maximum.',
        parcel: { x: 360, y: 170 }, pgf: 70, coriolis: 52, wind: 56, windAngle: -10 },
      { label: 'Stage 4 of 4 · 5580 ft', text: 'Steady state. PGF and Coriolis balance exactly — no net force, the parcel flows parallel to the contours (geostrophic wind).',
        parcel: { x: 530, y: 150 }, pgf: 78, coriolis: 78, wind: 70, windAngle: 0 }
    ];

    const stagesEl = root.querySelector('#gwStages');
    const trajectoryEl = root.querySelector('#gwTrajectory');
    const capStage = root.querySelector('#gwCapStage');
    const capText = root.querySelector('#gwCapText');
    const slider = root.querySelector('#gwStageSlider');
    const playBtn = root.querySelector('#gwPlayBtn');
    const playLabel = root.querySelector('#gwPlayLabel');
    const playIcon = root.querySelector('#gwPlayIcon');
    const resetBtn = root.querySelector('#gwResetBtn');
    const stageReadout = root.querySelector('#gwStageReadout');
    const steadyBox = root.querySelector('#gwSteadyBox');
    const steadyLabel = root.querySelector('#gwSteadyLabel');
    const netforceLabel = root.querySelector('#gwNetforceLabel');

    // Block-style outlined arrow (FAA figure aesthetic).
    function buildArrow(opts) {
      const w = opts.width || 12;
      const headW = w * 1.9;
      const headLen = Math.min(18, Math.max(10, opts.length * 0.32));
      const shaftLen = Math.max(0, opts.length - headLen);
      const pts = [
        [0, -w/2], [shaftLen, -w/2], [shaftLen, -headW/2], [opts.length, 0],
        [shaftLen, headW/2], [shaftLen, w/2], [0, w/2]
      ].map(p => p.join(',')).join(' ');
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('transform', `translate(${opts.x} ${opts.y}) rotate(${opts.angle})`);
      const poly = document.createElementNS(SVG_NS, 'polygon');
      poly.setAttribute('points', pts);
      poly.setAttribute('fill', opts.color);
      poly.setAttribute('stroke', opts.stroke || '#0C1B33');
      poly.setAttribute('stroke-width', '1.2');
      poly.setAttribute('stroke-linejoin', 'round');
      g.appendChild(poly);
      return g;
    }

    function buildWindArrow(opts) {
      const w = 11;
      const headW = w * 1.9;
      const headLen = Math.min(14, Math.max(8, opts.length * 0.32));
      const shaftLen = Math.max(0, opts.length - headLen);
      const pts = [
        [0, -w/2], [shaftLen, -w/2], [shaftLen, -headW/2], [opts.length, 0],
        [shaftLen, headW/2], [shaftLen, w/2], [0, w/2]
      ].map(p => p.join(',')).join(' ');
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('transform', `translate(${opts.x} ${opts.y}) rotate(${opts.angle})`);
      const poly = document.createElementNS(SVG_NS, 'polygon');
      poly.setAttribute('points', pts);
      poly.setAttribute('fill', 'rgba(56, 189, 248, 0.30)');
      poly.setAttribute('stroke', '#0284C7');
      poly.setAttribute('stroke-dasharray', '4 3');
      poly.setAttribute('stroke-width', '1.5');
      g.appendChild(poly);
      if (shaftLen > 18) {
        const t = document.createElementNS(SVG_NS, 'text');
        t.setAttribute('class', 'wind-label');
        t.setAttribute('x', shaftLen / 2);
        t.setAttribute('y', 3);
        t.setAttribute('text-anchor', 'middle');
        t.textContent = 'WIND';
        g.appendChild(t);
      }
      return g;
    }

    // Build all 4 stage groups; toggle visibility per active stage.
    const stageGroups = stages.map((s, i) => {
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('data-stage', i);
      g.style.opacity = i === 0 ? '1' : '0.18';

      const parcel = document.createElementNS(SVG_NS, 'circle');
      parcel.setAttribute('class', 'parcel');
      parcel.setAttribute('cx', s.parcel.x);
      parcel.setAttribute('cy', s.parcel.y);
      parcel.setAttribute('r', 11);
      parcel.setAttribute('fill', 'url(#gwParcelGrad)');
      g.appendChild(parcel);

      // PGF arrow — points UP toward lower heights
      if (s.pgf > 0) {
        g.appendChild(buildArrow({
          x: s.parcel.x, y: s.parcel.y - 13,
          length: s.pgf, angle: -90, color: '#475569', width: 13
        }));
        const pgfText = document.createElementNS(SVG_NS, 'text');
        pgfText.setAttribute('class', 'force-label');
        pgfText.setAttribute('fill', '#0C1B33');
        pgfText.setAttribute('x', s.parcel.x);
        pgfText.setAttribute('y', s.parcel.y - 13 - s.pgf - 6);
        pgfText.setAttribute('text-anchor', 'middle');
        pgfText.textContent = 'PGF';
        g.appendChild(pgfText);
      }
      // Coriolis arrow — points DOWN (opposite PGF at steady state)
      if (s.coriolis > 0) {
        g.appendChild(buildArrow({
          x: s.parcel.x, y: s.parcel.y + 13,
          length: s.coriolis, angle: 90, color: '#7C3AED', stroke: '#4C1D95', width: 13
        }));
        const cText = document.createElementNS(SVG_NS, 'text');
        cText.setAttribute('class', 'force-label');
        cText.setAttribute('fill', '#7C3AED');
        cText.setAttribute('x', s.parcel.x);
        cText.setAttribute('y', s.parcel.y + 13 + s.coriolis + 14);
        cText.setAttribute('text-anchor', 'middle');
        cText.textContent = 'CORIOLIS';
        g.appendChild(cText);
      }
      // Wind arrow — horizontal, slight up-tilt during accel
      if (s.wind > 0) {
        g.appendChild(buildWindArrow({
          x: s.parcel.x + 14, y: s.parcel.y,
          length: s.wind, angle: s.windAngle
        }));
      }

      stagesEl.appendChild(g);
      return g;
    });

    function trajectoryPath(uptoIndex) {
      if (uptoIndex < 1) return '';
      const pts = stages.slice(0, uptoIndex + 1).map(s => `${s.parcel.x} ${s.parcel.y}`);
      return 'M' + pts.join(' L ');
    }

    let current = 0;
    let playing = false;
    let playTimer = null;

    function setStage(i) {
      current = Math.max(0, Math.min(stages.length - 1, i));
      stageGroups.forEach((g, idx) => {
        if (idx < current) g.style.opacity = '0.32';
        else if (idx === current) g.style.opacity = '1';
        else g.style.opacity = '0';
      });
      trajectoryEl.setAttribute('d', trajectoryPath(current));
      capStage.textContent = stages[current].label;
      capText.textContent = stages[current].text;
      stageReadout.textContent = `STAGE ${current + 1} / ${stages.length}`;
      if (slider.value != current) slider.value = current;
      if (current === stages.length - 1) {
        steadyBox.setAttribute('opacity', '0.85');
        steadyLabel.setAttribute('opacity', '1');
        netforceLabel.setAttribute('opacity', '0.35');
      } else {
        steadyBox.setAttribute('opacity', '0.2');
        steadyLabel.setAttribute('opacity', '0.4');
        netforceLabel.setAttribute('opacity', '0.85');
      }
    }

    function setPlaying(on) {
      playing = on;
      playBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      playLabel.textContent = on ? 'Pause' : 'Play';
      playIcon.innerHTML = on
        ? '<rect x="3" y="2" width="3" height="10" fill="currentColor"/><rect x="8" y="2" width="3" height="10" fill="currentColor"/>'
        : '<path d="M3 2 L12 7 L3 12 Z" fill="currentColor"/>';
    }
    function startPlay() {
      if (playing) return;
      setPlaying(true);
      if (current >= stages.length - 1) setStage(0);
      const tick = () => {
        if (!playing) return;
        if (current >= stages.length - 1) { setPlaying(false); return; }
        setStage(current + 1);
        playTimer = setTimeout(tick, 1400);
      };
      playTimer = setTimeout(tick, 800);
    }
    function stopPlay() {
      setPlaying(false);
      if (playTimer) { clearTimeout(playTimer); playTimer = null; }
    }

    playBtn.addEventListener('click', () => playing ? stopPlay() : startPlay());
    resetBtn.addEventListener('click', () => { stopPlay(); setStage(0); });
    slider.addEventListener('input', (e) => { stopPlay(); setStage(parseInt(e.target.value, 10)); });

    setStage(0);
  },

  // FAA-H-8083-28B Fig 11-4 — the four-row table of frontal chart symbols and
  // their definitions. Bespoke markup (not via renderFaaFigure) because this
  // swap preserves the original tap-to-expand popup behavior: each table row
  // has a transparent overlay button that triggers Diagrams.showPopup with
  // the slope/speed/cloud-sequence/mechanics content the symbology figure
  // alone doesn't carry.
  //
  // Row vertical bands (percent of figure height) are calibrated against
  // Fig 11-4's specific table layout in the FAA-H-8083-28B (Apr 2026)
  // edition: header band ~14%, four equal data rows ~19% each, footer
  // note ~10%. Mobile-verified at 657px viewport — overlays remain aligned
  // because the image is rendered at width:100%/max-height:320px with
  // object-fit:contain, so the row percentages scale proportionally with
  // the visible image at every viewport width.
  // ⚠️ If FAA ever updates Fig 11-4's layout (e.g., adds a header bar or
  // changes row count), recalibrate the `top` percentages in the rows
  // array below — the structural assumption is "header + 4 equal rows
  // + footer". Click each row at narrow viewport to spot misalignment.
  frontsSVG() {
    const rows = [
      { key:'fr-cold', top:14, label:'Cold Front',       title:'❄️ Cold Front',
        text:'COLD air advancing and replacing warm air. Steep frontal slope (~1:50 to 1:100). Fast-moving (25 to 30 mph, up to 60 mph). Narrow intense weather band — often a squall line. Rapid clearing after passage: cold, clear, gusty NW wind, pressure rises. Symbol: BLUE line with triangles pointing the direction of movement.' },
      { key:'fr-warm', top:33, label:'Warm Front',       title:'🔥 Warm Front',
        text:'WARM air advancing over retreating cold air. Very gentle slope (~1:100 to 1:200). Slow-moving (10 to 25 mph). Widespread stratiform weather 500 to 1,000+ miles ahead. Prolonged IFR: low ceilings, fog, continuous rain or drizzle. Cloud sequence ahead: Ci → Cs → As → Ns. Symbol: RED line with semicircles pointing the direction of movement.' },
      { key:'fr-stat', top:52, label:'Stationary Front', title:'⏸️ Stationary Front',
        text:'Two air masses in equilibrium — NEITHER advances. Frontal slope varies. Weather: a mix of warm and cold front characteristics. Can persist for DAYS producing prolonged IFR. Symbol: alternating blue triangles toward cold air and red semicircles toward warm air on opposite sides of the line — opposite directions indicate no movement.' },
      { key:'fr-occ',  top:71, label:'Occluded Front',   title:'🔄 Occluded Front',
        text:'Cold front OVERTAKES warm front. Cold air undercuts BOTH fronts, lifting warm air completely off the surface. Result: elements of BOTH front types simultaneously — warm-front widespread IFR AND cold-front convection/icing. Cold occlusion (more common): new cold air colder than old. Warm occlusion: new cold air warmer than old — freezing rain trap. Symbol: PURPLE line with alternating triangles AND semicircles on the SAME side.' },
    ];
    const escAttr = s => String(s).replace(/'/g, '&apos;').replace(/"/g, '&quot;');
    const overlays = rows.map(r => `<button type="button" class="fronts-row-tap" aria-label="${escAttr(r.label)} — tap for description" onclick="Diagrams.showPopup('${r.key}','${escAttr(r.title)}','${escAttr(r.text)}')" style="position:absolute;left:0;width:100%;top:${r.top}%;height:19%;background:transparent;border:0;cursor:pointer;padding:0"></button>`).join('');
    return `<figure class="faa-figure" style="position:relative">
      <div class="faa-fig-tag">FAA-H-8083-28B · Fig 11-4 <span class="faa-fig-title">— Front Symbols</span></div>
      <div style="position:relative">
        <img src="img/awh/awh_p0142_img_002.png" alt="FAA-H-8083-28B Figure 11-4: table of frontal chart symbols and definitions for cold, warm, stationary, and occluded fronts." style="width:100%;display:block;max-height:320px;object-fit:contain;background:white">
        ${overlays}
      </div>
      <div id="fr-popup" style="display:none;background:var(--navy);color:white;padding:14px 16px;font-family:var(--font-display);font-size:13px;line-height:1.5;border-top:1px solid rgba(56,189,248,.15)">
        <strong id="fr-popup-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
        <span id="fr-popup-text"></span>
      </div>
    </figure>`;
  },

  showPopup(id, title, text) {
    const prefix = id.split('-')[0];
    const popups = { atmo: 'atmo-popup', wf: 'wf-popup', fr: 'fr-popup' };
    const popupId = popups[prefix];
    if (!popupId) return;
    const popup = document.getElementById(popupId);
    const titleEl = document.getElementById(popupId + '-title');
    const textEl = document.getElementById(popupId + '-text');
    if (!popup) return;
    popup.style.display = 'block';
    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;
  },

  renderSlider(key) {
    const configs = {
      density_altitude: {
        title: '📊 Density Altitude Interactive',
        content: this.densityAltCalc()
      },
      stability_comparison: {
        title: '📊 Stability Comparison',
        content: this.stabilitySlider()
      },
      wave_cyclone: {
        title: '🌀 Wave Cyclone Life Cycle',
        content: this.waveCycloneSVG()
      },
      altimeter_error: {
        title: '🌡️ Altimeter Error Scenarios',
        content: this.altimeterErrorSVG()
      },
      lapse_rate_graph: {
        title: '📈 Lapse Rate Stability Graph',
        content: this.lapseRateGraph()
      }
    };
    const cfg = configs[key];
    if (!cfg) return '';
    return `<div class="diagram-container">
      <div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">${cfg.title}</span></div>
      ${cfg.content}
    </div>`;
  },

  densityAltCalc() {
    return `<div style="padding:20px;background:#F8FAFC">
      <p style="font-family:var(--font-display);font-size:14px;color:#64748B;margin:0 0 16px">Drag the sliders to see how temperature and pressure altitude combine to affect density altitude:</p>
      <div style="display:grid;gap:16px">
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Field Elevation / Pressure Altitude</label>
            <span id="da-pa-val" style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:#6366F1">5,000 ft</span>
          </div>
          <input type="range" id="da-pa" min="0" max="14000" step="500" value="5000" style="width:100%;accent-color:#6366F1" oninput="Diagrams.calcDA()">
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Outside Air Temperature (OAT)</label>
            <span id="da-temp-val" style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:#F59E0B">75°F</span>
          </div>
          <input type="range" id="da-temp" min="0" max="115" step="5" value="75" style="width:100%;accent-color:#F59E0B" oninput="Diagrams.calcDA()">
        </div>
      </div>
      <div id="da-result" style="margin-top:20px;background:white;border-radius:16px;padding:18px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.06)">
        <div style="font-family:var(--font-mono);font-size:11px;color:#94A3B8;margin-bottom:8px">CALCULATED DENSITY ALTITUDE</div>
        <div id="da-number" style="font-family:var(--font-display);font-size:42px;font-weight:900;color:#10B981">7,500 ft</div>
        <div id="da-status" style="font-size:14px;margin-top:6px;font-weight:700;font-family:var(--font-display);color:#10B981">✅ Normal performance expected</div>
        <div id="da-isa-compare" style="font-size:12px;color:#94A3B8;margin-top:6px;font-family:var(--font-mono)">ISA temp at this altitude: —</div>
      </div>
    </div>`;
  },

  calcDA() {
    const pa = parseInt(document.getElementById('da-pa').value);
    const oat = parseInt(document.getElementById('da-temp').value);
    const isaTemp = Math.round(59 - (pa / 1000 * 3.5));
    const da = Math.round(pa + 120 * (oat - isaTemp));
    document.getElementById('da-pa-val').textContent = pa.toLocaleString() + ' ft';
    document.getElementById('da-temp-val').textContent = oat + '°F';
    document.getElementById('da-number').textContent = da.toLocaleString() + ' ft';
    document.getElementById('da-isa-compare').textContent = `ISA std temp at ${pa.toLocaleString()} ft: ${isaTemp}°F | OAT: ${oat}°F`;
    const num = document.getElementById('da-number');
    const status = document.getElementById('da-status');
    if (da < 5000) { num.style.color='#10B981'; status.textContent='✅ Normal performance expected'; status.style.color='#10B981'; }
    else if (da < 8000) { num.style.color='#F59E0B'; status.textContent='⚠️ Reduced performance — use charts!'; status.style.color='#F59E0B'; }
    else { num.style.color='#EF4444'; status.textContent='⛔ HIGH density altitude — significant performance loss!'; status.style.color='#EF4444'; }
  },

  stabilitySlider() {
    return `<div style="background:#F8FAFC">
      <div style="display:grid;grid-template-columns:1fr 1fr;height:220px">
        <div style="background:linear-gradient(180deg,#BAE6FD 0%,#7DD3FC 40%,#E0F2FE 70%,#F0F9FF 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:12px;position:relative">
          <div style="position:absolute;top:8px;left:0;right:0;text-align:center;font-family:var(--font-display);font-size:12px;font-weight:800;color:#0284C7;background:rgba(255,255,255,0.85);padding:4px;margin:0 8px;border-radius:8px">STABLE ATMOSPHERE</div>
          <div style="margin-top:30px">
            ${['━━━','━━━━━','━━━━━━━','━━━━━━━━━'].map((s,i)=>`<div style="font-size:16px;opacity:${0.4+i*0.2};margin:3px 0;color:#64748B">${s}</div>`).join('')}
          </div>
          <div style="font-size:28px">🌫️</div>
          <div style="text-align:center;font-size:12px;color:#334155;font-family:var(--font-display);font-weight:600">Stratus · Fog · Smooth Air<br><span style="color:#EF4444;font-size:11px">Poor visibility / IFR</span></div>
        </div>
        <div style="background:linear-gradient(180deg,#7DD3FC 0%,#38BDF8 30%,#BAE6FD 60%,#FEF3C7 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:12px;position:relative">
          <div style="position:absolute;top:8px;left:0;right:0;text-align:center;font-family:var(--font-display);font-size:12px;font-weight:800;color:#DC2626;background:rgba(255,255,255,0.85);padding:4px;margin:0 8px;border-radius:8px">UNSTABLE ATMOSPHERE</div>
          <div style="margin-top:10px;text-align:center">
            <div style="font-size:40px;line-height:1">⛈️</div>
            <div style="font-size:28px">☁️</div>
            <div style="font-size:22px">🌤️</div>
          </div>
          <div style="text-align:center;font-size:12px;color:#334155;font-family:var(--font-display);font-weight:600">CB · Towering Cu · Turbulence<br><span style="color:#10B981;font-size:11px">Good visibility / VFR (but hazards!)</span></div>
        </div>
      </div>
      <div style="padding:14px;background:white;border-top:1px solid #E2E8F0">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-family:var(--font-mono);font-size:11px">
          <div style="padding:8px;background:#E0F2FE;border-radius:8px;color:#0284C7"><strong>ELR &lt; MALR</strong><br>Stable — resist convection<br>Smooth, layered clouds</div>
          <div style="padding:8px;background:#FFE4E6;border-radius:8px;color:#DC2626"><strong>ELR &gt; DALR</strong><br>Unstable — free convection<br>Vertical cloud development</div>
        </div>
      </div>
    </div>`;
  },

  // ===== NEW: CLOUD GALLERY =====
  cloudGallerySVG() {
    // FAA-H-8083-28B Appendix A — twelve canonical cloud-genera photo plates.
    // Each entry: figure number, official caption from the handbook, file path, and
    // a one-line operational hint surfaced as the FAA caption strip.
    const plates = [
      { fig:'A-1',  title:'Cirrus (Ci)',                                src:'awh_p0492_img_001.png', tip:'High ice-crystal wisps. First sign of an approaching warm front (500+ mi ahead) — no icing alone.' },
      { fig:'A-2',  title:'Cirrocumulus (Cc)',                          src:'awh_p0493_img_001.png', tip:'High rippled patches. No shading; distinct from altocumulus by altitude.' },
      { fig:'A-3',  title:'Cirrostratus (Cs)',                          src:'awh_p0494_img_001.png', tip:'Thin high veil producing 22° halos around sun or moon — warm front approaching.' },
      { fig:'A-4',  title:'Altocumulus (Ac)',                           src:'awh_p0495_img_001.png', tip:'Mid-level rolls. Castellanus (turreted) form predicts afternoon thunderstorms.' },
      { fig:'A-5',  title:'Altocumulus Standing Lenticular (ACSL)',     src:'awh_p0496_img_001.png', tip:'Stationary lens shape over mountains — strong winds aloft, mountain-wave hazard.' },
      { fig:'A-6',  title:'Thin Altostratus (As)',                      src:'awh_p0497_img_001.png', tip:'Translucent gray sheet. Sun visible as through ground glass; no halo.' },
      { fig:'A-7',  title:'Thick Altostratus (As) or Nimbostratus (Ns)', src:'awh_p0498_img_001.png', tip:'Dark continuous-precipitation layer — moderate-heavy rain or snow, low ceilings, steady icing.' },
      { fig:'A-8',  title:'Cumulus (Cu) with Little Vertical Development', src:'awh_p0499_img_001.png', tip:'Fair-weather puffs with flat bases. Light surface heating; VFR-friendly.' },
      { fig:'A-9',  title:'Towering Cumulus (TCu)',                     src:'awh_p0499_img_002.png', tip:'Pre-storm stage. Rapid vertical growth signals convective activity within 1–2 hours.' },
      { fig:'A-10', title:'Stratocumulus (Sc)',                         src:'awh_p0500_img_001.png', tip:'Lumpy low overcast. Common globally; ceilings can persist; light icing possible.' },
      { fig:'A-11', title:'Stratus (St)',                               src:'awh_p0501_img_001.png', tip:'Smooth low gray sheet. Fog-like ceiling; little or no precipitation.' },
      { fig:'A-12', title:'Stratus Fractus / Cumulus Fractus',          src:'awh_p0501_img_002.png', tip:'Ragged "scud" beneath a bad-weather system — turbulence and reduced ceilings.' },
    ];
    const cells = plates.map(p => this.renderFaaFigure({
      src: `img/awh/${p.src}`,
      figureNumber: p.fig,
      title: p.title,
      caption: p.tip,
      alt: `FAA-H-8083-28B Figure ${p.fig}: ${p.title}`,
    })).join('');
    return `<div style="padding:14px 14px 8px;font-family:var(--font-display);font-size:13px;color:#64748B;font-weight:700">FAA-H-8083-28B Appendix A — Cloud Identification Plates</div>
      <div class="faa-fig-grid cols-2-3" style="padding:0 12px 12px">${cells}</div>`;
  },

  // ===== NEW: WAVE CYCLONE ANIMATED =====
  waveCycloneSVG() {
    return `<div style="background:#F0F9FF;padding:16px">
      <div style="font-family:var(--font-display);font-size:13px;color:#64748B;font-weight:700;margin-bottom:12px;text-align:center">TAP A STAGE to see what's happening — 5 stages of a wave cyclone lifecycle</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${['Stationary Front','Wave Forms','Low Intensifies','Mature Low + Occlusion','Dissipation'].map((stage,i)=>`
        <button onclick="Diagrams.showCycloneStage(${i})" id="cyc-btn-${i}" style="padding:8px 12px;border-radius:12px;border:2px solid ${i===0?'#6366F1':'#E2E8F0'};background:${i===0?'#EEF2FF':'white'};font-family:var(--font-display);font-size:12px;font-weight:700;cursor:pointer;color:${i===0?'#6366F1':'#94A3B8'}">
          ${['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'][i]} ${stage}
        </button>`).join('')}
      </div>
      <div id="cyc-diagram" style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <svg id="cyc-svg" viewBox="0 0 380 240" style="width:100%;display:block"></svg>
        <div id="cyc-desc" style="padding:14px 16px;background:var(--navy);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6">
          <strong style="color:#38BDF8;display:block;margin-bottom:4px">Stage 1 — Stationary Front</strong>
          A stationary front separates cold polar air (north) from warm tropical air (south). Neither air mass is advancing. Weather: mix of warm and cold front characteristics, can persist for days producing persistent IFR.
        </div>
      </div>
    </div>`;
  },

  showCycloneStage(n) {
    document.querySelectorAll('[id^=cyc-btn-]').forEach((b,i)=>{
      b.style.borderColor = i===n?'#6366F1':'#E2E8F0';
      b.style.background = i===n?'#EEF2FF':'white';
      b.style.color = i===n?'#6366F1':'#94A3B8';
    });
    const svg = document.getElementById('cyc-svg');
    const desc = document.getElementById('cyc-desc');
    const stages = [
      {
        svg: `<rect width="380" height="240" fill="#F0F9FF"/>
          <text x="190" y="22" text-anchor="middle" font-family="Nunito" font-size="10" fill="#1E3A5F" font-weight="800">STAGE 1 — STATIONARY FRONT</text>
          <text x="190" y="35" text-anchor="middle" font-family="Nunito" font-size="9" fill="#64748B">Neither air mass advances — front is in equilibrium</text>
          <text x="190" y="68" text-anchor="middle" font-family="Nunito" font-size="11" fill="#2563EB" font-weight="800">❄️ COLD AIR (cP) — HIGH PRESSURE</text>
          <text x="190" y="205" text-anchor="middle" font-family="Nunito" font-size="11" fill="#DC2626" font-weight="800">☀️ WARM AIR (mT) — LOW PRESSURE</text>
          <text x="45" y="55" font-family="Space Mono" font-size="9" fill="#2563EB">H</text>
          <ellipse cx="55" cy="70" rx="28" ry="18" fill="none" stroke="#93C5FD" stroke-width="1" stroke-dasharray="4,3"/>
          <text x="295" y="195" font-family="Space Mono" font-size="9" fill="#DC2626">L</text>
          <ellipse cx="295" cy="210" rx="28" ry="18" fill="none" stroke="#FCA5A5" stroke-width="1" stroke-dasharray="4,3"/>
          <line x1="20" y1="128" x2="360" y2="128" stroke="#4F46E5" stroke-width="3"/>
          <polygon points="38,128 31,114 45,114" fill="#2563EB"/>
          <path d="M 51,128 A 8,8 0 0,1 67,128" fill="#DC2626"/>
          <polygon points="80,128 73,114 87,114" fill="#2563EB"/>
          <path d="M 93,128 A 8,8 0 0,1 109,128" fill="#DC2626"/>
          <polygon points="122,128 115,114 129,114" fill="#2563EB"/>
          <path d="M 135,128 A 8,8 0 0,1 151,128" fill="#DC2626"/>
          <polygon points="164,128 157,114 171,114" fill="#2563EB"/>
          <path d="M 177,128 A 8,8 0 0,1 193,128" fill="#DC2626"/>
          <polygon points="206,128 199,114 213,114" fill="#2563EB"/>
          <path d="M 219,128 A 8,8 0 0,1 235,128" fill="#DC2626"/>
          <polygon points="248,128 241,114 255,114" fill="#2563EB"/>
          <path d="M 261,128 A 8,8 0 0,1 277,128" fill="#DC2626"/>
          <polygon points="290,128 283,114 297,114" fill="#2563EB"/>
          <path d="M 303,128 A 8,8 0 0,1 319,128" fill="#DC2626"/>
          <polygon points="332,128 325,114 339,114" fill="#2563EB"/>
          <path d="M 345,128 A 8,8 0 0,1 361,128" fill="#DC2626"/>
          <rect x="20" y="110" width="340" height="36" fill="rgba(99,102,241,0.08)" rx="6"/>
          <text x="190" y="152" text-anchor="middle" font-family="Space Mono" font-size="8" fill="#4F46E5">PERSISTENT LOW CEILINGS · DRIZZLE · IFR CONDITIONS</text>
          <text x="60" y="100" font-family="Nunito" font-size="10" fill="#2563EB">→→→</text>
          <text x="280" y="165" font-family="Nunito" font-size="10" fill="#DC2626">←←←</text>`,
        title:'Stage 1 — Stationary Front',
        text:'A stationary front separates cold polar air (cP, north) from warm maritime tropical air (mT, south). Neither air mass advances — forces are balanced. Weather: persistent low ceilings, drizzle, IFR conditions that can last days. On charts: alternating blue triangles (cold side) and red semicircles (warm side) — pointing in OPPOSITE directions to show no movement.'
      },
      {
        svg: `<rect width="380" height="240" fill="#F0F9FF"/>
          <text x="190" y="22" text-anchor="middle" font-family="Nunito" font-size="10" fill="#1E3A5F" font-weight="800">STAGE 2 — WAVE DEVELOPS</text>
          <text x="190" y="35" text-anchor="middle" font-family="Nunito" font-size="9" fill="#64748B">Kink forms on the front — cold air pushes S, warm air moves N</text>
          <path d="M 20,140 Q 100,140 190,88 Q 280,140 360,140" stroke="#4F46E5" stroke-width="2.5" fill="none" stroke-dasharray="7,4"/>
          <circle cx="190" cy="88" r="14" fill="rgba(99,102,241,0.15)" stroke="#6366F1" stroke-width="2"/>
          <text x="190" y="93" text-anchor="middle" font-family="Nunito" font-size="13" fill="#4F46E5" font-weight="900">L</text>
          <text x="190" y="72" text-anchor="middle" font-family="Nunito" font-size="8" fill="#4F46E5" font-weight="700">DEVELOPING LOW</text>
          <path d="M 190,88 L 95,168" stroke="#2563EB" stroke-width="3" fill="none"/>
          <polygon points="120,118 114,106 126,106" fill="#2563EB"/>
          <polygon points="105,143 99,131 111,131" fill="#2563EB"/>
          <path d="M 190,88 L 285,158" stroke="#DC2626" stroke-width="3" fill="none"/>
          <circle cx="218" cy="108" r="7" fill="#DC2626"/>
          <circle cx="248" cy="133" r="7" fill="#DC2626"/>
          <ellipse cx="195" cy="130" rx="30" ry="22" fill="rgba(147,197,253,0.25)"/>
          <text x="195" y="134" text-anchor="middle" font-family="Space Mono" font-size="8" fill="#1D4ED8">LIGHT PRECIP</text>
          <text x="65" y="75" font-family="Nunito" font-size="10" fill="#2563EB" font-weight="700">❄️ COLD</text>
          <text x="295" y="195" font-family="Nunito" font-size="10" fill="#DC2626" font-weight="700">☀️ WARM</text>
          <text x="150" y="165" font-family="Nunito" font-size="9" fill="#2563EB">↙ cold air</text>
          <text x="215" y="75" font-family="Nunito" font-size="9" fill="#DC2626">warm air ↗</text>`,
        title:'Stage 2 — Wave Forms',
        text:'A low-pressure wave develops as a kink on the stationary front. Cold air begins pushing southward (cold front forms on SW side of low). Warm air advances northward (warm front forms on SE side). A warm sector of mT air develops between the fronts. Light precipitation begins in the lifting zones. The low is still weak — weather organized but not intense.'
      },
      {
        svg: `<rect width="380" height="240" fill="#F0F9FF"/>
          <text x="190" y="22" text-anchor="middle" font-family="Nunito" font-size="10" fill="#1E3A5F" font-weight="800">STAGE 3 — LOW INTENSIFIES</text>
          <text x="190" y="35" text-anchor="middle" font-family="Nunito" font-size="9" fill="#64748B">Deepening low · organized fronts · warm sector well-defined</text>
          <circle cx="155" cy="105" r="20" fill="rgba(99,102,241,0.18)" stroke="#4F46E5" stroke-width="2.5"/>
          <text x="155" y="111" text-anchor="middle" font-family="Nunito" font-size="16" fill="#4F46E5" font-weight="900">L</text>
          <ellipse cx="155" cy="105" rx="55" ry="40" fill="none" stroke="#818CF8" stroke-width="1" stroke-dasharray="5,3"/>
          <ellipse cx="155" cy="105" rx="95" ry="70" fill="none" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="5,3" opacity="0.6"/>
          <path d="M 155,105 L 55,185" stroke="#2563EB" stroke-width="3.5" fill="none"/>
          <polygon points="87,138 81,126 93,126" fill="#2563EB"/>
          <polygon points="66,162 60,150 72,150" fill="#2563EB"/>
          <ellipse cx="75" cy="185" rx="22" ry="14" fill="rgba(37,99,235,0.2)"/>
          <text x="42" y="175" font-family="Space Mono" font-size="7" fill="#1D4ED8">CB LINE</text>
          <path d="M 155,105 L 300,165" stroke="#DC2626" stroke-width="3.5" fill="none"/>
          <circle cx="192" cy="118" r="8" fill="#DC2626"/>
          <circle cx="231" cy="135" r="8" fill="#DC2626"/>
          <circle cx="270" cy="152" r="8" fill="#DC2626"/>
          <ellipse cx="310" cy="100" rx="55" ry="65" fill="rgba(147,197,253,0.2)" stroke="#93C5FD" stroke-width="1" stroke-dasharray="4,3"/>
          <text x="320" y="62" text-anchor="middle" font-family="Space Mono" font-size="7.5" fill="#1D4ED8">WIDESPREAD</text>
          <text x="320" y="72" text-anchor="middle" font-family="Space Mono" font-size="7.5" fill="#1D4ED8">STRAT PRECIP</text>
          <text x="235" y="210" text-anchor="middle" font-family="Nunito" font-size="11" fill="#D97706" font-weight="800">☀️ WARM SECTOR</text>
          <text x="235" y="223" text-anchor="middle" font-family="Space Mono" font-size="7.5" fill="#92400E">mT air · VFR possible · muggy</text>
          <text x="50" y="65" font-family="Nunito" font-size="10" fill="#2563EB" font-weight="700">❄️ cP COLD</text>
          <text x="310" y="40" font-family="Nunito" font-size="9" fill="#64748B">Ci → Cs ahead of warm front</text>`,
        title:'Stage 3 — Low Intensifies',
        text:'The low deepens significantly. Cold front (SW) pushes fast, triggering a squall line of CBs. Warm front (NE) advances slowly, bringing widespread stratiform precipitation 500+ miles ahead. Between the fronts: the warm sector (mT air) where conditions may be VFR but humid. This is when most organized weather hazards are present: cold-front convection to the SW, warm-front IFR to the NE.'
      },
      {
        svg: `<rect width="380" height="240" fill="#F0F9FF"/>
          <text x="190" y="22" text-anchor="middle" font-family="Nunito" font-size="10" fill="#1E3A5F" font-weight="800">STAGE 4 — MATURE LOW + OCCLUSION</text>
          <text x="190" y="35" text-anchor="middle" font-family="Nunito" font-size="9" fill="#DC2626" font-weight="700">⚠️ Peak intensity — ALL hazards simultaneously present</text>
          <circle cx="155" cy="110" r="22" fill="rgba(99,102,241,0.22)" stroke="#4F46E5" stroke-width="3"/>
          <text x="155" y="116" text-anchor="middle" font-family="Nunito" font-size="17" fill="#4F46E5" font-weight="900">L</text>
          <ellipse cx="155" cy="110" rx="45" ry="35" fill="none" stroke="#818CF8" stroke-width="1.5" stroke-dasharray="5,3"/>
          <ellipse cx="155" cy="110" rx="85" ry="65" fill="none" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="5,3" opacity="0.5"/>
          <path d="M 155,110 L 70,48" stroke="#7C3AED" stroke-width="3.5" fill="none"/>
          <polygon points="98,76 91,62 105,62" fill="#7C3AED"/>
          <circle cx="84" cy="62" r="7" fill="#7C3AED"/>
          <text x="48" y="35" font-family="Nunito" font-size="9" fill="#7C3AED" font-weight="800">OCCLUDED</text>
          <text x="48" y="46" font-family="Space Mono" font-size="7" fill="#7C3AED">ICE + TS possible</text>
          <path d="M 155,110 L 65,195" stroke="#2563EB" stroke-width="3.5" fill="none"/>
          <polygon points="104,148 98,136 110,136" fill="#2563EB"/>
          <polygon points="78,173 72,161 84,161" fill="#2563EB"/>
          <ellipse cx="78" cy="185" rx="20" ry="12" fill="rgba(37,99,235,0.2)"/>
          <text x="30" y="210" font-family="Space Mono" font-size="7" fill="#1D4ED8">SQUALL LINE</text>
          <text x="30" y="220" font-family="Space Mono" font-size="7" fill="#1D4ED8">THUNDERSTORMS</text>
          <path d="M 155,110 L 310,175" stroke="#DC2626" stroke-width="3" fill="none"/>
          <circle cx="200" cy="126" r="7" fill="#DC2626"/>
          <circle cx="245" cy="145" r="7" fill="#DC2626"/>
          <circle cx="288" cy="163" r="7" fill="#DC2626"/>
          <ellipse cx="330" cy="100" rx="45" ry="60" fill="rgba(147,197,253,0.2)" stroke="#93C5FD" stroke-width="1"/>
          <text x="340" y="60" text-anchor="middle" font-family="Space Mono" font-size="7" fill="#1D4ED8">IFR · FOG</text>
          <text x="340" y="70" text-anchor="middle" font-family="Space Mono" font-size="7" fill="#1D4ED8">LOW CEILINGS</text>
          <text x="340" y="25" font-family="Nunito" font-size="11" fill="#64748B">N↑</text>
          <text x="240" y="230" text-anchor="middle" font-family="Nunito" font-size="9" fill="#DC2626" font-weight="700">SW:TS/LLWS · NE:IFR/FOG · NW:OCCLUDED</text>`,
        title:'Stage 4 — Mature Low with Occlusion',
        text:'Peak intensity. The fast-moving cold front has caught the warm front, creating an OCCLUDED FRONT (purple) — the cold air undercuts both fronts lifting warm air completely aloft. SIMULTANEOUS hazards: cold front thunderstorms/squall lines to the SW, warm front fog/IFR to the NE, and occluded front icing/embedded CBs to the NW near the low. No single safe position around a mature low.'
      },
      {
        svg: `<rect width="380" height="240" fill="#F0F9FF"/>
          <text x="190" y="22" text-anchor="middle" font-family="Nunito" font-size="10" fill="#1E3A5F" font-weight="800">STAGE 5 — OCCLUSION COMPLETE · DISSIPATION</text>
          <text x="190" y="35" text-anchor="middle" font-family="Nunito" font-size="9" fill="#10B981" font-weight="700">Warm sector cut off · Energy source gone · System weakening</text>
          <circle cx="190" cy="118" r="18" fill="rgba(148,163,184,0.2)" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5,3"/>
          <text x="190" y="124" text-anchor="middle" font-family="Nunito" font-size="14" fill="#94A3B8" font-weight="900">L</text>
          <text x="190" y="105" text-anchor="middle" font-family="Nunito" font-size="8" fill="#94A3B8">FILLING</text>
          <path d="M 190,118 L 60,60" stroke="#7C3AED" stroke-width="2.5" stroke-dasharray="6,4" fill="none"/>
          <polygon points="106,86 100,73 113,73" fill="#7C3AED" opacity="0.5"/>
          <circle cx="83" cy="73" r="6" fill="#7C3AED" opacity="0.5"/>
          <path d="M 190,118 L 120,185" stroke="#7C3AED" stroke-width="2" stroke-dasharray="6,4" fill="none" opacity="0.6"/>
          <text x="55" y="165" font-size="20" text-anchor="middle">☀️</text>
          <text x="290" y="75" font-size="20" text-anchor="middle">☀️</text>
          <text x="320" y="155" font-size="20" text-anchor="middle">☀️</text>
          <text x="250" y="195" font-size="20" text-anchor="middle">☀️</text>
          <text x="80" y="210" font-size="20" text-anchor="middle">☀️</text>
          <text x="310" y="110" font-family="Space Mono" font-size="14" fill="#10B981" font-weight="700">H</text>
          <ellipse cx="315" cy="115" rx="40" ry="30" fill="rgba(16,185,129,0.08)" stroke="#6EE7B7" stroke-width="1.5" stroke-dasharray="4,3"/>
          <text x="315" y="148" text-anchor="middle" font-family="Space Mono" font-size="8" fill="#059669">CANADIAN HIGH</text>
          <rect x="85" y="155" width="225" height="62" rx="12" fill="rgba(16,185,129,0.08)" stroke="#6EE7B7" stroke-width="1.5"/>
          <text x="197" y="172" text-anchor="middle" font-family="Nunito" font-size="10" fill="#059669" font-weight="800">✅ POST-FRONTAL CONDITIONS</text>
          <text x="197" y="185" text-anchor="middle" font-family="Space Mono" font-size="8" fill="#064E3B">Excellent VFR · Cool &amp; dry cP air</text>
          <text x="197" y="197" text-anchor="middle" font-family="Space Mono" font-size="8" fill="#064E3B">Gusty NW winds · Rising pressure</text>
          <text x="197" y="209" text-anchor="middle" font-family="Space Mono" font-size="8" fill="#064E3B">Great flying ahead!</text>`,
        title:'Stage 5 — Occlusion Complete, System Dissipates',
        text:'The occlusion cuts off the warm, moist mT air that fueled the low. Without its energy source, the low fills and dissipates. Fronts become weak and indistinct. A Canadian High (cP air) builds in behind the system: excellent VFR, cool and dry air, good visibility, gusty NW winds, rising pressure. Classic post-frontal conditions — ideal flying weather.'
      }
    ];
    const s = stages[n];
    svg.innerHTML = s.svg;
    desc.innerHTML = `<strong style="color:#38BDF8;display:block;margin-bottom:4px">${s.title}</strong>${s.text}`;
  },

  // ===== NEW: ALTIMETER ERROR VISUALIZER =====
  altimeterErrorSVG() {
    return `<div style="padding:20px;background:#F8FAFC">
      <p style="font-family:var(--font-display);font-size:14px;color:#64748B;margin:0 0 16px">Choose a scenario to see how altimeter errors develop:</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
        ${[
          ['High → Low Pressure','Flying into lower-than-set pressure. Your altimeter OVER-reads.','#FFE4E6','#EF4444','alt-hl'],
          ['Low → High Pressure','Flying into higher-than-set pressure. Your altimeter UNDER-reads.','#D1FAE5','#10B981','alt-lh'],
          ['Hot → Cold Temperature','Colder air is denser. True altitude LOWER than indicated.','#EEF2FF','#6366F1','alt-hc'],
          ['Set Correct QNH','Altimeter set to current local pressure. Accurate readout.','#FEF3C7','#F59E0B','alt-ok'],
        ].map(([title,desc,bg,col,id])=>`
        <button onclick="Diagrams.showAltError('${id}')" style="background:${bg};border:2px solid ${col};border-radius:14px;padding:12px;text-align:left;cursor:pointer">
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:${col};margin-bottom:4px">${title}</div>
          <div style="font-size:11px;color:#64748B;line-height:1.4">${desc}</div>
        </button>`).join('')}
      </div>
      <div id="alt-display" style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <div style="padding:20px;text-align:center;color:#94A3B8;font-family:var(--font-display);font-weight:700">Select a scenario above</div>
      </div>
    </div>`;
  },

  showAltError(scenario) {
    const scenarios = {
      'alt-hl': { color:'#EF4444', icon:'⬇️', title:'High → Low Pressure', indicated:5000, actual:4400, diff:-600, rule:'"From HIGH to LOW — LOOK OUT BELOW!"', detail:'Flying from high to low pressure without updating altimeter setting causes over-reading. Indicated: 5,000 ft. Actual: ~4,400 ft. You are 600 ft LOWER than you think. Terrain clearance hazard!', status:'DANGER — You are lower than indicated' },
      'alt-lh': { color:'#10B981', icon:'⬆️', title:'Low → High Pressure', indicated:5000, actual:5500, diff:+500, rule:'Flying into higher pressure — altimeter under-reads.', detail:'Flying from low to high pressure without updating altimeter setting causes under-reading. Indicated: 5,000 ft. Actual: ~5,500 ft. You are higher than you think — less critical, but still inaccurate.', status:'CAUTION — You are higher than indicated' },
      'alt-hc': { color:'#6366F1', icon:'🌡️', title:'Hot → Cold Temperature', indicated:5000, actual:4650, diff:-350, rule:'"From HOT to COLD — LOOK OUT BELOW!"', detail:'In colder-than-standard air, the atmosphere is denser and compressed. The actual altitude corresponding to a given pressure is LOWER than the standard atmosphere assumes. Critical for obstacle clearance on cold winter approaches!', status:'DANGER — True altitude is lower than indicated' },
      'alt-ok': { color:'#F59E0B', icon:'✅', title:'Correct QNH Set', indicated:5000, actual:5000, diff:0, rule:'Altimeter set to current local pressure = accurate.', detail:'When you set the current local altimeter setting (QNH) in the Kollsman window, your indicated altitude accurately reflects your true altitude above Mean Sea Level (MSL). Always update when crossing from one ATC facility\'s airspace to another.', status:'ACCURATE — Indicated = Actual altitude' },
    };
    const s = scenarios[scenario];
    document.getElementById('alt-display').innerHTML = `
      <div style="background:${s.color};padding:12px 16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:20px">${s.icon}</span>
        <div>
          <div style="font-family:var(--font-display);font-weight:900;font-size:15px;color:white">${s.title}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.85)">${s.status}</div>
        </div>
      </div>
      <div style="padding:16px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
          ${[['Indicated Altitude', s.indicated.toLocaleString() + ' ft', '#64748B'],['Actual True Altitude', s.actual.toLocaleString() + ' ft', s.color],['Difference', (s.diff > 0 ? '+':'')+s.diff + ' ft', s.diff < 0 ? '#EF4444' : s.diff === 0 ? '#10B981' : '#F59E0B']].map(([lbl,val,col])=>`
          <div style="background:#F8FAFC;border-radius:10px;padding:10px;text-align:center">
            <div style="font-size:11px;color:#94A3B8;font-weight:700;font-family:var(--font-display)">${lbl}</div>
            <div style="font-size:18px;font-weight:900;font-family:var(--font-mono);color:${col}">${val}</div>
          </div>`).join('')}
        </div>
        <div style="background:#FEF3C7;border-radius:12px;padding:12px;margin-bottom:10px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:#92400E">${s.rule}</div>
        </div>
        <div style="font-size:13px;color:#475569;line-height:1.6">${s.detail}</div>
      </div>`;
  },

  // ===== NEW: LAPSE RATE INTERACTIVE GRAPH =====
  lapseRateGraph() {
    return `<div style="padding:16px;background:#F8FAFC">
      <p style="font-family:var(--font-display);font-size:13px;color:#64748B;margin:0 0 12px;font-weight:700">DRAG the ELR slider to see stability change. Watch where ELR crosses the DALR and MALR lines.</p>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
        <label style="font-family:var(--font-display);font-size:13px;font-weight:800;color:#334155;white-space:nowrap">ELR:</label>
        <input type="range" id="elr-slider" min="0.5" max="4.5" step="0.1" value="2.0" style="flex:1;accent-color:#6366F1" oninput="Diagrams.updateLapseGraph()">
        <span id="elr-val" style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:#6366F1;white-space:nowrap">2.0°C/1,000 ft</span>
      </div>
      <svg id="lapse-svg" viewBox="0 0 340 220" style="width:100%;display:block;background:white;border-radius:12px;border:1px solid #E2E8F0">
        <!-- Grid & axes drawn by JS -->
      </svg>
      <div id="lapse-status" style="margin-top:10px;padding:12px 14px;border-radius:12px;font-family:var(--font-display);font-size:14px;font-weight:800;text-align:center;background:#EEF2FF;color:#6366F1">
        ELR = 2.0°C/1,000 ft → Conditionally Unstable
      </div>
    </div>`;
  },

  updateLapseGraph() {
    const elr = parseFloat(document.getElementById('elr-slider').value);
    document.getElementById('elr-val').textContent = elr.toFixed(1) + '°C/1,000 ft';
    const svg = document.getElementById('lapse-svg');
    const W=340, H=220, ml=50, mr=20, mt=20, mb=30;
    const pw=W-ml-mr, ph=H-mt-mb;
    // x = temp (10°C at left = sea level, decreasing right), y = altitude
    // We'll plot: altitude 0-12000 ft on Y, temp on X
    // At sea level: ISA = 15°C. DALR line: starts 15, decreases 3°C/1000ft
    // MALR: starts 15, decreases 1.5°C/1000ft. ELR: starts 15, decreases elr/1000ft
    const maxAlt = 12000;
    const altScale = ph/maxAlt;
    const tempMin = -15, tempMax = 20;
    const tempScale = pw/(tempMax-tempMin);
    const tx = t => ml + (t-tempMin)*tempScale;
    const ty = a => H-mb - a*altScale;
    const altLabels = [0,3000,6000,9000,12000];
    const tempLabels = [-10,0,10,20];
    let out = `<defs><clipPath id="lapse-clip"><rect x="${ml}" y="${mt}" width="${pw}" height="${ph}"/></clipPath></defs>`;
    // Grid
    altLabels.forEach(a=>{out+=`<line x1="${ml}" y1="${ty(a)}" x2="${W-mr}" y2="${ty(a)}" stroke="#F1F5F9" stroke-width="1"/><text x="${ml-4}" y="${ty(a)+4}" text-anchor="end" font-family="Space Mono" font-size="9" fill="#94A3B8">${a/1000}k</text>`;});
    tempLabels.forEach(t=>{out+=`<line x1="${tx(t)}" y1="${mt}" x2="${tx(t)}" y2="${H-mb}" stroke="#F1F5F9" stroke-width="1"/><text x="${tx(t)}" y="${H-mb+14}" text-anchor="middle" font-family="Space Mono" font-size="9" fill="#94A3B8">${t}°</text>`;});
    // Axes
    out+=`<line x1="${ml}" y1="${mt}" x2="${ml}" y2="${H-mb}" stroke="#E2E8F0" stroke-width="1.5"/><line x1="${ml}" y1="${H-mb}" x2="${W-mr}" y2="${H-mb}" stroke="#E2E8F0" stroke-width="1.5"/>`;
    out+=`<text x="${ml-28}" y="${mt+ph/2}" text-anchor="middle" font-family="Nunito" font-size="10" fill="#94A3B8" transform="rotate(-90,${ml-28},${mt+ph/2})">Altitude (ft)</text>`;
    out+=`<text x="${ml+pw/2}" y="${H}" text-anchor="middle" font-family="Nunito" font-size="10" fill="#94A3B8">Temperature (°C)</text>`;
    // Reference lines
    const lineData = (lapse, startT=15) => {
      const pts = [0,maxAlt].map(a=>`${tx(startT-lapse*(a/1000))},${ty(a)}`);
      return pts.join(' ');
    };
    // DALR (orange, 3°C)
    out+=`<polyline points="${lineData(3)}" stroke="#F59E0B" stroke-width="2" fill="none" stroke-dasharray="5,3" clip-path="url(#lapse-clip)"/>`;
    out+=`<text x="${tx(15-3*(maxAlt/1000))+4}" y="${ty(maxAlt)}" font-family="Nunito" font-size="9" fill="#F59E0B" font-weight="700">DALR 3°</text>`;
    // MALR (green, 1.5°C)
    out+=`<polyline points="${lineData(1.5)}" stroke="#10B981" stroke-width="2" fill="none" stroke-dasharray="5,3" clip-path="url(#lapse-clip)"/>`;
    out+=`<text x="${tx(15-1.5*(maxAlt/1000))+4}" y="${ty(maxAlt)}" font-family="Nunito" font-size="9" fill="#10B981" font-weight="700">MALR 1.5°</text>`;
    // ELR (blue, variable)
    out+=`<polyline points="${lineData(elr)}" stroke="#6366F1" stroke-width="3" fill="none" clip-path="url(#lapse-clip)"/>`;
    out+=`<circle cx="${tx(15)}" cy="${ty(0)}" r="5" fill="#6366F1"/>`;
    out+=`<text x="${tx(15-elr*(maxAlt/1000))+4}" y="${ty(maxAlt)-4}" font-family="Nunito" font-size="10" fill="#6366F1" font-weight="900">ELR ${elr.toFixed(1)}°</text>`;
    // Labels
    out+=`<text x="${ml+8}" y="${mt+12}" font-family="Nunito" font-size="10" fill="#64748B">Altitude ↑</text>`;
    svg.innerHTML = out;
    // Status
    const statusEl = document.getElementById('lapse-status');
    let status, bg, color;
    if (elr > 3) { status=`ELR ${elr.toFixed(1)}°/1,000 ft > DALR (3°) → 🔴 ABSOLUTELY UNSTABLE`; bg='#FFE4E6'; color='#EF4444'; }
    else if (elr > 1.5) { status=`ELR ${elr.toFixed(1)}°/1,000 ft between MALR & DALR → 🟡 CONDITIONALLY UNSTABLE`; bg='#FEF3C7'; color='#D97706'; }
    else { status=`ELR ${elr.toFixed(1)}°/1,000 ft < MALR (1.5°) → 🟢 ABSOLUTELY STABLE`; bg='#D1FAE5'; color='#065F46'; }
    statusEl.textContent = status; statusEl.style.background = bg; statusEl.style.color = color;
  },

  // M3 §s3_3 — bespoke interactive Jet Streams module that replaced the
  // FAA Fig 9-5 still image. Globe view with two ribbon-jets, season
  // toggle (winter/summer), tap-to-reveal info cards on each jet, CAT
  // zone overlay. Subtropical speed envelope: winter 80-150 kt /
  // summer 50-100 kt — anchored within the FAA-H-8083-28B 50-150 kt
  // range. Init logic in _initJetStreamsModule.
  jetStreamSVG() {
    return this.renderJetStreamsModule();
  },

  renderJetStreamsModule() {
    return `
<div class="jet-module" id="jetModule" role="region" aria-label="Polar and subtropical jet streams teaching figure">
  <div class="jet-module__header">
    <h2 class="jet-module__title">Polar &amp; Subtropical Jet Streams</h2>
  </div>
  <div class="jet-module__attr">FAA-H-8083-28B · Fig 9-5 — Polar &amp; Subtropical Jet Streams</div>

  <div class="jet-module__figure">
    <div class="jet-legend-keys" aria-hidden="true">
      <div class="jet-legend-keys__item">
        <span class="jet-legend-keys__swatch jet-legend-keys__swatch--polar"></span>
        <span class="jet-legend-keys__label--polar">Polar Jet</span>
      </div>
      <div class="jet-legend-keys__item">
        <span class="jet-legend-keys__swatch jet-legend-keys__swatch--sub"></span>
        <span class="jet-legend-keys__label--sub">Subtropical Jet</span>
      </div>
    </div>

    <svg id="jetGlobeSvg" viewBox="0 0 600 460" preserveAspectRatio="xMidYMid meet" aria-label="Globe with two jet streams encircling Earth">
      <defs>
        <radialGradient id="jetGlobeShade" cx="35%" cy="32%" r="75%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55" />
          <stop offset="60%" stop-color="#FFFFFF" stop-opacity="0" />
          <stop offset="100%" stop-color="#0C1B33" stop-opacity="0.18" />
        </radialGradient>
        <linearGradient id="jetPolarGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#1E40AF" />
          <stop offset="100%" stop-color="#38BDF8" />
        </linearGradient>
        <linearGradient id="jetSubGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#B91C1C" />
          <stop offset="100%" stop-color="#F59E0B" />
        </linearGradient>
        <clipPath id="jetGlobeClip">
          <circle cx="300" cy="230" r="180" />
        </clipPath>
      </defs>

      <g clip-path="url(#jetGlobeClip)">
        <circle cx="300" cy="230" r="180" class="ocean" />
        <g class="land">
          <path d="M 188 120 L 210 100 L 240 92 L 282 92 L 318 102 L 344 118 L 352 145 L 350 175 L 340 200 L 322 218 L 322 234 L 308 232 L 295 226 L 280 230 L 268 240 L 258 254 L 248 244 L 232 232 L 212 218 L 195 200 L 184 178 L 180 152 Z" />
          <path d="M 358 90 C 376 86 390 100 386 120 C 380 138 364 138 354 128 C 348 118 350 100 358 90 Z" />
          <path d="M 268 264 L 286 268 L 304 280 L 316 300 L 320 322 L 314 348 L 302 372 L 288 384 L 278 380 L 268 364 L 260 342 L 254 318 L 252 294 L 256 274 Z" />
        </g>
        <g class="latitude">
          <ellipse cx="300" cy="230" rx="178" ry="22" />
          <ellipse cx="300" cy="230" rx="178" ry="55" />
          <ellipse cx="300" cy="230" rx="178" ry="92" />
          <ellipse cx="300" cy="230" rx="178" ry="130" />
          <ellipse cx="300" cy="230" rx="178" ry="165" />
        </g>
        <line class="equator" x1="122" y1="230" x2="478" y2="230" />
        <circle cx="300" cy="230" r="180" fill="url(#jetGlobeShade)" />
      </g>
      <circle cx="300" cy="230" r="180" class="globe-edge" />

      <g id="jetCatGroup" clip-path="url(#jetGlobeClip)">
        <path id="jetCatPolarN" class="cat-zone" />
        <path id="jetCatPolarS" class="cat-zone" />
        <path id="jetCatSubN" class="cat-zone" />
        <path id="jetCatSubS" class="cat-zone" />
      </g>

      <g clip-path="url(#jetGlobeClip)">
        <path id="jetPolarGlow" class="jet-glow" stroke="url(#jetPolarGrad)" stroke-width="22" />
        <path id="jetSubGlow" class="jet-glow" stroke="url(#jetSubGrad)" stroke-width="20" />
        <path id="jetPolarBack" class="jet-ribbon" stroke="url(#jetPolarGrad)" stroke-width="9" opacity="0.28" stroke-dasharray="3 6" />
        <path id="jetSubBack" class="jet-ribbon" stroke="url(#jetSubGrad)" stroke-width="8" opacity="0.28" stroke-dasharray="3 6" />
        <path id="jetPolarFront" class="jet-ribbon" stroke="url(#jetPolarGrad)" stroke-width="13" data-jet="polar" />
        <path id="jetSubFront" class="jet-ribbon" stroke="url(#jetSubGrad)" stroke-width="11" data-jet="sub" />
        <g id="jetPolarArrows"></g>
        <g id="jetSubArrows"></g>
      </g>

      <path id="jetPolarHit" class="jet-hit" data-jet="polar" />
      <path id="jetSubHit" class="jet-hit" data-jet="sub" />

      <g id="jetSeasonBadge" transform="translate(488 30)">
        <rect x="-58" y="-18" width="116" height="28" rx="14" fill="#0C1B33" opacity="0.86" />
        <text x="0" y="1" text-anchor="middle" font-weight="900" font-size="11" letter-spacing="0.06em" fill="#F8FAFC">
          <tspan id="jetSeasonBadgeText">WINTER · N. HEM.</tspan>
        </text>
      </g>
    </svg>
  </div>

  <div class="jet-module__caption" aria-live="polite">
    <span class="jet-caption__lead" id="jetCapLead">Tap a jet to learn more</span>
    <span class="jet-caption__text" id="jetCapText">Two ribbon-like wind currents wrap Earth in the upper troposphere. Their position shifts with the seasons.</span>
  </div>

  <div class="jet-controls">
    <div class="jet-controls__row">
      <div class="jet-toggle-group" role="radiogroup" aria-label="Season">
        <button class="jet-toggle-btn" id="jetSeasonWinter" aria-pressed="true" role="radio">
          <svg class="jet-toggle-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1 V15 M1 8 H15 M3 3 L13 13 M13 3 L3 13" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/>
          </svg>Winter
        </button>
        <button class="jet-toggle-btn" id="jetSeasonSummer" aria-pressed="false" role="radio">
          <svg class="jet-toggle-icon" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="3" fill="currentColor"/>
            <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M8 1 V3 M8 13 V15 M1 8 H3 M13 8 H15 M3 3 L4.5 4.5 M11.5 11.5 L13 13 M3 13 L4.5 11.5 M11.5 4.5 L13 3"/>
            </g>
          </svg>Summer
        </button>
      </div>
      <button class="jet-toggle-btn jet-toggle-btn--cat" id="jetCatToggle" aria-pressed="false">
        <svg class="jet-toggle-icon" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 1 L15 14 L1 14 Z" fill="currentColor" opacity="0.85"/>
          <path d="M8 6 V10 M8 12 V12.5" stroke="#0C1B33" stroke-width="1.6" stroke-linecap="round"/>
        </svg>CAT zones
      </button>
    </div>
    <div class="jet-info-card" id="jetInfoCard" data-open="false" aria-live="polite">
      <div class="jet-info-card__head">
        <span class="jet-info-card__chip" id="jetInfoChip"></span>
        <h2 class="jet-info-card__title" id="jetInfoTitle">Polar Jet</h2>
        <button class="jet-info-card__close" id="jetInfoClose" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="jet-info-card__body" id="jetInfoBody">…</div>
      <div class="jet-info-card__stats" id="jetInfoStats"></div>
    </div>
    <div class="jet-hint" id="jetHint">Tap either jet on the globe to reveal its stats.</div>
  </div>
</div>`;
  },

  _initJetStreamsModule() {
    const root = document.getElementById('jetModule');
    if (!root || root.dataset.jetInit === 'done') return;
    root.dataset.jetInit = 'done';

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const CX = 300, CY = 230, R = 180;

    function buildJet(latOffset, amplitude, segments, phase) {
      const meanY = CY + latOffset;
      const xMin = CX - R - 20;
      const xMax = CX + R + 20;
      const wave = (x) => meanY + Math.sin((x - xMin) / (xMax - xMin) * Math.PI * segments + phase) * amplitude;
      const N = 40;
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const x = xMin + (xMax - xMin) * t;
        pts.push([x, wave(x)]);
      }
      let d = `M ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0]} ${pts[i][1]}`;
      return d;
    }
    function buildCatBand(latOffset, amplitude, segments, phase, bandWidth) {
      const meanY = CY + latOffset;
      const xMin = CX - R - 20;
      const xMax = CX + R + 20;
      const wave = (x, off) => meanY + off + Math.sin((x - xMin) / (xMax - xMin) * Math.PI * segments + phase) * amplitude;
      const N = 50;
      const top = [], bot = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const x = xMin + (xMax - xMin) * t;
        top.push([x, wave(x, -bandWidth)]);
        bot.push([x, wave(x, bandWidth)]);
      }
      let d = `M ${top[0][0]} ${top[0][1]}`;
      for (let i = 1; i < top.length; i++) d += ` L ${top[i][0]} ${top[i][1]}`;
      for (let i = bot.length - 1; i >= 0; i--) d += ` L ${bot[i][0]} ${bot[i][1]}`;
      d += ' Z';
      return d;
    }
    function pointOn(latOffset, amplitude, segments, phase, frac) {
      const meanY = CY + latOffset;
      const xMin = CX - R - 20;
      const xMax = CX + R + 20;
      const x = xMin + (xMax - xMin) * frac;
      const k = Math.PI * segments / (xMax - xMin);
      const y = meanY + Math.sin((x - xMin) * k + phase) * amplitude;
      const dy = Math.cos((x - xMin) * k + phase) * amplitude * k;
      const ang = Math.atan2(dy, 1) * 180 / Math.PI;
      return { x, y, angle: ang };
    }

    // Speed envelopes per the user's adjustment: subtropical anchored
    // within FAA-H-8083-28B 50–150 kt range — winter 80-150, summer 50-100.
    // Polar unchanged from the design (60-200 winter, 60-120 summer).
    const seasons = {
      winter: {
        polar:  { latOffset: -42, amplitude: 22, segments: 4, phase: 0.3, width: 14 },
        sub:    { latOffset: 12,  amplitude: 14, segments: 5, phase: 1.1, width: 10 },
        polarSpeed: '60–200 kt (peaks 250+)',
        subSpeed:   '80–150 kt'
      },
      summer: {
        polar:  { latOffset: -78, amplitude: 16, segments: 4, phase: 0.3, width: 12 },
        sub:    { latOffset: -18, amplitude: 10, segments: 5, phase: 1.1, width: 7 },
        polarSpeed: '60–120 kt',
        subSpeed:   '50–100 kt'
      }
    };

    let currentSeason = 'winter';
    let activeJet = null;
    let catOn = false;

    const polarFront = root.querySelector('#jetPolarFront');
    const polarBack  = root.querySelector('#jetPolarBack');
    const polarGlow  = root.querySelector('#jetPolarGlow');
    const polarHit   = root.querySelector('#jetPolarHit');
    const polarArrows = root.querySelector('#jetPolarArrows');
    const subFront = root.querySelector('#jetSubFront');
    const subBack  = root.querySelector('#jetSubBack');
    const subGlow  = root.querySelector('#jetSubGlow');
    const subHit   = root.querySelector('#jetSubHit');
    const subArrows = root.querySelector('#jetSubArrows');
    const catPolarN = root.querySelector('#jetCatPolarN');
    const catPolarS = root.querySelector('#jetCatPolarS');
    const catSubN = root.querySelector('#jetCatSubN');
    const catSubS = root.querySelector('#jetCatSubS');
    const seasonBadgeText = root.querySelector('#jetSeasonBadgeText');
    const seasonWinter = root.querySelector('#jetSeasonWinter');
    const seasonSummer = root.querySelector('#jetSeasonSummer');
    const catToggle = root.querySelector('#jetCatToggle');
    const infoCard = root.querySelector('#jetInfoCard');
    const infoChip = root.querySelector('#jetInfoChip');
    const infoTitle = root.querySelector('#jetInfoTitle');
    const infoBody = root.querySelector('#jetInfoBody');
    const infoStats = root.querySelector('#jetInfoStats');
    const infoClose = root.querySelector('#jetInfoClose');
    const hint = root.querySelector('#jetHint');
    const capLead = root.querySelector('#jetCapLead');
    const capText = root.querySelector('#jetCapText');

    function renderSeason(s) {
      const cfg = seasons[s];
      const polarPath = buildJet(cfg.polar.latOffset, cfg.polar.amplitude, cfg.polar.segments, cfg.polar.phase);
      const subPath   = buildJet(cfg.sub.latOffset,   cfg.sub.amplitude,   cfg.sub.segments,   cfg.sub.phase);
      polarFront.setAttribute('d', polarPath);
      polarBack.setAttribute('d', polarPath);
      polarGlow.setAttribute('d', polarPath);
      polarHit.setAttribute('d', polarPath);
      polarFront.setAttribute('stroke-width', cfg.polar.width);
      subFront.setAttribute('d', subPath);
      subBack.setAttribute('d', subPath);
      subGlow.setAttribute('d', subPath);
      subHit.setAttribute('d', subPath);
      subFront.setAttribute('stroke-width', cfg.sub.width);
      catPolarN.setAttribute('d', buildCatBand(cfg.polar.latOffset - 14, cfg.polar.amplitude, cfg.polar.segments, cfg.polar.phase, 8));
      catPolarS.setAttribute('d', buildCatBand(cfg.polar.latOffset + 14, cfg.polar.amplitude, cfg.polar.segments, cfg.polar.phase, 8));
      catSubN.setAttribute('d', buildCatBand(cfg.sub.latOffset - 12, cfg.sub.amplitude, cfg.sub.segments, cfg.sub.phase, 7));
      catSubS.setAttribute('d', buildCatBand(cfg.sub.latOffset + 12, cfg.sub.amplitude, cfg.sub.segments, cfg.sub.phase, 7));
      // Three arrows along each visible jet
      [0.28, 0.55, 0.82].forEach((frac, idx) => {
        const polarPt = pointOn(cfg.polar.latOffset, cfg.polar.amplitude, cfg.polar.segments, cfg.polar.phase, frac);
        const subPt   = pointOn(cfg.sub.latOffset,   cfg.sub.amplitude,   cfg.sub.segments,   cfg.sub.phase,   frac);
        let pa = polarArrows.children[idx];
        if (!pa) {
          pa = document.createElementNS(SVG_NS, 'g');
          const tri = document.createElementNS(SVG_NS, 'polygon');
          tri.setAttribute('points', '-6,-5 7,0 -6,5');
          tri.setAttribute('fill', '#FFFFFF');
          tri.setAttribute('stroke', '#0C1B33');
          tri.setAttribute('stroke-width', '0.7');
          pa.appendChild(tri);
          polarArrows.appendChild(pa);
        }
        pa.setAttribute('transform', `translate(${polarPt.x} ${polarPt.y}) rotate(${polarPt.angle})`);
        let sa = subArrows.children[idx];
        if (!sa) {
          sa = document.createElementNS(SVG_NS, 'g');
          const tri = document.createElementNS(SVG_NS, 'polygon');
          tri.setAttribute('points', '-6,-5 7,0 -6,5');
          tri.setAttribute('fill', '#FFFFFF');
          tri.setAttribute('stroke', '#0C1B33');
          tri.setAttribute('stroke-width', '0.7');
          sa.appendChild(tri);
          subArrows.appendChild(sa);
        }
        sa.setAttribute('transform', `translate(${subPt.x} ${subPt.y}) rotate(${subPt.angle})`);
      });
      seasonBadgeText.textContent = (s === 'winter' ? 'WINTER · N. HEM.' : 'SUMMER · N. HEM.');
    }

    function showInfo(jet) {
      activeJet = jet;
      polarFront.setAttribute('data-active', jet === 'polar' ? 'true' : 'false');
      subFront.setAttribute('data-active', jet === 'sub' ? 'true' : 'false');
      if (jet === 'polar') {
        infoChip.className = 'jet-info-card__chip jet-info-card__chip--polar';
        infoTitle.textContent = 'Polar Jet';
        infoBody.textContent = 'Forms along the polar front where cold polar air meets warmer mid-latitude air. Strongest in winter when the temperature contrast is greatest. Often associated with major weather systems and turbulence.';
        infoStats.innerHTML = `
          <div class="jet-stat"><div class="jet-stat__label">Latitude</div><div class="jet-stat__val">30–60°N</div></div>
          <div class="jet-stat"><div class="jet-stat__label">Altitude</div><div class="jet-stat__val">35–40k ft</div></div>
          <div class="jet-stat"><div class="jet-stat__label">Speed</div><div class="jet-stat__val">${seasons[currentSeason].polarSpeed}</div></div>`;
        capLead.textContent = 'Polar jet';
        capText.textContent = 'Cold polar air meets warmer mid-latitude air — driving the strongest jet, especially in winter.';
      } else if (jet === 'sub') {
        infoChip.className = 'jet-info-card__chip jet-info-card__chip--sub';
        infoTitle.textContent = 'Subtropical Jet';
        infoBody.textContent = 'Forms at the poleward edge of the Hadley cell, where rising tropical air diverges aloft. Most consistent in winter; weakens or fragments in summer. Generally more steady than the polar jet.';
        infoStats.innerHTML = `
          <div class="jet-stat"><div class="jet-stat__label">Latitude</div><div class="jet-stat__val">20–30°N</div></div>
          <div class="jet-stat"><div class="jet-stat__label">Altitude</div><div class="jet-stat__val">~40k ft</div></div>
          <div class="jet-stat"><div class="jet-stat__label">Speed</div><div class="jet-stat__val">${seasons[currentSeason].subSpeed}</div></div>`;
        capLead.textContent = 'Subtropical jet';
        capText.textContent = 'Sits at the poleward edge of the Hadley cell — usually steadier and weaker than the polar jet.';
      } else if (jet === 'cat') {
        infoChip.className = 'jet-info-card__chip jet-info-card__chip--cat';
        infoTitle.textContent = 'Clear Air Turbulence Zones';
        infoBody.textContent = 'CAT is most likely on the north and south flanks of each jet, where wind shear is strongest. It is invisible — no clouds, no precip cues — and can range from light to severe. Plan altitudes that avoid jet edges when possible.';
        infoStats.innerHTML = `
          <div class="jet-stat"><div class="jet-stat__label">Where</div><div class="jet-stat__val">Jet flanks</div></div>
          <div class="jet-stat"><div class="jet-stat__label">Cause</div><div class="jet-stat__val">Wind shear</div></div>
          <div class="jet-stat"><div class="jet-stat__label">Cue</div><div class="jet-stat__val">None visible</div></div>`;
        capLead.textContent = 'Clear Air Turbulence';
        capText.textContent = 'Shaded bands flank each jet — the wind-shear regions where CAT is most likely.';
      }
      infoCard.setAttribute('data-open', 'true');
      hint.style.opacity = '0';
    }

    function hideInfo() {
      activeJet = null;
      infoCard.setAttribute('data-open', 'false');
      polarFront.removeAttribute('data-active');
      subFront.removeAttribute('data-active');
      hint.style.opacity = '1';
      capLead.textContent = 'Tap a jet to learn more';
      capText.textContent = 'Two ribbon-like wind currents wrap Earth in the upper troposphere. Their position shifts with the seasons.';
    }

    function setSeason(s) {
      currentSeason = s;
      seasonWinter.setAttribute('aria-pressed', s === 'winter' ? 'true' : 'false');
      seasonSummer.setAttribute('aria-pressed', s === 'summer' ? 'true' : 'false');
      renderSeason(s);
      if (activeJet === 'polar' || activeJet === 'sub') showInfo(activeJet);
    }
    function setCat(on) {
      catOn = on;
      catToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      [catPolarN, catPolarS, catSubN, catSubS].forEach(n => n.setAttribute('data-on', on ? 'true' : 'false'));
      if (on) showInfo('cat');
      else if (activeJet === 'cat') hideInfo();
    }

    seasonWinter.addEventListener('click', () => setSeason('winter'));
    seasonSummer.addEventListener('click', () => setSeason('summer'));
    catToggle.addEventListener('click', () => setCat(!catOn));

    function bindJetTap(node, jet) {
      const handler = () => showInfo(jet);
      node.addEventListener('click', handler);
      node.addEventListener('touchend', (e) => { e.preventDefault(); handler(); });
    }
    bindJetTap(polarHit, 'polar');
    bindJetTap(polarFront, 'polar');
    bindJetTap(subHit, 'sub');
    bindJetTap(subFront, 'sub');
    infoClose.addEventListener('click', () => {
      if (activeJet === 'cat') setCat(false);
      else hideInfo();
    });

    renderSeason('winter');
  },

  // FAA-H-8083-28B Fig 25-5 — synoptic surface chart showing H/L pressure
  // systems, isobars at 4-mb intervals, troughs (dashed blue lines), and
  // drainage axes (dashed brown lines). Pass 2c relocated this from m3/s3_2
  // (where the call site predated the FAA swap and was conceptually
  // mismatched) to m19/s19_2 — 'Surface Analysis Charts — Reading the Map'
  // — the natural home for the figure.
  pressureSystemsSVG() {
    return this.renderFaaFigure({
      src: 'img/awh/awh_p0354_img_001.png',
      figureNumber: '25-5',
      title: 'Surface Chart Pressure Patterns',
      caption: 'Synoptic surface chart over the United States: H and L mark pressure-system centers, solid black lines are isobars (4-mb intervals labeled in millibars), dashed blue lines are troughs, and dashed brown lines are drainage axes.',
      alt: 'FAA-H-8083-28B Figure 25-5: schematic of surface chart pressure patterns showing high and low centers, isobars, troughs, and drainage axes over the continental United States.',
    });
  },

  // M3 §s3_2 — bespoke 3-panel interactive Surface Wind Forces module that
  // replaced the FAA Fig 10-10 still image. Toggle between "Above friction
  // layer" (single panel — geostrophic) and "Below friction layer" (all
  // three panels). Friction-strength slider drives the cross-isobar angle
  // 0°–45° in real time. Pressure values 1004 / 1008 / 1012 / 1016 hPa,
  // angle descriptions match FAA-H-8083-28B Ch. 10. Init logic in
  // _initSurfaceWindModule.
  surfaceWindForcesSVG() {
    return this.renderSurfaceWindModule();
  },

  renderSurfaceWindModule() {
    return `
<div class="sw-module" id="swModule" role="region" aria-label="Surface wind forces teaching figure">
  <div class="sw-module__header">
    <h2 class="sw-module__title">Surface Wind Forces</h2>
  </div>
  <div class="sw-module__attr">FAA-H-8083-28B · Fig 10-10 — Surface Wind Forces</div>

  <div class="sw-module__figure">
    <svg id="swFigure" viewBox="0 0 720 420" preserveAspectRatio="xMidYMid meet" aria-label="Three panels: no friction, net force, and resultant balanced wind">
      <defs>
        <radialGradient id="swParcelGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="60%" stop-color="#E0F2FE"/>
          <stop offset="100%" stop-color="#7DD3FC"/>
        </radialGradient>
      </defs>

      <text class="pressure-label" x="360" y="20" text-anchor="middle">LOW PRESSURE</text>
      <text class="pressure-label" x="360" y="408" text-anchor="middle">HIGH PRESSURE</text>

      <g id="swIsobars">
        <line class="iso-line" x1="50" y1="60" x2="700" y2="60"/>
        <text class="iso-label" x="22" y="64">1004</text>
        <line class="iso-line" x1="50" y1="160" x2="700" y2="160"/>
        <text class="iso-label" x="22" y="164">1008</text>
        <line class="iso-line" x1="50" y1="260" x2="700" y2="260"/>
        <text class="iso-label" x="22" y="264">1012</text>
        <line class="iso-line" x1="50" y1="360" x2="700" y2="360"/>
        <text class="iso-label" x="22" y="364">1016</text>
      </g>

      <line id="swDiv1" class="panel-divider" x1="270" y1="40" x2="270" y2="380"/>
      <line id="swDiv2" class="panel-divider" x1="490" y1="40" x2="490" y2="380"/>

      <g id="swPanel1" class="panel">
        <text class="panel-status" x="160" y="395" text-anchor="middle">NO FRICTION</text>
        <g id="swP1Arrows"></g>
      </g>
      <g id="swPanel2" class="panel">
        <text class="panel-status" x="380" y="395" text-anchor="middle">NET FORCE</text>
        <g id="swP2Arrows"></g>
      </g>
      <g id="swPanel3" class="panel">
        <rect class="right-panel-box" x="500" y="40" width="200" height="340" rx="2"/>
        <text class="panel-status" x="600" y="395" text-anchor="middle">NO NET FORCE</text>
        <g id="swP3Arrows"></g>
      </g>
    </svg>
  </div>

  <div class="sw-module__caption" aria-live="polite">
    <span class="sw-caption__lead" id="swCapLead">Below the friction layer · ~2,000 ft AGL</span>
    <span class="sw-caption__text" id="swCapText">Friction opposes wind direction. The resultant wind crosses isobars at an angle toward lower pressure.</span>
  </div>

  <div class="sw-controls">
    <div class="sw-toggle-group" role="radiogroup" aria-label="Layer">
      <button class="sw-toggle-btn" id="swLayerAbove" aria-pressed="false" role="radio">Above friction layer</button>
      <button class="sw-toggle-btn" id="swLayerBelow" aria-pressed="true" role="radio">Below friction layer</button>
    </div>
    <div class="sw-friction-row" id="swFrictionRow">
      <div class="sw-friction-row__head">
        <span>FRICTION STRENGTH</span>
        <span class="sw-angle-readout">Cross-isobar angle: <strong id="swAngleVal">15°</strong></span>
      </div>
      <input type="range" id="swFrictionSlider" min="0" max="100" step="1" value="33" aria-label="Friction strength" />
      <div class="sw-terrain-desc">
        <span id="swTerrainText">moderate roughness</span>
        <span class="sw-terrain-pill" id="swTerrainPill">FRICTION 0.33</span>
      </div>
    </div>
  </div>
</div>`;
  },

  _initSurfaceWindModule() {
    const root = document.getElementById('swModule');
    if (!root || root.dataset.swInit === 'done') return;
    root.dataset.swInit = 'done';

    const SVG_NS = 'http://www.w3.org/2000/svg';
    // Anchor centers per panel (parcel + base of arrows)
    const P = {
      p1: { x: 160, y: 210 },
      p2: { x: 380, y: 210 },
      p3: { x: 600, y: 210 }
    };

    function el(tag, attrs, parent) {
      const n = document.createElementNS(SVG_NS, tag);
      if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
      if (parent) parent.appendChild(n);
      return n;
    }

    function arrow(parent, opts) {
      const w = opts.width || 13;
      const headW = w * 1.9;
      const headLen = Math.min(18, Math.max(10, opts.length * 0.32));
      const shaftLen = Math.max(0.001, opts.length - headLen);
      const pts = [
        [0, -w/2], [shaftLen, -w/2], [shaftLen, -headW/2], [opts.length, 0],
        [shaftLen, headW/2], [shaftLen, w/2], [0, w/2]
      ].map(p => p.join(',')).join(' ');
      const g = el('g', { transform: `translate(${opts.x} ${opts.y}) rotate(${opts.angle})` }, parent);
      el('polygon', {
        points: pts, fill: opts.color, stroke: opts.stroke || '#0C1B33',
        'stroke-width': 1.2, 'stroke-linejoin': 'round'
      }, g);
      if (opts.dashed) {
        const last = g.lastChild;
        last.setAttribute('fill', 'rgba(56, 189, 248, 0.30)');
        last.setAttribute('stroke', '#0284C7');
        last.setAttribute('stroke-dasharray', '4 3');
        last.setAttribute('stroke-width', 1.5);
      }
      if (opts.innerLabel && shaftLen > 18) {
        // Counter-rotate when arrow flipped past vertical (text upright)
        const a = ((opts.angle % 360) + 360) % 360;
        const flip = (a > 90 && a < 270);
        const tg = el('g', flip
          ? { transform: `translate(${shaftLen/2} 3) rotate(180)` }
          : { transform: `translate(${shaftLen/2} 3)` }, g);
        const t = el('text', {
          x: 0, y: 0, 'text-anchor': 'middle', class: 'force-text',
          fill: opts.innerLabelColor || '#0284C7',
          'font-size': 9, 'letter-spacing': '0.08em'
        }, tg);
        t.textContent = opts.innerLabel;
      }
      return g;
    }

    function parcel(parent, x, y) {
      el('circle', {
        cx: x, cy: y, r: 11, fill: 'url(#swParcelGrad)',
        stroke: '#0284C7', 'stroke-width': 1.2
      }, parent);
    }
    function forceLabel(parent, x, y, text, color) {
      const t = el('text', { x, y, 'text-anchor': 'middle', fill: color, class: 'force-text' }, parent);
      t.textContent = text;
      return t;
    }
    function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

    const p1g = root.querySelector('#swP1Arrows');
    const p2g = root.querySelector('#swP2Arrows');
    const p3g = root.querySelector('#swP3Arrows');

    // PANEL 1: PGF up, Coriolis down, wind horizontal (geostrophic)
    function drawPanel1() {
      clear(p1g);
      const c = P.p1;
      arrow(p1g, { x: c.x, y: c.y - 12, length: 70, angle: -90, color: '#475569', width: 13 });
      forceLabel(p1g, c.x, c.y - 12 - 70 - 6, 'PGF', '#0C1B33');
      arrow(p1g, { x: c.x, y: c.y + 12, length: 70, angle: 90, color: '#7C3AED', stroke: '#4C1D95', width: 13 });
      forceLabel(p1g, c.x, c.y + 12 + 70 + 14, 'CORIOLIS', '#7C3AED');
      arrow(p1g, { x: c.x + 14, y: c.y, length: 80, angle: 0, color: 'rgba(56,189,248,0.30)', dashed: true, innerLabel: 'WIND' });
      parcel(p1g, c.x, c.y);
    }
    // PANEL 2: same forces + friction arrow opposing wind. Wind weakens.
    function drawPanel2(friction) {
      clear(p2g);
      const c = P.p2;
      arrow(p2g, { x: c.x, y: c.y - 12, length: 70, angle: -90, color: '#475569', width: 13 });
      forceLabel(p2g, c.x, c.y - 12 - 70 - 6, 'PGF', '#0C1B33');
      arrow(p2g, { x: c.x, y: c.y + 12, length: 70, angle: 90, color: '#7C3AED', stroke: '#4C1D95', width: 13 });
      forceLabel(p2g, c.x, c.y + 12 + 70 + 14, 'CORIOLIS', '#7C3AED');
      const fLen = 30 + friction * 60;
      arrow(p2g, { x: c.x - 14, y: c.y, length: fLen, angle: 180, color: '#F59E0B', stroke: '#92400E', width: 13 });
      forceLabel(p2g, c.x - 14 - fLen / 2, c.y - 12, 'FRICTION', '#92400E');
      const windLen = 90 - friction * 50;
      arrow(p2g, { x: c.x + 14, y: c.y, length: windLen, angle: 0, color: 'rgba(56,189,248,0.30)', dashed: true, innerLabel: 'WIND' });
      parcel(p2g, c.x, c.y);
    }
    // PANEL 3: resultant — wind tilts up toward LOW; cross-isobar angle drives both wind and Coriolis tilt; PGF stays vertical
    function drawPanel3(angleDeg) {
      clear(p3g);
      const c = P.p3;
      arrow(p3g, { x: c.x, y: c.y - 12, length: 70, angle: -90, color: '#475569', width: 13 });
      forceLabel(p3g, c.x, c.y - 12 - 70 - 6, 'PGF', '#0C1B33');
      const corAngle = 90 + angleDeg;
      arrow(p3g, {
        x: c.x + Math.cos(corAngle * Math.PI/180)*12,
        y: c.y + Math.sin(corAngle * Math.PI/180)*12,
        length: 70, angle: corAngle, color: '#7C3AED', stroke: '#4C1D95', width: 13
      });
      const labelDist = 90;
      const lx = c.x + Math.cos(corAngle * Math.PI/180) * labelDist;
      const ly = c.y + Math.sin(corAngle * Math.PI/180) * labelDist + 12;
      forceLabel(p3g, lx, ly, 'CORIOLIS', '#7C3AED');
      const wAngle = -angleDeg;
      const fAngle = 180 - angleDeg;
      const fOriginX = c.x + Math.cos(fAngle * Math.PI/180)*14;
      const fOriginY = c.y + Math.sin(fAngle * Math.PI/180)*14;
      const fShaftLen = 50;
      arrow(p3g, { x: fOriginX, y: fOriginY, length: fShaftLen, angle: fAngle,
                   color: '#F59E0B', stroke: '#92400E', width: 12 });
      const fMidX = fOriginX + Math.cos(fAngle * Math.PI/180) * (fShaftLen / 2);
      const fMidY = fOriginY + Math.sin(fAngle * Math.PI/180) * (fShaftLen / 2);
      forceLabel(p3g, fMidX, fMidY - 12, 'FRICTION', '#92400E');
      arrow(p3g, {
        x: c.x + Math.cos(wAngle * Math.PI/180)*14,
        y: c.y + Math.sin(wAngle * Math.PI/180)*14,
        length: 75, angle: wAngle, color: 'rgba(56,189,248,0.30)', dashed: true, innerLabel: 'WIND'
      });
      parcel(p3g, c.x, c.y);
    }

    const layerAbove = root.querySelector('#swLayerAbove');
    const layerBelow = root.querySelector('#swLayerBelow');
    const panel2 = root.querySelector('#swPanel2');
    const panel3 = root.querySelector('#swPanel3');
    const div1 = root.querySelector('#swDiv1');
    const div2 = root.querySelector('#swDiv2');
    const frictionRow = root.querySelector('#swFrictionRow');
    const slider = root.querySelector('#swFrictionSlider');
    const angleVal = root.querySelector('#swAngleVal');
    const terrainText = root.querySelector('#swTerrainText');
    const terrainPill = root.querySelector('#swTerrainPill');
    const capLead = root.querySelector('#swCapLead');
    const capText = root.querySelector('#swCapText');
    const figure = root.querySelector('#swFigure');

    function setMode(m) {
      layerAbove.setAttribute('aria-pressed', m === 'above' ? 'true' : 'false');
      layerBelow.setAttribute('aria-pressed', m === 'below' ? 'true' : 'false');
      if (m === 'above') {
        panel2.style.opacity = '0';
        panel3.style.opacity = '0';
        div1.style.opacity = '0';
        div2.style.opacity = '0';
        frictionRow.style.opacity = '0.4';
        frictionRow.style.pointerEvents = 'none';
        figure.setAttribute('viewBox', '40 0 360 420');
        capLead.textContent = 'Above the friction layer';
        capText.textContent = 'PGF and Coriolis balance exactly. The wind blows parallel to the isobars — geostrophic flow.';
      } else {
        panel2.style.opacity = '1';
        panel3.style.opacity = '1';
        div1.style.opacity = '1';
        div2.style.opacity = '1';
        frictionRow.style.opacity = '1';
        frictionRow.style.pointerEvents = 'auto';
        figure.setAttribute('viewBox', '0 0 720 420');
        capLead.textContent = 'Below the friction layer · ~2,000 ft AGL';
        capText.textContent = 'Friction opposes wind direction. The resultant wind crosses isobars at an angle toward lower pressure.';
      }
    }
    function frictionToAngle(f) { return Math.round(f * 45); }
    // Angle descriptions match FAA-H-8083-28B Ch. 10 surface-wind treatment.
    function describeAngle(a) {
      if (a < 5)  return 'parallel — geostrophic';
      if (a < 17) return 'typical over water';
      if (a < 35) return 'moderate terrain';
      return        'rough terrain or mountains';
    }
    function setFriction(v) {
      const f = v / 100;
      const angle = frictionToAngle(f);
      angleVal.textContent = angle + '°';
      terrainText.textContent = describeAngle(angle);
      terrainPill.textContent = 'FRICTION ' + f.toFixed(2);
      drawPanel2(f);
      drawPanel3(angle);
    }

    layerAbove.addEventListener('click', () => setMode('above'));
    layerBelow.addEventListener('click', () => setMode('below'));
    slider.addEventListener('input', (e) => setFriction(parseInt(e.target.value, 10)));

    drawPanel1();
    setFriction(parseInt(slider.value, 10));
    setMode('below');
  },

  showOrgInfo(id) {
    const info = {
      noaa: { title:'🌐 NOAA — National Oceanic and Atmospheric Administration', text:'Parent agency for all US weather. Operates the NESDIS satellite network (GOES-East and GOES-West) — the source of every satellite loop on aviationweather.gov. Oversees the National Weather Service. NOAA does not issue pilot-specific products directly — the NWS handles that role — but NOAA funding and satellites underpin everything pilots rely on.' },
      nws: { title:'🏢 NWS / Aviation Weather Center (AWC)', text:'The AWC in Kansas City is the most critical NWS office for pilots. It issues every SIGMET, Convective SIGMET, G-AIRMET, and CWA. It operates aviationweather.gov and produces the GFA tool. The 122 local WFOs issue TAFs, watches, and warnings for their regions. SPC issues severe weather watches; NHC issues tropical advisories — both feed into AWC products.' },
      faa: { title:'✈️ FAA / Leidos Flight Service (1-800-WX-BRIEF)', text:'The FAA does not produce weather — it distributes and standardizes it. Leidos Flight Service (contracted to FAA) operates 1-800-WX-BRIEF. Briefers access the same NWS products on aviationweather.gov and synthesize them for your specific route. PIREPs are pilot-generated and entered by FSS or pilot apps — they are the only real-time observations of actual in-flight conditions.' },
    };
    const d = info[id];
    document.getElementById('org-detail').style.display = 'block';
    document.getElementById('org-title').textContent = d.title;
    document.getElementById('org-text').textContent = d.text;
  },

  // M6 §s6_2 — bespoke single-cell thunderstorm lifecycle module (replaces
  // FAA Fig 22-2 PROCESS_DIAGRAMS carousel). Live cross-section morphs one
  // cell through Towering Cumulus → Mature → Dissipating across 90 minutes
  // (30 min/stage). Play/pause + scrubber + trigger selector (sun / front /
  // mountain) set at T+0. Stage transition banners fire at the 30 and 60
  // minute boundaries. Cloud SVG paths are hand-authored cauliflower
  // silhouettes (single closed paths with cubic-bezier bumps of varying
  // size — not stacked uniform ellipses) with bold #0C1B33 outlines and
  // gradient fills, matching the cel-shaded FAA reference style. Stage 1's
  // towering-cumulus path is shared verbatim with the ingredients module's
  // success-state result-panel cloud (Diagrams.tsTowCumulusPath) — visual
  // continuity across the two M6 modules is required.
  tsLifecycleSVG() { return this.renderTsLifecycleModule(); },

  // Shared towering-cumulus silhouette path. Used by stage 1 of the
  // lifecycle module AND the all-three-on success state of the ingredients
  // module. Returns SVG path 'd' attribute for a cauliflower-edged cumulus
  // ~140px wide × ~210px tall, base centered at (cx, baseY) with the cloud
  // billowing upward to (cx, baseY-210). Bump sizes vary on purpose to
  // avoid the stacked-ellipse marshmallow look.
  tsTowCumulusPath(cx, baseY) {
    const x = cx, y = baseY;
    // Wide bumps with narrow-range neck values (x±70..78) so the cauliflower
    // edges merge into a continuous billowing silhouette rather than stacked
    // discrete lobes. Bump control points pull to x±94..104 for visible
    // bulges. Slight left/right asymmetry keeps it organic.
    return [
      // Base: slightly undulating
      `M ${x-68} ${y-2}`,
      `L ${x-30} ${y}`, `L ${x+8} ${y-1}`, `L ${x+38} ${y}`, `L ${x+68} ${y-2}`,
      // Right side: 5 wide cauliflower bumps going UP
      `C ${x+96} ${y-8}, ${x+100} ${y-34}, ${x+78} ${y-46}`,
      `C ${x+98} ${y-58}, ${x+104} ${y-86}, ${x+76} ${y-98}`,
      `C ${x+96} ${y-110}, ${x+98} ${y-138}, ${x+72} ${y-150}`,
      `C ${x+90} ${y-164}, ${x+92} ${y-186}, ${x+66} ${y-196}`,
      // Top: 3 cauliflower peaks (highest in middle)
      `C ${x+76} ${y-214}, ${x+50} ${y-220}, ${x+30} ${y-208}`,    // top-right peak
      `C ${x+22} ${y-228}, ${x-8} ${y-230}, ${x-22} ${y-214}`,     // center peak (highest)
      `C ${x-36} ${y-222}, ${x-62} ${y-218}, ${x-58} ${y-200}`,    // top-left peak
      // Left side: 4 wide cauliflower bumps going DOWN (asymmetric vs right)
      `C ${x-86} ${y-188}, ${x-92} ${y-164}, ${x-72} ${y-148}`,
      `C ${x-96} ${y-138}, ${x-100} ${y-110}, ${x-78} ${y-98}`,
      `C ${x-104} ${y-86}, ${x-100} ${y-58}, ${x-78} ${y-46}`,
      `C ${x-100} ${y-34}, ${x-96} ${y-8}, ${x-68} ${y-2}`,
      `Z`
    ].join(' ');
  },

  // Mature stage: tall column from y=500 (10k ft) up through the troposphere,
  // with a CLEARLY DISTINCT flat-bottomed anvil flaring outward at the top.
  // Single closed silhouette path so the column-and-anvil look like one cloud
  // body. Anvil bottom is flat at y=200 (~32k ft) and the top peaks around
  // y=140 (~38k ft); column tucks in slightly below the anvil.
  tsMatureCloudPath(cx) {
    const x = cx;
    const yb = 500;  // column base (10,000 ft)
    // Necks vary between x+70..x+78 (narrow range to keep silhouette continuous)
    // and bumps pull control points to x+90..x+102 for pronounced cauliflower
    // edges. Asymmetry between right and left sides keeps it from looking
    // mirrored.
    return [
      `M ${x-60} ${yb}`,
      `L ${x-22} ${yb-1}`, `L ${x+22} ${yb}`, `L ${x+60} ${yb-1}`,
      // Right column: 6 cauliflower bumps merging into a wavy edge
      `C ${x+90} ${yb-8}, ${x+96} ${yb-34}, ${x+74} ${yb-46}`,
      `C ${x+96} ${yb-58}, ${x+102} ${yb-86}, ${x+76} ${yb-98}`,
      `C ${x+98} ${yb-110}, ${x+98} ${yb-138}, ${x+72} ${yb-150}`,
      `C ${x+92} ${yb-164}, ${x+96} ${yb-188}, ${x+74} ${yb-202}`,
      `C ${x+92} ${yb-218}, ${x+90} ${yb-244}, ${x+70} ${yb-258}`,
      `C ${x+86} ${yb-274}, ${x+82} ${yb-296}, ${x+72} ${yb-302}`,
      // Anvil right wing — flat-ish bottom flares far out, top rises and curves over
      `L ${x+200} ${yb-298}`,                                            // flat bottom flares right
      `C ${x+248} ${yb-300}, ${x+264} ${yb-312}, ${x+254} ${yb-326}`,    // anvil right tip rises
      `C ${x+248} ${yb-344}, ${x+208} ${yb-356}, ${x+174} ${yb-346}`,    // top right peak
      `C ${x+144} ${yb-360}, ${x+106} ${yb-354}, ${x+78} ${yb-348}`,
      `C ${x+44} ${yb-362}, ${x+10} ${yb-358}, ${x-12} ${yb-348}`,       // top center peak
      `C ${x-46} ${yb-358}, ${x-84} ${yb-352}, ${x-104} ${yb-346}`,
      `C ${x-144} ${yb-358}, ${x-184} ${yb-352}, ${x-204} ${yb-338}`,
      `C ${x-244} ${yb-338}, ${x-260} ${yb-322}, ${x-248} ${yb-312}`,    // anvil left tip
      `C ${x-258} ${yb-302}, ${x-244} ${yb-298}, ${x-200} ${yb-298}`,    // back to flat bottom
      `L ${x-72} ${yb-302}`,
      // Left column bumps going down (slight asymmetry vs right)
      `C ${x-84} ${yb-296}, ${x-88} ${yb-274}, ${x-72} ${yb-258}`,
      `C ${x-92} ${yb-244}, ${x-94} ${yb-218}, ${x-74} ${yb-202}`,
      `C ${x-96} ${yb-188}, ${x-94} ${yb-164}, ${x-72} ${yb-150}`,
      `C ${x-100} ${yb-138}, ${x-100} ${yb-110}, ${x-76} ${yb-98}`,
      `C ${x-100} ${yb-86}, ${x-94} ${yb-58}, ${x-74} ${yb-46}`,
      `C ${x-94} ${yb-34}, ${x-92} ${yb-8}, ${x-60} ${yb-1}`,
      `Z`
    ].join(' ');
  },

  // Dissipating stage: a wider, spread-out anvil with a thinned, fragmented
  // column underneath. Single closed silhouette.
  tsDissipatingCloudPath(cx) {
    const x = cx;
    return [
      // Wispy base around y=440 (~14k ft) — column has lifted off the ground
      `M ${x-40} 440`,
      `L ${x-12} 442`, `L ${x+18} 440`, `L ${x+40} 442`,
      // Right side thinning column going up
      `C ${x+62} 432, ${x+66} 408, ${x+50} 396`,
      `C ${x+74} 380, ${x+72} 352, ${x+54} 336`,
      `C ${x+78} 318, ${x+76} 292, ${x+58} 276`,
      `C ${x+82} 256, ${x+78} 230, ${x+58} 218`,
      // Anvil right wing — much wider than mature, flat bottom flares far
      `L ${x+260} 214`,
      `C ${x+320} 220, ${x+340} 210, ${x+332} 198`,
      // Anvil top: feathery, multiple wispy peaks
      `C ${x+320} 178, ${x+280} 174, ${x+250} 184`,
      `C ${x+220} 168, ${x+180} 174, ${x+150} 188`,
      `C ${x+120} 174, ${x+80} 170, ${x+50} 184`,
      `C ${x+20} 168, ${x-20} 170, ${x-50} 184`,
      `C ${x-80} 170, ${x-120} 174, ${x-150} 188`,
      `C ${x-180} 174, ${x-220} 170, ${x-250} 184`,
      `C ${x-280} 174, ${x-320} 178, ${x-332} 198`,
      `C ${x-340} 210, ${x-320} 220, ${x-260} 214`,
      // Back to column left
      `L ${x-58} 218`,
      `C ${x-78} 230, ${x-82} 256, ${x-58} 276`,
      `C ${x-76} 292, ${x-78} 318, ${x-54} 336`,
      `C ${x-72} 352, ${x-74} 380, ${x-50} 396`,
      `C ${x-66} 408, ${x-62} 432, ${x-40} 440`,
      `Z`
    ].join(' ');
  },

  renderTsLifecycleModule() {
    // Build cloud paths once. cx=380 is the center column on the 760-wide canvas.
    const towCumulus = this.tsTowCumulusPath(380, 570);
    const matureCloud = this.tsMatureCloudPath(380);
    const dissipatingCloud = this.tsDissipatingCloudPath(380);

    return `
<div class="tslc-module" id="tslcModule" role="region" aria-label="Single-cell thunderstorm lifecycle teaching figure">
  <header class="tslc-module__header">
    <h2 class="tslc-module__title">Single-Cell Thunderstorm Lifecycle</h2>
  </header>
  <div class="tslc-module__attr">FAA-H-8083-28B · Chapter 22 — Air-mass Thunderstorm Lifecycle</div>

  <div class="tslc-figure-wrap">
    <div class="tslc-scene" id="tslcScene">
      <div class="tslc-hud" aria-live="polite">
        <div class="tslc-hud__time" id="tslcHudTime">T+00 min</div>
        <div class="tslc-hud__stage" id="tslcHudStage">Towering Cumulus</div>
      </div>
      <div class="tslc-banner" id="tslcBanner" role="status" aria-live="polite">
        <span id="tslcBannerText"></span>
        <span class="tslc-banner__cite" id="tslcBannerCite"></span>
      </div>

      <svg viewBox="0 0 760 720" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Cross-section of a single-cell thunderstorm" id="tslcSvg">
        <defs>
          <marker id="tslcArrowUp" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 9 L 5 1 L 9 9 Z" fill="#F59E0B"/>
          </marker>
          <marker id="tslcArrowDown" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 9 L 5 1 L 9 9 Z" fill="#F59E0B"/>
          </marker>
          <marker id="tslcArrowAnvil" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 9 L 5 1 L 9 9 Z" fill="#FFFFFF"/>
          </marker>
          <linearGradient id="tslcSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0C1B33"/>
            <stop offset="55%" stop-color="#3a6db0"/>
            <stop offset="92%" stop-color="#87bce8"/>
            <stop offset="100%" stop-color="#bfdcef"/>
          </linearGradient>
          <linearGradient id="tslcCloud" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="55%" stop-color="#F1F5FB"/>
            <stop offset="100%" stop-color="#C4D2E2"/>
          </linearGradient>
          <linearGradient id="tslcAnvilFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F8FBFF"/>
            <stop offset="100%" stop-color="#D6DEE9"/>
          </linearGradient>
          <linearGradient id="tslcShaft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9AAECB" stop-opacity="0.15"/>
            <stop offset="60%" stop-color="#6E84A3" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#5A6E8C" stop-opacity="0.7"/>
          </linearGradient>
          <linearGradient id="tslcGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5fa84e"/>
            <stop offset="100%" stop-color="#3f7a35"/>
          </linearGradient>
        </defs>

        <!-- Sky gradient -->
        <rect x="0" y="0" width="760" height="640" fill="url(#tslcSky)"/>

        <!-- Ground -->
        <rect x="0" y="640" width="760" height="80" fill="url(#tslcGround)"/>
        <path d="M 0 640 Q 60 634, 120 640 T 240 640 T 360 640 T 480 640 T 600 640 T 760 640 L 760 644 L 0 644 Z" fill="#4d8a3f" opacity="0.55"/>

        <!-- Height grid -->
        <g>
          <line class="tslc-grid-line" x1="96"  y1="80"  x2="672" y2="80"/>
          <line class="tslc-grid-line" x1="96"  y1="220" x2="672" y2="220"/>
          <line class="tslc-grid-line" x1="96"  y1="360" x2="672" y2="360"/>
          <line class="tslc-grid-line" x1="96"  y1="500" x2="672" y2="500"/>
          <text class="tslc-grid-label" x="92"  y="84"  text-anchor="end">40,000 ft.</text>
          <text class="tslc-grid-label" x="92"  y="224" text-anchor="end">30,000 ft.</text>
          <text class="tslc-grid-label" x="92"  y="364" text-anchor="end">20,000 ft.</text>
          <text class="tslc-grid-label" x="92"  y="504" text-anchor="end">10,000 ft.</text>
          <text class="tslc-grid-label" x="676" y="84"  text-anchor="start">12.2 km</text>
          <text class="tslc-grid-label" x="676" y="224" text-anchor="start">9.1 km</text>
          <text class="tslc-grid-label" x="676" y="364" text-anchor="start">6.1 km</text>
          <text class="tslc-grid-label" x="676" y="504" text-anchor="start">3.0 km</text>
        </g>

        <!-- Freezing level -->
        <g>
          <path class="tslc-freeze-line" d="M 96 504 Q 380 510, 672 504"/>
          <text class="tslc-freeze-label" x="112" y="498">32°F</text>
          <text class="tslc-freeze-label" x="656" y="498" text-anchor="end">0°C</text>
        </g>

        <!-- ===== STAGE 1: TOWERING CUMULUS ===== -->
        <g class="tslc-stage-group" id="tslcStage1" opacity="1">
          <path d="${towCumulus}" fill="url(#tslcCloud)" stroke="#0C1B33" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- 3 updraft arrows entering base -->
          <path class="tslc-arrow-line tslc-arrow-up" d="M 320 632 L 320 568" marker-end="url(#tslcArrowUp)"/>
          <path class="tslc-arrow-line tslc-arrow-up" d="M 380 632 L 380 552" marker-end="url(#tslcArrowUp)"/>
          <path class="tslc-arrow-line tslc-arrow-up" d="M 440 632 L 440 568" marker-end="url(#tslcArrowUp)"/>
        </g>

        <!-- ===== STAGE 2: MATURE ===== -->
        <g class="tslc-stage-group" id="tslcStage2" opacity="0">
          <!-- Precipitation shaft on right (trailing) edge of cell — drawn BEHIND cloud body -->
          <g class="tslc-precip-shaft">
            <path d="M 410 500 Q 432 560, 446 640 L 366 640 Q 380 560, 386 500 Z" fill="url(#tslcShaft)"/>
            <g stroke="#5A6E8C" stroke-width="1.4" opacity="0.55" fill="none" stroke-linecap="round">
              <path d="M 388 520 L 392 638"/>
              <path d="M 400 510 L 408 638"/>
              <path d="M 415 530 L 422 638"/>
              <path d="M 428 540 L 436 638"/>
            </g>
          </g>
          <!-- Lightning bolt -->
          <path class="tslc-lightning" d="M 396 580 L 386 604 L 394 604 L 386 622 L 408 596 L 398 596 L 408 580 Z"/>
          <!-- Mature cloud silhouette: column + flat-bottomed anvil -->
          <path d="${matureCloud}" fill="url(#tslcCloud)" stroke="#0C1B33" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Anvil overlay: flat-bottom suggestion + ice-crystal wisps on top -->
          <g opacity="0.35">
            <path d="M 180 198 Q 220 196, 260 200 T 380 200 T 500 200 T 580 198" stroke="#0C1B33" stroke-width="1" fill="none"/>
            <path d="M 220 178 Q 280 174, 340 176 T 460 176 T 540 178" stroke="#94A3B8" stroke-width="1" fill="none" stroke-dasharray="4 4"/>
          </g>
          <!-- Updraft arrows on left (leading edge) -->
          <path class="tslc-arrow-line tslc-arrow-up" d="M 314 632 L 326 234" marker-end="url(#tslcArrowUp)"/>
          <path class="tslc-arrow-line tslc-arrow-up" d="M 360 632 L 360 210" marker-end="url(#tslcArrowUp)"/>
          <!-- Downdraft arrows in shaft (right) -->
          <path class="tslc-arrow-line tslc-arrow-down" d="M 410 250 L 410 632" marker-end="url(#tslcArrowDown)"/>
          <path class="tslc-arrow-line tslc-arrow-down" d="M 440 290 L 440 632" marker-end="url(#tslcArrowDown)"/>
          <!-- Anvil spread arrows -->
          <path class="tslc-arrow-line tslc-arrow-anvil" d="M 360 175 L 232 175" marker-end="url(#tslcArrowAnvil)"/>
          <path class="tslc-arrow-line tslc-arrow-anvil" d="M 400 175 L 528 175" marker-end="url(#tslcArrowAnvil)"/>
        </g>

        <!-- ===== STAGE 3: DISSIPATING ===== -->
        <g class="tslc-stage-group" id="tslcStage3" opacity="0">
          <!-- Light residual rain shaft -->
          <g class="tslc-precip-shaft" opacity="0.45">
            <path d="M 320 360 Q 340 500, 380 640 L 460 640 Q 470 500, 460 360 Z" fill="url(#tslcShaft)"/>
          </g>
          <!-- Dissipating silhouette: spread anvil + thinning column -->
          <path d="${dissipatingCloud}" fill="url(#tslcAnvilFill)" stroke="#0C1B33" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Wispy ice-crystal trails on the underside -->
          <g opacity="0.5">
            <path d="M 80 220 Q 160 232, 240 222 T 400 222 T 560 222 T 700 220" stroke="#7d92ad" stroke-width="1.2" fill="none" stroke-dasharray="3 5"/>
            <path d="M 120 240 Q 200 248, 280 238 T 440 238 T 600 238 T 680 240" stroke="#94A3B8" stroke-width="1" fill="none" stroke-dasharray="2 6"/>
          </g>
          <!-- Downdraft arrows throughout -->
          <path class="tslc-arrow-line tslc-arrow-down" d="M 320 240 L 320 540" marker-end="url(#tslcArrowDown)"/>
          <path class="tslc-arrow-line tslc-arrow-down" d="M 380 220 L 380 560" marker-end="url(#tslcArrowDown)"/>
          <path class="tslc-arrow-line tslc-arrow-down" d="M 440 240 L 440 540" marker-end="url(#tslcArrowDown)"/>
          <!-- Anvil thin spreading horizontal -->
          <path class="tslc-arrow-line tslc-arrow-anvil" d="M 280 120 L 160 120" marker-end="url(#tslcArrowAnvil)" opacity="0.85"/>
          <path class="tslc-arrow-line tslc-arrow-anvil" d="M 480 120 L 600 120" marker-end="url(#tslcArrowAnvil)" opacity="0.85"/>
        </g>

        <!-- Trigger icon (bottom-left, set at T+0) -->
        <g id="tslcTriggerIcon" transform="translate(124, 600)" aria-hidden="true">
          <circle cx="0" cy="0" r="22" fill="rgba(255,255,255,0.92)" stroke="#0C1B33" stroke-width="1.5"/>
          <g id="tslcTriggerGlyph"></g>
        </g>

        <!-- Horizontal extent indicator -->
        <g id="tslcExtent" transform="translate(0, 690)">
          <line class="tslc-extent-arrow" id="tslcExtentLine" x1="320" y1="0" x2="440" y2="0" marker-start="url(#tslcArrowAnvil)" marker-end="url(#tslcArrowAnvil)"/>
          <text class="tslc-extent-label" id="tslcExtentMain" x="380" y="-6" text-anchor="middle">3–5 mi</text>
          <text class="tslc-extent-sub" id="tslcExtentSub" x="380" y="14" text-anchor="middle">5–8 km</text>
        </g>
      </svg>
    </div>
  </div>

  <div class="tslc-controls">
    <div class="tslc-controls__row" role="group" aria-label="Playback">
      <button class="tslc-btn tslc-btn--play" id="tslcPlayBtn" aria-label="Play">
        <span id="tslcPlayIcon">▶</span>
        <span id="tslcPlayLabel">Play</span>
      </button>
      <button class="tslc-btn tslc-btn--ghost" id="tslcRestartBtn" aria-label="Restart at T+0">↺ Restart</button>
    </div>

    <div class="tslc-scrub-row">
      <input class="tslc-slider" id="tslcScrub" type="range" min="0" max="90" step="0.1" value="0" aria-label="Stage scrubber, minutes elapsed">
      <div class="tslc-scrub-labels" aria-hidden="true">
        <span>Towering Cumulus</span><span>Mature</span><span>Dissipating</span>
      </div>
    </div>

    <div class="tslc-trigger" aria-label="Trigger selector">
      <span class="tslc-trigger__label">Trigger:</span>
      <div class="tslc-trigger__group" role="radiogroup" aria-label="What initiated the cell">
        <button class="tslc-trigger__btn" data-trigger="sun" aria-pressed="true" aria-label="Daytime heating">☀</button>
        <button class="tslc-trigger__btn" data-trigger="front" aria-pressed="false" aria-label="Frontal lifting">▲</button>
        <button class="tslc-trigger__btn" data-trigger="mountain" aria-pressed="false" aria-label="Orographic lifting">⛰</button>
      </div>
      <span class="tslc-trigger__hint" id="tslcTriggerHint">Pause at T+0 to change</span>
    </div>
  </div>

  <p class="tslc-caption" id="tslcCaption">
    <span id="tslcCaptionText">Warm, moist air rises and condenses into a building cumulus tower. The cell is dominated by updrafts, and no precipitation has yet reached the surface.</span>
    <span class="tslc-caption__cite" id="tslcCaptionCite">FAA-H-8083-28B · Chapter 22 — Towering Cumulus Stage</span>
  </p>
</div>`;
  },

  // Interactive init for the lifecycle module. Idempotent via dataset.tslcInit.
  // Called by Screens._initDiagram for hotspot key 'thunderstorm_lifecycle'
  // after innerHTML inject. Total: 90 min, 30 min/stage. Banners fire at the
  // 30/60 min boundaries when playing forward across them.
  _initTsLifecycleModule() {
    const root = document.getElementById('tslcModule');
    if (!root || root.dataset.tslcInit === 'done') return;
    root.dataset.tslcInit = 'done';

    const DURATION = 90;
    const SECONDS_PER_MIN = 0.6; // ~54 sec wall clock total
    const FADE_RAMP = 6;

    const stage1 = root.querySelector('#tslcStage1');
    const stage2 = root.querySelector('#tslcStage2');
    const stage3 = root.querySelector('#tslcStage3');
    const hudTime = root.querySelector('#tslcHudTime');
    const hudStage = root.querySelector('#tslcHudStage');
    const banner = root.querySelector('#tslcBanner');
    const bannerText = root.querySelector('#tslcBannerText');
    const bannerCite = root.querySelector('#tslcBannerCite');
    const captionText = root.querySelector('#tslcCaptionText');
    const captionCite = root.querySelector('#tslcCaptionCite');
    const playBtn = root.querySelector('#tslcPlayBtn');
    const playIcon = root.querySelector('#tslcPlayIcon');
    const playLabel = root.querySelector('#tslcPlayLabel');
    const restartBtn = root.querySelector('#tslcRestartBtn');
    const scrub = root.querySelector('#tslcScrub');
    const extentLine = root.querySelector('#tslcExtentLine');
    const extentMain = root.querySelector('#tslcExtentMain');
    const extentSub = root.querySelector('#tslcExtentSub');
    const triggerBtns = root.querySelectorAll('.tslc-trigger__btn');
    const triggerGlyph = root.querySelector('#tslcTriggerGlyph');
    const triggerHint = root.querySelector('#tslcTriggerHint');

    const state = { t: 0, playing: false, lastTick: 0, trigger: 'sun',
                    bannerSeen: { mature: false, dissipate: false } };

    const STAGES = {
      cumulus: {
        label: 'Towering Cumulus',
        caption: 'Warm, moist air rises and condenses into a building cumulus tower. The cell is dominated by updrafts, and no precipitation has yet reached the surface.',
        cite: 'FAA-H-8083-28B · Chapter 22 — Towering Cumulus Stage',
        extent: { x1: 320, x2: 440, label: '3–5 mi', sub: '5–8 km' }
      },
      mature: {
        label: 'Mature Stage',
        caption: 'Updraft and downdraft now coexist. Precipitation reaches the surface, the anvil spreads aloft, and the cell is at peak intensity — the period of greatest hazard.',
        cite: 'FAA-H-8083-28B · Chapter 22 — Mature Stage',
        extent: { x1: 220, x2: 540, label: '5–10 mi', sub: '8–16 km' }
      },
      dissipating: {
        label: 'Dissipating Stage',
        caption: 'The downdraft has overwhelmed the updraft, cutting off the moisture supply. The cell is collapsing — the anvil spreads and thins as the cloud body subsides.',
        cite: 'FAA-H-8083-28B · Chapter 22 — Dissipating Stage',
        extent: { x1: 240, x2: 520, label: '5–7 mi', sub: '8–11 km' }
      }
    };

    const TRIGGER_GLYPHS = {
      sun:      `<g><circle cx="0" cy="0" r="7" fill="#F59E0B"/><g stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round"><line x1="0" y1="-12" x2="0" y2="-16"/><line x1="0" y1="12" x2="0" y2="16"/><line x1="-12" y1="0" x2="-16" y2="0"/><line x1="12" y1="0" x2="16" y2="0"/><line x1="-9" y1="-9" x2="-12" y2="-12"/><line x1="9" y1="-9" x2="12" y2="-12"/><line x1="-9" y1="9" x2="-12" y2="12"/><line x1="9" y1="9" x2="12" y2="12"/></g></g>`,
      front:    `<g><path d="M -12 6 L 0 -10 L 12 6 Z" fill="#0284C7" stroke="#0C1B33" stroke-width="1.2" stroke-linejoin="round"/><path d="M -12 9 L 12 9" stroke="#0284C7" stroke-width="2.4" stroke-linecap="round"/></g>`,
      mountain: `<g><path d="M -14 10 L -4 -6 L 2 2 L 8 -10 L 16 10 Z" fill="#475569" stroke="#0C1B33" stroke-width="1.2" stroke-linejoin="round"/><path d="M -7 -1 L -4 -6 L -1 -1 Z" fill="#ffffff"/><path d="M 5 -4 L 8 -10 L 11 -4 Z" fill="#ffffff"/></g>`
    };

    function setTrigger(name) {
      state.trigger = name;
      triggerGlyph.innerHTML = TRIGGER_GLYPHS[name] || TRIGGER_GLYPHS.sun;
      triggerBtns.forEach(b => b.setAttribute('aria-pressed', b.getAttribute('data-trigger') === name ? 'true' : 'false'));
    }

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function smoothstep(a, b, x) {
      if (b === a) return x >= b ? 1 : 0;
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    }

    function interpolatedExtent(t) {
      const c = STAGES.cumulus.extent, m = STAGES.mature.extent, d = STAGES.dissipating.extent;
      if (t <= 30) {
        const u = smoothstep(30 - FADE_RAMP, 30, t);
        return { x1: lerp(c.x1, m.x1, u), x2: lerp(c.x2, m.x2, u),
                 label: u < 0.5 ? c.label : m.label, sub: u < 0.5 ? c.sub : m.sub };
      } else if (t <= 60) {
        const u2 = smoothstep(60 - FADE_RAMP, 60, t);
        return { x1: lerp(m.x1, d.x1, u2), x2: lerp(m.x2, d.x2, u2),
                 label: u2 < 0.5 ? m.label : d.label, sub: u2 < 0.5 ? m.sub : d.sub };
      }
      return d;
    }

    function showBanner(msg, cite) {
      bannerText.textContent = msg;
      bannerCite.textContent = cite;
      banner.classList.add('--show');
      clearTimeout(banner._hideTimer);
      banner._hideTimer = setTimeout(() => banner.classList.remove('--show'), 3000);
    }

    function render(t) {
      state.t = clamp(t, 0, DURATION);
      const minStr = (state.t < 10 ? '0' : '') + Math.floor(state.t);
      hudTime.textContent = 'T+' + minStr + ' min';

      let a1 = 1, a2 = 0, a3 = 0;
      if (state.t < 30) {
        const f12 = smoothstep(30 - FADE_RAMP, 30, state.t);
        a1 = 1 - f12; a2 = f12;
      } else if (state.t < 60) {
        const f23 = smoothstep(60 - FADE_RAMP, 60, state.t);
        a1 = 0; a2 = 1 - f23; a3 = f23;
      } else {
        a1 = 0; a2 = 0; a3 = 1;
      }
      stage1.setAttribute('opacity', a1.toFixed(3));
      stage2.setAttribute('opacity', a2.toFixed(3));
      stage3.setAttribute('opacity', a3.toFixed(3));

      const current = state.t < 30 ? STAGES.cumulus : (state.t < 60 ? STAGES.mature : STAGES.dissipating);
      hudStage.textContent = current.label;
      captionText.textContent = current.caption;
      captionCite.textContent = current.cite;

      const ext = interpolatedExtent(state.t);
      extentLine.setAttribute('x1', ext.x1);
      extentLine.setAttribute('x2', ext.x2);
      extentMain.textContent = ext.label;
      extentSub.textContent = ext.sub;

      if (state.playing && state.t >= 30 && state.t < 30.5 && !state.bannerSeen.mature) {
        showBanner('Precipitation reaches the surface — mature stage begins', 'FAA-H-8083-28B · Chapter 22');
        state.bannerSeen.mature = true;
      }
      if (state.playing && state.t >= 60 && state.t < 60.5 && !state.bannerSeen.dissipate) {
        showBanner('Downdraft cuts off updraft — cell begins to collapse', 'FAA-H-8083-28B · Chapter 22');
        state.bannerSeen.dissipate = true;
      }

      const canChange = !state.playing && state.t === 0;
      triggerBtns.forEach(b => { b.disabled = !canChange; });
      if (triggerHint) triggerHint.style.opacity = canChange ? '0' : '0.65';
    }

    function tick(now) {
      if (!state.playing) return;
      const dt = (now - state.lastTick) / 1000;
      state.lastTick = now;
      const advance = dt / SECONDS_PER_MIN;
      let nt = state.t + advance;
      if (nt >= DURATION) { nt = DURATION; render(nt); scrub.value = nt; pause(); return; }
      render(nt);
      scrub.value = nt;
      requestAnimationFrame(tick);
    }

    function play() {
      if (state.t >= DURATION) restart();
      state.playing = true;
      state.lastTick = performance.now();
      playIcon.textContent = '❚❚';
      playLabel.textContent = 'Pause';
      playBtn.setAttribute('aria-label', 'Pause');
      requestAnimationFrame(tick);
      render(state.t);
    }

    function pause() {
      state.playing = false;
      playIcon.textContent = '▶';
      playLabel.textContent = 'Play';
      playBtn.setAttribute('aria-label', 'Play');
      render(state.t);
    }

    function restart() {
      state.bannerSeen.mature = false;
      state.bannerSeen.dissipate = false;
      banner.classList.remove('--show');
      state.t = 0;
      scrub.value = 0;
      render(0);
    }

    playBtn.addEventListener('click', () => { state.playing ? pause() : play(); });
    restartBtn.addEventListener('click', () => { pause(); restart(); });
    scrub.addEventListener('input', () => {
      pause();
      const v = parseFloat(scrub.value);
      if (v < 30) state.bannerSeen.mature = false;
      if (v < 60) state.bannerSeen.dissipate = false;
      render(v);
    });
    triggerBtns.forEach(b => {
      b.addEventListener('click', () => {
        if (state.playing || state.t !== 0) return;
        setTrigger(b.getAttribute('data-trigger'));
      });
    });

    setTrigger('sun');
    render(0);
  },

  // M6 §s6_1 — bespoke three-ingredients toggle module (replaces the cbIngredients
  // triangle SVG). Three ingredient cards (Water Vapor / Unstable Air / Lift) each
  // with a 44px tap target, a per-card visual, and a result panel that updates
  // immediately as ingredients are toggled — clouds form / dry convection /
  // shallow stratus / no convection / clear sky — each with a caption citing
  // FAA-H-8083-28B Chapter 22. The success-state result-panel cloud reuses
  // tsTowCumulusPath verbatim from the lifecycle module so the two M6 modules
  // share the exact same towering-cumulus silhouette (visual continuity required).
  tsIngredientsSVG() { return this.renderTsIngredientsModule(); },

  // Small organic cumulus puff path — single closed silhouette with bezier-bumped
  // edges. Used in the Lift ingredient card visual (replaces the prior 4 stacked
  // ellipses). Centered at (cx, cy) with the puff billowing upward; total extent
  // ~80 wide × ~46 tall.
  tsSmallPuffPath(cx, cy) {
    const x = cx, y = cy;
    return [
      `M ${x-38} ${y+6}`,
      `C ${x-50} ${y+4}, ${x-52} ${y-12}, ${x-36} ${y-14}`,
      `C ${x-46} ${y-22}, ${x-30} ${y-30}, ${x-18} ${y-22}`,
      `C ${x-12} ${y-32}, ${x+12} ${y-34}, ${x+18} ${y-22}`,
      `C ${x+30} ${y-30}, ${x+46} ${y-22}, ${x+36} ${y-14}`,
      `C ${x+52} ${y-12}, ${x+50} ${y+4}, ${x+38} ${y+6}`,
      `L ${x+10} ${y+8}`, `L ${x-12} ${y+8}`, `Z`
    ].join(' ');
  },

  renderTsIngredientsModule() {
    // Shared cumulus path for the success state — IDENTICAL silhouette to the
    // lifecycle module's Stage 1, just translated into the 800×450 result-panel
    // viewBox. Centered at x=400 with base at y=380 (just above the ocean line).
    const successCumulus = this.tsTowCumulusPath(400, 380);
    const liftCardPuff = this.tsSmallPuffPath(100, 32);

    return `
<div class="tsing-module" id="tsingModule" role="region" aria-label="Three ingredients of a thunderstorm — interactive">
  <header class="tsing-module__header">
    <h2 class="tsing-module__title">The Three Ingredients of a Thunderstorm</h2>
  </header>
  <div class="tsing-module__attr">FAA-H-8083-28B · Chapter 22 — Thunderstorm Ingredients</div>

  <div class="tsing-cards" role="group" aria-label="Ingredient toggles">
    <!-- Water Vapor -->
    <div class="tsing-card" data-ingredient="vapor" data-on="true">
      <div class="tsing-card__title">
        <span>Water Vapor</span>
        <span class="tsing-status-pill" id="tsingPillVapor">On</span>
      </div>
      <div class="tsing-card__visual">
        <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="tsingOcean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e6bb0"/>
              <stop offset="100%" stop-color="#0a3d6b"/>
            </linearGradient>
          </defs>
          <path d="M0 110 Q 25 105, 50 110 T 100 110 T 150 110 T 200 110 L 200 150 L 0 150 Z" fill="url(#tsingOcean)"/>
          <path d="M0 116 Q 25 112, 50 116 T 100 116 T 150 116 T 200 116 L 200 122 L 0 122 Z" fill="#3a86c4" opacity="0.6"/>
          <g stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.85">
            <path class="tsing-vapor-stream" style="animation-delay:0s"   d="M 50 108 Q 44 90, 50 72 Q 56 54, 50 38 Q 46 26, 50 14"/>
            <path class="tsing-vapor-stream" style="animation-delay:0.9s" d="M 100 108 Q 94 90, 100 72 Q 106 54, 100 38 Q 96 26, 100 14"/>
            <path class="tsing-vapor-stream" style="animation-delay:1.6s" d="M 150 108 Q 144 90, 150 72 Q 156 54, 150 38 Q 146 26, 150 14"/>
          </g>
        </svg>
      </div>
      <div class="tsing-card__toggle-row">
        <span class="tsing-card__toggle-label">Moisture available</span>
        <label class="tsing-toggle-tap" aria-label="Toggle Water Vapor">
          <span class="tsing-toggle">
            <input type="checkbox" data-toggle="vapor" checked aria-label="Water vapor present">
            <span class="tsing-toggle__track"></span>
            <span class="tsing-toggle__thumb"></span>
          </span>
        </label>
      </div>
    </div>

    <!-- Unstable Air -->
    <div class="tsing-card" data-ingredient="unstable" data-on="true">
      <div class="tsing-card__title">
        <span>Unstable Air</span>
        <span class="tsing-status-pill" id="tsingPillUnstable">On</span>
      </div>
      <div class="tsing-card__visual">
        <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="tsingInst" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b5998"/>
              <stop offset="55%" stop-color="#c98889"/>
              <stop offset="100%" stop-color="#ffc89a"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="200" height="138" fill="url(#tsingInst)"/>
          <rect x="0" y="138" width="200" height="12" fill="#5fa84e"/>
          <g stroke="#0C1B33" stroke-width="0.8">
            <circle cx="100" cy="22"  r="7" fill="#5e7fc2"/>
            <circle cx="100" cy="42"  r="7" fill="#8e7eb0"/>
            <circle cx="100" cy="62"  r="7" fill="#b785a0"/>
            <circle cx="100" cy="82"  r="7" fill="#d68b8c"/>
            <circle cx="100" cy="102" r="7" fill="#e9a37b"/>
            <circle cx="100" cy="124" r="7" fill="#f3c084"/>
          </g>
          <g stroke="#0C1B33" stroke-width="1.2" fill="#0C1B33" class="tsing-parcel-arrow">
            <g style="animation-delay:0s">
              <path d="M 96 50 L 100 46 L 104 50 Z"/>
              <path d="M 96 36 L 100 40 L 104 36 Z"/>
            </g>
            <g style="animation-delay:0.4s">
              <path d="M 96 70 L 100 66 L 104 70 Z"/>
              <path d="M 96 56 L 100 60 L 104 56 Z"/>
            </g>
            <g style="animation-delay:0.8s">
              <path d="M 96 90 L 100 86 L 104 90 Z"/>
              <path d="M 96 76 L 100 80 L 104 76 Z"/>
            </g>
            <g style="animation-delay:1.2s">
              <path d="M 96 113 L 100 109 L 104 113 Z"/>
              <path d="M 96 96 L 100 100 L 104 96 Z"/>
            </g>
          </g>
          <g font-family="var(--font-display)" font-weight="800" font-size="11">
            <text x="60" y="20" fill="#FFFFFF" text-anchor="end">Cold</text>
            <text x="140" y="20" fill="#FFFFFF" text-anchor="start">Dry</text>
            <text x="60" y="132" fill="#7a1f1f" text-anchor="end">Warm</text>
            <text x="140" y="132" fill="#7a1f1f" text-anchor="start">Moist</text>
          </g>
        </svg>
      </div>
      <div class="tsing-card__toggle-row">
        <span class="tsing-card__toggle-label">Atmosphere unstable</span>
        <label class="tsing-toggle-tap" aria-label="Toggle Unstable Air">
          <span class="tsing-toggle">
            <input type="checkbox" data-toggle="unstable" checked aria-label="Unstable air present">
            <span class="tsing-toggle__track"></span>
            <span class="tsing-toggle__thumb"></span>
          </span>
        </label>
      </div>
    </div>

    <!-- Lift -->
    <div class="tsing-card" data-ingredient="lift" data-on="true">
      <div class="tsing-card__title">
        <span>Lift</span>
        <span class="tsing-status-pill" id="tsingPillLift">On</span>
      </div>
      <div class="tsing-card__visual">
        <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="tsingLiftSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3886c8"/>
              <stop offset="100%" stop-color="#bfdcef"/>
            </linearGradient>
            <linearGradient id="tsingPuffFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="100%" stop-color="#C4D2E2"/>
            </linearGradient>
          </defs>
          <rect width="200" height="138" fill="url(#tsingLiftSky)"/>
          <rect x="0" y="138" width="200" height="12" fill="#5fa84e"/>
          <!-- Hand-authored organic puff cloud (replaces the prior 4 stacked ellipses) -->
          <path d="${liftCardPuff}" fill="url(#tsingPuffFill)" stroke="#0C1B33" stroke-width="1.6" stroke-linejoin="round"/>
          <!-- Stacked block-arrows pushing upward into the puff -->
          <g class="tsing-lift-arrow">
            <path d="M 86 138 L 86 96 L 78 96 L 100 70 L 122 96 L 114 96 L 114 138 Z" fill="#1d4a8a" stroke="#0C1B33" stroke-width="1.2" stroke-linejoin="round"/>
            <path d="M 92 138 L 92 110 L 86 110 L 100 92 L 114 110 L 108 110 L 108 138 Z" fill="#38BDF8" stroke="#0C1B33" stroke-width="1" stroke-linejoin="round"/>
            <path d="M 96 138 L 96 122 L 92 122 L 100 110 L 108 122 L 104 122 L 104 138 Z" fill="#FFFFFF" stroke="#0C1B33" stroke-width="0.8" stroke-linejoin="round"/>
          </g>
        </svg>
      </div>
      <div class="tsing-card__toggle-row">
        <span class="tsing-card__toggle-label">Trigger active</span>
        <label class="tsing-toggle-tap" aria-label="Toggle Lift">
          <span class="tsing-toggle">
            <input type="checkbox" data-toggle="lift" checked aria-label="Lift present">
            <span class="tsing-toggle__track"></span>
            <span class="tsing-toggle__thumb"></span>
          </span>
        </label>
      </div>
    </div>
  </div>

  <!-- Result panel -->
  <div class="tsing-result">
    <div class="tsing-result__inner">
      <div class="tsing-result__scene">
        <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true" id="tsingScene">
          <defs>
            <linearGradient id="tsingSkyClear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3886c8"/>
              <stop offset="100%" stop-color="#bfdcef"/>
            </linearGradient>
            <linearGradient id="tsingSkyUnstable" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b5998"/>
              <stop offset="55%" stop-color="#c98889"/>
              <stop offset="100%" stop-color="#ffc89a"/>
            </linearGradient>
            <linearGradient id="tsingCloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="55%" stop-color="#F1F5FB"/>
              <stop offset="100%" stop-color="#C4D2E2"/>
            </linearGradient>
            <linearGradient id="tsingOceanScene" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e6bb0"/>
              <stop offset="100%" stop-color="#0a3d6b"/>
            </linearGradient>
            <marker id="tsingArrowDot" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 1 9 L 5 1 L 9 9 Z" fill="#0284C7"/>
            </marker>
          </defs>

          <!-- Sky backgrounds (one of two visible at any time) -->
          <rect class="tsing-scene-elem" id="tsingBgClear" width="800" height="380" fill="url(#tsingSkyClear)" opacity="1"/>
          <rect class="tsing-scene-elem" id="tsingBgUnstable" width="800" height="380" fill="url(#tsingSkyUnstable)" opacity="0"/>

          <!-- Ground (always) -->
          <rect x="0" y="380" width="800" height="70" fill="#5fa84e"/>
          <path d="M0 380 Q 80 374, 160 380 T 320 380 T 480 380 T 640 380 T 800 380 L 800 384 L 0 384 Z" fill="#4d8a3f" opacity="0.55"/>

          <!-- Ocean (when vapor on) -->
          <g class="tsing-scene-elem" id="tsingOceanGroup">
            <path d="M 0 360 Q 80 354, 160 360 T 320 360 T 480 360 T 640 360 T 800 360 L 800 380 L 0 380 Z" fill="url(#tsingOceanScene)"/>
            <path d="M 0 364 Q 80 360, 160 364 T 320 364 T 480 364 T 640 364 T 800 364 L 800 368 L 0 368 Z" fill="#3a86c4" opacity="0.6"/>
          </g>

          <!-- Vapor streams (vapor-on, no full success) -->
          <g class="tsing-scene-elem" id="tsingVaporGroup" opacity="0">
            <g stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7">
              <path class="tsing-vapor-stream" style="animation-delay:0s"   d="M 220 360 Q 210 320, 220 280 Q 232 240, 220 200 Q 212 170, 220 140"/>
              <path class="tsing-vapor-stream" style="animation-delay:0.7s" d="M 400 360 Q 390 320, 400 280 Q 412 240, 400 200 Q 392 170, 400 140"/>
              <path class="tsing-vapor-stream" style="animation-delay:1.4s" d="M 580 360 Q 570 320, 580 280 Q 592 240, 580 200 Q 572 170, 580 140"/>
            </g>
          </g>

          <!-- Dry rising arrows (lift on, vapor off) -->
          <g class="tsing-scene-elem" id="tsingDryRiseGroup" opacity="0" stroke="#0284C7" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="6 6" stroke-opacity="0.7">
            <path d="M 260 360 L 260 140" marker-end="url(#tsingArrowDot)"/>
            <path d="M 400 360 L 400 110" marker-end="url(#tsingArrowDot)"/>
            <path d="M 540 360 L 540 140" marker-end="url(#tsingArrowDot)"/>
          </g>

          <!-- Shallow stratus (vapor + lift, unstable off) -->
          <g class="tsing-scene-elem" id="tsingStratusGroup" opacity="0">
            <g fill="#dde6f0" stroke="#92a3bd" stroke-width="1" stroke-linejoin="round" opacity="0.92">
              <ellipse cx="220" cy="296" rx="80" ry="14"/>
              <ellipse cx="340" cy="290" rx="86" ry="13"/>
              <ellipse cx="460" cy="298" rx="90" ry="14"/>
              <ellipse cx="580" cy="292" rx="76" ry="12"/>
              <ellipse cx="160" cy="300" rx="58" ry="11"/>
              <ellipse cx="660" cy="300" rx="62" ry="11"/>
            </g>
          </g>

          <!-- Lift arrow stack (right side, when lift on) -->
          <g class="tsing-scene-elem" id="tsingLiftGroup" opacity="0">
            <g class="tsing-lift-arrow" transform="translate(680, 0)">
              <path d="M -16 380 L -16 320 L -28 320 L 0 280 L 28 320 L 16 320 L 16 380 Z" fill="#1d4a8a" stroke="#0C1B33" stroke-width="1.4" stroke-linejoin="round" opacity="0.85"/>
              <path d="M -10 380 L -10 340 L -18 340 L 0 316 L 18 340 L 10 340 L 10 380 Z" fill="#38BDF8" stroke="#0C1B33" stroke-width="1" stroke-linejoin="round" opacity="0.92"/>
            </g>
          </g>

          <!-- Towering cumulus (success) — IDENTICAL silhouette to lifecycle Stage 1 -->
          <g class="tsing-scene-elem" id="tsingSuccessCloud" opacity="0">
            <path d="${successCumulus}" fill="url(#tsingCloud)" stroke="#0C1B33" stroke-width="2.5" stroke-linejoin="round"/>
          </g>
        </svg>
      </div>

      <div class="tsing-result__verdict">
        <span class="tsing-result__chip" id="tsingResultChip" data-tone="success">
          <span class="tsing-chip-dot"></span>
          <span id="tsingChipText">Thunderstorm forms</span>
        </span>
        <span class="tsing-result__count" id="tsingResultCount">3 / 3 ingredients</span>
      </div>
      <div class="tsing-result__caption">
        <span id="tsingResultCaption">All three ingredients present — moist, unstable air is lifted and a towering cumulus builds. The cell can develop into a thunderstorm.</span>
        <span class="tsing-result__cite">FAA-H-8083-28B · Chapter 22 — Thunderstorm Ingredients</span>
      </div>
    </div>
  </div>

  <p class="tsing-footer">
    A thunderstorm needs <strong>all three</strong> ingredients — water vapor, unstable air, and lift. Remove any one and convection cannot mature into a storm.
    <span class="tsing-footer__cite">FAA-H-8083-28B · Chapter 22</span>
  </p>
</div>`;
  },

  // Interactive init for the ingredients module. Idempotent via dataset.tsingInit.
  // Wires toggle inputs + card-body taps; renders the appropriate scene state for
  // each of the 8 ingredient combos.
  _initTsIngredientsModule() {
    const root = document.getElementById('tsingModule');
    if (!root || root.dataset.tsingInit === 'done') return;
    root.dataset.tsingInit = 'done';

    const state = { vapor: true, unstable: true, lift: true };
    const inputs = root.querySelectorAll('input[data-toggle]');
    const cards = root.querySelectorAll('.tsing-card[data-ingredient]');
    const pills = {
      vapor: root.querySelector('#tsingPillVapor'),
      unstable: root.querySelector('#tsingPillUnstable'),
      lift: root.querySelector('#tsingPillLift')
    };
    const sceneEls = {
      bgClear:        root.querySelector('#tsingBgClear'),
      bgUnstable:     root.querySelector('#tsingBgUnstable'),
      ocean:          root.querySelector('#tsingOceanGroup'),
      vapor:          root.querySelector('#tsingVaporGroup'),
      dryRise:        root.querySelector('#tsingDryRiseGroup'),
      stratus:        root.querySelector('#tsingStratusGroup'),
      lift:           root.querySelector('#tsingLiftGroup'),
      successCloud:   root.querySelector('#tsingSuccessCloud')
    };
    const chip = root.querySelector('#tsingResultChip');
    const chipText = root.querySelector('#tsingChipText');
    const resultCaption = root.querySelector('#tsingResultCaption');
    const resultCount = root.querySelector('#tsingResultCount');

    function evaluate(s) {
      const v = s.vapor, u = s.unstable, l = s.lift;
      if (v && u && l) return {
        caption: 'All three ingredients present — moist, unstable air is lifted and a towering cumulus builds. The cell can develop into a thunderstorm.',
        chip: 'Thunderstorm forms', tone: 'success',
        scene: { unstableBg: true, ocean: true, vapor: false, dryRise: false, stratus: false, lift: true, success: true }
      };
      if (!v && u && l) return {
        caption: 'Without moisture, only dry convection — air is lifted in an unstable atmosphere but no cloud can form.',
        chip: 'No cloud', tone: 'warn',
        scene: { unstableBg: true, ocean: false, vapor: false, dryRise: true, stratus: false, lift: true, success: false }
      };
      if (v && !u && l) return {
        caption: 'Without instability, rising air sinks back down. Moisture is lifted but only thin, shallow stratus forms — no convective growth.',
        chip: 'Shallow cloud', tone: 'warn',
        scene: { unstableBg: false, ocean: true, vapor: false, dryRise: false, stratus: true, lift: true, success: false }
      };
      if (v && u && !l) return {
        caption: 'Without a trigger, the ingredients sit unused. Moisture and an unstable atmosphere are present, but nothing initiates convection.',
        chip: 'No trigger', tone: 'warn',
        scene: { unstableBg: true, ocean: true, vapor: true, dryRise: false, stratus: false, lift: false, success: false }
      };
      if (!v && !u && l) return {
        caption: 'Lift acts on dry, stable air — no moisture to condense and no instability to sustain rising parcels. No storm forms.',
        chip: 'Dry & stable', tone: 'muted',
        scene: { unstableBg: false, ocean: false, vapor: false, dryRise: true, stratus: false, lift: true, success: false }
      };
      if (!v && u && !l) return {
        caption: 'The atmosphere is unstable and dry, but nothing triggers it — convection never initiates.',
        chip: 'Latent only', tone: 'muted',
        scene: { unstableBg: true, ocean: false, vapor: false, dryRise: false, stratus: false, lift: false, success: false }
      };
      if (v && !u && !l) return {
        caption: 'Moisture is present but the air is stable and untriggered — at most, calm haze and low cloud, no storm activity.',
        chip: 'Calm & moist', tone: 'muted',
        scene: { unstableBg: false, ocean: true, vapor: false, dryRise: false, stratus: false, lift: false, success: false }
      };
      return {
        caption: 'Clear, calm conditions — no thunderstorm activity is possible without any of the required ingredients.',
        chip: 'Clear & calm', tone: 'muted',
        scene: { unstableBg: false, ocean: false, vapor: false, dryRise: false, stratus: false, lift: false, success: false }
      };
    }

    function setOpacity(el, v) { if (el) el.setAttribute('opacity', v ? '1' : '0'); }

    function render() {
      const r = evaluate(state);
      cards.forEach(c => {
        const k = c.getAttribute('data-ingredient');
        c.setAttribute('data-on', state[k] ? 'true' : 'false');
      });
      Object.keys(pills).forEach(k => { pills[k].textContent = state[k] ? 'On' : 'Off'; });

      chipText.textContent = r.chip;
      chip.setAttribute('data-tone', r.tone);
      const on = (state.vapor?1:0) + (state.unstable?1:0) + (state.lift?1:0);
      resultCount.textContent = on + ' / 3 ingredients';
      resultCaption.textContent = r.caption;

      setOpacity(sceneEls.bgClear, !r.scene.unstableBg);
      setOpacity(sceneEls.bgUnstable, r.scene.unstableBg);
      setOpacity(sceneEls.ocean, r.scene.ocean);
      setOpacity(sceneEls.vapor, r.scene.vapor);
      setOpacity(sceneEls.dryRise, r.scene.dryRise);
      setOpacity(sceneEls.stratus, r.scene.stratus);
      setOpacity(sceneEls.lift, r.scene.lift);
      setOpacity(sceneEls.successCloud, r.scene.success);
    }

    inputs.forEach(i => {
      i.addEventListener('change', () => {
        state[i.getAttribute('data-toggle')] = i.checked;
        render();
      });
    });
    cards.forEach(c => {
      c.addEventListener('click', e => {
        if (e.target.closest('.tsing-toggle-tap')) return;
        const k = c.getAttribute('data-ingredient');
        const input = c.querySelector(`input[data-toggle="${k}"]`);
        input.checked = !input.checked;
        state[k] = input.checked;
        render();
      });
    });

    render();
  },

  // ===== ACT 2 DIAGRAMS =====
  // (cbIngredients + showCBInfo were removed in the M6 §s6_1 redesign. The
  // section's diagram is now type:'hotspot', key:'thunderstorm_ingredients',
  // dispatched through renderHotspot() and _initTsIngredientsModule.)

  // FAA-H-8083-28B Ch 19 — turbulence types by mechanism. The four figures
  // below cover the four mechanisms the FAA splits into separate diagrams.
  // Clear Air Turbulence is handled in m8/s8_3 (text + jet-stream context),
  // not represented here — the FAA itself doesn't combine CAT with the
  // mechanism-type figures.
  turbulenceSources(){
    const figs = [
      { fig:'19-1', src:'awh_p0237_img_001.png', title:'Convective',                  caption:'Thermals from solar heating of the surface. Most active on warm summer afternoons. Cumuliform clouds mark the top; air above is generally smooth.' },
      { fig:'19-4', src:'awh_p0239_img_002.png', title:'Mechanical',                  caption:'Eddies from buildings, trees, and terrain disrupting smooth flow. Intensity scales with wind speed × surface roughness.' },
      { fig:'19-5', src:'awh_p0240_img_001.png', title:'Wind Shear',                  caption:'Sudden change of wind speed or direction across a short distance. Common at frontal boundaries, jet edges, and outflow boundaries.' },
      { fig:'19-6', src:'awh_p0241_img_001.png', title:'Wind Shear with Inversion',   caption:'A temperature inversion can trap a shear layer between calm cold air below and stronger flow above — common at the top of nocturnal radiation inversions.' },
    ];
    const cells = figs.map(f => this.renderFaaFigure({
      src: `img/awh/${f.src}`,
      figureNumber: f.fig,
      title: f.title,
      caption: f.caption,
      alt: `FAA-H-8083-28B Figure ${f.fig}: ${f.title} turbulence`,
    })).join('');
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">💥 Turbulence Sources — FAA Handbook Ch 19</span></div>
    <div style="background:#F8FAFC;padding:14px">
      <p style="font-size:13px;color:#475569;margin:0 0 10px;line-height:1.6">The four mechanism types covered by FAA-H-8083-28B Chapter 19. <strong>Clear Air Turbulence (CAT)</strong> is treated separately in the lesson section that follows, alongside its jet-stream context.</p>
      <div class="faa-fig-grid cols-2">${cells}</div>
    </div></div>`;
  },

  // FAA-H-8083-28B Ch 18 — five fog formation diagrams. The section's lesson
  // body in m9/s9_2 already carries five characteristic cards (when each
  // forms, what wind speeds favor it, where it commonly occurs); these
  // formation figures complement that operational summary by showing the
  // *mechanism* visually. Note: the prior fogTypes SVG only had four tiles
  // (frontal fog was missing); this swap adds it back as Fig 18-8.
  fogTypes(){
    const figs = [
      { fig:'18-1', src:'awh_p0225_img_001.png', title:'Radiation Fog',                    caption:'Clear-sky nighttime cooling: surface radiates heat away, the shallow moist layer above cools to its dewpoint. Calm-to-light wind essential — calm leaves no mixing, >5 kt disperses.' },
      { fig:'18-5', src:'awh_p0228_img_001.png', title:'Advection Fog',                    caption:'Warm moist air moves horizontally over a cooler surface and is chilled below its dewpoint. Classic California-coast pattern. Deepens with wind to ~15 kt; stronger wind lifts to low stratus.' },
      { fig:'18-7', src:'awh_p0229_img_001.png', title:'Upslope Fog',                      caption:'Moist stable air cooled adiabatically as it lifts up terrain. Forms even under overcast. Common on the eastern slopes of the Rockies and Appalachians; can extend to high elevations.' },
      { fig:'18-8', src:'awh_p0230_img_001.png', title:'Frontal Fog',                      caption:'Warm rain or drizzle falls through colder air below a warm front, evaporating and saturating that cold layer. Continuous fog from ground through the cloud above.' },
      { fig:'18-9', src:'awh_p0231_img_001.png', title:'Steam Fog',                        caption:'Very cold air over warmer water — water evaporates into the cold air and immediately recondenses as visible steam wisps. Shallow and unstable; expect light turbulence flying through it.' },
    ];
    const cells = figs.map(f => this.renderFaaFigure({
      src: `img/awh/${f.src}`,
      figureNumber: f.fig,
      title: f.title,
      caption: f.caption,
      alt: `FAA-H-8083-28B Figure ${f.fig}: ${f.title} formation`,
    })).join('');
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">🌫️ Fog Formation — FAA Handbook Ch 18</span></div>
    <div style="background:#F8FAFC;padding:14px">
      <p style="font-size:13px;color:#475569;margin:0 0 10px;line-height:1.6">Five formation mechanisms covered by FAA-H-8083-28B Chapter 18. Each figure shows how that fog type physically develops; the operational characteristics (when, where, and what wind speeds favor each) are in the cards in the section above.</p>
      <div class="faa-fig-grid cols-2-3">${cells}</div>
    </div></div>`;
  },

  // ── NEW: MICROBURST APPROACH DIAGRAM ───────────────────────
  microburstApproach(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">💨 Microburst on Approach — Tap Each Phase</span></div>
    <div style="background:#F0F9FF">
      <div style="display:flex;justify-content:center;gap:6px;padding:14px;flex-wrap:wrap">
        ${['Headwind Phase','Downdraft Phase','Tailwind Phase','Recovery (if possible)'].map((s,i)=>`
        <button onclick="Diagrams.showMicroburstPhase(${i})" id="mb-btn-${i}" style="padding:8px 14px;border-radius:12px;border:2px solid ${i===0?'#DC2626':'#E2E8F0'};background:${i===0?'#FEF2F2':'white'};font-family:var(--font-display);font-size:12px;font-weight:700;cursor:pointer;color:${i===0?'#DC2626':'#94A3B8'}">${['⬆️','⬇️','💨','🚨'][i]} ${s}</button>`).join('')}
      </div>
      <svg id="mb-svg" viewBox="0 0 380 180" style="width:100%;display:block;background:linear-gradient(180deg,#BAE6FD 0%,#7DD3FC 50%,#D9F99D 100%)"></svg>
      <div id="mb-desc" style="padding:14px 16px;background:var(--navy);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6">
        <strong style="color:#F43F5E;display:block;margin-bottom:4px">Phase 1 — Headwind (Initial)</strong>
        Aircraft on approach encounters increasing headwind from the microburst outflow. Airspeed INCREASES by 10-20 kt. Pilot may reduce power to maintain approach speed — this is the dangerous trap. The glidepath appears normal or high.
      </div>
    </div></div>`;
  },

  showMicroburstPhase(n){
    document.querySelectorAll('[id^=mb-btn-]').forEach((b,i)=>{b.style.borderColor=i===n?'#DC2626':'#E2E8F0';b.style.background=i===n?'#FEF2F2':'white';b.style.color=i===n?'#DC2626':'#94A3B8'});
    const svg=document.getElementById('mb-svg');
    const desc=document.getElementById('mb-desc');
    const phases=[
      {
        svg:`<rect width="380" height="180" fill="url(#skyG)"/>
          <defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#BAE6FD"/><stop offset="70%" stop-color="#7DD3FC"/><stop offset="100%" stop-color="#D9F99D"/></linearGradient></defs>
          <!-- Runway -->
          <rect x="300" y="140" width="70" height="8" fill="#94A3B8"/>
          <rect x="320" y="143" width="30" height="2" fill="white" opacity=".5"/>
          <!-- Normal glidepath -->
          <line x1="20" y1="40" x2="320" y2="148" stroke="rgba(255,255,255,.3)" stroke-width="1" stroke-dasharray="6,4"/>
          <!-- Aircraft above path slightly -->
          <text x="60" y="52" font-size="20" text-anchor="middle">✈️</text>
          <!-- Headwind arrows -->
          <defs><marker id="hw" markerWidth="6" markerHeight="4" refX="0" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#10B981"/></marker></defs>
          ${[150,190,230].map(x=>`<line x1="${x+25}" y1="100" x2="${x}" y2="100" stroke="#10B981" stroke-width="2.5" marker-end="url(#hw)"/>`).join('')}
          <text x="190" y="85" text-anchor="middle" font-family="Nunito" font-size="11" fill="#10B981" font-weight="800">HEADWIND ↑ airspeed</text>
          <!-- Microburst cell -->
          <ellipse cx="190" cy="30" rx="50" ry="20" fill="rgba(30,30,60,.5)" stroke="rgba(99,102,241,.5)" stroke-width="2"/>
          <text x="190" y="34" text-anchor="middle" font-family="Nunito" font-size="10" fill="white">MICROBURST</text>`,
        title:'Phase 1 — Headwind (Initial)',
        text:'Increasing headwind from microburst outflow. Airspeed INCREASES 10-20 kt. Glidepath appears normal or high. Pilot naturally reduces power — this is the trap. Any sudden airspeed increase near convective weather should trigger go-around consideration immediately.'
      },
      {
        svg:`<rect width="380" height="180" fill="url(#skyG2)"/>
          <defs><linearGradient id="skyG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#BAE6FD"/><stop offset="70%" stop-color="#7DD3FC"/><stop offset="100%" stop-color="#D9F99D"/></linearGradient>
          <marker id="dd" markerWidth="6" markerHeight="4" refX="0" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#EF4444"/></marker></defs>
          <rect x="300" y="140" width="70" height="8" fill="#94A3B8"/>
          <!-- Normal glidepath -->
          <line x1="20" y1="40" x2="320" y2="148" stroke="rgba(255,255,255,.3)" stroke-width="1" stroke-dasharray="6,4"/>
          <!-- Aircraft being pushed down -->
          <text x="155" y="115" font-size="20" text-anchor="middle">✈️</text>
          <!-- Downdraft arrows -->
          ${[150,180,210].map(x=>`<line x1="${x}" y1="55" x2="${x}" y2="85" stroke="#EF4444" stroke-width="2.5" marker-end="url(#dd)"/>`).join('')}
          <text x="180" y="48" text-anchor="middle" font-family="Nunito" font-size="11" fill="#EF4444" font-weight="800">DOWNDRAFT — glidepath steepens</text>
          <ellipse cx="190" cy="30" rx="50" ry="20" fill="rgba(30,30,60,.5)"/>`,
        title:'Phase 2 — Downdraft',
        text:'Strong downward column of air (>3,000 fpm possible) pushes aircraft below the glidepath. Sink rate increases dramatically. Airspeed begins dropping. The aircraft appears to be "falling through" the approach. Gear and flap drag add to the problem.'
      },
      {
        svg:`<rect width="380" height="180" fill="url(#skyG3)"/>
          <defs><linearGradient id="skyG3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#BAE6FD"/><stop offset="70%" stop-color="#7DD3FC"/><stop offset="100%" stop-color="#D9F99D"/></linearGradient>
          <marker id="tw" markerWidth="6" markerHeight="4" refX="0" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#F97316"/></marker></defs>
          <rect x="300" y="140" width="70" height="8" fill="#94A3B8"/>
          <line x1="20" y1="40" x2="320" y2="148" stroke="rgba(255,255,255,.3)" stroke-width="1" stroke-dasharray="6,4"/>
          <!-- Aircraft far below path heading to ground short of runway -->
          <text x="230" y="148" font-size="20" text-anchor="middle">✈️</text>
          <!-- Tailwind arrows pushing from behind -->
          ${[160,200,240].map(x=>`<line x1="${x}" y1="130" x2="${x+25}" y2="130" stroke="#F97316" stroke-width="2.5" marker-end="url(#tw)"/>`).join('')}
          <text x="200" y="118" text-anchor="middle" font-family="Nunito" font-size="11" fill="#F97316" font-weight="800">TAILWIND — airspeed COLLAPSES</text>
          <!-- Ground short of runway indicator -->
          <rect x="240" y="152" width="55" height="5" fill="#EF4444" opacity=".7"/>
          <text x="268" y="168" text-anchor="middle" font-family="Nunito" font-size="9" fill="#EF4444" font-weight="800">SHORT OF RUNWAY</text>`,
        title:'Phase 3 — Tailwind (Most Dangerous)',
        text:'Aircraft exits the downdraft and encounters a tailwind. Airspeed COLLAPSES — 30-90 kt total swing possible. Lift decreases catastrophically. Aircraft drops below glidepath and may contact terrain short of the runway threshold. Recovery may be impossible at this stage if power was previously reduced.'
      },
      {
        svg:`<rect width="380" height="180" fill="url(#skyG4)"/>
          <defs><linearGradient id="skyG4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#BAE6FD"/><stop offset="70%" stop-color="#7DD3FC"/><stop offset="100%" stop-color="#D9F99D"/></linearGradient></defs>
          <rect x="300" y="140" width="70" height="8" fill="#94A3B8"/>
          <!-- Aircraft climbing away -->
          <text x="80" y="60" font-size="20" text-anchor="middle" transform="rotate(-15 80 60)">✈️</text>
          <line x1="50" y1="80" x2="120" y2="45" stroke="#10B981" stroke-width="3" stroke-dasharray="5,3"/>
          <text x="160" y="50" font-family="Nunito" font-size="12" fill="#10B981" font-weight="900">FULL POWER — GO AROUND</text>
          <text x="160" y="65" font-family="Nunito" font-size="11" fill="white">Max pitch — climb away from terrain</text>
          <!-- Warning box -->
          <rect x="10" y="100" width="360" height="50" rx="8" fill="rgba(239,68,68,.15)" stroke="#EF4444" stroke-width="1.5"/>
          <text x="190" y="120" text-anchor="middle" font-family="Nunito" font-size="11" fill="#EF4444" font-weight="800">⚠️ Recovery only possible if initiated EARLY</text>
          <text x="190" y="136" text-anchor="middle" font-family="Nunito" font-size="10" fill="#94A3B8">Any sudden airspeed INCREASE near convective wx → go-around NOW</text>`,
        title:'Recovery — Must Initiate Early',
        text:'If go-around is initiated during Phase 1 (headwind/airspeed increase): max power, climb pitch, retract gear/flaps per procedure. Recovery becomes increasingly impossible through Phases 2 and 3. The rule: any unexpected airspeed increase near convective weather = immediate go-around. Do not wait to diagnose the cause.'
      }
    ];
    const p=phases[n];
    svg.innerHTML=p.svg;
    desc.innerHTML=`<strong style="color:#F43F5E;display:block;margin-bottom:4px">${p.title}</strong>${p.text}`;
  },

  // ── NEW: ICING SEVERITY CALCULATOR ────────────────────────
  icingSeverityCalc(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">🧊 Icing Risk Calculator — Adjust Conditions</span></div>
    <div style="padding:18px;background:#F0F9FF">
      <div style="display:grid;gap:14px;margin-bottom:18px">
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Outside Air Temperature (OAT)</label>
            <span id="ic-oat-val" style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:#0EA5E9">-8°C</span>
          </div>
          <input type="range" id="ic-oat" min="-40" max="5" step="1" value="-8" style="width:100%;accent-color:#0EA5E9" oninput="Diagrams.calcIcingRisk()">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:9px;color:#CBD5E1;margin-top:3px"><span>-40°C</span><span>-20°C</span><span>-10°C</span><span>0°C</span><span>+5°C</span></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Cloud Type</label>
            <span id="ic-cloud-label" style="font-family:var(--font-display);font-size:13px;font-weight:700;color:#6366F1">Stratiform</span>
          </div>
          <input type="range" id="ic-cloud" min="0" max="2" step="1" value="1" style="width:100%;accent-color:#6366F1" oninput="Diagrams.calcIcingRisk()">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-display);font-size:11px;color:#94A3B8;margin-top:3px"><span>Clear Air</span><span>Stratiform</span><span>Cumuliform</span></div>
        </div>
      </div>
      <div id="ic-result" style="border-radius:16px;padding:18px;text-align:center;transition:all .3s;background:#E0F2FE;border:2px solid #0EA5E9">
        <div id="ic-severity" style="font-family:var(--font-display);font-size:28px;font-weight:900;color:#0284C7;margin-bottom:6px">LIGHT</div>
        <div id="ic-type" style="font-size:13px;font-weight:700;font-family:var(--font-display);color:#0369A1;margin-bottom:8px"></div>
        <div id="ic-action" style="font-size:12px;color:#475569;line-height:1.5"></div>
      </div>
      <div style="margin-top:14px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;font-size:10px;text-align:center">
        ${[['TRACE','Sublimation','#94A3B8','#F1F5F9'],['LIGHT','Use deice','#38BDF8','#E0F2FE'],['MOD','Divert','#F59E0B','#FEF3C7'],['SEVERE','EMERGENCY','#EF4444','#FEF2F2']].map(([s,d,c,bg])=>`
        <div style="background:${bg};border-radius:8px;padding:6px 2px;border-top:3px solid ${c}">
          <div style="font-family:var(--font-display);font-weight:900;font-size:11px;color:${c}">${s}</div>
          <div style="color:#64748B;margin-top:1px">${d}</div>
        </div>`).join('')}
      </div>
    </div></div>`;
  },

  calcIcingRisk(){
    const oat=parseInt(document.getElementById('ic-oat').value);
    const cloud=parseInt(document.getElementById('ic-cloud').value);
    const cloudLabels=['Clear Air','Stratiform','Cumuliform'];
    document.getElementById('ic-oat-val').textContent=oat+'°C';
    document.getElementById('ic-cloud-label').textContent=cloudLabels[cloud];
    let severity,type,action,color,bg;
    // No icing: clear air or too cold
    if(cloud===0){severity='NONE';type='No supercooled water in clear air';action='No structural icing expected. Engine/carb icing possible below +10°C in moist air.';color='#10B981';bg='#ECFDF5'}
    else if(oat<-30){severity='TRACE';type='Mostly ice crystals — limited liquid water';action='At -30°C and below, clouds are mostly ice crystals. Structural icing unlikely but possible in strong updrafts (CBs). Monitor.';color='#94A3B8';bg='#F1F5F9'}
    else if(oat<=-20){severity='LIGHT';type=cloud===2?'Rime likely — upper cumuliform levels':'Rime likely — stratiform upper layer';action='Occasional use of deicing/anti-icing equipment removes accumulation. Monitor closely. Plan exit strategy.';color='#38BDF8';bg='#E0F2FE'}
    else if(oat>=-15&&oat<=-8){severity='MODERATE';type=cloud===2?'Mixed or Clear ice — HIGH RISK ZONE':'Mixed icing — peak occurrence zone';action='Deicing/anti-icing required. Plan to exit icing: stratiform layers typically 3,000-4,000 ft thick — climb or descend. If equipment ineffective, declare emergency and divert.';color='#F59E0B';bg='#FEF3C7'}
    else if(oat>-8&&oat<=0){severity='MODERATE–SEVERE';type=cloud===2?'Clear ice — SLD risk near 0°C':'Clear or mixed ice — large droplets possible';action='Conditions near 0°C produce the most hazardous clear icing. SLD (freezing rain/drizzle) risk. Ice may accrete beyond deicing equipment coverage. Immediate diversion planning required.';color='#F97316';bg='#FFF7ED'}
    else{severity='NONE';type='Above freezing — no structural icing';action='OAT above 0°C — no structural icing. Note: cold-soaked airframe can still accumulate ice if airframe temp < 0°C after cold flight.';color='#10B981';bg='#ECFDF5'}
    if(cloud===2&&oat>=-20&&oat<=0&&severity!=='NONE'){severity='SEVERE (potential)';color='#EF4444';bg='#FEF2F2';action='Cumuliform icing is more intense than stratiform — extends through full cloud depth, possible to -40°C in CBs. SLD risk. Equipment may be overwhelmed. Exit the cloud type, not just the altitude layer.'}
    const res=document.getElementById('ic-result');
    res.style.background=bg;res.style.borderColor=color;
    document.getElementById('ic-severity').style.color=color;
    document.getElementById('ic-severity').textContent=severity;
    document.getElementById('ic-type').style.color=color;
    document.getElementById('ic-type').textContent=type;
    document.getElementById('ic-action').textContent=action;
  },

  // ── NEW: TURBULENCE INTENSITY REFERENCE ───────────────────
  turbulenceScale(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">💥 Turbulence Intensity — Tap Each Level</span></div>
    <div style="background:#F8FAFC">
      <div style="display:grid;grid-template-columns:1fr 1fr">
        ${[
          {level:'LIGHT',emoji:'🟢',color:'#10B981',bg:'linear-gradient(135deg,#ECFDF5,#D1FAE5)',id:'t-lt',desc:'Light'},
          {level:'MODERATE',emoji:'🟡',color:'#F59E0B',bg:'linear-gradient(135deg,#FEF3C7,#FDE68A)',id:'t-mod',desc:'Moderate'},
          {level:'SEVERE',emoji:'🔴',color:'#EF4444',bg:'linear-gradient(135deg,#FFE4E6,#FEE2E2)',id:'t-sev',desc:'Severe'},
          {level:'EXTREME',emoji:'⛔',color:'#7F1D1D',bg:'linear-gradient(135deg,#FEF2F2,#FFE4E6)',id:'t-ext',desc:'Extreme'},
        ].map((t,i)=>`
        <div onclick="Diagrams.showTurbLevel('${t.id}')" style="cursor:pointer;height:80px;background:${t.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;border-right:${i%2===0?'2':'0'}px solid white;border-bottom:${i<2?'2':'0'}px solid white">
          <span style="font-size:22px">${t.emoji}</span>
          <div style="font-family:var(--font-display);font-weight:900;font-size:13px;color:${t.color};margin-top:4px">${t.level}</div>
        </div>`).join('')}
      </div>
      <div id="turb-level-detail" style="padding:16px;background:var(--navy);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6;min-height:80px">
        <div style="color:#94A3B8;text-align:center;padding:16px">↑ Tap a turbulence level to see FAA definition and pilot actions</div>
      </div>
    </div></div>`;
  },

  showTurbLevel(id){
    const data={
      't-lt':{color:'#10B981',title:'🟢 LIGHT Turbulence',text:'Slight, erratic changes in altitude and/or attitude (pitch, roll, yaw). Or rhythmic bumpiness without appreciable altitude changes (Light Chop). Occupants feel slight strain against seatbelts. Unsecured objects may move. Food service possible with care. PIREP: report as "Light Turbulence" or "Light Chop". No structural concern. Standard seatbelt-on policy applies.'},
      't-mod':{color:'#F59E0B',title:'🟡 MODERATE Turbulence',text:'Similar to Light but of greater intensity. Changes in altitude and/or attitude but aircraft remains in positive control at all times. Variations in IAS. Occupants feel definite strains against seatbelts; unsecured objects are dislodged. Food and drink service is difficult. Walking is difficult. PIREP: report immediately. Slowdown to Va recommended. Announce to passengers.'},
      't-sev':{color:'#EF4444',title:'🔴 SEVERE Turbulence',text:'Causes LARGE, abrupt changes in altitude and/or attitude. Large variations in IAS. Aircraft may be momentarily out of control. Occupants forced violently against seatbelts. Unsecured objects are tossed about. Walking is impossible. PIREP: file immediately as UUA if SEV or EXTRM. Slow to Va IMMEDIATELY. Secure cabin. Consider diversion. May cause structural damage.'},
      't-ext':{color:'#7F1D1D',title:'⛔ EXTREME Turbulence',text:'Aircraft is violently tossed about and is practically impossible to control. May cause structural damage or failure. Rare — associated with severe thunderstorms, mountain wave rotors, and extreme wind shear events. File UUA PIREP immediately. Declare emergency if needed. Do not attempt to maintain altitude — hold attitude. Slow to Va or below maneuvering speed immediately. Avoid all known extreme turbulence areas.'},
    };
    const d=data[id];
    document.getElementById('turb-level-detail').innerHTML=`<strong style="color:${d.color};display:block;margin-bottom:6px">${d.title}</strong>${d.text}`;
  },

  // ── NEW: FOG FORMATION CALCULATOR ─────────────────────────
  fogFormationCalc(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">🌫️ Fog Formation Risk — Adjust Conditions</span></div>
    <div style="padding:18px;background:#F8FAFC">
      <div style="display:grid;gap:14px;margin-bottom:18px">
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Temperature–Dewpoint Spread</label>
            <span id="fg-spread-val" style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:#7C3AED">2°C</span>
          </div>
          <input type="range" id="fg-spread" min="0" max="15" step="1" value="2" style="width:100%;accent-color:#7C3AED" oninput="Diagrams.calcFogRisk()">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:9px;color:#CBD5E1;margin-top:3px"><span>0°C (saturated)</span><span>5°C</span><span>10°C</span><span>15°C</span></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Surface Wind</label>
            <span id="fg-wind-label" style="font-family:var(--font-display);font-size:13px;font-weight:700;color:#0284C7">Light (3–5 kt)</span>
          </div>
          <input type="range" id="fg-wind" min="0" max="3" step="1" value="1" style="width:100%;accent-color:#0284C7" oninput="Diagrams.calcFogRisk()">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-display);font-size:11px;color:#94A3B8;margin-top:3px"><span>Calm</span><span>Light 3–5 kt</span><span>Moderate 10–15 kt</span><span>Strong 20+ kt</span></div>
        </div>
      </div>
      <div id="fg-result" style="border-radius:16px;padding:16px;background:#F5F3FF;border:2px solid #7C3AED;transition:all .3s">
        <div id="fg-risk" style="font-family:var(--font-display);font-size:24px;font-weight:900;color:#7C3AED;margin-bottom:6px;text-align:center">HIGH FOG RISK</div>
        <div id="fg-type" style="font-size:13px;font-weight:700;font-family:var(--font-display);color:#4C1D95;margin-bottom:6px;text-align:center"></div>
        <div id="fg-action" style="font-size:12px;color:#475569;line-height:1.6"></div>
      </div>
    </div></div>`;
  },

  calcFogRisk(){
    const spread=parseInt(document.getElementById('fg-spread').value);
    const wind=parseInt(document.getElementById('fg-wind').value);
    const windLabels=['Calm (0 kt)','Light (3–5 kt)','Moderate (10–15 kt)','Strong (20+ kt)'];
    document.getElementById('fg-spread-val').textContent=spread+'°C';
    document.getElementById('fg-wind-label').textContent=windLabels[wind];
    let risk,type,action,color,bg;
    if(spread<=2&&wind<=1){risk='HIGH FOG RISK';type='Radiation/Advection fog likely — check sky cover and surface type';action='T–Td spread ≤2°C with light wind: prime fog formation conditions. Radiation fog likely if sky is clear; advection fog if moist air is moving over the area. Expect IFR ceilings and visibility. Plan alternates. File IFR. Monitor METAR trends.';color='#7C3AED';bg='#F5F3FF'}
    else if(spread<=2&&wind===2){risk='MODERATE FOG RISK';type='Possible stratus or patchy fog — deepening may occur';action='T–Td spread ≤2°C but moderate wind: fog may form in sheltered areas or be lifted to a low stratus layer (BKN or OVC 200-800 ft). Wind >15 kt often disperses radiation fog but can sustain advection fog. Monitor for lowering ceilings.';color='#F59E0B';bg='#FEF3C7'}
    else if(spread<=2&&wind===3){risk='LOW FOG RISK';type='Wind likely disperses fog — expect low stratus instead';action='Strong wind (>15-20 kt) prevents radiation fog formation by mixing the boundary layer. However, moist air may produce widespread low stratus. Expect low BKN/OVC ceiling rather than ground fog. Still potentially IFR.';color='#38BDF8';bg='#E0F2FE'}
    else if(spread<=5){risk='WATCH CONDITIONS';type='Fog possible with further cooling or moisture increase';action='T–Td spread 2-5°C: fog is possible if conditions change. Monitor temperature trend. If overnight cooling continues or precipitation moistens the surface, fog may develop by morning. Plan accordingly.';color='#F59E0B';bg='#FEF3C7'}
    else{risk='LOW FOG RISK';type='Sufficient dew point depression — fog unlikely';action='T–Td spread >5°C: fog formation unlikely under current conditions. Visibility restrictions more likely from haze, smoke, or precipitation if present. Standard planning applies.';color='#10B981';bg='#ECFDF5'}
    const res=document.getElementById('fg-result');
    res.style.background=bg;res.style.borderColor=color;
    document.getElementById('fg-risk').style.color=color;document.getElementById('fg-risk').textContent=risk;
    document.getElementById('fg-type').style.color=color;document.getElementById('fg-type').textContent=type;
    document.getElementById('fg-action').textContent=action;
  },

  // ===== OPERATIONAL PRODUCTS — DECODERS =====
  // METAR Practice — token-tap exploration of a 10-example annotated library
  // (no parser; the library covers the situations a Part-61 student needs to
  // recognize). _metarIdx tracks which library entry is currently shown.
  _metarIdx: 0,

  renderMetarDecoder(){
    const lib = (typeof METAR_LIBRARY !== 'undefined' && METAR_LIBRARY.length) ? METAR_LIBRARY : [SAMPLE_METAR];
    const idx = Math.min(Math.max(this._metarIdx | 0, 0), lib.length - 1);
    const m = lib[idx];
    const pickerOpts = lib.map((entry, i) =>
      `<option value="${i}"${i === idx ? ' selected' : ''}>Example ${i + 1}: ${entry.title}</option>`
    ).join('');
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">📋 METAR Practice — ${lib.length} annotated examples</span></div>
      <div style="padding:16px">
        <div class="metar-picker-controls">
          <select class="metar-picker-select" onchange="Diagrams._setMetarIdx(this.value)" aria-label="Choose METAR example">${pickerOpts}</select>
          <div class="metar-nav-row">
            <button class="metar-nav metar-nav-prev" onclick="Diagrams._setMetarIdx(${(idx - 1 + lib.length) % lib.length})" aria-label="Previous example"><span class="metar-nav-glyph" aria-hidden="true">‹</span><span class="metar-nav-text">← Prev</span></button>
            <button class="metar-nav metar-nav-next" onclick="Diagrams._setMetarIdx(${(idx + 1) % lib.length})" aria-label="Next example"><span class="metar-nav-glyph" aria-hidden="true">›</span><span class="metar-nav-text">Next →</span></button>
          </div>
        </div>
        <div style="font-size:12px;color:#475569;font-family:var(--font-body);margin:0 0 10px 2px;line-height:1.5">${m.summary || ''}</div>
        <div style="background:#0C1B33;border-radius:14px;padding:16px;margin-bottom:14px;font-family:var(--font-mono);font-size:13px;line-height:2;word-break:break-all">
          ${m.tokens.map((t,i)=>`<span class="metar-token" style="background:${t.bg};color:${t.color}" onclick="Diagrams.showMetarToken(${i})">${t.token}</span>`).join(' ')}
        </div>
        <div id="metar-detail" style="background:#F8FAFC;border-radius:14px;padding:16px;min-height:80px;transition:all .2s">
          <div style="color:#94A3B8;font-family:var(--font-display);font-weight:700;font-size:14px;text-align:center;padding:20px 0">↑ Tap any group above to decode it</div>
        </div>
      </div>
    </div>`;
  },

  _setMetarIdx(i){
    const lib = (typeof METAR_LIBRARY !== 'undefined' && METAR_LIBRARY.length) ? METAR_LIBRARY : [SAMPLE_METAR];
    this._metarIdx = Math.min(Math.max(parseInt(i, 10) || 0, 0), lib.length - 1);
    // Re-render in place. The diagram is rendered inside the lesson section's
    // diagram container; find the closest section card and refresh.
    const detail = document.getElementById('metar-detail');
    const card = detail ? detail.closest('div[style*="border-radius:20px"]') : null;
    if (card) card.outerHTML = this.renderMetarDecoder();
  },

  showMetarToken(i){
    const lib = (typeof METAR_LIBRARY !== 'undefined' && METAR_LIBRARY.length) ? METAR_LIBRARY : [SAMPLE_METAR];
    const m = lib[Math.min(Math.max(this._metarIdx | 0, 0), lib.length - 1)];
    const t = m.tokens[i];
    if (!t) return;
    document.querySelectorAll('.metar-token').forEach(el=>el.classList.remove('selected'));
    document.querySelectorAll('.metar-token')[i]?.classList.add('selected');
    document.getElementById('metar-detail').innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap">
        <code style="background:${t.bg};color:${t.color};padding:6px 14px;border-radius:10px;font-family:var(--font-mono);font-size:14px;font-weight:700">${t.token}</code>
        <strong style="font-family:var(--font-display);font-size:16px;color:${t.color}">${t.label}</strong>
      </div>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:0">${t.detail}</p>`;
  },

  // TAF Practice — token-tap exploration of an 8-example annotated library
  // (no parser; each TAF is broken into rows of {kind, groupType, tokens}).
  // _tafIdx tracks which library entry is currently shown.
  // Token clicks use event delegation off the picker container — see
  // _onTafTokenClick — so nested rows + change groups don't need brittle
  // two-index escaping in inline onclick attributes.
  _tafIdx: 0,

  renderTafDecoder(){
    const lib = (typeof TAF_LIBRARY !== 'undefined' && TAF_LIBRARY.length) ? TAF_LIBRARY : [];
    if (!lib.length) return '';
    const idx = Math.min(Math.max(this._tafIdx | 0, 0), lib.length - 1);
    const t = lib[idx];
    const pickerOpts = lib.map((entry, i) =>
      `<option value="${i}"${i === idx ? ' selected' : ''}>Example ${i + 1}: ${entry.title}</option>`
    ).join('');
    const rowsHtml = t.rows.map((row, ri) => {
      const isHeader = row.kind === 'header';
      const groupType = row.groupType || '';
      const cls = isHeader ? 'taf-row taf-row-header' : `taf-row taf-row-change taf-row-${groupType.toLowerCase()}`;
      const marker = isHeader ? '' : `<span class="taf-row-marker" data-group="${groupType}">${groupType}</span>`;
      const tokens = row.tokens.map((tk, ti) => {
        const isKeyword = !isHeader && ti === 0; // first token in a change row is the keyword
        const tokenCls = isKeyword ? 'taf-token taf-token-keyword' : 'taf-token';
        return `<span class="${tokenCls}" data-row="${ri}" data-token="${ti}" style="background:${tk.bg};color:${tk.color}">${tk.token}</span>`;
      }).join(' ');
      return `<div class="${cls}">${marker}<div class="taf-row-tokens">${tokens}</div></div>`;
    }).join('');
    return `<div class="taf-card" style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">📅 TAF Practice — ${lib.length} annotated examples</span></div>
      <div style="padding:16px">
        <div class="taf-picker-controls">
          <select class="taf-picker-select" onchange="Diagrams._setTafIdx(this.value)" aria-label="Choose TAF example">${pickerOpts}</select>
          <div class="taf-nav-row">
            <button class="taf-nav taf-nav-prev" onclick="Diagrams._setTafIdx(${(idx - 1 + lib.length) % lib.length})" aria-label="Previous example"><span class="taf-nav-glyph" aria-hidden="true">‹</span><span class="taf-nav-text">← Prev</span></button>
            <button class="taf-nav taf-nav-next" onclick="Diagrams._setTafIdx(${(idx + 1) % lib.length})" aria-label="Next example"><span class="taf-nav-glyph" aria-hidden="true">›</span><span class="taf-nav-text">Next →</span></button>
          </div>
        </div>
        <div style="font-size:12px;color:#475569;font-family:var(--font-body);margin:0 0 10px 2px;line-height:1.5">${t.summary || ''}</div>
        <div class="taf-rows" onclick="Diagrams._onTafTokenClick(event)">
          ${rowsHtml}
        </div>
        <div id="taf-detail" style="background:#F8FAFC;border-radius:14px;padding:16px;min-height:80px;transition:all .2s">
          <div style="color:#94A3B8;font-family:var(--font-display);font-weight:700;font-size:14px;text-align:center;padding:20px 0">↑ Tap any group above to decode it</div>
        </div>
      </div>
    </div>`;
  },

  _setTafIdx(i){
    const lib = (typeof TAF_LIBRARY !== 'undefined' && TAF_LIBRARY.length) ? TAF_LIBRARY : [];
    if (!lib.length) return;
    this._tafIdx = Math.min(Math.max(parseInt(i, 10) || 0, 0), lib.length - 1);
    // Re-render in place. Find the closest .taf-card and replace it.
    const detail = document.getElementById('taf-detail');
    const card = detail ? detail.closest('.taf-card') : null;
    if (card) card.outerHTML = this.renderTafDecoder();
  },

  // Event-delegated token-tap handler. Reads data-row/data-token from the
  // clicked .taf-token, looks up the entry in TAF_LIBRARY[_tafIdx].rows,
  // and renders its annotation in #taf-detail. Avoids inline two-index
  // onclick escaping.
  _onTafTokenClick(ev){
    const el = ev.target.closest('.taf-token');
    if (!el) return;
    const rowIdx = parseInt(el.getAttribute('data-row'), 10);
    const tokIdx = parseInt(el.getAttribute('data-token'), 10);
    if (!Number.isInteger(rowIdx) || !Number.isInteger(tokIdx)) return;
    const lib = (typeof TAF_LIBRARY !== 'undefined' && TAF_LIBRARY.length) ? TAF_LIBRARY : [];
    if (!lib.length) return;
    const t = lib[Math.min(Math.max(this._tafIdx | 0, 0), lib.length - 1)];
    const row = t.rows[rowIdx];
    const tk = row && row.tokens[tokIdx];
    if (!tk) return;
    document.querySelectorAll('.taf-token').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('taf-detail').innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap">
        <code style="background:${tk.bg};color:${tk.color};padding:6px 14px;border-radius:10px;font-family:var(--font-mono);font-size:14px;font-weight:700">${tk.token}</code>
        <strong style="font-family:var(--font-display);font-size:16px;color:${tk.color}">${tk.label}</strong>
      </div>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:0">${tk.detail}</p>`;
  },

  renderPirepDecoder(){
    const ex='UUA /OV OKC315020 /TM 1423 /FL060 /TP C172 /IC SEV CLR 040-080 /TB LGT /TA M08 /RM UNCONTROLLED ICING';
    const parts=[
      {token:'UUA',color:'#DC2626',bg:'#FEF2F2',label:'Type',detail:'UUA = Urgent PIREP. Triggers: severe/extreme turbulence, severe icing, tornadoes, large hail, LLWS ≥15 kt. Broadcast immediately to all affected traffic. UA = routine PIREP.'},
      {token:'/OV OKC315020',color:'#7C3AED',bg:'#F5F3FF',label:'Location',detail:'At a point 315° (NW) at 20 NM from the Oklahoma City VOR/airport. Location of the phenomenon — not where the aircraft was when filing. Preferred over position alone.'},
      {token:'/TM 1423',color:'#0284C7',bg:'#E0F2FE',label:'Time',detail:'Phenomenon observed at 1423 UTC. Note the age — a 2-hour-old icing PIREP may not reflect current conditions. Fresh PIREPs (<30 min) are most valuable.'},
      {token:'/FL060',color:'#059669',bg:'#ECFDF5',label:'Altitude',detail:'Altitude 6,000 ft MSL. In hundreds of feet. /FLUNKN = unknown altitude. If in a layer, shows the range (e.g., /FL040-080).'},
      {token:'/TP C172',color:'#64748B',bg:'#F8FAFC',label:'Aircraft Type',detail:'Cessna 172. Required for icing and turbulence reports. Affects interpretation: a C172 pilot reporting severe icing means the aircraft may be in danger now. A 737 reporting the same may have deicing handling it.'},
      {token:'/IC SEV CLR 040-080',color:'#0EA5E9',bg:'#E0F2FE',label:'Icing',detail:'Severe clear icing from 4,000 to 8,000 ft MSL. SEV = deicing equipment failing to control. CLR = clear ice (most hazardous type — horns, spread beyond deicing). This triggers a UUA and SIGMET evaluation.'},
      {token:'/TB LGT',color:'#F59E0B',bg:'#FEF3C7',label:'Turbulence',detail:'Light turbulence. Slight erratic altitude/attitude changes. Less critical here than the icing. Turbulence intensity: LGT MOD SEV EXTRM.'},
      {token:'/TA M08',color:'#7C3AED',bg:'#F5F3FF',label:'Temperature',detail:'OAT (Outside Air Temperature) minus 8°C. Confirms temperatures in the prime structural icing range (0 to -20°C). Supports the icing report.'},
      {token:'/RM UNCONTROLLED ICING',color:'#DC2626',bg:'#FEF2F2',label:'Remarks',detail:'Free text. "Uncontrolled icing" means the pilot cannot maintain the aircraft with deicing activated — an immediate emergency situation. This pilot may have declared or be about to declare an emergency.'},
    ];
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:20px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">📻 PIREP Decoder — Tap Each Element</span></div>
      <div style="padding:16px">
        <div style="background:#0C1B33;border-radius:12px;padding:14px;margin-bottom:14px;font-family:var(--font-mono);font-size:12px;line-height:2;word-break:break-all">
          ${parts.map((p,i)=>`<span class="metar-token" style="background:${p.bg};color:${p.color}" onclick="Diagrams.showPirepToken(${i})">${p.token}</span>`).join(' ')}
        </div>
        <div id="pirep-detail" style="background:#F8FAFC;border-radius:12px;padding:14px;min-height:70px">
          <div style="color:#94A3B8;font-family:var(--font-display);font-size:14px;text-align:center;padding:16px 0">↑ Tap any element above to decode it</div>
        </div>
      </div>
    </div>`;
  },

  showPirepToken(i){
    const parts=[
      {token:'UUA',color:'#DC2626',bg:'#FEF2F2',label:'Report Type',detail:'UUA = Urgent PIREP. Issued immediately when: severe/extreme turbulence, severe icing, tornadoes/waterspouts/funnel clouds, large hail (>3/4"), LLWS airspeed change ≥15 kt, volcanic ash. Broadcast to all affected traffic immediately.'},
      {token:'/OV OKC315020',color:'#7C3AED',bg:'#F5F3FF',label:'Location',detail:'Position reference: 315° at 20 NM from OKC. Format: /OV NAVAID[DDD][NNN] where DDD=radial and NNN=distance in NM. Also valid: /OV KJFK (over JFK airport). This is the location of the phenomenon — not the aircraft position when filing.'},
      {token:'/TM 1423',color:'#0284C7',bg:'#E0F2FE',label:'Time',detail:'Phenomenon observed at 1423 UTC. Critical for evaluating relevance — always note the age of a PIREP. Conditions 2+ hours ago may have changed. Fresh PIREPs (within 30-60 min) are most reliable. Icing and turbulence can dissipate or intensify quickly.'},
      {token:'/FL060',color:'#059669',bg:'#ECFDF5',label:'Altitude',detail:'Altitude in hundreds of feet MSL: FL060 = 6,000 ft MSL. UNKN if not known. If a layer: /FL040-080. If during climb/descent, notes DURC or DURD in remarks. Required for icing and turbulence PIREPs.'},
      {token:'/TP C172',color:'#64748B',bg:'#F8FAFC',label:'Aircraft Type',detail:'ICAO aircraft type designator. C172 = Cessna 172 (light single-engine). Required for icing and turbulence PIREPs. A C172 at SEV icing is in serious danger; a B737 may be handling the same conditions fine with its powerful pneumatic deicing. Context matters.'},
      {token:'/IC SEV CLR 040-080',color:'#0EA5E9',bg:'#E0F2FE',label:'Icing',detail:'Format: intensity [type] [altitude]. SEV = deicing equipment FAILS to control. CLR = clear ice (most hazardous — horns form, spreads beyond deicing coverage, transparent). 040-080 = icing layer from 4,000 to 8,000 ft MSL. This combination is an emergency-level report.'},
      {token:'/TB LGT',color:'#F59E0B',bg:'#FEF3C7',label:'Turbulence',detail:'Light turbulence. Slight erratic changes in altitude/attitude. Occupants may feel mild strain against seatbelts. PIREP turbulence scale: LGT MOD SEV EXTRM. MOD or above requires reporting. Chop type also reported: LGT CHOP = rhythmic bumpiness without altitude changes.'},
      {token:'/TA M08',color:'#7C3AED',bg:'#F5F3FF',label:'Temperature',detail:'OAT = -8°C (M = Minus). This is firmly in the prime structural icing range (0 to -20°C, peak at -8 to -12°C). Confirms meteorological conditions support the reported icing. Required when icing is reported.'},
      {token:'/RM UNCONTROLLED ICING',color:'#DC2626',bg:'#FEF2F2',label:'Remarks',detail:'Free text for anything not fitting standard fields. "Uncontrolled icing" = pilot cannot remove or stop ice accumulation with available equipment — aircraft performance is degrading. This often precedes or accompanies an emergency declaration. ATC should query status. Other common remarks: LLWS reports, thunderstorm coverage/movement, volcanic ash.'},
    ];
    const p=parts[i];
    document.querySelectorAll('.metar-token').forEach(el=>el.classList.remove('selected'));
    document.querySelectorAll('.metar-token')[i]?.classList.add('selected');
    document.getElementById('pirep-detail').innerHTML=`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <code style="background:${p.bg};color:${p.color};padding:4px 10px;border-radius:8px;font-family:var(--font-mono);font-size:12px;font-weight:700">${p.token}</code>
        <strong style="font-family:var(--font-display);font-size:14px;color:${p.color}">${p.label}</strong>
      </div>
      <p style="font-size:13px;color:#334155;line-height:1.6;margin:0">${p.detail}</p>`;
  },

  renderRadarGuide(){
    const levels=[
      {dbz:'<26',label:'Light',color:'#86EFAC',textCol:'#064E3B',desc:'Trace to light precipitation. Barely affects flight operations. Green on most scales.'},
      {dbz:'26–40',label:'Moderate',color:'#FDE68A',textCol:'#78350F',desc:'Moderate rain or snow. Some turbulence possible. Yellow on most scales. Begin monitoring.'},
      {dbz:'41–50',label:'Heavy',color:'#F97316',textCol:'#7C2D12',desc:'Heavy rain, possible hail. Significant turbulence likely. Orange-red. Active avoidance.'},
      {dbz:'50+',label:'EXTREME',color:'#EF4444',textCol:'white',desc:'Intense convection. Structural damage risk. Large hail. AVOID by 20 NM. Deep red/magenta.'},
    ];
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">📡 dBZ Radar Intensity Guide — Tap Each Level</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr">
        ${levels.map((l,i)=>`
        <div onclick="Diagrams.showRadarLevel(${i})" style="cursor:pointer;height:90px;background:${l.color};display:flex;flex-direction:column;align-items:center;justify-content:center;border-right:2px solid white;border-bottom:2px solid white">
          <div style="font-family:var(--font-mono);font-weight:700;font-size:16px;color:${l.textCol}">${l.dbz} dBZ</div>
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:${l.textCol}">${l.label}</div>
        </div>`).join('')}
      </div>
      <div id="radar-detail" style="padding:16px;background:#F8FAFC;min-height:70px">
        <div style="color:#94A3B8;font-family:var(--font-display);font-size:14px;text-align:center;padding:12px 0">↑ Tap a dBZ level to see what it means operationally</div>
      </div>
      <div style="padding:12px 16px;background:#FEF3C7;border-top:1px solid #E2E8F0">
        <p style="font-size:12px;color:#92400E;margin:0;font-family:var(--font-display);font-weight:700">⚠️ ALWAYS check the color scale legend — scales vary between providers and apps. A "red" return may mean different dBZ values on different displays.</p>
      </div>
    </div>`;
  },

  showRadarLevel(i){
    const levels=[
      {dbz:'<26 dBZ',label:'Light',color:'#86EFAC',textCol:'#064E3B',detail:'Light precipitation. Drizzle, light rain, or very light snow. Generally not a significant flight hazard from the precipitation itself. However, even light radar returns can hide convective activity — always check the full picture. Green on most scales.'},
      {dbz:'26–40 dBZ',label:'Moderate',color:'#FDE68A',textCol:'#78350F',detail:'Moderate precipitation. Could indicate embedded thunderstorm cells in stratiform areas. Some turbulence possible. Begin route planning around these areas. Yellow/amber on most scales. At the high end (35-40 dBZ), begin treating as a potential convective threat.'},
      {dbz:'41–50 dBZ',label:'Heavy',color:'#F97316',textCol:'#7C2D12',detail:'Heavy precipitation — active convection highly likely. Significant turbulence, icing, and possible hail. Active avoidance required. Orange-red on most scales. Do not penetrate cells showing 41+ dBZ — route planning should maintain ≥20 NM separation in IMC.'},
      {dbz:'50+ dBZ',label:'EXTREME',color:'#EF4444',textCol:'white',detail:'EXTREME intensity. Severe thunderstorm with large hail (often baseball-sized or larger), extreme turbulence capable of structural damage, severe icing, possible tornado. Deep red or magenta on most scales. Absolute avoidance — maintain 20+ NM horizontal and plan to pass behind (upwind side preferred). No penetration of ANY kind.'},
    ];
    const l=levels[i];
    document.getElementById('radar-detail').innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="width:40px;height:40px;border-radius:10px;background:${l.color};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-family:var(--font-mono);font-size:10px;font-weight:700;color:${l.textCol}">${l.dbz.split(' ')[0]}</span>
        </div>
        <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${l.dbz} — ${l.label}</strong>
      </div>
      <p style="font-size:13px;color:#334155;line-height:1.6;margin:0">${l.detail}</p>`;
  },

  // ── NEW: FLIGHT CATEGORY CALCULATOR ──────────────────────────
  renderFlightCategoryCalc(){
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">✈️ Flight Category Calculator — Drag Both Sliders</span></div>
      <div style="padding:20px">
        <div style="display:grid;gap:16px;margin-bottom:20px">
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Ceiling (AGL)</label>
              <span id="fc-ceil-val" style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:#7C3AED">3,500 ft</span>
            </div>
            <input type="range" id="fc-ceil" min="0" max="6000" step="100" value="3500" style="width:100%;accent-color:#7C3AED" oninput="Diagrams.calcFlightCategory()">
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:#CBD5E1;margin-top:4px"><span>0 ft</span><span>500</span><span>1,000</span><span>3,000</span><span>6,000+</span></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <label style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#334155">Visibility</label>
              <span id="fc-vis-val" style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:#0284C7">6 SM</span>
            </div>
            <input type="range" id="fc-vis" min="0" max="10" step="0.25" value="6" style="width:100%;accent-color:#0284C7" oninput="Diagrams.calcFlightCategory()">
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:#CBD5E1;margin-top:4px"><span>0</span><span>1 SM</span><span>3 SM</span><span>5 SM</span><span>&gt;6 SM</span></div>
          </div>
        </div>
        <div id="fc-result" style="border-radius:16px;padding:20px;text-align:center;transition:all .3s">
          <div id="fc-cat" style="font-family:var(--font-display);font-size:32px;font-weight:900;margin-bottom:8px">VFR</div>
          <div id="fc-desc" style="font-size:14px;font-weight:600;font-family:var(--font-display)"></div>
          <div id="fc-rule" style="font-size:13px;color:#64748B;margin-top:8px;font-family:var(--font-mono)"></div>
        </div>
        <div style="margin-top:14px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;font-size:11px;text-align:center">
          ${[['LIFR','<500 ft / <1 SM','#EF4444','#FEF2F2'],['IFR','500-1000 ft / 1-3 SM','#F97316','#FFF7ED'],['MVFR','1000-3000 ft / 3-5 SM','#F59E0B','#FEF3C7'],['VFR','>3000 ft / >5 SM','#10B981','#ECFDF5']].map(([cat,def,col,bg])=>`
          <div style="background:${bg};border-radius:10px;padding:8px 4px;border-top:3px solid ${col}">
            <div style="font-family:var(--font-display);font-weight:900;font-size:13px;color:${col}">${cat}</div>
            <div style="color:#64748B;line-height:1.3;margin-top:2px">${def}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  },

  calcFlightCategory(){
    const ceil=parseInt(document.getElementById('fc-ceil').value);
    const vis=parseFloat(document.getElementById('fc-vis').value);
    document.getElementById('fc-ceil-val').textContent=ceil>=6000?'>6,000 ft':ceil.toLocaleString()+' ft';
    document.getElementById('fc-vis-val').textContent=vis>=10?'>6 SM':vis+' SM';
    let cat,color,bg,desc,rule;
    if(ceil<500||vis<1){cat='LIFR';color='#EF4444';bg='linear-gradient(135deg,#FEF2F2,#FFE4E6)';desc='Low IFR — Extremely restricted conditions';rule='Ceiling <500 ft OR visibility <1 SM'}
    else if(ceil<1000||vis<3){cat='IFR';color='#F97316';bg='linear-gradient(135deg,#FFF7ED,#FEF2F2)';desc='Instrument Flight Rules — IFR clearance required';rule='Ceiling 500-1,000 ft OR visibility 1-3 SM'}
    else if(ceil<3000||vis<5){cat='MVFR';color='#F59E0B';bg='linear-gradient(135deg,#FEF3C7,#FFF7ED)';desc='Marginal VFR — Caution advised for VFR pilots';rule='Ceiling 1,000-3,000 ft OR visibility 3-5 SM'}
    else{cat='VFR';color='#10B981';bg='linear-gradient(135deg,#ECFDF5,#D1FAE5)';desc='Visual Flight Rules — Standard conditions';rule='Ceiling >3,000 ft AGL AND visibility >5 SM'}
    const res=document.getElementById('fc-result');
    res.style.background=bg;res.style.border=`2px solid ${color}`;
    document.getElementById('fc-cat').style.color=color;
    document.getElementById('fc-cat').textContent=cat;
    document.getElementById('fc-desc').style.color=color;
    document.getElementById('fc-desc').textContent=desc;
    document.getElementById('fc-rule').textContent=rule;
  },

  // ── NEW: METAR WEATHER CODE BUILDER ─────────────────────────
  renderWeatherCodeBuilder(){
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">🔤 Present Weather Code Builder — Tap to Build</span></div>
      <div style="padding:16px">
        <p style="font-size:13px;color:#64748B;margin:0 0 14px;font-family:var(--font-display)">Tap one option from each column to build a weather code. Watch the result update below.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">
          <div>
            <div style="font-family:var(--font-display);font-size:11px;font-weight:800;color:#94A3B8;text-transform:uppercase;margin-bottom:8px">Intensity</div>
            ${[['-','Light','#10B981'],['','Moderate','#F59E0B'],['+','Heavy','#EF4444']].map(([code,label,col])=>`
            <div onclick="Diagrams.selectWx('intensity','${code}','${label}',this)" data-group="intensity" data-code="${code}" style="padding:8px 10px;border-radius:10px;border:2px solid #E2E8F0;margin-bottom:4px;cursor:pointer;font-family:var(--font-mono);font-size:13px;font-weight:700;color:${col};transition:all .15s">
              ${code||'(none)'} <span style="font-size:11px;color:#94A3B8;font-family:var(--font-display);font-weight:600">${label}</span>
            </div>`).join('')}
          </div>
          <div>
            <div style="font-family:var(--font-display);font-size:11px;font-weight:800;color:#94A3B8;text-transform:uppercase;margin-bottom:8px">Descriptor</div>
            ${[['','None'],['SH','Shower'],['TS','Tstorm'],['FZ','Freezing'],['BL','Blowing']].map(([code,label])=>`
            <div onclick="Diagrams.selectWx('desc','${code}','${label}',this)" data-group="desc" data-code="${code}" style="padding:8px 10px;border-radius:10px;border:2px solid #E2E8F0;margin-bottom:4px;cursor:pointer;font-family:var(--font-mono);font-size:13px;font-weight:700;color:#7C3AED;transition:all .15s">
              ${code||'(none)'} <span style="font-size:11px;color:#94A3B8;font-family:var(--font-display);font-weight:600">${label}</span>
            </div>`).join('')}
          </div>
          <div>
            <div style="font-family:var(--font-display);font-size:11px;font-weight:800;color:#94A3B8;text-transform:uppercase;margin-bottom:8px">Phenomenon</div>
            ${[['RA','Rain'],['SN','Snow'],['FG','Fog'],['GR','Hail'],['BR','Mist'],['HZ','Haze'],['DZ','Drizzle']].map(([code,label])=>`
            <div onclick="Diagrams.selectWx('phenom','${code}','${label}',this)" data-group="phenom" data-code="${code}" style="padding:8px 10px;border-radius:10px;border:2px solid #E2E8F0;margin-bottom:4px;cursor:pointer;font-family:var(--font-mono);font-size:13px;font-weight:700;color:#0284C7;transition:all .15s">
              ${code} <span style="font-size:11px;color:#94A3B8;font-family:var(--font-display);font-weight:600">${label}</span>
            </div>`).join('')}
          </div>
        </div>
        <div id="wx-result" style="background:#0C1B33;border-radius:14px;padding:16px;text-align:center">
          <div id="wx-code" style="font-family:var(--font-mono);font-size:28px;font-weight:700;color:#38BDF8;margin-bottom:8px">— Select above —</div>
          <div id="wx-meaning" style="font-size:13px;color:#94A3B8;font-family:var(--font-display)"></div>
        </div>
      </div>
    </div>`;
  },

  _wxState:{intensity:'',desc:'',phenom:''},
  selectWx(group,code,label,el){
    this._wxState[group]=code;this._wxState[group+'Label']=label;
    document.querySelectorAll(`[data-group="${group}"]`).forEach(e=>{e.style.background='white';e.style.borderColor='#E2E8F0'});
    el.style.background=group==='intensity'?'#ECFDF5':group==='desc'?'#F5F3FF':'#E0F2FE';
    el.style.borderColor=group==='intensity'?'#10B981':group==='desc'?'#7C3AED':'#0284C7';
    const wx=this._wxState;
    if(!wx.phenom){document.getElementById('wx-code').textContent='Select a phenomenon →';document.getElementById('wx-meaning').textContent='';return}
    const code_str=(wx.intensity||'')+(wx.desc||'')+(wx.phenom||'');
    const iLabel=wx.intensityLabel||'Moderate';const dLabel=wx.descLabel&&wx.desc?wx.descLabel+' ':' ';const pLabel=wx.phenomLabel||'';
    document.getElementById('wx-code').textContent=code_str;
    document.getElementById('wx-meaning').textContent=`${iLabel}${dLabel}${pLabel}`;
  },

  // Pass 2b — Advisory hierarchy redrawn as a 2x2 category grid.
  // Order: Convective SIGMET → SIGMET → CWA → AIRMET (validity-based, not
  // severity). The pyramid metaphor is gone — these advisories cover
  // different domains, not a single severity ladder, so the visual treats
  // them as four parallel cards with distinct color tints.
  // Colors reuse existing palette tokens (--hazard, --product, --emerald,
  // --amber); no new colors introduced. CSS lives in styles.css.
  renderAdvisoryHierarchy(){
    const cards = [
      {
        color:'var(--hazard)', bg:'var(--hazard-light)',
        emoji:'⛈️', name:'Convective SIGMET', code:'WST',
        validity:'Up to 2 hours · issued at H+55, special bulletins (WSTs) as needed',
        coverage:'<strong>Embedded thunderstorms</strong> · severe / extreme convective turbulence · convective surface winds &gt;50 kt · hail ≥3⁄4″ · lines of CBs &gt;60 NM · areas of CBs &gt;3,000 sq mi · tornadoes',
        issuer:'<strong>Aviation Weather Center (AWC)</strong>, Kansas City',
        aria:'Convective SIGMET — covers embedded thunderstorms and convective hazards; valid up to 2 hours; issued by AWC.'
      },
      {
        color:'var(--product)', bg:'var(--product-light)',
        emoji:'🌋', name:'SIGMET (non-convective)', code:'WS',
        validity:'Up to 4 hours (6 hr for volcanic ash and tropical cyclones)',
        coverage:'<strong>Severe icing</strong> not from thunderstorms · severe / extreme non-convective turbulence · volcanic ash · widespread dust or sandstorms obscuring ≥3⁄8 of the sky above 5,000 ft',
        issuer:'<strong>Aviation Weather Center (AWC)</strong>',
        aria:'Non-convective SIGMET — covers severe icing, severe non-convective turbulence, volcanic ash, and widespread dust/sandstorms; valid up to 4 hours; issued by AWC.'
      },
      {
        color:'var(--emerald)', bg:'var(--emerald-light)',
        emoji:'📍', name:'CWA', code:'Center Weather Advisory',
        validity:'Up to 2 hours · issued only when needed',
        coverage:'<strong>Short-term hazardous weather</strong> affecting NAS traffic flow within an ARTCC\'s airspace; supplements SIGMETs for rapidly developing conditions',
        issuer:'<strong>Center Weather Service Unit (CWSU)</strong>, co-located with each ARTCC',
        aria:'Center Weather Advisory — covers short-term hazardous weather within an ARTCC airspace; valid up to 2 hours; issued by CWSU.'
      },
      {
        color:'var(--amber)', bg:'var(--amber-light)',
        emoji:'🌫️💥❄️', name:'AIRMET', code:'WA / G-AIRMET',
        validity:'6 hours per forecast period · issued every 6 hours, with updates as needed',
        coverage:'<strong>Sierra:</strong> IFR (cigs &lt;1,000 ft and/or vis &lt;3 SM affecting &gt;50% of an area) and mountain obscuration · <strong>Tango:</strong> moderate turbulence, surface wind ≥30 kt, LLWS · <strong>Zulu:</strong> moderate icing, freezing levels',
        issuer:'<strong>Aviation Weather Center (AWC)</strong>',
        aria:'AIRMET (Sierra, Tango, Zulu) — covers IFR/mountain obscuration, moderate turbulence/wind, and moderate icing/freezing levels; valid 6 hours per forecast period; issued by AWC.'
      },
    ];
    const items = cards.map(c => `<article class="advisory-card" style="--ad-color:${c.color};--ad-bg:${c.bg}" aria-label="${c.aria}">
        <header class="ad-header">
          <div class="ad-name">${c.emoji} ${c.name}</div>
          <div class="ad-code">${c.code}</div>
        </header>
        <div class="ad-validity">Valid: ${c.validity}</div>
        <div class="ad-coverage">${c.coverage}</div>
        <div class="ad-issuer">Issued by: ${c.issuer}</div>
      </article>`).join('');
    return `<section class="diagram-container" style="margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">⚠️ In-flight Advisory Categories</span></div>
      <div style="padding:14px;background:#F8FAFC">
        <p style="font-size:13px;color:#475569;margin:0 0 8px;line-height:1.55">Four advisory products, each covering a different operational domain. Ordered by validity-period length — <em>not</em> by severity ranking.</p>
        <div class="advisory-grid">${items}</div>
      </div>
    </section>`;
  },

  // ── NEW: METAR DECODE CHALLENGE (practice) ──────────────────
  renderDecodePractice(){
    const challenges=[
      {raw:'KDEN 151556Z 29014G22KT 10SM FEW050 SCT100 28/M04 A2987',tokens:[{t:'KDEN',l:'Denver Intl (Colorado)',c:'#7C3AED'},{t:'151556Z',l:'Day 15 at 1556 UTC',c:'#0284C7'},{t:'29014G22KT',l:'Wind 290° at 14 kt, gusting 22 kt',c:'#DC2626'},{t:'10SM',l:'Visibility 10 statute miles',c:'#059669'},{t:'FEW050',l:'Few clouds at 5,000 ft AGL',c:'#1D4ED8'},{t:'SCT100',l:'Scattered at 10,000 ft AGL — no ceiling',c:'#1D4ED8'},{t:'28/M04',l:'Temp 28°C / Dewpoint -4°C',c:'#059669'},{t:'A2987',l:'Altimeter 29.87 inHg',c:'#9333EA'}],category:'VFR',da:'High density altitude likely — 28°C at 5,431 ft elevation'},
      {raw:'KSFO 091254Z 28015KT 1/2SM FG OVC002 14/14 A2997',tokens:[{t:'KSFO',l:'San Francisco Intl',c:'#7C3AED'},{t:'091254Z',l:'Day 09 at 1254 UTC',c:'#0284C7'},{t:'28015KT',l:'Wind 280° at 15 kt',c:'#DC2626'},{t:'1/2SM',l:'Visibility 1/2 statute mile',c:'#059669'},{t:'FG',l:'FOG — visibility <5/8 SM',c:'#DC2626'},{t:'OVC002',l:'Overcast ceiling at 200 ft AGL!',c:'#1D4ED8'},{t:'14/14',l:'Temp 14°C / Dew 14°C — saturated!',c:'#059669'},{t:'A2997',l:'Altimeter 29.97 inHg',c:'#9333EA'}],category:'LIFR',da:'Advection fog from Pacific — 200 ft ceiling, 1/2 SM in fog'},
    ];
    let ci=0;
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">🎯 METAR Decode Challenge — Tap Groups</span></div>
      <div style="padding:16px" id="decode-practice-container">
        <div style="display:flex;gap:8px;margin-bottom:14px">
          ${challenges.map((_,i)=>`<button onclick="Diagrams.loadDecodePractice(${i})" id="dc-btn-${i}" style="padding:8px 16px;border-radius:12px;border:2px solid ${i===0?'#7C3AED':'#E2E8F0'};background:${i===0?'#F5F3FF':'white'};font-family:var(--font-display);font-size:13px;font-weight:700;cursor:pointer;color:${i===0?'#7C3AED':'#94A3B8'}">METAR ${i+1}</button>`).join('')}
        </div>
        <div id="dc-raw" style="background:#0C1B33;border-radius:12px;padding:14px;margin-bottom:12px;font-family:var(--font-mono);font-size:12px;line-height:2;word-break:break-all">
          ${challenges[0].tokens.map((t,i)=>`<span class="metar-token" style="background:${t.c}18;color:${t.c}" onclick="Diagrams.showDcToken(${i})">${t.t}</span>`).join(' ')}
        </div>
        <div id="dc-detail" style="background:#F8FAFC;border-radius:12px;padding:14px;min-height:60px">
          <div style="color:#94A3B8;font-family:var(--font-display);font-size:14px;text-align:center;padding:8px">↑ Tap any group to decode it</div>
        </div>
        <div id="dc-footer" style="margin-top:10px;background:#ECFDF5;border-radius:12px;padding:12px;border-left:4px solid #10B981">
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:#065F46">Flight Category: <span style="color:#10B981">VFR</span></div>
          <div style="font-size:12px;color:#475569;margin-top:4px">${challenges[0].da}</div>
        </div>
      </div>
    </div>`;
  },

  _dcChallenges:[
    {raw:'KDEN 151556Z 29014G22KT 10SM FEW050 SCT100 28/M04 A2987',tokens:[{t:'KDEN',l:'Denver Intl (Colorado) — elevation 5,431 ft MSL',c:'#7C3AED'},{t:'151556Z',l:'Day 15 at 1556 UTC (1556Z)',c:'#0284C7'},{t:'29014G22KT',l:'Wind 290° TRUE at 14 kt, gusting to 22 kt',c:'#DC2626'},{t:'10SM',l:'Visibility 10 statute miles (VFR)',c:'#059669'},{t:'FEW050',l:'Few clouds (1-2 oktas) at 5,000 ft AGL — no ceiling',c:'#1D4ED8'},{t:'SCT100',l:'Scattered (3-4 oktas) at 10,000 ft AGL — still no ceiling',c:'#1D4ED8'},{t:'28/M04',l:'Temperature +28°C / Dewpoint -4°C. T-Td spread = 32°C — very dry!',c:'#059669'},{t:'A2987',l:'Altimeter 29.87 inHg. Set this in Kollsman window.',c:'#9333EA'}],category:'VFR',da:'Density altitude warning: 28°C at 5,431 ft = very high DA despite VFR conditions. Check performance carefully.'},
    {raw:'KSFO 091254Z 28015KT 1/2SM FG OVC002 14/14 A2997',tokens:[{t:'KSFO',l:'San Francisco International',c:'#7C3AED'},{t:'091254Z',l:'Day 09 at 1254 UTC',c:'#0284C7'},{t:'28015KT',l:'Wind 280° at 15 kt (sea breeze from west)',c:'#DC2626'},{t:'1/2SM',l:'Visibility 1/2 statute mile — LIFR!',c:'#DC2626'},{t:'FG',l:'Fog — visibility below 5/8 SM',c:'#DC2626'},{t:'OVC002',l:'Overcast ceiling at 200 ft AGL — LIFR ceiling!',c:'#1D4ED8'},{t:'14/14',l:'Temp 14°C = Dewpoint 14°C = 100% RH — saturated, fog certain',c:'#059669'},{t:'A2997',l:'Altimeter 29.97 inHg',c:'#9333EA'}],category:'LIFR',da:'Classic SFO advection fog from the Pacific. OVC002 and 1/2SM FG = LIFR. Cat III ILS or no approach.'},
  ],
  _dcCurrent:0,

  loadDecodePractice(i){
    this._dcCurrent=i;
    document.querySelectorAll('[id^=dc-btn-]').forEach((b,j)=>{b.style.borderColor=j===i?'#7C3AED':'#E2E8F0';b.style.background=j===i?'#F5F3FF':'white';b.style.color=j===i?'#7C3AED':'#94A3B8'});
    const ch=this._dcChallenges[i];
    document.getElementById('dc-raw').innerHTML=ch.tokens.map((t,j)=>`<span class="metar-token" style="background:${t.c}18;color:${t.c}" onclick="Diagrams.showDcToken(${j})">${t.t}</span>`).join(' ');
    const catColors={VFR:'#10B981',MVFR:'#F59E0B',IFR:'#F97316',LIFR:'#EF4444'};
    const catBg={VFR:'#ECFDF5',MVFR:'#FEF3C7',IFR:'#FFF7ED',LIFR:'#FEF2F2'};
    document.getElementById('dc-footer').style.background=catBg[ch.category]||'#F8FAFC';
    document.getElementById('dc-footer').style.borderLeftColor=catColors[ch.category]||'#94A3B8';
    document.getElementById('dc-footer').innerHTML=`<div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:var(--navy)">Flight Category: <span style="color:${catColors[ch.category]}">${ch.category}</span></div><div style="font-size:12px;color:#475569;margin-top:4px">${ch.da}</div>`;
    document.getElementById('dc-detail').innerHTML=`<div style="color:#94A3B8;font-family:var(--font-display);font-size:14px;text-align:center;padding:8px">↑ Tap any group to decode it</div>`;
  },

  showDcToken(i){
    const ch=this._dcChallenges[this._dcCurrent];const t=ch.tokens[i];
    document.querySelectorAll('#dc-raw .metar-token').forEach(el=>el.classList.remove('selected'));
    document.querySelectorAll('#dc-raw .metar-token')[i]?.classList.add('selected');
    document.getElementById('dc-detail').innerHTML=`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><code style="background:${t.c}18;color:${t.c};padding:4px 10px;border-radius:8px;font-family:var(--font-mono);font-size:13px;font-weight:700">${t.t}</code></div><p style="font-size:14px;color:#334155;line-height:1.6;margin:0">${t.l}</p>`;
  },

  // ===== DENSITY ALTITUDE MODULE =====
  // Bespoke 3-step interactive module that replaces the FAA Fig 8-15 +
  // Fig C-1 process diagram in M2 §s2_1. Steps:
  //   1. Same-airplane / same-runway / different-air comparison (recreated
  //      SVG with identical terrain in both panels — isolates the air var).
  //   2. Bar chart of DA above field elevation (sea-level / 5,000 ft cool /
  //      5,000 ft hot) with the +1,000 ft/10°C rule of thumb.
  //   3. Interactive density-altitude chart with PA + OAT sliders, live
  //      red trace, numeric DA readout, KJQF preset.
  //
  // Colors inside the SVGs are remapped to project tokens:
  //   good    → emerald (#10B981 / #6EE7B7)
  //   bad     → rose    (#F43F5E / #FDA4AF)
  //   accent  → amber   (#F59E0B / #FCD34D)
  //   ISA ref → sky     (#38BDF8)
  //
  // Init logic (step nav, chart drawing, slider handlers) lives in
  // _initDaModule(), called from Screens._initDiagram after innerHTML
  // injection (since innerHTML doesn't execute inline <script> tags).
  renderDaModule() {
    return `
<div class="da-module" id="daModule" role="region" aria-labelledby="daTitle">

  <header class="da-head">
    <div>
      <div class="da-eyebrow">Atmospheric Pressure · §s2_1</div>
      <h2 class="da-title" id="daTitle">Density Altitude &amp; Aircraft Performance</h2>
    </div>
    <div class="da-stepper" aria-hidden="true">
      <span class="da-stepper-text" id="daStepperText">Step 1 of 3</span>
      <div class="da-dots" id="daDots">
        <span class="da-dot active"></span>
        <span class="da-dot"></span>
        <span class="da-dot"></span>
      </div>
    </div>
  </header>

  <!-- ============== STEP 1 ============== -->
  <section class="da-step active" data-step="1" aria-labelledby="daStep1Title">
    <div class="da-step-sub">01 · Performance comparison</div>
    <h3 class="da-step-title" id="daStep1Title">Same airplane, same runway, different air</h3>

    <div class="da-figure">
      <svg viewBox="0 0 800 460" role="img" aria-label="Two-panel comparison: sea-level density altitude versus 5,000 ft density altitude takeoff and climb performance">
        <defs>
          <linearGradient id="skyTop" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#1d3754"/>
            <stop offset="1" stop-color="#0f2236"/>
          </linearGradient>
          <linearGradient id="skyBot" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#3a2f3d"/>
            <stop offset="1" stop-color="#231b25"/>
          </linearGradient>
          <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#1c2a36"/>
            <stop offset="1" stop-color="#0F172A"/>
          </linearGradient>
          <marker id="arrowGood" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#10B981"/>
          </marker>
          <marker id="arrowBad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#F43F5E"/>
          </marker>
        </defs>

        <!-- Top panel: SEA LEVEL -->
        <g transform="translate(0,0)">
          <rect x="0" y="0" width="800" height="220" fill="url(#skyTop)"/>
          <path d="M 0,200 L 480,200 Q 520,200 540,170 L 600,90 Q 620,70 640,90 L 720,160 Q 740,180 760,200 L 800,200 L 800,220 L 0,220 Z" fill="url(#ground)" opacity="0.85"/>
          <line x1="0" y1="200" x2="800" y2="200" stroke="#334155" stroke-width="1"/>
          <line x1="40" y1="200" x2="170" y2="200" stroke="#10B981" stroke-width="3" marker-end="url(#arrowGood)"/>
          <text x="40" y="218" fill="#6EE7B7" font-size="11" letter-spacing="0.05em">ROLL</text>
          <text x="105" y="190" fill="#10B981" font-size="13" font-weight="600" text-anchor="middle">1,300 ft</text>
          <path d="M 170,200 Q 360,150 640,60" fill="none" stroke="#10B981" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#arrowGood)"/>
          <g transform="translate(420,90)">
            <rect x="-58" y="-16" width="116" height="32" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
            <text x="0" y="-2" fill="#6EE7B7" font-size="9" text-anchor="middle" letter-spacing="0.1em">CLIMB</text>
            <text x="0" y="11" fill="#10B981" font-size="13" text-anchor="middle" font-weight="600">1,500 fpm</text>
          </g>
          <g transform="translate(640,60) rotate(-22)">
            <path d="M -10,0 L 8,-2 L 12,0 L 8,2 Z M -3,-1 L -3,-7 L -1,-7 L 1,-1 M -3,1 L -3,5 L -1,5 L 1,1" fill="#E2E8F0"/>
          </g>
          <g transform="translate(20,28)">
            <rect x="-4" y="-14" width="220" height="28" rx="4" fill="rgba(12,27,51,0.7)" stroke="#10B981" stroke-width="1"/>
            <text x="6" y="5" fill="#6EE7B7" font-size="11" letter-spacing="0.16em">DA = SEA LEVEL · STANDARD</text>
          </g>
        </g>

        <rect x="0" y="220" width="800" height="2" fill="#1E3A5F"/>

        <!-- Bottom panel: 5,000 ft DA -->
        <g transform="translate(0,222)">
          <rect x="0" y="0" width="800" height="218" fill="url(#skyBot)"/>
          <path d="M 0,200 L 480,200 Q 520,200 540,170 L 600,90 Q 620,70 640,90 L 720,160 Q 740,180 760,200 L 800,200 L 800,218 L 0,218 Z" fill="url(#ground)" opacity="0.85"/>
          <line x1="0" y1="200" x2="800" y2="200" stroke="#334155" stroke-width="1"/>
          <line x1="40" y1="200" x2="220" y2="200" stroke="#F43F5E" stroke-width="3" marker-end="url(#arrowBad)"/>
          <text x="40" y="218" fill="#FDA4AF" font-size="11" letter-spacing="0.05em">ROLL</text>
          <text x="130" y="190" fill="#F43F5E" font-size="13" font-weight="600" text-anchor="middle">1,800 ft</text>
          <path d="M 220,200 Q 420,170 760,108" fill="none" stroke="#F43F5E" stroke-width="2.5" stroke-dasharray="6 4"/>
          <g transform="translate(595,107)">
            <circle r="6" fill="#F43F5E" opacity="0.25"/>
            <circle r="3" fill="#F43F5E"/>
          </g>
          <text x="555" y="80" fill="#F43F5E" font-size="11" text-anchor="middle" letter-spacing="0.05em">DOES NOT CLEAR</text>
          <g transform="translate(420,150)">
            <rect x="-58" y="-16" width="116" height="32" rx="4" fill="#0F172A" stroke="#F43F5E" stroke-width="1"/>
            <text x="0" y="-2" fill="#FDA4AF" font-size="9" text-anchor="middle" letter-spacing="0.1em">CLIMB</text>
            <text x="0" y="11" fill="#F43F5E" font-size="13" text-anchor="middle" font-weight="600">1,000 fpm</text>
          </g>
          <g transform="translate(420,170) rotate(-8)">
            <path d="M -10,0 L 8,-2 L 12,0 L 8,2 Z M -3,-1 L -3,-7 L -1,-7 L 1,-1 M -3,1 L -3,5 L -1,5 L 1,1" fill="#E2E8F0"/>
          </g>
          <g transform="translate(20,28)">
            <rect x="-4" y="-14" width="240" height="28" rx="4" fill="rgba(12,27,51,0.7)" stroke="#F43F5E" stroke-width="1"/>
            <text x="6" y="5" fill="#FDA4AF" font-size="11" letter-spacing="0.16em">DA = 5,000 FT · HOT/HIGH AIR</text>
          </g>
        </g>

        <g transform="translate(660,228)">
          <rect x="0" y="0" width="120" height="56" rx="4" fill="rgba(245,158,11,0.08)" stroke="#F59E0B" stroke-width="1"/>
          <text x="60" y="16" fill="#F59E0B" font-size="9" text-anchor="middle" letter-spacing="0.16em">vs. SEA LEVEL</text>
          <text x="60" y="32" fill="#F59E0B" font-size="11" text-anchor="middle">+38% roll</text>
          <text x="60" y="46" fill="#F59E0B" font-size="11" text-anchor="middle">−33% climb</text>
        </g>
      </svg>
    </div>

    <div class="da-caption">Identical airplane, identical runway, identical obstacle. Only the air has changed.</div>

    <div class="da-body">
      <p>Density altitude is pressure altitude corrected for non-standard temperature — it&rsquo;s how high the airplane <em>feels</em> it is, regardless of what the runway sign says. When density altitude rises, every part of the takeoff suffers <strong>at the same time</strong>: the engine breathes thinner air and makes <strong>less power</strong>, the propeller bites less air and produces <strong>less thrust</strong>, and the wing meets fewer molecules per second so it generates <strong>less lift</strong>.</p>
      <p>Going from a sea-level day to a <span class="num">5,000 ft</span> density altitude lengthens the takeoff roll from <span class="num">1,300&nbsp;ft</span> to <span class="num">1,800&nbsp;ft</span> (≈<span class="num">+38%</span>) and degrades the rate of climb from <span class="num">1,500&nbsp;fpm</span> to <span class="num">1,000&nbsp;fpm</span> (≈<span class="num">−33%</span>). Same pilot, same airplane, same runway — different air. The shallower climb path matters most when there&rsquo;s rising terrain off the departure end.</p>
    </div>
  </section>

  <!-- ============== STEP 2 ============== -->
  <section class="da-step" data-step="2" aria-labelledby="daStep2Title">
    <div class="da-step-sub">02 · Heat &amp; elevation compound</div>
    <h3 class="da-step-title" id="daStep2Title">Heat and elevation stack on top of each other</h3>

    <div class="da-figure">
      <svg viewBox="0 0 800 380" role="img" aria-label="Three-bar comparison of density altitude under three conditions, color graded from emerald to rose">
        <defs>
          <linearGradient id="bar1" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0" stop-color="#047857"/>
            <stop offset="1" stop-color="#10B981"/>
          </linearGradient>
          <linearGradient id="bar2" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0" stop-color="#B45309"/>
            <stop offset="1" stop-color="#F59E0B"/>
          </linearGradient>
          <linearGradient id="bar3" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0" stop-color="#9F1239"/>
            <stop offset="1" stop-color="#F43F5E"/>
          </linearGradient>
        </defs>

        <g stroke="#1E3A5F" stroke-width="1" font-family="inherit">
          <line x1="120" y1="40"  x2="760" y2="40"/>
          <line x1="120" y1="96"  x2="760" y2="96"/>
          <line x1="120" y1="152" x2="760" y2="152"/>
          <line x1="120" y1="208" x2="760" y2="208"/>
          <line x1="120" y1="264" x2="760" y2="264"/>
          <line x1="120" y1="320" x2="760" y2="320"/>
        </g>
        <g fill="#94A3B8" font-size="11" text-anchor="end">
          <text x="110" y="44">10,000 ft</text>
          <text x="110" y="100">8,000 ft</text>
          <text x="110" y="156">6,000 ft</text>
          <text x="110" y="212">4,000 ft</text>
          <text x="110" y="268">2,000 ft</text>
          <text x="110" y="324">0 ft</text>
        </g>
        <text x="60" y="180" fill="#94A3B8" font-size="10" text-anchor="middle" letter-spacing="0.16em" transform="rotate(-90 60 180)">DENSITY ALTITUDE</text>

        <line x1="120" y1="320" x2="760" y2="320" stroke="#475569" stroke-width="1.5"/>

        <!-- Bar A: Sea level standard → 0 ft DA -->
        <g transform="translate(220,0)">
          <rect x="-40" y="316" width="80" height="4" fill="url(#bar1)"/>
          <text x="0" y="345" fill="#6EE7B7" font-size="11" text-anchor="middle">Sea level</text>
          <text x="0" y="360" fill="#94A3B8" font-size="10" text-anchor="middle">15°C / standard</text>
          <text x="0" y="305" fill="#10B981" font-size="13" text-anchor="middle" font-weight="600">0 ft</text>
        </g>

        <!-- Bar B: 5,000 ft field standard → 5,000 ft DA -->
        <g transform="translate(420,0)">
          <rect x="-40" y="180" width="80" height="140" fill="url(#bar2)" rx="2"/>
          <text x="0" y="345" fill="#FCD34D" font-size="11" text-anchor="middle">5,000 ft field</text>
          <text x="0" y="360" fill="#94A3B8" font-size="10" text-anchor="middle">5°C / standard</text>
          <text x="0" y="172" fill="#F59E0B" font-size="13" text-anchor="middle" font-weight="600">5,000 ft</text>
        </g>

        <!-- Bar C: 5,000 ft field at 35°C → 9,200 ft DA -->
        <g transform="translate(620,0)">
          <rect x="-40" y="62" width="80" height="258" fill="url(#bar3)" rx="2"/>
          <text x="0" y="345" fill="#FDA4AF" font-size="11" text-anchor="middle">5,000 ft field</text>
          <text x="0" y="360" fill="#94A3B8" font-size="10" text-anchor="middle">35°C / 95°F</text>
          <text x="0" y="54" fill="#F43F5E" font-size="13" text-anchor="middle" font-weight="600">9,200 ft</text>
          <g transform="translate(60,150)">
            <line x1="-20" y1="0" x2="0" y2="0" stroke="#F43F5E" stroke-width="1"/>
            <text x="4" y="-3" fill="#F43F5E" font-size="10">+4,200 ft</text>
            <text x="4" y="10" fill="#94A3B8" font-size="9">from heat alone</text>
          </g>
        </g>

        <g>
          <line x1="370" y1="180" x2="680" y2="180" stroke="#38BDF8" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>
          <text x="685" y="183" fill="#38BDF8" font-size="10" letter-spacing="0.05em">field elev.</text>
        </g>

        <g transform="translate(120,12)">
          <rect x="0" y="-2" width="320" height="24" rx="4" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.3)"/>
          <text x="12" y="14" fill="#F59E0B" font-size="11" letter-spacing="0.04em">RULE OF THUMB · +1,000 ft DA per +10°C above standard</text>
        </g>
      </svg>
    </div>

    <div class="da-caption">The runway sign doesn&rsquo;t move. The air pretends it did.</div>

    <div class="da-body">
      <p>What matters for performance is the <strong>density altitude above the field</strong>, not the runway-sign elevation. A standard day at a 5,000 ft field already costs you 5,000 ft of DA. Add a hot afternoon — every <span class="num">+10°C</span> above standard adds roughly <span class="num">+1,000&nbsp;ft</span> — and the same field is performing like a 9,000-plus-foot mountain strip.</p>
      <p>This is true at low fields too. <strong>KJQF</strong> (Concord-Padgett, NC) sits at <span class="num">705&nbsp;ft</span> MSL, but a humid summer afternoon there can easily push DA above <span class="num">3,000&nbsp;ft</span>. The Blue Ridge ridgeline to the west doesn&rsquo;t grow, but on a hot day your climb gradient does shrink — so the obstacles get effectively taller. <strong>Always compute DA from POH charts before flight.</strong></p>
    </div>
  </section>

  <!-- ============== STEP 3 ============== -->
  <section class="da-step" data-step="3" aria-labelledby="daStep3Title">
    <div class="da-step-sub">03 · Read it off the chart</div>
    <h3 class="da-step-title" id="daStep3Title">Read density altitude off the chart</h3>

    <div class="da-figure">
      <svg id="daChart" viewBox="0 0 800 480" role="img" aria-label="Density altitude chart with live trace driven by sliders">
        <defs>
          <pattern id="chartGrid" width="50" height="28" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 28" fill="none" stroke="#1E3A5F" stroke-width="0.5"/>
          </pattern>
          <clipPath id="chartClip">
            <rect x="80" y="20" width="640" height="400"/>
          </clipPath>
        </defs>

        <rect x="80" y="20" width="640" height="400" fill="#0F172A" stroke="#475569" stroke-width="1"/>
        <rect x="80" y="20" width="640" height="400" fill="url(#chartGrid)"/>

        <g clip-path="url(#chartClip)" stroke="#C8D6E6" stroke-width="0.9" fill="none" opacity="0.55">
          <g id="daIsoLines"></g>
        </g>
        <g id="daIsoLabels" clip-path="url(#chartClip)" font-size="9" fill="#7A93AD"></g>

        <g id="isaLine" clip-path="url(#chartClip)">
          <line stroke="#38BDF8" stroke-width="1.4" stroke-dasharray="5 4" x1="0" y1="0" x2="0" y2="0" id="isaLineSeg"/>
          <text id="isaLabel" fill="#38BDF8" font-size="10" letter-spacing="0.1em" transform="rotate(-78)">ISA</text>
        </g>

        <g font-size="10" fill="#94A3B8" text-anchor="middle">
          <g id="xTicks"></g>
        </g>
        <g font-size="10" fill="#94A3B8" text-anchor="end">
          <g id="yTicks"></g>
        </g>
        <text x="400" y="455" fill="#C8D6E6" font-size="11" text-anchor="middle" letter-spacing="0.16em">OUTSIDE AIR TEMPERATURE  (°C)</text>
        <text x="22" y="220" fill="#C8D6E6" font-size="11" text-anchor="middle" letter-spacing="0.16em" transform="rotate(-90 22 220)">PRESSURE ALTITUDE  (ft)</text>

        <g id="daTrace">
          <line id="traceV" x1="0" y1="0" x2="0" y2="0" stroke="#F43F5E" stroke-width="1.5" stroke-dasharray="4 3"/>
          <line id="traceH" x1="0" y1="0" x2="0" y2="0" stroke="#F43F5E" stroke-width="1.5" stroke-dasharray="4 3"/>
          <circle id="tracePt" cx="0" cy="0" r="6" fill="#F43F5E" fill-opacity="0.25" stroke="#F43F5E" stroke-width="2"/>
          <g id="traceLabel" transform="translate(0,0)">
            <rect x="0" y="-32" width="120" height="28" rx="4" fill="#0F172A" stroke="#F43F5E" stroke-width="1"/>
            <text id="traceLabelText" x="60" y="-13" fill="#FDA4AF" font-size="11" text-anchor="middle">DA = 0 ft</text>
          </g>
        </g>
      </svg>
    </div>

    <div class="da-controls">
      <div class="da-control">
        <div class="da-control-row">
          <span class="da-control-label">Pressure Altitude</span>
          <span class="da-control-value" id="paValueLabel">705 ft</span>
        </div>
        <input type="range" class="da-slider" id="paSlider" min="0" max="15000" step="50" value="705" aria-label="Pressure altitude in feet"/>
      </div>
      <div class="da-control">
        <div class="da-control-row">
          <span class="da-control-label">OAT</span>
          <span class="da-control-value" id="oatValueLabel">35°C</span>
        </div>
        <input type="range" class="da-slider" id="oatSlider" min="-20" max="40" step="1" value="35" aria-label="Outside air temperature in degrees Celsius"/>
      </div>
    </div>

    <div class="da-readout" role="status" aria-live="polite">
      <div>
        <div class="da-readout-label">Density Altitude</div>
        <div class="da-readout-value"><span id="daValue">3,000</span><span class="unit">ft</span></div>
      </div>
      <div class="da-readout-delta">
        <div>vs. pressure altitude</div>
        <div><b id="daDelta">+2,295 ft</b></div>
        <button type="button" class="da-preset" id="daPresetBtn" aria-label="Reset to KJQF summer-afternoon example">↺ KJQF · 35°C</button>
      </div>
    </div>

    <div class="da-caption">Set altimeter to 29.92" to read pressure altitude, then cross-reference OAT to find DA.</div>

    <div class="da-body">
      <p>To use this chart in the airplane: set your altimeter to <span class="num">29.92"</span> Hg to read pressure altitude on the altimeter face, note OAT from the panel, then trace from the OAT axis up to the pressure-altitude curve and read density altitude off the diagonals.</p>
      <p>The KJQF example pre-loaded above shows the pattern: a <span class="num">705&nbsp;ft</span> field on a <span class="num">35°C</span> afternoon yields a DA near <span class="num">3,000&nbsp;ft</span> — already eating into your climb performance. <strong>On a hot day at a high airport, density altitude can exceed pressure altitude by several thousand feet.</strong></p>
    </div>
  </section>

  <footer class="da-foot">
    <button type="button" class="da-btn" id="daBackBtn" disabled>← Back</button>
    <div class="da-progress-mini" id="daProgress">Step 1 of 3</div>
    <button type="button" class="da-btn da-btn-primary" id="daNextBtn">Next →</button>
  </footer>
</div>`;
  },

  // Interactive init — called by Screens._initDiagram after the module's
  // HTML is injected. Idempotent: if already initialised on this DOM tree,
  // returns early. Wiring:
  //   - Back / Next / Done navigation through 3 steps (with stepper dots)
  //   - Step 3 chart: axis ticks + iso-DA diagonals + ISA reference line
  //   - Two sliders driving a live red trace + numeric DA readout
  //   - "↺ KJQF · 35°C" preset button
  //   - densityAltitudeComplete custom event on the final Done click
  //     (Chunk 4 wires this into the engine progress hook)
  _initDaModule() {
    const root = document.getElementById('daModule');
    if (!root || root.dataset.daInit === 'done') return;
    root.dataset.daInit = 'done';

    /* Step navigation */
    let stepIdx = 0;
    const steps = root.querySelectorAll('.da-step');
    const dots  = root.querySelectorAll('.da-dot');
    const backBtn = root.querySelector('#daBackBtn');
    const nextBtn = root.querySelector('#daNextBtn');
    const stepperText = root.querySelector('#daStepperText');
    const progress = root.querySelector('#daProgress');

    const renderStep = () => {
      steps.forEach((s, i) => s.classList.toggle('active', i === stepIdx));
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === stepIdx);
        d.classList.toggle('done', i < stepIdx);
      });
      stepperText.textContent = `Step ${stepIdx+1} of 3`;
      progress.textContent    = `Step ${stepIdx+1} of 3`;
      backBtn.disabled = stepIdx === 0;
      if (stepIdx === steps.length - 1) {
        nextBtn.textContent = 'Done ✓';
        nextBtn.classList.remove('da-btn-primary');
        nextBtn.classList.add('da-btn-done');
      } else {
        nextBtn.textContent = 'Next →';
        nextBtn.classList.add('da-btn-primary');
        nextBtn.classList.remove('da-btn-done');
      }
    };

    backBtn.addEventListener('click', () => {
      if (stepIdx > 0) { stepIdx--; renderStep(); }
    });
    nextBtn.addEventListener('click', () => {
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        renderStep();
      } else {
        // Completion. Chunk 4 hooks the markStudied/progress side effect.
        root.dispatchEvent(new CustomEvent('densityAltitudeComplete', {
          bubbles: true,
          detail: { module: 'density-altitude', completedAt: Date.now() }
        }));
        nextBtn.disabled = true;
        nextBtn.textContent = 'Completed';
      }
    });

    /* Step 3 chart — coordinate mapping */
    const CHART = { x0: 80, x1: 720, y0: 20, y1: 420,
                    tMin: -20, tMax: 40, paMin: 0, paMax: 15000 };
    const tToX  = t  => CHART.x0 + (t - CHART.tMin) / (CHART.tMax - CHART.tMin) * (CHART.x1 - CHART.x0);
    const paToY = pa => CHART.y1 - (pa - CHART.paMin) / (CHART.paMax - CHART.paMin) * (CHART.y1 - CHART.y0);
    // ISA temperature at a given pressure altitude (°C): standard lapse 1.98°C / 1000 ft
    const isaTemp = pa => 15 - 0.00198 * pa;
    // Density altitude approximation: DA ≈ PA + 120·(OAT − ISA(PA))
    // Accurate within ~150 ft over the chart range — teaching-grade only.
    const densityAlt = (pa, oat) => Math.round(pa + 120 * (oat - isaTemp(pa)));
    const SVG_NS = 'http://www.w3.org/2000/svg';

    /* X-axis ticks every 10°C */
    const xTicks = root.querySelector('#xTicks');
    for (let t = CHART.tMin; t <= CHART.tMax; t += 10) {
      const x = tToX(t);
      const tick = document.createElementNS(SVG_NS, 'line');
      tick.setAttribute('x1', x); tick.setAttribute('x2', x);
      tick.setAttribute('y1', CHART.y1); tick.setAttribute('y2', CHART.y1 + 5);
      tick.setAttribute('stroke', '#475569');
      xTicks.appendChild(tick);
      const lbl = document.createElementNS(SVG_NS, 'text');
      lbl.setAttribute('x', x); lbl.setAttribute('y', CHART.y1 + 18);
      lbl.textContent = t + '°';
      xTicks.appendChild(lbl);
    }

    /* Y-axis ticks every 1000 ft, labels every 2000 ft */
    const yTicks = root.querySelector('#yTicks');
    for (let pa = 0; pa <= 15000; pa += 1000) {
      const y = paToY(pa);
      const tick = document.createElementNS(SVG_NS, 'line');
      tick.setAttribute('x1', CHART.x0 - 5); tick.setAttribute('x2', CHART.x0);
      tick.setAttribute('y1', y); tick.setAttribute('y2', y);
      tick.setAttribute('stroke', '#475569');
      yTicks.appendChild(tick);
      if (pa % 2000 === 0) {
        const lbl = document.createElementNS(SVG_NS, 'text');
        lbl.setAttribute('x', CHART.x0 - 8); lbl.setAttribute('y', y + 3);
        lbl.textContent = pa === 0 ? 'SL' : pa.toLocaleString();
        yTicks.appendChild(lbl);
      }
    }

    /* Iso-DA diagonal lines (every 1000 ft from -2k to +15k).
       For DA = PA + 120·(t − ISA(PA)), with ISA(PA) = 15 − 0.00198·PA:
         PA·(1 − 0.2376) = DA + 120·t − 1800
         PA = (DA + 120·t − 1800) / 0.7624 */
    const isoLines  = root.querySelector('#daIsoLines');
    const isoLabels = root.querySelector('#daIsoLabels');
    for (let da = -2000; da <= 15000; da += 1000) {
      const paAtTmin = (da + 120 * CHART.tMin - 1800) / 0.7624;
      const paAtTmax = (da + 120 * CHART.tMax - 1800) / 0.7624;
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', tToX(CHART.tMin));
      line.setAttribute('y1', paToY(paAtTmin));
      line.setAttribute('x2', tToX(CHART.tMax));
      line.setAttribute('y2', paToY(paAtTmax));
      if (da % 5000 === 0 && da !== 0) {
        line.setAttribute('stroke', '#9FB6CF');
        line.setAttribute('stroke-width', '1.2');
      } else if (da === 0) {
        line.setAttribute('stroke', '#DBE6F0');
        line.setAttribute('stroke-width', '1.2');
      }
      isoLines.appendChild(line);
      // Label near the right edge
      if (da >= 0 && da <= 15000 && da % 1000 === 0) {
        const paAt = (da + 120 * 35 - 1800) / 0.7624;
        if (paAt > 0 && paAt < 15000) {
          const lbl = document.createElementNS(SVG_NS, 'text');
          lbl.setAttribute('x', tToX(35) + 4);
          lbl.setAttribute('y', paToY(paAt) - 2);
          lbl.textContent = da === 0 ? 'SL' : (da/1000) + 'k';
          isoLabels.appendChild(lbl);
        }
      }
    }

    /* ISA reference line — (15°C, 0 ft) → (-14.7°C, 15000 ft) */
    const isaLineSeg = root.querySelector('#isaLineSeg');
    const isaLabel   = root.querySelector('#isaLabel');
    isaLineSeg.setAttribute('x1', tToX(15));
    isaLineSeg.setAttribute('y1', paToY(0));
    isaLineSeg.setAttribute('x2', tToX(-14.7));
    isaLineSeg.setAttribute('y2', paToY(15000));
    isaLabel.setAttribute('transform',
      `translate(${tToX(0) - 14},${paToY(7500)}) rotate(-78)`);

    /* Live trace driven by sliders */
    const paSlider = root.querySelector('#paSlider');
    const oatSlider = root.querySelector('#oatSlider');
    const paLabel = root.querySelector('#paValueLabel');
    const oatLabel = root.querySelector('#oatValueLabel');
    const daValue = root.querySelector('#daValue');
    const daDelta = root.querySelector('#daDelta');
    const traceV = root.querySelector('#traceV');
    const traceH = root.querySelector('#traceH');
    const tracePt = root.querySelector('#tracePt');
    const traceLabelG = root.querySelector('#traceLabel');
    const traceLabelText = root.querySelector('#traceLabelText');

    const updateTrace = () => {
      const pa = +paSlider.value;
      const oat = +oatSlider.value;
      const da = densityAlt(pa, oat);
      paLabel.textContent  = pa.toLocaleString() + ' ft';
      oatLabel.textContent = oat + '°C';
      daValue.textContent  = Math.max(0, da).toLocaleString();
      const delta = da - pa;
      daDelta.textContent = (delta >= 0 ? '+' : '') + delta.toLocaleString() + ' ft';
      const x = tToX(oat), y = paToY(pa);
      traceV.setAttribute('x1', x); traceV.setAttribute('x2', x);
      traceV.setAttribute('y1', CHART.y1); traceV.setAttribute('y2', y);
      traceH.setAttribute('x1', CHART.x0); traceH.setAttribute('x2', x);
      traceH.setAttribute('y1', y); traceH.setAttribute('y2', y);
      tracePt.setAttribute('cx', x); tracePt.setAttribute('cy', y);
      // Nudge label to stay inside the chart
      let lx = x + 8, ly = y;
      if (lx + 120 > CHART.x1) lx = x - 128;
      if (ly - 32 < CHART.y0) ly = y + 38;
      traceLabelG.setAttribute('transform', `translate(${lx},${ly})`);
      traceLabelText.textContent = `DA = ${Math.max(0, da).toLocaleString()} ft`;
    };
    paSlider.addEventListener('input', updateTrace);
    oatSlider.addEventListener('input', updateTrace);

    /* KJQF preset */
    root.querySelector('#daPresetBtn').addEventListener('click', () => {
      paSlider.value = 705;
      oatSlider.value = 35;
      updateTrace();
    });

    /* Initial render */
    updateTrace();
    renderStep();
  },

  // ===== PROCESS DIAGRAMS =====
  renderProcess(key) {
    const diag = this.PROCESS_DIAGRAMS[key];
    if (!diag) return '';
    const cid = `proc-${key}`;
    const step = diag.steps[0];
    const total = diag.steps.length;
    return `<div class="diagram-container" id="${cid}" data-step="0" data-diag-key="${key}" style="border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.12);margin:20px 0">
      <div class="diagram-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--navy)">
        <span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:800">${diag.title}</span>
        <span id="${cid}-counter" style="font-size:12px;color:#94A3B8;font-family:var(--font-display);font-weight:700">Step 1 of ${total}</span>
      </div>
      <div id="${cid}-svg" style="background:#F8FAFC;transition:opacity 0.18s ease">${step.svg}</div>
      <div id="${cid}-label" style="padding:14px 16px;background:white;border-top:1px solid #E2E8F0">
        <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:#0C1B33;margin-bottom:4px">${step.label}</div>
        <div style="font-size:13px;color:#475569;line-height:1.5">${step.description}</div>
      </div>
      <div style="display:flex;gap:10px;padding:12px 16px;background:#F8FAFC;border-top:1px solid #E2E8F0">
        <button id="${cid}-back" onclick="Diagrams.processStep('${key}',-1)" disabled style="flex:1;padding:10px 0;border-radius:12px;border:2px solid #E2E8F0;background:#F8FAFC;color:#94A3B8;font-family:var(--font-display);font-weight:700;font-size:14px;cursor:default">&#8592; Back</button>
        <button id="${cid}-next" onclick="Diagrams.processStep('${key}',1)" style="flex:2;padding:10px 0;border-radius:12px;border:none;background:#0C1B33;color:white;font-family:var(--font-display);font-weight:700;font-size:14px;cursor:pointer">Next &#8594;</button>
      </div>
    </div>`;
  },

  processStep(key, delta) {
    const cid = `proc-${key}`;
    const el = document.getElementById(cid);
    if (!el) return;
    const diag = this.PROCESS_DIAGRAMS[key];
    if (!diag) return;
    const current = parseInt(el.getAttribute('data-step') || '0', 10);
    const total = diag.steps.length;
    const next = Math.max(0, Math.min(total - 1, current + delta));
    if (next === current) return;
    const svgEl = document.getElementById(`${cid}-svg`);
    svgEl.style.opacity = '0';
    setTimeout(() => {
      el.setAttribute('data-step', next);
      const step = diag.steps[next];
      svgEl.innerHTML = step.svg;
      document.getElementById(`${cid}-label`).innerHTML = `<div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:#0C1B33;margin-bottom:4px">${step.label}</div><div style="font-size:13px;color:#475569;line-height:1.5">${step.description}</div>`;
      document.getElementById(`${cid}-counter`).textContent = `Step ${next + 1} of ${total}`;
      const back = document.getElementById(`${cid}-back`);
      const fwd = document.getElementById(`${cid}-next`);
      back.disabled = next === 0;
      back.style.background = next === 0 ? '#F8FAFC' : 'white';
      back.style.color = next === 0 ? '#94A3B8' : '#0C1B33';
      back.style.cursor = next === 0 ? 'default' : 'pointer';
      fwd.disabled = next === total - 1;
      fwd.style.background = next === total - 1 ? '#94A3B8' : '#0C1B33';
      fwd.style.cursor = next === total - 1 ? 'default' : 'pointer';
      fwd.innerHTML = next === total - 1 ? 'Done &#10003;' : 'Next &#8594;';
      svgEl.style.opacity = '1';
    }, 180);
  },

  PROCESS_DIAGRAMS: {
    frontal_lifting: {
      title: 'Frontal Lifting — Cold Front Cross-Section',
      steps: [
        {
          label: 'Step 1 — Warm Front: Gentle Slope, Gradual Lifting',
          description: 'A warm front forms where warm air advances over retreating cold air. The frontal slope is shallow (1:100–1:200). Warm air overrides cold air gradually — producing widespread stratiform clouds and steady precipitation hundreds of miles ahead of the surface front. Expect a long, slow deterioration over many hours.',
          svg: `<div style="background:#111827"><img src="img/awh/frontal_lifting_01.png" alt="Figure 11-5. Warm Front" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Plan view (top): warm air (red arrows) advancing over cold. Cross-section (bottom): shallow frontal slope, widespread cloud on cold side</div></div>`
        },
        {
          label: 'Step 2 — Cold Front: Steep Slope, Violent Lifting',
          description: 'A cold front forms where dense cold air advances and plows under warm air. The frontal slope is steep (1:50–1:100). Cold air violently undercuts the warm air — producing cumulonimbus, heavy rain, and thunderstorms in a narrow band near the surface front. Onset and passage are rapid.',
          svg: `<div style="background:#111827"><img src="img/awh/frontal_lifting_02.png" alt="Figure 11-6. Cold Front" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Plan view (top): cold air (blue arrows) advancing rapidly. Cross-section (bottom): steep slope, narrow intense weather band</div></div>`
        },
        {
          label: 'Step 3 — The Lift Mechanism: Cold Air Wedge Forces Warm Air Aloft',
          description: 'The cold air mass acts as a wedge beneath the warm air. Warm moist air is undercut and forced upward along the frontal boundary. As it rises it cools — first at the dry adiabatic rate (~3°C/1,000 ft) until saturation, then slower at the moist adiabatic rate. This mechanical lifting drives all frontal weather: clouds, precipitation, and turbulence at the zone of contact.',
          svg: `<div style="background:#111827"><img src="img/awh/frontal_lifting_03.png" alt="Figure 12-6. Frontal Lift" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Cold air (left, blue) undercuts warm air (right) — warm air forced aloft along the boundary, precipitation at surface intersection</div></div>`
        }
      ]
    },

    // thunderstorm_lifecycle was removed in the M6 §s6_2 redesign — that key
    // now routes to Diagrams.tsLifecycleSVG() / _initTsLifecycleModule() via
    // renderHotspot() in Diagrams.render(). The two FAA images
    // (img/awh/thunderstorm_lifecycle_01.png, _02.png) remain in sw.js
    // APP_SHELL because they may still be referenced elsewhere (concept maps,
    // FAA validation cross-refs); per the DA-module precedent they stay
    // cached.


    // density_altitude was removed in the M2 §s2_1 redesign — that key now
    // routes to Diagrams.renderDaModule() / _initDaModule() via the
    // dispatch in Diagrams.render(). The two FAA images
    // (img/awh/density_altitude_01.png, _02.png) remain in sw.js APP_SHELL
    // because they may still be referenced elsewhere (concept maps, FAA
    // validation cross-refs, future features); per the user's "no
    // APP_SHELL changes" rule they stay cached.

    orographic_effect: {
      title: 'Orographic Lift & Mountain Wave',
      steps: [
        {
          label: 'Step 1 — Windward Slope: Forced Lift, Cooling, Precipitation',
          description: 'Air flowing toward a mountain is forced upward (orographic lift). On the windward side, cooling begins at the dry adiabatic lapse rate (~3°C/1,000 ft) until the Lifting Condensation Level (LCL), where clouds form. Above the LCL the moist adiabatic rate slows cooling (~1.5°C/1,000 ft) as latent heat is released. Heavy precipitation falls on the windward slope. On the leeward side the Foehn effect produces warm, dry air significantly warmer than the windward starting temperature.',
          svg: `<div style="background:#111827"><img src="img/awh/orographic_effect_01.png" alt="Figure 12-4. Orographic Effects Example" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Windward (left): moist, cloudy, rain. Summit: temperature = dew point. Leeward (right): warm, dry Foehn wind descends</div></div>`
        },
        {
          label: 'Step 2 — Mountain Wave: Rotor, Lenticulars, Standing Waves',
          description: 'Stable air crossing a ridge near-perpendicular creates standing waves that extend far downwind and high into the stratosphere. Three hazard zones: (1) Cap Cloud — turbulent cloud attached to the ridgeline, (2) Rotor zone — beneath the first wave crest at or below ridge height, contains severe to extreme turbulence and strong downdrafts, (3) ACSL/CCSL lenticular clouds — mark wave crests at mid and high levels. A smooth cloud appearance does NOT mean smooth air.',
          svg: `<div style="background:#111827"><img src="img/awh/orographic_effect_02.png" alt="Figure 16-13. Schematic of Mountain Waves and Associated Clouds" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Cap cloud at ridge, Rotor below first crest (extreme turbulence zone), ACSL and CCSL lenticulars mark upper wave crests</div></div>`
        },
        {
          label: 'Step 3 — Identifying Mountain Wave Clouds in Real Life',
          description: 'This photograph shows all three wave cloud types simultaneously. ROTOR (bottom): chaotic turbulent cloud at low level — the most violent turbulence zone, structural damage possible. ACSL (middle): the classic smooth lens-shaped lenticular — marks a wave crest, strong wave motion underneath despite calm appearance. CCSL (top): high-altitude wispy lenticular. If lenticulars are visible, the wave is active. Avoid the rotor zone entirely and never descend below ridge height on the leeward side without confirming smooth stable air.',
          svg: `<div style="background:#111827"><img src="img/awh/orographic_effect_03.png" alt="Figure 16-14. Examples of Mountain Wave Clouds" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Real photo: CCSL (top), ACSL (center lens-shaped), ROTOR (bottom chaotic cloud) — mountain is off-frame to the left</div></div>`
        }
      ]
    },

    temperature_inversion: {
      title: 'Temperature Inversion Formation & Effects',
      steps: [
        {
          label: 'Step 1 — Reading an Inversion on an Atmospheric Sounding',
          description: 'On a sounding, altitude increases upward (pressure decreases toward the top) and temperature is plotted on the horizontal axis — warmer to the right. Normally temperature decreases with altitude (line trends left). A temperature inversion is where the line bends to the RIGHT — temperature INCREASES with altitude. This sounding shows both a surface-based inversion (near 1,000 mb) and an elevated inversion (near 700 mb).',
          svg: `<div style="background:#111827"><img src="img/awh/temperature_inversion_01.png" alt="Figure 5-9. Sounding with a Temperature Inversion" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Line bending RIGHT = inversion. Two inversions shown: SURFACE BASED (~1,000 mb) and ALOFT (~700 mb)</div></div>`
        },
        {
          label: 'Step 2 — How Inversions Form and What They Trap',
          description: 'Surface-based inversions form when the ground radiates heat rapidly on clear calm nights (radiation inversion) or when cold air advects under warmer air. They trap fog, smoke, and haze near the surface — producing IFR conditions by morning. Elevated (aloft) inversions form in subsidence zones under high-pressure ridges — they cap convection and prevent storm development, but concentrate turbulence just below the inversion layer.',
          svg: `<div style="background:#111827"><img src="img/awh/temperature_inversion_01.png" alt="Figure 5-9. Sounding with a Temperature Inversion" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Surface-based inversion: traps fog and haze near ground. Aloft inversion: caps convection, concentrates turbulence below it</div></div>`
        },
        {
          label: 'Step 3 — The Flight Hazard: Wind Shear at the Inversion Layer',
          description: 'A temperature inversion creates a sharp density boundary where wind speed and direction change abruptly — Low-Level Wind Shear (LLWS). An aircraft descending from warmer air above into cold stable air below experiences sudden airspeed loss (15–30 kt). This is most dangerous during approach at low altitude with little energy margin. PIREPs and AIRMETs are the primary means of detecting inversion-based LLWS.',
          svg: `<div style="background:#111827"><img src="img/awh/temperature_inversion_02.png" alt="Figure 19-6. Wind Shear Turbulence Associated with a Temperature Inversion" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Aircraft at the inversion boundary — vortices show wind shear turbulence where warm air (top) meets cold stable air (bottom)</div></div>`
        }
      ]
    },

    icing_accretion: {
      title: 'Ice Accretion on an Airfoil',
      steps: [
        {
          label: 'Step 1 — The Temperature Profile That Produces Freezing Rain',
          description: 'Freezing rain requires a specific atmospheric layering: a warm layer above 0°C melts falling snow into rain, then a shallow sub-freezing layer near the surface refreezes the drops on contact with aircraft. This "warm nose" profile — cold aloft / warm middle / cold surface — is the signature of freezing rain. Large drops spread beyond the leading edge before freezing, making this the most hazardous icing condition.',
          svg: `<div style="background:#111827"><img src="img/awh/icing_accretion_01.png" alt="Figure 14-4. Freezing Rain Temperature Environment" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Cold layer aloft → warm melting layer (pink, above 0°C) → cold surface layer = freezing rain. Dashed green line = 0°C isotherm</div></div>`
        },
        {
          label: 'Step 2 — Where Icing Occurs Along a Frontal Boundary',
          description: 'Icing occurs where supercooled liquid water (SLW) droplets exist — between 0°C and about −20°C. Along a front, precipitation transitions from snow (cold side) through ice pellets and freezing rain (near 0°C line) to rain (warm side). The SLW icing threat extends well above the frontal surface into the cloud deck. The supercooled water droplet zone is the primary icing hazard for aircraft.',
          svg: `<div style="background:#111827"><img src="img/awh/icing_accretion_02.png" alt="Figure 20-1. Icing with Fronts" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Supercooled water droplet zone (top of pink band above 0°C line) — this is where structural icing is most severe</div></div>`
        },
        {
          label: 'Step 3 — Orographic Icing: Enhanced Threat Over Windward Slopes',
          description: 'Mountains force moist air upward, creating rapid condensation with high liquid water content. The 0°C isotherm (dashed line) marks the icing zone boundary. Aircraft flying through cloud over the windward slope encounter significant icing. Moisture advects over the ridge affecting the leeward side too. Always check AIRMET Zulu (icing) and AIRMET Sierra (IFR) before crossing mountain terrain, and be alert for SLD (Supercooled Large Droplets) in orographic scenarios.',
          svg: `<div style="background:#111827"><img src="img/awh/icing_accretion_03.png" alt="Figure 20-2. Icing with Mountains" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; 0°C isotherm (dashed) marks icing zone boundary — cloud from base to summit on windward side is the highest-risk area</div></div>`
        }
      ]
    },

    metar_syntax: {
      title: 'METAR Group-by-Group Decode',
      steps: [
        {
          label: 'Step 1 — The Official METAR Coding Format (FAA AWH Fig. 24-1)',
          description: 'Every METAR follows this left-to-right structure: Type of Report → Station Identifier → Date/Time → Report Modifier → Wind → Visibility → RVR → Present Weather → Sky Condition → Temperature/Dew Point → Altimeter → Remarks. This is Figure 24-1 from the FAA Aviation Weather Handbook — the authoritative annotated METAR format. Steps 2–5 decode each group in sequence.',
          svg: `<div style="background:#111827"><img src="img/awh/metar_syntax.png" alt="Figure 24-1. METAR/SPECI Coding Format" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Full METAR layout — read strictly left to right, one group at a time</div></div>`
        },
        {
          label: 'Step 2 — Type · Station · Date/Time · Modifier',
          description: 'TYPE: METAR (routine hourly) or SPECI (special, issued for significant condition changes). STATION: 4-letter ICAO identifier (e.g., KOKC = Oklahoma City Will Rogers). DATE/TIME: DDHHMMz in UTC — e.g., 011955Z = 1st day of month at 1955 UTC. MODIFIER: AUTO = automated station, no human observer; COR = corrected report superseding a prior transmission.',
          svg: `<div style="background:#111827"><img src="img/awh/metar_syntax.png" alt="Figure 24-1. METAR/SPECI Coding Format" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Focus: TYPE · STATION IDENTIFIER · DATE AND TIME OF REPORT · REPORT MODIFIER (upper-left groups)</div></div>`
        },
        {
          label: 'Step 3 — Wind · Visibility · RVR',
          description: 'WIND: dddffKT — 3-digit true direction, speed in knots; gusts as GXX (e.g., 18025G35KT); variable direction as VRB; calm as 00000KT. VISIBILITY: in statute miles (e.g., P6SM = more than 6 SM; 1/4SM = quarter mile). RVR (Runway Visual Range): reported in feet when visibility is below 1 SM — e.g., R17L/2600FT = Runway 17L RVR is 2,600 ft. RVR governs Part 91/121/135 landing minimums.',
          svg: `<div style="background:#111827"><img src="img/awh/metar_syntax.png" alt="Figure 24-1. METAR/SPECI Coding Format" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Focus: WIND · VISIBILITY · RUNWAY VISUAL RANGE — the three groups most critical to departure and arrival decisions</div></div>`
        },
        {
          label: 'Step 4 — Present Weather · Sky Condition',
          description: 'PRESENT WEATHER: intensity prefix (– light, none = moderate, + heavy) + descriptor (TS, FZ, SH, BL, DR) + phenomenon (RA, SN, FG, BR, HZ). Examples: +TSRA = heavy thunderstorm with rain; FZFG = freezing fog; –RASN = light rain and snow. SKY CONDITION: coverage oktas + height in hundreds of feet AGL: FEW=1–2, SCT=3–4, BKN=5–7, OVC=8. CB or TCU suffix for convective clouds (e.g., OVC010CB). CLR or SKC = no clouds below 12,000 ft AGL.',
          svg: `<div style="background:#111827"><img src="img/awh/metar_syntax.png" alt="Figure 24-1. METAR/SPECI Coding Format" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Focus: PRESENT WEATHER (+TSRA BR) · SKY CONDITION (OVC010CB) — these two groups define the IFR/VFR category</div></div>`
        },
        {
          label: 'Step 5 — Temperature/Dew Point · Altimeter · Remarks',
          description: 'TEMP/DEW: In °C separated by /. M prefix = minus (e.g., M02/M08). A spread of ≤3°C indicates near-saturation — fog or low stratus likely. ALTIMETER: A + 4 digits in inHg (e.g., A2992 = 29.92 inHg). REMARKS (RMK): AO1/AO2 = automated station type, SLP = sea-level pressure (SLP132 = 1013.2 mb), P = hourly precipitation, TSB/TSE = thunderstorm begin/end time, maintenance flags.',
          svg: `<div style="background:#111827"><img src="img/awh/metar_syntax.png" alt="Figure 24-1. METAR/SPECI Coding Format" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Focus: TEMPERATURE AND DEW POINT · ALTIMETER · REMARKS (RMK) — right-side groups</div></div>`
        }
      ]
    },

    taf_change_groups: {
      title: 'TAF Change Group Indicators',
      steps: [
        {
          label: 'Step 1 — TAF Structure: Base Forecast + Change Groups',
          description: 'A TAF begins with a base forecast covering the entire valid period: CCCC location, valid time window, wind, visibility, significant weather, sky condition, and nonconvective LLWS. Change group indicators then MODIFY or REPLACE the base for specific time windows. This is Table 27-3 from the FAA Aviation Weather Handbook — the official generic NWS TAF format. The top rows are base forecast fields; the bottom row shows the change group types.',
          svg: `<div style="background:#111827"><img src="img/awh/taf_change_groups.png" alt="Table 27-3. Generic Format of the National Weather Service's TAFs" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Top rows = base forecast fields. Bottom row = change indicators: FM (From), TEMPO, BECMG, PROB</div></div>`
        },
        {
          label: 'Step 2 — FM: Complete Replacement, Abrupt Change',
          description: 'FM (From) replaces ALL previous forecast conditions from the stated time forward. Format: FMhhmm (e.g., FM1930 = from 1930Z). After FM, every element (wind, vis, weather, sky) is replaced entirely — no carryover from prior conditions. FM is used when conditions change completely and abruptly: a frontal passage, sea breeze onset, or air mass change. FM is the most definitive change group.',
          svg: `<div style="background:#111827"><img src="img/awh/taf_change_groups.png" alt="Table 27-3. Generic Format of the National Weather Service's TAFs" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; FM group (bottom-left): FMhhmm replaces ALL conditions from that time forward — most definitive change group</div></div>`
        },
        {
          label: 'Step 3 — TEMPO: Temporary Fluctuations (< 1 hr Each)',
          description: 'TEMPO temporarily OVERLAYS the base or FM forecast. Conditions last less than one hour at a time AND occur for less than half the total TEMPO window. Format: TEMPO hhmm/hhmm. TEMPO does NOT replace the base — think of it as "except occasionally." Only listed elements change; others revert to the base when the TEMPO condition ends. Used for intermittent thunderstorms, brief visibility drops, and temporary wind gusts.',
          svg: `<div style="background:#111827"><img src="img/awh/taf_change_groups.png" alt="Table 27-3. Generic Format of the National Weather Service's TAFs" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; TEMPO group: temporary overlay on base conditions — NOT a replacement. Unlisted elements remain at base values.</div></div>`
        },
        {
          label: 'Step 4 — BECMG: Gradual, Permanent Transition',
          description: 'BECMG (Becoming) indicates a gradual PERMANENT change to new conditions. Format: BECMG hhmm/hhmm — the transition occurs within this window. After the window closes, the new conditions become the ongoing base. Unlike TEMPO, BECMG replaces the base permanently. Used for gradual clearing, fog dissipation, or slow frontal passage taking 2–4 hours. If only some elements are listed, only those change; others carry forward.',
          svg: `<div style="background:#111827"><img src="img/awh/taf_change_groups.png" alt="Table 27-3. Generic Format of the National Weather Service's TAFs" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; BECMG group: gradual permanent transition — new conditions persist as the base after the change window closes</div></div>`
        },
        {
          label: 'Step 5 — PROB30: 30% Probability of Alternate Conditions',
          description: 'PROB30 explicitly states the probability of an alternate thunderstorm or precipitation event (and its associated wind/visibility/sky conditions) — 30% chance. Format: PROB30 YYGG/YeGe. Used for isolated thunderstorms or brief IFR conditions that are possible but not the primary scenario. PROB30 is the only PROB group used by NWS in U.S. domestic TAFs; PROB40 appears only in military and international TAFs. Alternate planning: if a TAF contains ceiling below 2,000 ft or visibility below 3 SM within ±1 hr of your ETA — even under PROB30 — review 14 CFR 91.169 for alternate requirements.',
          svg: `<div style="background:#111827"><img src="img/awh/taf_change_groups.png" alt="Table 27-3. Generic Format of the National Weather Service's TAFs" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; PROB group (bottom-right): 30% or 40% probability of alternate conditions — check against IFR alternate planning rules (91.169)</div></div>`
        }
      ]
    }
  }
};
