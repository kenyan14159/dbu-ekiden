import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '冬季強化合宿を実施 | 大東文化大学陸上競技部',
  description: '11月下旬、千葉県富津市にて冬季強化合宿を実施しました。',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-neutral-500 mb-4">2026年1月1日</p>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              冬季強化合宿を実施
            </h1>
            <p className="text-lg text-neutral-600">
              11月下旬、千葉県富津市にて冬季強化合宿を実施しました。
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <h2>【冬季強化合宿レポート】</h2>

            <p>
              11月25日から12月3日までの9日間、千葉県富津市にて冬季強化合宿を実施しました。
            </p>

            <p>
              今回も毎年お世話になっている「味覚の宿 志ら井」様に宿泊させていただきました。温かいおもてなしと手厚いサポートを頂き、心より感謝申し上げます。
            </p>

            <p>
              合宿期間中は、チーム全体で質の高いトレーニングに集中することができ、非常に充実した内容となりました。
            </p>

            <p>
              箱根駅伝まで残り1ヶ月を切りました。体調管理・感染症対策を万全にしながら、本番で100%以上の力を発揮できるよう、チーム一丸となってさらに努力を重ねてまいります。
            </p>

            <p>引き続き温かいご声援をよろしくお願いいたします。</p>

            <hr />

            <h3>協賛・サポート</h3>
            <p>adidas / サウルスジャパン / 日本ロジテム株式会社</p>
            <p>宿泊：味覚の宿 志ら井（千葉県富津市）</p>
          </div>
        </div>
      </article>
    </div>
  );
}
