const express = require("express");
const supertest = require("supertest");
const usuarioRouter = require("../src/routes/usuarioRouter"); // Ajusta la ruta al archivo de tu enrutador
const app = express();

app.use(express.json());

// Middleware para mockear la sesión
app.use((req, res, next) => {
  // Aquí se establece el estado deseado de la sesión para las pruebas
  req.session = { 
    user: { PK_nombre_usuario: "TestUser123" } 
  };
  next();
});

app.use("/usuarios", usuarioRouter);

describe("Pruebas para el enrutador de usuarios", () => {
  it("RF-012: debe verificar que la información enviada para generar el QR sea correcta", async () => {
    const response = await supertest(app).post("/usuarios/qrInfo").send();
    
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual("TestUser123");
  });

  // Aquí puedes agregar más pruebas según sea necesario...
});