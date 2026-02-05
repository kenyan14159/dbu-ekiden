"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { NewsArticle } from '@/lib/types';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

interface NewsArticleViewProps {
    article: NewsArticle | null;
    previousArticle?: NewsArticle | null;
    nextArticle?: NewsArticle | null;
}

export default function NewsArticleView({ article, previousArticle, nextArticle }: NewsArticleViewProps) {
    if (!article) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <section className="relative py-20 md:py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-light text-neutral-900 mb-4">
                                NOT FOUND
                            </h1>
                            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
                                記事が見つかりません
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6 text-center">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-daito-green hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            ニュース一覧に戻る
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

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
                            <span className="px-3 py-1 bg-daito-green text-white text-xs font-medium rounded-full">
                                {article.category}
                            </span>
                            <span className="text-neutral-600 text-sm">{formatDate(article.date)}</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-sans font-light text-neutral-900 leading-tight">
                            {article.title}
                        </h1>
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
                        className="max-w-3xl mx-auto"
                    >
                        {/* Breadcrumbs */}
                        <Breadcrumbs 
                            items={[
                                { label: 'ニュース', href: '/news' },
                                { label: article.title }
                            ]} 
                            className="mb-8"
                        />

                        {/* Back Link */}
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-neutral-500 hover:text-daito-green transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            ニュース一覧に戻る
                        </Link>

                        {/* Article Content */}
                        <article className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 shadow-sm">
                            <div className="prose prose-lg max-w-none">
                                {(article.content || article.excerpt || '').split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-neutral-700 leading-relaxed mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </article>

                        {/* Navigation */}
                        <div className="mt-12">
                            <div className="grid gap-4 md:grid-cols-2">
                                {previousArticle ? (
                                    <Link
                                        href={`/news/${previousArticle.slug}`}
                                        className="block rounded-2xl border border-neutral-100 bg-white p-6 transition-all hover:border-daito-green/40 hover:shadow-md"
                                    >
                                        <div className="text-xs text-neutral-500 mb-2">前のニュース</div>
                                        <div className="text-sm font-medium text-neutral-900 line-clamp-2">
                                            {previousArticle.title}
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400">
                                        前のニュースはありません
                                    </div>
                                )}

                                {nextArticle ? (
                                    <Link
                                        href={`/news/${nextArticle.slug}`}
                                        className="block rounded-2xl border border-neutral-100 bg-white p-6 transition-all hover:border-daito-green/40 hover:shadow-md"
                                    >
                                        <div className="text-xs text-neutral-500 mb-2">次のニュース</div>
                                        <div className="text-sm font-medium text-neutral-900 line-clamp-2">
                                            {nextArticle.title}
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400">
                                        次のニュースはありません
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 text-center">
                                <Link
                                    href="/news"
                                    className="inline-flex items-center justify-center px-8 py-4 border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 hover:border-daito-green hover:text-daito-green transition-all"
                                >
                                    ニュース一覧に戻る
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
