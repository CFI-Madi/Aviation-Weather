// ============================================================
// Aviation Weather Academy — Screens
// ============================================================

const Screens = {
  dashboard() {
    const s = GameEngine.state;
    const rank = GameEngine.getRank();
    const next = GameEngine.getNextRank();
    const pct = GameEngine.getRankProgress();
    const daily = GameEngine.getDailyChallenge();
    const passed = s.modulesPassed.length;
    const resumeTarget = GameEngine.getResumeTarget();
    const weakAreas = GameEngine.getWeakAreas(4);
    const recommended = GameEngine.getRecommendedNextStep();
    const levelStats = GameEngine.getLevelProgress();
    const currentLevelId = GameEngine.getCurrentLevel();
    const currentLevel = levelStats.find(l => l.id === currentLevelId) || levelStats[0];
    const nextLevelId = GameEngine.getNextLevel();
    const nextLevel = nextLevelId ? levelStats.find(l => l.id === nextLevelId) : null;
    const levelMastered = GameEngine.isCurrentLevelMastered();
    const bestCheckride = GameEngine.getBestCheckrideScore();
    const achievementTotal = new Set(ACHIEVEMENTS.map(a => a.id)).size;

    document.getElementById('dashboard-content').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div>
          <h1 style="font-family:var(--font-display);font-size:26px;font-weight:900;color:var(--navy);margin:0">Aviation Weather</h1>
          <p style="color:#64748B;font-size:13px;margin:4px 0 0">Weather Academy — FAA-H-8083-28B</p>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-mono);font-size:24px;font-weight:700;color:var(--navy)">${s.totalXP.toLocaleString()}</div>
          <div style="font-size:10px;color:#94A3B8;font-weight:700">TOTAL XP</div>
        </div>
      </div>

      <!-- Rank Card -->
      <div class="card" style="padding:18px;margin-bottom:16px;background:linear-gradient(135deg,${rank.color}22,${rank.bg});border:2px solid ${rank.color}44">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="font-family:var(--font-display);font-size:20px;font-weight:900;color:var(--navy)">${rank.emoji} ${rank.title}</div>
          <span style="font-size:12px;color:#64748B;font-family:var(--font-mono)">${passed}/${MODULES.length} modules</span>
        </div>
        ${next ? `
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <span style="font-size:12px;color:#64748B;font-family:var(--font-display);font-weight:700">Next: ${next.title}</span>
            <span style="font-size:12px;font-family:var(--font-mono);color:#64748B">${pct}%</span>
          </div>
          <div class="xp-bar-track" style="height:10px"><div class="xp-bar-fill" style="height:10px;width:${pct}%"></div></div>
        ` : `<div style="text-align:center;padding:8px;background:rgba(255,255,255,.5);border-radius:12px;font-family:var(--font-display);font-weight:800;color:var(--navy)">Maximum Rank Achieved!</div>`}
      </div>

      <!-- Learner-level progression -->
      <div class="card" style="padding:18px;margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="font-family:var(--font-display);font-weight:900;font-size:16px;color:var(--navy)">Your Progression</div>
          <span style="font-size:11px;font-family:var(--font-display);font-weight:800;color:${currentLevel.color};background:${currentLevel.bg};border-radius:99px;padding:3px 10px">Currently: ${currentLevel.title}</span>
        </div>
        <div style="display:grid;gap:10px">
          ${levelStats.map(l => {
            const pctL = l.total ? Math.round(l.completed / l.total * 100) : 0;
            const isCurrent = l.id === currentLevel.id;
            return `<div style="background:${isCurrent ? l.bg : '#F8FAFC'};border-radius:14px;padding:12px 14px;border:2px solid ${isCurrent ? l.color : 'transparent'}">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:${isCurrent ? l.color : 'var(--navy)'}">${l.icon} ${l.title}</div>
                <span style="font-size:12px;font-family:var(--font-mono);color:#64748B">${l.completed}/${l.total}</span>
              </div>
              <div class="xp-bar-track" style="height:6px;background:${isCurrent ? l.color+'33' : '#E2E8F0'}"><div class="xp-bar-fill" style="height:6px;width:${pctL}%;background:${l.color}"></div></div>
            </div>`;
          }).join('')}
        </div>
        ${levelMastered && nextLevel
          ? `<div style="background:linear-gradient(135deg,${nextLevel.color}22,${nextLevel.bg});border:2px solid ${nextLevel.color};border-radius:14px;padding:14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;gap:12px">
              <div style="min-width:0">
                <div style="font-family:var(--font-display);font-weight:900;font-size:14px;color:${nextLevel.color}">Ready for ${nextLevel.title}?</div>
                <div style="font-size:12px;color:#64748B;margin-top:3px">You've passed every ${currentLevel.title} module. Step up.</div>
              </div>
              <button onclick="Screens.advanceLearnerLevel()" style="background:${nextLevel.color};color:white;border:none;border-radius:12px;padding:10px 14px;font-family:var(--font-display);font-weight:800;font-size:13px;cursor:pointer;flex-shrink:0">Level up</button>
            </div>`
          : ''}
      </div>

      <div class="card" style="padding:18px;margin-bottom:16px;border-left:4px solid ${resumeTarget ? rank.color : '#CBD5E1'}">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="min-width:0">
            <div style="font-family:var(--font-display);font-weight:900;font-size:16px;color:var(--navy)">Resume</div>
            <div style="font-size:13px;color:#64748B;margin-top:4px">${resumeTarget ? `${resumeTarget.title} - ${resumeTarget.subtitle}` : 'No recent lesson yet. Jump back in from Modules when you are ready.'}</div>
          </div>
          <button onclick="Screens.resumeStudy()" style="background:${resumeTarget ? 'var(--navy)' : '#E2E8F0'};color:${resumeTarget ? 'white' : '#475569'};border:none;border-radius:12px;padding:10px 16px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer;flex-shrink:0">${resumeTarget ? (resumeTarget.actionLabel || 'Resume') : 'Open modules'}</button>
        </div>
      </div>

      <div class="card" style="padding:18px;margin-bottom:16px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:14px">
          <div>
            <div style="font-family:var(--font-display);font-weight:900;font-size:16px;color:var(--navy)">Progress Snapshot</div>
            <div style="font-size:12px;color:#64748B;margin-top:3px">${currentLevel.title} - ${currentLevel.completed}/${currentLevel.total} complete</div>
          </div>
          <button onclick="Screens.filterModules('${currentLevel.id}');Router.navigate('modules')" style="background:${currentLevel.bg};color:${currentLevel.color};border:none;border-radius:12px;padding:8px 12px;font-family:var(--font-display);font-weight:800;font-size:12px;cursor:pointer;flex-shrink:0">Open ${currentLevel.title}</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
          ${[
            ['Modules', `${passed}/${MODULES.length}`, 'completed'],
            ['Checkride', bestCheckride !== null ? `${bestCheckride}%` : 'No score', bestCheckride !== null ? 'best score' : 'not taken'],
            ['Awards', `${s.achievements.length}/${achievementTotal}`, 'earned'],
            ['Streak', `${s.streakDays}`, s.streakDays === 1 ? 'day' : 'days']
          ].map(([label, value, detail]) => `
            <div style="background:#F8FAFC;border-radius:14px;padding:12px">
              <div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase">${label}</div>
              <div style="font-family:var(--font-display);font-weight:900;font-size:20px;color:var(--navy);margin:2px 0">${value}</div>
              <div style="font-size:11px;color:#64748B">${detail}</div>
            </div>
          `).join('')}
        </div>
        <div style="background:#F8FAFC;border-radius:14px;padding:14px">
          <div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase;margin-bottom:6px">Recommended Next Step</div>
          <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy)">${recommended.title}</div>
          <div style="font-size:12px;color:#64748B;line-height:1.5;margin:4px 0 10px">${recommended.subtitle}</div>
          <button onclick="Router.navigate('${recommended.screen}'${Screens._inlineParams(recommended.params)})" style="background:var(--navy);color:white;border:none;border-radius:12px;padding:10px 16px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">${recommended.actionLabel}</button>
        </div>
      </div>

      ${weakAreas.length ? `
        <div class="card" style="padding:18px;margin-bottom:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px">
            <div>
              <div style="font-family:var(--font-display);font-weight:900;font-size:16px;color:var(--navy)">Needs Review</div>
              <div style="font-size:12px;color:#64748B;margin-top:3px">Based on quiz results, review queue, and checkride performance.</div>
            </div>
            <button onclick="Router.navigate('logbook')" style="background:#F1F5F9;color:var(--navy);border:none;border-radius:12px;padding:8px 12px;font-family:var(--font-display);font-weight:800;font-size:12px;cursor:pointer;flex-shrink:0">Logbook</button>
          </div>
          <div style="display:grid;gap:10px">
            ${weakAreas.map(item => `
              <div style="background:#F8FAFC;border-radius:14px;padding:14px;display:flex;align-items:center;justify-content:space-between;gap:12px">
                <div style="min-width:0">
                  <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy)">${item.icon} ${item.title}</div>
                  <div style="font-size:12px;color:#64748B;line-height:1.5;margin-top:3px">${item.reasonText}</div>
                </div>
                <button onclick="Router.navigate('lesson',{moduleId:'${item.moduleId}'})" style="background:${item.color};color:white;border:none;border-radius:12px;padding:9px 14px;font-family:var(--font-display);font-weight:800;font-size:13px;cursor:pointer;flex-shrink:0">${item.actionLabel}</button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Daily Challenge -->
      <div class="card daily-pulse" style="margin-bottom:16px;padding:18px;border:2px solid ${daily.completed?'#10B981':'var(--amber)'}">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:22px">${daily.completed?'Done':'New'}</span>
            <div>
              <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy)">Daily Challenge</div>
              <div style="font-size:12px;color:#94A3B8">+100 XP - ${daily.ref||''}</div>
            </div>
          </div>
          ${!daily.completed ? `<button onclick="Screens.showDailyChallenge()" style="background:var(--amber);color:white;border:none;border-radius:12px;padding:10px 18px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">Start</button>` : `<span style="color:#10B981;font-weight:800;font-family:var(--font-display)">+100 XP</span>`}
        </div>
        <div style="background:var(--amber-light);border-radius:12px;padding:12px;font-size:14px;color:#92400E">${daily.q}</div>
      </div>

      <!-- All Modules Quick Access -->
      <div style="text-align:center;padding:16px;background:white;border-radius:16px;margin-bottom:16px">
        <button onclick="Screens.filterModules('all');Router.navigate('modules')" style="background:var(--navy);color:white;border:none;border-radius:14px;padding:14px 28px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">View All ${MODULES.length} Modules</button>
      </div>

      <div style="text-align:center;font-family:var(--font-mono);font-size:10px;color:#CBD5E1;padding:8px">FAA-H-8083-28B Aviation Weather Handbook (2026)</div>
    `;
  },

  filterModules(act) {
    GameEngine.state._actFilter = act;
    GameEngine.save();
    Router.navigate('modules');
  },

  resumeStudy() {
    const resumeTarget = GameEngine.getResumeTarget();
    if (!resumeTarget) {
      this.filterModules('all');
      return;
    }
    Router.navigate(resumeTarget.screen, resumeTarget.params || {});
  },

  advanceLearnerLevel() {
    const advanced = GameEngine.advanceLevel();
    if (advanced && window.Analytics) {
      Analytics.track('Learner Level Advanced', { newLevel: GameEngine.getCurrentLevel() });
    }
    Router.navigate('dashboard');
  },

  _inlineParams(params = {}) {
    const entries = Object.entries(params || {});
    if (!entries.length) return ',{}';
    return `,{${entries.map(([key, value]) => `${key}:'${String(value).replace(/'/g, "\\'")}'`).join(',')}}`;
  },

  _renderTraceabilityBlock(mod, sec) {
    // FAA Source card hidden — Phase 7. The card (label, source title,
    // edition, chapter reference, validation pill, attribute tags, and
    // descriptive notes) is no longer rendered under sections. Data is
    // preserved in js/data/faa_validation.js for future revival; the
    // function body below is dead-but-preserved per Option A. The small
    // chapter reference under the section title (mod.faaRef rendered at
    // line ~520) and the 'needs_review' Study Note banner
    // (_renderValidationBanner) are on independent render paths and are
    // unaffected.
    return '';
    if (!window.FAAValidation) return '';
    const trace = FAAValidation.getSectionRecord(mod.id, sec);
    if (!trace) return '';
    const tone = FAAValidation.statusTone(trace.validationStatus);
    // Hide redundant pills whose label restates information already conveyed by
    // the descriptive notes line below the card. Currently: 'validated_paraphrase'
    // ("FAA paraphrase"). Other status values keep their pill — 'needs_review' is
    // an actionable CFI annotation; 'validated_exact' and 'training_simplification'
    // convey distinct fidelity claims worth surfacing visibly.
    const HIDE_PILL = new Set(['validated_paraphrase']);
    const showPill = !HIDE_PILL.has(trace.validationStatus);
    const borderColor = showPill ? tone.border : '#CBD5E1';
    const contexts = FAAValidation.formatContentContext(trace.contentContext).slice(0, 2);
    const relevance = [
      trace.checkrideRelevance === 'high' ? 'High checkride relevance' : trace.checkrideRelevance === 'medium' ? 'Checkride support' : '',
      trace.operationalRelevance === 'high' ? 'High operational relevance' : trace.operationalRelevance === 'medium' ? 'Operational refresh' : ''
    ].filter(Boolean).slice(0, 2);
    const detailLine = [trace.sourceChapter, trace.sourceSection].filter(Boolean).join(' - ');
    return `
      <div class="card" style="padding:14px 16px;margin:16px 0;background:#F8FAFC;border-left:4px solid ${borderColor}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
          <div style="min-width:0">
            <div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase;margin-bottom:4px">FAA Source</div>
            <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy)">${trace.sourceTitle}</div>
            <div style="font-size:12px;color:#64748B;margin-top:2px">${trace.sourceEdition}</div>
            ${detailLine ? `<div style="font-size:12px;color:#64748B;margin-top:2px">${detailLine}</div>` : ''}
          </div>
          ${showPill ? `<span style="background:${tone.bg};color:${tone.fg};border:1px solid ${tone.border};border-radius:999px;padding:5px 9px;font-size:11px;font-weight:800;white-space:nowrap">${FAAValidation.formatStatus(trace.validationStatus)}</span>` : ''}
        </div>
        ${(contexts.length || relevance.length) ? `
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
            ${contexts.map(tag => `<span style="background:white;color:#475569;border:1px solid #E2E8F0;border-radius:999px;padding:4px 8px;font-size:11px;font-weight:700">${tag}</span>`).join('')}
            ${relevance.map(tag => `<span style="background:white;color:#475569;border:1px solid #E2E8F0;border-radius:999px;padding:4px 8px;font-size:11px;font-weight:700">${tag}</span>`).join('')}
          </div>` : ''}
        ${trace.notes ? `<div style="font-size:12px;color:#475569;line-height:1.5;margin-top:10px">${trace.notes}</div>` : ''}
      </div>`;
  },

  _renderValidationBanner(mod, sec) {
    if (!window.FAAValidation) return '';
    const trace = FAAValidation.getSectionRecord(mod.id, sec);
    if (!trace) return '';
    const status = trace.validationStatus;
    if (status === 'needs_review') {
      return `<div style="background:#FFFBEB;border-left:3px solid #F59E0B;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:16px;display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:15px;flex-shrink:0;line-height:1.4">🔍</span>
        <div style="font-size:12px;color:#92400E;line-height:1.6;font-family:var(--font-body)"><strong style="font-weight:700">Study Note</strong> — This section covers an area where FAA source guidance has nuance or aircraft-specific variation. Consult your CFI and POH/AFM for application to your specific aircraft and operation.</div>
      </div>`;
    }
    if (status === 'training_simplification') {
      return `<div style="background:#EFF6FF;border-left:3px solid #60A5FA;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:16px;display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:15px;flex-shrink:0;line-height:1.4">📘</span>
        <div style="font-size:12px;color:#1E40AF;line-height:1.6;font-family:var(--font-body)"><strong style="font-weight:700">Teaching Model</strong> — This section uses a simplified framework to aid understanding. It is not an official FAA classification or regulatory standard.</div>
      </div>`;
    }
    return '';
  },

  openLessonAt(moduleId, sectionIdx = 0) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) { Router.navigate('modules'); return; }
    const clampedIdx = Math.max(0, Math.min(sectionIdx, mod.sections.length - 1));
    const prog = GameEngine.ensureModuleProgress(moduleId);
    if (prog.sectionsRead.length === 0 && window.Analytics) {
      Analytics.track('Module Started', { module: mod.title });
    }
    prog.lastSectionIdx = clampedIdx;
    GameEngine.recordStudyTarget({
      type: 'lesson',
      moduleId,
      sectionIdx: clampedIdx,
      sectionId: mod.sections[clampedIdx]?.id
    });
    GameEngine.save();
    Router.navigate('lesson', { moduleId });
  },

  _studySearchQuery: '',

  setStudySearch(query) {
    this._studySearchQuery = query || '';
    this.modules();
  },

  clearStudySearch() {
    this.setStudySearch('');
  },

  _searchStudyContent(query) {
    const term = (query || '').trim().toLowerCase();
    if (!term) return { moduleMatches: [], lessonMatches: [], caseMatches: [] };

    const moduleMatches = [];
    const lessonMatches = [];
    MODULES.forEach(mod => {
      const searchable = [mod.title, mod.subtitle].join(' ').toLowerCase();
      if (searchable.includes(term)) moduleMatches.push(mod);
      (mod.sections || []).forEach((section, idx) => {
        const lessonText = [section.title, section.content || ''].join(' ').replace(/<[^>]+>/g, ' ').toLowerCase();
        if (lessonText.includes(term)) {
          lessonMatches.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            sectionIdx: idx,
            sectionTitle: section.title,
            color: mod.color
          });
        }
      });
    });

    const caseMatches = CASE_STUDIES.filter(cs => {
      const searchable = [cs.title, cs.subtitle, cs.category, cs.hazard].join(' ').toLowerCase();
      return searchable.includes(term);
    });

    return {
      moduleMatches: moduleMatches.slice(0, 8),
      lessonMatches: lessonMatches.slice(0, 8),
      caseMatches: caseMatches.slice(0, 6)
    };
  },

  showDailyChallenge() {
    const daily = GameEngine.getDailyChallenge();
    if (daily.completed) return;
    this._currentDaily = daily; // store for answerDaily access
    const ov = document.createElement('div');
    ov.id = 'daily-challenge-overlay';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px';
    ov.innerHTML = `<div style="background:white;border-radius:24px;padding:28px;max-width:500px;width:100%;max-height:80vh;overflow-y:auto">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:36px">⚡</div>
        <div style="font-family:var(--font-display);font-size:20px;font-weight:900;color:var(--navy)">Daily Challenge</div>
        <div style="font-size:13px;color:#94A3B8">+100 XP · ${daily.ref||''}</div>
      </div>
      <div style="background:var(--amber-light);border-radius:16px;padding:16px;margin-bottom:20px;font-family:var(--font-display);font-size:16px;font-weight:700;color:#92400E;text-align:center">${daily.q}</div>
      <div id="daily-opts">
        ${(daily.opts||daily.options||[]).map((o,i)=>`<button class="quiz-option" onclick="Screens.answerDaily(${i},this)"><span class="quiz-option-letter">${'ABCD'[i]}</span>${o}</button>`).join('')}
      </div>
      <div id="daily-feedback"></div>
      <button onclick="document.getElementById('daily-challenge-overlay').remove()" id="daily-close" style="display:none;width:100%;margin-top:16px;background:var(--navy);color:white;border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">Continue</button>
    </div>`;
    document.body.appendChild(ov);
  },

  answerDaily(sel, btn) {
    const daily = this._currentDaily;
    if (!daily || btn.classList.contains('disabled')) return;
    const cor = daily.correct;
    btn.closest('#daily-opts').querySelectorAll('.quiz-option').forEach((b, i) => {
      b.classList.add('disabled');
      if (i === cor) b.classList.add('correct');
      else if (b === btn && sel !== cor) b.classList.add('wrong');
    });
    document.getElementById('daily-close').style.display = 'block';

    if (window.Analytics) Analytics.track('Daily Challenge Answered', { correct: sel === cor });
    if (sel === cor) {
      GameEngine.completeDailyChallenge();
      this.dashboard();
    } else {
      // Add to spaced repetition queue
      if (daily.id && !GameEngine.state.spacedRepetition.includes(daily.id)) {
        GameEngine.state.spacedRepetition.push(daily.id);
        GameEngine.save();
      }
      // Show module review link
      const mod = daily.moduleId ? MODULES.find(m => m.id === daily.moduleId) : null;
      const fb = document.getElementById('daily-feedback');
      if (fb && mod) {
        fb.innerHTML = `<div style="margin-top:14px;background:#FFF7ED;border-radius:12px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="font-size:13px;color:#92400E;font-family:var(--font-body);font-weight:600">Added to your review queue</div>
          <button onclick="document.getElementById('daily-challenge-overlay').remove();Router.navigate('lesson',{moduleId:'${mod.id}'})"
            style="background:${mod.color||'var(--navy)'};color:white;border:none;border-radius:10px;padding:8px 14px;font-family:var(--font-display);font-weight:800;font-size:13px;cursor:pointer;white-space:nowrap">
            Review in ${mod.title}
          </button>
        </div>`;
      }
    }
  },

  // ===== MODULES =====
  modules() {
    const s = GameEngine.state;
    // _actFilter key reused as the level filter; returning users may have integer
    // 1/2/3 from the old Act taxonomy — coerce to 'all' since the integer-to-level
    // mapping was never bijective (Acts grouped multiple levels together).
    const rawFilter = s._actFilter;
    const levelFilter = (typeof rawFilter === 'string' && (rawFilter === 'all' || LEVELS.includes(rawFilter))) ? rawFilter : 'all';
    const currentLevelId = GameEngine.getCurrentLevel();
    const currentLevelOrder = (LEVEL_META.find(l => l.id === currentLevelId) || {}).order || 1;
    const searchQuery = this._studySearchQuery || '';
    const searchData = this._searchStudyContent(searchQuery);
    const baseMods = levelFilter === 'all' ? MODULES : MODULES.filter(m => m.level === levelFilter);
    const filteredMods = searchQuery.trim()
      ? baseMods.filter(mod => {
          const sectionHit = searchData.lessonMatches.some(item => item.moduleId === mod.id);
          const moduleHit = searchData.moduleMatches.some(item => item.id === mod.id);
          return sectionHit || moduleHit;
        })
      : baseMods;
    const levelMeta = LEVEL_META.find(l => l.id === levelFilter);

    document.getElementById('modules-content').innerHTML = `
      <h1 style="font-family:var(--font-display);font-size:26px;font-weight:900;color:var(--navy);margin-bottom:4px">Modules</h1>
      <p style="color:#64748B;font-size:14px;margin-bottom:16px">FAA-H-8083-28B - ${MODULES.length} modules across 4 learner levels</p>

      <div class="card" style="padding:16px;margin-bottom:16px">
        <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy);margin-bottom:10px">Quick Find</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="search" value="${searchQuery.replace(/"/g, '&quot;')}" oninput="Screens.setStudySearch(this.value)" placeholder="Search modules, lessons, or case studies" aria-label="Search study content" style="flex:1;border:2px solid #E2E8F0;border-radius:12px;padding:12px 14px;font-family:var(--font-body);font-size:14px;color:var(--navy);background:white">
          ${searchQuery.trim() ? `<button onclick="Screens.clearStudySearch()" style="background:#F1F5F9;color:#475569;border:none;border-radius:12px;padding:12px 14px;font-family:var(--font-display);font-weight:800;font-size:13px;cursor:pointer">Clear</button>` : ''}
        </div>
        ${searchQuery.trim() ? `<div style="font-size:12px;color:#64748B;margin-top:8px">Showing ${filteredMods.length} module matches, ${searchData.lessonMatches.length} lesson hits, and ${searchData.caseMatches.length} case matches.</div>` : `<div style="font-size:12px;color:#64748B;margin-top:8px">Search by topic name, lesson title, or case study.</div>`}
      </div>

      <!-- Level filter tabs -->
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:20px;scrollbar-width:none">
        <button class="act-tab ${levelFilter==='all'?'active':''}" onclick="Screens.filterModules('all')">All (${MODULES.length})</button>
        ${LEVEL_META.map(l => {
          const count = MODULES.filter(m => m.level === l.id).length;
          const active = levelFilter === l.id;
          return `<button class="act-tab ${active?'active':''}" onclick="Screens.filterModules('${l.id}')" style="${active?`border-color:${l.color};background:${l.bg};color:${l.color}`:''}">${l.icon} ${l.title} (${count})</button>`;
        }).join('')}
      </div>

      ${levelMeta ? (() => {
        const lStats = GameEngine.getLevelProgress().find(l => l.id === levelMeta.id);
        const passLabel = lStats ? ` (${lStats.completed}/${lStats.total} passed)` : '';
        return `<div style="background:${levelMeta.bg};border-radius:16px;padding:14px 16px;margin-bottom:16px;border-left:4px solid ${levelMeta.color}">
          <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:${levelMeta.color}">${levelMeta.title}<span style="font-weight:600;font-size:13px">${passLabel}</span></div>
          <div style="font-size:13px;color:#64748B;margin-top:2px">${levelMeta.subtitle}</div>
        </div>`;
      })() : ''}

      ${searchQuery.trim() ? `
        <div class="card" style="padding:16px;margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy);margin-bottom:10px">Matching Lessons & Cases</div>
          <div style="display:grid;gap:8px">
            ${searchData.lessonMatches.slice(0,5).map(item => `
              <button onclick="Screens.openLessonAt('${item.moduleId}',${item.sectionIdx})" style="background:#F8FAFC;border:none;border-radius:12px;padding:12px 14px;text-align:left;cursor:pointer">
                <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy)">${item.sectionTitle}</div>
                <div style="font-size:12px;color:#64748B;margin-top:3px">${item.moduleTitle}</div>
              </button>
            `).join('')}
            ${searchData.caseMatches.slice(0,4).map(cs => `
              <button onclick="Router.navigate('case_detail',{caseId:'${cs.id}'})" style="background:#F8FAFC;border:none;border-radius:12px;padding:12px 14px;text-align:left;cursor:pointer">
                <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy)">${cs.title}</div>
                <div style="font-size:12px;color:#64748B;margin-top:3px">${cs.subtitle}</div>
              </button>
            `).join('')}
            ${!filteredMods.length && !searchData.lessonMatches.length && !searchData.caseMatches.length ? `<div style="background:#F8FAFC;border-radius:12px;padding:14px;font-size:13px;color:#64748B">No matches for "${searchQuery.replace(/"/g, '&quot;')}". Try a module title, weather product, or hazard.</div>` : ''}
          </div>
        </div>
      ` : ''}

      <div style="display:grid;gap:12px">
        ${filteredMods.map(mod => {
          const prog = GameEngine.getModuleProgress(mod.id);
          const modPassed = s.modulesPassed.includes(mod.id);
          const secPct = mod.sections ? Math.round(prog.sectionsRead.length/mod.sections.length*100) : 0;
          const firstIncompletePrereq = (mod.prerequisites || []).find(pid => !s.modulesPassed.includes(pid));
          const prereqMod = firstIncompletePrereq ? MODULES.find(m => m.id === firstIncompletePrereq) : null;
          const modLevelMeta = LEVEL_META.find(l => l.id === mod.level);
          const isStretch = modLevelMeta && modLevelMeta.order > currentLevelOrder;
          return `<div class="card" style="padding:18px;${isStretch ? 'opacity:0.85' : ''}">
            <div style="display:flex;gap:14px;align-items:flex-start">
              <div style="width:54px;height:54px;border-radius:16px;background:${mod.bgColor};display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">${mod.icon}</div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px">
                  <div>
                    <div style="font-family:var(--font-display);font-weight:900;font-size:16px;color:var(--navy)">${mod.title}</div>
                    <div style="font-size:12px;color:#64748B">${mod.subtitle}</div>
                    ${prereqMod && secPct === 0 ? `<div style="font-size:11px;color:#94A3B8;margin-top:4px">Recommended first: ${prereqMod.icon} ${prereqMod.title}</div>` : ''}
                  </div>
                  <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                    ${modPassed ? `<span style="background:#D1FAE5;color:#065F46;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;white-space:nowrap">PASSED</span>` : `<span style="background:${mod.bgColor};color:${mod.color};font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;white-space:nowrap">+${mod.xpReward} XP</span>`}
                    ${isStretch ? `<span style="background:#F1F5F9;color:#64748B;font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px;white-space:nowrap" title="${modLevelMeta.title} — beyond your current level, but free to explore">Stretch · ${modLevelMeta.title}</span>` : ''}
                  </div>
                </div>
                <div style="margin:8px 0">
                  <div class="xp-bar-track" style="height:6px"><div class="xp-bar-fill" style="height:6px;width:${secPct}%;background:${mod.color}"></div></div>
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                  <button onclick="Screens.openLessonAt('${mod.id}',${prog.lastSectionIdx || 0})" style="background:${mod.color};color:white;border:none;border-radius:12px;padding:10px 20px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">
                    ${secPct===100?'Review':secPct>0?'Continue':'Start'}
                  </button>
                  ${prog.quizCompleted||secPct===100 ? `<button onclick="Router.navigate('quiz',{moduleId:'${mod.id}'})" style="background:white;color:${mod.color};border:2.5px solid ${mod.color};border-radius:12px;padding:10px 20px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">${(mod.quiz||[]).length}Q Quiz</button>` : ''}
                </div>
              </div>
            </div>
          </div>`;
        }).join('')}
        ${!filteredMods.length ? `<div class="card" style="padding:20px;text-align:center;color:#64748B">No modules match this filter. Try another level or clear the search.</div>` : ''}
      </div>`;
  },

  // ===== LESSON =====
  lesson({moduleId}) {
    const mod = MODULES.find(m=>m.id===moduleId);
    if (!mod) { Router.navigate('modules'); return; }
    const prog = GameEngine.getModuleProgress(mod.id);
    GameEngine.recordStudyTarget({
      type: 'lesson',
      moduleId: mod.id,
      sectionIdx: prog.lastSectionIdx || 0,
      sectionId: mod.sections[prog.lastSectionIdx || 0]?.id
    });
    this._renderLessonSection(mod, prog.lastSectionIdx || 0);
  },

  _renderLessonSection(mod, idx) {
    const sec = mod.sections[idx];
    const prog = GameEngine.getModuleProgress(mod.id);
    const isRead = prog.sectionsRead.includes(sec.id);
    if (!isRead) GameEngine.markSectionRead(mod.id, sec.id);
    prog.lastSectionIdx = idx;
    GameEngine.recordStudyTarget({
      type: 'lesson',
      moduleId: mod.id,
      sectionIdx: idx,
      sectionId: sec.id
    });
    GameEngine.save();

    // Render section diagram using unified renderer
    const diagHTML = this._renderDiagram(sec);
    const traceabilityHTML = this._renderTraceabilityBlock(mod, sec);

    document.getElementById('lesson-content').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <button onclick="window.Router&&Router.navigate('modules')" style="background:white;border:2px solid #E2E8F0;border-radius:12px;padding:8px 14px;font-family:var(--font-display);font-weight:700;font-size:14px;cursor:pointer;color:#64748B">Back</button>
        <div style="text-align:center">
          <div style="font-size:12px;color:#94A3B8;font-weight:700">${mod.title}</div>
          <div style="font-size:11px;color:#CBD5E1">${idx+1}/${mod.sections.length}</div>
        </div>
        <button onclick="Router.navigate('quiz',{moduleId:'${mod.id}'})" style="background:${mod.color};color:white;border:none;border-radius:12px;padding:8px 14px;font-family:var(--font-display);font-weight:700;font-size:13px;cursor:pointer">${(mod.quiz||[]).length}Q Quiz</button>
      </div>
      <div class="xp-bar-track" style="height:6px;margin-bottom:20px">
        <div class="xp-bar-fill" style="height:6px;width:${((idx+1)/mod.sections.length)*100}%;background:${mod.color}"></div>
      </div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:20px;scrollbar-width:none">
        ${mod.sections.map((s,i)=>`
          <button class="section-tab ${i===idx?'active':''}" onclick="Screens._renderLessonSection(MODULES.find(m=>m.id==='${mod.id}'),${i})" style="${prog.sectionsRead.includes(s.id)&&i!==idx?'background:#D1FAE5;color:#065F46;border-color:#10B981':''}">
            ${prog.sectionsRead.includes(s.id)&&i!==idx?'Done: ':''}${s.title}
          </button>`).join('')}
      </div>
      <div style="margin-bottom:20px">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:${mod.color};margin-bottom:6px;font-family:var(--font-display)">${mod.title} - Section ${idx+1}</div>
        <h1 style="font-family:var(--font-display);font-size:24px;font-weight:900;color:var(--navy);margin:0 0 4px">${sec.title}</h1>
        <div style="font-size:12px;color:#94A3B8;font-family:var(--font-mono)">${mod.faaRef||''}</div>
      </div>
      ${traceabilityHTML}
      ${this._renderValidationBanner(mod, sec)}
      <div class="lesson-content">${sec.content||''}</div>
      ${diagHTML}
      <div style="background:var(--amber-light);border-radius:14px;padding:12px 16px;margin:20px 0;display:flex;align-items:center;gap:10px">
        <span style="font-size:20px">${isRead?'Done':'Read'}</span>
        <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy)">${isRead?'Section completed':'Section read - +10 XP!'}</div>
      </div>
      <div style="display:flex;gap:12px;padding-bottom:20px">
        ${idx>0 ? `<button onclick="Screens._renderLessonSection(MODULES.find(m=>m.id==='${mod.id}'),${idx-1})" style="flex:1;background:white;border:2.5px solid #E2E8F0;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:15px;cursor:pointer;color:#64748B">Prev</button>` : '<div style="flex:1"></div>'}
        ${idx < mod.sections.length-1
          ? `<button onclick="Screens._renderLessonSection(MODULES.find(m=>m.id==='${mod.id}'),${idx+1})" style="flex:2;background:${mod.color};color:white;border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:15px;cursor:pointer">Next</button>`
          : `<button onclick="Router.navigate('quiz',{moduleId:'${mod.id}'})" style="flex:2;background:#10B981;color:white;border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:15px;cursor:pointer">Start ${(mod.quiz||[]).length}-question quiz</button>`}
      </div>`;

    // Expand any inline FAA-figure sentinels in the lesson body, then init
    // the section's primary diagram (if any).
    this._expandFaaFigureSentinels(document.getElementById('lesson-content'));
    this._initDiagram(sec);
  },

  // Walk the lesson DOM for `<div data-faa-figure='{...}'>` placeholders and
  // replace each with Diagrams.renderFaaFigure(config). Lets module content
  // templates embed FAA figures inline despite modules.js loading before
  // diagrams.js (so direct ${Diagrams.renderFaaFigure(...)} would be
  // undefined at template evaluation time). All inline figures route through
  // the helper, so style changes to .faa-figure stay in sync.
  _expandFaaFigureSentinels(rootEl) {
    if (!rootEl) return;
    const sentinels = rootEl.querySelectorAll('[data-faa-figure]');
    sentinels.forEach(el => {
      const raw = el.dataset.faaFigure || '';
      try {
        const config = JSON.parse(raw);
        el.outerHTML = Diagrams.renderFaaFigure(config);
      } catch (e) {
        console.warn('[_expandFaaFigureSentinels] failed to expand sentinel:', e.message, raw);
      }
    });
  },

  _renderDiagram(sec) {
    if (!sec.diagram) return '';
    const d = sec.diagram;
    // Foundations pattern: hotspot/slider with svgKey
    if (d.svgKey) return Diagrams.render(d.type, d.svgKey);
    // Hazard pattern: interactive with explicit key
    if (d.key) return Diagrams.render(d.type, d.key);
    // Operational products: type is the render key
    if (d.type) return Diagrams.render(d.type, d.type);
    return '';
  },

  _initDiagram(sec) {
    if (!sec.diagram) return;
    if (sec.diagram.type === 'process') return;
    const k = sec.diagram.svgKey || sec.diagram.key || sec.diagram.type || '';
    setTimeout(() => {
      if (k === 'density_altitude') Diagrams.calcDA();
      if (k === 'lapse_rate_graph') Diagrams.updateLapseGraph();
      if (k === 'wave_cyclone') Diagrams.showCycloneStage(0);
      if (k === 'microburst_approach') Diagrams.showMicroburstPhase(0);
      if (k === 'icing_severity') Diagrams.calcIcingRisk();
      if (k === 'fog_formation') Diagrams.calcFogRisk();
      if (k === 'flight_category_calc') Diagrams.calcFlightCategory();
    }, 100);
  },

  // ===== QUIZ =====
  quiz({moduleId}) {
    const mod = MODULES.find(m=>m.id===moduleId);
    if (!mod) { Router.navigate('modules'); return; }
    const questions = Array.isArray(mod.quiz) ? mod.quiz.filter(Boolean) : [];
    if (!questions.length) { Router.navigate('lesson', {moduleId: mod.id}); return; }
    GameEngine.recordStudyTarget({ type: 'quiz', moduleId: mod.id });

    // Check for interrupted quiz state for this module
    const saved = GameEngine.state.quizInProgress;
    if (saved && saved.moduleId === moduleId && saved.current > 0 && saved.current < questions.length) {
      this._showQuizResumePrompt(mod, questions, saved);
      return;
    }

    // Fresh start
    GameEngine.clearQuizProgress();
    this._qs = {mod, questions, current:0, score:0, wrongIds:[], answered:0, resolved:{}};
    this._renderQ();
  },

  _showQuizResumePrompt(mod, questions, saved) {
    const doc = document.getElementById('quiz-content');
    if (!doc) return;
    doc.innerHTML = `
      <div style="padding:32px 0;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">📋</div>
        <h2 style="font-family:var(--font-display);font-weight:900;color:#0C1B33;margin:0 0 8px">${mod.title}</h2>
        <p style="font-size:14px;color:#64748B;margin:0 0 6px">You have an unfinished quiz.</p>
        <p style="font-size:13px;color:#94A3B8;margin:0 0 28px">Question ${saved.current + 1} of ${questions.length} — ${saved.score} pts so far</p>
        <div style="display:flex;flex-direction:column;gap:10px;max-width:280px;margin:0 auto">
          <button onclick="Screens._resumeQuiz()" style="background:#38BDF8;color:#0C1B33;border:none;border-radius:14px;padding:14px;font-family:var(--font-display);font-weight:900;font-size:15px;cursor:pointer">Continue quiz</button>
          <button onclick="Screens._restartQuiz('${mod.id}')" style="background:#F1F5F9;color:#475569;border:none;border-radius:14px;padding:12px;font-family:var(--font-display);font-weight:700;font-size:14px;cursor:pointer">Start over</button>
        </div>
      </div>`;
    // Store temporarily so resume/restart can access
    this._pendingResume = {mod, questions, saved};
  },

  _resumeQuiz() {
    if (!this._pendingResume) return;
    const {mod, questions, saved} = this._pendingResume;
    this._pendingResume = null;
    this._qs = {
      mod, questions,
      current: saved.current,
      score: saved.score,
      wrongIds: saved.wrongIds || [],
      answered: saved.answered || 0,
      resolved: saved.resolved || {}
    };
    this._renderQ();
  },

  _restartQuiz(moduleId) {
    this._pendingResume = null;
    GameEngine.clearQuizProgress();
    const mod = MODULES.find(m=>m.id===moduleId);
    const questions = Array.isArray(mod.quiz) ? mod.quiz.filter(Boolean) : [];
    this._qs = {mod, questions, current:0, score:0, wrongIds:[], answered:0, resolved:{}};
    this._renderQ();
  },

  _qs: null,
  _timerInt: null,
  _cr: null,
  _crTick: null,

  // -- Timer & session cleanup helpers --------------------------
  _stopTimer() {
    if (this._timerInt) { clearInterval(this._timerInt); this._timerInt = null; }
  },
  _stopCRTimer() {
    if (this._crTick) { clearInterval(this._crTick); this._crTick = null; }
  },
  _exitQuiz(moduleId) {
    this._stopTimer();
    this._qs = null;
    GameEngine.clearQuizProgress();
    Router.navigate('lesson', {moduleId});
  },
  _exitCheckride() {
    this._stopCRTimer();
    this._cr = null;
    Router.navigate('checkride');
  },

  _isQuizQuestionResolved() {
    return !!(this._qs && this._qs.resolved && this._qs.resolved[this._qs.current]);
  },

  _markQuizQuestionResolved(isWrong, qId) {
    if (!this._qs || this._isQuizQuestionResolved()) return false;
    this._qs.resolved[this._qs.current] = true;
    this._qs.answered++;
    if (isWrong && qId && !this._qs.wrongIds.includes(qId)) this._qs.wrongIds.push(qId);
    return true;
  },

  _renderQ() {
    if (!this._qs) return;
    const qs = this._qs;
    const {mod, questions, current} = qs;
    if (current >= questions.length) { this._showResults(); return; }
    const q = questions[current];
    const pct = (current/questions.length)*100;
    let html = q.type === 'wx_brief' ? this._renderWxBrief(q, mod) : q.type === 'drag_drop' ? this._renderDD(q, mod) : this._renderMCQ(q, mod);

    document.getElementById('quiz-content').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <button onclick="Screens._exitQuiz('${mod.id}')" aria-label="Exit quiz and return to lesson" style="background:white;border:2px solid #E2E8F0;border-radius:12px;padding:8px 14px;font-family:var(--font-display);font-weight:700;font-size:14px;cursor:pointer;color:#64748B" title="Exit quiz">Exit</button>
        <div class="xp-bar-track" style="height:10px;flex:1;margin:0 12px">
          <div class="xp-bar-fill" style="height:10px;width:${pct}%;background:${mod.color}"></div>
        </div>
        <div style="background:#F8FAFC;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:800;color:#64748B;font-family:var(--font-display)">Missed ${qs.wrongIds.length}</div>
      </div>
      <div style="text-align:center;margin-bottom:8px">
        <span style="font-family:var(--font-mono);font-size:12px;color:#94A3B8">Q ${current+1}/${questions.length}</span>
        ${q.type==='timed'?`<span style="background:#FEE2E2;color:#EF4444;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;margin-left:8px;font-family:var(--font-display)">TIMED</span>`:''}
        ${q.type==='scenario'?`<span style="background:#EEF2FF;color:#6366F1;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;margin-left:8px;font-family:var(--font-display)">SCENARIO</span>`:''}
        ${q.type==='wx_brief'?`<span style="background:${mod.color}20;color:${mod.color};font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;margin-left:8px;font-family:var(--font-display)">WEATHER BRIEF</span>`:''}
      </div>
      ${html}`;
    if (q.type === 'timed') this._startTimer(q.timeLimit||q.time_limit||12, q);
  },

  _renderMCQ(q, mod) {
    return `${q.type==='timed'?`<div style="display:flex;justify-content:center;margin-bottom:16px"><div style="position:relative;width:70px;height:70px"><svg width="70" height="70" style="transform:rotate(-90deg)"><circle cx="35" cy="35" r="30" stroke="#E2E8F0" stroke-width="6" fill="none"/><circle id="timer-circle" cx="35" cy="35" r="30" stroke="#EF4444" stroke-width="6" fill="none" stroke-dasharray="188.5" stroke-dashoffset="0" class="timer-fill"/></svg><div id="timer-num" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:18px;font-weight:700;color:#EF4444">${q.timeLimit||q.time_limit||12}</div></div></div>`:''}
    ${q.type==='scenario'&&(q.scenario||q.scenarioText)?`<div style="background:#EEF2FF;border-radius:16px;padding:16px;margin-bottom:16px;border-left:4px solid #6366F1"><div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#6366F1;font-family:var(--font-display);margin-bottom:6px">Scenario Brief</div><div style="font-size:14px;color:#334155;line-height:1.6">${q.scenario||q.scenarioText||''}</div></div>`:''}
    <div style="background:white;border-radius:20px;padding:20px;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,.06)">
      <h2 style="font-family:var(--font-display);font-size:18px;font-weight:800;color:var(--navy);margin:0;line-height:1.4">${q.question}</h2>
    </div>
    <div id="quiz-options">
      ${(q.options||q.opts||[]).map((o,i)=>`<button class="quiz-option" onclick="Screens._answerMC(${i},${q.correct},this)"><span class="quiz-option-letter">${'ABCD'[i]}</span><span style="flex:1">${o}</span></button>`).join('')}
    </div>
    <div id="quiz-feedback" style="display:none;background:white;border-radius:16px;padding:16px;margin-top:12px;box-shadow:0 2px 12px rgba(0,0,0,.06)">
      <div id="feedback-header" style="font-family:var(--font-display);font-weight:800;font-size:15px;margin-bottom:8px"></div>
      <div id="feedback-text" style="font-size:14px;color:#475569;line-height:1.6"></div>
    </div>
    <button id="quiz-next-btn" onclick="Screens._nextQ()" style="display:none;width:100%;margin-top:12px;background:${mod.color};color:white;border:none;border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">${this._qs.current<this._qs.questions.length-1?'Next':'Results'}</button>`;
  },

  _renderWxBrief(q, mod) {
    const PRODUCT_COLORS = {METAR:'#2563EB',TAF:'#7C3AED',SIGMET:'#DC2626','CONV SIGMET':'#DC2626',PIREP:'#059669',NOTAM:'#D97706'};
    const products = q.products || [];
    const productHtml = products.map(p => {
      const pColor = PRODUCT_COLORS[p.type] || '#64748B';
      return `<div style="border-radius:14px;padding:14px;background:white;box-shadow:0 1px 6px rgba(0,0,0,.06);margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="background:${pColor}15;color:${pColor};font-family:var(--font-display);font-size:11px;font-weight:800;padding:2px 9px;border-radius:20px">${p.type}</span>
          <span style="font-family:var(--font-display);font-size:12px;font-weight:700;color:#64748B">${p.label||''}</span>
        </div>
        ${p.raw?`<div style="font-family:var(--font-mono);font-size:12px;color:#1E293B;background:#F8FAFC;border-radius:8px;padding:10px;line-height:1.6;word-break:break-all">${p.raw}</div>`:''}
        ${p.text?`<div style="font-family:var(--font-display);font-size:13px;color:#475569;line-height:1.6;margin-top:6px">${p.text}</div>`:''}
        ${p.decoded?`<div style="font-family:var(--font-display);font-size:12px;color:#64748B;line-height:1.6;margin-top:6px;padding-top:6px;border-top:1px solid #F1F5F9">${p.decoded}</div>`:''}
      </div>`;
    }).join('');
    const m = q.mission || {};
    const optionValues = (q.options||[]).map(o => typeof o === 'object' ? o : {id:'o'+Math.random(),label:o,value:o});
    const optBtns = optionValues.map(o => `<button class="quiz-option" onclick="Screens._answerWxBrief('${o.value}','${q.id}',this)" style="text-align:left"><span style="flex:1">${o.label}</span></button>`).join('');
    return `<div style="background:#1E293B;border-radius:20px;padding:16px 18px;margin-bottom:12px">
      <div style="font-family:var(--font-display);font-size:11px;font-weight:800;text-transform:uppercase;color:#94A3B8;margin-bottom:4px">Mission</div>
      <div style="font-family:var(--font-display);font-size:15px;font-weight:800;color:white;line-height:1.4">${m.departure||''} → ${m.destination||''}</div>
      ${m.aircraft?`<div style="font-family:var(--font-display);font-size:12px;color:#94A3B8;margin-top:4px">${m.aircraft}</div>`:''}
      ${m.pilot?`<div style="font-family:var(--font-display);font-size:12px;color:#94A3B8;margin-top:2px">${m.pilot}</div>`:''}
      ${(m.ete||m.fuel||m.departureTime)?`<div style="font-family:var(--font-display);font-size:11px;color:#64748B;margin-top:6px">${m.ete?'ETE '+m.ete:''}${m.fuel?' · Fuel '+m.fuel:''}${m.departureTime?' · Departure '+m.departureTime:''}</div>`:''}
    </div>
    <div style="margin-bottom:14px">${productHtml}</div>
    <div style="background:white;border-radius:16px;padding:16px;margin-bottom:14px;box-shadow:0 1px 6px rgba(0,0,0,.06)">
      <div style="font-family:var(--font-display);font-size:11px;font-weight:800;text-transform:uppercase;color:#64748B;margin-bottom:6px">PIC Decision</div>
      <div style="font-family:var(--font-display);font-size:16px;font-weight:800;color:#1E293B;line-height:1.4">Based on this weather package, what is your PIC decision?</div>
    </div>
    <div id="quiz-options">${optBtns}</div>
    <div id="wx-feedback" style="display:none;border-radius:16px;padding:16px;margin-top:12px;box-shadow:0 2px 12px rgba(0,0,0,.06)">
      <div id="wx-feedback-header" style="font-family:var(--font-display);font-weight:800;font-size:15px;margin-bottom:8px"></div>
      <div id="wx-feedback-body" style="font-size:14px;color:#475569;line-height:1.6"></div>
    </div>
    <button id="quiz-next-btn" onclick="Screens._nextQ()" style="display:none;width:100%;margin-top:12px;background:${mod.color};color:white;border:none;border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">${this._qs&&this._qs.current<this._qs.questions.length-1?'Next':'Results'}</button>`;
  },

  _answerWxBrief(selectedValue, qId, btn) {
    if (btn.classList.contains('disabled') || this._isQuizQuestionResolved()) return;
    const qs = this._qs;
    if (!qs) return;
    const q = qs.questions[qs.current];
    const correct = q.analysis && q.analysis.correct;
    const isCorrect = selectedValue === correct;
    document.querySelectorAll('.quiz-option').forEach(b => b.classList.add('disabled'));
    document.querySelectorAll('.quiz-option').forEach(b => {
      const bVal = b.getAttribute('onclick').match(/'([^']+)'/);
      if (bVal && bVal[1] === correct) b.classList.add('correct');
    });
    if (!isCorrect) btn.classList.add('wrong');
    this._markQuizQuestionResolved(!isCorrect, q.id);
    if (!isCorrect) {
      const xp = q.xp || 30;
      GameEngine.state.spacedRepetition = GameEngine.state.spacedRepetition || [];
      if (!GameEngine.state.spacedRepetition.includes(q.id)) GameEngine.state.spacedRepetition.push(q.id);
    } else {
      GameEngine.addXP(q.xp || 30, 'wx_brief');
    }
    GameEngine.save(GameEngine.state);
    const analysis = q.analysis || {};
    const keyFactorsHtml = (analysis.keyFactors||[]).map(f=>`<li style="margin-bottom:4px">${f}</li>`).join('');
    const trapHtml = analysis.trap ? `<div style="background:#FEF3C7;border-radius:10px;padding:12px;margin-top:10px"><div style="font-family:var(--font-display);font-size:11px;font-weight:800;color:#92400E;margin-bottom:4px">COMMON TRAP</div><div style="font-size:13px;color:#78350F">${analysis.trap}</div></div>` : '';
    const fb = document.getElementById('wx-feedback');
    const fbh = document.getElementById('wx-feedback-header');
    const fbb = document.getElementById('wx-feedback-body');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = isCorrect ? 'white' : 'white';
      fb.style.borderLeft = isCorrect ? '4px solid #10B981' : '4px solid #EF4444';
    }
    if (fbh) fbh.innerHTML = isCorrect ? '<span style="color:#10B981">Correct — good PIC thinking.</span>' : '<span style="color:#EF4444">Not quite — review the key factors.</span>';
    if (fbb) fbb.innerHTML = `<p style="margin:0 0 8px 0">${analysis.explanation||''}</p>${keyFactorsHtml?`<ul style="margin:8px 0 0 0;padding-left:18px">${keyFactorsHtml}</ul>`:''}${trapHtml}`;
    const nb = document.getElementById('quiz-next-btn');
    if (nb) nb.style.display = 'block';
  },

  _startTimer(secs, q) {
    let rem = secs;
    this._stopTimer();
    this._timerInt = setInterval(() => {
      rem--;
      const c = document.getElementById('timer-circle');
      const n = document.getElementById('timer-num');
      if (!c||!n) { this._stopTimer(); return; }
      c.style.strokeDashoffset = 188.5*(1-rem/secs);
      n.textContent = rem;
      if (rem<=3) n.classList.add('timer-warning');
      if (rem<=0) {
        this._stopTimer();
        if (!this._qs || this._isQuizQuestionResolved()) return;
        document.querySelectorAll('.quiz-option').forEach((b,i)=>{b.classList.add('disabled');if(i===q.correct)b.classList.add('correct');});
        const fb=document.getElementById('quiz-feedback'),fh=document.getElementById('feedback-header'),ft=document.getElementById('feedback-text'),nb=document.getElementById('quiz-next-btn');
        if(fb){fb.style.display='block';fb.style.borderLeft='4px solid var(--rose)';}
        if(fh)fh.innerHTML='<span style="color:#EF4444">Time\'s up!</span>';
        if(ft)ft.textContent=q.explanation||'';
        if(nb)nb.style.display='block';
        this._markQuizQuestionResolved(true, q.id);
      }
    },1000);
  },

  _answerMC(sel, cor, btn) {
    if (btn.classList.contains('disabled') || this._isQuizQuestionResolved()) return;
    this._stopTimer();
    const qs = this._qs;
    const q = qs.questions[qs.current];
    document.querySelectorAll('.quiz-option').forEach((b,i)=>{b.classList.add('disabled');if(i===cor)b.classList.add('correct');else if(b===btn&&sel!==cor)b.classList.add('wrong');});
    const isC = sel===cor;
    const fb=document.getElementById('quiz-feedback'),fh=document.getElementById('feedback-header'),ft=document.getElementById('feedback-text'),nb=document.getElementById('quiz-next-btn');
    if(fb){fb.style.display='block';fb.style.borderLeft=`4px solid ${isC?'var(--emerald)':'var(--rose)'}`;}
    if(fh)fh.innerHTML=isC?`<span style="color:#10B981">Correct! +${q.xp||10} XP</span>`:`<span style="color:#EF4444">Not quite</span>`;
    if(ft)ft.textContent=q.explanation||'';
    if(nb)nb.style.display='block';
    this._markQuizQuestionResolved(!isC, q.id);
    if(isC){qs.score++;if(q.xp)GameEngine.addXP(q.xp);if(q.type==='scenario'){GameEngine.state.scenarioCorrect=(GameEngine.state.scenarioCorrect||0)+1;GameEngine.save();}if(q.type==='timed'){GameEngine.state.timedCorrect=(GameEngine.state.timedCorrect||0)+1;GameEngine.save();}}
  },

  _renderDD(q, mod) {
    const shuffled=[...q.items].sort(()=>Math.random()-.5);
    return `<div style="background:white;border-radius:20px;padding:20px;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,.06)"><h2 style="font-family:var(--font-display);font-size:18px;font-weight:800;color:var(--navy);margin:0">${q.question}</h2></div>
    <div id="drag-bank" style="background:#F8FAFC;border-radius:16px;padding:14px;margin-bottom:16px;display:flex;flex-wrap:wrap;gap:4px">
      <div style="font-size:11px;font-weight:700;color:#94A3B8;width:100%;margin-bottom:6px">DRAG FROM HERE:</div>
      ${shuffled.map(item=>`<div class="drag-item" draggable="true" data-item="${item}" ontouchstart="Screens._ts(event,this)" ontouchmove="Screens._tm(event)" ontouchend="Screens._te(event)" ondragstart="Screens._ds(event,this)" ondragend="Screens._de(event)">${item}</div>`).join('')}
    </div>
    <div style="display:grid;gap:10px;margin-bottom:16px">
      ${q.targets.map(t=>`<div class="drag-target" data-target="${t}" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="Screens._drop(event,this)"><span style="font-family:var(--font-display);font-size:12px;color:#94A3B8;white-space:nowrap;flex-shrink:0">${t}:</span></div>`).join('')}
    </div>
    <button id="quiz-check-btn" onclick="Screens._checkDD()" style="width:100%;background:${mod.color};color:white;border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">Check Answers</button>
    <div id="quiz-feedback" style="display:none;margin-top:12px;background:white;border-radius:16px;padding:16px"><div id="feedback-header"></div><div id="feedback-text"></div></div>
    <button id="quiz-next-btn" onclick="Screens._nextQ()" style="display:none;width:100%;margin-top:12px;background:${mod.color};color:white;border:none;border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">Next</button>`;
  },

  _di:null,_tc:null,
  _ds(e,el){this._di=el;el.classList.add('dragging');e.dataTransfer.effectAllowed='move';},
  _de(){if(this._di)this._di.classList.remove('dragging');},
  _ts(e,el){this._di=el;this._tc=el.cloneNode(true);this._tc.style.cssText='position:fixed;pointer-events:none;z-index:9999;opacity:.8';document.body.appendChild(this._tc);},
  _tm(e){e.preventDefault();if(!this._tc)return;const t=e.touches[0];this._tc.style.left=(t.clientX-30)+'px';this._tc.style.top=(t.clientY-20)+'px';},
  _te(e){if(this._tc){document.body.removeChild(this._tc);this._tc=null;}const t=e.changedTouches[0];const target=document.elementFromPoint(t.clientX,t.clientY)?.closest('.drag-target');if(target&&this._di){target.appendChild(this._di);target.classList.remove('drag-over');}this._di=null;},
  _drop(e,target){e.preventDefault();target.classList.remove('drag-over');if(this._di)target.appendChild(this._di);},

  _checkDD() {
    if (!this._qs || this._isQuizQuestionResolved()) return;
    const q = this._qs.questions[this._qs.current];
    let correct = 0;
    document.querySelectorAll('.drag-target').forEach(target=>{
      const tn = target.dataset.target;
      target.querySelectorAll('.drag-item').forEach(item=>{
        const ok = q.answers[item.dataset.item]===tn;
        target.classList.add(ok?'correct-drop':'wrong-drop');
        if(ok) correct++;
      });
    });
    const isC = correct===q.items.length;
    const fb=document.getElementById('quiz-feedback'),fh=document.getElementById('feedback-header'),ft=document.getElementById('feedback-text');
    if(fb){fb.style.display='block';fb.style.borderLeft=`4px solid ${isC?'var(--emerald)':'var(--rose)'}`;}
    if(fh)fh.innerHTML=isC?`<span style="color:#10B981;font-family:var(--font-display);font-weight:800">Perfect! +${q.xp||20} XP</span>`:`<span style="color:#EF4444;font-family:var(--font-display);font-weight:800">${correct}/${q.items.length} correct</span>`;
    if(ft)ft.textContent=q.explanation||'';
    const checkBtn = document.getElementById('quiz-check-btn');
    if (checkBtn) checkBtn.disabled = true;
    document.getElementById('quiz-next-btn').style.display='block';
    this._markQuizQuestionResolved(!isC, q.id);
    if(isC){this._qs.score++;GameEngine.addXP(q.xp||20);}
  },

  _nextQ() {
    if (!this._qs) return;
    this._qs.current++;
    // Persist current position so a refresh can offer resume
    GameEngine.saveQuizProgress({
      moduleId: this._qs.mod.id,
      current: this._qs.current,
      score: this._qs.score,
      wrongIds: this._qs.wrongIds.slice(),
      answered: this._qs.answered,
      resolved: Object.assign({}, this._qs.resolved)
    });
    this._renderQ();
  },

  _showResults() {
    if (!this._qs) return;
    this._stopTimer();
    GameEngine.clearQuizProgress();
    const qs = this._qs;
    this._qs = null;
    const {mod, questions, score} = qs;
    const pct = Math.round((score/questions.length)*100);
    const passed = pct >= 70;
    if (window.Analytics) Analytics.track('Quiz Completed', { module: mod.title, score: pct, passed });
    const mastery = pct >= 95 ? 'Mastery' : pct >= 85 ? 'Strong' : passed ? 'Passed' : 'Needs Review';
    const reviewCount = qs.wrongIds.length;
    const nextStep = passed ? GameEngine.getRecommendedNextStep({ excludeModuleId: mod.id }) : {
      title: `Review ${mod.title}`,
      subtitle: `${reviewCount} missed ${reviewCount === 1 ? 'question' : 'questions'} were added to your review queue.`,
      screen: 'lesson',
      params: { moduleId: mod.id },
      actionLabel: 'Review lesson'
    };
    GameEngine.completeQuiz(mod.id, pct, qs.wrongIds);
    const newWeakConcepts = reviewCount > 0 ? GameEngine.getConceptWeaknesses().filter(w =>
      qs.wrongIds.some(qId => { const q=(mod.quiz||[]).find(q=>q.id===qId); return q&&q.concept===w.concept; })
    ) : [];
    GameEngine.recordStudyTarget({
      type: 'lesson',
      moduleId: mod.id,
      sectionIdx: GameEngine.getModuleProgress(mod.id).lastSectionIdx || 0,
      sectionId: mod.sections[GameEngine.getModuleProgress(mod.id).lastSectionIdx || 0]?.id
    });
    document.getElementById('quiz-content').innerHTML = `
      <div style="min-height:calc(100vh - 160px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px">
        <div class="result-icon" style="font-size:72px;margin-bottom:16px">${pct===100?'🏆':passed?'🎉':'📚'}</div>
        <h1 style="font-family:var(--font-display);font-size:28px;font-weight:900;color:var(--navy);margin:0 0 8px">${pct===100?'Perfect!':passed?'Passed!':'Keep Practicing'}</h1>
        <div style="font-size:16px;color:#64748B;margin-bottom:10px">${mod.title}</div>
        <div style="display:inline-flex;align-items:center;gap:6px;background:${passed?'#ECFDF5':'#FFF7ED'};color:${passed?'#065F46':'#92400E'};border-radius:999px;padding:6px 12px;font-size:12px;font-weight:800;margin-bottom:18px">${mastery}</div>
        <div style="position:relative;width:140px;height:140px;margin:0 auto 28px">
          <svg width="140" height="140" style="transform:rotate(-90deg)">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#E2E8F0" stroke-width="12"/>
            <circle cx="70" cy="70" r="60" fill="none" stroke="${passed?'#10B981':'#F59E0B'}" stroke-width="12"
              stroke-dasharray="${2*Math.PI*60}" stroke-dashoffset="${2*Math.PI*60*(1-pct/100)}" stroke-linecap="round"/>
          </svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-family:var(--font-display);font-size:38px;font-weight:900;color:${passed?'#10B981':'#F59E0B'}">${pct}%</div>
            <div style="font-size:12px;color:#94A3B8;font-weight:700">${score}/${questions.length}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;width:100%;margin-bottom:28px">
          ${[[passed?'PASS':'REVIEW',passed?'Passed':'Need 70%','Result'],['MISSED',`${reviewCount}`,'Questions'],['XP',`+${passed?mod.xpReward:Math.round(pct/2)}`,'XP']].map(([i,v,l])=>`<div class="card" style="padding:14px"><div style="font-size:22px">${i}</div><div style="font-size:18px;font-weight:900;font-family:var(--font-display);color:var(--navy)">${v}</div><div style="font-size:11px;color:#94A3B8;font-weight:700">${l}</div></div>`).join('')}
        </div>
        <div class="card" style="width:100%;padding:16px;text-align:left;margin-bottom:18px">
          <div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase;margin-bottom:6px">What To Do Next</div>
          <div style="font-family:var(--font-display);font-weight:800;font-size:16px;color:var(--navy);margin-bottom:4px">${nextStep.title}</div>
          <div style="font-size:13px;color:#64748B;line-height:1.6">${nextStep.subtitle}</div>
          ${reviewCount ? `<div style="margin-top:10px;background:#F8FAFC;border-radius:12px;padding:10px 12px;font-size:12px;color:#475569">${reviewCount} missed ${reviewCount === 1 ? 'question is' : 'questions are'} now in your review queue.</div>` : ''}
          ${newWeakConcepts.length > 0 ? `<div style="margin-top:8px;background:#EEF2FF;border-radius:12px;padding:8px 12px;font-size:12px;color:#4338CA;font-weight:600">Weak area flagged: ${newWeakConcepts.map(w=>w.label).join(', ')} — see Concept Weaknesses in your logbook.</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;width:100%">
          <button onclick="Router.navigate('${nextStep.screen}'${Screens._inlineParams(nextStep.params)})" style="width:100%;background:${mod.color};color:white;border:none;border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">${nextStep.actionLabel}</button>
          ${!passed?`<button onclick="Router.navigate('quiz',{moduleId:'${mod.id}'})" style="width:100%;background:${mod.color};color:white;border:none;border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">Retry</button>`:''}
          <button onclick="window.Router&&Router.navigate('dashboard')" style="width:100%;background:${passed?mod.color:'white'};color:${passed?'white':'#64748B'};border:${passed?'none':'2px solid #E2E8F0'};border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer">Back to Home</button>
        </div>
      </div>`;
  },

  // ===== LOGBOOK =====
  logbook() {
    const s = GameEngine.state;
    const srQs = s.spacedRepetition.map(qId=>{
      // Module quiz questions
      for(const mod of MODULES){const q=(mod.quiz||[]).find(qq=>qq.id===qId);if(q)return{...q,moduleName:mod.title,modId:mod.id,modColor:mod.color};}
      // Daily challenge questions (dc_ prefix)
      if(qId.startsWith('dc_')){
        const dc=DAILY_CHALLENGES.find(c=>c.id===qId);
        if(dc){
          const mod=MODULES.find(m=>m.id===dc.moduleId)||{title:'Daily Challenge',color:'#F59E0B'};
          return{id:dc.id,question:dc.q,options:dc.opts,correct:dc.correct,explanation:`Refer to ${dc.ref}`,moduleName:mod.title,modId:dc.moduleId||'',modColor:mod.color};
        }
      }
      return null;
    }).filter(Boolean);

    const levelStats = LEVEL_META.map(l => ({
      ...l,
      done: MODULES.filter(m => m.level === l.id && s.modulesPassed.includes(m.id)).length,
      total: MODULES.filter(m => m.level === l.id).length,
      xp: MODULES.filter(m => m.level === l.id && s.modulesPassed.includes(m.id)).reduce((sum, m) => sum + m.xpReward, 0)
    }));

    const weaknesses = GameEngine.getConceptWeaknesses();

    document.getElementById('logbook-content').innerHTML = `
      <h1 style="font-family:var(--font-display);font-size:26px;font-weight:900;color:var(--navy);margin-bottom:4px">Knowledge Logbook</h1>
      <p style="color:#64748B;font-size:14px;margin-bottom:20px">All 4 levels - ${MODULES.length} total modules</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        ${[
          ['Total XP',s.totalXP.toLocaleString()+' XP',GameEngine.getRank().title],
          ['Streak',s.streakDays+' days',s.lastStudyDate?'Last: '+new Date(s.lastStudyDate).toLocaleDateString():'Not started'],
          ['Sections',s.totalSectionsRead,'sections read'],
          ['Review Queue',srQs.length,'questions due']
        ].map(([t,v,sub])=>`<div class="card" style="padding:16px"><div style="font-size:13px;font-weight:700;color:#94A3B8;margin-bottom:4px">${t}</div><div style="font-size:22px;font-weight:900;font-family:var(--font-display);color:var(--navy)">${v}</div><div style="font-size:12px;color:#64748B">${sub}</div></div>`).join('')}
      </div>

      ${weaknesses.length > 0 ? `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <h2 style="font-size:18px;font-weight:800;color:var(--navy);margin:0">Concept Weaknesses</h2>
        <span style="background:#FEE2E2;color:#DC2626;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:700">${weaknesses.length} area${weaknesses.length!==1?'s':''}</span>
      </div>
      <div style="display:grid;gap:8px;margin-bottom:24px">
        ${weaknesses.slice(0,5).map(w=>`<div class="card" style="padding:12px 16px;display:flex;align-items:center;gap:12px">
          <div style="flex:1">
            <div style="font-family:var(--font-display);font-weight:800;color:var(--navy);font-size:15px">${w.label}</div>
            <div style="font-size:12px;color:#94A3B8;margin-top:2px">${w.wrongCount} missed question${w.wrongCount!==1?'s':''} in this area</div>
          </div>
          <span style="background:#FEE2E2;color:#DC2626;border-radius:10px;padding:3px 10px;font-size:12px;font-weight:700;flex-shrink:0">${w.wrongCount} wrong</span>
        </div>`).join('')}
      </div>` : ''}

      <h2 style="font-size:18px;font-weight:800;color:var(--navy);margin:0 0 12px">Progress by Level</h2>
      <div style="display:grid;gap:10px;margin-bottom:24px">
        ${levelStats.map(l => `<div class="card" style="padding:14px;border-left:4px solid ${l.color}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy)">${l.icon} ${l.title}</div>
            <div style="font-family:var(--font-mono);font-size:13px;color:${l.color}">${l.done}/${l.total} - +${l.xp} XP</div>
          </div>
          <div class="xp-bar-track" style="height:6px"><div class="xp-bar-fill" style="height:6px;width:${l.total ? Math.round(l.done/l.total*100) : 0}%;background:${l.color}"></div></div>
        </div>`).join('')}
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <h2 style="font-size:18px;font-weight:800;color:var(--navy);margin:0">Review Queue</h2>
        <span style="background:#FEF3C7;color:#D97706;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:700">${srQs.length} due</span>
      </div>
      ${srQs.length===0 ? `<div class="card" style="padding:24px;text-align:center"><div style="font-size:36px;margin-bottom:8px">✅</div><div style="font-family:var(--font-display);font-weight:800;font-size:16px;color:var(--navy)">Review queue empty!</div><div style="font-size:14px;color:#64748B;margin-top:4px">Keep studying - missed answers will appear here for spaced repetition.</div></div>`
      : `<div style="display:grid;gap:10px">${srQs.slice(0,5).map(q=>{
          const conceptLabel = q.concept ? (GameEngine.CONCEPT_LABELS[q.concept]||q.concept) : null;
          return `<div class="card" style="padding:16px;border-left:4px solid ${q.modColor}">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:6px">
            <span style="font-size:11px;color:${q.modColor};font-weight:800;font-family:var(--font-display)">${q.moduleName}</span>
            ${conceptLabel ? `<span style="background:#EEF2FF;color:#6366F1;border-radius:8px;padding:1px 7px;font-size:10px;font-weight:700">${conceptLabel}</span>` : ''}
          </div>
          <div style="font-size:14px;color:var(--navy);font-weight:600;margin-bottom:10px">${q.question}</div>
          <button onclick="Screens._srR('${q.id}','${q.modId}',this)" style="background:${q.modColor};color:white;border:none;border-radius:10px;padding:8px 16px;font-family:var(--font-display);font-weight:700;font-size:13px;cursor:pointer">Review</button>
        </div>`;}).join('')}${srQs.length>5?`<div style="text-align:center;padding:12px;color:#94A3B8">...and ${srQs.length-5} more</div>`:''}</div>`}
      <div style="margin-top:24px;text-align:center">
        <button onclick="if(confirm('Reset ALL Aviation Weather Academy progress?')){localStorage.removeItem('aviation_weather_v1');localStorage.removeItem('charlotte_aviation_v1');GameEngine.init();Router.navigate('dashboard')}" style="background:none;border:none;color:#CBD5E1;font-size:13px;cursor:pointer">Reset All Progress</button>
      </div>`;
  },

  _srR(qId, modId, btn) {
    const mod = MODULES.find(m=>m.id===modId);
    // Resolve question from module quiz or daily challenges
    let q = mod?.quiz?.find(qq=>qq.id===qId);
    if(!q && qId.startsWith('dc_')){
      const dc=DAILY_CHALLENGES.find(c=>c.id===qId);
      if(dc) q={id:dc.id,question:dc.q,options:dc.opts,correct:dc.correct,explanation:`Refer to ${dc.ref}`};
    }
    if(!q)return;
    const opts = q.options||q.opts||[];
    btn.closest('.card').innerHTML = `<div style="font-size:11px;color:${mod.color};font-weight:800;font-family:var(--font-display);margin-bottom:8px">REVIEW - ${mod.title}</div>
    <div style="font-size:15px;color:var(--navy);font-weight:700;margin-bottom:12px">${q.question}</div>
    ${opts.map((o,i)=>`<button class="quiz-option" style="padding:10px 14px;margin-bottom:6px;font-size:14px" onclick="this.classList.add(${i===q.correct?'true':'false'}?'correct':'wrong');Array.from(this.closest('.card').querySelectorAll('.quiz-option')).forEach((b,j)=>{b.classList.add('disabled');if(j===${q.correct})b.classList.add('correct')});GameEngine.state.spacedRepetition=GameEngine.state.spacedRepetition.filter(id=>id!=='${qId}');GameEngine.state.totalReviews++;GameEngine.save()"><span class="quiz-option-letter">${'ABCD'[i]}</span>${o}</button>`).join('')}
    <div style="font-size:13px;color:#475569;margin-top:10px;padding-top:10px;border-top:1px solid #F1F5F9">${q.explanation||''}</div>`;
  },

  // ===== MORE HUB =====
  more() {
    const s = GameEngine.state;
    const seen = new Set();
    const uniqueAch = ACHIEVEMENTS.filter(a=>{ if(seen.has(a.id))return false; seen.add(a.id); return true; });
    const achEarned = s.achievements.length;
    const achTotal = uniqueAch.length;
    const casesCompleted = (s.caseStudiesCompleted||[]).length;
    const casesTotal = typeof CASE_STUDIES !== 'undefined' ? CASE_STUDIES.length : 15;
    const bestCR = s.checkrideScores && s.checkrideScores.length
      ? Math.max(...s.checkrideScores.map(r=>r.pct||0)) : null;

    document.getElementById('more-content').innerHTML = `
      <div style="padding:4px 0 100px">
        <h1 style="font-family:var(--font-display);font-size:26px;font-weight:900;color:var(--navy);margin-bottom:4px">More</h1>
        <p style="color:#64748B;font-size:14px;margin-bottom:24px">Tools, records, and extra study material</p>

        <div style="display:grid;gap:14px">

          <!-- Achievements card -->
          <div class="card" style="padding:0;overflow:hidden;cursor:pointer" onclick="Router.navigate('achievements')" role="button" tabindex="0" aria-label="Open Achievements" onkeydown="if(event.key==='Enter'||event.key===' ')Router.navigate('achievements')">
            <div style="display:flex;align-items:center;gap:16px;padding:18px">
              <div style="width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#FEF3C7,#FCD34D);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">A</div>
              <div style="flex:1;min-width:0">
                <div style="font-family:var(--font-display);font-weight:800;font-size:17px;color:var(--navy)">Achievements</div>
                <div style="font-size:13px;color:#64748B;margin-top:2px">${achEarned} of ${achTotal} badges earned</div>
                <div class="xp-bar-track" style="height:6px;margin-top:8px">
                  <div class="xp-bar-fill" style="height:6px;width:${achTotal?Math.round(achEarned/achTotal*100):0}%"></div>
                </div>
              </div>
              <div style="color:#CBD5E1;font-size:20px;flex-shrink:0">&gt;</div>
            </div>
          </div>

          <!-- Live Weather card -->
          <div class="card" style="padding:0;overflow:hidden;cursor:pointer" onclick="Router.navigate('metar_live')" role="button" tabindex="0" aria-label="Open Live Weather" onkeydown="if(event.key==='Enter'||event.key===' ')Router.navigate('metar_live')">
            <div style="display:flex;align-items:center;gap:16px;padding:18px">
              <div style="width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#DBEAFE,#93C5FD);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">WX</div>
              <div style="flex:1;min-width:0">
                <div style="font-family:var(--font-display);font-weight:800;font-size:17px;color:var(--navy)">Live Weather</div>
                <div style="font-size:13px;color:#64748B;margin-top:2px">METAR study guide and category review</div>
                <div style="font-size:11px;color:#94A3B8;margin-top:4px">Open a stable study-only weather reference</div>
              </div>
              <div style="color:#CBD5E1;font-size:20px;flex-shrink:0">&gt;</div>
            </div>
          </div>

          <!-- Case Studies card -->
          <div class="card" style="padding:0;overflow:hidden;cursor:pointer" onclick="Router.navigate('case_studies')" role="button" tabindex="0" aria-label="Open Case Studies" onkeydown="if(event.key==='Enter'||event.key===' ')Router.navigate('case_studies')">
            <div style="display:flex;align-items:center;gap:16px;padding:18px">
              <div style="width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#FFE4E6,#FCA5A5);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">CS</div>
              <div style="flex:1;min-width:0">
                <div style="font-family:var(--font-display);font-weight:800;font-size:17px;color:var(--navy)">Case Studies</div>
                <div style="font-size:13px;color:#64748B;margin-top:2px">${casesCompleted} of ${casesTotal} completed</div>
                <div class="xp-bar-track" style="height:6px;margin-top:8px">
                  <div class="xp-bar-fill" style="height:6px;width:${Math.round(casesCompleted/casesTotal*100)}%;background:var(--coral)"></div>
                </div>
              </div>
              <div style="color:#CBD5E1;font-size:20px;flex-shrink:0">&gt;</div>
            </div>
          </div>

          <!-- Checkride stats (informational) -->
          <div class="card" style="padding:18px">
            <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy);margin-bottom:12px">Checkride History</div>
            ${s.checkrideScores && s.checkrideScores.length ? `
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">
                <div style="text-align:center">
                  <div style="font-family:var(--font-mono);font-size:22px;font-weight:700;color:var(--navy)">${s.checkrideScores.length}</div>
                  <div style="font-size:10px;color:#94A3B8;font-weight:700">ATTEMPTS</div>
                </div>
                <div style="text-align:center">
                  <div style="font-family:var(--font-mono);font-size:22px;font-weight:700;color:#10B981">${s.checkrideScores.filter(r=>(r.passed ?? ((r.pct||0) >= 70))).length}</div>
                  <div style="font-size:10px;color:#94A3B8;font-weight:700">PASSED</div>
                </div>
                <div style="text-align:center">
                  <div style="font-family:var(--font-mono);font-size:22px;font-weight:700;color:var(--sky)">${bestCR}%</div>
                  <div style="font-size:10px;color:#94A3B8;font-weight:700">BEST</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:6px">
                ${s.checkrideScores.slice(-5).reverse().map((r,i)=>`
                  <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:${(r.passed ?? ((r.pct||0) >= 70))?'#F0FDF4':'#FFF1F2'};border-radius:10px">
                    <span style="font-size:14px">${(r.passed ?? ((r.pct||0) >= 70))?'✅':'❌'}</span>
                    <span style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:${(r.passed ?? ((r.pct||0) >= 70))?'#10B981':'#EF4444'}">${r.pct}%</span>
                    <span style="font-size:11px;color:#94A3B8;margin-left:auto">${(r.passed ?? ((r.pct||0) >= 70))?'Pass':'Fail'} - ${r.total||'?'} Qs</span>
                  </div>`).join('')}
              </div>
            ` : `<div style="text-align:center;padding:20px 0;color:#94A3B8;font-size:14px">No checkride attempts yet.<br><span style="font-size:12px">Complete at least one module to unlock the exam.</span></div>`}
            <button onclick="Router.navigate('checkride')" style="margin-top:14px;width:100%;background:var(--navy);color:white;border:none;border-radius:14px;padding:12px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">Go to Checkride</button>
          </div>

        </div>
      </div>`;
  },

  // ===== ACHIEVEMENTS =====
  achievements() {
    const s = GameEngine.state;
    // Deduplicate achievements by id
    const seen = new Set();
    const uniqueAch = ACHIEVEMENTS.filter(a=>{ if(seen.has(a.id))return false; seen.add(a.id); return true; });

    document.getElementById('achievements-content').innerHTML = `
      <h1 style="font-family:var(--font-display);font-size:26px;font-weight:900;color:var(--navy);margin-bottom:4px">Achievements</h1>
      <p style="color:#64748B;font-size:14px;margin-bottom:20px">${s.achievements.length}/${uniqueAch.length} earned</p>
      <div class="card" style="padding:16px;margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="font-family:var(--font-display);font-weight:700;font-size:14px;color:var(--navy)">Overall Progress</span>
          <span style="font-family:var(--font-mono);font-size:13px;color:#94A3B8">${Math.round(s.achievements.length/uniqueAch.length*100)}%</span>
        </div>
        <div class="xp-bar-track" style="height:10px"><div class="xp-bar-fill" style="height:10px;width:${Math.round(s.achievements.length/uniqueAch.length*100)}%"></div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${uniqueAch.map(a=>{const earned=s.achievements.includes(a.id);return `<div class="card" style="padding:16px;text-align:center;border:2px solid ${earned?a.color:'#F1F5F9'};opacity:${earned?1:.6}">
          <div class="badge ${earned?'':'badge-locked'}" style="background:${a.bg};margin:0 auto 10px"><span>${a.emoji}</span></div>
          <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:${earned?a.color:'#94A3B8'}">${a.title}</div>
          <div style="font-size:12px;color:#94A3B8;margin-top:4px;line-height:1.4">${a.desc}</div>
          ${earned?`<div style="margin-top:8px;font-size:11px;font-weight:800;color:${a.color};text-transform:uppercase">Earned</div>`:''}
        </div>`;}).join('')}
      </div>`;
  },

  // ============================================================
  // LIVE METAR SCREEN
  // ============================================================
  metar_live() {
    document.getElementById('metar_live-content').innerHTML = `
      <div style="padding:20px 16px 100px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
          <button onclick="Router.navigate('more')" aria-label="Back to More" style="background:#F1F5F9;border:none;border-radius:12px;padding:8px 14px;cursor:pointer;font-family:var(--font-display);font-weight:700;color:#64748B">Back</button>
          <div>
            <h1 style="font-family:var(--font-display);font-weight:900;font-size:22px;color:var(--navy);margin:0">Live Weather</h1>
            <p style="font-size:12px;color:#64748B;margin:2px 0 0">METAR study help and category review</p>
          </div>
        </div>
        <div class="card" style="padding:18px;margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:900;font-size:16px;color:var(--navy);margin-bottom:8px">Live weather temporarily unavailable</div>
          <div style="font-size:13px;color:#64748B;line-height:1.6;margin-bottom:14px">We have paused live airport pulls while the weather feed is being cleaned up. You can still review METAR categories and jump into the decoder lesson below.</div>
          <button onclick="Router.navigate('lesson',{moduleId:'m11'})" style="background:var(--navy);color:white;border:none;border-radius:12px;padding:10px 16px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">Open M11 METAR Practice</button>
        </div>
        <div class="card" style="padding:18px;margin-bottom:16px">
          <div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase;margin-bottom:8px">Flight Categories</div>
          <div style="display:grid;gap:10px">
            ${[
              ['VFR', '#10B981', 'Ceiling above 3,000 ft and visibility above 5 SM'],
              ['MVFR', '#3B82F6', 'Ceiling 1,000-3,000 ft or visibility 3-5 SM'],
              ['IFR', '#EF4444', 'Ceiling 500-1,000 ft or visibility 1-3 SM'],
              ['LIFR', '#7C3AED', 'Ceiling below 500 ft or visibility below 1 SM']
            ].map(([cat, color, detail]) => `
              <div style="background:#F8FAFC;border-radius:14px;padding:12px 14px;display:flex;align-items:flex-start;gap:10px">
                <span style="min-width:52px;background:${color};color:white;border-radius:999px;padding:4px 10px;font-size:11px;font-weight:800;text-align:center">${cat}</span>
                <div style="font-size:12px;color:#475569;line-height:1.5">${detail}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card" style="padding:18px">
          <div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase;margin-bottom:8px">Study Flow</div>
          <div style="display:grid;gap:8px;font-size:13px;color:#475569;line-height:1.6">
            <div>1. Read wind first.</div>
            <div>2. Check visibility and any obscurations.</div>
            <div>3. Find the lowest broken, overcast, or vertical visibility layer.</div>
            <div>4. Compare what you see to the category guide above.</div>
          </div>
        </div>
      </div>`;
  },

  // ============================================================
  // CHECKRIDE PREP
  // ============================================================
  checkride() {
    const s = GameEngine.state;
    const checkrideHistory = s.checkrideScores || [];
    const bestScore = checkrideHistory.length ? Math.max(...checkrideHistory.map(r=>r.pct)) : null;

    document.getElementById('checkride-content').innerHTML = `
      <div style="padding:20px 16px 100px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
          <button onclick="Router.navigate('dashboard')" aria-label="Back to Home" style="background:#F1F5F9;border:none;border-radius:12px;padding:8px 14px;cursor:pointer;font-family:var(--font-display);font-weight:700;color:#64748B">Back</button>
          <div>
            <h1 style="font-family:var(--font-display);font-weight:900;font-size:22px;color:var(--navy);margin:0">Checkride Prep</h1>
            <div style="font-size:12px;color:#64748B">FAA Knowledge Test simulation</div>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#0C1B33,#1E3A5F);border-radius:24px;padding:24px;color:white;margin-bottom:20px">
          <div style="font-size:36px;margin-bottom:10px">Exam</div>
          <div style="font-family:var(--font-display);font-weight:900;font-size:20px;margin-bottom:6px">Private Pilot Weather Knowledge</div>
          <div style="font-size:13px;color:#94A3B8;margin-bottom:20px">60 questions - 60 minutes - 70% to pass (42/60)</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px">
            ${[['60','Questions'],['60 min','Time Limit'],['70%','Pass Score']].map(([v,l])=>`<div style="background:rgba(255,255,255,.1);border-radius:12px;padding:12px;text-align:center"><div style="font-family:var(--font-display);font-weight:900;font-size:20px;color:#38BDF8">${v}</div><div style="font-size:10px;color:#64748B">${l}</div></div>`).join('')}
          </div>
          ${bestScore !== null ? `<div style="background:rgba(56,189,248,.15);border-radius:12px;padding:10px;text-align:center;margin-bottom:16px"><span style="font-size:12px;color:#38BDF8;font-weight:700">Best score: </span><span style="font-family:var(--font-mono);font-size:16px;color:${bestScore>=70?'#10B981':'#F59E0B'};font-weight:700">${bestScore}%</span></div>` : ''}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <button onclick="Screens._startCheckride(60)" style="background:#38BDF8;color:var(--navy);border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:900;font-size:15px;cursor:pointer">Full Exam</button>
            <button onclick="Screens._startCheckride(20)" style="background:rgba(255,255,255,.1);color:white;border:2px solid rgba(255,255,255,.2);border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:900;font-size:15px;cursor:pointer">Quick 20Q</button>
          </div>
        </div>
        <div style="background:white;border-radius:20px;padding:18px;box-shadow:0 2px 12px rgba(0,0,0,.07)">
          <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy);margin-bottom:14px">Readiness by Topic</div>
          ${MODULES.map(m=>{
            const prog = s.moduleProgress[m.id];
            const pct = prog?.score||0;
            const col = pct>=80?'#10B981':pct>=60?'#F59E0B':pct>0?'#EF4444':'#E2E8F0';
            const label = pct>=80?'Ready':pct>=60?'Review':pct>0?'Needs Work':'Not started';
            return `<div style="margin-bottom:10px">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;font-weight:700;color:var(--navy);font-family:var(--font-display)">${m.icon} ${m.title}</span>
                <span style="font-size:11px;font-weight:800;color:${col};font-family:var(--font-display)">${pct?pct+'%':label}</span>
              </div>
              <div style="background:#F1F5F9;border-radius:6px;height:5px"><div style="background:${col};height:5px;border-radius:6px;width:${pct}%;transition:width .4s"></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  _startCheckride(count) {
    const nQ = count || 60;
    // Pool questions by learner level. Mix favors foundation-heavy: 35% Student,
    // 30% Private, 25% Instrument, 10% Commercial+. Caps at the user's reach so
    // a Student doesn't get blindsided by space-weather questions on a 20Q quick exam —
    // Commercial questions only enter when the user has progressed past Instrument.
    const pool = { student:[], private:[], instrument:[], commercial:[] };
    MODULES.forEach(m => {
      const key = m.level || 'student';
      if (!pool[key]) pool[key] = [];
      if (m.quiz) pool[key].push(...m.quiz.filter(q => q.type !== 'drag_drop').map(q => ({...q,_mod:m.title,_moduleId:m.id,_color:m.color,_icon:m.icon})));
    });
    const shuf = a => a.sort(() => Math.random() - .5);
    Object.keys(pool).forEach(k => shuf(pool[k]));
    const userOrder = (LEVEL_META.find(l => l.id === GameEngine.getCurrentLevel()) || {}).order || 1;
    // If the user is Student-level, omit Commercial questions; Private-level omits Commercial too;
    // Instrument-level includes everything but at reduced Commercial weight.
    const dist = userOrder >= 3
      ? { student: 0.30, private: 0.30, instrument: 0.30, commercial: 0.10 }
      : userOrder >= 2
      ? { student: 0.40, private: 0.40, instrument: 0.20, commercial: 0.0 }
      : { student: 0.55, private: 0.30, instrument: 0.15, commercial: 0.0 };
    const counts = {};
    let allocated = 0;
    LEVELS.forEach((lvl, i) => {
      counts[lvl] = i === LEVELS.length - 1 ? nQ - allocated : Math.floor(nQ * dist[lvl]);
      allocated += counts[lvl];
    });
    const exam = shuf([
      ...pool.student.slice(0, counts.student),
      ...pool.private.slice(0, counts.private),
      ...pool.instrument.slice(0, counts.instrument),
      ...pool.commercial.slice(0, counts.commercial)
    ]);
    this._cr = { qs: exam, cur: 0, ans: {}, t0: Date.now(), lim: (nQ === 60 ? 60 : 20) * 60000 };
    this._renderCRQ();
  },

  _renderCRQ() {
    const cr = this._cr;
    if (!cr || cr.cur >= cr.qs.length) { this._finishCR(); return; }
    const q = cr.qs[cr.cur];
    const opts = q.options || q.opts || [];
    const answered = cr.ans[cr.cur];
    const rem = Math.max(0, cr.lim - (Date.now()-cr.t0));
    const mm = Math.floor(rem/60000), ss = String(Math.floor((rem%60000)/1000)).padStart(2,'0');
    const pct = Math.round(cr.cur/cr.qs.length*100);

    document.getElementById('checkride-content').innerHTML = `
      <div style="padding:16px 100px 16px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div style="font-size:12px;color:#64748B;font-family:var(--font-mono)">${cr.cur+1}/${cr.qs.length}</div>
          <div id="cr-timer" style="background:${rem<600000?'#FEF2F2':'#F8FAFC'};border-radius:20px;padding:6px 14px;font-family:var(--font-mono);font-size:14px;font-weight:700;color:${rem<600000?'#EF4444':'var(--navy)'}">${mm}:${ss}</div>
          <button onclick="if(confirm('Exit exam?'))Screens._exitCheckride()" style="background:#F1F5F9;border:none;border-radius:10px;padding:6px 12px;font-size:12px;cursor:pointer;color:#64748B;font-family:var(--font-display)">Exit</button>
        </div>
        <div style="background:#F1F5F9;border-radius:8px;height:5px;margin-bottom:20px">
          <div style="background:var(--sky);height:5px;border-radius:8px;width:${pct}%;transition:width .3s"></div>
        </div>
        <div style="background:white;border-radius:20px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px">
          <div style="display:inline-flex;align-items:center;gap:6px;background:${q._color}15;border-radius:20px;padding:4px 12px;margin-bottom:14px">
            <span style="font-size:12px">${q._icon||''}</span>
            <span style="font-size:11px;font-weight:700;color:${q._color};font-family:var(--font-display)">${q._mod||''}</span>
          </div>
          ${q.scenario ? `<div style="background:#F0F9FF;border-radius:12px;padding:12px;margin-bottom:14px;font-size:13px;color:#0369A1;line-height:1.6;border-left:3px solid #38BDF8">${q.scenario}</div>` : ''}
          <p style="font-size:15px;font-weight:700;color:var(--navy);font-family:var(--font-display);line-height:1.5;margin:0 0 16px">${q.question}</p>
          <div style="display:grid;gap:10px">
            ${opts.map((o,i)=>{
              let bg='white',col='var(--navy)',brd='#E2E8F0';
              if(answered!==undefined){
                if(i===q.correct){bg='#D1FAE5';col='#065F46';brd='#10B981';}
                else if(i===answered&&answered!==q.correct){bg='#FEF2F2';col='#991B1B';brd='#EF4444';}
              }
              return `<button onclick="Screens._answerCR(${i})" ${answered!==undefined?'disabled':''} style="background:${bg};border:2px solid ${brd};border-radius:14px;padding:14px;text-align:left;font-family:var(--font-display);font-weight:700;font-size:14px;color:${col};cursor:${answered!==undefined?'default':'pointer'}">${'ABCD'[i]}. ${o}</button>`;
            }).join('')}
          </div>
          ${answered!==undefined ? Screens._crFeedback(answered,q.correct,q.explanation) : ''}
        </div>
        ${answered!==undefined ? `<button onclick="Screens._nextCRQ()" style="width:100%;background:var(--navy);color:white;border:none;border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:900;font-size:15px;cursor:pointer">${cr.cur+1>=cr.qs.length?'See Results':'Next'}</button>` : ''}
      </div>`;

    this._stopCRTimer();
    this._crTick = setInterval(() => {
      const el = document.getElementById('cr-timer');
      if (!el) { this._stopCRTimer(); return; }
      const r2 = Math.max(0, cr.lim-(Date.now()-cr.t0));
      if (r2<=0) { this._stopCRTimer(); this._finishCR(); return; }
      const m2=Math.floor(r2/60000), s2=String(Math.floor((r2%60000)/1000)).padStart(2,'0');
      el.textContent = m2+':'+s2;
      el.style.color = r2<600000?'#EF4444':'var(--navy)';
    }, 1000);
  },

  _answerCR(i) {
    const cr = this._cr;
    if (!cr || cr.ans[cr.cur]!==undefined) return;
    cr.ans[cr.cur] = i;
    this._renderCRQ();
  },

  _nextCRQ() {
    this._stopCRTimer();
    const cr = this._cr;
    cr.cur++;
    if (cr.cur >= cr.qs.length) this._finishCR();
    else this._renderCRQ();
  },


  _crFeedback(answered, correct, explanation) {
    const ok = answered === correct;
    const borderColor = ok ? '#10B981' : '#EF4444';
    const labelColor  = ok ? '#059669' : '#EF4444';
    const label = ok ? 'Correct' : 'Incorrect - Correct: ' + 'ABCD'[correct];
    return '<div style="margin-top:14px;background:#F8FAFC;border-radius:12px;padding:14px;border-left:3px solid '+borderColor+'">' +
           '<div style="font-size:12px;font-weight:800;color:'+labelColor+';font-family:var(--font-display);margin-bottom:4px">'+label+'</div>' +
           '<div style="font-size:12px;color:#475569;line-height:1.6">'+(explanation||'')+'</div></div>';
  },
  _finishCR() {
    this._stopCRTimer();
    const cr = this._cr;
    if (!cr) return;
    this._cr = null;
    const {qs, ans, t0} = cr;
    const elapsed = Math.round((Date.now()-t0)/1000);
    const mm=Math.floor(elapsed/60), ss=elapsed%60;
    let correct=0;
    const byMod = {};
    const byModuleId = {};
    qs.forEach((q,i)=>{
      const ok = ans[i]===q.correct;
      if(ok) correct++;
      if(!byMod[q._mod]) byMod[q._mod]={correct:0,total:0,color:q._color};
      byMod[q._mod].total++;
      if(ok) byMod[q._mod].correct++;
      if (q._moduleId) {
        if (!byModuleId[q._moduleId]) byModuleId[q._moduleId] = { correct: 0, total: 0, pct: 0 };
        byModuleId[q._moduleId].total++;
        if (ok) byModuleId[q._moduleId].correct++;
      }
    });
    const pct = Math.round(correct/qs.length*100);
    const passed = pct>=70;
    if (window.Analytics) Analytics.track('Checkride Completed', { score: pct, passed });
    Object.values(byModuleId).forEach(item => {
      item.pct = Math.round((item.correct / item.total) * 100);
    });
    if(!GameEngine.state.checkrideScores) GameEngine.state.checkrideScores=[];
    GameEngine.state.checkrideScores.push({date:new Date().toISOString(),pct,correct,total:qs.length,passed});
    GameEngine.recordCheckrideTopics(byModuleId);
    const followUp = passed
      ? GameEngine.getRecommendedNextStep()
      : GameEngine.getWeakAreas(1)[0] || GameEngine.getRecommendedNextStep();
    if(passed && pct>=(GameEngine.state.checkrideScores.slice(-2)[0]?.pct||0)) {
      GameEngine.addXP(passed?200:50);
    }
    GameEngine.save();

    const wrongQs = qs.map((q, i) => ({ q, userAns: ans[i] })).filter(({ q, userAns }) => userAns !== q.correct);

    document.getElementById('checkride-content').innerHTML = `
      <div style="padding:20px 16px 100px">
        <div style="background:linear-gradient(135deg,${passed?'#065F46, #10B981':'#7F1D1D, #EF4444'});border-radius:24px;padding:28px;color:white;text-align:center;margin-bottom:20px">
          <div style="font-size:52px;margin-bottom:10px">${passed?'PASS':'REVIEW'}</div>
          <div style="font-family:var(--font-display);font-weight:900;font-size:32px;margin-bottom:4px">${pct}%</div>
          <div style="font-size:16px;font-weight:700;opacity:.9;margin-bottom:20px">${passed?'PASSED - Ready for the Written!':'NOT YET - Review Weak Areas'}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            ${[['OK',correct+'/'+qs.length,'Correct'],['TIME',mm+'m '+ss+'s','Time'],['SCORE',pct+'%','Score']].map(([i,v,l])=>`<div style="background:rgba(255,255,255,.15);border-radius:12px;padding:12px"><div style="font-size:20px">${i}</div><div style="font-family:var(--font-display);font-weight:900;font-size:16px">${v}</div><div style="font-size:10px;opacity:.7">${l}</div></div>`).join('')}
          </div>
          ${passed ? '<div style="margin-top:16px;background:rgba(255,255,255,.15);border-radius:12px;padding:12px;font-size:13px">+200 XP earned!</div>' : ''}
        </div>
        <div style="background:white;border-radius:20px;padding:18px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px">
          <div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase;margin-bottom:6px">Recommended Next Step</div>
          <div style="font-family:var(--font-display);font-weight:800;font-size:16px;color:var(--navy);margin-bottom:4px">${followUp.title || ('Review ' + (followUp.title || 'modules'))}</div>
          <div style="font-size:13px;color:#64748B;line-height:1.6">${followUp.reasonText || followUp.subtitle || 'Use the weakest topic from this exam as your next review stop.'}</div>
          ${followUp.moduleId ? `<button onclick="Router.navigate('lesson',{moduleId:'${followUp.moduleId}'})" style="margin-top:12px;background:var(--navy);color:white;border:none;border-radius:12px;padding:10px 14px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">${followUp.actionLabel || 'Review lesson'}</button>` : followUp.screen ? `<button onclick="Router.navigate('${followUp.screen}'${Screens._inlineParams(followUp.params)})" style="margin-top:12px;background:var(--navy);color:white;border:none;border-radius:12px;padding:10px 14px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">${followUp.actionLabel || 'Continue'}</button>` : ''}
        </div>
        <div style="background:white;border-radius:20px;padding:18px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy);margin-bottom:14px">Score by Topic</div>
          ${Object.entries(byMod).sort((a,b)=>a[1].correct/a[1].total-b[1].correct/b[1].total).map(([name,d])=>{
            const p=Math.round(d.correct/d.total*100);
            const c=p>=80?'#10B981':p>=60?'#F59E0B':'#EF4444';
            return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:12px;font-weight:700;color:var(--navy);font-family:var(--font-display)">${name}</span><span style="font-size:12px;font-weight:800;color:${c};font-family:var(--font-mono)">${d.correct}/${d.total} (${p}%)</span></div><div style="background:#F1F5F9;border-radius:6px;height:5px"><div style="background:${c};height:5px;border-radius:6px;width:${p}%"></div></div></div>`;
          }).join('')}
        </div>
        ${this._renderCRWrongAnswers(wrongQs)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <button onclick="Screens._startCheckride(60)" style="background:var(--navy);color:white;border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">Retake</button>
          <button onclick="Router.navigate('modules')" style="background:#F1F5F9;color:var(--navy);border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">Study</button>
        </div>
      </div>`;
  },

  _renderCRWrongAnswers(wrongQs) {
    if (!wrongQs.length) {
      return `<div style="background:white;border-radius:20px;padding:18px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px;text-align:center">
        <div style="font-size:28px;margin-bottom:8px">🎯</div>
        <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy);margin-bottom:4px">Perfect score — no questions to review</div>
        <div style="font-size:13px;color:#64748B">You answered every question correctly on this attempt.</div>
      </div>`;
    }

    // Group by module name
    const modGroups = {};
    wrongQs.forEach(({ q, userAns }) => {
      if (!modGroups[q._mod]) modGroups[q._mod] = { color: q._color, items: [] };
      modGroups[q._mod].items.push({ q, userAns });
    });

    const cardsHtml = Object.entries(modGroups).map(([modName, group]) => {
      const itemsHtml = group.items.map(({ q, userAns }) => {
        const userAnswerText = (userAns !== undefined && userAns !== null && q.options[userAns]) ? q.options[userAns] : 'No answer selected';
        const correctAnswerText = q.options[q.correct];
        return `<div style="background:#F8FAFC;border-radius:14px;padding:14px 16px;margin-bottom:10px;border:1.5px solid #E2E8F0">
          <div style="font-size:14px;font-weight:700;color:var(--navy);line-height:1.55;margin-bottom:12px;font-family:var(--font-body)">${q.question}</div>
          <div style="background:#FFF1F2;border-radius:10px;padding:10px 14px;margin-bottom:8px;border-left:3px solid #F43F5E">
            <div style="font-size:10px;font-weight:800;color:#F43F5E;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px;font-family:var(--font-display)">Your answer</div>
            <div style="font-size:13px;font-weight:600;color:#9F1239;font-family:var(--font-body)">${userAnswerText}</div>
          </div>
          <div style="background:#F0FDF4;border-radius:10px;padding:10px 14px;margin-bottom:10px;border-left:3px solid #10B981">
            <div style="font-size:10px;font-weight:800;color:#10B981;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px;font-family:var(--font-display)">Correct answer</div>
            <div style="font-size:13px;font-weight:600;color:#065F46;font-family:var(--font-body)">${correctAnswerText}</div>
          </div>
          <div style="font-size:13px;color:#475569;line-height:1.65;border-top:1px solid #E2E8F0;padding-top:10px;font-family:var(--font-body)">${q.explanation}</div>
        </div>`;
      }).join('');

      const dot = group.color || '#38BDF8';
      return `<div style="margin-bottom:6px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <div style="width:10px;height:10px;border-radius:50%;background:${dot};flex-shrink:0"></div>
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:#64748B;text-transform:uppercase;letter-spacing:.05em">${modName}</div>
          <div style="font-family:var(--font-mono);font-size:11px;color:#94A3B8">${group.items.length} wrong</div>
        </div>
        ${itemsHtml}
      </div>`;
    }).join('');

    return `<div style="background:white;border-radius:20px;padding:18px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:var(--navy)">Review Wrong Answers <span style="font-size:12px;background:#FEE2E2;color:#991B1B;border-radius:8px;padding:2px 8px;font-family:var(--font-mono);font-weight:700;vertical-align:middle">${wrongQs.length}</span></div>
        <button id="cr-review-toggle" onclick="(function(btn){var body=document.getElementById('cr-review-body');var hidden=body.style.display==='none';body.style.display=hidden?'block':'none';btn.textContent=hidden?'Hide review':'Show review';})(this)" style="background:none;border:none;color:var(--sky-dark);font-family:var(--font-display);font-weight:700;font-size:13px;cursor:pointer;padding:4px 0">Hide review</button>
      </div>
      <div id="cr-review-body">
        ${cardsHtml}
      </div>
    </div>`;
  },


  // ============================================================
  // CASE STUDIES SCREENS
  // ============================================================
  case_studies() {
    const s = GameEngine.state;
    const completed = s.caseStudiesCompleted || [];
    const doc = document.getElementById('case_studies-content');
    if(!doc) return;

    if (!this._activeCaseTab) this._activeCaseTab = 'verified';
    const activeTab = this._activeCaseTab;
    const tabCases = CASE_STUDIES.filter(cs => cs.caseType === activeTab);
    const tabCompleted = completed.filter(id => tabCases.some(cs => cs.id === id));

    const tabBtn = (key, label) => `
      <button onclick="Screens._setCaseTab('${key}')"
        style="flex:1;padding:11px 8px;border:none;border-radius:10px;
          background:${activeTab===key?'white':'transparent'};
          font-family:var(--font-display);font-weight:800;font-size:13px;
          color:${activeTab===key?'#0C1B33':'#64748B'};
          box-shadow:${activeTab===key?'0 1px 3px rgba(0,0,0,.08)':'none'};
          cursor:pointer;transition:all 0.15s">
        ${label}
      </button>`;

    const heroGradient = activeTab==='verified' ? '#7F1D1D,#EF4444' : '#92400E,#F59E0B';
    const heroTitle = activeTab==='verified' ? 'Real NTSB-Anchored Cases' : 'Simulated Training Scenarios';
    const heroBlurb = activeTab==='verified'
      ? 'These cases are distilled from actual NTSB final reports. Each links to the official source and teaches a documented hazard angle from a real accident.'
      : 'Pattern-based teaching scenarios designed to build weather judgment. They are not anchored to specific NTSB investigations and are for educational use only.';

    doc.innerHTML = `
      <div style="padding:4px 0 100px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div>
            <h1 style="font-family:var(--font-display);font-weight:900;font-size:22px;color:var(--navy);margin:0">Case Studies</h1>
            <p style="font-size:12px;color:#64748B;margin:3px 0 0">Real weather accidents - learn what went wrong</p>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-mono);font-size:20px;font-weight:700;color:var(--navy)">${tabCompleted.length}/<span style="color:#94A3B8">${tabCases.length}</span></div>
            <div style="font-size:10px;color:#94A3B8">Completed</div>
          </div>
        </div>

        <div style="display:flex;gap:6px;background:#F1F5F9;border-radius:14px;padding:4px;margin-bottom:16px" role="tablist" aria-label="Case study category">
          ${tabBtn('verified', 'Real Cases (NTSB)')}
          ${tabBtn('simulated', 'Simulated Scenarios')}
        </div>

        <div style="background:linear-gradient(135deg,${heroGradient});border-radius:20px;padding:18px;color:white;margin-bottom:20px">
          <div style="font-size:13px;font-weight:700;opacity:.9;margin-bottom:6px">${heroTitle}</div>
          <div style="font-size:12px;opacity:.8;line-height:1.6">${heroBlurb}</div>
        </div>

        <div style="display:grid;gap:12px">
          ${tabCases.map((cs,i) => {
            const done = completed.includes(cs.id);
            const severityColor = cs.severity==='fatal'?'#EF4444':cs.severity==='serious injury'?'#F59E0B':'#10B981';
            return `
            <div style="background:white;border-radius:18px;padding:16px;box-shadow:0 2px 12px rgba(0,0,0,.07);cursor:pointer;border-left:4px solid ${done?'#10B981':cs.color};opacity:${done?.9:1}" role="button" tabindex="0" aria-label="Open case study: ${cs.title}" onclick="Router.navigate('case_detail',{caseId:'${cs.id}'})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();Router.navigate('case_detail',{caseId:'${cs.id}'})}">

              <div style="display:flex;align-items:flex-start;gap:12px">
                <div style="width:48px;height:48px;border-radius:14px;background:${cs.color}15;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${cs.icon}</div>
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                    <div style="font-family:var(--font-display);font-weight:900;font-size:15px;color:var(--navy)">${cs.title}</div>
                    ${done ? '<span style="color:#10B981;font-size:12px;font-weight:800">Done</span>' : ''}
                  </div>
                  <div style="font-size:12px;color:#64748B;margin-bottom:8px">${cs.subtitle}</div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    <span style="background:${cs.color}15;color:${cs.color};font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px">${cs.hazard}</span>
                    <span style="background:${severityColor}15;color:${severityColor};font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px">${cs.severity}</span>
                    <span style="background:#F1F5F9;color:#64748B;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px">${cs.faaRef}</span>
                    ${cs.caseType === 'verified'
                      ? '<span style="background:#D1FAE5;color:#065F46;font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px">NTSB Verified</span>'
                      : '<span style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px">Training Scenario</span>'}
                  </div>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  _setCaseTab(tab) {
    if (tab !== 'verified' && tab !== 'simulated') return;
    this._activeCaseTab = tab;
    this.case_studies();
  },

  // Receives a params object from Screens.render ? extract caseId from it.
  // Router._applyRoute handles screen toggling and nav highlighting before this runs.
  case_detail(params) {
    const caseId = (params && typeof params === 'object') ? params.caseId : params;
    const cs = CASE_STUDIES.find(c=>c.id===caseId);
    if (!cs) return;
    if (window.Analytics) Analytics.track('Case Study Opened', { title: cs.title });
    const doc = document.getElementById('case_detail-content');
    if(!doc) return;
    const probableCauseLabel = cs.ntsbUrl ? 'NTSB PROBABLE CAUSE' : 'TRAINING PROBABLE CAUSE SUMMARY';
    // ntsbSourceType is a typed enum: 'docket' | 'final_report' | 'carol' | 'safety_alert'.
    // Unknown / missing values fall back to the generic "report" label.
    const NTSB_SOURCE_LABELS = {
      docket:        'Open official NTSB docket',
      final_report:  'Read official NTSB report',
      carol:         'Open NTSB CAROL search',
      safety_alert:  'Read NTSB safety alert'
    };
    const ntsbLinkLabel = NTSB_SOURCE_LABELS[cs.ntsbSourceType] || 'Read official NTSB report';
    const scenarioBanner = cs.caseType === 'verified'
      ? ''
      : `<div style="background:#FEF3C7;border-radius:14px;padding:12px 14px;margin-bottom:16px;border-left:4px solid #F59E0B;display:flex;gap:10px;align-items:flex-start">
           <div style="font-size:18px;flex-shrink:0">⚠️</div>
           <div>
             <div style="font-family:var(--font-display);font-weight:800;font-size:12px;color:#92400E;margin-bottom:3px">TRAINING SCENARIO</div>
             <div style="font-size:12px;color:#78350F;line-height:1.5">This case is based on real-world accident patterns and is designed to teach weather judgment. It has not been independently verified against an official NTSB docket. For educational use only.</div>
           </div>
         </div>`;

    doc.innerHTML = `
      <div style="padding:4px 0 100px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <button onclick="Router.navigate('case_studies')" style="background:#F1F5F9;border:none;border-radius:12px;padding:8px 14px;cursor:pointer;font-family:var(--font-display);font-weight:700;color:#64748B">Back to Cases</button>
          <div style="font-size:11px;color:#94A3B8">${cs.category}</div>
        </div>
        ${scenarioBanner}

        <div style="background:linear-gradient(135deg,#0C1B33,${cs.color});border-radius:20px;padding:20px;color:white;margin-bottom:20px">
          <div style="font-size:32px;margin-bottom:10px">${cs.icon}</div>
          <div style="font-family:var(--font-display);font-weight:900;font-size:22px;margin-bottom:6px">${cs.title}</div>
          <div style="font-size:13px;opacity:.8;margin-bottom:14px">${cs.subtitle}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span style="background:rgba(255,255,255,.15);font-size:11px;padding:4px 12px;border-radius:20px;font-weight:700">${cs.aircraft}</span>
            <span style="background:rgba(255,255,255,.15);font-size:11px;padding:4px 12px;border-radius:20px;font-weight:700">${cs.faaRef}</span>
          </div>
        </div>

        <div style="background:#FEF2F2;border-radius:16px;padding:14px;margin-bottom:16px;border-left:4px solid #EF4444">
          <div style="font-family:var(--font-display);font-weight:800;font-size:12px;color:#991B1B;margin-bottom:6px">PILOT & AIRCRAFT</div>
          <div style="font-size:13px;color:#7F1D1D">${cs.pilot}</div>
        </div>

        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.06);margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:var(--navy);margin-bottom:10px">Background</div>
          <div style="font-size:13px;color:#475569;line-height:1.7">${cs.brief}</div>
        </div>

        <div style="margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:var(--navy);margin-bottom:10px">Weather</div>
          ${cs.weather}
        </div>

        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.06);margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:var(--navy);margin-bottom:10px">What Happened</div>
          <div style="font-size:13px;color:#475569;line-height:1.7">${cs.narrative}</div>
        </div>

        <div id="cs-discovery-${cs.id}"></div>

        <div id="cs-analysis-${cs.id}" style="display:none">
          <div style="background:#FEF2F2;border-radius:16px;padding:14px;margin-bottom:16px;border-left:4px solid #EF4444">
            <div style="font-family:var(--font-display);font-weight:800;font-size:12px;color:#991B1B;margin-bottom:6px">${probableCauseLabel}</div>
            <div style="font-size:13px;color:#7F1D1D;line-height:1.6;font-style:italic">${cs.probableCause}</div>
          </div>

          ${cs.ntsbUrl ? `
            <div style="background:#EFF6FF;border-radius:16px;padding:14px;margin-bottom:16px;border-left:4px solid #2563EB">
              <div style="font-family:var(--font-display);font-weight:800;font-size:12px;color:#1D4ED8;margin-bottom:6px">OFFICIAL SOURCE</div>
              <div style="font-size:12px;color:#475569;line-height:1.6;margin-bottom:10px">${cs.ntsbTitle}${cs.ntsbAccidentNumber ? ` - ${cs.ntsbAccidentNumber}` : ''}</div>
              <a href="${cs.ntsbUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;background:#2563EB;color:white;text-decoration:none;border-radius:12px;padding:10px 14px;font-family:var(--font-display);font-weight:800;font-size:13px">${ntsbLinkLabel}</a>
              <div style="font-size:11px;color:#64748B;margin-top:8px">Opens the official NTSB source in a new tab.</div>
            </div>
          ` : ''}

          <div style="background:#D1FAE5;border-radius:16px;padding:16px;margin-bottom:20px">
            <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:#065F46;margin-bottom:10px">Lessons Learned</div>
            <div style="display:grid;gap:8px">
              ${cs.lessons.map((l,i)=>`<div style="display:flex;gap:10px;align-items:flex-start"><span style="background:#10B981;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0;margin-top:1px">${i+1}</span><div style="font-size:13px;color:#065F46;line-height:1.6">${l}</div></div>`).join('')}
            </div>
          </div>
        </div>

        <div style="background:var(--navy);border-radius:16px;padding:16px;margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:#38BDF8;margin-bottom:14px">Knowledge Check - 3 Questions</div>
          <div id="cs-quiz-${cs.id}">
            ${Screens._renderCaseQuiz(cs, 0)}
          </div>
        </div>
      </div>`;
    if (cs.discoveryQuestions && cs.discoveryQuestions.length) {
      this._renderDiscovery(caseId, 0);
    } else {
      const analysisEl = document.getElementById('cs-analysis-' + caseId);
      if (analysisEl) analysisEl.style.display = 'block';
    }
  },

  _renderCaseQuiz(cs, qIdx) {
    if (qIdx >= cs.quiz.length) {
      // All done
      const s = GameEngine.state;
      if(!s.caseStudiesCompleted) s.caseStudiesCompleted = [];
      if(!s.caseStudiesCompleted.includes(cs.id)){
        s.caseStudiesCompleted.push(cs.id);
        GameEngine.addXP(50);
        GameEngine.save();
      }
      return `<div style="text-align:center;padding:20px">
        <div style="font-size:36px;margin-bottom:10px">🎉</div>
        <div style="font-family:var(--font-display);font-weight:900;font-size:18px;color:white;margin-bottom:8px">Case Complete!</div>
        <div style="font-size:13px;color:#94A3B8;margin-bottom:16px">+50 XP earned</div>
        <button onclick="Router.navigate('case_studies')" style="background:#38BDF8;color:var(--navy);border:none;border-radius:14px;padding:12px 24px;font-family:var(--font-display);font-weight:900;font-size:14px;cursor:pointer">Back to Cases</button>
      </div>`;
    }
    const q = cs.quiz[qIdx];
    return `
      <div style="margin-bottom:14px">
        <div style="font-size:11px;color:#38BDF8;font-family:var(--font-mono);margin-bottom:8px">Q${qIdx+1} of ${cs.quiz.length}</div>
        <p style="font-size:14px;font-weight:700;color:white;line-height:1.5;margin:0 0 14px">${q.question}</p>
        <div style="display:grid;gap:8px">
          ${q.options.map((o,i)=>`<button id="csq_${cs.id}_${qIdx}_${i}" onclick="Screens._answerCaseQ('${cs.id}',${qIdx},${i})" style="background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.15);border-radius:12px;padding:12px;text-align:left;font-family:var(--font-display);font-weight:700;font-size:13px;color:white;cursor:pointer">${'ABCD'[i]}. ${o}</button>`).join('')}
        </div>
      </div>`;
  },

  _answerCaseQ(caseId, qIdx, optIdx) {
    const cs = CASE_STUDIES.find(c=>c.id===caseId);
    if (!cs) return;
    const q = cs.quiz[qIdx];
    const ok = optIdx === q.correct;
    // Color buttons
    for(let i=0;i<q.options.length;i++){
      const btn = document.getElementById('csq_'+caseId+'_'+qIdx+'_'+i);
      if(!btn) continue;
      btn.disabled = true;
      if(i===q.correct){ btn.style.background='#065F46'; btn.style.borderColor='#10B981'; btn.style.color='white'; }
      else if(i===optIdx&&!ok){ btn.style.background='#7F1D1D'; btn.style.borderColor='#EF4444'; btn.style.color='white'; }
    }
    // Show explanation
    const quizContainer = document.getElementById('cs-quiz-' + caseId);
    if(quizContainer){
      const expDiv = document.createElement('div');
      expDiv.style.cssText = 'margin-top:12px;background:rgba(255,255,255,.08);border-radius:10px;padding:12px;border-left:3px solid '+(ok?'#10B981':'#EF4444');
      const nextLabel = qIdx+1 < cs.quiz.length ? 'Next Question' : 'Finish';
      const resultColor = ok ? '#10B981' : '#EF4444';
      const resultLabel = ok ? 'Correct' : 'Incorrect';
      expDiv.innerHTML = '<div style="font-size:11px;font-weight:800;color:' + resultColor + ';margin-bottom:4px">' + resultLabel + '</div>' +
        '<div style="font-size:12px;color:#CBD5E1;line-height:1.6">' + q.explanation + '</div>' +
        '<button data-cid="' + caseId + '" data-qi="' + (qIdx+1) + '" class="cs-next-btn" style="margin-top:10px;background:#38BDF8;color:#0C1B33;border:none;border-radius:10px;padding:8px 18px;font-family:var(--font-display);font-weight:800;font-size:13px;cursor:pointer">' + nextLabel + '</button>';
      quizContainer.appendChild(expDiv);

      expDiv.querySelector('.cs-next-btn').addEventListener('click', function() {
        const cid = this.dataset.cid;
        const qi = parseInt(this.dataset.qi);
        document.getElementById('cs-quiz-' + cid).innerHTML = Screens._renderCaseQuiz(CASE_STUDIES.find(c=>c.id===cid), qi);
      });
    }
  },

  _renderDiscovery(caseId, qIdx) {
    const cs = CASE_STUDIES.find(c => c.id === caseId);
    const el = document.getElementById('cs-discovery-' + caseId);
    if (!el || !cs || !cs.discoveryQuestions) return;
    const q = cs.discoveryQuestions[qIdx];
    if (!q) return;
    el.innerHTML = `
      <div style="background:#EFF6FF;border-radius:16px;padding:16px;margin-bottom:16px;border-left:4px solid #3B82F6">
        <div style="font-size:10px;color:#3B82F6;font-weight:800;font-family:var(--font-mono);margin-bottom:8px">REFLECT — Question ${qIdx+1} of 2</div>
        <p style="font-size:14px;font-weight:700;color:#1E3A5F;line-height:1.5;margin:0 0 14px">${q.q}</p>
        <div id="disc-opts-${caseId}" style="display:grid;gap:8px">
          ${q.opts.map((o, i) => `<button onclick="Screens._answerDiscovery('${caseId}',${qIdx},${i},this)" style="text-align:left;background:white;border:2px solid #BFDBFE;border-radius:12px;padding:11px 14px;font-family:var(--font-body);font-size:13px;color:#1E3A5F;cursor:pointer;line-height:1.4">${o}</button>`).join('')}
        </div>
        <div id="disc-response-${caseId}" style="display:none"></div>
      </div>`;
  },

  _answerDiscovery(caseId, qIdx, selIdx, btn) {
    btn.closest('#disc-opts-' + caseId).querySelectorAll('button').forEach(b => {
      b.disabled = true;
      b.style.cursor = 'default';
    });
    btn.style.background = '#DBEAFE';
    btn.style.borderColor = '#2563EB';
    btn.style.color = '#1E40AF';
    btn.style.fontWeight = '700';
    const cs = CASE_STUDIES.find(c => c.id === caseId);
    if (!cs || !cs.discoveryQuestions) return;
    const q = cs.discoveryQuestions[qIdx];
    const respEl = document.getElementById('disc-response-' + caseId);
    if (!respEl) return;
    const isLast = qIdx >= cs.discoveryQuestions.length - 1;
    respEl.style.display = 'block';
    respEl.innerHTML = `
      <div style="background:#EFF6FF;border-radius:12px;padding:12px 14px;margin-top:12px;border-left:3px solid #3B82F6">
        <div style="font-size:11px;font-weight:800;color:#2563EB;margin-bottom:4px">Consider this</div>
        <div style="font-size:13px;color:#1E3A5F;line-height:1.6">${q.response}</div>
      </div>
      ${isLast
        ? `<button onclick="Screens._unlockAnalysis('${caseId}')" style="margin-top:12px;background:#0C1B33;color:white;border:none;border-radius:12px;padding:11px 20px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">Reveal Analysis ↓</button>`
        : `<button onclick="Screens._renderDiscovery('${caseId}',${qIdx+1})" style="margin-top:12px;background:#3B82F6;color:white;border:none;border-radius:12px;padding:11px 20px;font-family:var(--font-display);font-weight:800;font-size:14px;cursor:pointer">Next Question →</button>`
      }`;
  },

  _unlockAnalysis(caseId) {
    const discEl = document.getElementById('cs-discovery-' + caseId);
    if (discEl) {
      discEl.innerHTML = `<div style="background:#D1FAE5;border-radius:14px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
        <span style="font-size:18px">✅</span>
        <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:#065F46">Analysis Unlocked — You reflected on both questions</div>
      </div>`;
    }
    const analysisEl = document.getElementById('cs-analysis-' + caseId);
    if (analysisEl) {
      analysisEl.style.display = 'block';
      analysisEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  cleanupForRoute(nextScreen) {
    if (nextScreen !== 'quiz' && this._qs) {
      this._stopTimer();
      this._qs = null;
    }
    if (nextScreen !== 'checkride' && nextScreen !== 'checkride_results' && this._cr) {
      this._stopCRTimer();
      this._cr = null;
    }
  },

  render(screen, params = {}) {
    try {
      this.cleanupForRoute(screen);
      const view = this[screen];
      if (typeof view === 'function') return view.call(this, params || {});
      return this.dashboard();
    } catch(err) {
      console.error('[Screens] Render error on screen "' + screen + '":', err);
      this._renderError(screen, err);
    }
  },

  _renderError(screen, err) {
    // Find the active screen container and inject a safe fallback UI
    const activeScreen = document.querySelector('.screen.active');
    const container = activeScreen ? activeScreen.querySelector('[id$="-content"]') : null;
    const target = container || document.getElementById('dashboard-content') || document.body;
    target.innerHTML = `
      <div style="padding:32px 20px 100px;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">⚠️</div>
        <h2 style="font-family:var(--font-display);font-weight:900;color:#0C1B33;margin:0 0 8px">Something went wrong</h2>
        <p style="font-size:13px;color:#64748B;margin:0 0 24px;line-height:1.6">An error occurred while loading this screen.<br>Your progress has been saved.</p>
        <div style="display:flex;flex-direction:column;gap:10px;max-width:280px;margin:0 auto">
          <button onclick="Router.navigate('dashboard')" style="background:#38BDF8;color:#0C1B33;border:none;border-radius:14px;padding:14px;font-family:var(--font-display);font-weight:900;font-size:15px;cursor:pointer">Return to Dashboard</button>
          <button onclick="if(confirm('Clear saved data and restart? This cannot be undone.')){localStorage.removeItem('aviation_weather_v1');localStorage.removeItem('charlotte_aviation_v1');location.reload()}" style="background:#FEF2F2;color:#DC2626;border:1px solid #FCA5A5;border-radius:14px;padding:12px;font-family:var(--font-display);font-weight:700;font-size:13px;cursor:pointer">Clear data and restart</button>
        </div>
        <p style="font-size:10px;color:#CBD5E1;margin-top:20px">${err ? err.message : 'Unknown error'}</p>
      </div>`;
  }

};


// ============================================================
// Onboarding — First-Launch Flow
// ============================================================

const Onboarding = {
  _selectedLevel: null,

  show() {
    const overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;
    overlay.style.display = 'block';
    this._renderScreen1();
  },

  _dismiss() {
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) overlay.style.display = 'none';
  },

  // Save state, hide overlay, init router, then navigate to target.
  // _selectedLevel is now load-bearing — persisted to state.learnerLevel and used by
  // dashboard recommendations, the "Stretch" tag on the Modules screen, and the
  // checkride question-mix.
  _complete(screen, moduleId) {
    if (this._selectedLevel && typeof LEVELS !== 'undefined' && LEVELS.includes(this._selectedLevel)) {
      GameEngine.state.learnerLevel = this._selectedLevel;
    }
    if (window.Analytics) Analytics.track('Onboarding Completed', { level: this._selectedLevel });
    GameEngine.state.firstLaunchSeen = true;
    GameEngine.save();
    this._dismiss();
    Router.init();
    if (screen === 'lesson' && moduleId) {
      Router.navigate('lesson', { moduleId });
    } else if (screen && screen !== 'dashboard') {
      Router.navigate(screen, {});
    }
  },

  _skip() {
    this._selectedLevel = null;
    this._complete('modules');
  },

  _selectLevel(level) {
    this._selectedLevel = level;
    ['student', 'private', 'instrument', 'commercial'].forEach(l => {
      const card = document.getElementById('ob-card-' + l);
      if (!card) return;
      card.style.borderColor = l === level ? 'var(--sky-dark)' : '#E2E8F0';
      card.style.background  = l === level ? '#E0F2FE'          : 'white';
    });
    const btn = document.getElementById('ob-continue-btn');
    if (btn) btn.style.display = 'block';
  },

  _renderScreen1() {
    document.getElementById('onboarding-overlay').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;box-sizing:border-box">
        <div style="background:white;border-radius:24px;padding:36px 28px;max-width:400px;width:100%;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.5)">
          <div style="font-size:44px;margin-bottom:16px;letter-spacing:6px">✈️ ⛅</div>
          <h1 style="font-family:var(--font-display);font-size:24px;font-weight:900;color:#0C1B33;margin:0 0 6px">Aviation Weather Academy</h1>
          <div style="font-family:var(--font-mono);font-size:11px;color:#94A3B8;letter-spacing:.04em;margin-bottom:28px">FAA-H-8083-28B · Pilot Weather Training</div>
          <div style="background:#F0F9FF;border-radius:14px;padding:16px 18px;text-align:left;margin-bottom:28px">
            <p style="font-size:13px;color:#334155;line-height:1.75;margin:0;font-family:var(--font-body)">This app is an educational study tool based on FAA-H-8083-28B (Aviation Weather Handbook). It is not a substitute for FAA-approved training, a certified ground school, or instruction from a qualified CFI. Always verify weather decisions with official sources and current briefings.</p>
          </div>
          <button onclick="Onboarding._renderScreen2()" style="width:100%;background:#0C1B33;color:white;border:none;border-radius:16px;padding:16px;font-family:var(--font-display);font-weight:800;font-size:15px;cursor:pointer">I understand — let's begin</button>
        </div>
      </div>`;
  },

  _renderScreen2() {
    this._selectedLevel = null;
    const levels = [
      { id: 'student',    emoji: '🎓', label: 'Student Pilot',  sub: 'Working toward my Private certificate' },
      { id: 'private',    emoji: '🛩️', label: 'Private Pilot',   sub: 'Certificated, building hours or reviewing' },
      { id: 'instrument', emoji: '🌧️', label: 'Instrument',      sub: 'Instrument student or rated, IFR-focused study' },
      { id: 'commercial', emoji: '✈️', label: 'Commercial+',     sub: 'Commercial / CFI / refresher — advanced products' }
    ];
    document.getElementById('onboarding-overlay').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;box-sizing:border-box">
        <div style="background:white;border-radius:24px;padding:32px 28px;max-width:400px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5)">
          <h1 style="font-family:var(--font-display);font-size:22px;font-weight:900;color:#0C1B33;margin:0 0 6px">Where are you in your training?</h1>
          <p style="font-size:13px;color:#64748B;margin:0 0 20px;font-family:var(--font-body)">Select your level to get a personalized starting point.</p>
          ${levels.map(l => `
            <div id="ob-card-${l.id}" onclick="Onboarding._selectLevel('${l.id}')" role="button" tabindex="0"
              onkeydown="if(event.key==='Enter'||event.key===' ')Onboarding._selectLevel('${l.id}')"
              style="border:2.5px solid #E2E8F0;border-radius:16px;padding:14px 16px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;gap:14px;background:white;transition:all .15s">
              <span style="font-size:26px;flex-shrink:0;line-height:1">${l.emoji}</span>
              <div>
                <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:#0C1B33">${l.label}</div>
                <div style="font-size:12px;color:#64748B;margin-top:2px;font-family:var(--font-body)">${l.sub}</div>
              </div>
            </div>`).join('')}
          <button id="ob-continue-btn" onclick="Onboarding._renderScreen3(Onboarding._selectedLevel)"
            style="display:none;width:100%;background:#0C1B33;color:white;border:none;border-radius:16px;padding:14px;font-family:var(--font-display);font-weight:800;font-size:15px;cursor:pointer;margin-top:4px">Continue</button>
          <div style="text-align:center;margin-top:14px">
            <button onclick="Onboarding._skip()" style="background:none;border:none;color:#94A3B8;font-family:var(--font-body);font-size:13px;cursor:pointer;padding:4px 8px">Skip setup</button>
          </div>
        </div>
      </div>`;
  },

  _renderScreen3(level) {
    const config = {
      student:    { msg: 'We\'ll start you on the Student Pilot foundation — atmosphere, pressure, wind, and METAR. Higher-level modules stay open as Stretch material.', screen: 'lesson',  moduleId: 'm1',  modLabel: 'Module 1: The Atmosphere' },
      private:    { msg: 'Your dashboard will steer you toward Private Pilot operational topics — fronts, thunderstorms, fog, mountain weather, TAF.',                       screen: 'lesson',  moduleId: 'm5',  modLabel: 'Module 5: The Weather Machine' },
      instrument: { msg: 'Recommendations bias toward Instrument-level hazards — icing, turbulence, radar, advisories. Lower-level modules remain available for review.',  screen: 'lesson',  moduleId: 'm7',  modLabel: 'Module 7: Structural Icing' },
      commercial: { msg: 'You\'ll see the full curriculum, with bias toward advanced products — space weather, surface analysis, forecast charts.',                          screen: 'modules', moduleId: null,  modLabel: 'Explore modules' }
    };
    const c = config[level] || config.student;
    const levelLabels = { student: 'Student Pilot', private: 'Private Pilot', instrument: 'Instrument', commercial: 'Commercial+' };
    const navCall = c.moduleId ? `Onboarding._complete('${c.screen}','${c.moduleId}')` : `Onboarding._complete('${c.screen}')`;
    document.getElementById('onboarding-overlay').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;box-sizing:border-box">
        <div style="background:white;border-radius:24px;padding:36px 28px;max-width:400px;width:100%;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.5)">
          <div style="font-size:40px;margin-bottom:14px">🎯</div>
          <h1 style="font-family:var(--font-display);font-size:22px;font-weight:900;color:#0C1B33;margin:0 0 10px">You're all set</h1>
          <div style="display:inline-block;background:#E0F2FE;color:#0284C7;border-radius:999px;padding:4px 14px;font-family:var(--font-display);font-size:12px;font-weight:800;margin-bottom:22px">${levelLabels[level] || 'Pilot'}</div>
          <div style="background:#F8FAFC;border-radius:14px;padding:16px 18px;text-align:left;margin-bottom:24px">
            <p style="font-size:13px;color:#334155;line-height:1.75;margin:0;font-family:var(--font-body)">${c.msg}</p>
          </div>
          <button onclick="${navCall}"
            style="width:100%;background:#0C1B33;color:white;border:none;border-radius:16px;padding:14px 16px;font-family:var(--font-display);font-weight:800;font-size:15px;cursor:pointer;margin-bottom:12px">Go to ${c.modLabel}</button>
          <button onclick="Onboarding._complete('modules')"
            style="background:none;border:none;color:#64748B;font-family:var(--font-body);font-size:13px;cursor:pointer;padding:4px 8px">Explore on my own</button>
        </div>
      </div>`;
  }
};

window.Onboarding = Onboarding;

