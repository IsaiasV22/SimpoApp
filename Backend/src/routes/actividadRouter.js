const express = require("express");
const router = express.Router();
const path = require("path");
const actividadController = require("../controllers/actividadController.js");
const usuarioController = require("../controllers/usuarioController.js");

router.use(express.json());

router.get("/all", (req, res) => {
  actividadController.actividadesAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener las actividades" });
    }
    res.json(results);
  });
});

router.post("/porEvento", (req, res) => {
  const evento = req.body.evento;
  console.log("entró al API " + evento);

  actividadController.obtenerActividadesPorEvento(evento, (err, results) => {
    if (err) {
      return res.status(404).json({ error: "Error al obtener las actividades" });
    }
    res.json(results);
  });
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

router.post("/add", (req, res) => {
  //console.log("entró al API add");
  //Imprimir lo que hay en la sesión
  //console.log("Esto hay en la sesión: ", req);
  if (req.session.user && req.session.user.PK_nombre_usuario) {
    //console.log("entró al if " + req.session.user.PK_nombre_usuario);
    const username = req.session.user.PK_nombre_usuario;
    const actividad = req.body.actividad;
    //console.log("actividad " + actividad);

    actividadController.actividadAdd(actividad, username, (err, results) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      res.status(200).send("Actividad añadida correctamente");
    });
  } else {
    res.status(404).send("No se encontró el usuario en la sesión");
  }
});

module.exports = router;