const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname:{
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        enum: [2000, 1999],
        required: true
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
const Admin = mongoose.model('admins', adminSchema);
module.exports = Admin