"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const ProjectsSection = ({ id = "projects", className, children }: ProjectsSectionProps) => {
  return (
    <section id={id} className={cn("relative w-full bg-gray-50 py-24 md:py-32 overflow-hidden", className)}>
      {children}
    </section>
  );
};

export const ProjectsBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export const ProjectsHeader = ({ 
  headerTitle = "Selected Works",
  heading = "Recent Projects",
  description = "A showcase of my recent full-stack applications, highlighting performance, design, and complex integrations."
}: { 
  headerTitle?: string,
  heading?: string,
  description?: string
}) => {
  const parts = heading.split(' ');
  const lastWord = parts.pop();
  const firstParts = parts.join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
    >
      <div>
        <span className="inline-block text-xs text-[#2563eb] uppercase tracking-[0.15em] px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
          {headerTitle}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight">
          {firstParts} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-blue-400">{lastWord}</span>.
        </h2>
      </div>
      <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export const ProjectCard = ({
  project,
  idx,
  onClick,
}: {
  project: {
    title: string;
    subtitle: string;
    description: string;
    image: any;
    link: string;
    github: string;
    features: string[];
    techStack: string[];
  };
  idx: number;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative"
    >
      <div
        onClick={onClick}
        className={`relative bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:border-gray-200 transition-all duration-500 flex flex-col gap-6 h-full cursor-pointer`}
      >
        {/* Image Section */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 aspect-video group-hover:shadow-lg transition-all duration-500">
          <div className="absolute inset-0 bg-[#2563eb]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none"></div>

          <img
            src={project.image?.src || project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content Section */}
        <div className="w-full flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="text-2xl text-gray-900 mb-1.5 font-semibold tracking-tight group-hover:text-[#2563eb] transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-[#2563eb] text-sm tracking-wide line-clamp-1">
              {project.subtitle}
            </p>
          </div>

          <div className="flex-1 mb-6">
            <p 
              className="text-gray-600 text-sm leading-relaxed overflow-hidden"
              style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
            >
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-1 text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-md">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-[#2563eb] transition-all duration-300 shadow-sm"
              >
                Live Demo
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-white text-gray-900 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm group/github"
              >
                <svg
                  className="w-4 h-4 mr-2 transition-transform group-hover/github:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectModalContent = ({ project }: { project: any }) => {
  return (
    <div className="flex flex-col gap-6 w-full text-left">
      <div className="w-full relative rounded-[1.5rem] overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
        <img
          src={project.image?.src || project.image}
          alt={project.title}
          className="w-full h-auto object-cover max-h-[350px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-3xl md:text-4xl text-gray-900 font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="text-[#2563eb] text-lg tracking-wide font-medium">
          {project.subtitle}
        </p>
      </div>

      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        {project.description}
      </p>

      {project.features && project.features.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-4">
            Key Features
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 text-sm md:text-base leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:!text-[#2563eb] transition-all cursor-default shadow-sm hover:shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-[#2563eb] transition-all duration-300 shadow-md"
          >
            Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-6 py-3.5 bg-white text-gray-900 border border-gray-200 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm"
          >
            GitHub Repo
          </a>
        )}
      </div>
    </div>
  );
};
