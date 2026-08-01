"use client";
import React from "react";
import { motion, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ExperienceSectionProps {
  id?: string;
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
  children: React.ReactNode;
}

export const ExperienceSection = ({ id = "experience", containerRef, className, children }: ExperienceSectionProps) => {
  return (
    <section
      id={id}
      ref={containerRef as any}
      className={cn("bg-[#050505] w-full min-h-screen relative overflow-hidden py-32 border-t border-white/5", className)}
    >
      {children}
    </section>
  );
};

interface ExperienceBackgroundProps {
  yTransform?: MotionValue<string>;
  heading?: string;
}

export const ExperienceBackground = ({ yTransform, heading = "EXPERIENCE" }: ExperienceBackgroundProps) => {
  return (
    <>
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-1/4 left-0 w-[50vw] h-[50vw] bg-[#2563eb]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      {yTransform ? (
        <motion.div
          style={{ y: yTransform }}
          className="absolute top-32 left-0 w-full flex justify-center items-center overflow-hidden pointer-events-none z-0"
        >
          <h2 className="text-[12vw] leading-[0.8] text-white/[0.02] uppercase tracking-tighter select-none font-black text-center w-full">
            {heading}
          </h2>
        </motion.div>
      ) : (
        <div className="absolute top-32 left-0 w-full flex justify-center items-center overflow-hidden pointer-events-none z-0">
          <h2 className="text-[12vw] leading-[0.8] text-white/[0.02] uppercase tracking-tighter select-none font-black text-center w-full">
            {heading}
          </h2>
        </div>
      )}
    </>
  );
};

export const ExperienceHeader = ({ title = "My Journey" }: { title?: string }) => {
  return (
    <div className="flex items-center gap-4 mb-20 md:mb-32">
      <span className="w-12 h-[2px] bg-gradient-to-r from-purple-500 to-[#2563eb]"></span>
      <span className="text-sm tracking-[0.2em] uppercase text-white/70 font-medium">
        {title}
      </span>
    </div>
  );
};

interface ExperienceTimelineProps {
  timelineRef?: React.RefObject<HTMLDivElement>;
  lineScroll?: MotionValue<number>;
  children: React.ReactNode;
}

export const ExperienceTimeline = ({ timelineRef, lineScroll, children }: ExperienceTimelineProps) => {
  return (
    <div ref={timelineRef as any} className="relative w-full flex flex-col gap-12 md:gap-24">
      <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.05] -translate-x-1/2 rounded-full"></div>

      {lineScroll && (
        <motion.div
          style={{ scaleY: lineScroll }}
          className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 to-[#2563eb] -translate-x-1/2 origin-top rounded-full z-10"
        ></motion.div>
      )}

      {children}
    </div>
  );
};

interface ExperienceCardProps {
  index: number;
  period: string;
  role: string;
  company: string;
  description: string;
  skills?: string[];
}

export const ExperienceCard = ({ index, period, role, company, description, skills }: ExperienceCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative flex flex-col md:flex-row w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} items-start md:items-center pl-20 md:pl-0`}
    >
      <div className="absolute left-[27px] md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-[#2563eb] -translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_rgba(37,99,235,0.6)] z-20"></div>

      <div className={`w-full md:w-[45%] flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] hover:bg-white/[0.04] transition-colors duration-300 group w-full">
          <ExperienceBadge text={period} />

          <h3 className="text-2xl md:text-3xl text-white font-bold mb-2 tracking-wide group-hover:text-[#2563eb] transition-colors duration-300">
            {role}
          </h3>

          <div className="text-lg md:text-xl text-white/80 font-medium mb-6">
            {company}
          </div>

          <ul className="text-white/50 leading-relaxed mb-8 list-disc list-inside space-y-2">
            {description.split(',').map((point, idx) => (
              point.trim() && (
                <li key={idx} className="pl-1">
                  <span className="-ml-1">{point.trim()}</span>
                </li>
              )
            ))}
          </ul>

          {skills && <ExperienceSkills skills={skills} />}
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceBadge = ({ text }: { text: string }) => {
  return (
    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-medium tracking-widest mb-6">
      {text}
    </div>
  );
};

export const ExperienceSkills = ({ skills }: { skills: string[] }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, i) => (
        <span
          key={i}
          className="text-xs font-medium text-white/70 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};
