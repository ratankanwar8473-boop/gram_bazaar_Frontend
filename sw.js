const CACHE_NAME = 'gram-bazaar-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/auth/login.html',
  '/customer/index.html',
  '/seller/index.html',
  '/admin/index.html',
  '/super-admin/index.html',
  '/shared/js/api.js',
  '/shared/js/config.js',
  '/shared/icons/icon-192.png',
  '/shared/icons/icon-512.png',
  '/manifest.json'
];

// Install – cache static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).catch(e => console.warn('[SW] Cache failed:', e))
  );
});

// Activate – clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch – cache-first for static, network-first for API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and API requests (always fresh)
  if (event.request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Gram Bazaar', {
      body: data.body || '',
      icon: '/shared/icons/icon-192.png',
      badge: '/shared/icons/icon-192.png',
      data: data
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
