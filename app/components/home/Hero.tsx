"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
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

const HERO_IMAGES = [
  {
    src: "/images/102-hakone-yosen/a27.jpg",
    alt: "箱根駅伝予選会のレース写真",
    position: "center 38%",
  },
  {
    src: "/images/2025-all-japan-ekiden/a31.jpg",
    alt: "全日本大学駅伝のレース写真",
    position: "center 30%",
  },
] as const;

const SLIDE_INTERVAL = 6000;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // スライドショーの自動進行
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

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
      className="relative flex min-h-[720px] h-screen items-center justify-center overflow-hidden md:min-h-[800px]"
    >
      {/* Background Images - Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          {HERO_IMAGES.map((image, index) =>
            index === currentIndex ? (
              <motion.div
                key={image.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover scale-[1.03]"
                  style={{ objectPosition: image.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/55 via-neutral-950/15 to-neutral-950/45" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/65 to-transparent" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_0%,transparent_65%)]" />
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
          {/* English Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-10 flex items-center justify-center gap-4"
          >
            <div className="h-px w-8 md:w-12 bg-white/30" />
            <span
              className="font-display text-[10px] sm:text-xs md:text-sm font-light uppercase text-white/55"
              style={{ letterSpacing: '0.45em' }}
            >
              DAITO BUNKA UNIVERSITY EKIDEN TEAM
            </span>
            <div className="h-px w-8 md:w-12 bg-white/30" />
          </motion.div>

          {/* Main Title - Noto Serif JP: 格調ある明朝体 */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div
              className="overflow-hidden leading-[1.0]"
              style={{ fontFamily: 'var(--font-hero-serif)' }}
            >
              {mainTitle.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-bold"
                  style={{
                    color: '#FFFFFF',
                    textShadow: '0 0 60px rgba(255,255,255,0.14), 0 2px 35px rgba(0,0,0,0.5)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-5 md:mt-7 h-[1px] w-20 md:w-32 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"
            />

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 md:mt-7 flex items-center justify-center gap-5"
            >
              <div className="h-px w-6 md:w-10 bg-amber-400/50" />
              <span
                className="font-hero-jp text-base sm:text-xl md:text-2xl font-light tracking-[0.32em] text-amber-100/85"
              >
                {subTitle}
              </span>
              <div className="h-px w-6 md:w-10 bg-amber-400/50" />
            </motion.div>
          </motion.h1>

        </motion.div>
      )}

      {/* Slide Indicators */}
      {mounted && HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`スライド ${index + 1}`}
              className={`rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "h-2 w-8 bg-white"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
