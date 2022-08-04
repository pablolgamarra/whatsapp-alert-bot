const express = require('express');
const app = express();

const Router = require('./routes/routes');

app.use(Router);

app.get('/', (req, res) => {
    res.send("Hello World");
});

module.exports = app;