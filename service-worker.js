/* ============================================================
   ElectroMart Pro – service-worker.js
   Stale-While-Revalidate caching strategy + offline support
   ============================================================ */

const CACHE_NAME    = 'electromart-v1.0.0';
const OFFLINE_URL   = './index.html';

const STATIC_ASSETS = [
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon.png',
];

/* ---------- Install: pre-cache static assets ---------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Install failed:', err))
  );
});

/* ---------- Activate: clean up old caches ---------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

/* ---------- Fetch: Stale-While-Revalidate strategy ---------- */
self.addEventListener('fetch', event => {
  const { request } = event;

  /* Skip non-GET requests and browser-extension URLs */
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(staleWhileRevalidate(request));
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);

  /* Check cache first */
  const cachedResponse = await cache.match(request);

  /* Start network fetch regardless (update cache in background) */
  const networkPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse && networkResponse.ok) {
        /* Clone because response can only be consumed once */
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => {
      /* Network failed – return offline fallback for HTML requests */
      if (request.destination === 'document') {
        return cache.match(OFFLINE_URL);
      }
      return null;
    });

  /* Return stale cache immediately if available, otherwise wait for network */
  return cachedResponse || networkPromise;
}
