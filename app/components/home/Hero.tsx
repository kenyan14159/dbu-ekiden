"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const mainTitle = "歴史への礎";
  const subTitle = "～あの場所でやり返す〜";

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.05,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <motion.section
      ref={ref}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div style={{ scale, y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }} className="absolute inset-0">
        <Image
          src="/images/daio-ekiden-img3.jpg"
          alt="大東文化大学駅伝"
          fill
          className="object-cover"
          priority
        />
        {/* Stronger overlay for green image - much darker for better readability */}
        {/* Stronger overlay with noise for cinematic look */}
        <div className="absolute inset-0 bg-neutral-950/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950" />
      </motion.div>

      {/* Floating Particles (CSS Animation) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {mounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white blur-[1px] animate-blob"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 10 + 10 + 's',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        {/* English Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span
            className="text-white font-mono text-xs sm:text-sm tracking-[0.4em]"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            DAITO BUNKA UNIVERSITY EKIDEN TEAM
          </span>
        </motion.div>

        {/* Main Title - Character by Character Animation */}
        <h1 className="font-serif text-white mb-6">
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-wider mb-6 overflow-hidden">
            {mainTitle.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{
                  textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.9)',
                  color: '#ffffff'
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em]"
            style={{
              textShadow: '0 2px 20px rgba(0,0,0,0.9)',
              color: '#ffffff'
            }}
          >
            {subTitle}
          </motion.div>
        </h1>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 h-0.5 mx-auto bg-white mb-8"
        />

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
          />
        </div>
        <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase mt-4 text-center">Scroll</p>
      </motion.div>
    </motion.section>
  );
}
