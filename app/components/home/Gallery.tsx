"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const EXCLUDED_IMAGES = new Set([
  '/images/2025-all-japan-ekiden/a28.jpg',
  '/images/2025-all-japan-ekiden/a29.jpg',
  '/images/2025-all-japan-ekiden/a30.jpg',
  '/images/2025-all-japan-ekiden/a31.jpg',
  '/images/2025-all-japan-ekiden/a32.jpg',
  '/images/2025-all-japan-ekiden/a1.jpg',
  '/images/2025-all-japan-ekiden/a2.jpg',
  '/images/102-hakone-yosen/a27.jpg',
  '/images/102-hakone-yosen/a28.jpg',
  '/images/102-hakone-yosen/a29.jpg',
]);

const ALL_IMAGES = [
  ...Array.from({ length: 33 }, (_, i) => `/images/102-hakone-ekiden/a${i + 1}.jpg`),
  ...Array.from({ length: 29 }, (_, i) => `/images/102-hakone-yosen/a${i + 1}.jpg`),
  ...Array.from({ length: 35 }, (_, i) => `/images/2025-all-japan-ekiden/a${i + 1}.jpg`),
];

const GALLERY_IMAGES = ALL_IMAGES.filter((src) => !EXCLUDED_IMAGES.has(src));

const INITIAL_IMAGES = [
  GALLERY_IMAGES[2],
  GALLERY_IMAGES[7],
  GALLERY_IMAGES[15],
  GALLERY_IMAGES[28],
  GALLERY_IMAGES[33],
  GALLERY_IMAGES[51],
  GALLERY_IMAGES[63],
  GALLERY_IMAGES[79],
].filter((src): src is string => Boolean(src));

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const DISPLAY_COUNT = 8;

export default function Gallery() {
  const [images, setImages] = useState<string[]>(INITIAL_IMAGES);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const handleShuffle = useCallback(() => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setImages(shuffleArray(GALLERY_IMAGES).slice(0, DISPLAY_COUNT));
      setFading(false);
    }, 250);
  }, [fading]);

  const modalImage = modalIndex !== null ? images[modalIndex] : null;

  useEffect(() => {
    if (!modalImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalIndex(null);
      if (e.key === 'ArrowLeft')
        setModalIndex((c) => (c === null ? c : (c - 1 + images.length) % images.length));
      if (e.key === 'ArrowRight')
        setModalIndex((c) => (c === null ? c : (c + 1) % images.length));
    };

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalImage, images.length]);

  const modal =
    typeof document !== 'undefined' && modalImage
      ? createPortal(
          <AnimatePresence>
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-3 sm:p-6"
            >
              <button
                type="button"
                aria-label="ギャラリーを閉じる"
                onClick={() => setModalIndex(null)}
                className="absolute inset-0"
              />
              <div className="relative z-10 w-full max-w-6xl">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                >
                  <button
                    type="button"
                    onClick={() => setModalIndex(null)}
                    className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white transition-colors hover:bg-black/55"
                    aria-label="閉じる"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="relative h-[70dvh] min-h-[260px] max-h-[820px] w-full sm:h-[78dvh]">
                    <Image
                      src={modalImage}
                      alt="ギャラリー写真（拡大）"
                      fill
                      quality={75}
                      sizes="100vw"
                      className="object-contain p-3 sm:p-6"
                    />
                  </div>
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setModalIndex((c) =>
                            c === null ? c : (c - 1 + images.length) % images.length
                          )
                        }
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/60 sm:left-5 sm:h-12 sm:w-12"
                        aria-label="前の画像を表示"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setModalIndex((c) =>
                            c === null ? c : (c + 1) % images.length
                          )
                        }
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/60 sm:right-5 sm:h-12 sm:w-12"
                        aria-label="次の画像を表示"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                        {(modalIndex ?? 0) + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <>
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-daito-orange font-sans text-sm tracking-[0.3em] mb-3">GALLERY</p>
            <h2 className="text-2xl md:text-4xl font-sans font-light text-neutral-900">
              ギャラリー
            </h2>
            <p className="text-sm text-neutral-500 mt-2">写真をタップすると拡大表示できます</p>
            <button
              type="button"
              onClick={handleShuffle}
              disabled={fading}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm text-neutral-600 transition-colors hover:border-daito-orange hover:text-daito-orange disabled:opacity-50"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 3h5v5M4 20L21 3M16 21h5v-5M4 4l5 5"
                />
              </svg>
              シャッフル
            </button>
          </motion.div>

          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto transition-opacity duration-250 ${fading ? 'opacity-0' : 'opacity-100'}`}
          >
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setModalIndex(index)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-neutral-200 text-left shadow-sm transition-transform active:scale-[0.98]"
                aria-label={`ギャラリー写真 ${index + 1} を拡大表示`}
              >
                <Image
                  src={src}
                  alt={`ギャラリー写真 ${index + 1}`}
                  fill
                  loading="lazy"
                  quality={60}
                  decoding="async"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      {modal}
    </>
  );
}
