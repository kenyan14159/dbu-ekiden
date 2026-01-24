import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '卒業生・松田彩乃さんが地域スポーツ振興賞を受賞 | 大東文化大学陸上競技部',
  description: '陸上競技から転身後も地域スポーツ振興に尽力し、功績が表彰されました。',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-neutral-500 mb-4">2026年1月12日</p>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              卒業生・松田彩乃さんが地域スポーツ振興賞を受賞
            </h1>
            <p className="text-lg text-neutral-600">
              陸上競技から転身後も地域スポーツ振興に尽力し、功績が表彰されました。
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p>松田彩乃さんが地域スポーツ振興賞を受賞しました。</p>

            <p>
              競技引退後は指導・運営の立場から長年にわたり地域スポーツの発展に貢献しており、その功績が評価されました。
            </p>

            <p>今後も地域スポーツの発展に向けて、さらなる活躍が期待されます。</p>
          </div>
        </div>
      </article>
    </div>
  );
}
