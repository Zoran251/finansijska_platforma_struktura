// service-worker.js
const CACHE_NAME = 'golden-balance-v1.0.0';
const ASSETS_TO_CACHE = [
    './',
    './preview-fixed.html',
    './profile.html',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './css/modals.css',
    './css/profil.css',
    './css/support-chat.css',
    './js/app.js',
    './js/auth.js',
    './js/storage.js',
    './js/cache.js',
    './js/validation.js',
    './js/security.js',
    './js/error-handler.js',
    './js/activity-logger.js',
    './js/notification.js',
    './js/network.js',
    './js/performance-monitor.js',
    './js/settings-manager.js',
    './js/ui-manager.js',
    './js/data-validator.js',
    './js/data-export.js',
    './js/sync.js',
    './js/admin.js',
    './js/main.js',
    './js/chat.js',
    './js/support.js',
    './js/finansijskiKalkulator.js',
    './js/investment-calculator.js',
    './js/booking.js',
    './js/consultation.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app resources');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                
                // Clone the request because it's a one-time use
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response because it's a one-time use
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});
