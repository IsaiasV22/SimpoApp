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

router.post("/evento", (req, res) => {
  const eventId = req.body.id;
  console.log("entró al API " + eventId);

  eventoController.obtenerEventoPorCodigo(eventId, (err, evento) => {
    if (err) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    res.json(evento);
  });
});

router.get("/all", (req, res) => {
  eventoController.eventosAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los eventos" });
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const eventId = req.params.id;

  eventoController.obtenerEventoPorId(eventId, (err, evento) => {
    if (err) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    res.json(evento);
  });
});

router.put("/updateEventById", (req, res) => {
  const eventId = req.body.id;
  const newEvent = req.body; // Los datos del evento editado
  console.log("entró al API " + eventId);

  eventoController.updateEvent(eventId, newEvent, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al editar el evento" });
    }
    res.status(204).send(); // Envía una respuesta sin contenido en caso de éxito
  });
});

module.exports = router;
