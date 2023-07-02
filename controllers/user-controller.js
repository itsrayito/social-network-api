// this is going to import the User model

const { User } = require('../models');

// this will define an object with the database query functions

const UserController = {

    // this is going to get all users from the database

    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // this will get one user from the database using the provided ID

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });

    },

    // this is going to create a user in the database

    createUser({ body }, res) {
        console.log("Body", body);
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // this is going to update the user by id in the database using the provided ID

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user was found with this ID. '});
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

        // this is going to delete the user from thr database using the provided ID

        deleteUser({ params }, res) {
            User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        },

        // this is going to add a friend to a user in the database using the provided IDs for the user and friend

        addFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user was found with this ID. '})
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

        // this is going to remove a friend from a user in the database using the provided user and the friend IDs

        removeFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true, runValidators: true })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user was found with this ID. '});
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.json(err));
        }
    };

    // this will export the UserController object
    
    module.exports = UserController;