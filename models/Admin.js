const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const adminSchema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: string
    },
    role: {
        type: Number,
        enum: [2000, 1999]
    }
})
adminSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
adminSchema.methods.isPasswordCorrect  = async function (password) {
    return bcrypt.compare(password, this.password);
}
module.exports = adminSchema