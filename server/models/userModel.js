const {Schema, model} = require('mongoose');

// Define the UserSchema using the Mongoose Schema constructor
const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
});

// Create and export the User model using the UserSchema
module.exports = model('User', UserSchema);