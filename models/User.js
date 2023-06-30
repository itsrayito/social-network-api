// What is used to import the mongoose npm package

const { Schema, model } = require('mongoose');

// will import the dateFormat function

const dateFormat = require('../utils/dateFormat');

// this is going to define the User Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Enter your email address'],
        unique: true,
        lowercase: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Validation for the Email has failed!'
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: Thought
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },

    // this will prevent virtuals from creating duplicates of _id as `id`

    id: false
    }
);

// this is going to define a mongoose virtual for counting the number of friends that a user has

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

// this is going to define the User model

const User = model('User', UserSchema);

// this is going to export the User model

module.exports = User;