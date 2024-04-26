const mongoose = require('mongoose')

const { Schema } = mongoose;

const tipsSchema = new Schema({
    tips: {
        type: String
    },
    uploder: {
        type: Schema.Types.ObjectId,
        ref: "doctors"
    },
}, { timestamps: true })

module.exports = mongoose.model('tips', tipsSchema);