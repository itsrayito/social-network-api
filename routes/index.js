// this creates an instance of an express router
const router = require('express').Router();

// import of the API routes
const apiRoutes = require('./api');

// this will import the HTML routes
const htmlRoutes = require('./html/html-routes');

// goint to define the middleware for using the API & HTML routes
router.use('/api', apiRoutes);

// going to define the middleware for responding with a user-input error if the user tries
// to navigate to a route that does not exists
router.use((req, res) => {
    res.status(404).send('<h1> 404 Error</h1>');
});

// this is going to export the router
module.exports = router;