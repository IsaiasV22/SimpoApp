const express = require("express");
const router = express.Router();
const recordatoriosController = require("../controllers/recordatoriosController.js");

router.use(express.json());


// Obtener todos los recordatorios

router.get("/:id", (req, res) => {
  try{
    console.log("post /recordatorios");
    recordatoriosController.getRecordatorios(req, res);
  }catch(e){
    console.log(e);
  }
});

//post nuevo recordatorio
router.post("/", (req, res) => {
  console.log("post /recordatorios");
  recordatoriosController.postRecordatorio(req, res);
});


module.exports = router;