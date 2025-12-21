"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const teamLinks = [
  {
    title: 'メンバー紹介',
    description: '選手・スタッフの紹介',
    link: '/members',
  },
  {
    title: '限定コンテンツ',
    description: '限定情報など',
    link: '/exclusive',
  },
  {
    title: 'サポーターの皆様',
    description: 'ご支援いただいている皆様',
    link: '/supporters',
  },
  {
    title: 'お問い合わせ',
    description: 'チームへのお問い合わせ',
    link: '/contact',
  },
];

export default function TeamLinks() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-3">
            EXPLORE TEAM
          </p>
          <h2 className="text-2xl md:text-4xl font-serif font-light text-neutral-900">
            チームを知る
          </h2>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {teamLinks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={item.link}
                className="block h-full bg-white rounded-xl border border-neutral-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-daito-green/30 group"
              >
                <h3 className="text-base md:text-lg font-bold text-neutral-900 mb-2 group-hover:text-daito-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-500 mb-4">
                  {item.description}
                </p>
                <span className="text-sm font-medium text-daito-green">
                  詳細を見る →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
