const db = require("../../config/database.js");
const { promisify } = require("util");
//pomisify will convert db.query into a promise
const dbQuery = promisify(db.query).bind(db);
//pwacontroller.js
const pwaController = require("./pwaController.js");
//actividadController.js
const actividadController = require("./actividadController.js");

// Obtener todos los recordatorios
//fetch to mock server for now
exports.getRecordatorios = async (req, res) => {
  try {
    //get from database
    const id = req.params.id;
    console.log("id:", id);
    //SELECT * FROM RECORDATORIO WHERE FK_ACTIVIDAD = 1;
    const results = await dbQuery(
      `SELECT * FROM recordatorio WHERE FK_ACTIVIDAD = ${id}`
    );
    if (results.length == 0)
      res.status(204).json({ message: "No se encontraron recordatorios" });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener recordatorios" });
  }
};

exports.postRecordatorio = async (req, res) => {
  try {
    console.log("body:", req.body);
    const recordatorio = req.body.recordatorio;
    const actividadId = req.body.id;
    //insert into database
    //INSERT INTO recordatorio (recordatorio, FK_ACTIVIDAD) VALUES ('recordatorio', 1);
    const response = await dbQuery(
      `INSERT INTO recordatorio (recordatorio, FK_ACTIVIDAD) VALUES ('${recordatorio}', ${actividadId})`
    );

    console.log("values:", recordatorio, actividadId);
    if (response.affectedRows > 0) {
      //notify subscribed users
      const payload = await recordatorioNotificationPayload(
        actividadId,
        recordatorio
      );
      console.log("payload:", payload);
      //send notification
      pwaController.notifyActivityReminder(actividadId, payload);

      res.status(204).json({ message: "Recordatorio guardado correctamente" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al guardar recordatorio" });
  }
};

const recordatorioNotificationPayload = async (activityId, recordatorio) => {
  return new Promise((resolve, reject) => {
    try {
      // Obtener la actividad por su ID
      actividadController.obtenerActividadPorId(activityId, (err, activity) => {
        if (err) {
          // Si hay un error al obtener la actividad, rechazar la promesa con el error
          reject(err);
          return;
        }
        // Si se obtiene la actividad correctamente, construir el payload
        const payload = JSON.stringify({
          title: activity[0].descripcion + ' - ' + activity[0].PonenteNombre,
          body: "Recordatorio: " + recordatorio,
          icon: "https://www.ucr.ac.cr/medios/imagenes/2016/ucr.svg",
        });
        // Resolver la promesa con el payload
        resolve(payload);
      });
    } catch (error) {
      // Si ocurre un error, rechazar la promesa con el error
      reject(error);
    }
  });
};

