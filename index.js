/* =================
    Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate express application.
const router = express.Router(); // Creates an new router objects.
const mongoose = require('mongoose'); // Node Tool for mongoDB.
mongoose.Promise = global.Promise;
const config = require('./config/database'); //Mongoose Config.

const path = require('path'); // Nodejs package for file paths.
const authentication = require('./routes/authentication')(router); // Import authentication routes.
const bodyParser = require('body-parser'); // Parse incoming request bodies in middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providung a Connect/Express middleware that can be used to enable CORS with various options.

const port = process.env.PORT || 8080;

// Database Connection
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could NOT connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

// Middleware
app.use(cors({ origin: 'http://localhost:8080'}));
app.use(bodyParser.urlencoded({ extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use('/authentication', authentication); // Use Authentication routes in in application

// Connect server to Angular 2 index.html
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

// start server: listen on port 8080
app.listen(port, () => {
    console.log('Listening on port ' + port);
});