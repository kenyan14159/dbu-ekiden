"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TopicItem } from '@/lib/types';

interface TopicCardProps {
  topic: TopicItem;
  index: number;
}

function TopicCard({ topic, index }: TopicCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group h-full"
    >
      <Link
        href={topic.link}
        className="block bg-white rounded-xl border border-neutral-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-daito-orange/30 h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
          {topic.image ? (
            <Image
              src={topic.image}
              alt={topic.title}
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
            <span className={cn(
              "px-2 py-0.5 text-white text-[10px] font-medium rounded shadow-sm",
              topic.type === 'NEWS' ? "bg-daito-green" : "bg-daito-orange"
            )}>
              {topic.type}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-5 flex-1 flex flex-col">
          <p className="text-xs text-neutral-400 mb-2">{topic.date}</p>
          <h2 className="text-sm md:text-base font-bold text-neutral-900 group-hover:text-daito-orange transition-colors line-clamp-2 flex-1">
            {topic.title}
          </h2>
        </div>
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
            <div className="text-[10px] tracking-[0.3em] text-neutral-300 uppercase">Latest Results</div>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-900">Latest Results</h2>
            <p className="text-sm text-neutral-500 mt-2">最新リザルト</p>
          </div>
        </motion.div>

        {/* Topics Grid */}
        {topics.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            最新のリザルトがありません
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
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

