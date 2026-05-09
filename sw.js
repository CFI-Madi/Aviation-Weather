// ============================================================
// Aviation Weather Academy — Service Worker
// Cache name: bump version string to force cache refresh on deploy
// ============================================================

const CACHE_NAME = 'wx-academy-v6';

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
  // PROCESS_DIAGRAMS — semantically-named copies in use since v1
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
  './img/awh/taf_change_groups.png',
  // Pass 2b FAA-handbook figure swaps — cloud gallery (Appendix A)
  './img/awh/awh_p0492_img_001.png',
  './img/awh/awh_p0493_img_001.png',
  './img/awh/awh_p0494_img_001.png',
  './img/awh/awh_p0495_img_001.png',
  './img/awh/awh_p0496_img_001.png',
  './img/awh/awh_p0497_img_001.png',
  './img/awh/awh_p0498_img_001.png',
  './img/awh/awh_p0499_img_001.png',
  './img/awh/awh_p0499_img_002.png',
  './img/awh/awh_p0500_img_001.png',
  './img/awh/awh_p0501_img_001.png',
  './img/awh/awh_p0501_img_002.png',
  // Pass 2b — six main figure swaps + the s3_2 inline addition
  './img/awh/awh_p0119_img_002.png',  // Fig 9-5  Polar + Subtropical Jet Streams
  './img/awh/awh_p0126_img_001.png',  // Fig 10-8 Geostrophic Wind
  './img/awh/awh_p0127_img_002.png',  // Fig 10-10 Surface Wind Forces (inline in s3_2)
  './img/awh/awh_p0142_img_002.png',  // Fig 11-4 Front Symbols
  './img/awh/awh_p0237_img_001.png',  // Fig 19-1 Convective Turbulence
  './img/awh/awh_p0239_img_002.png',  // Fig 19-4 Mechanical Turbulence
  './img/awh/awh_p0240_img_001.png',  // Fig 19-5 Wind Shear Turbulence
  './img/awh/awh_p0241_img_001.png',  // Fig 19-6 Wind Shear with Inversion
  './img/awh/awh_p0354_img_001.png',  // Fig 25-5 Surface Chart Pressure Patterns
  // Pass 2c FAA-handbook figure swap — fog formation grid
  './img/awh/awh_p0225_img_001.png',  // Fig 18-1 Radiation Fog Formation
  './img/awh/awh_p0228_img_001.png',  // Fig 18-5 Advection Fog Formation
  './img/awh/awh_p0229_img_001.png',  // Fig 18-7 Upslope Fog Formation
  './img/awh/awh_p0230_img_001.png',  // Fig 18-8 Frontal Fog Formation
  './img/awh/awh_p0231_img_001.png',  // Fig 18-9 Steam Fog Formation
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
