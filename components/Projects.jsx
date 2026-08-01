"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  ProjectsSection, 
  ProjectsBackground, 
  ProjectsHeader, 
  ProjectCard,
  ProjectModalContent
} from '@/components/ui/projects';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Projects = () => {
  const projectsData = useSelector((state) => state.portfolio.projects);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <ProjectsSection>
      <ProjectsBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <ProjectsHeader 
          headerTitle={projectsData.headerTitle}
          heading={projectsData.heading}
          description={projectsData.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...projectsData.list].reverse().map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project} 
              idx={idx} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl p-6 md:p-8">
          {selectedProject && <ProjectModalContent project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </ProjectsSection>
  );
};

export default Projects;
