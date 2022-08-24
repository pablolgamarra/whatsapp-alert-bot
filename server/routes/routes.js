const express = require('express');
const fs = require('node:fs');

const Router = express.Router();

Router.get('/api/qr', (req, res) => {
    res.json({ qr: `${fs.readFileSync('QRCode.txt')}` })
})

module.exports = Router;