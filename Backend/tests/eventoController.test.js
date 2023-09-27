const eventoController = require('../src/controllers/eventoController');

// Prueba jsonFull
test('jsonFull debe llamar al callback sin errores y devolver una lista de eventos válida', (done) => {
  eventoController.jsonFull((err, eventos) => {
    expect(err).toBeNull();
    expect(Array.isArray(eventos.eventos)).toBe(true);
    done();
  });
});

// Prueba obtenereventoPorId
test('obtenerEventoPorId debe llamar al callback sin errores y devolver un evento válido', (done) => {
  const id = '1'; // Reemplaza con un ID válido existente en tu archivo JSON
  eventoController.obtenerEventoPorId(id, (err, evento) => {
    expect(err).toBeNull();
    expect(evento).toBeDefined(); // Comprueba si se encontró un evento
    done();
  });
});

test('obtenereventoPorId debe llamar al callback con un mensaje de error para ID no válido', (done) => {
  const id = 'no_valido'; // Reemplaza con un ID que no exista en tu archivo JSON
  eventoController.obtenerEventoPorId(id, (err, evento) => {
    expect(err).toBeDefined();
    expect(evento).toBeNull(); // Comprueba que no se encontró ningún evento
    done();
  });
});