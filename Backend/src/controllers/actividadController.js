const db = require("../../config/database.js");
const { use } = require("../routes/usuarioRouter.js");

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

const obtenerActividadesPorEvento = (evento, callback) => {
  db.query(
    `SELECT * FROM actividad WHERE FK_evento_contenedor=${evento}`,
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

//Obtener solo las actividades con estatus=1 por evento
const obtenerActividadesActivasPorEvento = (evento, callback) => {
  db.query(
    `SELECT * FROM actividad WHERE FK_evento_contenedor=${evento} AND estatus=1`,
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

//obtenerActividadPorId
const obtenerActividadPorId = (id, callback) => {
  db.query(
    `SELECT * FROM actividad WHERE PK_actividad=${id}`,
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

const actividadAdd = (id, username, callback) => {
  db.query(
    `INSERT INTO calendario_u (F_actividad, FK_usuario) VALUES (${id},"${username}")`,
    (err, results) => {
      if (err) {
        console.error("Error al añadir actividad:", err);
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const actividadDelete = (id, username, callback) => {
  db.query(
    `DELETE FROM calendario_u WHERE F_actividad=${id} AND FK_usuario="${username}"`,
    (err, results) => {
      if (err) {
        console.error("Error al añadir actividad:", err);
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const updateActivity = (newActivity, callback) => {
  //Se espera recibir el dia y cada hora por separado
  const dia_inicio = newActivity.dia_evento.split("T")[0]; // Obtener la parte de la fecha

  /* const hora_inicio = newActivity.hora_inicio.split("T")[1]; // Obtener la parte de la hora
  console.log(hora_inicio); */

  //No se actualiza el tema, el taller ni el evento contenedor
  const sql = `UPDATE actividad
              SET descripcion = ?,
                  descripcion_d = ?,
                  dia_evento = ?,
                  hora_inicio = ?,
                  hora_final = ?,    
                  ubicacion = ?,
                  estatus = ?
              WHERE PK_actividad = ?`;

  const values = [
    newActivity.descripcion,
    newActivity.descripcion_d,
    dia_inicio,
    newActivity.hora_inicio,
    newActivity.hora_final,
    newActivity.ubicacion,
    newActivity.estatus,
    newActivity.PK_actividad,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error al editar la actividad:", err);
      callback(err, null);
      return;
    }
    if (results.length == 0) {
      console.warn("No se encontro la actividad");
      callback(new Error("No se encontro la actividad"), null);
      return;
    }
    console.log(
      `Actividad con PK ${newActivity.PK_actividad} editada correctamente`
    );
    callback(null, results);
  });
};

//Mostrar actividad
const mostrarActividad = (id, callback) => {
  db.query(
    `UPDATE actividad SET estatus=1 WHERE PK_actividad=${id}`,
    (err, results) => {
      if (err) {
        console.error("Error al mostrar la actividad:", err);
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

//Ocultar actividad
const ocultarActividad = (id, callback) => {
  db.query(
    `UPDATE actividad SET estatus=0 WHERE PK_actividad=${id}`,
    (err, results) => {
      if (err) {
        console.error("Error al ocultar la actividad:", err);
        callback(err, null);
        throw err;
      }
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const registroExiste = (id,username,callback) => {
  db.query(`SELECT * FROM calendario_u WHERE F_actividad=${id} AND FK_usuario="${username}"`, (err, results) => {
    if (err) {
      console.error("Error al añadir actividad:", err);
      callback(err, null);
      throw err;
    }
    console.log("results -> "+results);
    if(results.length===0){
      console.log("No existe el registro");
      callback(null, false);
    }
    else{
      console.log("Ya existe el registro");
      callback(null, true);
    }
  });
};

//obtener username de usuarios con actividad en calendario
const obtenerUsuariosActividad = (PK_actividad, callback) => {
  console.log("pk actividad: " + PK_actividad);
  db.query(
    `select FK_usuario from calendario_u where F_actividad =${PK_actividad}`,
    (err, results) => {
      //Recuperar cualquier error del query
      if (err) {
        console.error("Error al realizar la consulta:", err);
        callback(err, null);
        return;
      }
      //Revisar si el results esta vacio
      if (results.length == 0) {
        console.warn("No users found");
        callback(new Error("No users found"), null);
        return;
      }
      //console.log(results.reduce((acc, curr) => [...acc,curr.FK_usuario], []));
      // Devuelve los resultados de la consulta
      callback(null, results.reduce((acc, curr) => [...acc,curr.FK_usuario], []));
    }
  );
};

module.exports = {
  actividadesAll,
  obtenerActividadesPorEvento,
  obtenerActividadesActivasPorEvento,
  obtenerActividadPorId,
  actividadAdd,
  registroExiste,
  actividadDelete,
  updateActivity,
  mostrarActividad,
  ocultarActividad,
  obtenerUsuariosActividad,
};
