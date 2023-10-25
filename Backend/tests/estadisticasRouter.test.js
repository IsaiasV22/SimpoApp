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
});
