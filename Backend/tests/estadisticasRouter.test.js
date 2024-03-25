const request = require('supertest');
const express = require('express');
const router = require('../src/routes/estadisticasRouter.js');  // Ajusta la ruta al archivo del router
const app = express();
app.use(express.json());
app.use(router);

describe('Pruebas para estadisticasRouter', () => {
  // Prueba para la ruta /AllSimposiosAllDetails
  it('debería obtener todas las estadísticas de todos los simposios', async () => {
    const response = await request(app).get('/AllSimposiosAllDetails');
    expect(response.statusCode).toBe(200);
    // ... otros asserts según lo necesitas
  });

  // Prueba para la ruta /SimposioDetails
  it('debería obtener las estadísticas de un simposio específico', async () => {
    const response = await request(app).post('/SimposioDetails').send({ id: 1 });
    expect(response.statusCode).toBe(200);
    // ... otros asserts según lo necesitas
  });

  // Prueba para la ruta /ActividadDetails
  it('debería obtener las estadísticas de una actividad específica', async () => {
    const response = await request(app).post('/ActividadDetails').send({ id: 1 });
    expect(response.statusCode).toBe(200);
    // ... otros asserts según lo necesitas
  });

  // Prueba para la ruta /Attendance
  it('RF-018 Obtener lista de registrados al SIMPOSIO', async () => {
    const eventId = 3; // Asegúrate de ajustar esto según los datos de prueba que tengas disponibles
    const response = await request(app).post('/Attendance').send({ eventId });
    expect(response.statusCode).toBe(200);

    // Verificar la estructura general de la respuesta
    expect(response.body).toHaveProperty('eventName');
    expect(response.body).toHaveProperty('results');

    // Verificar detalles específicos dentro de la respuesta
    // (Ajusta estos asserts según lo que esperas en tu respuesta real)
    expect(response.body.eventName).toBeInstanceOf(Array);
    expect(response.body.results).toBeInstanceOf(Object);

    // Verificar algunos detalles dentro de 'results', si es necesario
    // Por ejemplo, verificar que se devuelva información para un título específico
    // Esto asume que conoces algunos de los títulos de las actividades o conferencias
    const someTitle = "Fluid limits of many-server queues with abandonments, general service time and continuous patience distributions";
    expect(response.body.results).toHaveProperty(someTitle);
    expect(response.body.results[someTitle]).toBeInstanceOf(Array);

    // Verificar la existencia de campos específicos dentro de los detalles de una actividad
    if (response.body.results[someTitle].length > 0) {
      const participantDetails = response.body.results[someTitle][0];
      expect(participantDetails).toHaveProperty('Nombre');
      expect(participantDetails).toHaveProperty('Apellidos');
      expect(participantDetails).toHaveProperty('Correo');
    }
  });

});
