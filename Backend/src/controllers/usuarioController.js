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
  const sql = `SELECT * FROM usuario WHERE cedula=?`;
  db.query(sql, [cedula], (err, results) => {
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
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

const obtenerUsuarioPorUsername = (username, callback) => {
  const sql = `SELECT * FROM usuario WHERE PK_nombre_usuario=?`;
  db.query(sql, [username], (err, results) => {
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
  });
};

const estaSuscritoA = (evento, username, callback) => {
  const sql = `SELECT * FROM participacion_usuario WHERE FK_evento_contenedor=? AND FK_usuario=?`;
  db.query(sql, [evento, username], (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }

    // Revisar si hay resultados
    const estaSuscrito = results.length > 0;

    // Devuelve true si está suscrito, false si no está suscrito
    callback(null, estaSuscrito);
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

const obtenerActividadesCalendario = (username, callback) => {
  const sql = `SELECT * FROM actividad INNER JOIN calendario_u ON actividad.PK_actividad = calendario_u.F_actividad WHERE calendario_u.FK_usuario=?`;
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback(err, null);
      return;
    }
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

const obtenerListaUsuarios = (evento, callback) => {
  const sql = `SELECT u.*, 
      CASE 
          WHEN pu.FK_evento_contenedor IS NOT NULL THEN 'Suscrito'
          ELSE 'No Suscrito'
      END AS estado_suscripcion
    FROM usuario u
    LEFT JOIN participacion_usuario pu
    ON u.PK_nombre_usuario = pu.FK_usuario
      AND pu.FK_evento_contenedor = ?
      WHERE u.FK_rol <> 1;`;
  db.query(sql, [evento], (err, results) => {
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
  });
};

const participacionExiste = (FK_evento_contenedor, FK_usuario, callback) => {
  const sql = `SELECT * FROM participacion_usuario WHERE FK_evento_contenedor=? AND FK_usuario=?`;
  db.query(sql, [FK_evento_contenedor, FK_usuario], (err, results) => {
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
  });
};

const participacionAdd = (FK_evento_contenedor, FK_usuario, callback) => {
  const sql = `INSERT INTO participacion_usuario (FK_evento_contenedor, FK_usuario, tipo_participante, pagina, departamento, becado, comentarios) 
    VALUES (?, ?, "Oyente", "N/A", "N/A", 1, "N/A")`;
  db.query(sql, [FK_evento_contenedor, FK_usuario], (err, results) => {
    if (err) {
      console.error("Error al añadir participacion:", err);
      callback(err, null);
      throw err;
    }
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

const participacionDelete = (FK_evento_contenedor, FK_usuario, callback) => {
  const sql = `DELETE FROM participacion_usuario WHERE FK_evento_contenedor=? AND FK_usuario=?`;
  db.query(sql, [FK_evento_contenedor, FK_usuario], (err, results) => {
    if (err) {
      console.error("Error al eliminar participacion:", err);
      callback(err, null);
      throw err;
    }
    // Devuelve los resultados de la consulta
    callback(null, results);
  });
};

// TODO: meter la tabla en la BD
// Función para registrar la asistencia de un usuario a una actividad
const attendanceList = (activityId, username, callback) => {
  console.log("Inside attendanceList");
  console.log("activityId:", activityId);
  console.log("username:", username);

  // Primero, realizamos una consulta para verificar si el usuario ya ha sido registrado en la actividad
  const checkSql = `SELECT * FROM asistencia_actividad_evento WHERE FK_actividad=? AND FK_usuario=?`;
  db.query(checkSql, [activityId, username], (err, results) => {
    // Si hay un error en la consulta, lo registramos y devolvemos un mensaje de error
    if (err) {
      console.error("Error al realizar la consulta:", err);
      callback("Error al scannear QR", null);
      return;
    }
    // Si el usuario ya ha sido registrado en la actividad, devolvemos un mensaje indicando esto
    if (results.length > 0) {
      callback(
        "La asistencia del usuario ya fue registrada en esta actividad",
        null
      );
      return;
    }
    // Si el usuario no ha sido registrado en la actividad, intentamos insertar el registro
    const insertSql = `INSERT INTO asistencia_actividad_evento(FK_actividad, FK_usuario) VALUES (?, ?)`;
    db.query(insertSql, [activityId, username], (err, results) => {
      // Si hay un error en la consulta, lo registramos y devolvemos un mensaje de error
      if (err) {
        console.error("Error al realizar la consulta:", err);
        callback("Error al scannear QR", null);
        return;
      }
      // Si la inserción es exitosa, devolvemos un mensaje de éxito
      callback(null, "Asistencia del usuario registrada con éxito");
    });
  });
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
  attendanceList,
};
