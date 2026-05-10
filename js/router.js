// ============================================================
// Aviation Weather Academy — Router
// ============================================================

const Router = {
  current: 'dashboard',
  params: {},
  _skipHash: false,   // guard: prevents hashchange → navigate → hashchange loop

  // ── Hash ↔ screen mapping ─────────────────────────────────────
  _toHash(screen, params={}) {
    switch(screen) {
      case 'dashboard':    return '#/dashboard';
      case 'modules':      return '#/modules';
      case 'lesson':       return params.moduleId ? `#/lesson/${params.moduleId}` : '#/modules';
      // Quiz route is real: refreshing a #/quiz/<id> URL re-enters Screens.quiz(),
      // which restores from state.quizInProgress if the user was mid-quiz.
      case 'quiz':         return params.moduleId ? `#/quiz/${params.moduleId}` : '#/modules';
      case 'checkride':    return '#/checkride';
      // Active checkride question session is transient — stays as #/checkride
      case 'checkride_results': return '#/checkride';
      case 'logbook':      return '#/logbook';
      // 'more' is retained as a fallback route only — the More tab has been
      // replaced by Study Tools in the bottom nav. Direct #/more URLs still
      // resolve until Screens.more() is removed in the final cleanup chunk.
      case 'more':         return '#/more';
      case 'achievements': return '#/achievements';
      case 'case_studies': return '#/cases';
      case 'case_detail':  return params.caseId ? `#/case/${params.caseId}` : '#/cases';
      case 'tools':        return '#/tools';
      case 'tool_detail':  return params.toolId ? `#/tools/${params.toolId}` : '#/tools';
      default:             return '#/dashboard';
    }
  },

  // ── Parse a URL hash into { screen, params } ─────────────────
  _parseHash(hash) {
    const parts = ((hash||'').replace(/^#\/?/,'')).split('/').filter(Boolean);
    const seg = (parts[0]||'').toLowerCase();
    const p1  = parts[1] || '';
    if (!seg || seg==='dashboard' || seg==='home') return {screen:'dashboard',params:{}};
    if (seg==='modules')      return {screen:'modules',params:{}};
    if (seg==='checkride')    return {screen:'checkride',params:{}};
    if (seg==='logbook')      return {screen:'logbook',params:{}};
    if (seg==='more')         return {screen:'more',params:{}};
    if (seg==='achievements') return {screen:'achievements',params:{}};
    if (seg==='cases')        return {screen:'case_studies',params:{}};
    if (seg==='tools') {
      // /tools or /tools/<toolId>. Validate the toolId against the registry
      // resolved at render time; an unknown id falls back to the landing.
      if (p1) return {screen:'tool_detail',params:{toolId:p1}};
      return {screen:'tools',params:{}};
    }
    if (seg==='lesson') {
      if (p1 && MODULES.find(m=>m.id===p1)) return {screen:'lesson',params:{moduleId:p1}};
      return {screen:'modules',params:{}};     // unknown module id → safe fallback
    }
    if (seg==='quiz') {
      // Honor the quiz route directly — Screens.quiz() restores in-progress state.
      if (p1 && MODULES.find(m=>m.id===p1)) return {screen:'quiz',params:{moduleId:p1}};
      return {screen:'modules',params:{}};
    }
    if (seg==='case') {
      if (p1 && typeof CASE_STUDIES!=='undefined' && CASE_STUDIES.find(c=>c.id===p1))
        return {screen:'case_detail',params:{caseId:p1}};
      return {screen:'case_studies',params:{}};  // unknown case id → fallback
    }
    return {screen:'dashboard',params:{}};  // completely unknown route
  },

  // ── Set location.hash without triggering the self-loop guard ─
  _setHash(hash) {
    if (location.hash !== hash) { this._skipHash = true; location.hash = hash; }
  },

  // ── Update the active bottom-nav button ──────────────────────
  _navHighlight(screen) {
    document.querySelectorAll('.nav-btn').forEach(b=>{
      b.classList.remove('active'); b.removeAttribute('aria-current');
    });
    // Sub-screens that should highlight a tab button rather than appear standalone.
    // 'tool_detail' highlights the Study Tools tab. The other entries highlight
    // 'more' for now — they'll be remapped during the final cleanup chunk once
    // achievements/case_studies have settled into Logbook + Settings.
    const secondary = ['achievements','case_studies','case_detail','quiz','lesson','checkride_results','tool_detail'];
    let navId = screen;
    if (screen === 'tool_detail') navId = 'tools';
    else if (['achievements','case_studies','case_detail','quiz','lesson','checkride_results'].includes(screen)) navId = 'more';
    const btn = document.getElementById(`nav-${navId}`);
    if (btn) { btn.classList.add('active'); btn.setAttribute('aria-current','page'); }
  },

  // ── Apply a route to DOM (no hash write — called by navigate & hashchange) ──
  _applyRoute(screen, params={}) {
    this.current = screen;
    this.params  = params;
    this._navHighlight(screen);
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(`screen-${screen}`)?.classList.add('active');
    Screens.render(screen, params);
    window.scrollTo(0, 0);
  },

  // ── Public navigate (used by all in-app links & buttons) ─────
  navigate(screen, params={}) {
    // Guard: case_detail requires a valid caseId; fall back to case list
    if (screen === 'case_detail' && !params.caseId) return this.navigate('case_studies');
    this._setHash(this._toHash(screen, params));
    this._applyRoute(screen, params);
  },

  // ── Wire hashchange + handle initial page load ────────────────
  init() {
    window.addEventListener('hashchange', () => {
      if (this._skipHash) { this._skipHash = false; return; }
      const {screen, params} = this._parseHash(location.hash);
      // Normalise to canonical hash (e.g. #/quiz/m3 → #/lesson/m3)
      const canonical = this._toHash(screen, params);
      if (location.hash !== canonical) { this._skipHash = true; location.hash = canonical; }
      this._applyRoute(screen, params);
    });

    // Initial page load: read existing hash or default to dashboard
    const h = location.hash;
    if (!h || h === '#' || h === '#/') {
      this._setHash('#/dashboard');
      this._applyRoute('dashboard', {});
    } else {
      const {screen, params} = this._parseHash(h);
      const canonical = this._toHash(screen, params);
      if (location.hash !== canonical) { this._skipHash = true; location.hash = canonical; }
      this._applyRoute(screen, params);
    }
  }
};

