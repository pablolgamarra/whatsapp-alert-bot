const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    //Codigo que va a enviar la pagina de inicio / bienvenida
    console.log(`Method: ${req.method} -- Time: ${new Time()}`);
})

router.get('/login', (req, res) => {
    //Codigo que va a enviar el formulario de inicio de sesion
    console.log(`Method: ${req.method} -- Time: ${new Time()}`);
})

router.post('/', (req, res) => {
    console.log(`Method: ${req.method} -- Time: ${new Time()}`);
})

router.get('/', (req, res) => {
    console.log(`Method: ${req.method} -- Time: ${new Time()}`);
})

router.get('/', (req, res) => {
    console.log(`Method: ${req.method} -- Time: ${new Time()}`);
})