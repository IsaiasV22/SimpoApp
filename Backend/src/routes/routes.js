const { log } = require('console');
const express = require('express');
const router = express.Router();
const path = require('path');

//definir rutas
router.get('/', (req,res)=>{
    res.send(console.log('get /'));
});

router.get('/2', (req,res)=>{
    //utilizar path para obtener la ruta del index2
    res.sendFile(path.join(__dirname, '../../public/index2.html'));
});

module.exports = router;