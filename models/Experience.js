import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String },
  skills: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
