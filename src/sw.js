const { assets } = global.serviceWorkerOption;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1')
      .then((cache) => cache.addAll(assets)
      .catch(err => console.log(err))
  ));
});

self.addEventListener('activate', () => {
  console.log('2')
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('cache-v1')
      .then((cache) => cache.match('cache-v1')
      .catch(err => console.log(err))
  ));
});
