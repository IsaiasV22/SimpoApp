const express = require('express');
const router = express.Router();
const path = require('path'); 
const clienteController = require('../controllers/clienteController.js');

router.get('/cliente', (req, res) => {
    console.log('¡Hola, mundo!');
  res.send('¡Hola, mundo!');
});

router.get('/', (req, res) => {
    console.log('¡Hola, cliente!');
  res.send('¡Hola, cliente!');
});

router.get('/all', (req, res) => {
    clienteController.obtenerClientes((err,results)=>{
        if(err){
            return res.status(500).json({ error: 'Error al obtener los clientes' });
        }
        res.json(results);
    });
});



module.exports = router;