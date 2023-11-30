import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  category: {
    type: String,
  },
  priority: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    index: true
  },
},
{ timestamps: true });

export default mongoose.model('Tasks', TaskSchema);
