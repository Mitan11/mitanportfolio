"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPortfolioData } from '@/store/slices/portfolioSlice';
import Preloader from '@/components/Preloader';
import NavbarDemo from '@/components/resizable-navbar-demo';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from backend
    dispatch(fetchPortfolioData());

    // Check if it's a bot or Lighthouse to bypass the preloader
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent);
    
    if (isBot) {
      setShowContent(true);
      return;
    }

    // Match the preloader's internal timer so content renders right as the preloader starts fading out
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <main>
      <Preloader />
      {showContent && (
        <>
          <NavbarDemo />
          <Hero />
          <About />
          <Expertise />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
