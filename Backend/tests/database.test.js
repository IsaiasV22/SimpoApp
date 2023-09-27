const connection = require('../config/database.js');

describe('Conexión a la base de datos', () => {
  test('debe conectarse a la base de datos sin errores', (done) => {
    connection.connect((err) => {
      if (err) {
        throw err;
      }
      console.log('Conexión exitosa');
      done(); // Indica a Jest que el test ha finalizado
    });
  });
});

