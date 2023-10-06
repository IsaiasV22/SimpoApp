const db = require("../../config/database.js");
const { use } = require("../routes/usuarioRouter.js");

const actividadesAll = (callback) => {
  db.query("SELECT * FROM actividad", (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }
    // Devuelve los resultados de la consulta 
    callback(null, results);
  });
};

const obtenerActividadesPorEvento = (evento, callback) => {
  db.query(`SELECT * FROM actividad WHERE FK_evento_contenedor=${evento}`, (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

//obtenerActividadPorId
const obtenerActividadPorId = (id, callback) => {
  db.query(`SELECT * FROM actividad WHERE PK_actividad=${id}`, (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

const actividadAdd = (id,username,callback) => {
  db.query(`INSERT INTO calendario_u (F_actividad, FK_usuario) VALUES (${id},"${username}")`, (err, results) => {
    if (err) {
      console.error("Error al añadir actividad:", err);
      callback(err, null);
      throw err;
    }
    // Devuelve los resultados de la consulta 
    callback(null, results);
  });
};

module.exports = {
  actividadesAll,
  obtenerActividadesPorEvento,
  obtenerActividadPorId,
  actividadAdd
};