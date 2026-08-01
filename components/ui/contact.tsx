"use client";
import React from "react";
import { motion, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
  id?: string;
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
  children: React.ReactNode;
}

export const ContactSection = ({ id = "contact", containerRef, className, children }: ContactSectionProps) => {
  return (
    <section
      id={id}
      ref={containerRef as any}
      className={cn("bg-[#050505] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-white/5", className)}
    >
      {children}
    </section>
  );
};

export const ContactBackground = ({ yTransform, heading = "Contact" }: { yTransform: MotionValue<string>, heading?: string }) => {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#2563eb]/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <motion.div
        style={{ y: yTransform }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h2 className="text-[15vw] md:text-[12vw] leading-[0.8] text-white/[0.03] uppercase tracking-tighter select-none origin-top font-black">
          {heading}
        </h2>
      </motion.div>
    </>
  );
};

export const ContactContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 w-full flex justify-between items-end">
      {children}
    </div>
  );
};

export const ContactSidebar = ({ socials = {
  linkedin: "https://linkedin.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  github: "https://github.com/shajith23"
}, email, phone, location }: { socials?: any, email?: string, phone?: string, location?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
      className="hidden lg:flex flex-col items-center gap-6 pl-12 pb-24"
    >
      {email && (
        <a href={`mailto:${email}`} className="text-white/60 hover:text-[#2563eb] transition-all hover:-translate-y-1 transform duration-300" aria-label="Email" title={email}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      )}
      {location && (
        <div className="text-white/60 hover:text-[#2563eb] transition-all hover:-translate-y-1 transform duration-300 cursor-default" aria-label="Location" title={location}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      )}
      <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#2563eb] transition-all hover:-translate-y-1 transform duration-300" aria-label="LinkedIn">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#2563eb] transition-all hover:-translate-y-1 transform duration-300" aria-label="Facebook">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
      </a>
      <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#2563eb] transition-all hover:-translate-y-1 transform duration-300" aria-label="Instagram">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#2563eb] transition-all hover:-translate-y-1 transform duration-300" aria-label="GitHub">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
      </a>
      <div className="w-[1px] h-16 bg-white/20 mt-4"></div>
      <p className="text-white/50 text-xs font-mono tracking-[0.3em] uppercase mt-4" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Contact</p>
    </motion.div>
  );
};

export const ContactFormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 lg:p-20 text-white flex flex-col justify-between rounded-tl-[2.5rem] md:rounded-tl-[4rem] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.5)]"
    >
      {children}
    </motion.div>
  );
};

export const ContactFormHeader = ({ formHeading = "Start a project" }: { formHeading?: string }) => {
  return (
    <div className="flex items-center gap-4 mb-12 md:mb-16">
      <span className="w-12 h-[2px] bg-gradient-to-r from-[#2563eb] to-purple-500"></span>
      <span className="text-sm tracking-[0.2em] uppercase text-white/70 font-medium">
        {formHeading}
      </span>
    </div>
  );
};
