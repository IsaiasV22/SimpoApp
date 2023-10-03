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
  //console.log(req.session.user);
  const userName = req.body.username;
  const userPassword = req.body.password;
  console.log("entró al API " + userName + " " + userPassword);

  usuarioController.login(userName, userPassword, (err, user) => {
    if (err) {
      return res.status(404).json(err.message);
    } 
    else {
      if (user) {
        // Almacena el usuario en la sesión
        req.session.user = user[0];
        //console.log(req.session.user);
        res.status(200).json(user);
      } else {
        res.send("Credenciales incorrectas");
      }
    }
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).send("Error al cerrar sesión");
      }
      
      //imprimir las cookies
      console.log("Estas son las header cookies: ", req.headers);

      // Elimina la cookie de sesión y envía una respuesta de éxito al cliente
      res.clearCookie('connect.sid'); // Borra la cookie de sesión 

      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  });
});

router.post("/evento", (req, res) => {
  //console.log("Inside /evento");
  //console.log("req headers -> "+JSON.stringify(req.headers));
  // Verifica si req.session.user está definido antes de acceder a sus propiedades
  if (req.session.user && req.session.user.PK_nombre_usuario) {
    const username = req.session.user.PK_nombre_usuario;
    const evento = req.body.evento;
    //console.log("User in session -> " + username + " " + evento);

    usuarioController.estaSuscritoA(evento, username, (err, estaSuscrito) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      } else {
        if (estaSuscrito) {
          res.send("true");
        } else {
          res.send("false");
        }
      }
    });
  } else {
    res.status(404).send("No se encontró el usuario en la sesión");
  }
});

module.exports = router;
