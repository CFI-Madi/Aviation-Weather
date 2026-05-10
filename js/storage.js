// ============================================================
// Aviation Weather Academy — Storage
// ============================================================

const Storage = {
  KEY: 'aviation_weather_v1',
  LEGACY_KEY: 'charlotte_aviation_v1',
  defaultState() {
    return {
      totalXP: 0, streakDays: 0, lastStudyDate: null,
      moduleProgress: {}, modulesPassed: [], quizScores: {},
      achievements: [], totalSectionsRead: 0,
      spacedRepetition: [], totalReviews: 0,
      dailyChallengeDate: null, dailyChallengesCompleted: 0,
      dailyChallengeCompleted: false, dailyChallengeIndex: 0,
      scenarioCorrect: 0, timedCorrect: 0, caseStudiesCompleted: [],
      checkrideScores: [], checkrideTopicStats: {}, quizHistory: [],
      lastStudyTarget: null, _actFilter: 'all',
      quizInProgress: null,
      firstLaunchSeen: false,
      // Reverse-chronological list of {toolId, timestamp} entries, capped at 10.
      // Updated by GameEngine.recordToolUsage(toolId) whenever a user opens a
      // tool detail screen. Reserved for a future "Recently used tools" row;
      // Phase 1 just records the data so it exists when that row is built.
      // Convention: additive defaultState changes don't bump the storage key —
      // the load()-time spread merge initialises the field for existing users.
      // See CONVENTIONS.md for the storage-version policy.
      recentToolsUsed: [],

      // Phase 2 — METAR Quiz scoring + persistence.
      // metarQuiz holds aggregate scoring stats per difficulty, plus a
      // session-level streak (across difficulties) and a list of the
      // last session's template ids (passed to MetarQuiz.generateSession
      // so back-to-back sessions don't repeat the same 8 templates).
      metarQuiz: {
        beginner:     { attempts: 0, fullyCorrect: 0, totalFieldsCorrect: 0, totalFieldsAttempted: 0 },
        intermediate: { attempts: 0, fullyCorrect: 0, totalFieldsCorrect: 0, totalFieldsAttempted: 0 },
        advanced:     { attempts: 0, fullyCorrect: 0, totalFieldsCorrect: 0, totalFieldsAttempted: 0 },
        currentStreak: 0,
        bestStreak: 0,
        lifetimeFullyCorrect: 0,
        lastSessionTemplateIds: []
      },
      // Mid-session METAR Quiz state — separate from quizInProgress because
      // the shape differs (chip pool + question array vs question index +
      // resolved map). Held-out tracking via lastSessionTemplateIds is in
      // metarQuiz above so it persists past clearMetarQuizProgress.
      metarQuizInProgress: null
    };
  },
  load() {
    try {
      // Check for data under the new key first
      let raw = localStorage.getItem(this.KEY);
      if (!raw) {
        // Migrate from legacy key if present
        const legacy = localStorage.getItem(this.LEGACY_KEY);
        if (legacy) {
          localStorage.setItem(this.KEY, legacy);
          localStorage.removeItem(this.LEGACY_KEY);
          raw = legacy;
        }
      }
      return raw ? { ...this.defaultState(), ...JSON.parse(raw) } : this.defaultState();
    } catch(e) {
      console.warn('[Storage] Failed to load saved state — using defaults.', e);
      return this.defaultState();
    }
  },
  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
    } catch(e) {
      console.warn('[Storage] Progress could not be saved — storage may be full.', e);
    }
  }
};
