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
  //save subscription in session
  req.session.user.subscription = subscription.keys.p256dh;
  console.log('saving subscription in session -> ', subscription)
  console.log('session -> ', req.session)
  req.session.save();

  //save subscription in file
  //pwaController.saveSubscriptionToFile(subscription);

  //save subscription in db
  pwaController.saveSubscriptionToDB(subscription, subscription.user);

});

//unsubscribe
router.delete("/unsubscribe", async (req, res) => {
  console.log("Inside /unsubscribe");
  // user and subscription in session?
  //get user from session
  console.log("req.session -> ", req.session);
  const user = req.session.user.PK_nombre_usuario;
  //get subscription from session
  const subscription = req.session.user.subscription;

  console.log("user -> ", user);
  console.log("subscription -> ", subscription);

  if (!user || !subscription) {
    console.log("User or subscription not found");
    return res.status(404).json({ error: "User or subscription not found" });
  }
  try {
    //delete subscription from db
    await pwaController.deleteSubscriptionFromDB(user, subscription);
    // Send 200 - OK
    res.status(200).json({});
    //delete subscription from session
    //req.session.subscription = null;
  } catch (error) {
    console.error("Error deleting subscription from db -> ", error);
    res.status(500).json({ error: "Error deleting subscription from db" });
  }
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
