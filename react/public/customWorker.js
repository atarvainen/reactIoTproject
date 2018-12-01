var CACHE_NAME = 'my-cache';
//url to precache in install
var urlsToCache = [
];

self.addEventListener('install', (event) => {
    // Perform install steps
    // Prevent browser from stopping worker before installation is over
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Add all urls to cache
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {

    // If fetch method is not get, let browser handle
    if (event.request.method != 'GET') return;
    console.log("fetching with worker");
    event.respondWith(
        
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Try to match request with cache
                return cache.match(event.request)
                    .then((response) => {
                        return response || fetch(event.request)
                            .then((response) => {
                                // Add request to cache
                                cache.put(event.request, response.clone());
                                return response;
                            });
                    });
            })
    );
});