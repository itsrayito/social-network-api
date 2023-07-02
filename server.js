// will import the express npm

const express = require('express');

// will import the mongoose npm package

const mongoose = require('mongoose');

// this is going to create an instance of an express app
const app = express();

// will define the port
const PORT = process.env.PORT || 3001;

// this defines the middleware for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// will connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// you will use this to log mongo queries being executed
mongoose.set('debug', true);

// this defines the middleware to import the API routes
app.use(require('./routes'));

// this is going to start the server
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));