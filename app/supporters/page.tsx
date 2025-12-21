"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const supporters = [
  {
    name: 'アミノサウルス',
    company: 'SAURUS JAPAN',
    logo: '/images/saurus.jpg',
    url: 'https://saurusjapan.com/',
  },
  {
    name: 'Adidas',
    company: 'adidas Japan',
    logo: '/images/adidas_daito.png',
    url: 'https://www.adidas.jp/',
  },
];

export default function SupportersPage() {
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
              SUPPORTERS
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
              サポーターの皆様
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Thank You Message */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              大東文化大学陸上競技部男子長距離ブロックは、多くの皆様のご支援により活動しております。
              <br className="hidden md:block" />
              温かいご声援、誠にありがとうございます。
            </p>
          </motion.div>

          {/* Supporters Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-8">
              オフィシャルパートナー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supporters.map((supporter, index) => (
                <motion.a
                  key={supporter.name}
                  href={supporter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group bg-white rounded-xl border border-neutral-100 p-8 flex flex-col items-center justify-center hover:shadow-lg hover:border-neutral-200 transition-all"
                >
                  <div className="relative w-full h-32 mb-4">
                    <Image
                      src={supporter.logo}
                      alt={supporter.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-daito-green transition-colors">
                    {supporter.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{supporter.company}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
