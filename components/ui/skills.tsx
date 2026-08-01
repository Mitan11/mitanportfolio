"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const SkillsSection = ({ id = "skills", className, children }: SkillsSectionProps) => {
  return (
    <section id={id} className={cn("relative w-full bg-white py-24 md:py-32 overflow-hidden", className)}>
      {children}
    </section>
  );
};

export const SkillsBackground = () => {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
  );
};

export const SkillsHeader = ({ 
  headerTitle = "Technical Stack",
  headingStart = "Tools of the ",
  headingHighlight = "Trade",
  description = "A curated selection of modern technologies and frameworks I use to build scalable, high-performance digital solutions."
}: { 
  headerTitle?: string,
  headingStart?: string,
  headingHighlight?: string,
  description?: string 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8"
    >
      <div>
        <span className="inline-block text-xs text-[#2563eb] uppercase tracking-[0.15em] px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100 shadow-sm">
          {headerTitle}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight">
          {headingStart} <span className="text-[#2563eb]">{headingHighlight}</span>.
        </h2>
      </div>
      <p className="text-gray-500 max-w-md text-base md:text-lg leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export const SkillsGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
      {children}
    </div>
  );
};

export const SkillCard = ({
  idx,
  category,
  description,
  skills,
  colSpan,
  bgColor,
  borderColor,
}: {
  idx: number;
  category: string;
  description: string;
  skills: string[];
  colSpan: string;
  bgColor: string;
  borderColor: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative ${colSpan} ${bgColor} border ${borderColor} rounded-[2rem] p-8 md:p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between will-change-transform`}
    >
      {/* Subtle hover reveal gradient */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 mb-10">
        <h3 className="text-2xl md:text-3xl text-gray-900 mb-3 tracking-tight group-hover:text-[#2563eb] transition-colors duration-300">
          {category}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2.5">
        {skills.map((skill, sIdx) => (
          <span
            key={sIdx}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-black/5 shadow-sm rounded-xl hover:shadow-md hover:-translate-y-1 hover:text-[#2563eb] transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
