import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
