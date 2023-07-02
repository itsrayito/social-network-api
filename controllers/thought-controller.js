// this is going to import the thought and user models

const { Tought, User } = require('../models');

const thoughtController = {

    // this will get all thoughts from the database

    getAllThought(req, res) {
        thoughtController.find({})
        // .populate({
        //    path: 'thoughts',
        //    select: '-__v'
        //})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // this gets one thought from the database using the provided ID

    getThoughtById({ params}, res) {
        thoughtController.findOne({ _id: params.id })
        // .populate({
        //    path: 'thoughts',
        //    select: '-__v'
        //})
        select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // this will add a thought to a user in the database

    addThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
                res.status(404).json({ message: 'No user was found with this id. '});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // this is going to update a thought in the database using the ID provided

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true })
        
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought was found with this ID.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // this is going to remove a thought from the database using the provided ID
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.toughtId })
        .then(deletedThought => {
            console.log("Deleted thought:",deletedThought);
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought was found with this ID. '});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user was found with this ID. '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

        // this is going to add a reaction to a thought in the database using the provided ID
        addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID. '});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },

        // this will remove a reaction from a thought in the database using the provided ID
        removeReaction({ params }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        }
    };

    // this is going to export the thoughtController object
    module.exports = thoughtController;
