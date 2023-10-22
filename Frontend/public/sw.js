//intercept any fetch request and console log the url
self.addEventListener('fetch', function(event) {
    console.log('Fetch intercepted by sw -> ',event.request.url);
});