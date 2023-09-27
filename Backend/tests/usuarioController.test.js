const usuarioController = require('../src/controllers/usuarioController');

// Prueba jsonFull
test('jsonFull debe llamar al callback sin errores y devolver una lista de usuarios válida', (done) => {
  usuarioController.jsonFull((err, usuarios) => {
    expect(err).toBeNull();
    expect(Array.isArray(usuarios.oyentes)).toBe(true);
    done();
  });
});

// Prueba obtenerUsuarioPorId
test('obtenerUsuarioPorId debe llamar al callback sin errores y devolver un usuario válido', (done) => {
  const id = 'oyente1'; // Reemplaza con un ID válido existente en tu archivo JSON
  usuarioController.obtenerUsuarioPorId(id, (err, usuario) => {
    expect(err).toBeNull();
    expect(usuario).toBeDefined(); // Comprueba si se encontró un usuario
    done();
  });
});

test('obtenerUsuarioPorId debe llamar al callback con un mensaje de error para ID no válido', (done) => {
  const id = 'no_valido'; // Reemplaza con un ID que no exista en tu archivo JSON
  usuarioController.obtenerUsuarioPorId(id, (err, usuario) => {
    expect(err).toBeDefined();
    expect(usuario).toBeNull(); // Comprueba que no se encontró ningún usuario
    done();
  });
});
