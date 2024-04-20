const express = require("express");
const router = express.Router();
const path = require("path");
const webpush = require("web-push");
//pwa controller
const pwaController = require("../controllers/pwaController.js");

router.use(express.json());

//static path
router.use(express.static(path.join(__dirname, "../../public")));

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

router.post("/suscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  //get user from session
  if (req.session.user.PK_nombre_usuario) {
    subscription.user = req.session.user.PK_nombre_usuario;
  }

  //save subscription in file
  //pwaController.saveSubscriptionToFile(subscription);

  //save subscription in db
  pwaController.saveSubscriptionToDB(subscription, subscription.user);

  // test notification

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
  // Send 201 - resource created
  res.status(201).json({});
});

//notify all suscribers
router.get("/notifyAll", async (req, res) => {
  // Get payload from query
  const payload = JSON.stringify({
    title: "Push Test from /notify",
    body: "Notified by SW!",
    icon: "https://image.flaticon.com/icons/svg/139/139899.svg",
  });

  // Get subscriptions from pwaController async function
  let subscriptions = [];
  try {
    subscriptions = await pwaController.getSubscriptions();
    console.log("subscriptions from /notifyAll -> ", subscriptions);
    //notify all suscribers after getting them asynchronically
    subscriptions.forEach((subscription) => {
      webpush
        .sendNotification(subscription.notification, payload)
        .catch((err) => console.error(err));
    });
  } catch (error) {
    // If file does not exist or is empty, there are no previous subscriptions
    subscriptions = [];
    console.error("Error getting subscriptions from /notifyAll -> ", error);
  }

  // Send 200 - OK
  res.status(200).json({});
});

module.exports = router;
