const e = require("express");
const eventoController = require("../src/controllers/eventoController");

// Prueba eventosAll
test("eventosAll debe llamar al callback sin errores y devolver una lista de eventos válida", (done) => {
  eventoController.eventosAll((err, eventos) => {
    expect(err).toBeNull();
    expect(Array.isArray(eventos)).toBe(true);
    done();
  });
});

// Prueba obtenerUsuarioPorCedula
test("obtenerUsuarioPorCodigo debe llamar al callback sin errores y devolver un evento_contenedor válido", (done) => {
  const codigo = "1"; // Reemplaza con una Cedula válido existente en la bd
  eventoController.obtenerEventoPorCodigo(codigo, (err, evento_contenedor) => {
    expect(err).toBeNull();
    expect(evento_contenedor).toBeDefined(); // Comprueba si se encontró un usuario
    done();
  });
});

test("obtenerEventoPorCodigo debe llamar al callback con un mensaje de error para codigo no válido", (done) => {
  jest.setTimeout(10000);
  const codigo = "420"; // Reemplaza con un Codigo que no exista en la bd
  eventoController.obtenerEventoPorCodigo(codigo, (err, evento_contenedor) => {
    expect(err).toBeDefined();
    expect(evento_contenedor).toBeNull(); // Comprueba que no se encontró ningún usuario
    done();
  });
});