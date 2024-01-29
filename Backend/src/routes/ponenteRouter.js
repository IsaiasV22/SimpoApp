const express = require("express");
const router = express.Router();
const path = require("path");
const ponenteController = require("../controllers/ponenteController.js");

router.post("/porActividadId", (   req, res) => {
    const id = req.body.id;
    console.log("entró al API Ponente " + id);

    ponenteController.obtenerPonentePorActividadId(id, (err, results) => {
        if (err) {
            return res.status(404).json({ error: "Error al obtener el ponente" });
        }
        res.json(results);
    });
}
);

router.post("/coautoresPorActividadId", (   req, res) => {
    const id = req.body.id;
    console.log("entró al API Ponente -> Coautores de la actividad: " + id);

    ponenteController.obtenerCoautoresPorActividadId(id, (err, results) => {
        if (err) {
            return res.status(404).json({ error: "Error al obtener los coautores" });
        }
        if(results == null){
            return res.status(204).json({ error: "No se encontraron coautores" });
        }
        res.json(results);
    });
}
);

module.exports = router;
