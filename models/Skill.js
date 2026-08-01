import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  skills: [{ type: String }],
  bgColor: { type: String },
  borderColor: { type: String },
  colSpan: { type: String }
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
