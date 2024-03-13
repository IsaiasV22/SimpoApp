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
      // Manejar el error y enviarlo como respuesta en formato JSON
      return res.status(404).json({ error: err.message });
    } else {
      req.session.user = user[0];
      // Si la autenticación es exitosa, enviar el usuario en formato JSON
      res.status(200).json({ user });
    }
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error al cerrar sesión");
    }

    //imprimir las cookies
    //console.log("Estas son las header cookies: ", req.headers);

    // Elimina la cookie de sesión y envía una respuesta de éxito al cliente
    res.clearCookie("connect.sid"); // Borra la cookie de sesión

    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  });
});

router.post("/evento", (req, res) => {
  console.log("Inside /evento");
  //console.log("req headers -> "+JSON.stringify(req.headers));
  // Verifica si req.session.user está definido antes de acceder a sus propiedades
  if (req.session.user && req.session.user.PK_nombre_usuario) {
    const username = req.session.user.PK_nombre_usuario;
    const evento = req.body.evento;
    console.log("User in session -> " + username + " " + evento);

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

router.post("/qrInfo", (req, res) => {
  console.log("Inside /qrInfo");

  // Verifica si req.session.user está definido antes de acceder a sus propiedades
  if (req.session.user && req.session.user.PK_nombre_usuario) {
    const username = req.session.user.PK_nombre_usuario;

    console.log("User in session -> " + username);
    res.status(200).json({ username: username }); // Responder con un objeto JSON que contiene el nombre de usuario
  } else {
    res.status(404).send("No se encontró el usuario en la sesión");
  }
});

//API para las actividades del calendario del usuario logueado

router.get("/calendarioUsuario", (req, res) => {
  if (req.session.user && req.session.user.PK_nombre_usuario) {
    const username = req.session.user.PK_nombre_usuario;

    usuarioController.obtenerActividadesCalendario(username, (err, results) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    res.status(404).send("No se encontró el usuario en la sesión");
  }
});

router.post("/listaUsuarios", (req, res) => {
  const evento = req.body.evento;
  if (req.session.user && req.session.user.PK_nombre_usuario && req.session.user.FK_rol === 1) {
    usuarioController.obtenerListaUsuarios(evento, (err, results) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    res.status(404).send("Rol no aceptado");
  }
});

router.post("/cambiaSuscripcionEvento", (req, res) => {
  if (req.session.user && req.session.user.PK_nombre_usuario && req.session.user.FK_rol === 1) {
    const evento = req.body.evento;
    const username = req.body.username;

    //registroExiste?
    usuarioController.participacionExiste(evento, username, (err, results) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }

      if (results === false) {
        //añadir
        usuarioController.participacionAdd(evento, username, (err, results) => {
            if (err) {
              return res.status(404).json({ error: err.message });
            }
            res.status(200).json({ success: "Cambio a Suscrito!" });
          }
        );
      } else {
        //eliminar
        usuarioController.participacionDelete(evento, username, (err, results) => {
            if (err) {
              return res.status(404).json({ error: err.message });
            }
            res.status(200).json({ success: "Cambio a No suscrito!" });
          }
        );
      }
    });
  }
});

//API for assisting users at an event
router.post("/asistirEvento", (req, res) => {

  console.log("Inside /asistirEvento");
  // Verifica si req.session.user está definido antes de acceder a sus propiedades
  if (req.session.user && req.session.user.PK_nombre_usuario) {

    const username = req.body.username;
    const activityId = req.body.activityId;

    usuarioController.attendanceList(activityId, username, (err, message) => {
      if (err) {
        // Si hay un error, devolvemos el mensaje de error
        return res.status(404).json({ error: err });
      } else {
        // Si no hay un error, devolvemos el mensaje de éxito
        res.status(200).json({ message: message });
      }
    });
  } else {
    res.status(404).send("No se encontró el usuario en la sesión");
  }
});

module.exports = router;
