import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '卒業生・武田遥斗選手が関東実業団10,000mで自己ベスト | 大東文化大学陸上競技部',
  description: '武田遥斗選手が関東実業団10,000mに出場し、28分台の自己ベストを更新しました。',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-neutral-500 mb-4">2026年1月18日</p>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              卒業生・武田遥斗選手が関東実業団10,000mで自己ベスト
            </h1>
            <p className="text-lg text-neutral-600">
              武田遥斗選手が関東実業団10,000mに出場し、28分台の自己ベストを更新しました。
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p>関東実業団10,000mに出場した武田遥斗選手が28分台の自己ベストを更新しました。</p>

            <p>
              レース後半にペースを維持し、終盤の粘りで順位を押し上げる走りでした。今後の主要大会での活躍が期待されます。
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
