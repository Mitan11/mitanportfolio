"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LetterGlitch from './LetterGlitch';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if it's a bot or Lighthouse to bypass the preloader
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent);
    
    if (isBot) {
      setIsLoading(false);
      return;
    }

    // Wait for the water fill animation (1.5s) + a small pause (0.5s)
    // before the shutter goes up smoothly.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#2563eb] z-[100000] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-40">
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
              glitchColors={['#1e40af', '#3b82f6', '#60a5fa', '#ffffff']}
            />
          </div>

          {/* Logo Container */}
          <motion.div 
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease:"easeOut" }}
            className="relative text-5xl md:text-7xl tracking-tighter z-10 font-bold"
          >
            {/* Background text (empty state) */}
            <div className="text-blue-900/30">
              MITAN<span className="text-blue-900/30">.</span>
            </div>

            {/* Foreground text (water fill state) */}
            <motion.div 
              className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.6, ease:"easeInOut", delay: 0.2 }}
            >
              MITAN<span className="text-black">.</span>
            </motion.div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
