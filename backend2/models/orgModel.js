
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  orgName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;