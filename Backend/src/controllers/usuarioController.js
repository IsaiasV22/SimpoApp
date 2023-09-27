const db = require('../../config/database.js');

const usuariosAll = (callback)=>{
  db.query('SELECT * FROM usuario', (err, results) => {
      if (err) {
        console.error('Error al realizar la consulta:', err);
        callback(err, null);
        return;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    });
};

const obtenerUsuarioPorCedula = (cedula, callback) => {
  db.query(`SELECT * FROM usuario WHERE cedula=${cedula}`, (err, results) => {
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
  usuariosAll,
  obtenerUsuarioPorCedula,
};
