import mongoose from 'mongoose';

const generalSettingsSchema = new mongoose.Schema({
  navbar: {
    links: [String],
    resumeLink: String
  },
  hero: {
    heading: String,
    subheading: String,
    primaryButtonText: String,
    primaryButtonLink: String,
    secondaryButtonText: String,
    secondaryButtonLink: String
  },
  about: {
    title: String,
    name: String,
    description: String
  },
  contact: {
    heading: String,
    formHeading: String,
    email: String,
    location: String,
    socials: {
      linkedin: String,
      facebook: String,
      instagram: String,
      github: String
    }
  },
  footer: {
    brandName: String,
    tagline: String,
    copyright: String,
    links: [{
      name: String,
      url: String
    }]
  },
  expertise: {
    headerTitle: String,
    heading: String,
    description: String
  },
  experience: {
    headerTitle: String
  },
  skills: {
    headerTitle: String,
    headingStart: String,
    headingHighlight: String,
    description: String
  },
  projects: {
    headerTitle: String,
    heading: String,
    description: String
  },
  certifications: {
    headerTitle: String,
    headingStart: String,
    headingHighlight: String,
    description: String
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
    openGraphTitle: String,
    openGraphDescription: String,
    twitterTitle: String,
    twitterDescription: String
  }
}, { timestamps: true });

// Bypass Next.js hot-reloading caching issues
delete mongoose.models.GeneralSettings;
export default mongoose.model('GeneralSettings', generalSettingsSchema);
