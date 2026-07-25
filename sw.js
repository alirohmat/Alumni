const CACHE_NAME = 'kalamashada-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/assets/css/base.css',
    '/assets/css/components.css',
    '/assets/css/pages.css',
    '/assets/js/app.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});