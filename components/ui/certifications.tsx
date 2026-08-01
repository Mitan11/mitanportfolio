"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CertificationsSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const CertificationsSection = ({ id = "certifications", className, children }: CertificationsSectionProps) => {
  return (
    <section id={id} className={cn("relative w-full bg-white py-24 md:py-32", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
};

export const CertificationsHeader = ({ 
  headerTitle = "Achievements",
  headingStart = "Licenses & ",
  headingHighlight = "Certifications",
  description = "Professional qualifications and specialized training that validate my technical expertise."
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
      className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
    >
      <div>
        <span className="inline-block text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">
          {headerTitle}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight">
          {headingStart} <span className="text-[#2563eb] italic">{headingHighlight}</span>
        </h2>
      </div>
      <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export const CertificationsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-t border-gray-200">
      {children}
    </div>
  );
};

export const CertificationItem = ({
  idx,
  title,
  organization,
  description,
}: {
  idx: number;
  title: string;
  organization: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group flex flex-col lg:flex-row lg:items-center justify-between py-10 md:py-12 border-b border-gray-200 hover:bg-blue-50/30 transition-colors duration-500 px-4 -mx-4 rounded-2xl cursor-default relative overflow-hidden"
    >
      {/* Subtle hover accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="w-full lg:w-[45%] mb-4 lg:mb-0 pl-0 lg:pl-6 transition-all duration-300 group-hover:pl-4 lg:group-hover:pl-10">
        <h3 className="text-2xl md:text-3xl text-gray-900 group-hover:text-[#2563eb] transition-colors duration-300 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="w-full lg:w-[25%] mb-4 lg:mb-0 flex items-center">
        <span className="text-sm text-gray-400 uppercase tracking-widest flex items-center gap-3">
          <span className="w-8 h-[2px] bg-gray-200 group-hover:bg-[#2563eb] transition-colors duration-300 hidden md:block"></span>
          {organization}
        </span>
      </div>

      <div className="w-full lg:w-[30%]">
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
