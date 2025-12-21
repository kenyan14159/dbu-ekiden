"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NewsArticle {
  id: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
}

interface NewsData {
  year: number;
  articles: NewsArticle[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/data/news/news-2025.json');
        const data = await res.json();
        data.articles.sort((a: NewsArticle, b: NewsArticle) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNewsData(data);
      } catch (error) {
        console.error('Failed to load news data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-4">
              NEWS
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white">
              ニュース
            </h1>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 animate-pulse"
                >
                  <div className="h-3 bg-neutral-200 rounded w-24 mb-3" />
                  <div className="h-5 bg-neutral-200 rounded w-full mb-2" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            >
              {newsData?.articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="block bg-white rounded-xl border border-neutral-100 p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:border-daito-green/30 group h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-daito-green text-white text-[10px] font-medium rounded">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-2">{formatDate(article.date)}</p>
                    <h2 className="text-sm md:text-base font-bold text-neutral-900 group-hover:text-daito-green transition-colors line-clamp-3">
                      {article.title}
                    </h2>
                  </Link>
                </motion.article>
              ))}

              {newsData?.articles.length === 0 && (
                <div className="col-span-full text-center py-20 text-neutral-400">
                  ニュースがありません
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
