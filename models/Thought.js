// What is used to import the mongoose npm package

const { Schema, model, Types } = require('mongoose');

// this is going to import the dateFormat function

const dateFormat = require('../utils/dateFormat');

// this is going to create the Reaction Schema

const ReactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        maxLength: 280,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdaAtVal => dateFormat(createdAtVal)
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// this is going to create the Thought Schema

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        maxLength: 280,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },

    // this is going to prevent virtuals from creating duplicate of _id as `id`

    id: false
}
);

// will define a mongoose virtual for counting the number of reactions that a thought has
ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

// this will define the Thought model

const Thought = model('Thought', ThoughtSchema);

// this is going to export the Thought model

module.exports = Thought;