const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Configura CORS para permitir todas las solicitudes
app.use(cors());

// Resto de tu configuración de servidor aquí...

//archivos estáticos
app.use(express.static('public'));

// Definir rutas
const routes = require('./routes/routes.js');
app.use('/api', routes);

const clienteRoutes = require('./routes/clienteRouter.js');
app.use('/clientes', clienteRoutes);

const eventoRoutes = require('./routes/eventoRouter.js');
app.use('/eventos', eventoRoutes);

const usuarioRoutes = require('./routes/usuarioRouter.js');
app.use('/usuarios', usuarioRoutes);

//configurar puerto
const PORT = process.env.PORT || 3001;

//ponerlo a escuchar
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
