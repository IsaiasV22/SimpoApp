const express = require("express");
const supertest = require("supertest");
const solicitudAyudaRouter = require("../src/routes/solicitudAyudaRouter");

const app = express();
app.use(express.json());
app.use("/solicitudesAyuda", solicitudAyudaRouter);

describe("SolicitudAyuda router", () => {
  it("debe responder con todas las solicitudes de ayuda", async () => {
    const response = await supertest(app)
    .get("/solicitudesAyuda/all");

    expect(response.status).toBe(200);
  });

  it("debe añadir correctamente una solicitud de ayuda", async () => {
    const nombre_usuario = "JohnDoe";
    const correo = "John@Doe";
    const descripcion = "Prueba";

    const response = await supertest(app)
    .post("/solicitudesAyuda/add")
    .send({ nombre_usuario: nombre_usuario, correo: correo, descripcion: descripcion });

    expect(response.status).toBe(200);
  });
});
