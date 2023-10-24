const express = require("express");
const router = express.Router();
const path = require("path");
const eventoController = require("../controllers/eventoController.js");
const tallerController = require("../controllers/tallerController.js");
const fs = require("fs");
const multer = require("multer");

router.use(express.json());

// Configuración de Multer para guardar imagenes
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log("Filename:", `${req.params.PK_evento_contenedor}.png`);
    cb(null, `${req.params.PK_evento_contenedor}.png`);
  },
  destination: (req, file, cb) => {
    console.log("Destination:", path.join(__dirname, "../../public/images"));
    cb(null, path.join(__dirname, "../../public/images"));
  },
});

const upload = multer({ storage: storage });

router.get("/evento", (req, res) => {
  console.log("¡Hola, mundo!");
  res.send("¡Hola, mundo!");
});

router.get("/", (req, res) => {
  console.log("¡Hola, evento!");
  res.send("¡Hola, evento!");
});

router.post("/evento", (req, res) => {
  const eventId = req.body.id;
  console.log("entró al API " + eventId);

  eventoController.obtenerEventoPorCodigo(eventId, (err, evento) => {
    if (err) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    res.json(evento);
  });
});

router.get("/all", (req, res) => {
  eventoController.eventosAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los eventos" });
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const eventId = req.params.id;

  eventoController.obtenerEventoPorId(eventId, (err, evento) => {
    if (err) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    res.json(evento);
  });
});

router.put("/updateEventById", (req, res) => {
  const eventId = req.body.id;
  const newEvent = req.body; // Los datos del evento editado
  console.log("entró al API " + eventId);

  eventoController.updateEvent(eventId, newEvent, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al editar el evento" });
    }
    res.status(204).send(); // Envía una respuesta sin contenido en caso de éxito
  });
});

router.get("/imagen/:id", (req, res) => {
  const eventId = req.params.id;

  //Obtener imagen del public/images
  const imagePath = path.join(__dirname, "../../public/images");
  const defaultImage = "evento.png";
  const image = `${imagePath}/${eventId}.png`;

  //Verificar si existe la imagen
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${imagePath}/${defaultImage}`);
  }
});

// Ruta para subir imágenes
router.post("/upload/:PK_evento_contenedor", upload.single("file"), (req, res) => {
  console.log("Entró a Multer: ", req.params.PK_evento_contenedor);
  res.status(200).json({ message: "Imagen subida correctamente" });
});

//ALL TALLERES BY EVENTO
router.post("/talleresByEventoId", async (req, res) => {
  try {
    const results = await tallerController.AllTalleresByEventoID(req.body.id);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ error: "Error al obtener los talleres" });
  }
});

module.exports = router;
