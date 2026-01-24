import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第102回箱根駅伝エントリーメンバー（16名）発表！ | 大東文化大学陸上競技部',
  description: '第102回東京箱根間往復大学駅伝競走のエントリーメンバー16名を発表しました。',
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
              第102回箱根駅伝エントリーメンバー（16名）発表！
            </h1>
            <p className="text-lg text-neutral-600">
              第102回東京箱根間往復大学駅伝競走のエントリーメンバー16名を発表しました。
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p>第102回箱根駅伝まであと18日！</p>

            <p>大東文化大学のチームエントリーメンバー16名が発表されました。</p>

            <h2>【4年生】4名</h2>
            <ul>
              <li>赤星 龍舞（あかほし りゅうま）</li>
              <li>入濵 輝大（いりはま きらり）</li>
              <li>照井 海翔（てるい かいと）</li>
              <li>戸田 優真（とだ ゆうま）</li>
            </ul>

            <h2>【3年生】3名</h2>
            <ul>
              <li>石川 郁弥（いしかわ いくや）</li>
              <li>庄司 瑞輝（しょうじ みずき）</li>
              <li>棟方 一楽（むなかた いちら）</li>
            </ul>

            <h2>【2年生】5名</h2>
            <ul>
              <li>エヴァンス キプロップ</li>
              <li>大濱 逞真（おおはま たくま）</li>
              <li>清水 雄翔（しみず ゆうと）</li>
              <li>中澤 真大（なかざわ まひろ）</li>
              <li>松浦 輝仁（まつうら てると）</li>
            </ul>

            <h2>【1年生】4名</h2>
            <ul>
              <li>上田 翔大（うえだ しょうた）</li>
              <li>菅﨑 大翔（すがさき たいが）</li>
              <li>鈴木 要（すずき かなめ）</li>
              <li>日髙 龍之助（ひだか りゅうのすけ）</li>
            </ul>

            <p>
              4年連続54回目の出場となる今大会。「歴史への礎〜あの場所でやり返す〜」のスローガンのもと、2年ぶりのシード権奪還を目指します。
            </p>

            <p>応援よろしくお願いいたします！</p>
          </div>
        </div>
      </article>
    </div>
  );
}
