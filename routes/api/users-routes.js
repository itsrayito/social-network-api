// this is going to create an instance of an express router
const router = require('express').Router();

// user controller functions import
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// route for /api/users
router.route('/')
.get(getAllUser)
.post(createUser);

// route for /api/users/<id>
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// route for /api/users/<userId>/friends/<friendId>
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.put(removeFriend);

// this is going to export the router
module.exports = router;