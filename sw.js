const CACHE_NAME = 'kalamashada-v2';
const PRECACHE = [
    './',
    './index.html',
    './manifest.json',
    './assets/css/base.css',
    './assets/css/components.css',
    './assets/css/pages.css',
    './assets/js/app.js',
    './assets/js/components/navbar.js',
    './assets/js/components/modal.js',
    './assets/js/components/toast.js',
    './assets/js/components/gallery-lightbox.js',
    './assets/js/pages/home.js',
    './assets/js/pages/calendar.js',
    './assets/js/pages/alumni.js',
    './assets/js/pages/gallery.js',
    './assets/js/pages/admin.js',
    './assets/js/data/events.js',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((c) => c.addAll(PRECACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Network-first for JSON data; cache-first for static assets
self.addEventListener('fetch', (e) => {
    const { request } = e;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    const isData = url.pathname.includes('/data/') || url.pathname.endsWith('.json');

    if (isData) {
        e.respondWith(
            fetch(request)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(request, copy));
                    return res;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    e.respondWith(
        caches.match(request).then((cached) => {
            const fetched = fetch(request)
                .then((res) => {
                    if (res.ok) {
                        const copy = res.clone();
                        caches.open(CACHE_NAME).then((c) => c.put(request, copy));
                    }
                    return res;
                })
                .catch(() => cached);
            return cached || fetched;
        })
    );
});
