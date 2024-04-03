const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  comments: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
    required: true
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'doctors', // Reference to the Doctor model
    required: true
  }
});

const Feedback = mongoose.model('feedbacks', feedbackSchema);

module.exports = Feedback;
