const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  duration: { type: Number, required: true },
  // We keep 'user' optional so Admin/Seed data can exist without a specific user
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

module.exports = mongoose.model('Data', DataSchema);