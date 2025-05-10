'use client'

import { projects } from '@/data'
import React, { useState } from 'react'
import { FaLocationArrow } from 'react-icons/fa'
import { AnimatedTooltip } from './animated-tooltip'
import { RiGithubLine, RiDribbbleLine } from 'react-icons/ri'
import { Modal } from './ui/Modal'

function RecentProjects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <div className='py-10' id='projects'>
            <h1 className="heading">
                A small selection of{" "}
                <span className="text-purple">recent projects</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
                {projects.map((item) => (
                    <div
                        className="flex items-center justify-center"
                        key={item.id}
                    >
                        <div 
                            className="relative w-full max-w-[320px] md:max-w-[360px] lg:max-w-[380px] cursor-pointer"
                            onClick={() => setSelectedProject(item)}
                        >
                            <div className="p-4 flex flex-col justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover:border-white/[0.2] transition duration-700 overflow-hidden">
                                <div className="relative w-full">
                                    <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-4">
                                        <div
                                            className="absolute inset-0"
                                            style={{ backgroundColor: "#13162D" }}
                                        >
                                            <img src="/bg.png" alt="bgimg" className="w-full h-full object-cover" />
                                        </div>
                                        <img
                                            src={item.img}
                                            alt="cover"
                                            className="absolute inset-0 w-full h-full object-contain z-10"
                                        />
                                    </div>

                                    <h1 className="font-bold text-lg md:text-xl lg:text-2xl line-clamp-1 mb-2">
                                        {item.title}
                                    </h1>

                                    <p
                                        className="text-sm md:text-base font-light line-clamp-2 mb-4"
                                        style={{
                                            color: "#BEC1DD",
                                        }}
                                    >
                                        {item.des}
                                    </p>

                                    <div className="flex flex-col gap-3 w-full">
                                        <div className="flex items-center">
                                            <AnimatedTooltip items={item.iconLists} />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {item.git && (
                                                <a
                                                    href={item.git}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-sm text-purple hover:text-purple/80 transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <RiGithubLine className="text-lg" />
                                                    <span>View</span>
                                                </a>
                                            )}

                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-sm text-purple hover:text-purple/80 transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <RiDribbbleLine className="text-lg" />
                                                    <span>Visit</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            >
                {selectedProject && (
                    <div className="text-white">
                        <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-6">
                            <div
                                className="absolute inset-0"
                                style={{ backgroundColor: "#13162D" }}
                            >
                                <img src="/bg.png" alt="bgimg" className="w-full h-full object-cover" />
                            </div>
                            <img
                                src={selectedProject.img}
                                alt="cover"
                                className="absolute inset-0 w-full h-full object-contain z-10"
                            />
                        </div>

                        <h1 className="font-bold text-2xl md:text-3xl mb-4">
                            {selectedProject.title}
                        </h1>

                        <p
                            className="text-base md:text-lg font-light mb-6"
                            style={{
                                color: "#BEC1DD",
                            }}
                        >
                            {selectedProject.des}
                        </p>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center">
                                <AnimatedTooltip items={selectedProject.iconLists} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {selectedProject.git && (
                                <a
                                    href={selectedProject.git}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-purple hover:text-purple/80 transition-colors"
                                >
                                    <RiGithubLine className="text-xl" />
                                    <span>View on GitHub</span>
                                </a>
                            )}

                            {selectedProject.link && (
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-purple hover:text-purple/80 transition-colors"
                                >
                                    <RiDribbbleLine className="text-xl" />
                                    <span>Visit Project</span>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default RecentProjects