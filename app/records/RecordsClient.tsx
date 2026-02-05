"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

interface Record {
  rank: number;
  fullName: string;
  highSchool: string;
  time: string;
}

interface EventRecords {
  event: string;
  records: Record[];
}

interface RecordsClientProps {
  recordsData: EventRecords[];
}

// 種目データ（5000m, 10000m, ハーフのみ）
const eventData = [
  { id: '5000m', label: '5000m', en: '5000M' },
  { id: '10000m', label: '10000m', en: '10000M' },
  { id: 'Half Marathon', label: 'ハーフ', en: 'HALF' },
];

// Parallax Hero
function ParallaxHero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-100 via-amber-50 to-orange-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-light text-neutral-900">
            RECORDS
          </h1>
        </div>
      </div>
    </section>
  );
}

function RankingTable({ records, eventName: _eventName }: { records: Record[]; eventName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-neutral-100 overflow-hidden"
    >
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100">
              <th className="px-4 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider w-16">
                順位
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                選手名
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                出身校
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider w-32">
                タイム
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <motion.tr
                key={`${record.fullName}-${record.time}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className={cn(
                  "border-b border-neutral-50 transition-colors hover:bg-neutral-50/50",
                  record.rank <= 3 && "bg-gradient-to-r from-amber-50/50 to-transparent"
                )}
              >
                <td className="px-4 py-4">
                  <span className={cn(
                    "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                    record.rank === 1 && "bg-amber-400 text-white",
                    record.rank === 2 && "bg-neutral-300 text-white",
                    record.rank === 3 && "bg-amber-600 text-white",
                    record.rank > 3 && "bg-neutral-100 text-neutral-600"
                  )}>
                    {record.rank}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-medium text-neutral-900">{record.fullName}</span>
                </td>
                <td className="px-4 py-4 text-neutral-600 text-sm">
                  {record.highSchool}
                </td>
                <td className="px-4 py-4">
                  <span className="font-mono font-bold text-daito-green">{record.time}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-neutral-100">
        {records.map((record, index) => (
          <motion.div
            key={`${record.fullName}-${record.time}-mobile`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            className={cn(
              "p-4",
              record.rank <= 3 && "bg-gradient-to-r from-amber-50/50 to-transparent"
            )}
          >
            <div className="flex items-start gap-3">
              <span className={cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0",
                record.rank === 1 && "bg-amber-400 text-white",
                record.rank === 2 && "bg-neutral-300 text-white",
                record.rank === 3 && "bg-amber-600 text-white",
                record.rank > 3 && "bg-neutral-100 text-neutral-600"
              )}>
                {record.rank}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-medium text-neutral-900">{record.fullName}</h3>
                  <span className="font-mono font-bold text-daito-green text-sm flex-shrink-0">
                    {record.time}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{record.highSchool}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function RecordsClient({ recordsData }: RecordsClientProps) {
  // デフォルトで5000mを選択
  const [activeTab, setActiveTab] = useState('5000m');

  const activeEventData = recordsData.find(r => r.event === activeTab);
  const currentRecords = activeEventData?.records || [];

  // アクティブなタブのラベルを取得
  const activeEventInfo = eventData.find(e => e.id === activeTab);

  // 利用可能な種目のみを表示
  const availableEvents = eventData.filter(event =>
    recordsData.some(r => r.event === event.id)
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <ParallaxHero />

      {/* Tab Navigation */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center py-3 md:py-4 gap-0.5 md:gap-1 overflow-x-auto">
            {availableEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveTab(event.id)}
                aria-label={`${event.label}のランキングを表示`}
                aria-pressed={activeTab === event.id}
                className={cn(
                  "relative px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  activeTab === event.id
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                {event.label}
                {/* Underline indicator */}
                {activeTab === event.id && (
                  <motion.div
                    layoutId="activeRecordTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-daito-green"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: 'Records' }]}
            className="mb-8"
          />

          {/* Section Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-7xl md:text-8xl font-sans font-light text-neutral-100">
                  {activeEventInfo?.en.charAt(0)}
                </span>
                <div className="-ml-4">
                  <div className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                    {activeEventInfo?.en}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium text-neutral-900">
                    {activeEventInfo?.label} ランキング
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    {currentRecords.length}名
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Ranking Table */}
          {currentRecords.length > 0 ? (
            <RankingTable
              key={activeTab}
              records={currentRecords}
              eventName={activeTab}
            />
          ) : (
            <div className="text-center py-20 text-neutral-400">
              データがありません
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
