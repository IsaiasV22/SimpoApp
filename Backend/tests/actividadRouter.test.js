const express = require("express");
const supertest = require("supertest");
const eventoRouter = require("../src/routes/actividadRouter");

// Crea una instancia de Express para probar las rutas
const app = express();
app.use(express.json());
app.use("/actividades", eventoRouter);

describe("Pruebas para el enrutador de actividades", () => {
  it("debe responder correctamente a una solicitud POST /actividades/porId", async () => {
    const response = await supertest(app)
      .post("/actividades/porId")
      .send({ id: 1 });

    expect(response.status).toBe(200);
    console.log("Este es el body del res: ", response.body);
    expect(response.body).toEqual([
      {
        PK_actividad: 1,
        descripcion:
          "A nonlinear relapse model with disaggregated contact rates: analysis of a forward-backward bifurcation",
        descripcion_d:
          "Throughout the progress of epidemic scenarios it is expected to have different average daily contact behavior for individuals that are at different health classes. This contact heterogeneity has been studied in recent adaptive models and it allows to better captures the inherent differences across health statuses. Diseases with reinfection bring out more complex scenarios and they offer an important application in which to consider contact disaggregation. Therefore, we developed a nonlinear differential equation model to explore the dynamics of relapse phenomena and contact differences across health statuses. Our incidence rate function is formulated, taking inspiration from recent adaptive algorithms. It incorporates contact behavior for individuals in each health class. We use constant contact rates at each health status for our analytical results and prove conditions for different forward-backward bifurcation scenarios. The relationship between the different contact rates heavily influences these conditions. Numerical examples highlight the effect of temporarily recovered individuals and initial conditions on infected population persistence.",
        dia_evento: "2018-02-27T06:00:00.000Z",
        hora_inicio: "14:00:00",
        hora_final: "16:00:00",
        ubicacion: "Salón principal",
        estatus: 1,
        FK_tema: 1,
        FK_taller: 1,
        FK_evento_contenedor: 1,
      },
    ]);
  });

  //Prueba para obtener una actividad con un id que no existe
  it("debe responder con un error a una solicitud POST /actividades/porId si el id no existe", async () => {
    const response = await supertest(app)
      .post("/actividades/porId")
      .send({ id: 100 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Error al obtener la actividad" });
  });

});
// Puedes agregar más pruebas para las otras rutas aquí...
