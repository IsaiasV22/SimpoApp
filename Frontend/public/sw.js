console.log("Service worker loaded");

//intercept any push notification and show it
self.addEventListener("push", async function (event) {
  console.log("Push notification intercepted by sw -> ", event);
  try {
    //check if notification permission is granted
    if (Notification.permission !== "granted") {
      console.log("Notification permission not granted");
      await Notification.requestPermission();
      return;
    }
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

//intercept any fetch request and console log the url
self.addEventListener("fetch", function (event) {
  console.log("Fetch intercepted by sw -> ", event.request.url);
});
