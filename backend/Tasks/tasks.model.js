import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects',
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'finalizado'],
    default: 'pendiente'
  },
  priority: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'alta'
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Tasks', taskSchema)
export default Task
