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
mongoose.connect('mongodb://admin:admin12345@ds243148.mlab.com:43148/amazoon', { useNewUrlParser: true}, (err)=>{
    if (err) throw err;
    console.log('From app.js: database connected');
})

var db = mongoose.connection;

// Initializing app
const app = express();

const PORT = 7000;

app.use(cors());
app.use(bodyParser.json()); 

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
})

app.listen(PORT, () => {
    console.log(`Amazoon is running on :${port}`);
    console.log(`To fetch data from backend ${networkUrl}`);
})