"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { ResultMetadata } from '@/lib/data';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

interface ResultsClientProps {
  resultsMetadata: ResultMetadata;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function ResultsClient({ resultsMetadata }: ResultsClientProps) {
  const events = resultsMetadata.articles;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-neutral-900 mb-4">
              RESULTS
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
              リザルト
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[{ label: 'リザルト' }]} 
            className="mb-8"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {events.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Link
                  href={`/topics/results/2026/${event.slug}`}
                  className="block bg-white rounded-xl border border-neutral-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-daito-orange/30 group h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                        <div className="text-center">
                          <p className="text-xs text-neutral-400 font-medium">no image</p>
                        </div>
                      </div>
                    )}
                    {/* Badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-daito-orange text-white text-[10px] font-medium rounded shadow-sm">
                        RESULT
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <p className="text-xs text-neutral-400 mb-2">{formatDate(event.date)}</p>
                    <h2 className="text-sm md:text-base font-bold text-neutral-900 group-hover:text-daito-orange transition-colors line-clamp-2">
                      {event.title}
                    </h2>
                  </div>
                </Link>
              </motion.article>
            ))}

            {events.length === 0 && (
              <div className="col-span-full text-center py-20 text-neutral-400">
                リザルトがありません
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

