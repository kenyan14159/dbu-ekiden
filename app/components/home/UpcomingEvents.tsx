"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const events = [
  {
    date: '12.20',
    month: 'DEC',
    title: '第26回日本体育大学女子長距離競技会',
    location: '健志台キャンパス陸上競技場',
    highlight: false
  },
  {
    date: '12.31',
    month: 'DEC',
    title: '第244回東海大学長距離競技会',
    location: '東海大学湘南校舎陸上競技場',
    highlight: false
  },
  {
    date: '01.02',
    month: 'JAN',
    endDate: '01.03',
    title: '第102回東京箱根間往復大学駅伝競走',
    location: '大手町読売新聞社前～箱根町芦ノ湖駐車場入口',
    highlight: true
  }
];

export default function UpcomingEvents() {
  return (
    <section className="py-24 md:py-32 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-daito-green/10 blur-[100px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-daito-orange/10 blur-[80px]"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline gap-4 mb-16"
        >
          <span className="text-8xl md:text-9xl font-serif font-light text-white/10">02</span>
          <div className="-ml-6">
            <div className="text-[10px] tracking-[0.3em] text-daito-orange uppercase">Upcoming Events</div>
            <h2 className="text-2xl md:text-4xl font-medium text-white">今後の試合予定</h2>
          </div>
        </motion.div>

        {/* Events List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={cn(
                "relative group",
                event.highlight && "z-10"
              )}
            >
              <div className={cn(
                "flex items-stretch rounded-2xl overflow-hidden transition-all duration-500",
                event.highlight
                  ? "bg-gradient-to-r from-daito-green/20 to-daito-orange/20 border border-daito-orange/30"
                  : "bg-white/5 border border-white/10 hover:border-white/20"
              )}>
                {/* Date Block */}
                <div className={cn(
                  "flex-shrink-0 w-24 md:w-32 py-6 flex flex-col items-center justify-center border-r transition-colors duration-300",
                  event.highlight
                    ? "bg-daito-orange/20 border-daito-orange/30"
                    : "bg-white/5 border-white/10"
                )}>
                  <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">{event.month}</span>
                  <span className={cn(
                    "text-3xl md:text-4xl font-light font-mono",
                    event.highlight ? "text-daito-orange" : "text-white"
                  )}>
                    {event.date}
                  </span>
                  {event.endDate && (
                    <span className="text-xs text-white/40 mt-1">〜{event.endDate}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {event.highlight && (
                        <span className="inline-block px-3 py-1 bg-daito-orange/20 text-daito-orange text-[10px] tracking-wider font-medium rounded-full mb-3">
                          HAKONE EKIDEN
                        </span>
                      )}
                      <h3 className={cn(
                        "text-lg md:text-xl font-medium mb-2",
                        event.highlight ? "text-white" : "text-white/90"
                      )}>
                        {event.title}
                      </h3>
                      <p className="text-sm text-white/40 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="line-clamp-1">{event.location}</span>
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-sm font-medium text-white hover:border-daito-green hover:text-daito-green transition-all duration-300"
          >
            スケジュール一覧
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
