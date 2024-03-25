const db = require("../../config/database.js");
const usuarioController = require("./usuarioController.js");

const util = require("util");

const obtenerPonentePorActividadId = (actividadId, callback) => {
  db.query(
    `SELECT FK_usuario_remitente FROM actividad WHERE PK_actividad=${actividadId}`,
    (err, results) => {
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

      const usuarioId = results[0].FK_usuario_remitente;
      console.log("Usuario encontrado:", usuarioId);
      usuarioController.obtenerUsuarioPorUsername(usuarioId, (error, user) => {
        if (error) {
          console.error("Error al obtener el usuario:", error);
          callback(error, null);
          return;
        }

        // Devuelve los resultados de la consulta
        callback(null, user);
      });
    }
  );
};

const obtenerCoautoresPorActividadId = (actividadId, callback) => {
  db.query(
    ` SELECT FK_usuario FROM presentacion_usuario_actvidad WHERE FK_actividad=${actividadId}`,
    (err, results) => {
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

      const usuariosIds = results.map((result) => result.FK_usuario);
      console.log("Usuarios Ids encontrados:", usuariosIds);
     
      //por cada id de usuario, obtener el usuario
      const promises = usuariosIds.map((usuarioId) => {
        return new Promise((resolve, reject) => {
          usuarioController.obtenerUsuarioPorUsername(usuarioId, (error, user) => {
            if (error) {
              console.error("Error al obtener el usuario:", error);
              reject(error);
              return;
            }

            resolve(user);
          });
        });
      });
      Promise.all(promises)
      .then((usuarios) => {
        //console.log("Usuarios encontrados:", usuarios);
        callback(null, usuarios);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
        callback(error, null);
      });
    }
  );
}


module.exports = {
  obtenerPonentePorActividadId,
  obtenerCoautoresPorActividadId,
};
