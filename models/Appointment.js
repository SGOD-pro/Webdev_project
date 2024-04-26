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
        },
        date: {
            type: String,
            required: true
        },
        time: {
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

    feedback: {
        type: Schema.Types.ObjectId,
        ref: 'feedbacks',
    },
    status: {
        type: String,
        default: "PENDING",
        enum: ['PENDING', 'CANCEL', 'SUCCESS']
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('appointments', appointmentSchema);

module.exports = Appointment;
