"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import {
  SkillsSection,
  SkillsBackground,
  SkillsHeader,
  SkillsGrid,
  SkillCard
} from '@/components/ui/skills';

const Skills = () => {
  const skillsDataState = useSelector((state) => state.portfolio.skills);

  return (
    <SkillsSection>
      <SkillsBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <SkillsHeader 
          headerTitle={skillsDataState.headerTitle}
          headingStart={skillsDataState.headingStart}
          headingHighlight={skillsDataState.headingHighlight}
          description={skillsDataState.description}
        />

        <SkillsGrid>
          {skillsDataState.list.map((group, idx) => (
            <SkillCard
              key={idx}
              idx={idx}
              category={group.category}
              description={group.description}
              skills={group.skills}
              colSpan={group.colSpan}
              bgColor={group.bgColor}
              borderColor={group.borderColor}
            />
          ))}
        </SkillsGrid>
      </div>
    </SkillsSection>
  );
};

export default Skills;