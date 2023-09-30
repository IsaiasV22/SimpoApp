const express = require("express");
const router = express.Router();
const path = require("path");
const ponenteController = require("../controllers/ponenteController.js");

router.get("/all", (   req, res) => {
    console.log("¡Todos los ponentes!");
    res.send("¡Todos los ponentes!");
    });

module.exports = router;