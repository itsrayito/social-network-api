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
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// the route for /api/thoughts
router
.route('/')
.get(getAllThought);

// the route for /api/thoughts/<userId> router
router.route('/:userId')
.get(getThoughtById)
.post(addThought)
.put(updateThought)
.delete(removeThought);

// the route for /api/thoughts/<thoughtId>
router.route('/:thoughtId/reactions/:reactionId')
.post(addReactions)
.delete(removeReaction);

// this is going to export the router
module.exports = router;