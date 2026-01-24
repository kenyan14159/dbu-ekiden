import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第102回箱根駅伝壮行会を開催 | 大東文化大学陸上競技部',
  description: '12月14日、東松山キャンパスにて第102回箱根駅伝壮行会を開催しました。',
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
              第102回箱根駅伝壮行会を開催
            </h1>
            <p className="text-lg text-neutral-600">
              12月14日、東松山キャンパスにて第102回箱根駅伝壮行会を開催しました。
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p>
              12月14日（土）、大東文化大学東松山キャンパスにおいて、第102回箱根駅伝に向けた壮行会および共同記者会見が執り行われました。
            </p>

            <p>お忙しい中ご来場いただいた皆様、誠にありがとうございました。</p>

            <p>
              私たちは今年度のスローガン「歴史への礎〜あの場所でやり返す〜」を掲げ、この1年間、チーム一丸となって走り続けてまいりました。
            </p>

            <p>
              昨年度の悔しさを胸に、日頃から温かいご声援をくださる皆様のために、そして2年ぶりのシード権奪還という目標のために、第102回箱根駅伝本番まで、残された時間を最大限に活かして精進してまいります。
            </p>

            <p>
              引き続き、大東文化大学陸上競技部への変わらぬご支援、ご声援をよろしくお願いいたします。
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
