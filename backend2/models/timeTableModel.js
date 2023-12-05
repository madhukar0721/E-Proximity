const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
