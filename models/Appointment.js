const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    user: {
        fullname: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other']
        },
        issue: {
            type: String,
            required: true
        }
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctors', // Reference to the Doctor model
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    dateTime: {
        type: Date
    },
    feedback:{
        type: Schema.Types.ObjectId,
        ref: 'feedbacks',
    },
    status:{
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('appointments', appointmentSchema);

module.exports = Appointment;
