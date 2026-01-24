"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { NewsMetadata } from '@/lib/types';

interface ObNewsPreviewClientProps {
  articles: NewsMetadata[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function ObNewsPreviewClient({ articles }: ObNewsPreviewClientProps) {
  return (
    <section className="py-24 md:py-32 bg-neutral-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline gap-4 mb-16"
        >
          <div>
            <div className="text-[10px] tracking-[0.3em] text-neutral-300 uppercase">News</div>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-900">News</h2>
            <p className="text-sm text-neutral-500 mt-2">ニュース</p>
          </div>
        </motion.div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">ニュースがありません</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link
                  href={`/topics/news/2026/${article.slug}`}
                  className="block bg-white rounded-2xl border border-neutral-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-daito-green/30 h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-daito-green text-white text-[10px] font-medium rounded">
                      ニュース
                    </span>
                    <span className="text-xs text-neutral-400">{formatDate(article.date)}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-neutral-900 line-clamp-3">
                    {article.title}
                  </h3>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/news"
            className="px-8 py-4 border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 hover:border-daito-green hover:text-daito-green transition-all duration-300"
          >
            ニュース一覧
          </Link>
        </div>
      </div>
    </section>
  );
}
