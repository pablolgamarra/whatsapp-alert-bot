const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, (error) => {
    if (error) {
        console.log(`An error was happened on server running. Error: ${error}`);
    }
    console.log(`Server Listening on port 3000`);
});
