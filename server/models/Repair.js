const mongoose = require('mongoose');

const RepairSchema = new mongoose.Schema({
  item: { type: String, required: true },
  issue: { type: String, required: true },
  cost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repair', RepairSchema);