// Require packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');

// Setting up route const
const routes = require('./routes/api');

// Connecting to the DB
mongoose.connect('mongodb://admin:admin123@ds261155.mlab.com:61155/jobs', { useNewUrlParser: true}, (err)=>{
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
    console.log(`Backend is running on :${PORT}`);
    console.log(`To get data from frontend fetch \'http://localhost:5000/api/jobs\'`);
    console.log(`To get data from react-native app fetch \'http://192.168.1.102:5000/api/jobs\' (change 192... to your Ipv4)`)
})