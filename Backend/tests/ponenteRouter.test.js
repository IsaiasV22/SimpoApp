const express = require("express");
const supertest = require("supertest");
const ponenteRouter = require("../src/routes/ponenteRouter");

const app = express();
app.use(express.json());
app.use("/ponentes", ponenteRouter);

describe("Pruebas para el enrutador de ponentes", () => {
  it("debe responder con un usuario por ID de la actividad en una solicitud POST /ponentes/porActividadId", async () => {
    const actId = 1; // Ajusta el ID de la actividad

    const response = await supertest(app)
      .post("/ponentes/porActividadId")
      .send({ id: actId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        PK_nombre_usuario: "Fabio111",
        tipo_id: "cedula",
        cedula: "22222223",
        password: "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
        nombre: "Fabio",
        segundo_nombre: null,
        apellidos: "Sanchez",
        iniciales: "FS",
        genero: "H",
        nombre_documentos: " ",
        afiliacion: "Universidad de Costa Rica",
        correo: "fabiosanchez@gmail.com",
        pais: "Costa Rica",
        ciudad: "San José",
        telefono: "5555515",
        FK_rol: 4,
        FK_estatus: 3,
      },
    ]);
  });
});