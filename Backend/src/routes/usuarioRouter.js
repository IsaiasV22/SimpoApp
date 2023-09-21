const express = require("express");
const router = express.Router();
const path = require("path");
const usuarioController = require("../controllers/usuarioController.js");

router.use(express.json());

router.get("/", (req, res) => {
  console.log("¡Hola, usuario!");
  res.send("¡Hola, usuario!");
});

module.exports = router;
