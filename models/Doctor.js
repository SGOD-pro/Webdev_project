const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactNo: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10,}/.test(v); // Validates that phone number has at least 10 digits
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  timing: {
    type: String,
    required: true
  },
  days: {
    type: [String],
    required: true
  },
  clinicLocation: {
    type: String,
    required: true
  },
  charges: {
    type: Number,
    required: true
  }
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;
