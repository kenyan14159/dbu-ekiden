"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { NewsMetadata } from '@/lib/types';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

interface NewsClientProps {
  articles: NewsMetadata[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function NewsClient({ articles }: NewsClientProps) {
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
              NEWS
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
              ニュース
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[{ label: 'ニュース' }]} 
            className="mb-8"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Link
                  href={`/topics/news/2026/${article.slug}`}
                  className="block bg-white rounded-xl border border-neutral-100 p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:border-daito-green/30 group h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-daito-green text-white text-[10px] font-medium rounded">
                      ニュース
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-2">{formatDate(article.date)}</p>
                  <h2 className="text-sm md:text-base font-bold text-neutral-900 group-hover:text-daito-green transition-colors line-clamp-3">
                    {article.title}
                  </h2>
                </Link>
              </motion.article>
            ))}

            {articles.length === 0 && (
              <div className="col-span-full text-center py-20 text-neutral-400">
                ニュースがありません
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

