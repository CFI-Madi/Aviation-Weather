// ============================================================
// Aviation Weather Academy — Diagrams
// ============================================================

const Diagrams = {
  // Unified render — handles all three acts' diagram patterns
  render(type, key) {
    // Act 1 patterns (hotspot / slider with svgKey)
    if (type === 'hotspot') return this.renderHotspot(key);
    if (type === 'slider') return this.renderSlider(key);
    // Act 2 pattern (interactive with key)
    if (type === 'interactive') {
      const fns = {
        cb_lifecycle:()=>this.cbLifecycle(),
        cb_ingredients:()=>this.cbIngredients(),
        ice_types:()=>this.iceTypes(),
        turbulence_sources:()=>this.turbulenceSources(),
        fog_types:()=>this.fogTypes(),
        mountain_wave:()=>this.mountainWave(),
        microburst_approach:()=>this.microburstApproach(),
        icing_severity:()=>this.icingSeverityCalc(),
        turbulence_scale:()=>this.turbulenceScale(),
        fog_formation:()=>this.fogFormationCalc(),
      };
      return fns[key] ? fns[key]() : '';
    }
    // Act 3 direct type patterns
    if (type === 'metar_decoder') return this.renderMetarDecoder();
    if (type === 'taf_decoder') return this.renderTafDecoder();
    if (type === 'pirep_decoder') return this.renderPirepDecoder();
    if (type === 'radar_guide') return this.renderRadarGuide();
    if (type === 'flight_category_calc') return this.renderFlightCategoryCalc();
    if (type === 'weather_code_builder') return this.renderWeatherCodeBuilder();
    if (type === 'advisory_hierarchy') return this.renderAdvisoryHierarchy();
    if (type === 'decode_practice') return this.renderDecodePractice();
    if (type === 'process') return this.renderProcess(key);
    return '';
  },

  // ===== ACT 1 DIAGRAMS =====
  renderHotspot(key) {
    const configs = {
      atmosphere_layers: {
        title: '🔍 Atmospheric Layers — Tap a Layer',
        svgContent: this.atmosphereSVG(),
      },
      wind_forces: {
        title: '🔍 Wind Forces — Tap to Explore',
        svgContent: this.windForcesSVG(),
      },
      fronts_diagram: {
        title: '🔍 Front Types — Tap Each Symbol',
        svgContent: this.frontsSVG(),
      },
      cloud_gallery: {
        title: '☁️ Cloud ID Gallery — Tap Each Cloud',
        svgContent: this.cloudGallerySVG(),
      },
      jet_stream: {
        title: '✈️ Jet Stream Interactive — Tap Elements',
        svgContent: this.jetStreamSVG(),
      },
      pressure_systems: {
        title: '🗺️ Pressure Systems — Tap Each Type',
        svgContent: this.pressureSystemsSVG(),
      },
      cold_front_cross: {
        title: '❄️ Cold Front Cross-Section — Tap Features',
        svgContent: this.coldFrontCrossSectionSVG(),
      }
    };
    const cfg = configs[key];
    if (!cfg) return '';
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
      <div id="atmo-popup" style="display:none;position:absolute;bottom:0;left:0;right:0;background:rgba(12,27,51,0.96);color:white;padding:16px;font-family:var(--font-display);font-size:13px;line-height:1.5">
        <strong id="atmo-popup-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
        <span id="atmo-popup-text"></span>
      </div>
    </div>`;
  },

  windForcesSVG() {
    return `<div style="position:relative">
      <svg viewBox="0 0 400 280" style="width:100%;display:block;background:#EFF6FF">
        <!-- Isobars -->
        <text x="10" y="50" font-family="Space Mono" font-size="10" fill="#3B82F6" font-weight="700">1020 mb</text>
        <line x1="0" y1="55" x2="400" y2="55" stroke="#93C5FD" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="10" y="110" font-family="Space Mono" font-size="10" fill="#3B82F6" font-weight="700">1016 mb</text>
        <line x1="0" y1="115" x2="400" y2="115" stroke="#93C5FD" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="10" y="170" font-family="Space Mono" font-size="10" fill="#3B82F6" font-weight="700">1012 mb (Low)</text>
        <line x1="0" y1="175" x2="400" y2="175" stroke="#3B82F6" stroke-width="2"/>
        <!-- PGF Arrow -->
        <defs>
          <marker id="arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#EF4444"/>
          </marker>
          <marker id="arr-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#6366F1"/>
          </marker>
          <marker id="arr-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#10B981"/>
          </marker>
        </defs>
        <line x1="200" y1="55" x2="200" y2="165" stroke="#EF4444" stroke-width="3" marker-end="url(#arr-red)"/>
        <rect x="210" y="95" width="80" height="24" rx="8" fill="#FEE2E2"/>
        <text x="250" y="111" font-family="Nunito" font-size="11" fill="#EF4444" text-anchor="middle" font-weight="800">PGF ↓</text>
        <!-- Coriolis -->
        <path d="M200 115 Q280 95 320 130" stroke="#6366F1" stroke-width="3" fill="none" marker-end="url(#arr-blue)"/>
        <text x="295" y="108" font-family="Nunito" font-size="11" fill="#6366F1" font-weight="800">Coriolis →</text>
        <!-- Result wind -->
        <line x1="95" y1="115" x2="165" y2="115" stroke="#10B981" stroke-width="3" marker-end="url(#arr-green)"/>
        <text x="65" y="111" font-family="Nunito" font-size="11" fill="#10B981" font-weight="800">Wind</text>
        <!-- Labels -->
        <text x="200" y="220" font-family="Nunito" font-size="11" fill="#64748B" text-anchor="middle">Tap forces to learn more</text>
        <!-- Clickable areas -->
        <rect x="170" y="50" width="60" height="120" fill="transparent" onclick="Diagrams.showPopup('wf-pgf','Pressure Gradient Force','➡️ Pushes air from HIGH pressure toward LOW pressure. Acts perpendicular to isobars. Closer isobars = stronger PGF = faster wind. The PRIMARY driver of all wind.')"/>
        <rect x="260" y="85" width="130" height="60" fill="transparent" onclick="Diagrams.showPopup('wf-cor','Coriolis Force','🌀 Deflects wind to the RIGHT in the Northern Hemisphere (left in SH). Caused by Earth rotation. Zero at equator, max at poles. Balances PGF at upper levels → geostrophic wind parallel to isobars.')"/>
        <rect x="40" y="95" width="120" height="40" fill="transparent" onclick="Diagrams.showPopup('wf-res','Resulting Wind','💨 Upper-level geostrophic wind flows parallel to isobars (PGF + Coriolis balanced). Surface wind crosses isobars at 10–45° angle toward low pressure (friction force deflects it further).')"/>
      </svg>
      <div id="wf-popup" style="display:none;background:var(--navy);color:white;padding:14px 16px;font-family:var(--font-display);font-size:13px;line-height:1.5">
        <strong id="wf-popup-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
        <span id="wf-popup-text"></span>
      </div>
    </div>`;
  },

  frontsSVG() {
    return `<div style="position:relative">
      <svg viewBox="0 0 400 310" style="width:100%;display:block;background:#F0F9FF">
        <text x="200" y="22" font-family="Nunito" font-size="13" fill="#0C1B33" text-anchor="middle" font-weight="800">Tap each front symbol to learn its characteristics</text>

        <!-- ── ROW 1 ── -->

        <!-- Cold Front (top-left) -->
        <g onclick="Diagrams.showPopup('fr-cold','❄️ Cold Front','COLD air advancing and replacing warm air. Steep frontal slope (~1:50–1:100). Fast-moving (25–30 mph, up to 60 mph). Narrow intense weather band — often a squall line. Rapid clearing after passage: cold, clear, gusty NW wind, pressure rises. Symbol: BLUE line with triangles pointing direction of movement.')" style="cursor:pointer" tabindex="0" role="button" aria-label="Cold Front" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
          <rect x="10" y="35" width="185" height="95" fill="rgba(37,99,235,0.06)" rx="12"/>
          <line x1="25" y1="82" x2="185" y2="82" stroke="#2563EB" stroke-width="4"/>
          ${[40,65,90,115,140,165].map(x=>`<polygon points="${x},82 ${x-7},68 ${x+7},68" fill="#2563EB"/>`).join('')}
          <text x="105" y="108" font-family="Nunito" font-size="12" fill="#2563EB" text-anchor="middle" font-weight="800">❄️ COLD FRONT</text>
          <text x="105" y="122" font-family="Nunito" font-size="9" fill="#64748B" text-anchor="middle">Steep slope · Fast · Intense</text>
        </g>

        <!-- Warm Front (top-right) -->
        <g onclick="Diagrams.showPopup('fr-warm','🔥 Warm Front','WARM air advancing over retreating cold air. Very gentle slope (~1:100–1:200). Slow-moving (10–25 mph). Widespread stratiform weather 500–1,000+ miles ahead. Prolonged IFR: low ceilings, fog, continuous rain or drizzle. Cloud sequence ahead: Ci → Cs → As → Ns. Symbol: RED line with semicircles pointing direction of movement.')" style="cursor:pointer" tabindex="0" role="button" aria-label="Warm Front" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
          <rect x="205" y="35" width="185" height="95" fill="rgba(220,38,38,0.06)" rx="12"/>
          <line x1="220" y1="82" x2="380" y2="82" stroke="#DC2626" stroke-width="4"/>
          ${[230,255,280,305,330,355].map(x=>`<circle cx="${x}" cy="82" r="9" fill="#DC2626"/>`).join('')}
          <text x="300" y="108" font-family="Nunito" font-size="12" fill="#DC2626" text-anchor="middle" font-weight="800">🌧️ WARM FRONT</text>
          <text x="300" y="122" font-family="Nunito" font-size="9" fill="#64748B" text-anchor="middle">Gentle slope · Slow · Widespread IFR</text>
        </g>

        <!-- ── ROW 2 ── -->

        <!-- Stationary Front (bottom-left) — MISSING from original, now added -->
        <g onclick="Diagrams.showPopup('fr-stat','⏸️ Stationary Front','Two air masses in equilibrium — NEITHER advances. Frontal slope varies. Weather: a mix of both warm and cold front characteristics. Can persist for DAYS producing prolonged IFR conditions. Pilots planning cross-country flights must account for stationary fronts lingering on the route. Symbol: ALTERNATING blue triangles (pointing toward cold air) above the line and red semicircles (pointing toward warm air) below the line — opposite directions indicate no movement.')" style="cursor:pointer" tabindex="0" role="button" aria-label="Stationary Front" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
          <rect x="10" y="155" width="185" height="110" fill="rgba(99,102,241,0.06)" rx="12"/>
          <line x1="25" y1="205" x2="185" y2="205" stroke="#4F46E5" stroke-width="3.5"/>
          <!-- Blue triangles ABOVE line (toward cold air — north side) -->
          ${[38,78,118,158].map(x=>`<polygon points="${x},205 ${x-7},191 ${x+7},191" fill="#2563EB"/>`).join('')}
          <!-- Red semicircles BELOW line (toward warm air — south side) -->
          ${[58,98,138,178].map(x=>`<path d="M ${x-8},205 A 8,8 0 0,1 ${x+8},205" fill="#DC2626"/>`).join('')}
          <text x="105" y="232" font-family="Nunito" font-size="11" fill="#4F46E5" text-anchor="middle" font-weight="800">⏸️ STATIONARY FRONT</text>
          <text x="105" y="246" font-family="Nunito" font-size="9" fill="#64748B" text-anchor="middle">Neither advances · Days of IFR</text>
          <text x="50" y="192" font-family="Space Mono" font-size="8" fill="#2563EB" font-weight="700">COLD AIR ↑</text>
          <text x="50" y="222" font-family="Space Mono" font-size="8" fill="#DC2626" font-weight="700">WARM AIR ↓</text>
        </g>

        <!-- Occluded Front (bottom-right) -->
        <g onclick="Diagrams.showPopup('fr-occ','🔄 Occluded Front','Cold front OVERTAKES warm front. Cold air undercuts BOTH fronts, lifting warm air completely off the surface. Result: elements of BOTH front types simultaneously — warm-front widespread IFR AND cold-front convection/icing. Most complex aviation weather. Cold occlusion (more common): new cold air colder than old cold air. Warm occlusion: new cold air warmer than old cold air — freezing rain trap. Symbol: PURPLE line with alternating triangles AND semicircles on the SAME side.')" style="cursor:pointer" tabindex="0" role="button" aria-label="Occluded Front" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
          <rect x="205" y="155" width="185" height="110" fill="rgba(124,58,237,0.06)" rx="12"/>
          <line x1="220" y1="205" x2="380" y2="205" stroke="#7C3AED" stroke-width="4"/>
          <!-- Alternating triangle+semicircle on top (same side = purple = both types merged) -->
          <polygon points="238,205 231,191 245,191" fill="#7C3AED"/>
          <circle cx="263" cy="205" r="8" fill="#7C3AED"/>
          <polygon points="288,205 281,191 295,191" fill="#7C3AED"/>
          <circle cx="313" cy="205" r="8" fill="#7C3AED"/>
          <polygon points="338,205 331,191 345,191" fill="#7C3AED"/>
          <circle cx="363" cy="205" r="8" fill="#7C3AED"/>
          <text x="300" y="232" font-family="Nunito" font-size="11" fill="#7C3AED" text-anchor="middle" font-weight="800">🔄 OCCLUDED FRONT</text>
          <text x="300" y="246" font-family="Nunito" font-size="9" fill="#64748B" text-anchor="middle">Both front types · Most complex Wx</text>
        </g>

        <text x="200" y="295" font-family="Space Mono" font-size="9" fill="#94A3B8" text-anchor="middle">FAA-H-8083-28A Chapter 11 — Tap any front for full description</text>
      </svg>
      <div id="fr-popup" style="display:none;background:var(--navy);color:white;padding:14px 16px;font-family:var(--font-display);font-size:13px;line-height:1.5;border-radius:0 0 16px 16px">
        <strong id="fr-popup-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
        <span id="fr-popup-text"></span>
      </div>
    </div>`;
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
      },
      inversion_types: {
        title: '🌡️ Temperature Inversion Types',
        content: this.inversionTypesSVG()
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
    return `<div style="position:relative;background:#F0F9FF">
      <div style="padding:14px 16px 8px;font-family:var(--font-display);font-size:13px;color:#64748B;font-weight:700">TAP A CLOUD TO IDENTIFY IT — Can you name them all?</div>
      <div id="cg-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;padding:0 2px 2px">
        ${[
          {id:'ci', name:'Cirrus', level:'HIGH  >20,000 ft', color:'#BAE6FD', text:'#0284C7', hazard:'⚠️ First sign of warm front 500+ mi ahead. No icing hazard alone.', shape:'wispy', bg:'linear-gradient(180deg,#0C1B33 0%,#1E3A8A 40%,#3B82F6 100%)'},
          {id:'cs', name:'Cirrostratus', level:'HIGH  >20,000 ft', color:'#DBEAFE', text:'#1D4ED8', hazard:'☀️ Produces 22° halo around sun/moon. Warm front approaching.', shape:'veil', bg:'linear-gradient(180deg,#1E3A8A 0%,#3B82F6 60%,#93C5FD 100%)'},
          {id:'ac', name:'Altocumulus', level:'MIDDLE  6,500–20,000 ft', color:'#E0E7FF', text:'#4338CA', hazard:'⚡ Castellanus type = instability + afternoon storm potential.', shape:'rolls', bg:'linear-gradient(180deg,#3B82F6 0%,#6366F1 40%,#A5B4FC 100%)'},
          {id:'as', name:'Altostratus', level:'MIDDLE  6,500–20,000 ft', color:'#EEF2FF', text:'#6366F1', hazard:'🌧️ "Ground glass" sun appearance. Continuous rain ahead. IFR threat.', shape:'sheet', bg:'linear-gradient(180deg,#475569 0%,#64748B 50%,#94A3B8 100%)'},
          {id:'sc', name:'Stratocumulus', level:'LOW  <6,500 ft', color:'#D1FAE5', text:'#065F46', hazard:'✈️ Most common cloud type globally. Usually no icing. Ceiling issue.', shape:'lumpy', bg:'linear-gradient(180deg,#64748B 0%,#94A3B8 40%,#CBD5E1 100%)'},
          {id:'ns', name:'Nimbostratus', level:'LOW  <6,500 ft', color:'#FEE2E2', text:'#9F1239', hazard:'🚨 Continuous moderate-heavy rain/snow. Low ceilings. Severe IFR.', shape:'dark', bg:'linear-gradient(180deg,#1E293B 0%,#334155 50%,#475569 100%)'},
          {id:'cu', name:'Cumulus', level:'VERTICAL', color:'#FEF3C7', text:'#92400E', hazard:'🌤️ Fair weather = small & flat. Towering = instability growing. Watch tops!', shape:'puffy', bg:'linear-gradient(180deg,#38BDF8 0%,#7DD3FC 40%,#BAE6FD 100%)'},
          {id:'cb', name:'Cumulonimbus', level:'VERTICAL  to Tropopause', color:'#FFE4E6', text:'#9F1239', hazard:'⛔ AVOID by 20 NM in IMC. Extreme turbulence, icing, hail, lightning, tornadoes, waterspouts.', shape:'anvil', bg:'linear-gradient(180deg,#1E293B 0%,#334155 30%,#475569 60%,#F59E0B 100%)'},
        ].map(c => `
        <div onclick="Diagrams.showCloudInfo('${c.id}')" style="cursor:pointer;position:relative;height:110px;background:${c.bg};overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end">
          ${c.shape==='wispy'?`<svg viewBox="0 0 150 60" style="position:absolute;top:10px;left:0;width:100%;opacity:0.9"><path d="M10,40 Q40,20 80,30 Q100,25 130,35" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6"/><path d="M20,50 Q60,35 100,45" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.5"/></svg>`:
          c.shape==='veil'?`<div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.08) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.08) 75%,transparent 75%);background-size:12px 12px;opacity:0.6"></div>`:
          c.shape==='rolls'?`<svg viewBox="0 0 150 60" style="position:absolute;top:5px;left:0;width:100%;opacity:0.8">${[15,45,75,105,135].map(x=>`<ellipse cx="${x}" cy="30" rx="18" ry="14" fill="rgba(255,255,255,0.5)"/>`).join('')}</svg>`:
          c.shape==='sheet'?`<div style="position:absolute;inset:0;background:rgba(255,255,255,0.12)"></div>`:
          c.shape==='lumpy'?`<svg viewBox="0 0 150 60" style="position:absolute;top:8px;left:0;width:100%;opacity:0.75">${[10,35,60,85,110,135].map(x=>`<ellipse cx="${x}" cy="35" rx="20" ry="16" fill="rgba(255,255,255,0.4)"/>`).join('')}</svg>`:
          c.shape==='dark'?`<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,transparent 100%)"></div>`:
          c.shape==='puffy'?`<svg viewBox="0 0 150 80" style="position:absolute;top:0;left:0;width:100%;opacity:0.85"><ellipse cx="75" cy="55" rx="40" ry="22" fill="rgba(255,255,255,0.7)"/><ellipse cx="60" cy="42" rx="28" ry="20" fill="rgba(255,255,255,0.7)"/><ellipse cx="90" cy="40" rx="24" ry="18" fill="rgba(255,255,255,0.7)"/><ellipse cx="75" cy="35" rx="20" ry="16" fill="rgba(255,255,255,0.8)"/></svg>`:
          `<svg viewBox="0 0 150 100" style="position:absolute;top:0;left:0;width:100%;opacity:0.85"><polygon points="75,5 110,5 130,15 75,15" fill="rgba(255,255,255,0.5)"/><ellipse cx="75" cy="40" rx="38" ry="28" fill="rgba(255,255,255,0.6)"/><ellipse cx="60" cy="55" rx="28" ry="20" fill="rgba(255,255,255,0.65)"/><ellipse cx="90" cy="53" rx="24" ry="18" fill="rgba(255,255,255,0.65)"/><rect x="45" y="60" width="60" height="35" fill="rgba(255,255,255,0.55)" rx="4"/></svg>`}
          <div style="position:relative;z-index:2;padding:8px 10px;background:linear-gradient(0deg,rgba(0,0,0,0.7) 0%,transparent 100%)">
            <div style="font-family:var(--font-display);font-weight:900;font-size:13px;color:white">${c.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:rgba(255,255,255,0.7)">${c.level}</div>
          </div>
        </div>`).join('')}
      </div>
      <div id="cg-info" style="display:none;background:var(--navy);padding:16px;margin:0">
        <div id="cg-info-name" style="font-family:var(--font-display);font-weight:900;font-size:16px;color:#38BDF8;margin-bottom:4px"></div>
        <div id="cg-info-level" style="font-family:var(--font-mono);font-size:10px;color:#94A3B8;margin-bottom:8px"></div>
        <div id="cg-info-hazard" style="font-size:13px;color:white;line-height:1.6"></div>
        <div style="margin-top:10px;font-size:11px;color:#64748B">Tap another cloud to compare</div>
      </div>
    </div>`;
  },

  showCloudInfo(id) {
    const clouds = {
      ci:{name:'Cirrus (Ci)',level:'HIGH — above 20,000 ft | Ice crystal clouds',hazard:'⚠️ Pilot alert: Cirrus is the FIRST SIGN of an approaching warm front, sometimes 500–1,000 miles ahead. Alone, it poses no icing or turbulence hazard, but its appearance should prompt you to obtain an updated weather briefing. Cirrus forming rapidly in organized bands indicates increasing moisture aloft — frontal passage in 12–24 hours.'},
      cs:{name:'Cirrostratus (Cs)',level:'HIGH — above 20,000 ft | Ice crystal veil',hazard:'☀️ Produces characteristic 22° halo rings around the sun or moon — a reliable indicator of cirrostratus. The sun/moon appears as though seen through frosted glass. Almost always associated with an approaching warm front. Can produce light icing in aircraft. Transition: Ci → Cs → As is the classic warm front sequence.'},
      ac:{name:'Altocumulus (Ac)',level:'MIDDLE — 6,500–20,000 ft | Mixed water & ice',hazard:'⚡ Altocumulus appears as gray/white patches, often in waves or rolls. KEY HAZARD: Altocumulus castellanus (Ac cas) — these turreted, castle-like tops signal significant instability in the middle troposphere. Ac cas in the morning strongly predicts severe afternoon thunderstorms. Moderate icing possible. Do not confuse with cirrocumulus (higher, no shading).'},
      as:{name:'Altostratus (As)',level:'MIDDLE — 6,500–20,000 ft | Gray sheet',hazard:'🌧️ Thick gray/blue sheet covering the sky. The sun appears as if seen through "ground glass" — diffuse, no distinct edges, no halo (that would be Cs). Altostratus produces continuous light-to-moderate rain or snow. Creates widespread IFR conditions. Moderate icing likely. Typically associated with approaching warm fronts. Can lower ceiling below approach minimums.'},
      sc:{name:'Stratocumulus (Sc)',level:'LOW — below 6,500 ft | Water droplets',hazard:'✈️ The most common cloud type on Earth. Low, lumpy rolls or patches of gray/white. Usually associated with stable air and high pressure. Often breaks up during the day with heating. Ceiling/visibility impact: can create persistent overcast and IFR conditions, especially in winter. Light turbulence within cloud. Icing possible but usually light. VFR pilots: check ceiling carefully before departure.'},
      ns:{name:'Nimbostratus (Ns)',level:'LOW — below 6,500 ft | Dark rain cloud',hazard:'🚨 PILOT ALERT: The continuous-precipitation cloud. Dark, featureless, blanketing gray layer producing steady moderate-to-heavy rain or snow. Ceilings often below 1,000 ft, visibility less than 3 SM. Can extend vertically from low levels to 20,000+ ft. Moderate-to-heavy icing throughout. No distinct "base" — just wall-to-wall IFR. Primary IFR challenge with warm fronts. Plan alternates carefully.'},
      cu:{name:'Cumulus (Cu)',level:'VERTICAL DEVELOPMENT | Convective',hazard:'🌤️ Fair weather cumulus: flat bases, limited vertical extent (tops below 8,000 ft) — indicates surface heating and light instability. Safe for VFR. WATCH: Towering Cumulus (TCu) — rapid vertical growth, cauliflower-like tops. This is the pre-storm stage. If you see TCu building, convective activity is likely within 1–2 hours. Time your flight to avoid the building stage.'},
      cb:{name:'Cumulonimbus (Cb)',level:'VERTICAL — Surface to Tropopause | THE hazard cloud',hazard:'⛔ AVOID. ALWAYS. The most dangerous cloud in aviation. Contains: extreme turbulence (structural damage possible), wind shear and microbursts, severe icing at all levels, large hail (up to baseball-sized), lightning (direct strike + corona discharge), reduced visibility to zero, possible embedded tornadoes or waterspouts. CLEARANCE: 20 NM in IMC; 5 NM minimum in VMC; avoid flying beneath the anvil. No route is worth penetrating a Cb.'},
    };
    const c = clouds[id];
    if (!c) return;
    const info = document.getElementById('cg-info');
    document.getElementById('cg-info-name').textContent = c.name;
    document.getElementById('cg-info-level').textContent = c.level;
    document.getElementById('cg-info-hazard').textContent = c.hazard;
    info.style.display = 'block';
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

  // ── NEW: JET STREAM INTERACTIVE ──────────────────────────
  jetStreamSVG() {
    return `<div style="padding:16px;background:#0C1B33">
      <svg viewBox="0 0 380 220" style="width:100%;display:block">
        <defs>
          <linearGradient id="earthGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1E3A8A"/>
            <stop offset="60%" stop-color="#0369A1"/>
            <stop offset="100%" stop-color="#38BDF8"/>
          </linearGradient>
        </defs>
        <rect width="380" height="220" fill="#0C1B33"/>
        <!-- Latitude bands -->
        <text x="10" y="30" font-family="Nunito" font-size="9" fill="#94A3B8">90°N (Pole)</text>
        <text x="10" y="80" font-family="Nunito" font-size="9" fill="#94A3B8">60°N</text>
        <text x="10" y="130" font-family="Nunito" font-size="9" fill="#94A3B8">30°N</text>
        <text x="10" y="180" font-family="Nunito" font-size="9" fill="#94A3B8">Equator</text>
        <!-- Polar jet stream -->
        <path d="M60,75 Q140,60 220,80 Q280,95 340,70" stroke="#38BDF8" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9" onclick="Diagrams.showJetInfo('polar')" style="cursor:pointer"/>
        <text x="180" y="58" text-anchor="middle" font-family="Nunito" font-size="11" fill="#38BDF8" font-weight="800">POLAR JET — 30,000-40,000 ft</text>
        <!-- Subtropical jet stream -->
        <path d="M60,125 Q140,110 220,128 Q280,140 340,118" stroke="#F59E0B" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9" onclick="Diagrams.showJetInfo('subtropical')" style="cursor:pointer"/>
        <text x="190" y="108" text-anchor="middle" font-family="Nunito" font-size="11" fill="#F59E0B" font-weight="800">SUBTROPICAL JET — ~30°N</text>
        <!-- CAT hotspot zones -->
        <ellipse cx="140" cy="75" rx="22" ry="12" fill="rgba(239,68,68,.25)" stroke="#EF4444" stroke-width="1.5" onclick="Diagrams.showJetInfo('cat')" style="cursor:pointer"/>
        <text x="140" y="79" text-anchor="middle" font-family="Nunito" font-size="9" fill="#EF4444" font-weight="800">CAT</text>
        <ellipse cx="280" cy="75" rx="22" ry="12" fill="rgba(239,68,68,.25)" stroke="#EF4444" stroke-width="1.5" onclick="Diagrams.showJetInfo('cat')" style="cursor:pointer"/>
        <text x="280" y="79" text-anchor="middle" font-family="Nunito" font-size="9" fill="#EF4444" font-weight="800">CAT</text>
        <!-- Jet streak -->
        <ellipse cx="220" cy="78" rx="35" ry="14" fill="rgba(255,255,255,.08)" stroke="white" stroke-width="1" stroke-dasharray="4,3" onclick="Diagrams.showJetInfo('streak')" style="cursor:pointer"/>
        <text x="220" y="82" text-anchor="middle" font-family="Nunito" font-size="9" fill="white" font-weight="800">STREAK</text>
        <!-- Favorable altitude band -->
        <rect x="55" y="62" width="290" height="26" fill="rgba(99,102,241,.12)" stroke="rgba(99,102,241,.4)" stroke-width="1" rx="4" onclick="Diagrams.showJetInfo('altitude')" style="cursor:pointer"/>
        <!-- Entrance / Exit Regions -->
        <rect x="57" y="53" width="90" height="90" fill="rgba(16,185,129,.10)" stroke="#10B981" stroke-width="1.5" stroke-dasharray="4,3" rx="5" onclick="Diagrams.showJetInfo('entrance')" style="cursor:pointer"/>
        <text x="102" y="153" text-anchor="middle" font-family="Nunito" font-size="8" fill="#10B981" font-weight="800">ENTRANCE</text>
        <rect x="248" y="53" width="90" height="90" fill="rgba(245,158,11,.10)" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,3" rx="5" onclick="Diagrams.showJetInfo('exit')" style="cursor:pointer"/>
        <text x="293" y="153" text-anchor="middle" font-family="Nunito" font-size="8" fill="#F59E0B" font-weight="800">EXIT</text>
        <!-- Ground / tropopause labels -->
        <line x1="55" y1="210" x2="345" y2="210" stroke="#475569" stroke-width="1"/>
        <text x="190" y="220" text-anchor="middle" font-family="Nunito" font-size="9" fill="#475569">Surface</text>
        <line x1="55" y1="50" x2="345" y2="50" stroke="#6366F1" stroke-width="1" stroke-dasharray="5,3"/>
        <text x="190" y="46" text-anchor="middle" font-family="Nunito" font-size="9" fill="#6366F1">Tropopause</text>
        <text x="190" y="200" text-anchor="middle" font-family="Nunito" font-size="10" fill="#94A3B8">Tap jets, entrance/exit regions, CAT zones, and jet streak for info</text>
      </svg>
      <div id="jet-info" style="padding:14px;background:rgba(255,255,255,.06);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6;min-height:60px;border-top:1px solid rgba(255,255,255,.08)">
        <div style="color:#94A3B8;text-align:center;padding:8px">↑ Tap elements on the diagram</div>
      </div>
    </div>`;
  },

  showJetInfo(id) {
    const info = {
      cat: { color:'#EF4444', title:'🌀 Clear Air Turbulence (CAT) Zones', text:'The most severe CAT forms on the NORTH (cyclonic shear) side of the polar jet core, where wind speed drops off sharply. Also strong near jet streaks and sharply curved flow. CAT gives zero visual warning — no clouds, no ride. Can be severe to extreme. Check turbulence SIGMETs and winds-aloft forecast before every high-altitude IFR flight.' },
      streak: { color:'#FFFFFF', title:'⚡ Jet Streak', text:'A jet streak is a localized region of maximum wind speed (core) within the jet stream — speeds often 150-200+ kt. The entrance and exit regions of jet streaks produce strong divergence/convergence patterns that trigger significant weather. The right exit and left entrance quadrants of a jet streak are associated with strong rising motion and convective development.' },
      altitude: { color:'#6366F1', title:'✈️ Favorable Flight Altitude Band', text:'Pilots flying east (with the jet) use it for fuel savings — 100-200 kt tailwind is common. Flying west: route AROUND the jet or find a lower altitude below it. Jets are typically at FL300-FL390. The zone of maximum wind speed is a narrow core — departing north or south a few hundred miles can reduce headwinds significantly.' },
      polar: { color:'#38BDF8', title:'🌊 Polar Front Jet Stream', text:'Altitude: 30,000–45,000 ft. Speed: 50–150 kt (up to 200+ kt in winter). Position: highly variable — migrates equatorward in winter, poleward in summer. The primary driver of frontal systems and cyclogenesis in the mid-latitudes. Most jet-related CAT in North American operations is associated with this jet. Check polar jet position on every high-altitude IFR flight above FL280.' },
      subtropical: { color:'#F59E0B', title:'🌴 Subtropical Jet Stream', text:'Altitude: ~35,000–40,000 ft. Position: more consistent than the polar front jet, approximately 25–30°N latitude. Less associated with frontal CAT but important for high-altitude transcontinental and transoceanic route planning at FL350–FL410. Less meandering than the polar jet but can still produce significant turbulence in its core and near jet streaks.' },
      entrance: { color:'#10B981', title:'⬅️ Jet Stream Entrance Region', text:'RIGHT ENTRANCE REGION: Air accelerating into the jet diverges aloft — rising motion below, potential CAT. LEFT EXIT REGION: Air decelerating out of the jet also produces divergence and upward motion. These two quadrants are where you are most likely to encounter jet stream turbulence even in clear air.' },
      exit: { color:'#F59E0B', title:'➡️ Jet Stream Exit Region', text:'LEFT EXIT REGION: Air decelerating as it exits the jet causes divergence aloft and rising motion below — a prime zone for CAT and convective development. Together with the right entrance region, the left exit marks the highest turbulence risk quadrants of the jet stream. When a turbulence SIGMET is active along the jet, these exit quadrants are the first areas to avoid.' },
    };
    const d = info[id];
    document.getElementById('jet-info').innerHTML = `<strong style="color:${d.color};display:block;margin-bottom:6px">${d.title}</strong>${d.text}`;
  },

  // ── NEW: PRESSURE SYSTEMS INTERACTIVE ─────────────────────
  pressureSystemsSVG() {
    return `<div style="padding:16px;background:#F8FAFC">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        ${[
          ['HIGH Pressure','Anticyclone','#D1FAE5','#059669','Clockwise (NH) outflow. Sinking air — suppresses clouds. Clear skies, stable conditions. BUT: can trap surface pollutants and fog in valleys. Isobars widely spaced = light winds.','high'],
          ['LOW Pressure','Cyclone','#FFE4E6','#EF4444','Counter-clockwise (NH) inflow. Rising air — clouds and precipitation. Associated with fronts and most significant weather. Tightly spaced isobars = strong winds.','low'],
          ['Ridge','Elongated High','#D1FAE5','#059669','Extended area of high pressure between two lows. Axis of ridges points toward poles. Generally fair weather. Downstream trough often indicates deteriorating conditions ahead.','ridge'],
          ['Trough','Elongated Low','#FFE4E6','#EF4444','Extended area of low pressure between two highs. Associated with clouds, precip, and convergence. Troughs aloft trigger surface weather development.','trough'],
        ].map(([name,type,bg,col,desc,id])=>`
        <div onclick="Diagrams.showPressureInfo('${id}')" style="background:${bg};border-radius:14px;padding:12px;cursor:pointer;border:2px solid ${col}30;transition:all .15s">
          <div style="font-family:var(--font-display);font-weight:900;font-size:14px;color:${col}">${name}</div>
          <div style="font-size:11px;color:#64748B;font-weight:600;margin-bottom:6px">${type}</div>
          <div style="font-size:12px;color:#475569;line-height:1.4">${desc}</div>
        </div>`).join('')}
      </div>
      <div id="ps-info" style="background:var(--navy);border-radius:14px;padding:14px;color:white;font-family:var(--font-display);font-size:13px;line-height:1.6;display:none">
        <strong id="ps-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
        <span id="ps-text"></span>
      </div>
    </div>`;
  },

  showPressureInfo(id) {
    const info = {
      high: { title:'⬆️ High Pressure (Anticyclone) — Aviation Implications', text:'High pressure = sinking, diverging air. In the Northern Hemisphere, surface winds rotate clockwise around a high. Sinking air suppresses convection — generally clear skies and VFR conditions. The "H" on a surface analysis chart is your friend most of the time. Exception: strong highs in winter can build ridges that trap cold air and fog in valleys, creating persistent IFR. High-pressure systems move more slowly than lows.' },
      low: { title:'⬇️ Low Pressure (Cyclone) — Aviation Implications', text:'Low pressure = rising, converging air. Counter-clockwise (CCW) flow in the Northern Hemisphere. Rising air produces clouds, precipitation, and fronts. Most significant aviation weather occurs in association with lows. The closer and tighter the isobars (more closely spaced), the stronger the pressure gradient and winds. Rapidly deepening lows (bombs) can produce explosive weather development overnight.' },
      ridge: { title:'🌤️ Ridge of High Pressure', text:'An elongated axis of high pressure. Weather generally fair along the ridge. However — a ridge today often means a trough tomorrow as the pattern progresses. Flying "behind the ridge" (east of it in the westerlies) often means deteriorating conditions ahead. Always look at the full upstream pattern, not just the current position of the ridge.' },
      trough: { title:'🌧️ Trough of Low Pressure', text:'An elongated axis of low pressure. Troughs produce convergence — air piles in and is forced upward, creating clouds and precipitation. Upper-level troughs (visible on 500 mb charts) are especially important — they trigger surface cyclogenesis and severe weather outbreaks. A sharp trough in the jet stream pattern often means very active weather below.' },
    };
    const d = info[id];
    const el = document.getElementById('ps-info');
    el.style.display = 'block';
    document.getElementById('ps-title').textContent = d.title;
    document.getElementById('ps-text').textContent = d.text;
  },

  // ── NEW: COLD FRONT CROSS-SECTION ─────────────────────────
  coldFrontCrossSectionSVG() {
    // CORRECTED: Cold air is a wedge THICK on the left (origin/body of cP air mass) tapering
    // to a thin leading edge on the right where it undercuts warm air at the surface.
    // The frontal surface tilts from upper-LEFT (back into cold air at altitude)
    // to lower-RIGHT (surface front position). This matches FAA-H-8083-28A Fig 11-6.
    return `<div style="background:#0C1B33">
      <svg viewBox="0 0 420 210" style="width:100%;display:block">
        <defs>
          <linearGradient id="warmAirCF" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FEF3C7" stop-opacity=".75"/>
            <stop offset="100%" stop-color="#FDE68A" stop-opacity=".35"/>
          </linearGradient>
          <linearGradient id="coldAirCF" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stop-color="#BFDBFE" stop-opacity=".15"/>
            <stop offset="100%" stop-color="#93C5FD" stop-opacity=".55"/>
          </linearGradient>
          <marker id="arr-cf" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#38BDF8"/>
          </marker>
          <marker id="arr-warm" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#FBBF24"/>
          </marker>
        </defs>
        <!-- Sky background -->
        <rect width="420" height="185" fill="#0F172A"/>
        <!-- Ground -->
        <rect x="0" y="185" width="420" height="25" fill="#374151"/>
        <text x="210" y="200" text-anchor="middle" font-family="Nunito" font-size="9" fill="#9CA3AF">→ COLD FRONT ADVANCING EASTWARD (direction of movement)</text>

        <!-- WARM AIR: fills the upper right — ahead of the surface front (east side) -->
        <!-- Frontal surface: from upper-left (0, 22) to lower-right surface front at (300, 185) -->
        <polygon points="0,22 0,0 420,0 420,185 300,185" fill="url(#warmAirCF)"/>

        <!-- COLD AIR: thick wedge on left (body of cP air), thin leading edge at right (x=300) -->
        <!-- Correct shape: (0,185) bottom-left · (300,185) leading edge on ground · (0,22) top of cold air body -->
        <polygon points="0,185 300,185 0,22" fill="url(#coldAirCF)"/>

        <!-- Frontal surface boundary line (upper-left to lower-right) -->
        <line x1="0" y1="22" x2="300" y2="185" stroke="#60A5FA" stroke-width="2.5" stroke-dasharray="6,3"/>

        <!-- Slope annotation -->
        <text x="125" y="118" text-anchor="middle" font-family="Nunito" font-size="8.5" fill="#93C5FD" font-weight="800" transform="rotate(-32,125,118)">FRONTAL SURFACE ≈1:50–1:100</text>
        <text x="125" y="128" text-anchor="middle" font-family="Nunito" font-size="7" fill="#64748B" transform="rotate(-32,125,128)">(slope exaggerated for scale)</text>

        <!-- Labels for air masses -->
        <text x="60" y="165" text-anchor="middle" font-family="Nunito" font-size="10" fill="#93C5FD" font-weight="800">❄️ COLD AIR (cP)</text>
        <text x="355" y="50" text-anchor="middle" font-family="Nunito" font-size="10" fill="#FCD34D" font-weight="800">☀️ WARM AIR (mT)</text>

        <!-- Cold air wind arrows (advancing →) -->
        <line x1="30" y1="130" x2="95" y2="130" stroke="#38BDF8" stroke-width="2" marker-end="url(#arr-cf)"/>
        <line x1="30" y1="150" x2="95" y2="150" stroke="#38BDF8" stroke-width="2" marker-end="url(#arr-cf)"/>

        <!-- Warm air wind arrows (retreating / being pushed up →) -->
        <line x1="320" y1="155" x2="385" y2="155" stroke="#FBBF24" stroke-width="2" marker-end="url(#arr-warm)"/>

        <!-- Surface front position marker (triangle pointing direction of movement) -->
        <polygon points="300,185 292,172 308,172" fill="#2563EB"/>

        <!-- CB clouds just west of (behind) the surface front — cold fronts trigger CB at the slope -->
        <ellipse cx="265" cy="142" rx="19" ry="16" fill="rgba(30,30,80,.65)" onclick="Diagrams.showCFInfo('cb')" style="cursor:pointer"/>
        <ellipse cx="260" cy="130" rx="14" ry="13" fill="rgba(45,45,100,.7)" onclick="Diagrams.showCFInfo('cb')" style="cursor:pointer"/>
        <ellipse cx="272" cy="133" rx="11" ry="10" fill="rgba(55,55,110,.65)" onclick="Diagrams.showCFInfo('cb')" style="cursor:pointer"/>
        <text x="265" y="115" text-anchor="middle" font-family="Nunito" font-size="9" fill="#A5B4FC" font-weight="700">CB ⚡</text>

        <!-- Precipitation shaft -->
        ${[258,264,270,256,276].map((x,i)=>`<line x1="${x}" y1="${152+i*4}" x2="${x+1}" y2="${168+i*4}" stroke="#60A5FA" stroke-width="1.5" opacity=".75"/>`).join('')}

        <!-- Gust front — leading edge of cold outflow AHEAD of the surface front -->
        <line x1="318" y1="185" x2="332" y2="155" stroke="#F97316" stroke-width="2" stroke-dasharray="4,2" onclick="Diagrams.showCFInfo('gust')" style="cursor:pointer"/>
        <text x="345" y="162" font-family="Nunito" font-size="8.5" fill="#F97316" font-weight="800" onclick="Diagrams.showCFInfo('gust')" style="cursor:pointer">GUST FRONT</text>

        <!-- Pre-frontal squall line ahead of gust front -->
        <ellipse cx="385" cy="130" rx="13" ry="20" fill="rgba(99,102,241,.35)" onclick="Diagrams.showCFInfo('squall')" style="cursor:pointer"/>
        <text x="385" y="107" text-anchor="middle" font-family="Nunito" font-size="8" fill="#A5B4FC" onclick="Diagrams.showCFInfo('squall')" style="cursor:pointer">SQUALL</text>

        <!-- Altitudes labels on left edge -->
        <text x="4" y="60" font-family="Space Mono" font-size="7" fill="#475569">~30,000 ft</text>
        <line x1="0" y1="55" x2="15" y2="55" stroke="#475569" stroke-width="1"/>
        <text x="4" y="120" font-family="Space Mono" font-size="7" fill="#475569">~15,000 ft</text>
        <line x1="0" y1="115" x2="15" y2="115" stroke="#475569" stroke-width="1"/>

        <text x="210" y="16" text-anchor="middle" font-family="Nunito" font-size="11" fill="white" font-weight="800">Tap the features — Cold Front Cross-Section</text>
      </svg>
      <div id="cf-info" style="padding:14px;background:rgba(255,255,255,.06);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6;border-top:1px solid rgba(255,255,255,.1)">
        <div style="color:#94A3B8;text-align:center;padding:8px">↑ Tap features on the cross-section above</div>
      </div>
    </div>`;
  },

  showCFInfo(id) {
    const info = {
      cb: { title:'⛈️ Cumulonimbus Along Cold Front', text:'Cold fronts force warm, moist air upward rapidly along their steep slope (~1:100 ratio). This triggers vigorous convection and cumulonimbus development. Weather is intense but relatively narrow — typically 50-100 miles wide. Tornadoes can form along squall lines embedded in cold frontal systems. After front passage: rapid clearing, wind shift to NW, pressure rises, temperature drops.' },
      gust: { title:'💨 Gust Front & Prefrontal Conditions', text:'The gust front is the leading edge of cold air outflow from thunderstorm downdrafts ahead of the main front. Can precede the main frontal surface by 15+ miles. Sudden wind shift, drop in temperature, gusty surface winds, and rapid pressure rise. Pilots on approach when a gust front arrives can experience severe LLWS — treat any approaching cold front as a potential gust-front threat.' },
      squall: { title:'🌧️ Prefrontal Squall Line', text:'A line of severe thunderstorms that can develop 50-300 miles ahead of a cold front along a dryline or outflow boundary. Often MORE severe than the frontal thunderstorms themselves. Typical sequence: squall line first → clearing → main cold frontal precip → post-frontal cold clear conditions. Always check radar for prefrontal activity, not just the frontal position.' },
    };
    const d = info[id];
    document.getElementById('cf-info').innerHTML = `<strong style="color:#EF4444;display:block;margin-bottom:6px">${d.title}</strong>${d.text}`;
  },

  // ── NEW: INVERSION TYPES DIAGRAM ─────────────────────────
  inversionTypesSVG() {
    return `<div style="padding:16px;background:#F8FAFC">
      <p style="font-family:var(--font-display);font-size:14px;color:#64748B;margin:0 0 14px">Tap each inversion type to see formation mechanism and aviation effects:</p>
      <div style="display:grid;gap:8px">
        ${[
          ['Radiation Inversion','🌙',`Forms overnight as the surface radiates heat. Cool surface → cold air below, relatively warmer air above. Typically <1,000 ft deep. Burns off after sunrise as surface heats. Associated with radiation fog, smooth early-morning flying, then developing turbulence as it erodes.`,'#E0F2FE','#0284C7','rad'],
          ['Subsidence Inversion','⬆️',`Air sinks and warms in a high-pressure system. Creates a very persistent inversion at 2,000-5,000 ft. Can trap pollution, smoke, and moisture below it. California "June Gloom" is a classic example — marine stratus trapped below a strong subsidence inversion. Can last days to weeks.`,'#FEF3C7','#D97706','sub'],
          ['Frontal Inversion','🌡️',`Warm air overriding cold air along a frontal boundary. The warm air layer is warmer than the cold air below — classic inversion structure. Can produce icing above the frontal surface (warm air is moist) and freezing drizzle below (supercooled drops falling into cold air). Most hazardous icing scenarios often involve frontal inversions.`,'#FFE4E6','#EF4444','fro'],
        ].map(([title,emoji,desc,bg,col,id])=>`
        <div onclick="Diagrams.showInvInfo('${id}')" style="background:${bg};border-radius:14px;padding:14px;cursor:pointer;border:2px solid ${col}30;display:flex;gap:12px;align-items:flex-start">
          <span style="font-size:24px;flex-shrink:0">${emoji}</span>
          <div>
            <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:${col};margin-bottom:4px">${title}</div>
            <div style="font-size:12px;color:#475569;line-height:1.5">${desc}</div>
          </div>
        </div>`).join('')}
      </div>
      <div id="inv-detail" style="background:var(--navy);border-radius:14px;padding:14px;color:white;font-family:var(--font-display);font-size:13px;line-height:1.6;margin-top:10px;display:none">
        <strong id="inv-title" style="color:#F59E0B;display:block;margin-bottom:6px"></strong>
        <span id="inv-text"></span>
      </div>
    </div>`;
  },

  showInvInfo(id) {
    const info = {
      rad: { title:'🌙 Radiation Inversion — Pilot Briefing', text:'Best time to fly? Dawn/early morning before the radiation inversion erodes — air is smooth and visibility is good above the fog layer. Worst time? Mid-morning to noon as the inversion breaks up — turbulent mixing layer develops, fog lifts to stratus then dissipates, but ceilings may be variable. If departing early: check that ceiling and vis will improve, not worsen, during your flight.' },
      sub: { title:'⬆️ Subsidence Inversion — Pilot Briefing', text:'The subsidence inversion acts as a "ceiling" on convection and visibility. Below it: hazy, restricted visibility, low ceilings possible. Above it: clear and smooth VFR conditions. Filing IFR through the stratus layer is often the solution in coastal areas. Be aware: the inversion base may lower overnight and rise midday. Watch the trend, not just the current METAR.' },
      fro: { title:'🌡️ Frontal Inversion — Pilot Briefing', text:'Frontal inversions are the source of some of the most hazardous icing scenarios. The classic "freezing rain trap": warm rain falls from above-freezing air above the frontal surface through below-freezing air near the surface. SLD conditions possible. Pilots caught below a warm front in this temperature structure may find no safe altitude — icing below (freezing level) and IMC above (clouds). Only escape: fly out of the frontal zone laterally.' },
    };
    const d = info[id];
    document.getElementById('inv-detail').style.display = 'block';
    document.getElementById('inv-title').textContent = d.title;
    document.getElementById('inv-text').textContent = d.text;
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

  // ===== ACT 2 DIAGRAMS =====
  cbIngredients(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">⛈️ CB Ingredients — Tap Each Triangle</span></div>
    <div style="background:#0C1B33;padding:20px;position:relative;min-height:200px">
      <svg viewBox="0 0 360 180" style="width:100%;display:block">
        <defs><linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0C1B33"/><stop offset="100%" stop-color="#1E3A5F"/></linearGradient></defs>
        <rect width="360" height="180" fill="url(#bgGrad)"/>
        <!-- Three triangles -->
        <g onclick="Diagrams.showCBInfo('moisture')" style="cursor:pointer" tabindex="0" role="button" aria-label="CB Ingredient: Moisture" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
          <polygon points="60,150 120,50 180,150" fill="#0369A1" opacity=".8" stroke="#38BDF8" stroke-width="2"/>
          <text x="120" y="120" text-anchor="middle" font-family="Nunito" font-size="11" fill="white" font-weight="800">💧</text>
          <text x="120" y="135" text-anchor="middle" font-family="Nunito" font-size="9" fill="#BAE6FD">MOISTURE</text>
        </g>
        <g onclick="Diagrams.showCBInfo('instability')" style="cursor:pointer" tabindex="0" role="button" aria-label="CB Ingredient: Instability" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
          <polygon points="130,150 190,50 250,150" fill="#B45309" opacity=".8" stroke="#F59E0B" stroke-width="2"/>
          <text x="190" y="120" text-anchor="middle" font-family="Nunito" font-size="11" fill="white" font-weight="800">📈</text>
          <text x="190" y="135" text-anchor="middle" font-family="Nunito" font-size="9" fill="#FDE68A">INSTABILITY</text>
        </g>
        <g onclick="Diagrams.showCBInfo('lift')" style="cursor:pointer" tabindex="0" role="button" aria-label="CB Ingredient: Lift" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
          <polygon points="200,150 260,50 320,150" fill="#6D28D9" opacity=".8" stroke="#8B5CF6" stroke-width="2"/>
          <text x="260" y="120" text-anchor="middle" font-family="Nunito" font-size="11" fill="white" font-weight="800">⬆️</text>
          <text x="260" y="135" text-anchor="middle" font-family="Nunito" font-size="9" fill="#C4B5FD">LIFT</text>
        </g>
        <text x="180" y="30" text-anchor="middle" font-family="Nunito" font-size="12" fill="#94A3B8">Remove ANY one → No thunderstorm</text>
      </svg>
      <div id="cb-ing-popup" style="display:none;padding:12px 16px;background:rgba(255,255,255,.08);color:white;font-family:var(--font-display);font-size:13px;line-height:1.5;border-top:1px solid rgba(255,255,255,.1)">
        <strong id="cb-ing-title" style="color:#F59E0B;display:block;margin-bottom:4px"></strong>
        <span id="cb-ing-text"></span>
      </div>
    </div></div>`;
  },

  showCBInfo(id){
    const info={
      moisture:{title:'💧 Moisture',text:'High dewpoints (≥55°F in summer) indicate sufficient water vapor for thunderstorm development. Maritime Tropical (mT) air from the Gulf of Mexico is the primary fuel for US thunderstorms. Dewpoints drive the Lifted Condensation Level (LCL) and Level of Free Convection (LFC).'},
      instability:{title:'📈 Instability',text:'Conditionally unstable air means the atmosphere will accelerate a saturated parcel upward once it reaches the LFC. Ingredients: warm humid surface air, cold air aloft, high lapse rates. A cap (temperature inversion) can delay storm initiation until enough instability builds — then explosive development.'},
      lift:{title:'⬆️ Lifting Mechanism',text:'Something must trigger the initial lift to reach the LFC: cold fronts, drylines, outflow boundaries, sea breeze convergence, orographic uplift, upper-level divergence. Without lift, instability and moisture remain unreleased — a potentially explosive situation awaiting a trigger.'},
    };
    const i=info[id];
    document.getElementById('cb-ing-popup').style.display='block';
    document.getElementById('cb-ing-title').textContent=i.title;
    document.getElementById('cb-ing-text').textContent=i.text;
  },

  cbLifecycle(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">⛈️ Cell Lifecycle — Tap Each Stage</span></div>
    <div style="padding:16px;background:#F8FAFC">
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:14px;flex-wrap:wrap">
        ${['Towering Cumulus','Mature','Dissipating'].map((s,i)=>`<button onclick="Diagrams.showLifecycleStage(${i})" id="lc-btn-${i}" style="padding:8px 16px;border-radius:12px;border:2px solid ${i===0?'#DC2626':'#E2E8F0'};background:${i===0?'#FEF2F2':'white'};font-family:var(--font-display);font-size:13px;font-weight:700;cursor:pointer;color:${i===0?'#DC2626':'#94A3B8'}">${['⬆️','⛈️','⬇️'][i]} ${s}</button>`).join('')}
      </div>
      <svg id="lc-svg" viewBox="0 0 360 200" style="width:100%;display:block;background:linear-gradient(180deg,#0C1B33 0%,#1E3A8A 40%,#38BDF8 80%,#BAE6FD 100%);border-radius:12px"></svg>
      <div id="lc-desc" style="margin-top:10px;padding:14px;background:var(--navy);border-radius:12px;color:white;font-family:var(--font-display);font-size:13px;line-height:1.6">
        <strong style="color:#F43F5E;display:block;margin-bottom:4px">Towering Cumulus Stage</strong>
        Dominated by a strong convective UPDRAFT (3,000+ fpm). No precipitation reaching surface yet. Rapidly building vertical extent — can grow to 30,000+ ft in minutes. Updraft is concentrated near the growing top. This is the "loading the gun" stage — all energy is going in, none coming out yet.
      </div>
    </div></div>`;
  },

  showLifecycleStage(n){
    document.querySelectorAll('[id^=lc-btn-]').forEach((b,i)=>{b.style.borderColor=i===n?'#DC2626':'#E2E8F0';b.style.background=i===n?'#FEF2F2':'white';b.style.color=i===n?'#DC2626':'#94A3B8'});
    const svg=document.getElementById('lc-svg');
    const desc=document.getElementById('lc-desc');
    const stages=[
      {
        svg:`<rect width="360" height="200" fill="url(#skyBG)"/>
          <defs><linearGradient id="skyBG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0C1B33"/><stop offset="60%" stop-color="#1E3A8A"/><stop offset="100%" stop-color="#BAE6FD"/></linearGradient></defs>
          <!-- Cumulus building -->
          <ellipse cx="180" cy="140" rx="50" ry="30" fill="rgba(255,255,255,.6)"/>
          <ellipse cx="165" cy="115" rx="38" ry="28" fill="rgba(255,255,255,.65)"/>
          <ellipse cx="195" cy="110" rx="35" ry="26" fill="rgba(255,255,255,.65)"/>
          <ellipse cx="180" cy="85" rx="30" ry="24" fill="rgba(255,255,255,.7)"/>
          <ellipse cx="180" cy="60" rx="22" ry="18" fill="rgba(255,255,255,.75)"/>
          <!-- Updraft arrows -->
          <line x1="180" y1="185" x2="180" y2="155" stroke="#F43F5E" stroke-width="3" marker-end="url(#upArr)"/>
          <defs><marker id="upArr" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F43F5E"/></marker></defs>
          <text x="195" y="178" font-family="Nunito" font-size="10" fill="#F43F5E" font-weight="700">UPDRAFT</text>`,
        title:'Towering Cumulus Stage',
        text:'Dominated by a strong convective UPDRAFT (3,000+ fpm). No precipitation reaching surface yet. Rapidly building vertical extent — can grow 30,000+ ft in minutes. This is the "loading the gun" stage — all energy is going in.'
      },
      {
        svg:`<rect width="360" height="200" fill="url(#skyBG2)"/>
          <defs>
            <linearGradient id="skyBG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0C1B33"/><stop offset="60%" stop-color="#1E3A8A"/><stop offset="100%" stop-color="#BAE6FD"/></linearGradient>
            <marker id="upArr2" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F43F5E"/></marker>
            <marker id="dnArr" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6"/></marker>
          </defs>
          <!-- Anvil CB -->
          <polygon points="80,30 280,30 310,45 80,45" fill="rgba(200,200,220,.5)"/>
          <ellipse cx="180" cy="100" rx="65" ry="45" fill="rgba(50,50,80,.7)"/>
          <ellipse cx="160" cy="120" rx="50" ry="35" fill="rgba(30,30,60,.8)"/>
          <!-- Updraft left, downdraft right -->
          <line x1="145" y1="180" x2="145" y2="110" stroke="#F43F5E" stroke-width="3" marker-end="url(#upArr2)"/>
          <line x1="215" y1="110" x2="215" y2="180" stroke="#3B82F6" stroke-width="3" marker-end="url(#dnArr)"/>
          <text x="125" y="175" font-family="Nunito" font-size="9" fill="#F43F5E" font-weight="700">UPDRAFT</text>
          <text x="200" y="175" font-family="Nunito" font-size="9" fill="#3B82F6" font-weight="700">DOWNDRAFT</text>
          <!-- Rain -->
          ${[200,210,220,215,225].map((x,i)=>`<line x1="${x}" y1="${140+i*6}" x2="${x+1}" y2="${155+i*6}" stroke="#60A5FA" stroke-width="1.5"/>`).join('')}
          <text x="180" y="18" text-anchor="middle" font-family="Nunito" font-size="10" fill="#94A3B8">ANVIL</text>`,
        title:'Mature Stage',
        text:'BOTH updraft and downdraft active simultaneously. Precipitation reaches surface — marks start of mature stage. Downdraft spreads as a gust front. Anvil spreads downwind. ALL HAZARDS AT PEAK INTENSITY near the end of this stage: lightning, hail, turbulence, wind shear.'
      },
      {
        svg:`<rect width="360" height="200" fill="url(#skyBG3)"/>
          <defs><linearGradient id="skyBG3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0C1B33"/><stop offset="60%" stop-color="#334155"/><stop offset="100%" stop-color="#94A3B8"/></linearGradient>
          <marker id="dnArr3" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#60A5FA"/></marker></defs>
          <!-- Remnant anvil -->
          <polygon points="60,35 300,35 320,50 40,50" fill="rgba(180,180,200,.4)"/>
          <!-- Dissipating cloud -->
          <ellipse cx="180" cy="120" rx="55" ry="35" fill="rgba(100,116,139,.4)"/>
          <ellipse cx="180" cy="100" rx="40" ry="25" fill="rgba(71,85,105,.3)"/>
          <!-- All downdraft -->
          <line x1="180" y1="100" x2="180" y2="175" stroke="#60A5FA" stroke-width="3" marker-end="url(#dnArr3)"/>
          <line x1="160" y1="105" x2="160" y2="175" stroke="#60A5FA" stroke-width="2" marker-end="url(#dnArr3)"/>
          <line x1="200" y1="105" x2="200" y2="175" stroke="#60A5FA" stroke-width="2" marker-end="url(#dnArr3)"/>
          <text x="195" y="160" font-family="Nunito" font-size="9" fill="#60A5FA" font-weight="700">SUBSIDENCE</text>
          <text x="180" y="18" text-anchor="middle" font-family="Nunito" font-size="10" fill="#94A3B8">REMNANT ANVIL</text>`,
        title:'Dissipating Stage',
        text:'Strong downdraft throughout. Subsiding air cuts off the updraft — moisture supply ends. Precipitation tapers off. Cloud vaporizes from below, leaving remnant anvil. Still potentially hazardous: gust front lingers, hail possible in precipitation shaft.'
      }
    ];
    const s=stages[n];
    svg.innerHTML=s.svg;
    desc.innerHTML=`<strong style="color:#F43F5E;display:block;margin-bottom:4px">${s.title}</strong>${s.text}`;
  },

  iceTypes(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">🧊 Ice Types — Tap Each Type</span></div>
    <div style="background:#F0F9FF">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
        ${[
          {id:'rime',name:'Rime Ice',desc:'Rough, milky, opaque. Small droplets freeze instantly. Most frequently reported. Grows INTO the airstream from leading edges. Brittle — easier to remove. More common at colder temps (-15°C and below).', color:'#94A3B8',bg:'linear-gradient(180deg,#0C1B33,#1E3A5F,#334155)'},
          {id:'clear',name:'Clear Ice',desc:'Glossy, transparent, dense. Large droplets flow aft before freezing. Forms HORNS at leading edge top/bottom. Spreads beyond deicing equipment. Most hazardous type. More common near 0°C. SLDs are a form of clear icing.',color:'#60A5FA',bg:'linear-gradient(180deg,#0C1B33,#1D4ED8,#60A5FA)'},
          {id:'mixed',name:'Mixed Ice',desc:'Combination of rime and clear. Layers of opaque and clear ice. Similar hazard to clear ice — can form horns and spread aft. Most common in variable conditions with different droplet sizes.',color:'#A5B4FC',bg:'linear-gradient(180deg,#0C1B33,#312E81,#818CF8)'},
        ].map(t=>`
        <div onclick="Diagrams.showIceDetail('${t.id}')" style="cursor:pointer;height:110px;background:${t.bg};display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden">
          <div style="position:relative;z-index:2;padding:8px;background:linear-gradient(0deg,rgba(0,0,0,.7),transparent)">
            <div style="font-family:var(--font-display);font-weight:900;font-size:12px;color:white">${t.name}</div>
            <div style="font-size:9px;color:rgba(255,255,255,.7)">Tap for details</div>
          </div>
        </div>`).join('')}
      </div>
      <div id="ice-detail" style="display:none;padding:16px;background:var(--navy);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6">
        <strong id="ice-detail-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
        <span id="ice-detail-text"></span>
      </div>
    </div></div>`;
  },

  showIceDetail(id){
    const d={
      rime:{title:'Rime Ice — Rough & Opaque',text:'Rime ice forms when small supercooled droplets freeze INSTANTLY on contact with the airframe. The rapid freezing traps air, creating a porous, brittle, milky-colored ice that grows INTO the airstream from the leading edge. Most frequently reported icing type. Favors colder temperatures, lower liquid water content, smaller droplets. Jagged texture disrupts the airfoil boundary layer. More easily removed by deicing equipment than clear ice.'},
      clear:{title:'Clear Ice — Glossy & Most Hazardous',text:'Clear (glaze) ice forms when large supercooled droplets freeze GRADUALLY — the unfrozen portion flows aft before freezing. The result: dense, transparent ice that is hard to see and spreads beyond the coverage area of deicing equipment. MOST HAZARDOUS: forms horns at the top and bottom of the leading edge that drastically alter the airfoil shape. Significantly harder to remove. SLDs (freezing rain/drizzle) produce the most extreme clear icing, accreting far aft on the wing.'},
      mixed:{title:'Mixed Ice — Layers of Both',text:'Mixed icing occurs when an aircraft encounters small-scale variations in liquid water content, temperature, and droplet sizes — collecting both rime and clear ice simultaneously. Appears as distinct layers of opaque and clear ice when viewed from the side. Hazard profile similar to clear ice: can form horns, spread beyond deicing equipment coverage, and cause handling difficulties. Common in areas where cloud structure varies rapidly.'},
    };
    document.getElementById('ice-detail').style.display='block';
    document.getElementById('ice-detail-title').textContent=d[id].title;
    document.getElementById('ice-detail-text').textContent=d[id].text;
  },

  turbulenceSources(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">💥 Turbulence Sources — Tap to Explore</span></div>
    <div style="background:#F8FAFC">
      <svg viewBox="0 0 360 200" style="width:100%;display:block;background:linear-gradient(180deg,#1E1B4B 0%,#312E81 30%,#38BDF8 70%,#BAE6FD 100%)">
        <!-- CAT zone at top -->
        <rect x="0" y="0" width="360" height="60" fill="rgba(99,102,241,.3)" onclick="Diagrams.showTurbInfo('cat')" style="cursor:pointer"/>
        <text x="180" y="25" text-anchor="middle" font-family="Nunito" font-size="11" fill="white" font-weight="800">JET STREAM — CAT ZONE</text>
        <text x="180" y="42" text-anchor="middle" font-family="Nunito" font-size="9" fill="rgba(255,255,255,.7)">FL240-400 | No visual warning</text>
        <!-- Cloud layer middle -->
        <ellipse cx="180" cy="110" rx="70" ry="25" fill="rgba(255,255,255,.4)" onclick="Diagrams.showTurbInfo('conv')" style="cursor:pointer"/>
        <text x="180" y="115" text-anchor="middle" font-family="Nunito" font-size="10" fill="#1E3A8A" font-weight="800">CONVECTIVE TURBULENCE ↑</text>
        <!-- Mountain bottom right -->
        <polygon points="240,200 310,110 380,200" fill="rgba(5,150,105,.5)" onclick="Diagrams.showTurbInfo('mech')" style="cursor:pointer"/>
        <text x="310" y="165" text-anchor="middle" font-family="Nunito" font-size="9" fill="white" font-weight="800">MECHANICAL</text>
        <!-- Inversion line -->
        <line x1="0" y1="155" x2="180" y2="155" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,3"/>
        <text x="90" y="148" text-anchor="middle" font-family="Nunito" font-size="9" fill="#F59E0B" font-weight="700">INVERSION / SHEAR</text>
        <text x="180" y="185" text-anchor="middle" font-family="Nunito" font-size="10" fill="white" font-weight="700">Tap each zone ↑</text>
      </svg>
      <div id="turb-info" style="display:none;padding:14px 16px;background:var(--navy);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6">
        <strong id="turb-info-title" style="color:#F59E0B;display:block;margin-bottom:4px"></strong>
        <span id="turb-info-text"></span>
      </div>
    </div></div>`;
  },

  showTurbInfo(id){
    const d={
      cat:{title:'Clear Air Turbulence (CAT) — Jet Stream Zone',text:'CAT occurs at high altitudes (above 15,000 ft) in clear air, with NO visual warning. Primary cause: strong wind shear at jet stream boundaries, especially the north (cyclonic shear) side. Most severe near jet streaks and where the jet dips into troughs. Check Turbulence SIGMETs and high-altitude PIREPs before every flight above FL180. In-flight: slow to Va and maintain attitude, not altitude.'},
      conv:{title:'Convective Turbulence — Thermal Layer',text:'Caused by convective updrafts (thermals) from solar heating of the surface. Most active warm summer afternoons with light winds. Cumuliform clouds mark the top of convective columns. Turbulence is found BELOW and INSIDE clouds, with generally smooth air ABOVE. "Dry thermals" in desert areas produce convective turbulence with no visible cue. Light chop to moderate turbulence typical; severe in towering cumulus.'},
      mech:{title:'Mechanical Turbulence — Terrain Obstruction',text:'Obstructions (buildings, trees, ridges, mountains) disrupt smooth airflow into eddies. Intensity proportional to wind speed and terrain roughness. Mountain waves are the most severe form: can extend to 60,000 ft. Rotor zones below wave crests can be extreme/destructive. Surface turbulence near airports in strong crosswind conditions from terrain features — check PIREPs from recently-arrived aircraft.'},
    };
    document.getElementById('turb-info').style.display='block';
    document.getElementById('turb-info-title').textContent=d[id].title;
    document.getElementById('turb-info-text').textContent=d[id].text;
  },

  fogTypes(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">🌫️ Fog Formation Types — Tap Each</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;background:#F8FAFC;gap:2px;padding:2px">
      ${[
        {id:'rad',name:'Radiation Fog',icon:'🌙',bg:'linear-gradient(180deg,#0C1B33,#1E3A5F,#334155)',time:'Night → Dawn',key:'radiation'},
        {id:'adv',name:'Advection Fog',icon:'🌊',bg:'linear-gradient(135deg,#0C4A6E,#0284C7,#38BDF8)',time:'Any time',key:'advection'},
        {id:'ups',name:'Upslope Fog',icon:'⛰️',bg:'linear-gradient(180deg,#064E3B,#059669,#6EE7B7)',time:'With onshore wind',key:'upslope'},
        {id:'stm',name:'Steam Fog',icon:'♨️',bg:'linear-gradient(180deg,#7F1D1D,#DC2626,#FCA5A5)',time:'Cold air over warm water',key:'steam'},
      ].map(f=>`
      <div onclick="Diagrams.showFogDetail('${f.key}')" style="cursor:pointer;height:100px;background:${f.bg};display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden">
        <div style="padding:8px;background:linear-gradient(0deg,rgba(0,0,0,.7),transparent)">
          <div style="font-family:var(--font-display);font-weight:900;font-size:12px;color:white">${f.icon} ${f.name}</div>
          <div style="font-size:9px;color:rgba(255,255,255,.7)">${f.time}</div>
        </div>
      </div>`).join('')}
    </div>
    <div id="fog-detail" style="display:none;padding:16px;background:var(--navy);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6">
      <strong id="fog-detail-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
      <span id="fog-detail-text"></span>
    </div></div>`;
  },

  showFogDetail(id){
    const d={
      radiation:{title:'🌙 Radiation Fog',text:'The land surface cools by emitting infrared radiation on clear nights. When the surface cools below the dewpoint of the adjacent air, fog forms. Requirements: clear sky (no cloud "blanket"), light wind (calm-5 kt — mixing without dispersal), and sufficient moisture. Most dense near sunrise. Burns off with daytime heating — usually clears before noon unless clouds move in. Restricted to land; water cools too little at night.'},
      advection:{title:'🌊 Advection Fog',text:'Warm moist air advects (moves horizontally) over a cooler surface and is chilled below its dewpoint. Classic example: California coast — warm Pacific air moves over the cold California Current. Can form any time of day or night. More extensive and persistent than radiation fog. Deepens with wind up to ~15 kt; stronger wind lifts it to low stratus. Can move inland 100+ miles.'},
      upslope:{title:'⛰️ Upslope Fog',text:'Moist stable air cools adiabatically as it is pushed up sloping terrain by wind. Unlike radiation fog, can form under cloudy skies. Wind speeds of 5-15 kt most favorable. Common on eastern slopes of Rockies and Appalachians. Often quite dense and extends to high altitudes above the terrain. Difficult to differentiate from low stratus from the air.'},
      steam:{title:'♨️ Steam Fog',text:'Very cold air moves over warmer water. Water evaporates into the cold air and immediately condenses, forming wisps that look like steam rising from the surface. Common over lakes and rivers on cold autumn mornings, and over the ocean in winter. Shallow and unstable — expect light turbulence when flying through it. Pilots have compared it to flying through a thin smoke layer at low altitude.'},
    };
    document.getElementById('fog-detail').style.display='block';
    document.getElementById('fog-detail-title').textContent=d[id].title;
    document.getElementById('fog-detail-text').textContent=d[id].text;
  },

  mountainWave(){
    return `<div class="diagram-container"><div class="diagram-header"><span style="font-size:14px;color:white;font-family:var(--font-display);font-weight:700">⛰️ Mountain Wave — Tap Each Zone</span></div>
    <div style="background:#ECFDF5">
      <svg viewBox="0 0 380 220" style="width:100%;display:block;background:linear-gradient(180deg,#1E3A8A 0%,#0284C7 40%,#BAE6FD 70%,#86EFAC 100%)">
        <!-- Mountain -->
        <polygon points="80,220 160,100 240,220" fill="#374151"/>
        <polygon points="100,220 160,110 220,220" fill="#4B5563"/>
        <!-- Wave crests -->
        <path d="M160,90 Q190,60 220,90 Q250,120 280,90 Q310,60 340,90" stroke="rgba(255,255,255,.6)" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
        <!-- Lenticular clouds at crests -->
        <ellipse cx="220" cy="82" rx="28" ry="10" fill="rgba(255,255,255,.75)" onclick="Diagrams.showWaveZone('lenticular')" style="cursor:pointer"/>
        <ellipse cx="300" cy="82" rx="22" ry="9" fill="rgba(255,255,255,.6)" onclick="Diagrams.showWaveZone('lenticular')" style="cursor:pointer"/>
        <!-- Rotor zone -->
        <ellipse cx="195" cy="170" rx="30" ry="18" fill="rgba(239,68,68,.5)" onclick="Diagrams.showWaveZone('rotor')" style="cursor:pointer"/>
        <text x="195" y="174" text-anchor="middle" font-family="Nunito" font-size="9" fill="white" font-weight="900">ROTOR ⚠️</text>
        <!-- Downdraft arrow -->
        <line x1="240" y1="110" x2="240" y2="170" stroke="#F43F5E" stroke-width="2.5"/>
        <polygon points="236,165 244,165 240,175" fill="#F43F5E"/>
        <text x="252" y="145" font-family="Nunito" font-size="9" fill="#F43F5E" font-weight="700">DOWNDRAFT</text>
        <!-- Updraft -->
        <line x1="175" y1="170" x2="175" y2="110" stroke="#10B981" stroke-width="2.5"/>
        <polygon points="171,115 179,115 175,105" fill="#10B981"/>
        <text x="110" y="145" font-family="Nunito" font-size="9" fill="#10B981" font-weight="700">UPDRAFT</text>
        <!-- Wind arrow -->
        <line x1="20" y1="100" x2="70" y2="100" stroke="white" stroke-width="2.5"/>
        <polygon points="66,96 74,100 66,104" fill="white"/>
        <text x="45" y="88" text-anchor="middle" font-family="Nunito" font-size="9" fill="white" font-weight="700">WIND →</text>
        <!-- Labels -->
        <text x="220" y="72" text-anchor="middle" font-family="Nunito" font-size="9" fill="white" font-weight="700">LENTICULAR</text>
        <text x="165" y="210" text-anchor="middle" font-family="Nunito" font-size="9" fill="rgba(255,255,255,.8)" font-weight="700">Tap zones ↑</text>
      </svg>
      <div id="wave-info" style="display:none;padding:14px 16px;background:var(--navy);color:white;font-family:var(--font-display);font-size:13px;line-height:1.6">
        <strong id="wave-info-title" style="color:#10B981;display:block;margin-bottom:4px"></strong>
        <span id="wave-info-text"></span>
      </div>
    </div></div>`;
  },

  showWaveZone(id){
    const d={
      lenticular:{title:'🌥️ Lenticular Cloud (Standing Wave Crest)',text:'Lenticular clouds (ACSL/CCSL) form at wave crests where upward-moving air cools to saturation. They appear stationary because air is constantly flowing through them — they are standing waves, not static clouds. Smooth, laminar-looking edges = lighter turbulence. Lumpy, rolling, churning appearance = significant turbulence. ABSENCE of lenticulars in dry air does NOT mean no wave.'},
      rotor:{title:'🌪️ Rotor Zone — AVOID',text:'The rotor zone forms below and downwind of a wave crest, at or below ridge level. It is an area of intense rolling/rotating motion with severe to EXTREME turbulence. Rolling moments can EXCEED aircraft roll authority — meaning the aircraft could be flipped upside down by the rotor. Especially dangerous at low altitudes near mountain airports. Rotor clouds may look like harmless cumulus from a distance — look for rounded, frothy, rapidly churning edges on the downwind side.'},
    };
    document.getElementById('wave-info').style.display='block';
    document.getElementById('wave-info-title').textContent=d[id].title;
    document.getElementById('wave-info-text').textContent=d[id].text;
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

  // ===== ACT 3 DIAGRAMS =====
  renderMetarDecoder(){
    const m=SAMPLE_METAR;
    const colors=m.tokens.map(t=>t.color);
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">📋 Interactive METAR — Tap Any Group</span></div>
      <div style="padding:16px">
        <div style="background:#0C1B33;border-radius:14px;padding:16px;margin-bottom:14px;font-family:var(--font-mono);font-size:13px;line-height:2;word-break:break-all">
          ${m.tokens.map((t,i)=>`<span class="metar-token" style="background:${t.bg};color:${t.color}" onclick="Diagrams.showMetarToken(${i})">${t.token}</span>`).join(' ')}
        </div>
        <div id="metar-detail" style="background:#F8FAFC;border-radius:14px;padding:16px;min-height:80px;transition:all .2s">
          <div style="color:#94A3B8;font-family:var(--font-display);font-weight:700;font-size:14px;text-align:center;padding:20px 0">↑ Tap any group above to decode it</div>
        </div>
      </div>
    </div>`;
  },

  showMetarToken(i){
    const t=SAMPLE_METAR.tokens[i];
    document.querySelectorAll('.metar-token').forEach(el=>el.classList.remove('selected'));
    document.querySelectorAll('.metar-token')[i]?.classList.add('selected');
    document.getElementById('metar-detail').innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <code style="background:${t.bg};color:${t.color};padding:6px 14px;border-radius:10px;font-family:var(--font-mono);font-size:14px;font-weight:700">${t.token}</code>
        <strong style="font-family:var(--font-display);font-size:16px;color:${t.color}">${t.label}</strong>
      </div>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:0">${t.detail}</p>`;
  },

  renderTafDecoder(){
    const groups=[
      {code:'KDFW',color:'#7C3AED',bg:'#F5F3FF',label:'Station',detail:'Dallas-Fort Worth International. Same ICAO format as METAR.'},
      {code:'061737Z',color:'#64748B',bg:'#F8FAFC',label:'Issued',detail:'Day 06 at 1737Z — TAF issued 20-40 min before valid period starts.'},
      {code:'0618/0718',color:'#0284C7',bg:'#E0F2FE',label:'Valid Period',detail:'Day 06 at 1800Z through Day 07 at 1800Z = 24-hour TAF.'},
      {code:'23010KT',color:'#DC2626',bg:'#FEF2F2',label:'Wind',detail:'Same format as METAR: 230° true at 10 knots.'},
      {code:'P6SM',color:'#059669',bg:'#ECFDF5',label:'Visibility',detail:'Prevailing visibility greater than 6 statute miles.'},
      {code:'SKC',color:'#1D4ED8',bg:'#EFF6FF',label:'Sky',detail:'Sky clear — no clouds. NSW = no significant weather.'},
      {code:'FM061900',color:'#7C3AED',bg:'#F5F3FF',label:'FROM Group',detail:'FROM day 06 at 1900Z: ALL conditions change abruptly to those that follow. Complete replacement of previous forecast.'},
      {code:'TEMPO 0621/0702',color:'#EC4899',bg:'#FDF2F8',label:'TEMPO',detail:'Temporary fluctuations between 2100Z day 06 and 0200Z day 07. Each occurrence <1 hr. Does not replace base forecast.'},
      {code:'PROB30',color:'#8B5CF6',bg:'#F5F3FF',label:'Probability',detail:'30% probability of the following conditions. Less likely than not, but significant enough to plan for.'},
    ];
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:20px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">📅 TAF Element Reference — Tap Each Group</span></div>
      <div style="padding:16px">
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
          ${groups.map((g,i)=>`<span class="metar-token" style="background:${g.bg};color:${g.color}" onclick="Diagrams.showTafToken(${i})">${g.code}</span>`).join('')}
        </div>
        <div id="taf-detail" style="background:#F8FAFC;border-radius:14px;padding:14px;min-height:70px">
          <div style="color:#94A3B8;font-family:var(--font-display);font-size:14px;text-align:center;padding:16px 0">↑ Tap any TAF group above</div>
        </div>
      </div>
    </div>`;
  },

  showTafToken(i){
    const groups=[
      {code:'KDFW',color:'#7C3AED',bg:'#F5F3FF',label:'Station',detail:'Dallas-Fort Worth International. Same ICAO format as METAR.'},
      {code:'061737Z',color:'#64748B',bg:'#F8FAFC',label:'Issued',detail:'Day 06 at 1737Z — TAF issued 20-40 min before valid period starts.'},
      {code:'0618/0718',color:'#0284C7',bg:'#E0F2FE',label:'Valid Period',detail:'Day 06 at 1800Z through Day 07 at 1800Z = 24-hour TAF. Format: DDHH/DDHH.'},
      {code:'23010KT',color:'#DC2626',bg:'#FEF2F2',label:'Wind',detail:'Same format as METAR: 230° true at 10 knots. Always true north.'},
      {code:'P6SM',color:'#059669',bg:'#ECFDF5',label:'Visibility',detail:'Prevailing visibility greater than 6 statute miles. P6SM = "Plus 6 SM."'},
      {code:'SKC',color:'#1D4ED8',bg:'#EFF6FF',label:'Sky',detail:'Sky clear — no clouds. NSW = No Significant Weather clears previous wx group.'},
      {code:'FM061900',color:'#7C3AED',bg:'#F5F3FF',label:'FROM Group',detail:'FROM day 06 at 1900Z: ALL conditions change abruptly. Complete replacement — wind, vis, wx, sky all change to the values that follow FM.'},
      {code:'TEMPO 0621/0702',color:'#EC4899',bg:'#FDF2F8',label:'TEMPO',detail:'Temporary fluctuations between 2100Z day 06 and 0200Z day 07. Each occurrence <1 hr total. Does NOT replace base forecast — base conditions continue between occurrences.'},
      {code:'PROB30',color:'#8B5CF6',bg:'#F5F3FF',label:'Probability',detail:'30% probability of conditions in the following group. PROB30 = less likely than not. PROB40 = less common. Neither can be combined with TEMPO.'},
    ];
    const g=groups[i];
    document.querySelectorAll('.metar-token').forEach(el=>el.classList.remove('selected'));
    const tokens=document.querySelectorAll('.metar-token');
    tokens[i]?.classList.add('selected');
    document.getElementById('taf-detail').innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <code style="background:${g.bg};color:${g.color};padding:5px 12px;border-radius:8px;font-family:var(--font-mono);font-size:13px;font-weight:700">${g.code}</code>
        <strong style="font-family:var(--font-display);font-size:15px;color:${g.color}">${g.label}</strong>
      </div>
      <p style="font-size:13px;color:#334155;line-height:1.6;margin:0">${g.detail}</p>`;
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

  // ── NEW: ADVISORY HIERARCHY DIAGRAM ─────────────────────────
  renderAdvisoryHierarchy(){
    return `<div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:16px 0">
      <div class="diagram-header"><span style="color:white;font-family:var(--font-display);font-weight:700;font-size:14px">⚠️ Advisory Priority Pyramid — Tap Each Level</span></div>
      <div style="padding:16px;background:#F8FAFC">
        <svg viewBox="0 0 380 260" style="width:100%;display:block">
          <!-- Pyramid levels -->
          <g onclick="Diagrams.showAdvisory('csigmet')" style="cursor:pointer" tabindex="0" role="button" aria-label="Convective SIGMET — highest priority advisory" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
            <polygon points="190,20 310,80 70,80" fill="#DC2626" opacity=".9"/>
            <text x="190" y="58" text-anchor="middle" font-family="Nunito" font-size="11" font-weight="900" fill="white">⛈️ CONVECTIVE SIGMET</text>
            <text x="190" y="72" text-anchor="middle" font-family="Nunito" font-size="9" fill="rgba(255,255,255,.8)">ALL aircraft · Highest priority</text>
          </g>
          <g onclick="Diagrams.showAdvisory('sigmet')" style="cursor:pointer" tabindex="0" role="button" aria-label="SIGMET — non-convective significant meteorological information" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
            <polygon points="70,85 310,85 330,135 50,135" fill="#7C3AED" opacity=".9"/>
            <text x="190" y="112" text-anchor="middle" font-family="Nunito" font-size="11" font-weight="900" fill="white">🌋 SIGMET (Non-Convective)</text>
            <text x="190" y="126" text-anchor="middle" font-family="Nunito" font-size="9" fill="rgba(255,255,255,.8)">Severe icing · Sev turbulence · Volcanic ash</text>
          </g>
          <g onclick="Diagrams.showAdvisory('airmet')" style="cursor:pointer" tabindex="0" role="button" aria-label="AIRMET — Sierra, Tango, and Zulu advisories" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
            <polygon points="50,140 330,140 350,195 30,195" fill="#F59E0B" opacity=".9"/>
            <text x="190" y="166" text-anchor="middle" font-family="Nunito" font-size="11" font-weight="900" fill="white">📢 AIRMET (Sierra · Tango · Zulu)</text>
            <text x="190" y="180" text-anchor="middle" font-family="Nunito" font-size="9" fill="rgba(255,255,255,.8)">Mod icing · Mod turbulence · IFR · LLWS</text>
          </g>
          <g onclick="Diagrams.showAdvisory('cwa')" style="cursor:pointer" tabindex="0" role="button" aria-label="Center Weather Advisory — short-term ARTCC supplement" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">
            <polygon points="30,200 350,200 370,250 10,250" fill="#059669" opacity=".9"/>
            <text x="190" y="226" text-anchor="middle" font-family="Nunito" font-size="11" font-weight="900" fill="white">📍 CWA (Center Weather Advisory)</text>
            <text x="190" y="240" text-anchor="middle" font-family="Nunito" font-size="9" fill="rgba(255,255,255,.8)">2-hr short-term · ARTCC supplement</text>
          </g>
        </svg>
        <div id="adv-detail" style="background:var(--navy);border-radius:14px;padding:14px;color:white;font-family:var(--font-display);font-size:13px;line-height:1.6;margin-top:4px;display:none">
          <strong id="adv-title" style="color:#F59E0B;display:block;margin-bottom:6px"></strong>
          <span id="adv-text"></span>
        </div>
      </div>
    </div>`;
  },

  showAdvisory(id){
    const data={
      csigmet:{title:'⛈️ Convective SIGMET — Highest Priority',text:'Issued by AWC at H+55 and H+25 (special bulletins any time). Valid 2 hours. Covers: embedded thunderstorms, lines of CBs >60 NM, areas of CBs >3,000 sq mi, severe turbulence from convection, surface winds >50 kt from convection, hail ≥3/4 inch, tornadoes. MUST be obtained before any IFR flight. Applies to ALL aircraft — no exceptions based on equipment or certification. 14 CFR 91.103 requirement.'},
      sigmet:{title:'🌋 SIGMET (Non-Convective) — High Priority',text:'Issued by AWC. Valid 4 hours (6 hours for volcanic ash/tropical cyclones). Identified by phonetic alphabet (OSCAR, PAPA, etc.). Covers: severe icing NOT associated with thunderstorms; severe or extreme turbulence NOT associated with thunderstorms; volcanic ash; dust/sandstorms obscuring ≥3/8 sky above 5,000 ft. Applies to ALL aircraft.'},
      airmet:{title:'📢 AIRMET — Operational Priority',text:'G-AIRMET issued 4x/day, updated every 3 hours. Valid 6 hours. Three types: SIERRA (IFR ceilings <1,000 ft / vis <3 SM, mountain obscuration — primarily VFR pilots); TANGO (moderate turbulence, sustained surface winds >30 kt, LLWS — primarily light aircraft); ZULU (moderate icing not from thunderstorms, freezing levels — ALL aircraft). Does NOT include severe conditions — those trigger SIGMETs.'},
      cwa:{title:'📍 CWA (Center Weather Advisory)',text:'Issued by CWSU (Center Weather Service Unit) meteorologists embedded in ARTCCs. Valid maximum 2 hours. The most real-time formal advisory product. Addresses rapidly developing hazardous weather not yet captured by SIGMETs/AIRMETs. Supplements existing advisories. Pilots can request CWAs from ATC. Used primarily by IFR/en-route operators within the ARTCC\'s airspace.'},
    };
    const d=data[id];
    const el=document.getElementById('adv-detail');
    el.style.display='block';
    document.getElementById('adv-title').textContent=d.title;
    document.getElementById('adv-text').textContent=d.text;
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

    thunderstorm_lifecycle: {
      title: 'Thunderstorm Cell Life Cycle',
      steps: [
        {
          label: 'Step 1 — Three Required Ingredients',
          description: 'Three ingredients must all be present simultaneously: (1) Water vapor — the fuel that powers latent heat release and storm growth, (2) Unstable air — the atmosphere must be conditionally unstable so a lifted parcel accelerates upward on its own, (3) A lifting mechanism — fronts, orographic lift, surface heating, or low-level convergence. Remove any one and no thunderstorm develops.',
          svg: `<div style="background:#111827;text-align:center"><img src="img/awh/thunderstorm_lifecycle_01.png" alt="Figure 22-1. Necessary Ingredients for Thunderstorm Formation" style="width:100%;display:block;max-height:310px;object-fit:contain"></div>`
        },
        {
          label: 'Step 2 — Stage 1: Towering Cumulus (Building Phase)',
          description: 'A single powerful updraft lifts moisture to great heights — cloud tops may reach 20,000–40,000 ft. No precipitation reaches the surface yet: all precipitation is suspended in the updraft. The cloud is bright white and cauliflower-shaped. This stage lasts 10–20 minutes. Updraft speeds can exceed 3,000 ft/min — dangerous to fly near even before lightning begins.',
          svg: `<div style="background:#111827"><img src="img/awh/thunderstorm_lifecycle_02.png" alt="Figure 22-2. Thunderstorm Cell Life Cycle" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; TOWERING CUMULUS STAGE (left panel) — strong updraft only, cloud all white, no precipitation reaching the surface</div></div>`
        },
        {
          label: 'Step 3 — Stage 2: Mature Stage (Most Hazardous)',
          description: 'First precipitation reaching the surface marks the mature stage. Strong updrafts AND downdrafts coexist in the same cell. The anvil top forms at the tropopause. ALL thunderstorm hazards are now active: lightning, large hail, severe turbulence, structural icing, low-level wind shear, and microbursts. The FAA recommends avoiding by at least 20 nm.',
          svg: `<div style="background:#111827"><img src="img/awh/thunderstorm_lifecycle_02.png" alt="Figure 22-2. Thunderstorm Cell Life Cycle" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; MATURE STAGE (center panel) — updraft AND downdraft coexist, anvil forms, ALL hazards present simultaneously</div></div>`
        },
        {
          label: 'Step 4 — Stage 3: Dissipating Stage',
          description: 'The downdraft cuts off the inflow of warm moist air, starving the updraft. Precipitation weakens. The anvil top and cirrus remnant spread downwind. The cell may take 30–60 minutes to fully dissipate. New cells may be triggered along the cold outflow boundary — a dissipating storm can spawn new ones along its gust front.',
          svg: `<div style="background:#111827"><img src="img/awh/thunderstorm_lifecycle_02.png" alt="Figure 22-2. Thunderstorm Cell Life Cycle" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; DISSIPATING STAGE (right panel) — downdraft dominant, updraft cut off, precipitation weakening, anvil spreading</div></div>`
        }
      ]
    },

    density_altitude: {
      title: 'Density Altitude & Aircraft Performance',
      steps: [
        {
          label: 'Step 1 — High Density Altitude Degrades Aircraft Performance',
          description: 'Both panels show the same aircraft on the same runway — only density altitude differs. TOP: Sea-level density altitude — takeoff roll 1,300 ft, rate of climb 1,500 ft/min. BOTTOM: 5,000 ft density altitude — takeoff roll grows to 1,800 ft (+38%) and climb rate drops to 1,000 ft/min (–33%). Less dense air means less engine power, less propeller thrust, and less aerodynamic lift.',
          svg: `<div style="background:#111827"><img src="img/awh/density_altitude_01.png" alt="Figure 8-15. High Density Altitude Effects on Flight" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; TOP: sea-level density altitude (1,300 ft roll, 1,500 fpm climb). BOTTOM: 5,000 ft density altitude (1,800 ft roll, 1,000 fpm climb)</div></div>`
        },
        {
          label: 'Step 2 — Hot + High = Longest Roll and Shallowest Climb',
          description: 'High temperature and high elevation compound each other. Every 10°C above standard temperature adds roughly 1,000 ft to density altitude. A 95°F afternoon at a 5,000 ft airport can produce a density altitude exceeding 9,000 ft. Always compute density altitude from POH charts before flight — obstacles that are safe at sea level can become traps at high density altitude.',
          svg: `<div style="background:#111827"><img src="img/awh/density_altitude_01.png" alt="Figure 8-15. High Density Altitude Effects on Flight" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Note the shallower climb path in the bottom panel — terrain and obstacles that cleared easily at sea level may not be cleared</div></div>`
        },
        {
          label: 'Step 3 — Computing Density Altitude from OAT and Pressure Altitude',
          description: 'Set your altimeter to 29.92 to get pressure altitude, then use outside air temperature (OAT) to find density altitude on this chart. Locate your pressure altitude on the Y-axis, trace horizontally to your OAT on the X-axis, then read density altitude from the diagonal lines. On a hot day at a high airport, density altitude can exceed pressure altitude by several thousand feet.',
          svg: `<div style="background:#111827"><img src="img/awh/density_altitude_02.png" alt="Figure C-1. Density Altitude Computation Chart" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; Y-axis = pressure altitude. X-axis = OAT. Trace horizontally to OAT, read density altitude from diagonal lines</div></div>`
        }
      ]
    },

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
          description: 'PROB30 (or PROB40) explicitly states the probability that alternate conditions will occur. PROB30 = 30% probability; PROB40 = 40% probability. Format: PROB30 hhmm/hhmm. Used for isolated thunderstorms or brief IFR conditions that are possible but not the primary scenario. Alternate planning: if a TAF contains ceiling below 2,000 ft or visibility below 3 SM within ±1 hr of your ETA — at any probability — review 14 CFR 91.169 for alternate requirements.',
          svg: `<div style="background:#111827"><img src="img/awh/taf_change_groups.png" alt="Table 27-3. Generic Format of the National Weather Service's TAFs" style="width:100%;display:block;max-height:310px;object-fit:contain"><div style="padding:5px 14px 6px;font-size:11px;font-weight:700;color:#38BDF8;font-family:var(--font-display);border-top:1px solid #1e3a5f">&#9658; PROB group (bottom-right): 30% or 40% probability of alternate conditions — check against IFR alternate planning rules (91.169)</div></div>`
        }
      ]
    }
  }
};
