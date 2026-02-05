import { Metadata } from 'next';
import { getNewsArticleBySlug, getNewsArticleNavigation } from '@/lib/data';
import NewsTemplate from '@/app/topics/components/NewsTemplate';

export const metadata: Metadata = {
    title: '第29回日本学生ハーフマラソン選手権大会 結果報告 | 大東文化大学陸上競技部',
    description: '第29回日本学生ハーフマラソン選手権大会（丸亀ハーフ）の結果報告です。',
};

export default async function NewsDetailPage() {
    const slug = 'marugame-half-2026';
    const article = await getNewsArticleBySlug(slug);
    const navigation = await getNewsArticleNavigation(slug);

    if (!article) {
        return null;
    }

    return (
        <NewsTemplate
            date={article.date}
            title={article.title}
            colorTheme="green"
            previousArticle={navigation.previous ? { slug: navigation.previous.slug, title: navigation.previous.title } : null}
            nextArticle={navigation.next ? { slug: navigation.next.slug, title: navigation.next.title } : null}
        >
            <p className="mb-6 text-neutral-700">
                本日、香川県立丸亀競技場にて行われた第29回日本学生ハーフマラソン選手権大会に出場しました。<br />
                <strong className="text-daito-green">大濱(2年)が3位入賞🥉</strong>、
                <strong className="text-daito-green">棟方(3年)が7位入賞</strong>を果たしました。<br />
                たくさんのご声援ありがとうございました。
            </p>

            <h3 className="text-lg font-bold mb-4 border-l-4 border-daito-green pl-3">
                出場選手結果 <span className="text-sm font-normal text-neutral-500 ml-2">⭐️自己ベスト</span>
            </h3>

            <div className="border border-neutral-200 mb-6">
                <table className="w-full text-sm">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="py-3 px-4 text-left font-bold text-neutral-600">氏名</th>
                            <th className="py-3 px-4 text-left font-bold text-neutral-600">順位</th>
                            <th className="py-3 px-4 text-left font-bold text-neutral-600">記録</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        <tr className="bg-yellow-50">
                            <td className="py-3 px-4">大濱 逞真 <span className="text-neutral-400">②</span></td>
                            <td className="py-3 px-4 font-bold text-daito-green">3位 🥉</td>
                            <td className="py-3 px-4 font-mono">1:00&#39;48&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">棟方 一楽 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4 font-bold">7位</td>
                            <td className="py-3 px-4 font-mono">1:00&#39;53&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">入濵 輝大 <span className="text-neutral-400">④</span></td>
                            <td className="py-3 px-4">19位</td>
                            <td className="py-3 px-4 font-mono">1:01&#39;39&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">松浦 輝仁 <span className="text-neutral-400">②</span></td>
                            <td className="py-3 px-4">25位</td>
                            <td className="py-3 px-4 font-mono">1:01&#39;42&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">庄司 瑞輝 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4">68位</td>
                            <td className="py-3 px-4 font-mono">1:02&#39;41&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">清水 雄翔 <span className="text-neutral-400">②</span></td>
                            <td className="py-3 px-4">81位</td>
                            <td className="py-3 px-4 font-mono">1:03&#39;00&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">増子 岳 <span className="text-neutral-400">①</span></td>
                            <td className="py-3 px-4">95位</td>
                            <td className="py-3 px-4 font-mono">1:03&#39;20&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">西村 悠誠 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4">103位</td>
                            <td className="py-3 px-4 font-mono">1:03&#39;35&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">菅﨑 大翔 <span className="text-neutral-400">①</span></td>
                            <td className="py-3 px-4">117位</td>
                            <td className="py-3 px-4 font-mono">1:04&#39;02&quot;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </NewsTemplate>
    );
}
