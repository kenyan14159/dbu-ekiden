import { Metadata } from 'next';
import { getResultArticleBySlug, getResultArticleNavigation } from '@/lib/data';
import ResultTemplate from '@/app/topics/components/ResultTemplate';

export const metadata: Metadata = {
  title: '第102回東京箱根間往復大学駅伝競走 | 大東文化大学陸上競技部',
  description: '第102回東京箱根間往復大学駅伝競走',
};

export default async function ResultDetailPage() {
  const article = await getResultArticleBySlug('hakone-102-2026');
  const navigation = await getResultArticleNavigation('hakone-102-2026');

  if (!article) {
    return null;
  }

  return (
    <ResultTemplate
      date={article.date}
      title={article.title}
      location="東京～箱根間"
      teamResult={{
        rank: "第19位",
        totalTime: "11:04:57",
        outwardRank: "第18位",
        outwardTime: "5:30:43",
        returnRank: "第20位",
        returnTime: "5:34:14",
      }}
      previousArticle={navigation.previous ? { slug: navigation.previous.slug, title: navigation.previous.title } : null}
      nextArticle={navigation.next ? { slug: navigation.next.slug, title: navigation.next.title } : null}
    >
      <p className="text-neutral-700 leading-relaxed mb-8">
        ご声援ありがとうございました!!
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">1区（21.3km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">大濱 逞真（2年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:01:46</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間15位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">2区（23.1km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">棟方 一楽（3年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:09:29</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間17位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">3区（21.4km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">菅﨑 大翔（1年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:04:11</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間20位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">4区（20.9km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">松浦 輝仁（2年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:01:48</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間6位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">5区（20.8km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">上田 翔大（1年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:13:29</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間14位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">6区（20.8km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">戸田 優真（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:01:15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間20位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">7区（21.3km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">中澤 真大（2年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:04:51</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間18位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">8区（21.4km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">照井 海翔（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:06:44</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間17位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">9区（23.1km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">入濵 輝大（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:09:28</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間11位</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">10区（23.0km）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">赤星 龍舞（4年）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900">1:11:56</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">区間19位</td>
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
