import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'finalizado'],
    default: 'pendiente'
  },
  finishDate: {
    type: Date,
    default: Date.now()
  },
  image: String
}, {
  timestamps: true
})

export const Project = mongoose.model('Projects', projectSchema)