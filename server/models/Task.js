// Task schema defines what a task looks like in MongoDB

const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: String,
    required: true,
  },

   // Only premium users can control priority + notes
  priority: {
    type: String,
    default: 'Medium',
  },
  notes: {
    type: String,
    default: '',
},
completed: {
  type: Boolean,
  default: false,
},

// Owner links task to a specific user 
owner: {
  type: Schema.ObjectId,
  required: true,
  ref: 'Account',
},
createdDate: {
  type: Date,
  default: Date.now,
},
});

TaskSchema.statics.toAPI = (doc) => ({
_id: doc._id,
title: doc.title,
subject: doc.subject,
dueDate: doc.dueDate,
priority: doc.priority,
notes: doc.notes,
completed: doc.completed,
});

module.exports = mongoose.model('Task', TaskSchema);