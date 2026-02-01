import { Metadata } from 'next';
import { getResultArticleBySlug, getResultArticleNavigation } from '@/lib/data';
import ResultTemplate from '@/app/topics/components/ResultTemplate';

export const metadata: Metadata = {
  title: '第59回黒山•鎌北湖駅伝大会 | 大東文化大学陸上競技部',
  description: '第59回黒山•鎌北湖駅伝大会',
};

export default async function ResultDetailPage() {
  const article = await getResultArticleBySlug('kuroyama-kamakitako-59');
  const navigation = await getResultArticleNavigation('kuroyama-kamakitako-59');

  if (!article) {
    return null;
  }

  return (
    <ResultTemplate
      date={article.date}
      title={article.title}
      location="黒山・鎌北湖"
      teamResult={{
        rank: "総合1位",
        totalTime: "1:17:34",
      }}
      previousArticle={navigation.previous ? { slug: navigation.previous.slug, title: navigation.previous.title } : null}
      nextArticle={navigation.next ? { slug: navigation.next.slug, title: navigation.next.title } : null}
    >
      <p className="text-neutral-700 leading-relaxed mb-4">
        本日、黒山•鎌北湖駅伝大会に出場し、優勝することができました！
        ご声援ありがとうございました🙌🏻
      </p>
      <p className="text-neutral-700 leading-relaxed mb-4">
        そして「箱根駅伝」まで、チーム一丸となって頑張って参ります🔥
      </p>
      <p className="text-neutral-700 leading-relaxed mb-8">
        今年がラストイヤーのメンバーで襷を繋ぎました🎽✨
      </p>

      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">個人成績</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-neutral-200 rounded-xl">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">区間</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">選手名</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">タイム</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">区間順位</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">備考</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">1区（3.2km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">松本 雄大（4）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">10&apos;15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間1位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-daito-orange/10 text-daito-orange">区間新</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">2区（3.6km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">阪東 巧翔（4）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">11&apos;14</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間11位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">3区（4.4km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">小野 翔太郎（4）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">13&apos;02</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間1位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">4区（4.2km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">五十嵐 優貴（4）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">12&apos;35</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間1位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-daito-orange/10 text-daito-orange">区間新</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">5区（5.1km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">上野 隼弥（4）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">17&apos;35</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間13位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">6区（4.6km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">喜早 駿介（M2）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">12&apos;53</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間1位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-daito-orange/10 text-daito-orange">区間新</span>
                    </td>
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
