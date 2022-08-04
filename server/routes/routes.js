const express = require('express');
const userdb = require('../data/user.data');

const Router = express.Router();

Router.get('/api/users', async (req, res) => {
    //Codigo que va a enviar la pagina de inicio / bienvenida
    console.log(`New Request -- Method: ${req.method} -- Time: ${Date.now()}`);
    const users = await userdb.getUsers();
    console.log(`Response: ${users}`);
    res.json(users);
})

Router.get('/login', (req, res) => {
    //Codigo que va a enviar el formulario de inicio de sesion
    console.log(`Method: ${req.method} -- Time: ${Date.now()}`);
})

Router.post('/', (req, res) => {
    console.log(`Method: ${req.method} -- Time: ${Date.now()}`);
})

Router.get('/', (req, res) => {
    console.log(`Method: ${req.method} -- Time: ${Date.now()}`);
})

Router.get('/', (req, res) => {
    console.log(`Method: ${req.method} -- Time: ${Date.now()}`);
})

module.exports = Router