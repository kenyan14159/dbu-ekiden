"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ScheduleEvent {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  category: string;
  description?: string;
  location?: string;
  isCancelled?: boolean;
}

interface ScheduleClientProps {
  year: number;
  events: ScheduleEvent[];
}

const seasons = [
  { id: '春', label: '春', en: 'SPRING', color: 'from-pink-400 to-rose-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-200', textColor: 'text-pink-600' },
  { id: '夏', label: '夏', en: 'SUMMER', color: 'from-orange-400 to-amber-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', textColor: 'text-orange-600' },
  { id: '秋', label: '秋', en: 'AUTUMN', color: 'from-amber-500 to-yellow-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', textColor: 'text-amber-600' },
  { id: '冬', label: '冬', en: 'WINTER', color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-600' },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate) return formatDate(startDate);
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function ScheduleClient({ year, events }: ScheduleClientProps) {
  const [activeSeason, setActiveSeason] = useState('春');

  const filteredEvents = events.filter(
    (event) => event.category === activeSeason
  );

  const currentSeasonData = seasons.find((s) => s.id === activeSeason);

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
              SCHEDULE
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
              年間スケジュール
            </h1>
            <p className="text-white/60 text-lg">
              {year}年度 大会予定
            </p>
          </motion.div>
        </div>
      </section>

      {/* Season Navigation */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-4 gap-2 md:gap-4">
            {seasons.map((season) => (
              <button
                key={season.id}
                onClick={() => setActiveSeason(season.id)}
                aria-label={`${season.label}の大会を表示`}
                aria-pressed={activeSeason === season.id}
                className={`
                  relative px-6 md:px-8 py-3 text-sm md:text-base font-medium transition-all duration-300 rounded-full
                  ${activeSeason === season.id
                    ? `bg-gradient-to-r ${season.color} text-white shadow-lg`
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }
                `}
              >
                <span className="hidden md:inline mr-2">{season.en}</span>
                {season.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-baseline gap-4">
              <span className={`text-7xl md:text-8xl font-serif font-light ${currentSeasonData?.textColor} opacity-30`}>
                {currentSeasonData?.label}
              </span>
              <div className="-ml-4">
                <div className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                  {currentSeasonData?.en}
                </div>
                <h2 className="text-2xl md:text-3xl font-medium text-neutral-900">
                  {currentSeasonData?.label}の大会
                </h2>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`events-${activeSeason}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20 text-neutral-400">
                この季節の大会予定はありません
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className={`
                    group bg-white border rounded-xl p-6 transition-all duration-300
                    hover:shadow-lg hover:border-neutral-200
                    ${event.isCancelled ? 'opacity-50' : ''}
                    ${currentSeasonData?.borderColor}
                  `}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Date */}
                    <div className={`
                      flex-shrink-0 px-4 py-2 rounded-lg text-center min-w-[100px]
                      ${currentSeasonData?.bgColor}
                    `}>
                      <div className={`text-lg font-bold ${currentSeasonData?.textColor}`}>
                        {formatDateRange(event.date, event.endDate)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`
                        text-lg font-medium text-neutral-900 group-hover:text-daito-green transition-colors
                        ${event.isCancelled ? 'line-through' : ''}
                      `}>
                        {event.title}
                        {event.isCancelled && (
                          <span className="ml-2 text-sm text-red-500 font-normal">
                            中止
                          </span>
                        )}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-neutral-500 mt-1">
                          {event.description}
                        </p>
                      )}
                      {event.location && (
                        <p className="text-sm text-neutral-400 mt-1">
                          📍 {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

