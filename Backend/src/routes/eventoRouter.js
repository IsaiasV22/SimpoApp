const express = require("express");
const router = express.Router();
const path = require("path");
const eventoController = require("../controllers/eventoController.js");

router.use(express.json());

router.get("/evento", (req, res) => {
  console.log("¡Hola, mundo!");
  res.send("¡Hola, mundo!");
});

router.get("/", (req, res) => {
  console.log("¡Hola, evento!");
  res.send("¡Hola, evento!");
});

router.get("/all", (req, res) => {
  eventoController.jsonFull((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los eventos" });
    }
    res.json(results);
  });
});

//Brete jose
router.post("/evento", (req, res) => {
  const eventId = req.body.id;
  console.log("entró al API " + eventId);

  eventoController.obtenerEventoPorId(eventId, (err, evento) => {
    if (err) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    res.json(evento);
  });
});

module.exports = router;
