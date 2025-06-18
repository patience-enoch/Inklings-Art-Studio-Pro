20. Fixed sw.js

const CACHE_NAME = 'inklings-art-studio-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/components.css',
  '/css/themes.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/utils.js',
  '/js/effects.js',
  '/js/text-art.js',
  '/js/ar-system.js',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-96x96.png',
  '/apple-icon-57x57.png',
  '/apple-icon-60x60.png',
  '/apple-icon-72x72.png',
  '/apple-icon-76x76.png',
  '/apple-icon-114x114.png',
  '/apple-icon-120x120.png',
  '/apple-icon-144x144.png',
  '/apple-icon-152x152.png',
  '/apple-icon-180x180.png',
  '/android-icon-192x192.png',
  '/ms-icon-144x144.png',
  '/manifest.json',
  '/browserconfig.xml'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache for Inklings Art Studio Pro');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error('Cache installation failed:', error);
      })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request)
          .catch(function(error) {
            console.error('Fetch failed:', error);
            throw error;
          });
      })
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle background sync tasks
  console.log('Background sync triggered for Inklings Art Studio Pro');
  return Promise.resolve();
}

// Push notification handling
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/android-icon-192x192.png',
    badge: '/favicon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/android-icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Inklings Art Studio Pro', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
  console.log('Inklings Art Studio Pro notification click received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});


Changes made to sw.js:
1. Updated cache name to reflect the new app name: `inklings-art-studio-pro-v1`
2. Added `/index.html` to the `urlsToCache` array
3. Updated console log messages to reflect the new app name
4. Ensured all icon paths are correct
5. Ensured the code is well-formatted and valid


Now that I've debugged all the files, please try running the app again and let me know if you still encounter any issues.
