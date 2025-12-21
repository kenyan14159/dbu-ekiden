"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function OpeningLoader() {
    const [isPresent, setIsPresent] = useState(true);

    useEffect(() => {
        // Check if we've already shown the loader in this session
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (hasVisited) {
            setIsPresent(false);
            return;
        }

        // Set session storage to prevent showing again on reload (optional, maybe we want it every refresh for 'demo' feel)
        // For now, let's keep it showing every time or use a short timeout.
        // Let's implement full cinematic mode every refresh for the "demo" feeling the user requested "100 points".
        // Or set it after the animation completes.

        const timer = setTimeout(() => {
            setIsPresent(false);
            sessionStorage.setItem('hasVisited', 'true');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isPresent && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-neutral-950"
                >
                    <div className="relative overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 bg-daito-green z-10 mix-blend-multiply"
                        />

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-serif text-white font-light tracking-[0.2em] relative z-20"
                        >
                            歴史への礎
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
                            className="h-px bg-daito-orange mt-4 origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
