"use client";
import React from "react";
import { motion, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ExpertiseSectionProps {
  id?: string;
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
  children: React.ReactNode;
}

export const ExpertiseSection = ({ id = "expertise", containerRef, className, children }: ExpertiseSectionProps) => {
  return (
    <section
      id={id}
      ref={containerRef as any}
      className={cn("bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]", className)}
    >
      <div className="max-w-6xl mx-auto relative md:h-[1350px]">
        {children}
      </div>
    </section>
  );
};

export const ExpertiseHeader = ({
  headerTitle = "My Expertise",
  heading = "Building Modern Digital Solutions with Code & AI",
  description = "Combining full-stack development, artificial intelligence, and cloud technologies to create scalable and impactful digital experiences."
}: {
  headerTitle?: string,
  heading?: string,
  description?: string
}) => {
  return (
    <div data-aos="fade-up" className="relative md:absolute top-10 left-0 md:w-[480px] z-20 mb-16 md:mb-0">
      {/* Background mask for mobile to hide the dotted line */}
      <div className="absolute inset-0 bg-white md:hidden -mx-6 -my-12 z-[-1] mask-gradient" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent)' }} />
      <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 mb-8 shadow-sm bg-white">
        {headerTitle}
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.25] md:leading-[1.1] mb-6 tracking-tight">
        {heading}
        {/* Hand-drawn arrow */}
        <span className="inline-block ml-6 md:ml-8 align-bottom translate-y-1 md:translate-y-2">
          <svg className="w-10 h-10 md:w-14 md:h-14 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" className="hidden" />
            <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </h2>
      <p className="text-gray-500 text-base md:text-lg max-w-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export const ExpertiseDesktopPath = ({ pathLength }: { pathLength: MotionValue<number> }) => {
  return (
    <svg
      className="hidden md:block absolute top-0 left-0 w-full h-[1350px] pointer-events-none z-0"
      viewBox="0 0 1000 1350"
      preserveAspectRatio="none"
    >
      {/* Faint background path (optional guide) */}
      <path
        d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeDasharray="8 10"
      />

      {/* Mask to reveal the dashed path based on scroll */}
      <mask id="path-mask">
        <motion.path
          d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
          fill="none"
          stroke="white"
          strokeWidth="20"
          style={{ pathLength }}
        />
      </mask>

      {/* The actual dashed line that gets revealed */}
      <path
        d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeDasharray="8 10"
        mask="url(#path-mask)"
        className="drop-shadow-sm"
      />
    </svg>
  );
};

export const ExpertiseMobilePath = ({ pathLength }: { pathLength: MotionValue<number> }) => {
  return (
    <svg
      className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0"
      viewBox="0 0 4 100"
      preserveAspectRatio="none"
    >
      <path
        d="M 2,0 L 2,100"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="4"
        strokeDasharray="4 6"
        vectorEffect="non-scaling-stroke"
      />
      <mask id="path-mask-mobile">
        <motion.path
          d="M 2,0 L 2,100"
          fill="none"
          stroke="white"
          strokeWidth="10"
          style={{ pathLength }}
        />
      </mask>
      <path
        d="M 2,0 L 2,100"
        fill="none"
        stroke="black"
        strokeWidth="4"
        strokeDasharray="4 6"
        mask="url(#path-mask-mobile)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export const ExpertiseCardsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
      {children}
    </div>
  );
};

export const ExpertiseCard = ({
  number,
  title,
  text,
  className,
  aosDelay,
  aosType
}: {
  number: string;
  title: string;
  text: string;
  className?: string;
  aosDelay?: string;
  aosType?: string;
}) => {
  return (
    <div className={`z-10 ${className}`}>
      <div
        data-aos={aosType || "fade-up"}
        data-aos-delay={aosDelay}
        className="w-72 sm:w-80 rounded-[2.5rem] p-3 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
      >
        {/* The hole punch */}
        <div className="w-5 h-5 bg-gradient-to-br from-gray-200 to-gray-50 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] absolute top-4 border border-gray-200 z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full opacity-40"></div>
        </div>

        {/* Inner container */}
        <div className="w-full h-full rounded-[2rem] mt-8 p-7 flex flex-col min-h-[220px] bg-[#f4f5f7] transition-colors duration-700">
          <span className="text-xl mb-2 font-serif italic text-slate-400">{number}</span>

          <h3 className="text-2xl mb-3 tracking-tight font-bold text-slate-900">{title}</h3>

          <p className="text-sm leading-relaxed text-slate-500">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ExpertiseEndText = () => {
  return (
    <div
      data-aos="fade-in"
      data-aos-delay="600"
      className="hidden md:block absolute top-[1250px] left-[60%] font-['Caveat',cursive] text-3xl text-gray-600 rotate-6"
    >
      Turning ideas into reality!
    </div>
  );
};
