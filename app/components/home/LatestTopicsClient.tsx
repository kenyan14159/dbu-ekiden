"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TopicItem } from '@/lib/types';

interface TopicCardProps {
  topic: TopicItem;
  index: number;
}

function TopicCard({ topic, index }: TopicCardProps) {
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

interface LatestTopicsClientProps {
  topics: TopicItem[];
}

export default function LatestTopicsClient({ topics }: LatestTopicsClientProps) {
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
          <div>
            <div className="text-[10px] tracking-[0.3em] text-neutral-300 uppercase">Result</div>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-900">Result</h2>
            <p className="text-sm text-neutral-500 mt-2">リザルト</p>
          </div>
        </motion.div>

        {/* Topics Grid */}
        {topics.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            最新のトピックスがありません
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

