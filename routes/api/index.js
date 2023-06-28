// will create an instance of an express router
const router = require('express').Router();

// this is going to import the user and thoughts API routes
const usersRoutes = require('./users-routes');
const thoughtsRoutes = require('./thoughts-routes');

// defining the middleware for using both api routes for users and thoughts
router.get('/users', usersRoutes);
router.get('/thoughts', thoughtsRoutes);

// this will export the router
module.exports = router;