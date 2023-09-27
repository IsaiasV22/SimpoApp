const usuarioController = require('../src/controllers/usuarioController');

// Prueba usuariosAll
test('usuariosAll debe llamar al callback sin errores y devolver una lista de usuarios válida', (done) => {
  usuarioController.usuariosAll((err, usuarios) => {
    expect(err).toBeNull();
    expect(Array.isArray(usuarios)).toBe(true);
    done();
  });
});

// Prueba obtenerUsuarioPorCedula
test('obtenerUsuarioPorCedula debe llamar al callback sin errores y devolver un usuario válido', (done) => {
  const cedula = '12345'; // Reemplaza con una Cedula válido existente en la bd
  usuarioController.obtenerUsuarioPorCedula(cedula, (err, usuario) => {
    expect(err).toBeNull();
    expect(usuario).toBeDefined(); // Comprueba si se encontró un usuario
    done();
  });
});

test('obtenerUsuarioPorCedula debe llamar al callback con un mensaje de error para Cedula no válida', (done) => {
  const cedula = 'no_valido'; // Reemplaza con una Cedula que no exista en la bd
  usuarioController.obtenerUsuarioPorCedula(cedula, (err, usuario) => {
    expect(err).toBeDefined();
    expect(usuario).toBeNull(); // Comprueba que no se encontró ningún usuario
    done();
  });
});
