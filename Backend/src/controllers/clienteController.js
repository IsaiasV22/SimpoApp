/* const db = require('../../config/database.js');

const obtenerClientes = (callback)=>{
    db.query('SELECT * FROM cliente', (err, results) => {
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
    obtenerClientes
}; */