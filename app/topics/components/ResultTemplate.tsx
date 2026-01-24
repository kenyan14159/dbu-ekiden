import Link from 'next/link';
import { ReactNode } from 'react';

interface ResultTemplateProps {
  date: string;
  title: string;
  location: string;
  teamResult?: {
    rank?: string;
    totalTime?: string;
    outwardRank?: string;
    outwardTime?: string;
    returnRank?: string;
    returnTime?: string;
  };
  children: ReactNode;
}

export default function ResultTemplate({ 
  date, 
  title, 
  location, 
  teamResult,
  children 
}: ResultTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-daito-green via-emerald-700 to-neutral-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-orange/10 via-transparent to-daito-green/30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-xs font-medium tracking-wider">RESULT</span>
              <span className="text-xs text-neutral-300">{date.replace(/-/g, '.')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-neutral-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-lg md:text-xl">{location}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-daito-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Team Result Card */}
            {teamResult && (
              <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 shadow-lg p-6 md:p-8 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-daito-green/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-daito-green" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">総合成績</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {teamResult.rank && (
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-500 mb-2">総合順位</p>
                      <p className="text-3xl md:text-4xl font-bold text-daito-green">{teamResult.rank}</p>
                    </div>
                  )}
                  {teamResult.totalTime && (
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-500 mb-2">総合タイム</p>
                      <p className="text-xl md:text-2xl font-bold font-mono text-neutral-900">{teamResult.totalTime}</p>
                    </div>
                  )}
                  {teamResult.outwardRank && (
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-500 mb-2">往路</p>
                      <p className="text-lg md:text-xl font-bold text-neutral-900">{teamResult.outwardRank}</p>
                      {teamResult.outwardTime && <p className="text-sm font-mono text-neutral-600 mt-1">{teamResult.outwardTime}</p>}
                    </div>
                  )}
                  {teamResult.returnRank && (
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-500 mb-2">復路</p>
                      <p className="text-lg md:text-xl font-bold text-neutral-900">{teamResult.returnRank}</p>
                      {teamResult.returnTime && <p className="text-sm font-mono text-neutral-600 mt-1">{teamResult.returnTime}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {children}
            </div>

            {/* Related Links */}
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-4">
                <Link href="/results" className="inline-flex items-center gap-2 px-6 py-3 bg-daito-green text-white rounded-full hover:bg-daito-green/90 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">リザルト一覧へ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
