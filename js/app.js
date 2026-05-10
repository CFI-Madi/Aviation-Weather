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

  // Density Altitude module completion → engine progress hook.
  // Diagrams._initDaModule dispatches a bubbling densityAltitudeComplete
  // CustomEvent when the user clicks Done on the final step. The
  // section-read XP is already awarded by Screens._renderLessonSection
  // (auto-marks as read on entry); here we just refresh the daily streak
  // and re-evaluate achievements so completing the interactive module
  // counts as an engagement signal even if the user revisits an
  // already-read section.
  document.addEventListener('densityAltitudeComplete', () => {
    if (window.GameEngine && typeof GameEngine.markStudied === 'function') {
      GameEngine.markStudied();
      GameEngine.checkAchievements();
    }
  });
});
