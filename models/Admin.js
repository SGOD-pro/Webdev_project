const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const adminSchema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    passwrod: {
        type: string
    }
})
adminSchema.plugin(passportLocalMongoose)
module.exports = adminSchema
