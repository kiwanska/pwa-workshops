const { assets } = global.serviceWorkerOption;

const CACHE_NAME = 'cache-v3'
const URLS_TO_IGNORE = ['chrome-extension', 'sockjs-node'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(assets)
      .catch(err => console.log(err))
  ));
});

self.addEventListener('activate', event => {
  console.log('activate');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
  )
})

const fromNetwork = (request, timeout) => (
  new Promise((fulfill, reject) => {
    var timeoutId = setTimeout(reject, timeout);
    return fetch(request)
      .then(response => {
        clearTimeout(timeoutId);
        fulfill(response);
      })
  })
)

const fromCache = (request) => {
  console.log('bongo')
  return caches.open(CACHE_NAME)
    .then((cache) => cache.match(request)
      .then((matching) => {
        console.log(new Response(request))
        return matching || new Response(request)
      })
)};

// self.addEventListener('fetch', event => {
//   console.log('fetch');
//   event.respondWith(fromNetwork(event.request, 400)
//     .catch(() => fromCache(event.request)
//   ));
// });

self.addEventListener("fetch", event => {
  const request = event.request;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(response => {
        if (response) {
          return response;
        }

        if (!navigator.isOnline && request.headers.get('accept').includes('text/html')) {
          return cache.match(new Request("/index.html"));
        }

        return fetchAndUpdate(request);
      });
    })
  );
});

function fetchAndUpdate(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return fetch(request).then(response => {
      if (!response.url) return response;

      cache.put(request, response.clone());
      return response;
    });
  });
}
