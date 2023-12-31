// this is going to create an instance of an express router
const router = require('express').Router();

// thought controller functions import
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// the route for /api/thoughts
router
    .route('/')
    .get(getAllThought)

// the route for /api/thoughts/<userId> 
router
    .route('/:userId')
    .post(addThought);

// the route for /api/thoughts/<thoughtId>
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

    // the route for /api/thoughts/<thoughtId>/users/<userId>/
    router
        .route('/:thoughtId/users/:userId/')
        .put(addReaction)
        .delete(removeThought);

        // the route for /api/thoughts/<thoughtId>/users/<userId>/reactions/<reactionId>
        router
            .route('/:thoughtId/users/:userId/reactions/:reactionId')
            .put(removeReaction);

// this is going to export the router
module.exports = router;