"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

interface Record {
  rank: number;
  name: string;
  fullName: string;
  time: string;
  date: string;
  competition: string;
  year: string;
}

interface RecordsData {
  event: string;
  records: Record[];
}

interface RecordsClientProps {
  recordsData: {
    [key: string]: RecordsData;
  };
}

const eventCategories = [
  { id: '1500m', label: '1500m', key: '1500m', displayLabel: '1500m' },
  { id: '3000m', label: '3000m', key: '3000m', displayLabel: '3000mSC' },
  { id: '5000m', label: '5000m', key: '5000m', displayLabel: '5000m' },
  { id: '10000m', label: '10000m', key: '10000m', displayLabel: '10000m' },
  { id: 'half', label: 'ハーフマラソン', key: 'half-marathon', displayLabel: 'ハーフマラソン' },
];

function ParallaxHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(0, 77, 37, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(243, 152, 0, 0.2) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div>
          <h1 className="text-neutral-900">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-none">
              RECORDS
            </span>
            <span className="block text-lg md:text-xl font-light tracking-[0.3em] mt-4 text-neutral-600">
              大東記録
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function RecordTable({ records }: { records: Record[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-neutral-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              順位
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              選手名
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              記録
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">
              日付
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">
              大会名
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {records.map((record, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="hover:bg-neutral-50 transition-colors"
            >
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                      record.rank === 1 && "bg-yellow-100 text-yellow-800",
                      record.rank === 2 && "bg-gray-100 text-gray-800",
                      record.rank === 3 && "bg-orange-100 text-orange-800",
                      record.rank > 3 && "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {record.rank}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="font-medium text-neutral-900">{record.fullName}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{record.year}</div>
              </td>
              <td className="px-4 py-4">
                <span className="font-mono font-bold text-lg text-daito-green">
                  {record.time}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-neutral-600 hidden md:table-cell">
                {record.date}
              </td>
              <td className="px-4 py-4 text-sm text-neutral-600 hidden lg:table-cell">
                {record.competition}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RecordsClient({ recordsData }: RecordsClientProps) {
  const [activeTab, setActiveTab] = useState('1500m');

  const activeEvent = eventCategories.find(e => e.id === activeTab);
  const currentRecords = activeEvent ? recordsData[activeEvent.key]?.records || [] : [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <ParallaxHero />

      {/* Tab Navigation */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center py-3 md:py-4 gap-0.5 md:gap-1 flex-wrap">
            {eventCategories.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveTab(event.id)}
                aria-label={`${event.label}を表示`}
                aria-pressed={activeTab === event.id}
                className={cn(
                  "relative px-2.5 py-2 md:px-4 md:py-3 text-xs md:text-sm font-medium transition-all duration-300",
                  activeTab === event.id
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                <span className="whitespace-nowrap">{event.label}</span>
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
            items={[{ label: '歴代記録' }]} 
            className="mb-8"
          />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-7xl md:text-8xl font-serif font-light text-neutral-100">
                {activeEvent?.label.charAt(0)}
              </span>
              <div className="-ml-4">
                <div className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                  BEST RECORDS
                </div>
                <h2 className="text-2xl md:text-3xl font-medium text-neutral-900">
                  {activeEvent?.label}
                </h2>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`table-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
          >
            {currentRecords.length > 0 ? (
              <RecordTable records={currentRecords} />
            ) : (
              <div className="text-center py-20">
                <p className="text-neutral-500 text-lg font-medium">準備中</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
