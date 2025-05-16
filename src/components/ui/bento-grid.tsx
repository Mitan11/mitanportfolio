"use client";
import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoDownloadOutline } from "react-icons/io5";
import dynamic from 'next/dynamic';
import { IconCloud } from './icon-cloud';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('react-lottie'), {
    ssr: false
});

import { cn } from "@/lib/utils";



import animationData from "@/data/confetti.json";
import MagicButton from "./MagicButton";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { GridGlobe } from "./GridGlobe";
import toast from "react-hot-toast";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
                "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    id,
    title,
    description,
    img,
    imgClassName,
    titleClassName,
    spareImg,
}: {
    className?: string;
    id: number;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    img?: string;
    imgClassName?: string;
    titleClassName?: string;
    spareImg?: string;
}) => {
    const techStackImages = [
        "/re.svg",           // React
        "/Node.js.svg",      // Node.js
        "/Express.svg",      // Express
        "/MongoDB.svg",      // MongoDB
        "/next.svg",         // Next.js
        "/tail.svg",         // Tailwind
        "/ts.svg",           // TypeScript
        "/JavaScript.svg",   // JavaScript
        "/HTML5.svg",        // HTML5
        "/CSS3.svg",         // CSS3
        "/PHP.svg",          // PHP
        "/Bootstrap.svg",    // Bootstrap
        // "/gsap.svg",         // GSAP
        "/fm.svg",           // Framer Motion
        "/icons8-jwt.svg",   // JWT
        "/strip.svg",         // Stripe
        "/C.svg",
        "/VS Code.svg",
        "/GitHub.svg",
        "Git.svg",
    ];

    const [copied, setCopied] = useState(false);

    const defaultOptions = {
        loop: copied,
        autoplay: copied,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handleCopy = () => {
        const text = "mitantank00@gmail.com";
        navigator.clipboard.writeText(text);
        toast.success('Email copied to clipboard!')
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={cn(
                "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
                className
            )}
            style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
        >
            <div className={`${id === 6 && "flex justify-center"} h-full`}>
                <div className="w-full h-full absolute">
                    {img && (
                        <img
                            src={img}
                            alt={img}
                            className={cn(imgClassName, "object-cover object-center ")}
                        />
                    )}
                </div>
                <div
                    className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
                        } `}
                >
                    {spareImg && (
                        <img
                            src={spareImg}
                            alt={spareImg}
                            className="object-cover object-center w-full h-full"
                        />
                    )}
                </div>
                {id === 6 && (
                    <BackgroundGradientAnimation>
                        <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
                    </BackgroundGradientAnimation>
                )}

                <div
                    className={cn(
                        titleClassName,
                        "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
                    )}
                >
                    <div className="font-sans font-semibold md:max-w-52 md:text-xs lg:text-base text-sm z-10">
                        {description}
                    </div>
                    <div
                        className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
                    >
                        {title}
                    </div>

                    {/* for the github 3d globe */}
                    {id === 2 && <GridGlobe />}

                    {/* Tech stack with IconCloud */}
                    {id === 3 && (
                        <div className="flex justify-center items-center w-full h-full mt-4">
                            <IconCloud images={techStackImages} />
                        </div>
                    )}

                    {/* Download CV button for career objective section */}
                    {id === 5 && (
                        <div className="mt-5 relative">
                            <MagicButton
                                title="Download CV"
                                icon={<IoDownloadOutline />}
                                position="left"
                                handleClick={() => window.open('/Mitan Tank Resume.pdf', '_blank')}
                                otherClasses="!bg-[#161A31]"
                            />
                        </div>
                    )}

                    {id === 6 && (
                        <div className="mt-5 relative">
                            <div
                                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"
                                    }`}
                            >
                                <Lottie options={defaultOptions} height={200} width={400} />
                            </div>

                            <MagicButton
                                title={copied ? "Email is Copied!" : "Copy my email address"}
                                icon={<IoCopyOutline />}
                                position="left"
                                handleClick={handleCopy}
                                otherClasses="!bg-[#161A31]"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

