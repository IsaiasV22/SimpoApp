const express = require("express");
const router = express.Router();
const path = require("path");
const actividadController = require("../controllers/actividadController.js");

router.get("/all", (   req, res) => {
  console.log("¡Todas las actividades!");
  res.send("¡Todas las actividades!");
});

module.exports = router;