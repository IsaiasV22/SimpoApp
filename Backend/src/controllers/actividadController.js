const db = require("../../config/database.js");

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

module.exports = {
  actividadesAll
};