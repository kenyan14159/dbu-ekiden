import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第102回東京箱根間往復大学駅伝競走 | 大東文化大学陸上競技部',
  description: '2026年1月2日、3日に開催された第102回箱根駅伝の結果',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-neutral-500 mb-4">2026年1月2日</p>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              第102回東京箱根間往復大学駅伝競走
            </h1>
            <p className="text-lg text-neutral-600 mb-4">東京～箱根間</p>
          </header>

          {/* Team Result */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">総合成績</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-neutral-500 mb-1">総合順位</p>
                <p className="text-3xl font-bold text-neutral-900">第19位</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">総合タイム</p>
                <p className="text-2xl font-bold text-neutral-900">11:04:57</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">往路</p>
                <p className="text-xl font-bold text-neutral-900">第18位 5:30:43</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">復路</p>
                <p className="text-xl font-bold text-neutral-900">第20位 5:34:14</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-8">
            <p className="text-neutral-600 leading-relaxed">
              2026年1月2日(金)、3日(土)に開催された第102回東京箱根間往復大学駅伝競走に陸上競技部男子長距離が出場し、総合19位の結果でした。
            </p>
            <p className="text-neutral-600 leading-relaxed mt-4">
              2日間に渡り、沿道をはじめとし多くの方々へご声援頂き誠にありがとうございます。2026年シーズンも引き続きよろしくお願いします。
            </p>
          </div>

          {/* Individual Results */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">区間成績</h2>
            
            <div className="space-y-4">
              {[
                { section: '1区（21.3km）', name: '大濱 逞真（2年）', time: '1:01:46', rank: '区間15位' },
                { section: '2区（23.1km）', name: '棟方 一楽（3年）', time: '1:09:29', rank: '区間17位' },
                { section: '3区（21.4km）', name: '菅﨑 大翔（1年）', time: '1:04:11', rank: '区間20位' },
                { section: '4区（20.9km）', name: '松浦 輝仁（2年）', time: '1:01:48', rank: '区間6位' },
                { section: '5区（20.8km）', name: '上田 翔大（1年）', time: '1:13:29', rank: '区間14位' },
                { section: '6区（20.8km）', name: '戸田 優真（4年）', time: '1:01:15', rank: '区間20位' },
                { section: '7区（21.3km）', name: '中澤 真大（2年）', time: '1:04:51', rank: '区間18位' },
                { section: '8区（21.4km）', name: '照井 海翔（4年）', time: '1:06:44', rank: '区間17位' },
                { section: '9区（23.1km）', name: '入濵 輝大（4年）', time: '1:09:28', rank: '区間11位' },
                { section: '10区（23.0km）', name: '赤星 龍舞（4年）', time: '1:11:56', rank: '区間19位' },
              ].map((result, index) => (
                <div key={index} className="border-b border-neutral-100 pb-4 last:border-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-neutral-900">{result.section}</p>
                      <p className="text-neutral-600">{result.name}</p>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-sm text-neutral-500">タイム</p>
                        <p className="font-mono font-bold text-neutral-900">{result.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">順位</p>
                        <p className="font-bold text-neutral-900">{result.rank}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
