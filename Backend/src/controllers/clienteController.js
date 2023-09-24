const db = require('../../config/database.js');

const obtenerEstatus = (callback)=>{
    db.query('SELECT * FROM estatus', (err, results) => {
        if (err) {
          console.error('Error al realizar la consulta:', err);
          callback(err, null);
          return;
        }
        // Devuelve los resultados de la consulta
        callback(null, results);
      });
};
module.exports = {
    obtenerEstatus
};