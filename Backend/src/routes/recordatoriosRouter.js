const express = require("express");
const router = express.Router();
const recordatoriosController = require("../controllers/recordatoriosController.js");

router.use(express.json());


// Obtener todos los recordatorios

router.get("/", (req, res) => {
  console.log("get /recordatorios");
  recordatoriosController.getRecordatorios(req, res);
});

//post nuevo recordatorio
router.post("/", (req, res) => {
  console.log("post /recordatorios");
  recordatoriosController.postRecordatorio(req, res);
});


module.exports = router;