const db = require("../../config/database.js");

const solicitudAyudaAll = (callback) => {
  db.query("SELECT * FROM solicitud_ayuda", (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }
    // Devuelve los resultados de la consulta
    results.sort((a, b) => (a.PK_solicitud_ayuda > b.PK_solicitud_ayuda ? -1 : 1));    
    callback(null, results);
  });
};

const solicitudAyudaAdd = (nombre_usuario, correo, descripcion, callback) => {
  const sql = `INSERT INTO solicitud_ayuda (nombre_usuario, correo, descripcion, estado) VALUES (?, ?, ?, 0);`;
  db.query(sql, [nombre_usuario, correo, descripcion], (err, results) => {
    if (err) {
      console.error("Error al añadir solicitud de ayuda:", err);
      callback(err, null);
      throw err;
    }
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

//Realiza la consulta para modificar el atributo activo del evento a 1
const solvedSolicitudAyuda = (solicitudAyudaId, callback) => {
  db.query(
    `UPDATE solicitud_ayuda SET estado=1 WHERE PK_solicitud_ayuda=${solicitudAyudaId}`,
    (err, results) => {
      if (err) {
        console.error(
          "Error al establecer solicitud_ayuda como resuelto: ",
          err
        );
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

//Realiza la consulta para modificar el atributo activo del evento a 1
const unsolvedSolicitudAyuda = (solicitudAyudaId, callback) => {
  db.query(
    `UPDATE solicitud_ayuda SET estado=0 WHERE PK_solicitud_ayuda=${solicitudAyudaId}`,
    (err, results) => {
      if (err) {
        console.error(
          "Error al establecer solicitud_ayuda como pendiente: ",
          err
        );
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const deleteSolicitudAyuda = (solicitudAyudaId, callback) => {
  db.query(
    `DELETE FROM solicitud_ayuda WHERE PK_solicitud_ayuda=${solicitudAyudaId}`,
    (err, results) => {
      if (err) {
        console.error("Error al eliminar solicitud_ayuda", err);
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

module.exports = {
  solicitudAyudaAll,
  solicitudAyudaAdd,
  solvedSolicitudAyuda,
  unsolvedSolicitudAyuda,
  deleteSolicitudAyuda,
};
