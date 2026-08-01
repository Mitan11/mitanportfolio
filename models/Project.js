import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  github: { type: String },
  features: [{ type: String }],
  techStack: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
