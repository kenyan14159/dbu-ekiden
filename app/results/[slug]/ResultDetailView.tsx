"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ResultEvent } from '@/lib/types';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

interface ResultDetailViewProps {
    event: ResultEvent | null;
    previousEvent?: ResultEvent | null;
    nextEvent?: ResultEvent | null;
}

export default function ResultDetailView({ event, previousEvent, nextEvent }: ResultDetailViewProps) {
    if (!event) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <section className="relative py-20 md:py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-neutral-900 mb-4">
                                NOT FOUND
                            </h1>
                            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
                                リザルトが見つかりません
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6 text-center">
                        <Link
                            href="/results"
                            className="inline-flex items-center gap-2 text-daito-green hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            リザルト一覧に戻る
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    const venue = event.venue ?? event.location ?? '';
    const results = event.results ?? [];

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-daito-orange text-white text-xs font-medium rounded-full">
                                RESULT
                            </span>
                            <span className="text-neutral-600 text-sm">{formatDate(event.date)}</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-neutral-900 leading-tight mb-4" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                            {event.title.includes('第102回') ? (
                                <>
                                    第102回
                                    <br className="hidden md:block" />
                                    東京箱根間往復大学駅伝競走
                                </>
                            ) : (
                                event.title
                            )}
                        </h1>
                        <p className="text-neutral-600">
                            {venue}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Breadcrumbs */}
                        <Breadcrumbs 
                            items={[
                                { label: 'リザルト', href: '/results' },
                                { label: event.title }
                            ]} 
                            className="mb-8"
                        />

                        {/* Back Link */}
                        <Link
                            href="/results"
                            className="inline-flex items-center gap-2 text-neutral-500 hover:text-daito-green transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            リザルト一覧に戻る
                        </Link>

                        {/* Team Result */}
                        {event.teamResult && (
                            <div className="mb-8 bg-white rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-sm">
                                <h2 className="text-lg font-bold text-neutral-900 mb-4">チーム成績</h2>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="inline-flex items-center gap-3 bg-daito-green/10 text-neutral-900 px-6 py-3 rounded-full border border-daito-green/20">
                                        <span className="font-bold text-lg">総合 {event.teamResult.rank}</span>
                                        <span className="text-neutral-600">（{event.teamResult.totalTime}）</span>
                                    </div>
                                    {(event.teamResult.outboundRank || event.teamResult.inboundRank) && (
                                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                                            {event.teamResult.outboundRank && (
                                                <div className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-900 px-4 py-2 rounded-full border border-neutral-200">
                                                    <span className="text-neutral-700">往路</span>
                                                    <span className="font-bold">{event.teamResult.outboundRank}</span>
                                                    <span className="text-neutral-600">（{event.teamResult.outboundTime}）</span>
                                                </div>
                                            )}
                                            {event.teamResult.inboundRank && (
                                                <div className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-900 px-4 py-2 rounded-full border border-neutral-200">
                                                    <span className="text-neutral-700">復路</span>
                                                    <span className="font-bold">{event.teamResult.inboundRank}</span>
                                                    <span className="text-neutral-600">（{event.teamResult.inboundTime}）</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {event.description && (
                            <div className="mb-8 bg-white rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-sm">
                                <div className="prose prose-sm max-w-none text-neutral-700 whitespace-pre-line leading-relaxed">
                                    {event.description}
                                </div>
                            </div>
                        )}

                        {/* Results Table (Desktop) */}
                        <div className="hidden md:block bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-neutral-50 border-b border-neutral-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-medium text-neutral-600">種目</th>
                                            <th className="px-6 py-4 text-left font-medium text-neutral-600">氏名</th>
                                            <th className="px-6 py-4 text-left font-medium text-neutral-600">記録</th>
                                            <th className="px-6 py-4 text-left font-medium text-neutral-600">順位</th>
                                            <th className="px-6 py-4 text-left font-medium text-neutral-600">備考</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((result, idx) => (
                                            <tr
                                                key={idx}
                                                className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-neutral-900">{result.event ?? ''}</td>
                                                <td className="px-6 py-4 font-medium text-neutral-900">{result.name ?? ''}</td>
                                                <td className="px-6 py-4 font-mono text-neutral-900">{result.time ?? ''}</td>
                                                <td className="px-6 py-4 text-neutral-600">{result.rank ?? ''}</td>
                                                <td className="px-6 py-4">
                                                    {result.note && (
                                                        <span className="px-2 py-0.5 bg-daito-orange/10 text-daito-orange text-xs rounded">
                                                            {result.note}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Results Cards (Mobile) */}
                        <div className="md:hidden space-y-4">
                            {results.map((result, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                                            {result.event ?? ''}
                                        </span>
                                        <span className="text-sm text-neutral-600 flex items-center gap-1">
                                            <span className="text-xs text-neutral-400">順位</span>
                                            {result.rank ?? ''}
                                        </span>
                                    </div>
                                    <div className="mb-3">
                                        <div className="font-bold text-lg text-neutral-900">{result.name ?? ''}</div>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-neutral-50 pt-3 mt-3">
                                        <div className="text-xs text-neutral-400">記録</div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xl font-bold text-daito-green">{result.time ?? ''}</span>
                                            {result.note && (
                                                <span className="px-2 py-0.5 bg-daito-orange/10 text-daito-orange text-xs rounded font-medium">
                                                    {result.note}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="mt-12">
                            <div className="grid gap-4 md:grid-cols-2">
                                {previousEvent ? (
                                    <Link
                                        href={`/results/${previousEvent.slug}`}
                                        className="block rounded-2xl border border-neutral-100 bg-white p-6 transition-all hover:border-daito-orange/40 hover:shadow-md"
                                    >
                                        <div className="text-xs text-neutral-500 mb-2">前のリザルト</div>
                                        <div className="text-sm font-medium text-neutral-900 line-clamp-2">
                                            {previousEvent.title}
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400">
                                        前のリザルトはありません
                                    </div>
                                )}

                                {nextEvent ? (
                                    <Link
                                        href={`/results/${nextEvent.slug}`}
                                        className="block rounded-2xl border border-neutral-100 bg-white p-6 transition-all hover:border-daito-orange/40 hover:shadow-md"
                                    >
                                        <div className="text-xs text-neutral-500 mb-2">次のリザルト</div>
                                        <div className="text-sm font-medium text-neutral-900 line-clamp-2">
                                            {nextEvent.title}
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400">
                                        次のリザルトはありません
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 text-center">
                                <Link
                                    href="/results"
                                    className="inline-flex items-center justify-center px-8 py-4 border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 hover:border-daito-orange hover:text-daito-orange transition-all"
                                >
                                    リザルト一覧に戻る
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
