"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const teamLinks = [
  {
    title: 'Members',
    description: '選手・スタッフの紹介',
    link: '/members',
  },
  {
    title: 'Records',
    description: '自己ベストランキング',
    link: '/records',
  },
  {
    title: 'News',
    description: 'ニュース',
    link: '/news',
  },
  {
    title: 'Schedule',
    description: '大会スケジュール',
    link: '/schedule',
  },
  {
    title: 'Message',
    description: '監督・選手からのメッセージ',
    link: '/message',
  },
  {
    title: 'Supporters',
    description: 'ご支援いただいている皆様',
    link: '/supporters',
  },
  {
    title: 'Contact',
    description: 'チームへのお問い合わせ',
    link: '/contact',
  },
  {
    title: 'Daito Bunka Univ.',
    description: '大学公式サイト',
    link: 'https://www.daito.ac.jp',
    external: true,
  },
];

export default function TeamLinks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-daito-orange font-sans text-sm tracking-[0.3em] mb-3">
            EXPLORE TEAM
          </p>
          <h2 className="text-2xl md:text-4xl font-sans font-light text-neutral-900">
            Team Links
          </h2>
          <p className="text-sm text-neutral-500 mt-2">Explore Our Team</p>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {teamLinks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {item.external ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full bg-white rounded-xl border border-neutral-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-daito-green/30 group"
                >
                  <h3 className="text-base md:text-lg font-bold text-neutral-900 mb-2 group-hover:text-daito-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-500 mb-4">
                    {item.description}
                  </p>
                  <span className="text-sm font-medium text-daito-green">
                    View More →
                  </span>
                </a>
              ) : (
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
                    View More →
                  </span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
