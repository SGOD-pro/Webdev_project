const mongoose = require('mongoose')

const { Schema } = mongoose;

const tipsSchema = new Schema({
    tips: {
        type: String
    },
    uploder: {
        type: String,
    },
})

module.exports = mongoose.model('tips', tipsSchema);