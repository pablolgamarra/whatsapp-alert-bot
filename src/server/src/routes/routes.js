const express = require('express');
const fs = require('node:fs');

const Router = express.Router();

Router.get('/api/qr', (req, res) => {
    res.json({ qr: `${fs.readFileSync('QRCode.txt')}` })
})

Router.get('/api/messages', (req,res)=>{
    res.json({messages: `${require('../config/botMessages/messages.json')}`})
})

module.exports = Router;