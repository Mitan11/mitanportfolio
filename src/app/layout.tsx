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
  title: "Mitan Tank | Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects, skills, and get in touch for collaboration opportunities.",
  keywords: "Full Stack Developer, React Developer, Next.js, Web Development, Portfolio, Mitan Tank",
  authors: [{ name: "Mitan Tank" }],
  creator: "Mitan Tank",
  publisher: "Mitan Tank",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mitantank.vercel.app",
    title: "Mitan Tank | Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects, skills, and get in touch for collaboration opportunities.",
    siteName: "Mitan Tank Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitan Tank | Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects, skills, and get in touch for collaboration opportunities.",
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
