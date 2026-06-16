const CACHE_NAME = 'reftrack-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/app.js'
];

// Instalar service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activar service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: network first, fallback to cache
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Actualizar cache con la respuesta
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar desde cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback para navegación
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            return new Response('Offline - recurso no disponible', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background sync (opcional - para sincronizar datos cuando vuelva conexión)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Aquí iría lógica para sincronizar datos guardados localmente
      Promise.resolve()
    );
  }
});

// Push notifications (opcional)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de RefTrack',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    tag: 'reftrack-notification'
  };

  event.waitUntil(
    self.registration.showNotification('RefTrack', options)
  );
});
