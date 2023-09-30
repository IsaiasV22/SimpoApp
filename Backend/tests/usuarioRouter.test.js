const express = require("express");
const supertest = require("supertest");
const usuarioRouter = require("../src/routes/usuarioRouter"); // Ajusta la ruta al archivo de tu enrutador

// Crea una instancia de Express para probar las rutas
const app = express();
app.use(express.json());
app.use("/usuarios", usuarioRouter);

describe("Pruebas para el enrutador de usuarios", () => {
  it("debe responder correctamente a una solicitud GET /usuarios", async () => {
    const response = await supertest(app).get("/usuarios");

    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Hola, usuario!");
  });

  it("debe responder con los usuarios en una solicitud GET /usuarios/all", async () => {
    const response = await supertest(app).get("/usuarios/all");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        cedula: "0420",
        nombreUsuario: "Elvio0420",
        rol: 1,
        tipoID: "ID1",
        password: "password1",
        nombre: "Elvio",
        segundo_nombre: null,
        apellidos: "Accinelli",
        iniciales: null,
        gender: null,
        nombreDocumentos: null,
        afiliacion: null,
        correo: "elvioaccineli0420@ucr",
        pais: "Costa Rica",
        ciudad: "San Jose",
        telefono: 88776655,
        estatus: 1,
      },
      {
        cedula: "12345",
        nombreUsuario: "usuario1",
        rol: 1,
        tipoID: "ID1",
        password: "password1",
        nombre: "Nombre1",
        segundo_nombre: null,
        apellidos: "Apellido1",
        iniciales: null,
        gender: null,
        nombreDocumentos: null,
        afiliacion: null,
        correo: "correo1@example.com",
        pais: "Pais1",
        ciudad: "Ciudad1",
        telefono: 123456789,
        estatus: 1,
      },
    ]);
  });

  it("debe responder con un usuario por ID en una solicitud POST /usuarios/usuario", async () => {
    const cedula = '12345'; // Ajusta el ID del usuario que deseas buscar

    const response = await supertest(app)
      .post("/usuarios/usuario")
      .send({ cedula: cedula });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        cedula: "12345",
        nombreUsuario: "usuario1",
        rol: 1,
        tipoID: "ID1",
        password: "password1",
        nombre: "Nombre1",
        segundo_nombre: null,
        apellidos: "Apellido1",
        iniciales: null,
        gender: null,
        nombreDocumentos: null,
        afiliacion: null,
        correo: "correo1@example.com",
        pais: "Pais1",
        ciudad: "Ciudad1",
        telefono: 123456789,
        estatus: 1,
      },
    ]);
  });

  it("debe responder correctamente a una solicitud POST /usuarios/login con contraseña correcta", async () => {
    const userCedula = '12345'; // Ajusta el ID del usuario que deseas autenticar
    const userPassword = "password1"; // Ajusta la contraseña correcta

    const response = await supertest(app)
      .post("/usuarios/login")
      .send({ cedula: userCedula, password: userPassword });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
        {
          cedula: "12345",
          nombreUsuario: "usuario1",
          rol: 1,
          tipoID: "ID1",
          password: "password1",
          nombre: "Nombre1",
          segundo_nombre: null,
          apellidos: "Apellido1",
          iniciales: null,
          gender: null,
          nombreDocumentos: null,
          afiliacion: null,
          correo: "correo1@example.com",
          pais: "Pais1",
          ciudad: "Ciudad1",
          telefono: 123456789,
          estatus: 1,
        },
      ]);
  });

  it("debe responder con un error en una solicitud POST /usuarios/login con contraseña incorrecta", async () => {
    const cedula = '12345'; // Ajusta el ID del usuario que deseas autenticar
    const userPassword = "contraseña_incorrecta"; // Ajusta la contraseña incorrecta

    const response = await supertest(app)
      .post("/usuarios/login")
      .send({ cedula: cedula, password: userPassword });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Contraseña incorrecta" });
  });

  // Agrega más pruebas para otras rutas y casos si es necesario...
});
