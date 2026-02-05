"use client";

import { motion } from 'framer-motion';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

interface ScheduleEvent {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  description?: string;
  location?: string;
  isCancelled?: boolean;
}

interface ScheduleClientProps {
  year: number;
  events: ScheduleEvent[];
}

function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return days[date.getDay()];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = getDayOfWeek(dateStr);
  return `${month}月${day}日(${dayOfWeek})`;
}

function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate) return formatDate(startDate);
  const start = formatDate(startDate);
  const endDayOfWeek = getDayOfWeek(endDate);
  const endDateObj = new Date(endDate);
  const endDay = endDateObj.getDate();
  return `${start}～${endDateObj.getMonth() + 1}月${endDay}日(${endDayOfWeek})`;
}

export default function ScheduleClient({ year: _year, events }: ScheduleClientProps) {
  // 日付順にソート
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-100 via-amber-50 to-orange-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-light text-neutral-900">
              SCHEDULE
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: 'Schedule' }]}
            className="mb-8"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {sortedEvents.length === 0 ? (
              <div className="text-center py-20 text-neutral-400">
                大会予定はありません
              </div>
            ) : (
              sortedEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group bg-white border border-neutral-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-daito-green/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Date */}
                    <div className="flex-shrink-0 px-4 py-2 rounded-lg text-center min-w-[120px] bg-gradient-to-br from-daito-green/10 to-daito-orange/10">
                      <div className="text-lg font-bold text-daito-green">
                        {formatDateRange(event.date, event.endDate)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-neutral-900 group-hover:text-daito-green transition-colors">
                        {event.title}
                        {event.isCancelled && (
                          <span className="ml-2 text-sm text-red-500 font-normal">
                            中止
                          </span>
                        )}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-neutral-500 mt-1 whitespace-pre-line">
                          {event.description}
                        </p>
                      )}
                      {event.location && (
                        <p className="text-sm text-neutral-400 mt-1">
                          {event.location}
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

