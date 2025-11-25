// Service Worker para Tuli - PWA
const CACHE_NAME = 'tuli-v1';
const RUNTIME_CACHE = 'tuli-runtime';

// Archivos estáticos para cachear durante la instalación
const STATIC_ASSETS = [
  '/',
  '/accounts',
  '/categories',
  '/summaries',
  '/manifest.json',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activar inmediatamente el nuevo SW
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Tomar control de todas las páginas inmediatamente
  return self.clients.claim();
});

// Estrategia de cache: Network First con fallback a cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear peticiones GET del mismo origen
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Estrategia Network First para HTML
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Guardar en cache runtime
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback a cache si no hay red
          return caches.match(request).then((cachedResponse) => {
            return (
              cachedResponse ||
              caches.match('/') // Fallback a la página principal
            );
          });
        })
    );
    return;
  }

  // Estrategia Cache First para assets estáticos
  if (
    request.url.includes('/icons/') ||
    request.url.includes('/_next/static/') ||
    request.url.match(/\.(css|js|woff2?|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // Para todo lo demás, intentar red primero
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Manejo de mensajes desde la aplicación
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
