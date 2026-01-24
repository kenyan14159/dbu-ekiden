import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '小江戸川越ハーフマラソン2025 | 大東文化大学陸上競技部',
  description: '小江戸川越ハーフマラソン2025の結果',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-neutral-500 mb-4">2026年1月1日</p>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              小江戸川越ハーフマラソン2025
            </h1>
            <p className="text-lg text-neutral-600 mb-4">川越</p>
          </header>

          {/* Individual Results */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">成績</h2>
            
            <div className="space-y-4">
              {[
                { name: 'エヴァンス キプロップ（2）', time: '1:03:08', rank: '6位', note: 'PB' },
                { name: '赤星 龍舞（4）', time: '1:04:05', rank: '14位', note: 'PB' },
                { name: '早乙女 良真（3）', time: '1:07:56', rank: '31位', note: '' },
                { name: '中澤 拓斗（2）', time: '1:08:11', rank: '37位', note: '' },
                { name: '松本 雄大（4）', time: '1:11:22', rank: '68位', note: '' },
                { name: '中村 一誠（1）', time: '1:11:58', rank: '71位', note: '' },
                { name: '小野 翔太郎（4）', time: '1:12:43', rank: '81位', note: '' },
                { name: '五十嵐 優貴（4）', time: '1:15:54', rank: '83位', note: '' },
                { name: '越前谷 洋武（1）', time: '1:16:15', rank: '84位', note: '' },
                { name: '岡村 将英（1）', time: '1:19:12', rank: '86位', note: '' },
              ].map((result, index) => (
                <div key={index} className="border-b border-neutral-100 pb-4 last:border-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-neutral-900">{result.name}</p>
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
                      {result.note && (
                        <div>
                          <p className="text-sm text-neutral-500">備考</p>
                          <p className="font-bold text-daito-orange">{result.note}</p>
                        </div>
                      )}
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
