const express = require('express');
const router = express.Router();
const path = require('path'); 
const eventoController = require('../controllers/eventoController.js');

router.get('/evento', (req, res) => {
    console.log('¡Hola, mundo!');
  res.send('¡Hola, mundo!');
});

router.get('/', (req, res) => {
    console.log('¡Hola, evento!');
  res.send('¡Hola, evento!');
});

router.get('/all', (req, res) => {
    eventoController.jsonFull((err,results)=>{
        if(err){
            return res.status(500).json({ error: 'Error al obtener los eventos' });
        }
        res.json(results);
    }); 
});
//Brete jose

module.exports = router;