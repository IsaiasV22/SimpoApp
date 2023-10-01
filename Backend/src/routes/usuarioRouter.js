const express = require("express");
const router = express.Router();
const path = require("path");
const usuarioController = require("../controllers/usuarioController.js");
const { log } = require("console");

router.use(express.json());

router.get("/", (req, res) => {
  console.log("¡Hola, usuario!");
  res.send("¡Hola, usuario!");
});

router.get("/all", (req, res) => {
  usuarioController.usuariosAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    res.json(results);
  });
});

router.post("/usuario", (req, res) => {
  const userCedula = req.body.cedula;
  console.log("entró al API " + userCedula);

  usuarioController.obtenerUsuarioPorCedula(userCedula, (err, user) => {
    if (err) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  });
});

router.post("/login", (req, res) => {
  const userName = req.body.username;
  const userPassword = req.body.password;
  console.log("entró al API " + userName + " " + userPassword);

  usuarioController.login(userName, userPassword, (err, user) => {
    if (err) {
      return res.status(404).json(err.message);
    }else {
      res.json(user);
    }
  });
});

module.exports = router;
