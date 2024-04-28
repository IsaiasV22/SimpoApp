const path = require("path");
const webpush = require("web-push");
const fs = require("fs");
const db = require("../../config/database.js");

const actividadController = require("./actividadController.js");

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
  subscriptions
    .filter((s) => {
      suscribers.includes(s);
    })
    .forEach((subscription) => {
      if (suscribers.includes(subscription.user)) {
        webpush
          .sendNotification(subscription, payload)
          .catch((err) => console.error(err));
      }
    });
};

//save suscription to db
const saveSubscriptionToDB = async (subscription, username) => {
  // Promesa para el primer query
  const insertIntoSimpoAppNotificacion = () => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO simpo_app_notificacion (PK_p256dh, endpoint, tiempo_expiracion, autenticador) VALUES (?, ?, ?, ?)",
        [subscription.keys.p256dh, subscription.endpoint, subscription.expirationTime, subscription.keys.auth],
        (err, results) => {
          if (err) {
            console.error("Error al realizar la consulta:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  };

  try {
    // Esperar a que se complete el primer query
    await insertIntoSimpoAppNotificacion();

    // Una vez que se complete el primer query, realizar el segundo
    await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO usuario_notificacion_simpo_app (FK_usuario, FK_simpo_app_notificacion) VALUES (?, ?)",
        [username, subscription.keys.p256dh],
        (err, results) => {
          if (err) {
            console.error("Error al realizar la consulta:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  } catch (error) {
    // Manejar cualquier error aquí
    return new Error(error.message);
  }
};


//notify some suscribers using db
const notifySomeSuscribersDB = (suscribers, payload) => {
  // Get current subscriptions
  let subscriptions = [];
  db.query(
    "SELECT * FROM suscripciones",
    (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        return new Error(err.message);
      }
      subscriptions = results;
      // Send notifications to all subscribers
      subscriptions
        .filter((s) => {
          suscribers.includes(s);
        })
        .forEach((subscription) => {
          if (suscribers.includes(subscription.user)) {
            webpush
              .sendNotification(subscription, payload)
              .catch((err) => console.error(err));
          }
        });
    }
  );
};

//get subscriptions
const getSubscriptions = async () => {
  // Get current subscriptions
  let subscriptions = [];
  try {
    //subscriptions = JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE_PATH));
    //get from db
    //get subscriptions using the async function
    subscriptions = await getAllSuscribers();

  } catch (error) {
    // If file does not exist or is empty, there are no previous subscriptions
    subscriptions = [];
  }

  return subscriptions;
};

//notify activity
const notifyActivityUpdate = async(activity) => {
  // Get payload from query
  const payload = JSON.stringify({
    title: activity.descripcion + " actualizada",
    body: "La actividad " + activity.descripcion + " ha sido actualizada",
    icon: "https://image.flaticon.com/icons/svg/139/139899.svg",
  });

  // Get subscriptions for the activity
  let subscriptions = await getSubscriptionsByActivity(activity);
  console.log("subscriptions from byActivity: ", subscriptions);
  // Send notifications to all subscribers
  subscriptions.forEach((subscription) => {
    webpush
      .sendNotification(subscription.subscription, payload)
      .catch((err) => console.error(err));
  });
};

const getUserSubscriptions = (username) => {
  return new Promise((resolve, reject) => {
    // Inicia la consulta a la base de datos
    db.query(
      "SELECT * FROM simpo_app_notificacion sn JOIN usuario_notificacion_simpo_app unsa ON sn.PK_p256dh = unsa.FK_simpo_app_notificacion JOIN usuario u ON unsa.FK_usuario = u.PK_nombre_usuario WHERE u.PK_nombre_usuario = ?",
      [username],
      (err, results) => {
        if (err) {
          console.error("Error al realizar la consulta:", err);
          reject(err);
        } else {
          // Resuelve la promesa con los resultados de la consulta
          resolve(results);
        }
      }
    );
  });
};

//all suscribers
const getAllSuscribers = () => {
  console.log("getAllSuscribers");
  return new Promise((resolve, reject) => {
    
    // Inicia la consulta a la base de datos
    db.query(
      "SELECT JSON_OBJECT('endpoint', sn.endpoint, 'expirationTime', sn.tiempo_expiracion, 'keys', JSON_OBJECT('p256dh', sn.PK_p256dh, 'auth', sn.autenticador), 'user', u.PK_nombre_usuario) AS notification FROM simpo_app_notificacion sn JOIN usuario_notificacion_simpo_app unsa ON sn.PK_p256dh = unsa.FK_simpo_app_notificacion JOIN usuario u ON unsa.FK_usuario = u.PK_nombre_usuario",
      (err, results) => {
        if (err) {
          console.error("Error al realizar la consulta:", err);
          reject(err);
        } else {
          // Resuelve la promesa con los resultados de la consulta
          resolve(results);
        }
      }
    );
  });
}

const getSubscriptionsByActivity = (activity) => {
//get subscriptions from database
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT JSON_OBJECT('endpoint', sn.endpoint,'expirationTime', sn.tiempo_expiracion,'keys', JSON_OBJECT('p256dh', sn.PK_p256dh,'auth', sn.autenticador )) AS subscription FROM calendario_u cu JOIN usuario_notificacion_simpo_app unsa ON cu.FK_usuario = unsa.FK_usuario JOIN simpo_app_notificacion sn ON unsa.FK_simpo_app_notificacion = sn.PK_p256dh WHERE cu.F_actividad = ?",
      [activity.PK_actividad],
      (err, results) => {
        if (err) {
          console.error("Error al realizar la consulta:", err);
          reject(err);
        } else {
          // Resuelve la promesa con los resultados de la consulta
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  saveSubscriptionToFile,
  notifySomeSuscribers,
  getSubscriptions,
  notifyActivityUpdate,
  saveSubscriptionToDB,
};
