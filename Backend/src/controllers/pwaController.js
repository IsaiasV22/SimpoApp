const path = require("path");
const webpush = require("web-push");
const fs = require("fs");

const SUBSCRIPTIONS_FILE_PATH = path.join(
    __dirname,
    "../../config/suscripciones.json"
  );
  console.log(SUBSCRIPTIONS_FILE_PATH);

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

  //notify some suscribers
const notifySomeSuscribers = (suscribers, payload) => {
    // Get current subscriptions
    let subscriptions = [];
    try {
      subscriptions = JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE_PATH));
    } catch (error) {
      // If file does not exist or is empty, there are no previous subscriptions
      subscriptions = [];
    }
  
    // Send notifications to all subscribers
    subscriptions.filter((s) => {suscribers.includes(s)}).forEach((subscription) => {
      if (suscribers.includes(subscription.user)) {
        webpush
          .sendNotification(subscription, payload)
          .catch((err) => console.error(err));
      }
    });
  
    
  }

  //get subscriptions
    const getSubscriptions = () => {
        // Get current subscriptions
        let subscriptions = [];
        try {
        subscriptions = JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE_PATH));
        } catch (error) {
        // If file does not exist or is empty, there are no previous subscriptions
        subscriptions = [];
        }
    
        return subscriptions;
    }

  module.exports = {
    saveSubscriptionToFile,
    notifySomeSuscribers,
    getSubscriptions
  }