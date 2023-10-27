const db = require("../../config/database.js");
const { promisify } = require("util");
//pomisify will convert db.query into a promise
const dbQuery = promisify(db.query).bind(db);

//ALL TALLERES
const AllTalleres = async () => {
    const results = await dbQuery(`SELECT * FROM taller`);
    if(results.length == 0) throw new Error("No se encontraron talleres");
    //console.log('results -> ',results);
    return results;
}

//ALL TALLERES BY evento_contenedor.ID
const AllTalleresByEventoID = async (id) => {
    const results = await dbQuery(`SELECT t.*
    FROM srse.taller t
    JOIN srse.evento_contenedor_taller et ON t.PK_taller = et.FK_taller
    JOIN srse.evento_contenedor e ON et.FK_evento_contenedor = e.PK_evento_contenedor
    WHERE e.PK_evento_contenedor = ${id}`);
    if(results.length == 0) throw new Error("No se encontraron talleres");
    console.log('results -> ',results);
    return results;
}

module.exports = {
    AllTalleres,
    AllTalleresByEventoID
}