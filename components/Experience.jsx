"use client";
import React, { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { useSelector } from 'react-redux';
import { 
  ExperienceSection, 
  ExperienceBackground, 
  ExperienceHeader, 
  ExperienceTimeline, 
  ExperienceCard 
} from '@/components/ui/experience';

const Experience = () => {
  const experienceData = useSelector((state) => state.portfolio.experience);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  const { scrollYProgress: containerScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: lineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const y = useTransform(containerScroll, [0, 1], ["-10%", "10%"]);

  return (
    <ExperienceSection containerRef={containerRef}>
      <ExperienceBackground yTransform={y} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <ExperienceHeader title={experienceData.headerTitle} />

        <ExperienceTimeline timelineRef={timelineRef} lineScroll={lineScroll}>
          {experienceData.list.map((exp, index) => (
            <ExperienceCard 
              key={exp._id || index}
              index={index}
              period={exp.period}
              role={exp.role}
              company={exp.company}
              description={exp.description}
              skills={exp.skills}
            />
          ))}
        </ExperienceTimeline>
      </div>
    </ExperienceSection>
  );
};

export default Experience;
