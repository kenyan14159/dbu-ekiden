import Link from 'next/link';
import { ReactNode } from 'react';

interface NewsTemplateProps {
  date: string;
  title: string;
  subtitle: string;
  colorTheme?: 'green' | 'orange';
  children: ReactNode;
}

export default function NewsTemplate({ 
  date, 
  title, 
  subtitle, 
  colorTheme = 'green',
  children 
}: NewsTemplateProps) {
  const themeColors = {
    green: {
      heroGradient: 'from-neutral-900 via-neutral-800 to-neutral-900',
      accentGradient: 'from-daito-green/20 via-transparent to-daito-orange/20',
      badge: 'bg-daito-green',
      borderColor: 'border-daito-green',
      hoverColor: 'hover:bg-daito-green',
      lightBg: 'from-daito-green/5',
    },
    orange: {
      heroGradient: 'from-daito-orange/90 via-neutral-800 to-neutral-900',
      accentGradient: 'from-daito-green/10 via-transparent to-daito-orange/20',
      badge: 'bg-daito-orange',
      borderColor: 'border-daito-orange',
      hoverColor: 'hover:bg-daito-orange',
      lightBg: 'from-daito-orange/5',
    },
  };

  const theme = themeColors[colorTheme];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${theme.heroGradient} text-white py-16 md:py-24 overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.accentGradient}`} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-xs font-medium tracking-wider">NEWS</span>
              <span className="text-xs text-neutral-300">{date.replace(/-/g, '.')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-daito-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-daito-green/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image Placeholder */}
            <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl mb-12 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-neutral-400">画像エリア</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {children}
            </div>

            {/* Related Links */}
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-4">
                <Link href="/news" className={`inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full ${theme.hoverColor} transition-colors duration-300`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
