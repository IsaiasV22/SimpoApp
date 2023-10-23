const express = require("express");
const router = express.Router();
const path = require("path");
const webpush = require("web-push");
const fs = require("fs");

router.use(express.json());

//static path
router.use(express.static(path.join(__dirname, "../../public")));

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

//json file
const SUBSCRIPTIONS_FILE_PATH = path.join(
  __dirname,
  "../../config/suscripciones.json"
);
console.log(SUBSCRIPTIONS_FILE_PATH);

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

router.post("/suscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  //save subscription in file
  saveSubscriptionToFile(subscription);

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
  // Send 201 - resource created
  res.status(201).json({});
});

module.exports = router;

function saveSubscriptionToFile(subscription) {
  // Carga las suscripciones existentes desde el archivo (si existe)
  console.log("File path from save function -> ", SUBSCRIPTIONS_FILE_PATH);
  let subscriptions = [];
  try {
    subscriptions = JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE_PATH));
  } catch (error) {
    // Si el archivo no existe o está vacío, no hay suscripciones previas
    subscriptions = [];
  }

  // Agrega la nueva suscripción al arreglo
  subscriptions.push(subscription);

  // Guarda el arreglo actualizado en el archivo JSON
  fs.writeFileSync(SUBSCRIPTIONS_FILE_PATH, JSON.stringify(subscriptions));
}
