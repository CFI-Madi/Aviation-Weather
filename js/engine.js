// ============================================================
// Aviation Weather Academy — GameEngine
// ============================================================

const GameEngine = {
  state: null,
  init() {
    this.state = Storage.load();
    this.updateStreak();
    // Settings gear visibility is gated on firstLaunchSeen; sync it whenever
    // engine state is (re-)loaded so the gear appears post-onboarding without
    // a page reload.
    if (typeof Settings !== 'undefined' && Settings.syncGearVisibility) Settings.syncGearVisibility();
  },
  save() { Storage.save(this.state); },
  _defaultModuleProgress() {
    return {
      sectionsRead: [],
      quizCompleted: false,
      score: 0,
      attempts: 0,
      lastScore: null,
      lastAttemptAt: null,
      lastSectionIdx: 0
    };
  },
  ensureModuleProgress(moduleId) {
    if (!this.state.moduleProgress[moduleId]) {
      this.state.moduleProgress[moduleId] = this._defaultModuleProgress();
    } else {
      this.state.moduleProgress[moduleId] = {
        ...this._defaultModuleProgress(),
        ...this.state.moduleProgress[moduleId]
      };
    }
    return this.state.moduleProgress[moduleId];
  },
  getRank() {
    return RANKS.find(r => this.state.totalXP >= r.minXP && this.state.totalXP < r.maxXP) || RANKS[RANKS.length-1];
  },
  getNextRank() {
    const cur = this.getRank();
    const idx = RANKS.indexOf(cur);
    return RANKS[idx+1] || null;
  },
  getRankProgress() {
    const r = this.getRank();
    const n = this.getNextRank();
    if (!n) return 100;
    return Math.round(((this.state.totalXP - r.minXP) / (n.minXP - r.minXP)) * 100);
  },
  addXP(amount, label = '') {
    this.state.totalXP += amount;
    this.save();
    this.checkAchievements();
    this.showXPPopup(amount, label);
  },
  showXPPopup(amount, label='') {
    const el = document.createElement('div');
    el.className = 'xp-popup';
    el.textContent = `+${amount} XP`;
    el.style.cssText = `left:${Math.random()*50+25}%;top:60%;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },
  updateStreak() {
    const today = new Date().toDateString();
    if (!this.state.lastStudyDate) return;
    const last = new Date(this.state.lastStudyDate);
    const diff = Math.floor((new Date() - last) / 86400000);
    if (diff > 1) { this.state.streakDays = 0; this.save(); }
  },
  markStudied() {
    const today = new Date().toDateString();
    if (this.state.lastStudyDate !== today) {
      const last = this.state.lastStudyDate ? new Date(this.state.lastStudyDate) : null;
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
      if (last && last.toDateString() === yesterday.toDateString()) {
        this.state.streakDays++;
      } else {
        this.state.streakDays = 1;
      }
      this.state.lastStudyDate = today;
      this.save();
    }
  },
  isModuleUnlocked(moduleId) {
    return true; // All modules unlocked — learn in any order
  },
  getModuleProgress(moduleId) {
    return { ...this._defaultModuleProgress(), ...(this.state.moduleProgress[moduleId] || {}) };
  },
  // Tool usage tracking — records each tool detail open in reverse-chrono
  // order, capped at 10. If the same toolId is opened again, its previous
  // entry is removed before the new one is unshifted so the list dedupes.
  // Reserved for a future "Recently used" row on Study Tools landing.
  recordToolUsage(toolId) {
    if (!toolId) return;
    if (!Array.isArray(this.state.recentToolsUsed)) this.state.recentToolsUsed = [];
    this.state.recentToolsUsed = this.state.recentToolsUsed.filter(e => e && e.toolId !== toolId);
    this.state.recentToolsUsed.unshift({ toolId, timestamp: Date.now() });
    if (this.state.recentToolsUsed.length > 10) this.state.recentToolsUsed.length = 10;
    this.save();
  },
  recordStudyTarget(target) {
    if (!target || !target.moduleId) return;
    this.state.lastStudyTarget = {
      type: target.type === 'quiz' ? 'quiz' : 'lesson',
      moduleId: target.moduleId,
      sectionIdx: Number.isInteger(target.sectionIdx) ? target.sectionIdx : null,
      sectionId: target.sectionId || null,
      savedAt: new Date().toISOString()
    };
    this.save();
  },
  // Returns an array of resumable activities sorted most-recent first.
  // Phase 2 Chunk 6: dashboard shows a multi-row list when 2+ are present
  // (the user-approved adjustment item 5).
  // Each entry:
  //   { type, title, subtitle, actionLabel, resumeAction, timestamp }
  // resumeAction is a JS expression string evaluated by the dashboard
  // onclick handler — `Router.navigate(...)` for module quiz / lesson,
  // `Screens.resumeMetarQuiz()` for the METAR Quiz session.
  getResumeTargets() {
    const out = [];

    // Module quiz mid-session (state.quizInProgress)
    const qip = this.state.quizInProgress;
    if (qip && qip.moduleId && Number.isInteger(qip.current) && qip.current > 0) {
      const mod = (typeof MODULES !== 'undefined') ? MODULES.find(m => m.id === qip.moduleId) : null;
      const total = mod && Array.isArray(mod.quiz) ? mod.quiz.filter(Boolean).length : 0;
      if (mod && total > 0 && qip.current < total) {
        out.push({
          type: 'module_quiz',
          title: `Resume ${mod.title} quiz`,
          subtitle: `question ${qip.current + 1} of ${total}`,
          actionLabel: 'Resume',
          resumeAction: `Router.navigate('quiz',{moduleId:'${mod.id}'})`,
          timestamp: qip.savedAt || 0
        });
      }
    }

    // METAR Quiz mid-session (state.metarQuizInProgress)
    const mqip = this.state.metarQuizInProgress;
    if (mqip && mqip.difficulty && Array.isArray(mqip.questions) && mqip.questions.length > 0) {
      const total = mqip.questions.length;
      const cur = Math.min(Math.max(0, mqip.current || 0), total - 1);
      if (cur < total) {
        const diffLabel = mqip.difficulty[0].toUpperCase() + mqip.difficulty.slice(1);
        out.push({
          type: 'metar_quiz',
          title: 'Resume METAR Quiz',
          subtitle: `${diffLabel}, ${cur + 1} of ${total}`,
          actionLabel: 'Resume',
          resumeAction: 'Screens.resumeMetarQuiz()',
          timestamp: mqip.savedAt || 0
        });
      }
    }

    // Lesson resume from state.lastStudyTarget. Module quiz is captured by
    // type:'quiz' and superseded by quizInProgress above when mid-session;
    // here we only emit the lesson variant.
    const ls = this.state.lastStudyTarget;
    if (ls && ls.moduleId && ls.type !== 'quiz') {
      const mod = (typeof MODULES !== 'undefined') ? MODULES.find(m => m.id === ls.moduleId) : null;
      if (mod) {
        const sectionIdx = Number.isInteger(ls.sectionIdx) ? ls.sectionIdx : 0;
        const sectionTitle = mod.sections[sectionIdx] && mod.sections[sectionIdx].title
          ? mod.sections[sectionIdx].title
          : 'Lesson';
        const ts = ls.savedAt ? new Date(ls.savedAt).getTime() : 0;
        out.push({
          type: 'lesson',
          title: 'Resume lesson',
          subtitle: `${mod.title} · ${sectionTitle}`,
          actionLabel: 'Resume',
          resumeAction: `Router.navigate('lesson',{moduleId:'${mod.id}'})`,
          timestamp: ts
        });
      }
    }

    out.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    return out;
  },

  getResumeTarget() {
    const target = this.state.lastStudyTarget;
    if (!target || !target.moduleId) return null;
    const mod = MODULES.find(m => m.id === target.moduleId);
    if (!mod) {
      return {
        screen: 'modules',
        params: {},
        title: 'Resume study',
        subtitle: 'Your last module is no longer available.',
        actionLabel: 'Open modules'
      };
    }
    const progress = this.getModuleProgress(mod.id);
    const sectionIdx = Number.isInteger(target.sectionIdx)
      ? Math.max(0, Math.min(target.sectionIdx, mod.sections.length - 1))
      : Math.max(0, Math.min(progress.lastSectionIdx || 0, mod.sections.length - 1));
    const sectionTitle = mod.sections[sectionIdx]?.title || 'Lesson';
    if (target.type === 'quiz') {
      // Resume genuinely works (see Screens.quiz() — it shows a Continue/Start-over
      // prompt rehydrated from state.quizInProgress.current/score/wrongIds/resolved
      // when the saved progress matches the requested module). Reflect that in
      // the CTA: if an in-progress quiz exists for this module, surface the
      // "question N of M" detail so the user knows tapping resumes, not restarts.
      const saved = this.state.quizInProgress;
      const total = Array.isArray(mod.quiz) ? mod.quiz.filter(Boolean).length : 0;
      const inProgress = saved && saved.moduleId === mod.id && saved.current > 0 && total > 0 && saved.current < total;
      return {
        screen: 'quiz',
        params: { moduleId: mod.id },
        title: inProgress ? 'Resume quiz' : 'Quiz',
        subtitle: inProgress
          ? `${mod.title} · question ${saved.current + 1} of ${total}`
          : `${mod.title} · take the module quiz`,
        actionLabel: inProgress ? 'Resume' : 'Take quiz'
      };
    }
    return {
      screen: 'lesson',
      params: { moduleId: mod.id },
      title: 'Resume lesson',
      subtitle: `${mod.title} · ${sectionTitle}`,
      actionLabel: 'Resume'
    };
  },
  getReviewCountsByModule() {
    const counts = {};
    (this.state.spacedRepetition || []).forEach(qId => {
      // Module quiz questions
      const mod = MODULES.find(m => (m.quiz || []).some(q => q.id === qId));
      if (mod) { counts[mod.id] = (counts[mod.id] || 0) + 1; return; }
      // Daily challenge questions
      if (qId.startsWith('dc_') && typeof DAILY_CHALLENGES !== 'undefined') {
        const dc = DAILY_CHALLENGES.find(c => c.id === qId);
        if (dc && dc.moduleId) counts[dc.moduleId] = (counts[dc.moduleId] || 0) + 1;
      }
    });
    return counts;
  },
  getBestCheckrideScore() {
    const scores = this.state.checkrideScores || [];
    return scores.length ? Math.max(...scores.map(r => r.pct || 0)) : null;
  },
  getLevelProgress() {
    return LEVEL_META.map(level => {
      const levelModules = MODULES.filter(m => m.level === level.id);
      const completed = levelModules.filter(m => this.state.modulesPassed.includes(m.id)).length;
      const started = levelModules.filter(m => {
        const prog = this.getModuleProgress(m.id);
        return prog.sectionsRead.length > 0 || prog.attempts > 0;
      }).length;
      return {
        ...level,
        completed,
        started,
        total: levelModules.length
      };
    });
  },
  // Returns the user's current learner level (from onboarding or default).
  // Falls back to 'student' for users from before the level taxonomy existed.
  getCurrentLevel() {
    return this.state.learnerLevel && LEVELS.includes(this.state.learnerLevel)
      ? this.state.learnerLevel
      : 'student';
  },
  // Returns the next level above the current one, or null if already at top.
  getNextLevel() {
    const cur = this.getCurrentLevel();
    const idx = LEVELS.indexOf(cur);
    return idx >= 0 && idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
  },
  // True when every module at the user's current level has a passing quiz score.
  isCurrentLevelMastered() {
    const cur = this.getCurrentLevel();
    const mods = MODULES.filter(m => m.level === cur);
    if (!mods.length) return false;
    return mods.every(m => this.state.modulesPassed.includes(m.id));
  },
  // Promote the user to the next level after they tap the "Ready for [next]?" CTA.
  advanceLevel() {
    const next = this.getNextLevel();
    if (!next) return false;
    this.state.learnerLevel = next;
    this.save();
    return true;
  },
  recordCheckrideTopics(resultsByModule) {
    if (!resultsByModule || !Object.keys(resultsByModule).length) return;
    if (!this.state.checkrideTopicStats) this.state.checkrideTopicStats = {};
    Object.entries(resultsByModule).forEach(([moduleId, result]) => {
      const current = this.state.checkrideTopicStats[moduleId] || {
        correct: 0,
        total: 0,
        attempts: 0,
        lastPct: null,
        lastAt: null
      };
      current.correct += result.correct;
      current.total += result.total;
      current.attempts += 1;
      current.lastPct = result.pct;
      current.lastAt = new Date().toISOString();
      this.state.checkrideTopicStats[moduleId] = current;
    });
    this.save();
  },
  getWeakAreas(limit = 4) {
    const reviewCounts = this.getReviewCountsByModule();
    const topicStats = this.state.checkrideTopicStats || {};
    const weakAreas = MODULES.map(mod => {
      const prog = this.getModuleProgress(mod.id);
      const reviewCount = reviewCounts[mod.id] || 0;
      const topic = topicStats[mod.id] || null;
      const lastScore = typeof prog.lastScore === 'number' ? prog.lastScore : null;
      const bestScore = typeof prog.score === 'number' ? prog.score : 0;
      const checkridePct = topic && topic.total ? Math.round((topic.correct / topic.total) * 100) : null;
      const started = prog.sectionsRead.length > 0 || prog.attempts > 0;
      let weight = 0;
      const reasons = [];

      if (reviewCount > 0) {
        weight += 3 + Math.min(reviewCount, 3);
        reasons.push(`${reviewCount} review ${reviewCount === 1 ? 'question' : 'questions'} due`);
      }
      if (prog.attempts > 0 && lastScore !== null && lastScore < 70) {
        weight += 4 + Math.ceil((70 - lastScore) / 10);
        reasons.push(`last quiz ${lastScore}%`);
      } else if (prog.attempts > 0 && bestScore > 0 && bestScore < 80) {
        weight += 1;
        reasons.push(`best quiz ${bestScore}%`);
      }
      if (checkridePct !== null && checkridePct < 70) {
        weight += 3 + Math.ceil((70 - checkridePct) / 10);
        reasons.push(`checkride ${checkridePct}%`);
      }
      if (started && !this.state.modulesPassed.includes(mod.id) && prog.attempts === 0) {
        weight += 1;
        reasons.push('lesson started');
      }

      if (!weight) return null;

      return {
        moduleId: mod.id,
        title: mod.title,
        subtitle: mod.subtitle,
        icon: mod.icon,
        color: mod.color,
        bgColor: mod.bgColor,
        score: weight,
        reviewCount,
        lastScore,
        bestScore,
        checkridePct,
        reasonText: reasons.slice(0, 2).join(' · '),
        actionLabel: started ? 'Review lesson' : 'Start module'
      };
    }).filter(Boolean);

    return weakAreas
      .sort((a, b) => b.score - a.score || (a.lastScore ?? 101) - (b.lastScore ?? 101))
      .slice(0, limit);
  },
  CONCEPT_LABELS: {
    standard_atmosphere: 'Standard Atmosphere',
    pressure_altitude: 'Pressure Altitude',
    density_altitude: 'Density Altitude',
    heat_moisture: 'Heat & Moisture',
    wind_mechanics: 'Wind Mechanics',
    stability: 'Atmospheric Stability',
    fog_types: 'Fog Formation',
    air_masses: 'Air Masses',
    fronts: 'Weather Fronts',
    local_winds: 'Local Winds',
    thunderstorm_formation: 'Thunderstorm Formation',
    thunderstorm_hazards: 'Thunderstorm Hazards',
    thunderstorm_avoidance: 'Thunderstorm Avoidance',
    wind_shear: 'Wind Shear',
    structural_icing: 'Structural Icing',
    turbulence_types: 'Turbulence',
    mountain_wave: 'Mountain Wave',
    metar_decode: 'METAR Decoding',
    taf_decode: 'TAF Decoding',
    pirep_format: 'PIREPs',
    radar_products: 'Radar Products',
    advisories: 'AIRMETs & SIGMETs',
    briefing_products: 'Briefing Products',
    space_weather: 'Space Weather',
  },
  getConceptWeaknesses() {
    const srQueue = this.state.spacedRepetition || [];
    const counts = {};
    srQueue.forEach(qId => {
      // find question in MODULES
      let concept = null;
      for (const mod of MODULES) {
        const q = (mod.quiz || []).find(q => q.id === qId);
        if (q && q.concept) { concept = q.concept; break; }
      }
      if (!concept) return;
      counts[concept] = (counts[concept] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, n]) => n >= 1)
      .sort((a, b) => b[1] - a[1])
      .map(([concept, wrongCount]) => ({
        concept,
        label: this.CONCEPT_LABELS[concept] || concept,
        wrongCount
      }));
  },
  surfaceConceptQuestions(concept) {
    const results = [];
    MODULES.forEach(mod => {
      (mod.quiz || []).forEach(q => {
        if (q.concept === concept) {
          results.push({ q, moduleId: mod.id, moduleTitle: mod.title, moduleIcon: mod.icon });
        }
      });
    });
    return results;
  },
  getRecommendedNextStep(options = {}) {
    const excludeModuleId = options.excludeModuleId || null;
    const weakAreas = this.getWeakAreas(5).filter(item => item.moduleId !== excludeModuleId);
    if (weakAreas.length) {
      const item = weakAreas[0];
      return {
        title: `Focus next: ${item.title}`,
        subtitle: item.reasonText,
        screen: 'lesson',
        params: { moduleId: item.moduleId },
        actionLabel: item.actionLabel
      };
    }

    const inProgress = MODULES.find(mod => {
      if (mod.id === excludeModuleId || this.state.modulesPassed.includes(mod.id)) return false;
      const prog = this.getModuleProgress(mod.id);
      return prog.sectionsRead.length > 0 || prog.attempts > 0;
    });
    if (inProgress) {
      return {
        title: `Continue ${inProgress.title}`,
        subtitle: inProgress.subtitle,
        screen: 'lesson',
        params: { moduleId: inProgress.id },
        actionLabel: 'Continue'
      };
    }

    // Bias toward modules at the user's current level. If those are all mastered,
    // step up one level. Last resort: any unpassed module.
    const curLevel = this.getCurrentLevel();
    const nextLevel = this.getNextLevel();
    const candidatePools = [curLevel, nextLevel].filter(Boolean);
    let nextModule = null;
    for (const lvl of candidatePools) {
      nextModule = MODULES.find(mod =>
        mod.level === lvl &&
        mod.id !== excludeModuleId &&
        !this.state.modulesPassed.includes(mod.id)
      );
      if (nextModule) break;
    }
    if (!nextModule) {
      nextModule = MODULES.find(mod => mod.id !== excludeModuleId && !this.state.modulesPassed.includes(mod.id));
    }
    if (nextModule) {
      return {
        title: `Start ${nextModule.title}`,
        subtitle: nextModule.subtitle,
        screen: 'lesson',
        params: { moduleId: nextModule.id },
        actionLabel: 'Start module'
      };
    }

    const bestCheckride = this.getBestCheckrideScore();
    if (bestCheckride === null || bestCheckride < 70) {
      return {
        title: 'Try the checkride',
        subtitle: 'Use the exam to confirm your readiness and weak spots.',
        screen: 'checkride',
        params: {},
        actionLabel: 'Go to checkride'
      };
    }

    if ((this.state.caseStudiesCompleted || []).length < CASE_STUDIES.length) {
      return {
        title: 'Work a case study',
        subtitle: 'Apply weather judgment to real accident scenarios.',
        screen: 'case_studies',
        params: {},
        actionLabel: 'Open cases'
      };
    }

    return {
      title: 'Keep your edge sharp',
      subtitle: 'Use the logbook review queue and daily challenge to stay current.',
      screen: 'logbook',
      params: {},
      actionLabel: 'Open logbook'
    };
  },
  markSectionRead(moduleId, sectionId) {
    const prog = this.ensureModuleProgress(moduleId);
    if (!prog.sectionsRead.includes(sectionId)) {
      prog.sectionsRead.push(sectionId);
      this.state.totalSectionsRead++;
      this.addXP(10, 'Section read');
      this.markStudied();
    }
    this.save();
    this.checkAchievements();
  },
  saveQuizProgress(data) {
    // data: { moduleId, current, score, wrongIds, answered, resolved }
    // Stamp the save time so the dashboard Resume CTA can sort by recency
    // (added in Phase 2 Chunk 6 alongside the parallel METAR-quiz save path).
    this.state.quizInProgress = { ...data, savedAt: Date.now() };
    this.save();
  },
  clearQuizProgress() {
    this.state.quizInProgress = null;
    this.save();
  },

  // ───── METAR Quiz persistence (Phase 2 Chunk 6) ─────
  // Mid-session state lives in state.metarQuizInProgress with shape:
  //   { difficulty, questions, current, savedAt }
  // Resume drops the user at the start of `current` (no chip placements) —
  // the question list is preserved so the same 8 METARs play out, and the
  // score state on state.metarQuiz reflects everything submitted so far.
  saveMetarQuizProgress(data) {
    this.state.metarQuizInProgress = { ...data, savedAt: Date.now() };
    this.save();
  },
  clearMetarQuizProgress() {
    this.state.metarQuizInProgress = null;
    this.save();
  },

  // Record one METAR quiz submit. Updates aggregate stats, awards XP
  // (proportional partial credit), and triggers the achievements pass.
  // Called from Screens._submitMetarQuiz once per question.
  recordMetarQuizAttempt(difficulty, totalFields, correctFields) {
    if (!this.state.metarQuiz) {
      // Defensive: storage default merge guarantees this exists, but if a
      // pre-Phase-2 load somehow skipped it, init now.
      this.state.metarQuiz = {
        beginner:     { attempts: 0, fullyCorrect: 0, totalFieldsCorrect: 0, totalFieldsAttempted: 0 },
        intermediate: { attempts: 0, fullyCorrect: 0, totalFieldsCorrect: 0, totalFieldsAttempted: 0 },
        advanced:     { attempts: 0, fullyCorrect: 0, totalFieldsCorrect: 0, totalFieldsAttempted: 0 },
        currentStreak: 0, bestStreak: 0, lifetimeFullyCorrect: 0,
        lastSessionTemplateIds: []
      };
    }
    const mq = this.state.metarQuiz;
    const bucket = mq[difficulty];
    if (!bucket) return; // unknown difficulty — bail

    bucket.attempts = (bucket.attempts || 0) + 1;
    bucket.totalFieldsCorrect = (bucket.totalFieldsCorrect || 0) + correctFields;
    bucket.totalFieldsAttempted = (bucket.totalFieldsAttempted || 0) + totalFields;

    const fullyCorrect = (totalFields > 0) && (correctFields === totalFields);
    if (fullyCorrect) {
      bucket.fullyCorrect = (bucket.fullyCorrect || 0) + 1;
      mq.lifetimeFullyCorrect = (mq.lifetimeFullyCorrect || 0) + 1;
      mq.currentStreak = (mq.currentStreak || 0) + 1;
      if (mq.currentStreak > (mq.bestStreak || 0)) mq.bestStreak = mq.currentStreak;
    } else {
      mq.currentStreak = 0;
    }

    // Partial-credit XP, rounded down. Beginner full = 5; Inter = 10; Adv = 20.
    const xpFull = { beginner: 5, intermediate: 10, advanced: 20 }[difficulty] || 0;
    const xp = totalFields > 0 ? Math.floor((xpFull * correctFields) / totalFields) : 0;
    if (xp > 0) {
      this.addXP(xp, fullyCorrect ? 'METAR decoded' : 'METAR partial');
    } else {
      // addXP also runs save() + checkAchievements; if we awarded zero
      // XP, do those manually so the attempts/correct counters persist.
      this.save();
      this.checkAchievements();
    }
  },

  // Persist the templates used in the just-finished session so the next
  // session held-out list excludes them. Called from
  // Screens._showMetarSessionResults when the session ends naturally.
  recordMetarQuizSessionEnd(templateIds) {
    if (!this.state.metarQuiz) return;
    this.state.metarQuiz.lastSessionTemplateIds = Array.isArray(templateIds) ? templateIds.slice() : [];
    this.save();
  },
  completeQuiz(moduleId, score, wrongQIds) {
    const prog = this.ensureModuleProgress(moduleId);
    prog.quizCompleted = true;
    prog.attempts++;
    prog.score = Math.max(prog.score, score);
    prog.lastScore = score;
    prog.lastAttemptAt = new Date().toISOString();
    this.state.quizScores[moduleId] = Math.max(this.state.quizScores[moduleId]||0, score);
    if (!this.state.quizHistory) this.state.quizHistory = [];
    this.state.quizHistory.push({ moduleId, score, date: new Date().toISOString() });
    if (score >= 70 && !this.state.modulesPassed.includes(moduleId)) {
      this.state.modulesPassed.push(moduleId);
      const mod = MODULES.find(m=>m.id===moduleId);
      this.addXP(mod ? mod.xpReward : 100, 'Module completed!');
    } else {
      this.addXP(Math.round(score / 2), 'Quiz attempt');
    }
    // Add wrong questions to spaced repetition
    wrongQIds.forEach(qId => { if (!this.state.spacedRepetition.includes(qId)) this.state.spacedRepetition.push(qId); });
    this.save();
    this.checkAchievements();
  },
  getDailyChallenge() {
    const today = new Date().toDateString();
    const pool = DAILY_CHALLENGES.filter(Boolean);
    if (this.state.dailyChallengeDate !== today) {
      this.state.dailyChallengeIndex = Math.floor(Math.random() * pool.length);
      this.state.dailyChallengeDate = today;
      this.state.dailyChallengeCompleted = false;
      this.save();
    }
    const idx = this.state.dailyChallengeIndex % pool.length;
    return { ...pool[idx], completed: this.state.dailyChallengeCompleted };
  },
  completeDailyChallenge() {
    this.state.dailyChallengeCompleted = true;
    this.state.dailyChallengesCompleted++;
    this.addXP(100, 'Daily challenge!');
    this.save();
    this.checkAchievements();
  },
  checkAchievements() {
    ACHIEVEMENTS.forEach(ach => {
      if (!this.state.achievements.includes(ach.id) && ach.condition(this.state)) {
        this.state.achievements.push(ach.id);
        this.showAchievementToast(ach);
        this.save();
      }
    });
  },
  showAchievementToast(ach) {
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);
      background:white;border-radius:20px;padding:14px 20px;box-shadow:0 8px 32px rgba(0,0,0,0.15);
      z-index:9999;display:flex;align-items:center;gap:12px;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
      font-family:var(--font-display);font-weight:700;border:2px solid ${ach.color};max-width:90vw;`;
    el.innerHTML = `<span style="font-size:28px">${ach.emoji}</span>
      <div><div style="font-size:11px;color:#94A3B8;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">Achievement Unlocked!</div>
      <div style="font-size:16px;color:${ach.color}">${ach.title}</div></div>`;
    document.body.appendChild(el);
    setTimeout(() => el.style.transform = 'translateX(-50%) translateY(0)', 100);
    setTimeout(() => { el.style.transform = 'translateX(-50%) translateY(-120px)'; setTimeout(() => el.remove(), 400); }, 3500);
    this.launchConfetti();
  },
  launchConfetti() {
    const colors = ['#38BDF8','#F59E0B','#10B981','#8B5CF6','#F43F5E'];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.cssText = `left:${Math.random()*100}vw;top:-10px;background:${colors[Math.floor(Math.random()*colors.length)]};
        width:${Math.random()*10+6}px;height:${Math.random()*10+6}px;border-radius:${Math.random()>0.5?'50%':'2px'};
        animation-duration:${Math.random()*2+1.5}s;animation-delay:${Math.random()*0.5}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  }
};
