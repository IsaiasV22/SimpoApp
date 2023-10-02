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
  console.log("session user:  "+JSON.stringify(req.session));
  const username = req.session.user.PK_nombre_usuario;
  const evento = req.body.evento;
  console.log("entró al API " + username + " " + evento);

  usuarioController.estaSuscritoA(evento, username, (err, estaSuscrito) => {
    if (err) {
      return res.status(404).json({ error: err.message });
    } else {
      if (estaSuscrito) {
        actividadController.obtenerActividadesPorEvento(evento, (err, results) => {
          if (err) {
            return res.status(404).json({ error: "Error al obtener las actividades" });
          }
          res.json(results);
        });
      } else {
        res.send("No está suscrito al evento");
      }
    }
  });
});

module.exports = router;