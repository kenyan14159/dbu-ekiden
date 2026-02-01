"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsMetadata } from '@/lib/data';

interface ObNewsPreviewClientProps {
  newsMetadata: NewsMetadata;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function ObNewsPreviewClient({ newsMetadata }: ObNewsPreviewClientProps) {
  const articles = newsMetadata.articles;

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
            <div className="text-[10px] tracking-[0.3em] text-neutral-300 uppercase">Latest News</div>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-900">Latest News</h2>
            <p className="text-sm text-neutral-500 mt-2">最新ニュース</p>
          </div>
        </motion.div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">ニュースがありません</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group h-full"
              >
                <Link
                  href={`/topics/news/2026/${article.slug}`}
                  className="block bg-white rounded-xl border border-neutral-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-daito-green/30 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
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
                      <span className="px-2 py-0.5 bg-daito-green text-white text-[10px] font-medium rounded shadow-sm">
                        ニュース
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <p className="text-xs text-neutral-400 mb-2">{formatDate(article.date)}</p>
                    <h3 className="text-sm md:text-base font-bold text-neutral-900 group-hover:text-daito-green transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
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
