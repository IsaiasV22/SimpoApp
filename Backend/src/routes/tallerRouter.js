const express = require("express");
const router = express.Router();
const tallerController = require("../controllers/tallerController.js");

router.use(express.json());
//ALL TALLERES
router.get("/AllTalleres", async (req, res) => {
  try {
    const results = await tallerController.AllTalleres();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ error: "Error al obtener los talleres" });
  }
});

//export
module.exports = router;