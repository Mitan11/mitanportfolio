import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import project1Img from '@/assets/project/project1.png';
import project2Img from '@/assets/project/project2.png';
import project3Img from '@/assets/project/project3.png';
import api from '@/lib/api';

const initialState = {
  status: 'idle',
  error: null,
  navbar: {
    links: ['Home', 'About', 'Expertise', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'],
    resumeLink: 'https://drive.google.com/file/d/1XJUZixsKYacAhid1zfvRzJG-plAQR4Nj/view?usp=sharing'
  },
  hero: {
    heading: 'Full Stack Developer',
    subheading: 'I build fast, scalable and modern web applications using React, Next.js, Node.js, and Tailwind CSS with the assist of AI.',
    primaryButtonText: 'View My Work',
    primaryButtonLink: '#projects',
    secondaryButtonText: 'Contact Me',
    secondaryButtonLink: '#contact',
  },
  about: {
    title: 'Hello!',
    name: 'MITAN',
    description: 'a passionate full-stack developer dedicated to crafting clean, functional, and highly scalable web applications.',
  },
  expertise: {
    headerTitle: 'My Expertise',
    heading: 'Building Modern Digital Solutions with Code & AI',
    description: 'Combining full-stack development, artificial intelligence, and cloud technologies to create scalable and impactful digital experiences.',
    cards: [
      {
        id: "01",
        title: "Frontend Development",
        text: "Crafting responsive and interactive user interfaces using React, Next.js, JavaScript, Tailwind CSS, and modern frontend technologies to deliver seamless user experiences."
      },
      {
        id: "02",
        title: "Backend Development",
        text: "Building secure REST APIs, authentication systems, server-side applications, and database integrations with scalable architectures."
      },
      {
        id: "03",
        title: "AI Tools",
        text: "Leveraging state-of-the-art AI assistants and generative tools like ChatGPT, Claude, GitHub Copilot, Cursor, Antigravity AI, Codex, OpenCode, and Midjourney to accelerate development."
      },
      {
        id: "04",
        title: "Cloud & Deployment",
        text: "Deploying and managing applications using Docker, GitHub Actions, CI/CD pipelines, cloud platforms, and performance optimization practices."
      }
    ]
  },
  experience: {
    headerTitle: 'My Journey',
    list: [
      {
        id: 1,
        role: "Senior Full-Stack Developer",
        company: "TechNova Solutions",
        period: "2022 - Present",
        description: "Spearheaded the architecture and development of scalable enterprise microservices. Mentored junior developers and improved overall system performance by 40% through code optimization and database indexing.",
        skills: ["React", "Node.js", "AWS", "MongoDB"]
      },
      {
        id: 2,
        role: "Frontend Engineer",
        company: "Creative Web Agency",
        period: "2020 - 2022",
        description: "Engineered highly interactive, fast, and accessible web applications. Collaborated closely with UI/UX designers to translate complex wireframes into pixel-perfect, responsive components.",
        skills: ["JavaScript", "React", "Tailwind CSS", "Framer Motion"]
      },
      {
        id: 3,
        role: "Software Developer Intern",
        company: "StartUp Inc.",
        period: "2019 - 2020",
        description: "Assisted in the design and implementation of RESTful APIs. Wrote comprehensive unit tests, fixed critical bugs, and actively participated in Agile sprint planning and daily stand-ups.",
        skills: ["Python", "Django", "PostgreSQL", "Docker"]
      }
    ]
  },
  skills: {
    headerTitle: 'Technical Stack',
    headingStart: 'Tools of the ',
    headingHighlight: 'Trade',
    description: 'A curated selection of modern technologies and frameworks I use to build scalable, high-performance digital solutions.',
    list: [
      {
        category: 'Frontend Development',
        description: 'Building responsive, interactive user interfaces and web experiences.',
        skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
        colSpan: 'md:col-span-2 lg:col-span-2',
        bgColor: 'bg-blue-50/60',
        borderColor: 'border-blue-100',
      },
      {
        category: 'Backend Architecture',
        description: 'Developing robust APIs and scalable database architectures.',
        skills: ['Node.js', 'Express.js', 'PostgreSQL', 'Java', 'Python', 'REST APIs', 'JWT', 'MySQL', 'MongoDB'],
        colSpan: 'md:col-span-2 lg:col-span-1',
        bgColor: 'bg-blue-50/60',
        borderColor: 'border-blue-100',
      },
      {
        category: 'AI Tools & Assistants',
        description: 'Leveraging generative AI to accelerate development.',
        skills: ['ChatGPT', 'Claude', 'GitHub Copilot', 'Cursor', 'Antigravity AI', 'Codex', 'OpenCode', 'Midjourney'],
        colSpan: 'md:col-span-2 lg:col-span-1',
        bgColor: 'bg-purple-50/60',
        borderColor: 'border-purple-100',
      },
      {
        category: 'Cloud & Infrastructure',
        description: 'Managing deployment, version control, and infrastructure.',
        skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'CI/CD', 'AWS', 'Figma'],
        colSpan: 'md:col-span-2 lg:col-span-2',
        bgColor: 'bg-green-50/60',
        borderColor: 'border-green-100',
      }
    ]
  },
  projects: {
    headerTitle: 'Featured Work',
    heading: 'Recent Projects',
    description: 'A selection of some of my most recent work, ranging from full-stack web applications to complex interactive frontends.',
    list: [
      {
        title: "AN Spare's & Accessories",
        subtitle: 'Full-Stack Automotive E-Commerce Platform',
        description: 'Designed and developed a scalable full-stack e-commerce platform for bike spare parts, car accessories, lubricants, garage tools, and automotive products. The platform includes a powerful admin dashboard for managing products, categories, orders, customers, and website content.',
        image: project1Img,
        link: 'https://www.anspares.com',
        github: '#',
        features: [
          'Advanced Admin Dashboard for Inventory & Order Management',
          'Product Search & Smart Filtering',
          'Razorpay Payment Integration',
          'Responsive Mobile-First Design & SEO Optimized'
        ],
        techStack: ['Next.js 15', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'shadcn/ui', 'Razorpay'],
      },
      {
        title: 'Mahi Fashion Jewellery',
        subtitle: 'Full-Stack E-Commerce Platform',
        description: 'Designed and developed a modern, high-performance e-commerce platform for a fashion jewellery brand. The application delivers a seamless shopping experience with responsive design, fast page loads, secure backend services, and an intuitive admin workflow.',
        image: project2Img,
        link: 'https://www.mahifashionjewellery.com',
        github: '#',
        features: [
          'Live metal rates integration',
          'Responsive UI optimized for mobile, tablet, and desktop',
          'Product catalog with category-based browsing',
          'Advanced search and filtering',
          'Secure backend with real-time database integration'
        ],
        techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase'],
      },
      {
        title: 'Ronan Media Service',
        subtitle: 'Premium Media Agency Website',
        description: 'Designed and developed a premium digital media agency website showcasing creative services, brand identity, portfolio, and client engagement. The website emphasizes modern aesthetics, smooth animations, responsive layouts, and high performance.',
        image: project3Img,
        link: 'https://ronanmediaservice.vercel.app',
        github: '#',
        features: [
          'Premium agency-style landing page with modern UI/UX',
          'Interactive animations & smooth page transitions',
          'Creative service showcase & portfolio case studies',
          'High-performance architecture using Next.js & Framer Motion'
        ],
        techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion', 'Zod', 'Antigravity AI'],
      }
    ]
  },
  certifications: {
    headerTitle: 'Achievements',
    headingStart: 'Licenses & ',
    headingHighlight: 'Certifications',
    description: 'Professional qualifications and specialized training that validate my technical expertise.',
    list: [
      {
        title: 'MERN Stack Certified Developer',
        organization: 'BE-Practical Tech Solutions, Bangalore',
        description: 'Comprehensive certification covering MongoDB, Express.js, React, and Node.js with hands-on full-stack projects.',
      },
      {
        title: 'Responsive Web Design',
        organization: 'freeCodeCamp',
        description: 'Mastered HTML5, CSS3, Flexbox, Grid, and responsive design principles for modern web applications.',
      },
      {
        title: 'JavaScript Algorithms',
        organization: 'freeCodeCamp',
        description: 'Advanced proficiency in JavaScript fundamentals, object-oriented programming, and complex problem solving.',
      },
      {
        title: 'React Native Development',
        organization: 'Coursera (Meta)',
        description: 'Specialization in building scalable, cross-platform mobile applications using the React Native framework.',
      }
    ]
  },
  contact: {
    heading: 'Contact',
    formHeading: 'Start a project',
    email: 'mitantank00@gmail.com',
    location: 'Gujarat, India',
    socials: {
      linkedin: 'https://linkedin.com/in/mitantank',
      facebook: 'https://facebook.com/mitan.tank.1',
      instagram: 'https://instagram.com/__.mituu._/',
      github: 'https://github.com/mitan11'
    }
  },
  footer: {
    brandName: 'MITAN TANK',
    tagline: 'Crafting digital experiences with modern web technologies.',
    copyright: '© 2026 Mitan Tank. All rights reserved.',
    links: [
      { name: 'GitHub', url: 'https://github.com/mitan11' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/mitantank' },
      { name: 'Twitter', url: 'https://x.com/MITAN36892768' }
    ]
  }
};

export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [
        settingsRes,
        projectsRes,
        experiencesRes,
        skillsRes,
        expertiseRes,
        certificationsRes
      ] = await Promise.all([
        api.get('/settings'),
        api.get('/projects'),
        api.get('/experiences'),
        api.get('/skills'),
        api.get('/expertise'),
        api.get('/certifications')
      ]);

      return {
        settings: settingsRes.data.data?.[0] || null, // Assuming Settings is a single document
        projects: projectsRes.data.data || [],
        experiences: experiencesRes.data.data || [],
        skills: skillsRes.data.data || [],
        expertise: expertiseRes.data.data || [],
        certifications: certificationsRes.data.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // Actions can be added here if we want dynamic updating from an admin panel later
    updateSection: (state, action) => {
      const { section, data } = action.payload;
      if (state[section]) {
        state[section] = { ...state[section], ...data };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { settings, projects, experiences, skills, expertise, certifications } = action.payload;

        if (settings) {
          if (settings.navbar) {
            state.navbar = { ...state.navbar, ...settings.navbar };
            if (!settings.navbar.links || settings.navbar.links.length === 0) {
              state.navbar.links = initialState.navbar.links;
            }
          }
          if (settings.hero) state.hero = { ...state.hero, ...settings.hero };
          if (settings.about) state.about = { ...state.about, ...settings.about };
          if (settings.contact) state.contact = { ...state.contact, ...settings.contact };
          if (settings.footer) state.footer = { ...state.footer, ...settings.footer };
        }

        if (projects && projects.length > 0) state.projects.list = projects;
        if (experiences && experiences.length > 0) state.experience.list = experiences;
        if (skills && skills.length > 0) state.skills.list = skills;
        if (expertise && expertise.length > 0) state.expertise.cards = expertise;
        if (certifications && certifications.length > 0) state.certifications.list = certifications;
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { updateSection } = portfolioSlice.actions;

export default portfolioSlice.reducer;
