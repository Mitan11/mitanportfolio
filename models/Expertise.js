import mongoose from 'mongoose';

const expertiseSchema = new mongoose.Schema({
  expertiseId: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Expertise || mongoose.model('Expertise', expertiseSchema);
