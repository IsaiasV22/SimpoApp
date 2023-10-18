const db = require("../../config/database.js");
const { promisify } = require("util");
//pomisify will convert db.query into a promise
const dbQuery = promisify(db.query).bind(db);

//ALL TALLERES
const AllTalleres = async () => {
    const results = await dbQuery(`SELECT * FROM taller`);
    if(results.length == 0) throw new Error("No se encontraron talleres");
    console.log('results -> ',results);
    return results;
}

module.exports = {
    AllTalleres
}