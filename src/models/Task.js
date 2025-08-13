const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  status: { type: String, enum: ['todo','in_progress','done'], default: 'todo' },
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
