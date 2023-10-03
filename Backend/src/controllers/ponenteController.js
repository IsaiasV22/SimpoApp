const db = require("../../config/database.js");
const usuarioController = require("./usuarioController.js");

const obtenerPonentePorActividadId = (actividadId, callback) => {
  db.query(`SELECT FK_Usuario FROM presentacion_usuario_actvidad WHERE FK_actividad=${actividadId}`, (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }

    if (results.length === 0) {
      console.log("No se encontraron resultados.");
      callback(null, null);
      return;
    }

    const usuarioId = results[0].FK_Usuario;
    usuarioController.obtenerUsuarioPorUsername(usuarioId, (error, user) => {
      if (error) {
        console.error("Error al obtener el usuario:", error);
        callback(error, null);
        return;
      }

      // Devuelve los resultados de la consulta
      callback(null, user);
    });
  });
};

module.exports = {
  obtenerPonentePorActividadId
};
