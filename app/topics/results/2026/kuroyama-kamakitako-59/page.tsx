import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第59回黒山•鎌北湖駅伝大会 | 大東文化大学陸上競技部',
  description: '第59回黒山•鎌北湖駅伝大会の結果',
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
              第59回黒山•鎌北湖駅伝大会
            </h1>
            <p className="text-lg text-neutral-600 mb-4">黒山・鎌北湖</p>
          </header>

          {/* Team Result */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">総合成績</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-neutral-500 mb-1">総合順位</p>
                <p className="text-3xl font-bold text-daito-green">1位</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">総合タイム</p>
                <p className="text-2xl font-bold text-neutral-900">1:17:34</p>
              </div>
            </div>
          </div>

          {/* Individual Results */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">区間成績</h2>
            
            <div className="space-y-4">
              {[
                { section: '1区（3.2km）', name: '松本 雄大（4）', time: "10'15", rank: '区間1位', note: '区間新' },
                { section: '2区（3.6km）', name: '阪東 巧翔（4）', time: "11'14", rank: '区間11位', note: '' },
                { section: '3区（4.4km）', name: '小野 翔太郎（4）', time: "13'02", rank: '区間1位', note: '' },
                { section: '4区（4.2km）', name: '五十嵐 優貴（4）', time: "12'35", rank: '区間1位', note: '区間新' },
                { section: '5区（5.1km）', name: '上野 隼弥（4）', time: "17'35", rank: '区間13位', note: '' },
                { section: '6区（4.6km）', name: '喜早 駿介（M2）', time: "12'53", rank: '区間1位', note: '区間新' },
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
