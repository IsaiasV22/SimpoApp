const db = require("../../config/database.js");

const eventosAll = (callback) => {
  db.query("SELECT * FROM evento_contenedor", (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

const obtenerEventoPorCodigo = (codigo, callback) => {
  db.query(
    `SELECT * FROM evento_contenedor WHERE codigo=${codigo}`,
    (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        callback(err, null);
        return;
      }
      console.log(results);
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

module.exports = {
  eventosAll,
  obtenerEventoPorCodigo,
};
