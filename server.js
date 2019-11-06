// Require packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');
const { networkUrl, port } = require('./config');

// Setting up route const
const routes = require('./routes/api');

// Connecting to the DB
mongoose.connect('mongodb://admin:admin12345@ds241968.mlab.com:41968/employme', { useNewUrlParser: true}, (err)=>{
    if (err) throw err;
    console.log('From app.js: database connected');
})

var db = mongoose.connection;

// Initializing app
const app = express();

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); 

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
})

app.listen(PORT, () => {
    console.log(`Backend is running on :${port}`);
    console.log(`To fetch data from backend ${networkUrl}`);
})