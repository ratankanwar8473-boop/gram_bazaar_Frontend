// ═══ Gram Bazaar – Service Worker v1.0 ═══
const CACHE_NAME = 'gram-bazaar-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/gram-bazaar/auth/login.html',
  '/gram-bazaar/customer/index.html',
  '/gram-bazaar/seller/index.html',
  '/gram-bazaar/admin/index.html',
  '/gram-bazaar/shared/js/api.js',
  '/gram-bazaar/shared/icons/icon-192.png',
  '/gram-bazaar/shared/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Hind:wght@400;500;600&display=swap'
];

// Install: cache static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith('http')));
    })
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch strategy:
// - API calls → Network only (always fresh data)
// - Static files → Cache first, then network
// - Navigation → Cache first fallback to index.html
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Skip chrome-extension and non-http
  if (!e.request.url.startsWith('http')) return;

  // API calls → Network only
  if (url.pathname.startsWith('/api/') || url.hostname !== self.location.hostname) {
    e.respondWith(fetch(e.request).catch(() =>
      new Response(JSON.stringify({ success: false, message: 'Offline hain. Internet check karein.' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    ));
    return;
  }

  // HTML navigation → Network first, fallback to cache, then index.html
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => { caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone())); return res; })
        .catch(() => caches.match(e.request).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // Static assets → Cache first, network fallback
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
        }
        return res;
      });
    })
  );
});

// Push notifications (future ready)
self.addEventListener('push', (e) => {
  const data = e.data?.json() || { title: 'Gram Bazaar', body: 'Nayi notification!' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/gram-bazaar/shared/icons/icon-192.png',
      badge: '/gram-bazaar/shared/icons/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/'));
});
