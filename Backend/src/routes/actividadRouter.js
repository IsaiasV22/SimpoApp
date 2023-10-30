const express = require("express");
const router = express.Router();
const path = require("path");
const actividadController = require("../controllers/actividadController.js");
const usuarioController = require("../controllers/usuarioController.js");
const pwaController = require("../controllers/pwaController.js");

router.use(express.json());

router.get("/all", (req, res) => {
  actividadController.actividadesAll((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener las actividades" });
    }
    res.json(results);
  });
});

router.post("/porEvento", (req, res) => {
  const evento = req.body.evento;
  console.log("entró al API " + evento);

  actividadController.obtenerActividadesPorEvento(evento, (err, results) => {
    if (err) {
      return res
        .status(404)
        .json({ error: "Error al obtener las actividades" });
    }
    res.json(results);
  });
});

//Obtener solo las actividades con estatus=1 por evento
router.post("/activasPorEvento", (req, res) => {
  const evento = req.body.evento;

  actividadController.obtenerActividadesActivasPorEvento(evento, (err, results) => {
      if (err) {
        return res.status(404).json({ error: "Error al obtener las actividades" });
      }
      res.json(results);
    }
  );
});

//porId
router.post("/porId", (req, res) => {
  const id = req.body.id;
  console.log("entró al API " + id);

  actividadController.obtenerActividadPorId(id, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Error al obtener la actividad" });
    }
    res.json(results);
  });
});

router.post("/cambiaEstadoActividad", (req, res) => {
  console.log("entró al API cambiaEstadoActividad");
  //Imprimir lo que hay en la sesión
  //console.log("Esto hay en la sesión: ", req);
  if (req.session.user && req.session.user.PK_nombre_usuario ) {
    console.log("entró al if " + req.session.user.PK_nombre_usuario);
    const username = req.session.user.PK_nombre_usuario;
    const actividad = req.body.actividad;
    //console.log("actividad " + actividad);

    //registroExiste?
    actividadController.registroExiste(actividad, username, (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        return res.status(404).json({ error: err.message });
      }

      if (results === false) {
        //console.log("No existe el registro");
        //añadir
        actividadController.actividadAdd(
          actividad,
          username,
          (err, results) => {
            if (err) {
              console.error("Error al añadir actividad:", err);
              return res.status(404).json({ error: err.message });
            }
            console.log("Actividad añadida correctamente");
            res
              .status(200)
              .json({ success: "Actividad añadida a tu calendario" });
          }
        );
      } else {
        //console.log("Existe el registro");
        //eliminar
        actividadController.actividadDelete(
          actividad,
          username,
          (err, results) => {
            if (err) {
              console.error("Error al eliminar actividad:", err);
              return res.status(404).json({ error: err.message });
            }
            console.log("Actividad eliminada correctamente");
            res
              .status(200)
              .json({ success: "Actividad eliminada de tu calendario" });
          }
        );
      }
    });
  }
});

router.post("/checkEstadoActividad", (req, res) => {
  console.log("entró al API checkEstadoActividad");
  //chech session
  if (req.session.user && req.session.user.PK_nombre_usuario) {
    console.log("entró al if " + req.session.user.PK_nombre_usuario);
    const username = req.session.user.PK_nombre_usuario;
    const actividad = req.body.actividad;
    //console.log("actividad " + actividad);

    //registroExiste?
    actividadController.registroExiste(actividad, username, (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        return res.status(404).json({ error: err.message });
      }

      if (results === false) {
        //console.log("No existe el registro");
        res.status(200).json({ estatus: false });
      } else {
        //console.log("Existe el registro");
        res.status(200).json({ estatus: true });
      }
    });
  }
});

router.put("/updateActivity", (req, res) => {
  const activityId = req.body.id;
  const newActivity = req.body; // Los datos de la actividad editada
/*   console.log("entró al API updateActivity: " + activityId);
  console.log("Actividad ->  " + JSON.stringify(newActivity)); */

  actividadController.updateActivity(newActivity, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al editar la actividad" });
    }

    //get suscribers of the activity

    //notifify suscribers of the activity update
    pwaController.notifyActivityUpdate(newActivity);
    res.status(204).send(); // Envía una respuesta sin contenido en caso de éxito
  });
});

//obtener username de usuarios con actividad en calendario
router.post("/usuariosActividad", (req, res) => {
  const actividad = req.body.actividad;
  console.log("entró al API " + actividad);

  actividadController.obtenerUsuariosActividad(actividad, (err, results) => {
    if (err) {
      return res
        .status(404)
        .json({ error: "Error al obtener los usuarios de la actividad" });
    }
    res.json(results);
  });
});

//Mostrar actividad
router.put("/mostrarActividad", (req, res) => {
  actividadController.mostrarActividad(req.body.id, (err, results) => {
    if (err) {
      console.error("Error al mostrar la actividad:", err);
      return res.status(404).json({ error: err.message });
    }
    res.status(200).json({ message: "Actividad mostrada" });
  });
})

//Ocultar actividad
router.put("/ocultarActividad", (req, res) => {
  actividadController.ocultarActividad(req.body.id, (err, results) => {
    if (err) {
      console.error("Error al ocultar la actividad:", err);
      return res.status(404).json({ error: err.message });
    }
    res.status(200).json({ message: "Actividad ocultada" });
  });
})

module.exports = router;
