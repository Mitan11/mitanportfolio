import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dbConnect from "@/lib/mongodb";
import GeneralSettings from "@/models/GeneralSettings";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  
  let seoData = {
    title: "Mitan Tank | Full Stack & Frontend Web Developer | Freelancer Portfolio",
    description: "Explore the portfolio of Mitan Tank – a Full Stack & Frontend Developer specializing in React, Next.js, JavaScript, and modern web development. Available for freelance projects and collaborations.",
    keywords: [
      "Mitan Tank",
      "Portfolio",
      "React Developer",
      "Next.js Developer",
      "Frontend Developer",
      "Full Stack Developer",
      "JavaScript Developer",
      "Freelancer",
      "Tailwind CSS",
      "TypeScript",
      "Web Developer India",
    ],
    openGraphTitle: "Mitan Tank | Full Stack & Frontend Developer | Freelancer Portfolio",
    openGraphDescription: "Discover the work of Mitan Tank, expert in full stack and frontend development using React, Next.js, and modern web tech. Browse projects or hire for freelance work.",
    twitterTitle: "Mitan Tank | Full Stack & Frontend Web Developer",
    twitterDescription: "Hire Mitan Tank – Full Stack & Frontend Developer skilled in React, Next.js, JavaScript, and responsive web development. Explore portfolio projects and contact today.",
  };

  try {
    const settings = await GeneralSettings.findOne({});
    if (settings && settings.seo && settings.seo.title) {
      // Override with DB values if they exist
      if (settings.seo.title?.trim()) seoData.title = settings.seo.title;
      if (settings.seo.description?.trim()) seoData.description = settings.seo.description;
      if (settings.seo.keywords && settings.seo.keywords.length > 0) seoData.keywords = settings.seo.keywords;
      if (settings.seo.openGraphTitle?.trim()) seoData.openGraphTitle = settings.seo.openGraphTitle;
      if (settings.seo.openGraphDescription?.trim()) seoData.openGraphDescription = settings.seo.openGraphDescription;
      if (settings.seo.twitterTitle?.trim()) seoData.twitterTitle = settings.seo.twitterTitle;
      if (settings.seo.twitterDescription?.trim()) seoData.twitterDescription = settings.seo.twitterDescription;
    }
    
    // Fetch dynamic keywords from skills and projects
    try {
      const skills = await Skill.find({}).select('category skills').lean();
      const projects = await Project.find({}).select('title techStack').lean();
      
      const dynamicKeywords = new Set<string>();
      
      skills.forEach(skill => {
        if (skill.category) dynamicKeywords.add(skill.category);
        if (Array.isArray(skill.skills)) skill.skills.forEach((s: string) => dynamicKeywords.add(s));
      });
      
      projects.forEach(project => {
        if (project.title) dynamicKeywords.add(project.title);
        if (Array.isArray(project.techStack)) project.techStack.forEach((t: string) => dynamicKeywords.add(t));
      });
      
      if (dynamicKeywords.size > 0) {
        seoData.keywords = Array.from(new Set([...seoData.keywords, ...Array.from(dynamicKeywords)]));
      }
    } catch (e) {
      console.error("Failed to fetch dynamic keywords", e);
    }
    
  } catch (error) {
    console.error("Failed to fetch SEO settings from DB:", error);
  }

  return {
    metadataBase: new URL("https://mitanportfolio.vercel.app"),
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    authors: [{ name: "Mitan Tank" }],
    creator: "Mitan Tank",
    publisher: "Mitan Tank",
    category: "technology",
    applicationName: "Mitan Tank Portfolio",
    referrer: "origin-when-cross-origin",
    manifest: "/site.webmanifest",
    
    alternates: {
      canonical: "https://mitanportfolio.vercel.app",
    },
    
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    appleWebApp: {
      capable: true,
      title: "Mitan Tank Portfolio",
      statusBarStyle: "black-translucent",
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      title: seoData.openGraphTitle,
      description: seoData.openGraphDescription,
      siteName: "Mitan Tank Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Mitan Tank Portfolio",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      creator: "@mitantank",
      images: ["/og-image.png"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      google: '8fnLGkdVtcMdIb5oAcjpEgK1yyYUxpEHdzXOSMtRqyQ',
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

import { Providers } from "@/store/Provider";

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mitan Tank",
              "url": "https://mitanportfolio.vercel.app",
              "jobTitle": "Full Stack Developer",
              "sameAs": [
                "https://github.com/Mitan11",
                "https://linkedin.com/in/mitan-tank-986076247"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
