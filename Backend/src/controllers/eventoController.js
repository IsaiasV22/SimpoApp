//Recupera eventos de db.json
const fs = require("fs");

// Nombre del archivo JSON que deseas leer
const eventos = "../config/database.json";

// Utiliza fs.readFile para leer el archivo JSON

const jsonFull = (callback) => {
  fs.readFile(eventos, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      callback(err, null);
      return;
    }

    try {
      // Parsea el contenido del archivo JSON en una estructura de datos de JavaScript
      const listaDeEventos = JSON.parse(data);

      // Llama al callback con los resultados
      callback(null, listaDeEventos);
    } catch (error) {
      console.error('Error al analizar el archivo JSON:', error);
      callback(error, null);
    }
  });
};

module.exports = {
  jsonFull
};