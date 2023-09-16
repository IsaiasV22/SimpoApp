//importa las dependencias necesarias
const express = require ('express');
const app = express ();
require('dotenv').config();

//archivos estaticos
app.use(express.static('public'));

//Definir rutas
const routes = require('./routes/routes.js');
app.use('/api', routes);

const clienteRoutes = require('./routes/clienteRouter.js');
app.use('/clientes', clienteRoutes);

//configurar puerto
const PORT = process.env.PORT || 3000;

//ponerlo a escuchar
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});