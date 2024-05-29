console.log("Service worker loaded");

//cache name
const cache = "simpoapp_cache_v2_stale_while_revalidate";

// paths to network first
const pathsToNetworkFirst = [
  "solicitudesAyuda/all",
  "eventos/ocultarEvento",
  "eventos/mostrarEvento",
  "estadisticas/AllSimposiosAllDetails"
];

//intercept any push notification and show it
self.addEventListener("push", function (event) {
  console.log("Push notification intercepted by sw -> ", event);
  try {
    const data = event.data.json();

    //console.log("Push notification data -> ", data);
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
    });
  } catch (err) {
    console.error(err);
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) {
            return name !== cacheName;
          })
          .map(function (name) {
            return caches.delete(name);
          })
      );
    })
  );
});

//intercept any fetch request and console log the url
self.addEventListener("fetch", function (event) {
  // network first
  /*
  This strategy is ideal for assets that are updated frequently, such as API endpoints.
  */
  if (pathsToNetworkFirst.some((path) => event.request.url.includes(path))) {
    console.log("Network first -> ", event.request.url);
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          //update cache
          caches.open(cache).then(function (cache) {
            cache.put(event.request, response.clone());
          });
          return response;
        })
        .catch(function () {
          return caches.match(event.request);
        })
    );
    return;
  }

  //stale while revalidate
  /*
  This strategy returns cached data while asynchronously revalidating it in the background.
  Provides both fast response times with cached data and ensures the cache is updated with the latest data.
  */
  event.respondWith(
    caches.open(cache).then(function (cache) {
      return cache.match(event.request).then(function (cachedResponse) {
        var fetchPromise = fetch(event.request)
          .then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          .catch(function () {
            return cachedResponse;
          });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
