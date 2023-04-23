import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      enum: ["pendiente", "finalizado"],
      required: true,
      default: "pendiente",
    },
    finishDate: {
      type: Date,
      default: Date.now(),
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Projects", projectSchema);
export default Project;
