const express = require("express");
const router = express.Router();
const path = require("path");
const estadisticasController = require("../controllers/estadisticasController.js");

router.use(express.json());

//ALL INFO FROM ALL SIMPOSIOS
router.get("/AllSimposiosAllDetails", async (req, res) => {
  try {
    const results = await estadisticasController.AllSimposiosAllDetails();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ error: "Error al obtener las estadísticas" });
  }
});

//INFO SPECIFIC SIMPOSIO
router.post("/SimposioDetails", async (req, res) => {
  try {
    const results = await estadisticasController.SimposioDetails(req.body.id);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ error: "Error al obtener las estadísticas" });
  }
});

//ACTIVIDAD DETAILS
router.post("/ActividadDetails", async (req, res) => {
  try {
    const results = await estadisticasController.ActividadDetails(req.body.id);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ error: "Error al obtener las estadísticas" });
  }
});

// Attendace information for event activity
router.post("/Attendance", async (req, res) => {
  try {
    const results = await estadisticasController.AttendanceInfo(req.body.eventId);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ error: "Error al obtener las estadísticas" });
  }
});

module.exports = router;