//Recupera eventos de db.json
const fs = require("fs");

// Nombre del archivo JSON que deseas leer
const usuarios = "config/databaseUsuarios.json";

// Utiliza fs.readFile para leer el archivo JSON

const jsonFull = (callback) => {
  fs.readFile(usuarios, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      callback(err, null);
      return;
    }

    try {
      // Parsea el contenido del archivo JSON en una estructura de datos de JavaScript
      const listaDeUsuarios = JSON.parse(data);

      // Llama al callback con los resultados
      callback(null, listaDeUsuarios);
    } catch (error) {
      console.error("Error al analizar el archivo JSON:", error);
      callback(error, null);
    }
  });
};

const obtenerUsuarioPorId = (id, callback) => {
  console.log("entró al controller " + id);
  jsonFull((err, usuarios) => {
    if (err) {
      callback(err, null);
      return;
    }

    const usuarioEncontrado = usuarios.oyentes.find(
      (oyente) => oyente.id === id
    );

    if (!usuarioEncontrado) {
      callback("Usuario no encontrado", null);
      return;
    }

    callback(null, usuarioEncontrado);
  });
};

module.exports = {
  jsonFull,
  obtenerUsuarioPorId,
};
