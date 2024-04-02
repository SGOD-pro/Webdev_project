const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10,}/.test(v); // Validates that phone number has at least 10 digits
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of email addresses
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('users', userSchema);

module.exports = User;
