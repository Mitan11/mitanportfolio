import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mitan Tank | Full Stack & Frontend Web Developer | Freelancer Portfolio",
  description:
    "Explore the portfolio of Mitan Tank – a Full Stack & Frontend Developer specializing in React, Next.js, JavaScript, and modern web development. Available for freelance projects and collaborations.",
  keywords:
    "Mitan, Mitan Tank, Mitan Portfolio, Mitan Tank Portfolio, Freelancer, Freelance Developer, Frontend Developer, Full Stack Developer, React Developer, Next.js Developer, JavaScript Developer, Portfolio Website, Web Developer India, Remote Web Developer, UI/UX Developer, Software Engineer, HTML CSS JavaScript, TypeScript Developer, Tailwind CSS, GitHub Projects, SEO-Friendly Portfolio, Responsive Web Design, Modern Web Apps, Hire Developer Online",
  authors: [{ name: "Mitan Tank" }],
  creator: "Mitan Tank",
  publisher: "Mitan Tank",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mitanportfolio.vercel.app/",
    title: "Mitan Tank | Full Stack & Frontend Developer | Freelancer Portfolio",
    description:
      "Discover the work of Mitan Tank, expert in full stack and frontend development using React, Next.js, and modern web tech. Browse projects or hire for freelance work.",
    siteName: "Mitan Tank Portfolio",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mitan Tank | Full Stack & Frontend Web Developer",
    description:
      "Hire Mitan Tank – Full Stack & Frontend Developer skilled in React, Next.js, JavaScript, and responsive web development. Explore portfolio projects and contact today.",
    creator: "@mitantank",
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="8fnLGkdVtcMdIb5oAcjpEgK1yyYUxpEHdzXOSMtRqyQ" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              className: 'dark:bg-black-100 dark:text-white bg-white text-black',
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              },
              success: {
                iconTheme: {
                  primary: '#8B5CF6',
                  secondary: 'white',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
