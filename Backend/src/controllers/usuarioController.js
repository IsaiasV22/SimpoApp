const db = require("../../config/database.js");
const bcrypt = require('bcryptjs');

const usuariosAll = (callback) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
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
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }
    //Revisar si el results esta vacio
    if (results.length == 0) {
      console.warn("No se encontro el usuario");
      callback(new Error("No se encontro el usuario"), null);
      return;
    }
    //console.log(results);
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

// Función para verificar el login correctamente
async function verifyPassword(password, hashedPassword) {
  try {
      const result = await bcrypt.compare(password, hashedPassword);
      console.log("Resultado de la verificación:", result);
      return result;
  } catch (error) {
      console.error("Error durante la verificación:", error);
      return false;
  }
}

function login(userCedula, userPassword, callback) {
  try {
    obtenerUsuarioPorCedula(userCedula, (err, user) => {
      if (err) {
        return callback(err, null);
      }
      
      //Verifica que las contraseñas coincidan
      verifyPassword(userPassword, user[0].password)
        .then((passwordMatch) => {
          // Si las contraseñas no coinciden, devuelve un error
          if (!passwordMatch) {
            return callback(new Error("Contraseña incorrecta"), null);
          }

          // Devuelve el usuario si el inicio de sesión es exitoso
          callback(null, user);
        })
        .catch((error) => {
          callback(error, null);
        });
    });
  } catch (error) {
    callback(error, null);
  }
}

module.exports = {
  usuariosAll,
  obtenerUsuarioPorCedula,
  login
};
