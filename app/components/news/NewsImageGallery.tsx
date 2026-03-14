"use client";

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface NewsImageGalleryProps {
  images: string[];
  title: string;
}

export default function NewsImageGallery({ images, title }: NewsImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const imageCount = images.length;

  const closeModal = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || imageCount === 0) return prev;
      return (prev - 1 + imageCount) % imageCount;
    });
  }, [imageCount]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || imageCount === 0) return prev;
      return (prev + 1) % imageCount;
    });
  }, [imageCount]);

  const activeImage = useMemo(() => {
    if (activeIndex === null) return null;
    return images[activeIndex] || null;
  }, [activeIndex, images]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }
      if (event.key === 'ArrowLeft') {
        showPrevious();
        return;
      }
      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    const scrollY = window.scrollY;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;

      window.scrollTo(0, scrollY);
    };
  }, [activeIndex, closeModal, showNext, showPrevious]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold text-neutral-900">フォトギャラリー</h2>
        <p className="text-xs md:text-sm text-neutral-500">{imageCount}枚</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((imageSrc, index) => (
          <button
            key={`${title}-gallery-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 text-left"
            aria-label={`画像${index + 1}を拡大表示`}
          >
            <Image
              src={imageSrc}
              alt={`${title} 画像${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20" />
            <div className="absolute bottom-2 left-2 rounded bg-black/65 px-2 py-1 text-xs text-white">
              {index + 1} / {imageCount}
            </div>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] overflow-hidden overscroll-none bg-black/85 backdrop-blur-sm p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="ニュース画像モーダル"
          onClick={closeModal}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <div className="relative w-full">
              <button
                type="button"
                onClick={closeModal}
                className="absolute -top-12 right-0 rounded bg-white/15 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/25"
                aria-label="モーダルを閉じる"
              >
                閉じる
              </button>

              <div className="relative mx-auto w-full max-w-5xl aspect-[4/3] overflow-hidden rounded-lg bg-black">
                <Image
                  src={activeImage}
                  alt={`${title} 画像${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />

                {imageCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white hover:bg-black/70"
                      aria-label="前の画像へ"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white hover:bg-black/70"
                      aria-label="次の画像へ"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              <div className="mt-3 text-center text-sm text-white">
                {activeIndex + 1} / {imageCount}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
