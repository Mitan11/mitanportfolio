"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const AboutSection = ({ id = "about", className, children }: AboutSectionProps) => {
  return (
    <section id={id} className={cn("bg-[#2563eb] pt-20 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans", className)}>
      {children}
    </section>
  );
};

export const AboutContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start", className)}>
      {children}
    </div>
  );
};

export const AboutBadge = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
      <div data-aos="drop-bounce" className="relative flex justify-center w-full">
        {/* Lanyard string */}
        <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black transform -translate-x-1/2 shadow-inner z-0"></div>
        {/* Lanyard clip */}
        <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"></div>
        
        {/* Badge Card */}
        <div className="bg-gray-900 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          {/* Cutout Hole */}
          <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-900 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
            <div className="w-8 h-2 bg-black/30 rounded-full shadow-inner"></div>
          </div>
          {/* Image Container */}
          <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 border-2 border-transparent">
            <img 
              src={imageSrc} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">
      {children}
    </div>
  );
};

export const AboutDivider = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
      </svg>
    </div>
  );
};

export const AboutStars = () => {
  return (
    <>
      <div className="absolute top-10 right-10 md:right-20 text-black opacity-30 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-black opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </>
  );
};
