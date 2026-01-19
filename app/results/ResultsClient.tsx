"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Result {
  event: string;
  name: string;
  time: string;
  rank: string;
  note?: string;
}

interface TeamResult {
  rank: string;
  totalTime: string;
  outboundRank?: string;
  outboundTime?: string;
  inboundRank?: string;
  inboundTime?: string;
}

interface ResultEvent {
  id: string;
  slug: string;
  date: string;
  title: string;
  venue: string;
  results: Result[];
  teamResult?: TeamResult;
  description?: string;
}

interface ResultsClientProps {
  events: ResultEvent[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function ResultsClient({ events }: ResultsClientProps) {
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
              RESULTS
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white">
              リザルト
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {events.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Link
                  href={`/results/${event.slug}`}
                  className="block bg-white rounded-xl border border-neutral-100 p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:border-daito-orange/30 group h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-daito-orange text-white text-[10px] font-medium rounded">
                      RESULT
                    </span>
                    {event.teamResult && (
                      <span className="px-2 py-0.5 bg-daito-green/10 text-daito-green text-[10px] font-bold rounded">
                        {event.teamResult.rank}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mb-2">{formatDate(event.date)}</p>
                  <h2 className="text-sm md:text-base font-bold text-neutral-900 group-hover:text-daito-orange transition-colors line-clamp-2 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {event.venue}
                  </p>
                </Link>
              </motion.article>
            ))}

            {events.length === 0 && (
              <div className="col-span-full text-center py-20 text-neutral-400">
                リザルトがありません
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

