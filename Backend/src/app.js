const express = require("express");
const session = require('express-session');
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());

//sesion
app.use(session({
  secret: process.env.SECRET_KEY, 
  resave: true,
  saveUninitialized: false,
  cookie: {
    //secure: true, // Habilita las cookies solo a través de HTTPS
    httpOnly: true, // Impide que JavaScript acceda a la cookie en el cliente
    maxAge: 3600000 // Tiempo de vida de la sesión en milisegundos (1 hora en este caso)
  }
}));

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000' // Reemplaza esto con la URL de tu frontend
};

// Configura CORS para permitir todas las solicitudes
app.use(cors(corsOptions));

// Resto de tu configuración de servidor aquí...

//archivos estáticos
app.use(express.static("public"));

// Definir rutas
const routes = require("./routes/routes.js");
app.use("/api", routes);

const clienteRoutes = require("./routes/clienteRouter.js");
app.use("/clientes", clienteRoutes);

const eventoRoutes = require("./routes/eventoRouter.js");
app.use("/eventos", eventoRoutes);

const usuarioRoutes = require("./routes/usuarioRouter.js");
app.use("/usuarios", usuarioRoutes);

const actividadRoutes = require("./routes/actividadRouter.js");
app.use("/actividades", actividadRoutes);

const ponenteRoutes = require("./routes/ponenteRouter.js");
app.use("/ponentes", ponenteRoutes);

const estadisticasRoutes = require("./routes/estadisticasRouter.js");
app.use("/estadisticas", estadisticasRoutes);


//configurar puerto
const PORT = process.env.PORT || 3000;

//ponerlo a escuchar
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
