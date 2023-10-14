const db = require("../../config/database.js");
//actividadController
const actividadController = require("./actividadController.js");
//eventoController
const eventoController = require("./eventoController.js");
//ponenteController
const ponenteController = require("./ponenteController.js");
//usuarioController
const usuarioController = require("./usuarioController.js");
//to avoid using callbacks in the code
const { promisify } = require("util");
//pomisify will convert db.query into a promise
const dbQuery = promisify(db.query).bind(db);
//now dbQuery can be used as a promise (async/await)

//ALL INFO FROM ALL SIMPOSIOS
const AllSimposiosAllDetails = async () => {
  try {
    const results = await dbQuery(`SELECT 
                                    ec.nombre AS nombre_evento,
                                    ec.lugar AS lugar_evento,
                                    ec.dia_inicio,
                                    ec.dia_final,
                                    ec.activo,
                                    te.descripcion AS tipo_evento,
                                    a.descripcion AS descripcion_actividad,
                                    a.dia_evento,
                                    a.hora_inicio,
                                    a.hora_final,
                                    a.ubicacion AS ubicacion_actividad,
                                    u.nombre AS nombre_usuario,
                                    u.apellidos AS apellidos_usuario
                                FROM 
                                    evento_contenedor ec
                                JOIN 
                                    tipo_evento te ON ec.FK_tipo_evento = te.PK_tipo_evento
                                LEFT JOIN 
                                    actividad a ON ec.PK_evento_contenedor = a.FK_evento_contenedor
                                LEFT JOIN 
                                    calendario_u cu ON a.PK_actividad = cu.F_actividad
                                LEFT JOIN 
                                    usuario u ON cu.FK_usuario = u.PK_nombre_usuario;
                                `);
    return results;
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    throw error; // Propaga el error para que sea manejado en un nivel superior
  }
};

//INFO SPECIFIC SIMPOSIO
const SimposioDetails = async (id) => {
  try {
    const results = await dbQuery(
      `SELECT 
                                    ec.nombre AS nombre_evento,
                                    ec.lugar AS lugar_evento,
                                    ec.dia_inicio,
                                    ec.dia_final,
                                    ec.activo,
                                    te.descripcion AS tipo_evento,
                                    a.descripcion AS descripcion_actividad,
                                    a.dia_evento,
                                    a.hora_inicio,
                                    a.hora_final,
                                    a.ubicacion AS ubicacion_actividad,
                                    u.nombre AS nombre_usuario,
                                    u.apellidos AS apellidos_usuario
                                FROM 
                                    evento_contenedor ec
                                JOIN 
                                    tipo_evento te ON ec.FK_tipo_evento = te.PK_tipo_evento
                                LEFT JOIN 
                                    actividad a ON ec.PK_evento_contenedor = a.FK_evento_contenedor
                                LEFT JOIN 
                                    calendario_u cu ON a.PK_actividad = cu.F_actividad
                                LEFT JOIN 
                                    usuario u ON cu.FK_usuario = u.PK_nombre_usuario
                                WHERE 
                                    ec.PK_evento_contenedor = ?;
                                `,
                                            [id]
    );
    //console.log("Query results -> ", results);
    return results;
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    throw error; // Propaga el error para que sea manejado en un nivel superior
  }
};

module.exports = {
  AllSimposiosAllDetails,
  SimposioDetails,
};
