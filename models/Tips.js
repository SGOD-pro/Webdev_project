const mongoose = require('mongoose')

const { Schema } = mongoose;

const tipsSchema = new Schema({
    tips: {
        type: String
    },
    uploder: {
        type: String,
    },
    likes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('tips', tipsSchema);