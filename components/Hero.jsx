"use client";
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import {
  HeroSection,
  HeroBackground,
  HeroContent,
  HeroHeading,
  HeroSubheading,
  HeroActions,
  HeroScrollIndicator
} from '@/components/ui/hero';

const Hero = () => {
  const heroData = useSelector((state) => state.portfolio.hero);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  return (
    <HeroSection>
      <HeroBackground />
      <HeroContent>
        <HeroHeading>
          Hi, I’m a <br />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
            {heroData.heading}
          </span>
        </HeroHeading>
        <HeroSubheading>
          {heroData.subheading}
        </HeroSubheading>
        <HeroActions>
          <a
            href={heroData.primaryButtonLink}
            className="px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full bg-white text-black hover:bg-neutral-100 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg inline-block text-center"
          >
            {heroData.primaryButtonText}
          </a>
          <a
            href={heroData.secondaryButtonLink}
            className="px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full bg-black/10 border border-white text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md transform hover:-translate-y-0.5 inline-block text-center"
          >
            {heroData.secondaryButtonText}
          </a>
        </HeroActions>
      </HeroContent>
      <HeroScrollIndicator />
    </HeroSection>
  );
};

export default Hero;