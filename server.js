const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const path = require('path');

const app = express();

const PORT = 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
})

app.listen(PORT, () => {
    console.log(`Backend is running on :${PORT}`);
})