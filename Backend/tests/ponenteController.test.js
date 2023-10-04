const e = require("express");
const ponenteController = require("../src/controllers/ponenteController");

// Prueba obtenerPonentePorActividadId
test("obtenerPonentePorActividadId debe llamar al callback sin errores y devolver un usuario válido", (done) => {
  const actividadId = 1;
  ponenteController.obtenerPonentePorActividadId(actividadId, (err, usuario) => {
    expect(err).toBeNull();
    expect(usuario).toBeDefined(); // Comprueba si se encontró un usuario
    done();
  });
});

test("obtenerPonentePorActividadId debe llamar al callback con un mensaje de error para codigo no válido", (done) => {
    const actividadId = 2;
    ponenteController.obtenerPonentePorActividadId(actividadId, (err, usuario) => {
        expect(err).toBeDefined();
        expect(usuario).toBeNull(); // Comprueba que no se encontró ningún usuario
        done();
    });
});