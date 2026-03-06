"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function OpeningLoader() {
    const [isPresent, setIsPresent] = useState(() => {
        if (typeof window === 'undefined') return false;
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        return !(lastVisit && (now - parseInt(lastVisit, 10)) < oneDay);
    });

    useEffect(() => {
        if (!isPresent) return;

        // 初回訪問または24時間経過後は表示
        const timer = setTimeout(() => {
            setIsPresent(false);
            if (typeof window !== 'undefined') {
                localStorage.setItem('lastVisit', Date.now().toString());
            }
        }, 2000); // 2秒に短縮

        return () => clearTimeout(timer);
    }, [isPresent]);

    // ページ読み込みが完了したら即座に非表示にする
    useEffect(() => {
        if (typeof window === 'undefined' || !isPresent) return;

        if (document.readyState === 'complete') {
            const timer = setTimeout(() => setIsPresent(false), 500);
            return () => clearTimeout(timer);
        }

        const handleLoad = () => {
            setTimeout(() => setIsPresent(false), 500);
        };
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, [isPresent]);

    return (
        <AnimatePresence>
            {isPresent && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-neutral-950"
                >
                    <div className="relative overflow-hidden text-center">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 bg-daito-green z-10 mix-blend-multiply"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-[10px] md:text-xs font-display text-white/90 tracking-[0.4em] uppercase relative z-20 mb-3"
                        >
                            DAITO BUNKA UNIVERSITY EKIDEN TEAM
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-hero-jp text-white font-black tracking-[0.15em] relative z-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                            style={{ fontVariationSettings: '"wght" 900' }}
                        >
                            歴史への礎
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-sm md:text-base font-hero-jp text-daito-orange font-medium tracking-[0.25em] mt-3 relative z-20"
                        >
                            ～あの場所でやり返す〜
                        </motion.p>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.9, duration: 0.8, ease: "circOut" }}
                            className="h-px bg-daito-orange mt-5 origin-center relative z-20"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
