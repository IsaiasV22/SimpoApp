const db = require("../../config/database.js");
const bcrypt = require("bcryptjs");

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

const obtenerUsuarioPorUsername = (username, callback) => {
  db.query(
    `SELECT * FROM usuario WHERE PK_nombre_usuario="${username}"`,
    (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        callback(err, null);
        return;
      }
      //Revisar si el results esta vacio
      if (results.length == 0) {
        console.warn("No se encontro el usuario");
        return callback(
          new Error(
            "Nombre de usuario invalido \n" +
              "1-Por favor, verifique que el nombre de usuario sea correcto \n" +
              "2-Si no tiene una cuenta, por favor, cree una dando click en el boton de 'Register' \n" +
              "este lo redireccionara a la pagina de registro, \n" +
              "donde podra crear una cuenta siguiento las instrucciones de dicha pagina\n" +
              "3-Si ya tiene una cuenta y no recuerda su nombre de usuario, \n" +
              "por favor, contacte al administrador del sistema en la seccion de 'Soporte' \n"
          ),
          null
        );
      }

      // Verifica que el campo PK_nombre_usuario sea igual al username
      //assert.strictEqual(results[0].PK_nombre_usuario, username, 'El nombre de usuario no coincide');

      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const estaSuscritoA = (evento, username, callback) => {
  db.query(
    `SELECT * FROM participacion_usuario WHERE FK_evento_contenedor=${evento} AND FK_usuario="${username}"`,
    (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        callback(err, null);
        return;
      }

      // Revisar si hay resultados
      const estaSuscrito = results.length > 0;

      // Devuelve true si está suscrito, false si no está suscrito
      callback(null, estaSuscrito);
    }
  );
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

function login(userName, userPassword, callback) {
  try {
    obtenerUsuarioPorUsername(userName, (err, user) => {
      if (err) {
        return callback(err, null);
      }
      //Verifica que las contraseñas coincidan
      verifyPassword(userPassword, user[0].password)
        .then((passwordMatch) => {
          // Si las contraseñas no coinciden, devuelve un error
          if (!passwordMatch) {
            return callback(
              new Error(
                "Contraseña incorrecta" +
                  "1-Por favor, verifique que la contraseña este bien escrita \n" +
                  "2-Si no recuerda su contraseña, por favor, contacte al administrador del sistema en la seccion de 'Soporte' \n"
              ),
              null
            );
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

//Funcion para recuperar las actividades del calendario del usuario logueado
const obtenerActividadesCalendario = (username, callback) => {
  db.query(
    `SELECT * FROM actividad INNER JOIN calendario_u ON actividad.PK_actividad = calendario_u.F_actividad WHERE calendario_u.FK_usuario="${username}"`,
    (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        callback(err, null);
        return;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

//Funcion para recuperar la lista total de usuarios del sistema
const obtenerListaUsuarios = (evento, callback) => {
  db.query(
    `SELECT u.*, 
      CASE 
          WHEN pu.FK_evento_contenedor IS NOT NULL THEN 'Suscrito'
          ELSE 'No Suscrito'
      END AS estado_suscripcion
    FROM usuario u
    LEFT JOIN participacion_usuario pu
    ON u.PK_nombre_usuario = pu.FK_usuario
      AND pu.FK_evento_contenedor = ${evento}
      WHERE u.FK_rol <> 1;`,
    (err, results) => {
      if (err) {
        console.error(
          "Error al realizar la consulta(obtenerListaUsuarios):",
          err
        );
        callback(err, null);
        return;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const participacionExiste = (FK_evento_contenedor, FK_usuario, callback) => {
  db.query(
    `SELECT * FROM participacion_usuario WHERE FK_evento_contenedor=${FK_evento_contenedor} AND FK_usuario="${FK_usuario}"`,
    (err, results) => {
      if (err) {
        console.error("Error al buscar el registro:", err);
        callback(err, null);
        throw err;
      }
      if (results.length === 0) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    }
  );
};

const participacionAdd = (FK_evento_contenedor, FK_usuario, callback) => {
  db.query(
    `INSERT INTO participacion_usuario (FK_evento_contenedor, FK_usuario, tipo_participante) VALUES (${FK_evento_contenedor},"${FK_usuario}", "Oyente")`,
    (err, results) => {
      if (err) {
        console.error("Error al añadir participacion:", err);
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const participacionDelete = (FK_evento_contenedor, FK_usuario, callback) => {
  db.query(
    `DELETE FROM participacion_usuario WHERE FK_evento_contenedor=${FK_evento_contenedor} AND FK_usuario="${FK_usuario}"`,
    (err, results) => {
      if (err) {
        console.error("Error al eliminar participacion:", err);
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

module.exports = {
  usuariosAll,
  obtenerUsuarioPorCedula,
  obtenerUsuarioPorUsername,
  estaSuscritoA,
  login,
  obtenerActividadesCalendario,
  obtenerListaUsuarios,
  participacionExiste,
  participacionAdd,
  participacionDelete,
};
