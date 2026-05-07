// ============================================================
// Aviation Weather Academy — App Bootstrap
// ============================================================

window.addEventListener('DOMContentLoaded', function() {
  GameEngine.init();
  // Expose globals before Router.init() so template-literal onclick handlers can reach them
  window.Diagrams    = Diagrams;
  window.Screens     = Screens;
  window.Router      = Router;
  window.MODULES     = MODULES;
  window.CASE_STUDIES = typeof CASE_STUDIES !== 'undefined' ? CASE_STUDIES : [];
  window.GameEngine  = GameEngine;
  window.Onboarding  = Onboarding;
  // Show onboarding on first launch; otherwise route normally
  if (!GameEngine.state.firstLaunchSeen) {
    Onboarding.show();
  } else {
    Router.init();
  }
});
