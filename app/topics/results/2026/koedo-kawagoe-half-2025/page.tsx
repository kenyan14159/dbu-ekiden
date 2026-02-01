import { Metadata } from 'next';
import { getResultArticleBySlug, getResultArticleNavigation } from '@/lib/data';
import ResultTemplate from '@/app/topics/components/ResultTemplate';

export const metadata: Metadata = {
  title: '小江戸川越ハーフマラソン2025 | 大東文化大学陸上競技部',
  description: '小江戸川越ハーフマラソン2025',
};

export default async function ResultDetailPage() {
  const article = await getResultArticleBySlug('koedo-kawagoe-half-2025');
  const navigation = await getResultArticleNavigation('koedo-kawagoe-half-2025');

  if (!article) {
    return null;
  }

  return (
    <ResultTemplate
      date={article.date}
      title={article.title}
      location="川越"
      previousArticle={navigation.previous ? { slug: navigation.previous.slug, title: navigation.previous.title } : null}
      nextArticle={navigation.next ? { slug: navigation.next.slug, title: navigation.next.title } : null}
    >
      <p className="text-neutral-700 leading-relaxed mb-4">
        本日、小江戸川越ハーフマラソンに出場いたしました！
        メンバー選考や練習の一環など、選手それぞれの目的を持って出場しました！
      </p>
      <p className="text-neutral-700 leading-relaxed mb-8">
        以下が個人結果となります
      </p>
      <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
        自己ベストは⭐️を記載
      </p>

      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">個人成績</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-neutral-200 rounded-xl">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">順位</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">選手名</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">タイム</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">備考</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">6位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">エヴァンス キプロップ（2年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:03:08</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-daito-orange/10 text-daito-orange">PB</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">14位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">赤星 龍舞（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:04:05</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-daito-orange/10 text-daito-orange">PB</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">31位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">早乙女 良真（3年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:07:56</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">37位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">中澤 拓斗（2年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:08:11</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">68位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">松本 雄大（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:11:22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">71位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">中村 一誠（1年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:11:58</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">81位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">小野 翔太郎（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:12:43</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">83位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">五十嵐 優貴（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:15:54</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">84位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">越前谷 洋武（1年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:16:15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">86位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">岡村 将英（1年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:19:12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ResultTemplate>
  );
}
