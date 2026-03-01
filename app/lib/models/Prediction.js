import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
  disease: String,
  confidence: Number,
  treatment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Prediction ||
  mongoose.model("Prediction", PredictionSchema);