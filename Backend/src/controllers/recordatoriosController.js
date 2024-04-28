const db = require("../../config/database.js");

// Obtener todos los recordatorios
//fetch to mock server for now
exports.getRecordatorios = async (req, res) => {
  try {
    const recordatorios = await fetch('https://89b173d5-53df-4b1c-8041-72f768f0c508.mock.pstmn.io/recordatorios');
    const data = await recordatorios.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener recordatorios" });
  }
};

exports.postRecordatorio = async (req, res) => {
    const { recordatorio } = req.body;
    try {
        const response = await fetch('https://89b173d5-53df-4b1c-8041-72f768f0c508.mock.pstmn.io/recordatorios', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recordatorio }),
        });
        if (response.status === 204) {
        res.status(204).json({ message: "Recordatorio guardado correctamente" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error al guardar recordatorio" });
    }
    }