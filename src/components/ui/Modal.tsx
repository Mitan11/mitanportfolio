import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ 
                            duration: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                            scale: { duration: 0.15 },
                            opacity: { duration: 0.2 }
                        }}
                        className={cn(
                            // Base styles
                            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
                            // Responsive width
                            "w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%]",
                            // Max width and height
                            "max-w-2xl max-h-[90vh]",
                            // Overflow and background
                            "overflow-y-auto bg-black/95 border border-white/[0.08]",
                            // Rounded corners and shadow
                            "rounded-xl shadow-lg shadow-purple/5",
                            // Padding
                            "p-8",
                            // Scrollbar styling
                            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple/40 hover:scrollbar-thumb-purple/60",
                            // Transitions
                            "transition-all duration-200 ease-in-out",
                            className
                        )}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.05, duration: 0.15 }}
                            onClick={onClose}
                            className="absolute z-10 right-3 top-3 text-white/50 hover:text-white transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 active:scale-95"
                        >
                            <IoClose size={20} />
                        </motion.button>
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}; 