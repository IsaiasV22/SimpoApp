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


module.exports = router;