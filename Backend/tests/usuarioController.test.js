/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   usuarioController.test.js                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Andres Mendez <andresmesol09@gmail.com>                              */
/*       Andres Fallas <andresfallas48@gmail.com>   +#+  +:+       +#+        */
/*       Jose Chacon   <>                         +#+#+#+#+#+   +#+           */
/*   Created: 2023/09/30 15:02:26 by all            #+#    #+#                */
/*   Updated: 2023/09/30 15:02:26 by all           ###   ########.fr          */
/*                                                                            */
/* ************************************************************************** */



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
  const cedula = '1'; // Reemplaza con una Cedula que no exista en la bd
  usuarioController.obtenerUsuarioPorCedula(cedula, (err, usuario) => {
    expect(err).toBeDefined();
    expect(usuario).toBeNull(); // Comprueba que no se encontró ningún usuario
    done();
  });
});
