const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['admin', 'faculty', 'student'],
    required: true,
  },
  inviteCode: {
    type: String,
    default: ""
  },
  orgId: {
    type: String,
    required: false,
  },
  branch:{
    type:String,
    required:false
  },
  course:{
    type:String,
    required:false
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;