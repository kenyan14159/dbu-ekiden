import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
              記事が見つかりません
            </h1>
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
