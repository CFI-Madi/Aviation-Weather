// ============================================================
// Aviation Weather Academy — Service Worker
// Cache name: bump version string to force cache refresh on deploy
// ============================================================

const CACHE_NAME = 'wx-academy-v2';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './js/app.js',
  './js/router.js',
  './js/engine.js',
  './js/storage.js',
  './js/screens.js',
  './js/diagrams.js',
  './js/data/config.js',
  './js/data/modules.js',
  './js/data/case_studies.js',
  './js/data/achievements.js',
  './js/data/faa_validation.js',
  './img/awh/density_altitude_01.png',
  './img/awh/density_altitude_02.png',
  './img/awh/temperature_inversion_01.png',
  './img/awh/temperature_inversion_02.png',
  './img/awh/frontal_lifting_01.png',
  './img/awh/frontal_lifting_02.png',
  './img/awh/frontal_lifting_03.png',
  './img/awh/thunderstorm_lifecycle_01.png',
  './img/awh/thunderstorm_lifecycle_02.png',
  './img/awh/icing_accretion_01.png',
  './img/awh/icing_accretion_02.png',
  './img/awh/icing_accretion_03.png',
  './img/awh/orographic_effect_01.png',
  './img/awh/orographic_effect_02.png',
  './img/awh/orographic_effect_03.png',
  './img/awh/metar_syntax.png',
  './img/awh/taf_change_groups.png'
];

// ── Install: pre-cache all app shell assets ───────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: delete stale caches from previous versions ─────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for app shell; network fallback for rest ─
self.addEventListener('fetch', event => {
  // Only handle same-origin requests; pass external URLs straight through
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
