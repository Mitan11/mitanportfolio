"use client";

import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "motion/react";

export const AnimatedTooltip = ({
    items,
}: {
    items: {
        id: number;
        name: string;
        designation: string;
        image: string;
    }[];
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 50, damping: 15 };
    const x = useMotionValue(0);
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-30, 30]),
        springConfig,
    );
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-40, 40]),
        springConfig,
    );
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    return (
        <div className="flex items-center gap-2 sm:gap-2">
            {items.map((item, idx) => (
                <div
                    className="group relative"
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="popLayout">
                        {hoveredIndex === item.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 20,
                                        mass: 0.5,
                                    },
                                }}
                                exit={{ opacity: 0, y: 8, scale: 0.8 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: "nowrap",
                                }}
                                className="absolute -top-10 sm:-top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black/90 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs shadow-xl"
                            >
                                <div className="text-[8px] sm:text-[10px] text-white font-medium">
                                    {item.name}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <img
                        onMouseMove={handleMouseMove}
                        height={32}
                        width={32}
                        src={item.image}
                        alt={item.name}
                        className="relative !m-0 h-6 w-6 sm:h-5 sm:w-5 !p-0 transition duration-500 group-hover:z-30 group-hover:scale-110"
                    />
                </div>
            ))}
        </div>
    );
};
