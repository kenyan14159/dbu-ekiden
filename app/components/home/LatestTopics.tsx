"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Article {
  id: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
}

interface ResultEvent {
  id: string;
  slug: string;
  date: string;
  title: string;
}

interface TopicItem {
  id: string;
  type: 'NEWS' | 'RESULT';
  date: string;
  title: string;
  link: string;
}

function TopicCard({ topic, index }: { topic: TopicItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <Link href={topic.link} className="block h-full">
        <motion.div
          className="relative h-full bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-500 hover:border-neutral-200 hover:shadow-2xl hover:shadow-neutral-200/50"
          whileHover={{ y: -4 }}
        >
          {/* Number */}
          <div className="absolute top-6 right-6 text-6xl font-serif font-light text-neutral-100 group-hover:text-daito-green/10 transition-colors duration-300">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="p-6 md:p-8 relative h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] tracking-wider font-medium",
                topic.type === 'NEWS' ? "bg-daito-green text-white" : "bg-daito-orange text-white"
              )}>
                {topic.type}
              </span>
              <span className="text-sm font-mono text-neutral-400">{topic.date}</span>
            </div>

            <h3 className="text-lg md:text-xl font-medium text-neutral-900 group-hover:text-daito-green transition-colors duration-300 pr-12 flex-1">
              {topic.title}
            </h3>

            {/* Arrow */}
            <motion.div
              className="mt-6 flex items-center gap-2 text-sm font-medium text-daito-green"
              initial={{ x: 0 }}
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>続きを読む</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          {/* Bottom Gradient Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-daito-green to-daito-orange"
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </Link>
    </motion.article>
  );
}

export default function LatestTopics() {
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load both news and results
        const [newsRes, resultsRes] = await Promise.all([
          fetch('/data/news/news-2025.json'),
          fetch('/data/results/results-2025.json')
        ]);

        const newsData = await newsRes.json();
        const resultsData = await resultsRes.json();

        // Convert to unified format
        const newsItems: TopicItem[] = newsData.articles.slice(0, 2).map((article: Article) => ({
          id: `news-${article.id}`,
          type: 'NEWS' as const,
          date: article.date.replace(/-/g, '.'),
          title: article.title,
          link: `/news/${article.slug}`
        }));

        const resultItems: TopicItem[] = resultsData.events.slice(0, 1).map((event: ResultEvent) => ({
          id: `result-${event.id}`,
          type: 'RESULT' as const,
          date: event.date.replace(/-/g, '.'),
          title: event.title,
          link: `/results/${event.slug}`
        }));

        // Combine and sort by date
        const combined = [...newsItems, ...resultItems]
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 3);

        setTopics(combined);
      } catch (error) {
        console.error('Failed to load topics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline gap-4 mb-16"
        >
          <span className="text-8xl md:text-9xl font-serif font-light text-neutral-100">01</span>
          <div className="-ml-6">
            <div className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">Latest Topics</div>
            <h2 className="text-2xl md:text-4xl font-medium text-neutral-900">最新トピックス</h2>
          </div>
        </motion.div>

        {/* Topics Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-neutral-200 border-t-daito-green rounded-full"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {topics.map((topic, index) => (
              <TopicCard key={topic.id} topic={topic} index={index} />
            ))}
          </div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/news"
            className="px-8 py-4 border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 hover:border-daito-green hover:text-daito-green transition-all duration-300"
          >
            ニュース一覧
          </Link>
          <Link
            href="/results"
            className="px-8 py-4 border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 hover:border-daito-orange hover:text-daito-orange transition-all duration-300"
          >
            リザルト一覧
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
