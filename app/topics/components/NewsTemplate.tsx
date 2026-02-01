import Link from 'next/link';
import { ReactNode } from 'react';

interface NewsArticle {
  slug: string;
  title: string;
}

interface NewsTemplateProps {
  date: string;
  title: string;
  subtitle?: string;
  colorTheme?: 'green' | 'orange';
  image?: string;
  previousArticle?: NewsArticle | null;
  nextArticle?: NewsArticle | null;
  children: ReactNode;
}

export default function NewsTemplate({ 
  date, 
  title, 
  subtitle, 
  colorTheme = 'green',
  image,
  previousArticle,
  nextArticle,
  children 
}: NewsTemplateProps) {
  const themeColors = {
    green: {
      heroGradient: 'from-neutral-900 via-neutral-800 to-neutral-900',
      accentGradient: 'from-daito-green/20 via-transparent to-daito-orange/20',
      badge: 'bg-daito-green',
      hoverColor: 'hover:bg-daito-green',
    },
    orange: {
      heroGradient: 'from-daito-orange/90 via-neutral-800 to-neutral-900',
      accentGradient: 'from-daito-green/10 via-transparent to-daito-orange/20',
      badge: 'bg-daito-orange',
      hoverColor: 'hover:bg-daito-orange',
    },
  };

  const theme = themeColors[colorTheme];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${theme.heroGradient} text-white py-20 md:py-32 overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.accentGradient}`} />
        <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-xs font-medium tracking-wider uppercase">NEWS</span>
              <span className="text-xs text-neutral-300">{date.replace(/-/g, '.')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {title}
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-daito-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-daito-green/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
              <div className="prose prose-lg max-w-none prose-neutral">
                {children}
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-8 border-t border-neutral-200">
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {previousArticle ? (
                  <Link
                    href={`/topics/news/2026/${previousArticle.slug}`}
                    className="block rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-daito-green/40 hover:shadow-md group"
                  >
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>前のニュース</span>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-daito-green transition-colors">
                      {previousArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>前のニュース</span>
                    </div>
                    <div>前のニュースはありません</div>
                  </div>
                )}

                {nextArticle ? (
                  <Link
                    href={`/topics/news/2026/${nextArticle.slug}`}
                    className="block rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-daito-green/40 hover:shadow-md group text-right"
                  >
                    <div className="flex items-center justify-end gap-2 text-xs text-neutral-500 mb-2">
                      <span>次のニュース</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-daito-green transition-colors">
                      {nextArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-6 text-xs text-neutral-400 text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <span>次のニュース</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>次のニュースはありません</div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/news" 
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full ${theme.hoverColor} transition-colors duration-300`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">ニュース一覧へ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
