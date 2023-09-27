const express = require("express");
const supertest = require("supertest");
const eventoRouter = require("../src/routes/eventoRouter"); // Ajusta la ruta al archivo de tu enrutador

// Crea una instancia de Express para probar las rutas
const app = express();
app.use(express.json());
app.use("/eventos", eventoRouter);

describe("Pruebas para el enrutador de eventos", () => {
  it("debe responder correctamente a una solicitud GET /eventos/evento", async () => {
    const response = await supertest(app).get("/eventos/evento");

    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Hola, mundo!");
  });

  it("debe responder correctamente a una solicitud GET /eventos", async () => {
    const response = await supertest(app).get("/eventos");

    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Hola, evento!");
  });

  // Puedes agregar más pruebas para las otras rutas aquí...

  it("debe responder con un evento por ID en una solicitud POST /eventos/evento", async () => {
    const eventId = 1; // Ajusta el ID del evento que deseas buscar

    const response = await supertest(app)
      .post("/eventos/evento")
      .send({ id: eventId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{
      codigo: 1,
      descripcion:
        "El XXI SIMMAC es un simposio internacional que reúne a expertos en estadísticas y matemáticas aplicadas para compartir conocimientos y avances en diversos campos.",
      diaInicio: "2023-09-20T06:00:00.000Z",
      diaFinal: "2023-09-22T06:00:00.000Z",
      activo: 1,
      codigo_tipoEvento: 1,
    }]);
  });

  it("debe responder con todos los eventos en una solicitud GET /eventos/all", async () => {
    const response = await supertest(app).get("/eventos/all");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        codigo: 1,
        descripcion:
          "El XXI SIMMAC es un simposio internacional que reúne a expertos en estadísticas y matemáticas aplicadas para compartir conocimientos y avances en diversos campos.",
        diaInicio: "2023-09-20T06:00:00.000Z",
        diaFinal: "2023-09-22T06:00:00.000Z",
        activo: 1,
        codigo_tipoEvento: 1,
      },
    ]);
  });

  // Agrega más pruebas para otras rutas y casos si es necesario...
});
