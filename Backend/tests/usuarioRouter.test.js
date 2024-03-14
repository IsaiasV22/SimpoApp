const express = require("express");
const cors = require("cors");
const supertest = require("supertest");
const usuarioRouter = require("../src/routes/usuarioRouter"); // Ajusta la ruta al archivo de tu enrutador
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: {
      //secure: true, // Habilita las cookies solo a través de HTTPS
      httpOnly: true, // Impide que JavaScript acceda a la cookie en el cliente
      maxAge: 3600000, // Tiempo de vida de la sesión en milisegundos (1 hora en este caso)
    },
  })
);

// Configura CORS para permitir todas las solicitudes
app.use(cors());

// Crea una instancia de Express para probar las rutas
app.use(express.json());
app.use("/usuarios", usuarioRouter);

describe("Pruebas para el enrutador de usuarios", () => {

  it("debe responder con el nombre de usuario cuando req.session.user está definido", async () => {
    // Simula una sesión de usuario definida
    const sessionUser = {
      PK_nombre_usuario: "TestUser123",
    };

    // Simula la solicitud con req.session.user definido
    const response = await supertest(app)
      .post("/usuarios/qrInfo")
      .set("Cookie", [`connect.sid=s:${sessionUser}`])
      .send();

    expect(response.status).toBe(200);
    expect(response.body.username).toEqual(sessionUser.PK_nombre_usuario);
  });

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
        PK_nombre_usuario: "Andres21sb",
        tipo_id: "cedula",
        cedula: "111111111",
        password:
          "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
        nombre: "Andres",
        segundo_nombre: "Aaron",
        apellidos: "Méndez Solano",
        iniciales: "AMS",
        genero: "H",
        nombre_documentos: null,
        afiliacion: null,
        correo: "andresmesol09@gmail.com",
        pais: "Costa Rica",
        ciudad: "San José ",
        telefono: "555555555",
        FK_rol: 5,
        FK_estatus: 4,
      },
      {
        PK_nombre_usuario: "Elvio111",
        tipo_id: "cedula",
        cedula: "11111111",
        password:
          "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
        nombre: "Elvio",
        segundo_nombre: " ",
        apellidos: "Accinelli",
        iniciales: "EA",
        genero: "H",
        nombre_documentos: " ",
        afiliacion: "Departamento de Economía",
        correo: "elvio.accinelli@eco.uaslp.mx",
        pais: "Uruguay",
        ciudad: "Montevideo",
        telefono: "5555555",
        FK_rol: 4,
        FK_estatus: 3,
      },
      {
        PK_nombre_usuario: "Fabio111",
        tipo_id: "cedula",
        cedula: "22222223",
        password:
          "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
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
      {
        PK_nombre_usuario: "Guillermo111",
        tipo_id: "cedula",
        cedula: "22222222",
        password:
          "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
        nombre: "Guillermo",
        segundo_nombre: "Andre",
        apellidos: "Oliva Mercado",
        iniciales: "GO",
        genero: "H",
        nombre_documentos: " ",
        afiliacion: "Departamento de Astrofísica",
        correo: "gandreoliva@gmail.com",
        pais: "Costa Rica",
        ciudad: "San José",
        telefono: "5555515",
        FK_rol: 4,
        FK_estatus: 3,
      },
      {
        PK_nombre_usuario: "hugof",
        tipo_id: "pasaporte",
        cedula: "110590488",
        password:
          "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
        nombre: "Hugo",
        segundo_nombre: "Alberto",
        apellidos: "Flores Arguedas",
        iniciales: "HFA",
        genero: "H",
        nombre_documentos: null,
        afiliacion:
          "Instituto de Matematicas, Universidad Nacional Autonoma de Mexico",
        correo: "hflores@im.unam.mx",
        pais: "Mexico",
        ciudad: "DF",
        telefono: "524731148134",
        FK_rol: 3,
        FK_estatus: 3,
      },
      {
        PK_nombre_usuario: "orodriguezrojas",
        tipo_id: "cedula",
        cedula: "22222222",
        password:
          "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
        nombre: "Oldemar",
        segundo_nombre: null,
        apellidos: "Rodriguez Rojas",
        iniciales: "ORR",
        genero: "H",
        nombre_documentos: null,
        afiliacion: "Universidad de Costa Rica",
        correo: "oldemar.rodriguez@ucr.ac.cr",
        pais: "Costa Rica",
        ciudad: "San José",
        telefono: null,
        FK_rol: 2,
        FK_estatus: 1,
      },
      {
        PK_nombre_usuario: "root",
        tipo_id: null,
        cedula: null,
        password:
          "$2a$12$S8uiC/vjIE3b/s3zyy7f6OyD4j3Z/FbaQQlrRKiZbzFtWuxGg5Dwe",
        nombre: " Administrador",
        segundo_nombre: null,
        apellidos: null,
        iniciales: null,
        genero: null,
        nombre_documentos: null,
        afiliacion: null,
        correo: null,
        pais: null,
        ciudad: null,
        telefono: null,
        FK_rol: 1,
        FK_estatus: 4,
      },
    ]);
  });

  it("Debe responder correctamente al POST /usuarios/login con credenciales correctas", async () => {
    const userName = "Andres21sb"; // Usuario válido
    const userPassword = "password1"; // Contraseña válida

    const response = await supertest(app)
      .post("/usuarios/login")
      .send({ username: userName, password: userPassword });

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual([
      {
        PK_nombre_usuario: "Andres21sb",
        tipo_id: "cedula",
        cedula: "111111111",
        password:
          "$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.",
        nombre: "Andres",
        segundo_nombre: "Aaron",
        apellidos: "Méndez Solano",
        iniciales: "AMS",
        genero: "H",
        nombre_documentos: null,
        afiliacion: null,
        correo: "andresmesol09@gmail.com",
        pais: "Costa Rica",
        ciudad: "San José ",
        telefono: "555555555",
        FK_rol: 5,
        FK_estatus: 4,
      },
    ]);
  });

  it("debe responder con un error en una solicitud POST /usuarios/login con contraseña incorrecta", async () => {
    const username = "Guillermo111"; // Ajusta el ID del usuario que deseas autenticar
    const userPassword = "roota"; // Ajusta la contraseña incorrecta

    const response = await supertest(app)
      .post("/usuarios/login")
      .send({ username: username, password: userPassword });

    expect(response.status).toBe(404);
    expect(response.body.error).toEqual(
      "Contraseña incorrecta" +
        "1-Por favor, verifique que la contraseña este bien escrita \n" +
        "2-Si no recuerda su contraseña, por favor, contacte al administrador del sistema en la seccion de 'Soporte' \n"
    );
  });

  //logout
  it("debe cerrar sesión correctamente en una solicitud POST /usuarios/logout", async () => {
    // Primero inicia sesión para tener una sesión activa
    const loginResponse = await supertest(app)
      .post("/usuarios/login")
      .send({ username: "Andres21sb", password: "password1" });

    // Asegúrate de que el inicio de sesión sea exitoso
    expect(loginResponse.status).toBe(200);

    // Obtiene la cookie de sesión del encabezado de la respuesta del inicio de sesión
    const sessionCookie = loginResponse.header["set-cookie"];

    // Realiza la solicitud de logout con la cookie de sesión
    const logoutResponse = await supertest(app)
      .post("/usuarios/logout")
      .set("Cookie", sessionCookie); // Establece la cookie de sesión en el encabezado

    // Verifica que la sesión se haya cerrado correctamente
    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.message).toEqual("Sesión cerrada exitosamente");
  });

  // Agrega más pruebas para otras rutas y casos si es necesario...
});
