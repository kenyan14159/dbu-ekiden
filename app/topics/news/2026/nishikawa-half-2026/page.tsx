import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '卒業生・西川大輝選手がハーフマラソンで大会新 | 大東文化大学陸上競技部',
  description: '西川大輝選手がハーフマラソンで大会新記録を樹立しました。',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-neutral-500 mb-4">2026年1月5日</p>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              卒業生・西川大輝選手がハーフマラソンで大会新
            </h1>
            <p className="text-lg text-neutral-600">
              西川大輝選手がハーフマラソンで大会新記録を樹立しました。
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p>西川大輝選手がハーフマラソンに出場し、大会新記録を樹立しました。</p>

            <p>
              序盤から積極的な展開でレースを引っ張り、終盤まで余裕のある走りで優勝を飾りました。
            </p>

            <p>今後の活躍にも期待が高まります。</p>
          </div>
        </div>
      </article>
    </div>
  );
}
