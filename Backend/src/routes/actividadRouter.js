const express = require("express");
const router = express.Router();
const path = require("path");
const actividadController = require("../controllers/actividadController.js");
const usuarioController = require("../controllers/usuarioController.js");

router.use(express.json());

router.get("/all", (req, res) => {
  actividadController.actividadesAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener las actividades" });
    }
    res.json(results);
  });
});

router.post("/porEvento", (req, res) => {
  const evento = req.body.evento;
  console.log("entró al API " + evento);

  actividadController.obtenerActividadesPorEvento(evento, (err, results) => {
    if (err) {
      return res.status(404).json({ error: "Error al obtener las actividades" });
    }
    res.json(results);
  });
});

//porId
router.post("/porId", (req, res) => {
  const id = req.body.id;
  console.log("entró al API " + id);

  actividadController.obtenerActividadPorId(id, (err, results) => {
    if (err) {
      return res.status(404).json({ error: "Error al obtener la actividad" });
    }
    res.json(results);
  });
});

module.exports = router;