"use client";
import React from "react";
import { cn } from "@/lib/utils";
import LetterGlitch from "@/components/LetterGlitch";

interface HeroSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const HeroSection = ({ id = "home", className, children }: HeroSectionProps) => {
  return (
    <section id={id} className={cn("relative w-full h-screen overflow-hidden bg-black", className)}>
      {children}
    </section>
  );
};

export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-30">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
            glitchColors={['#2563eb', '#3b82f6', '#0ea5e9']}
          />
        </div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNMzAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10 pointer-events-none" />
    </>
  );
};

export const HeroContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 z-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center items-center text-center w-full h-full">
      <div className="flex flex-col items-center text-center max-w-2xl w-full">
        {children}
      </div>
    </div>
  );
};

export const HeroHeading = ({ children, delay = "50" }: { children: React.ReactNode; delay?: string }) => {
  return (
    <h1
      data-aos="fade-up"
      data-aos-delay={delay}
      className="text-white text-4xl sm:text-5xl md:text-6xl mb-5 tracking-tight leading-[1.05]"
    >
      {children}
    </h1>
  );
};

export const HeroSubheading = ({ children, delay = "200" }: { children: React.ReactNode; delay?: string }) => {
  return (
    <p
      data-aos="fade-up"
      data-aos-delay={delay}
      className="text-white/90 text-sm md:text-base lg:text-lg mb-8 max-w-xl leading-relaxed drop-shadow-sm mx-auto"
    >
      {children}
    </p>
  );
};

export const HeroActions = ({ children, delay = "400" }: { children: React.ReactNode; delay?: string }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="flex flex-row justify-center items-center gap-4 w-full"
    >
      {children}
    </div>
  );
};

export const HeroScrollIndicator = ({ delay = "800" }: { delay?: string }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
    >
      <div className="animate-bounce">
        <svg
          className="w-5 h-5 text-white opacity-70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};
