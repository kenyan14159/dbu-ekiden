"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

const SLIDE_INTERVAL = 7000;

const EN_LABEL = "DAITO BUNKA UNIVERSITY EKIDEN TEAM";
const MAIN_TITLE = "歴史への礎";
const SUB_TITLE = "あの場所で、やり返す。";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "10%"]);

  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.4, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[700px] h-[100svh] items-end overflow-hidden md:min-h-[820px]"
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={HERO_IMAGES[currentIndex].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={slideTransition}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentIndex].src}
              alt={HERO_IMAGES[currentIndex].alt}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover scale-[1.04]"
              style={{ objectPosition: HERO_IMAGES[currentIndex].position }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-hero-emerald/80 via-hero-emerald/45 to-black/75" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(255,206,117,0.24),transparent_48%)]" />
          </motion.div>
        </AnimatePresence>
        <motion.div
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0.18, 0.32, 0.18],
                  scale: [1, 1.08, 1],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute -right-20 top-8 h-[28rem] w-[28rem] rounded-full bg-hero-amber/20 blur-[120px]"
        />
        <div className="hero-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 container mx-auto w-full px-6 pb-16 sm:pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-[980px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition}
            className="mb-5 flex w-full items-center gap-4 sm:mb-8"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-hero-amber/90 sm:w-12" />
            <span
              className="font-display text-[10px] font-medium uppercase text-white/75 sm:text-xs md:text-sm"
              style={{ letterSpacing: "0.42em" }}
            >
              {EN_LABEL}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-hero-amber/90 sm:w-12" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.14 }}
            className="font-hero-serif text-[clamp(2.8rem,11vw,8.6rem)] leading-[0.94] tracking-[0.04em] text-hero-mist drop-shadow-[0_10px_45px_rgba(0,0,0,0.55)]"
          >
            {MAIN_TITLE}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.26 }}
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur-sm sm:mt-7 sm:px-6 sm:py-3"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-hero-amber shadow-[0_0_18px_rgba(253,183,83,0.85)]" />
            <span className="font-hero-jp text-xs font-medium tracking-[0.2em] text-white sm:text-base md:text-[1.45rem]">
              {SUB_TITLE}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 sm:bottom-8">
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setCurrentIndex(index)}
              aria-label={`スライド ${index + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-10 bg-hero-amber"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
