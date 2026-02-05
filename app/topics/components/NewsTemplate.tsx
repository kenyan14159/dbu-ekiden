import Link from 'next/link';
import { ReactNode } from 'react';

interface NewsArticle {
  slug: string;
  title: string;
}

interface NewsTemplateProps {
  date: string;
  title: string;
  colorTheme?: 'green' | 'orange';
  previousArticle?: NewsArticle | null;
  nextArticle?: NewsArticle | null;
  children: ReactNode;
}

export default function NewsTemplate({
  date,
  title,
  colorTheme = 'green',
  previousArticle,
  nextArticle,
  children,
}: NewsTemplateProps) {
  const accentColor = colorTheme === 'green' ? 'daito-green' : 'daito-orange';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header - MEMBERSページと同様のグラデーション背景 */}
      <header className="relative pt-24 md:pt-28 pb-12 md:pb-16 bg-gradient-to-br from-green-100 via-amber-50 to-orange-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight mb-3">
              {title}
            </h1>
            <div className="text-base md:text-lg text-neutral-600 font-medium">{date.replace(/-/g, '.')}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="prose prose-neutral max-w-none">
          {children}
        </div>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-neutral-200">
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {previousArticle ? (
              <Link
                href={`/topics/news/2026/${previousArticle.slug}`}
                className="flex items-center gap-3 p-4 border border-neutral-200 hover:border-neutral-400 transition-colors"
              >
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500 mb-1">前の記事</div>
                  <div className="text-sm font-medium text-neutral-900 truncate">{previousArticle.title}</div>
                </div>
              </Link>
            ) : (
              <div className="p-4 border border-neutral-100 text-neutral-400 text-sm">
                前の記事はありません
              </div>
            )}

            {nextArticle ? (
              <Link
                href={`/topics/news/2026/${nextArticle.slug}`}
                className="flex items-center justify-end gap-3 p-4 border border-neutral-200 hover:border-neutral-400 transition-colors text-right"
              >
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500 mb-1">次の記事</div>
                  <div className="text-sm font-medium text-neutral-900 truncate">{nextArticle.title}</div>
                </div>
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="p-4 border border-neutral-100 text-neutral-400 text-sm text-right">
                次の記事はありません
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/news"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-${accentColor} hover:opacity-90 transition-opacity`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              ニュース一覧へ
            </Link>
          </div>
        </nav>
      </main>
    </div>
  );
}
