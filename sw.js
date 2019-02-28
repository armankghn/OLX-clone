
var CACHE_NAME = 'my-web-app-olx';
var urlsToCache = [
  './',
    '/index.html',
    '/home.html',
    '/adsform.html',
    '/currentAd.html',
    '/favourite.html',
    '/buyerChat.html',
    '/sellerChat.html',
    '/manifest.json',
    '/css/main.css',
    '/css/buyerChat.css',
    '/css/freelancer.css',
    '/css/freelancer.min.css',
     '/css/freelancer.css',
     '/css/freelancer.min.css',
    'js/app.js',
    'js/categorizeData.js',
    'js/contact_me.js',
    'js/contact_me.min.js',
    'js/currentAd.js',
    'js/freelancer.js',
    'js/freelancer.min.js',
    'js/buyerChat.js',
    'js/sellerChat.js',
    'js/jqBootstrapValidation.js',
    'js/jqBootstrapValidation.min.js',
    
    
    
];

self.addEventListener('install', function(event) {
  // event.waitUntil takes a promise to know how
  // long the installation takes, and whether it 
  // succeeded or not.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // This method looks at the request and
    // finds any cached results from any of the
    // caches that the Service Worker has created.
    caches.match(event.request)
      .then(function(response) {
        // If a cache is hit, we can return thre response.
        if (response) {
          return response;
        }

        // Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the request.
        var fetchRequest = event.request.clone();
        
        // A cache hasn't been hit so we need to perform a fetch,
        // which makes a network request and returns the data if
        // anything can be retrieved from the network.
        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloning the response since it's a stream as well.
            // Because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                // Add the request to the cache for future queries.
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});




// const staticAssets = [
//     './',
//     '/index.html',
//     '/home.html',
//     '/adsform.html',
//     '/css/main.css',
//      '/css/freelancer.css',
//      '/css/freelancer.min.css',
//     'js/app.js',
//     'js/categorizeData.js'
//     //'js/retrieveData.js',
//     // 'js/search.js',
//     // 'signin.html',
//     // 'signup.html',
//     // 'adsform.html'
//     ];
    
//     self.addEventListener('install', (event) => {
//       event.waitUntil(
//         caches.open('v1')
//           .then(res => {
//             console.log('wait.........!')
//             return res.addAll(staticAssets);
//           })
//       );
//       console.log('installed');
//       // var cache = caches.open('v1');
//       // cache.addAll(staticAssets);
//     });
    
//     self.addEventListener('activate', (event) => {
//       console.log('activated');
//     });
    
//     self.addEventListener('fetch', function(event) {
//       console.log('Fetch from Service Worker ', event);
//       event.respondWith(
//         // This method looks at the request and
//         // finds any cached results from any of the
//         // caches that the Service Worker has created.
//         caches.match(event.request)
//           .then(function(response) {
//             // If a cache is hit, we can return thre response.
//             if (response) {
//               return response;
//             }
    
//             // Clone the request. A request is a stream and
//             // can only be consumed once. Since we are consuming this
//             // once by cache and once by the browser for fetch, we need
//             // to clone the request.
//             var fetchRequest = event.request.clone();
            
//             // A cache hasn't been hit so we need to perform a fetch,
//             // which makes a network request and returns the data if
//             // anything can be retrieved from the network.
//             return fetch(fetchRequest).then(
//               function(response) {
//                 // Check if we received a valid response
//                 if(!response || response.status !== 200 || response.type !== 'basic') {
//                   return response;
//                 }
    
//                 // Cloning the response since it's a stream as well.
//                 // Because we want the browser to consume the response
//                 // as well as the cache consuming the response, we need
//                 // to clone it so we have two streams.
//                 var responseToCache = response.clone();
    
//                 caches.open('v1-dynamic')
//                   .then(function(cache) {
//                     // Add the request to the cache for future queries.
//                     cache.put(event.request, responseToCache);
//                   });
    
//                 return response;
//               }
//             );
//           })
//         );
//     });
    
    // self.addEventListener('fetch', (ev) => {
    //   console.log('Fetch from Service Worker ', ev);
    //   const req = ev.request;
    //   const url = new URL(req.url);
    //   if (url.origin === location.origin) {
    //     ev.respondWith(cacheFirst(req));
    //   }
    //   return ev.respondWith(networkFirst(req));
    // });
    
    // async function cacheFirst(req) {
    //   let cacheRes = await caches.match(req);
    //   return cacheRes || fetch(req);
    // }
    
    // async function networkFirst(req) {
    //   const dynamicCache = await caches.open('v1-dynamic');
    //   try {
    //     const networkResponse = await fetch(req);
    //     dynamicCache.put(req, networkResponse.clone());
    //     return networkResponse;
    //   } catch (err) {
    //     const cacheResponse = await caches.match(req);
    //     return cacheResponse;
    //   }
    // }
    


    // addEventListener('fetch', event => {
    //   // Prevent the default, and handle the request ourselves.
    //   event.respondWith(async function() {
    //     // Try to get the response from a cache.
    //     const cachedResponse = await caches.match(event.request);
    //     // Return it if we found one.
    //     if (cachedResponse) return cachedResponse;
    //     // If we didn't find a match in the cache, use the network.
    //     return fetch(event.request);
    //   }());
    // });