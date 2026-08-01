"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import {
  AboutSection,
  AboutContainer,
  AboutBadge,
  AboutContent,
  AboutDivider,
  AboutStars
} from '@/components/ui/about';

const About = () => {
  const aboutData = useSelector((state) => state.portfolio.about);

  return (
    <AboutSection>
      <AboutContainer>
        
        {/* Left Side: ID Badge */}
        <AboutBadge imageSrc="/image.jpg" />

        {/* Right Side: Info Content */}
        <AboutContent>
          <h2 className="text-4xl md:text-5xl text-black mb-4">{aboutData.title}</h2>
          <p className="text-lg mb-12 leading-relaxed max-w-3xl text-blue-50">
            Hi, my name is <span className="text-black text-xl mx-1 tracking-wide uppercase">{aboutData.name}</span>, {aboutData.description}
          </p>
        </AboutContent>
        
      </AboutContainer>

      {/* Torn paper divider at bottom */}
      <AboutDivider />

      {/* Decorative stars */}
      <AboutStars />
    </AboutSection>
  );
};

export default About;
