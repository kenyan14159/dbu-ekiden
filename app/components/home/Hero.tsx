"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// パーティクルの型定義
interface Particle {
  id: number;
  width: number;
  height: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // prefers-reduced-motion の検出
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const timer2 = setTimeout(() => {
        setPrefersReducedMotion(mediaQuery.matches);
      }, 0);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
    return () => clearTimeout(timer);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  // パーティクルをuseStateとuseEffectで生成（レンダリング中の不純関数呼び出しを回避）
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setParticles(
        Array.from({ length: 10 }, (_, i) => ({
          id: i,
          width: Math.random() * 4 + 1,
          height: Math.random() * 4 + 1,
          top: Math.random() * 100,
          left: Math.random() * 100,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.5 + 0.2,
        }))
      );
    }, 0);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <motion.section
      ref={ref}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-amber-50 to-orange-100"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/8 via-transparent to-daito-orange/12" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 77, 37, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(243, 152, 0, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(0, 77, 37, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0, 77, 37, 0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Floating Particles (CSS Animation) - パフォーマンス最適化 */}
      {mounted && particles.length > 0 && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" aria-hidden="true">
          {particles.map((particle, index) => (
            <div
              key={particle.id}
              className={`absolute rounded-full blur-[1px] animate-blob ${index % 3 === 0 ? 'bg-daito-orange' : 'bg-daito-green'}`}
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      {mounted && (
        <motion.div
          style={{ opacity }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          {/* English Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-12"
          >
            <span className="font-mono text-xs sm:text-sm tracking-[0.5em] font-light bg-gradient-to-r from-daito-green via-daito-green/90 to-daito-orange bg-clip-text text-transparent">
              DAITO BUNKA UNIVERSITY EKIDEN TEAM
            </span>
          </motion.div>

          {/* Main Title - Character by Character Animation */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-serif mb-6 md:mb-12"
          >
          <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-extralight tracking-wide mb-6 md:mb-10 overflow-hidden leading-tight">
            {mainTitle.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #004d25 0%, #006633 40%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 md:mt-6"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.3em] bg-gradient-to-r from-daito-green/80 via-daito-green/70 to-daito-orange/80 bg-clip-text text-transparent">
              {subTitle}
            </span>
          </motion.div>
        </motion.h1>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex items-center justify-center gap-4 mt-6 md:mt-12"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-[1px] bg-gradient-to-r from-transparent via-daito-green/40 to-daito-orange/40"
          />
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-daito-green to-daito-orange shadow-lg" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-[1px] bg-gradient-to-l from-transparent via-daito-orange/40 to-daito-green/40"
          />
        </motion.div>

        </motion.div>
      )}
    </motion.section>
  );
}
