const express = require("express");
const router = express.Router();
const path = require("path");
const actividadController = require("../controllers/actividadController.js");

router.use(express.json());

router.get("/all", (   req, res) => {
  actividadController.actividadesAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener las actividades" });
    }
    res.json(results);
  });
});

module.exports = router;