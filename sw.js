const files = [
  '/',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/restaurant.html',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/js/main.js',

];

const staticCacheName = 'restaurant-static-v2';


//cache files
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(files)
    })
  );
});


//update files
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(cacheName => {
        if(cacheName !== staticCacheName) {
          caches.delete(cacheName);
        }
      }))

    })
  );
})


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
    .catch(e => console.log(e))
  );
});
