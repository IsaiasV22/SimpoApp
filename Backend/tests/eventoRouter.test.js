const express = require("express");
const supertest = require("supertest");
const eventoRouter = require("../src/routes/eventoRouter.js"); // Ajusta la ruta al archivo de tu enrutador

// Crea una instancia de Express para probar las rutas
const app = express();
app.use(express.json());
app.use(eventoRouter);

describe("Pruebas para el enrutador de eventos", () => {
  it("debe responder correctamente a una solicitud GET /eventos/evento", async () => {
    const response = await supertest(app).get("/evento");

    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Hola, mundo!");
  });

  /*it("debe responder correctamente a una solicitud GET /eventos", async () => {
    const response = await supertest(app).get("/eventos");

    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Hola, evento!");
  });*/

  // Puedes agregar más pruebas para las otras rutas aquí...

  it("debe responder con un evento por ID en una solicitud POST /eventos/evento", async () => {
    const eventId = 1; // Ajusta el ID del evento que deseas buscar

    const response = await supertest(app).post("/evento").send({ id: eventId });

    expect(response.status).toBe(200);
    /*expect(response.body).toEqual([
      {
        PK_evento_contenedor: 1,
        nombre: "SIMMAC XXI",
        descripcion:
          "El XXI SIMMAC es un simposio internacional que reúne a expertos en estadísticas y matemáticas aplicadas para compartir conocimientos y avances en diversos campos.",
        lugar: "UCR Ciudad de la Investigación",
        dia_inicio: "2018-02-26T06:00:00.000Z",
        dia_final: "2018-03-02T06:00:00.000Z",
        activo: 1,
        FK_tipo_evento: 1,
      },
    ]);*/
  });

  it("debe responder con todos los eventos en una solicitud GET /eventos/all", async () => {
    const response = await supertest(app).get("/all");

    expect(response.status).toBe(200);
    /*expect(response.body).toEqual([
      {
          "PK_evento_contenedor": 1,
          "nombre": "SIMMAC XXI",
          "descripcion": "El XXI SIMMAC es un simposio internacional que reúne a expertos en estadísticas y matemáticas aplicadas para compartir conocimientos y avances en diversos campos.",
          "lugar": "UCR Ciudad de la Investigación",
          "dia_inicio": "2018-02-26T06:00:00.000Z",
          "dia_final": "2018-03-02T06:00:00.000Z",
          "activo": 1,
          "FK_tipo_evento": 1
      }
  ]);*/
  });

  //Start Unit Test sprint 2

  // Prueba para la ruta /updateEventById
  it("debería actualizar un evento por ID", async () => {
    const newEvent = {
      id: 1,
      PK_evento_contenedor: 1,
      nombre: "SIMMAC XXI Test",
      descripcion:
        "El XXI SIMMAC es un simposio internacional que reúne a expertos en estadísticas y matemáticas aplicadas para compartir conocimientos y avances en diversos campos.",
      lugar: "UCR Ciudad de la Investigación",
      dia_inicio: "2018-02-27T06:00:00.000Z",
      dia_final: "2018-03-02T06:00:00.000Z"
    };
    const response = await supertest(app)
      .put("/updateEventById")
      .send(newEvent);
    expect(response.statusCode).toBe(204);
  });

  // Prueba para la ruta /mostrarEvento
  it("debería cambiar el atributo activo del evento a 1", async () => {
    const response = await supertest(app)
      .put("/mostrarEvento")
      .send({ id: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Evento mostrado");
  });

  // Prueba para la ruta /ocultarEvento
  it("debería cambiar el atributo activo del evento a 0", async () => {
    const response = await supertest(app)
      .put("/ocultarEvento")
      .send({ id: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Evento ocultado");
  });

  // Prueba para la ruta /upload/:PK_evento_contenedor
  it("debería subir una imagen", async () => {
    const response = await supertest(app)
      .post("/upload/1")
      .attach("file", "./public/images/1.png"); // Asegúrate de tener una imagen de prueba real en esta ruta
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Imagen subida correctamente");
  });

  //End Unit Test sprint 2

  // Agrega más pruebas para otras rutas y casos si es necesario...
});
