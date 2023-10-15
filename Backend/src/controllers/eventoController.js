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

const obtenerEventoPorCodigo = (PK_evento_contenedor, callback) => {
  db.query(
    `SELECT * FROM evento_contenedor WHERE PK_evento_contenedor=${PK_evento_contenedor}`,
    (err, results) => {
      //Recuperar cualquier error del query
      if (err) {
        console.error("Error al realizar la consulta:", err);
        callback(err, null);
        return;
      }
      //Revisar si el results esta vacio
      if (results.length == 0) {
        console.warn("No se encontro el evento");
        callback(new Error("No se encontro el evento"), null);
        return;
      }
      console.log(results);
      // Devuelve los resultados de la consulta
      callback(null, results);
    }
  );
};

const updateEvent = (eventId, newEvent, callback) => {
  console.log(newEvent);

  const fechaInicio = newEvent.dia_inicio.split('T')[0]; // Obtener la parte de la fecha
  const fechaFinal = newEvent.dia_final.split('T')[0]; // Obtener la parte de la fecha

  //Realiza la consulta UPDATE en la base de datos para modificar el evento
  const sql = `UPDATE evento_contenedor
              SET nombre = ?,
                  descripcion = ?,
                  lugar = ?,
                  dia_inicio = ?,
                  dia_final = ?
              WHERE PK_evento_contenedor = ?`;

  const values = [
    newEvent.nombre,
    newEvent.descripcion,
    newEvent.lugar,
    fechaInicio,
    fechaFinal,
    newEvent.PK_evento_contenedor,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error al editar el evento:", err);
      callback(err, null);
      return;
    }
    //Revisar si el results esta vacio
    if (results.length == 0) {
      console.warn("No se encontro el evento");
      callback(new Error("No se encontro el evento"), null);
      return;
    }
    console.log(`Evento con ID ${eventId} editado correctamente`);
    callback(null, results);
  });
};

module.exports = {
  eventosAll,
  obtenerEventoPorCodigo,
  updateEvent,
};
