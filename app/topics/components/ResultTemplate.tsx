import Link from 'next/link';
import { ReactNode } from 'react';

interface ResultArticle {
  slug: string;
  title: string;
}

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
  previousArticle?: ResultArticle | null;
  nextArticle?: ResultArticle | null;
  children: ReactNode;
}

export default function ResultTemplate({ 
  date, 
  title, 
  location,
  teamResult,
  previousArticle,
  nextArticle,
  children 
}: ResultTemplateProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-daito-green via-emerald-700 to-neutral-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-orange/10 via-transparent to-daito-green/30" />
        <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-xs font-medium tracking-wider uppercase">RESULT</span>
              <span className="text-xs text-neutral-300">{date.replace(/-/g, '.')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {title}
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-daito-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Combined Results Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12 mb-8">
              {/* Location */}
              {location && (
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-sm font-medium">{location}</span>
                  </div>
                </div>
              )}

              {/* Team Result Section */}
              {teamResult && (
                <>
                  <div className="mb-8 pb-6 border-b border-neutral-200">
                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">総合成績</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {teamResult.rank && (
                      <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                        <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">総合順位</p>
                        <p className="text-2xl md:text-3xl font-bold text-daito-green">{teamResult.rank}</p>
                      </div>
                    )}
                    {teamResult.totalTime && (
                      <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                        <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">総合タイム</p>
                        <p className="text-lg md:text-xl font-bold font-mono text-neutral-900">{teamResult.totalTime}</p>
                      </div>
                    )}
                    {teamResult.outwardRank && (
                      <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                        <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">往路</p>
                        <p className="text-lg md:text-xl font-bold text-neutral-900">{teamResult.outwardRank}</p>
                        {teamResult.outwardTime && (
                          <p className="text-sm font-mono text-neutral-600 mt-1">{teamResult.outwardTime}</p>
                        )}
                      </div>
                    )}
                    {teamResult.returnRank && (
                      <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                        <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">復路</p>
                        <p className="text-lg md:text-xl font-bold text-neutral-900">{teamResult.returnRank}</p>
                        {teamResult.returnTime && (
                          <p className="text-sm font-mono text-neutral-600 mt-1">{teamResult.returnTime}</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Content (includes description and individual results table) */}
              <div className="prose prose-lg max-w-none prose-neutral">
                {children}
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-8 border-t border-neutral-200">
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {previousArticle ? (
                  <Link
                    href={`/topics/results/2026/${previousArticle.slug}`}
                    className="block rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-daito-orange/40 hover:shadow-md group"
                  >
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>前のリザルト</span>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-daito-orange transition-colors">
                      {previousArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>前のリザルト</span>
                    </div>
                    <div>前のリザルトはありません</div>
                  </div>
                )}

                {nextArticle ? (
                  <Link
                    href={`/topics/results/2026/${nextArticle.slug}`}
                    className="block rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-daito-orange/40 hover:shadow-md group text-right"
                  >
                    <div className="flex items-center justify-end gap-2 text-xs text-neutral-500 mb-2">
                      <span>次のリザルト</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-daito-orange transition-colors">
                      {nextArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400 text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <span>次のリザルト</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>次のリザルトはありません</div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/results" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-daito-green text-white rounded-full hover:bg-daito-green/90 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
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
