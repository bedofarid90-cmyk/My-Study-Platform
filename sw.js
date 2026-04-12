const CACHE_NAME = 'zaker-offline-v1';
const urlsToCache = [
    './',
    './index.html',
    './lecture.html',
    './quiz.html',
    './style.css',
    './app.js'
];

// 1. تسطيب الملف وحفظ الموقع في الذاكرة
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// 2. تحديث الملفات لو في إصدار جديد
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
        })
    );
});

// 3. لما النت يقطع، هات الموقع من الذاكرة
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});