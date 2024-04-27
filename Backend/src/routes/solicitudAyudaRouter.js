const express = require("express");
const router = express.Router();
const path = require("path");
const solicitudAyudaController = require("../controllers/solicitudAyudaController.js");
const { log } = require("console");

router.use(express.json());

router.get("/all", (req, res) => {
  solicitudAyudaController.solicitudAyudaAll((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener las solicitudes de ayuda" });
    }
    res.json(results);
  });
});

router.post("/add", (req, res) => {
  solicitudAyudaController.solicitudAyudaAdd(
    req.body.nombre_usuario,
    req.body.correo,
    req.body.descripcion,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al añadir la solicitud de ayuda" });
      }
      res.json(results);
    }
  );
});

router.put("/solvedSolicitudAyuda", (req, res) => {
  solicitudAyudaController.solvedSolicitudAyuda(
    req.body.solicitudAyudaId,
    (err, results) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      res.status(200).json({ message: "Solicitud de ayuda resuelta" });
    }
  );
});

router.put("/unsolvedSolicitudAyuda", (req, res) => {
  solicitudAyudaController.unsolvedSolicitudAyuda(
    req.body.solicitudAyudaId,
    (err, results) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      res.status(200).json({ message: "Solicitud de ayuda pendiente" });
    }
  );
});

router.delete("/deleteSolicitudAyuda", (req, res) => {
  solicitudAyudaController.deleteSolicitudAyuda(
    req.body.solicitudAyudaId,
    (err, results) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      res.status(200).json({ message: "Solicitud de ayuda eliminada" });
    }
  );
});
