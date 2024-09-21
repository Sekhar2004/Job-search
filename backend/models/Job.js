const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  type: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to user
});

module.exports = mongoose.model('Job', jobSchema);
