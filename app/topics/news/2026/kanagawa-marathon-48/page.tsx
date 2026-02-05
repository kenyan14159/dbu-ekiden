import { Metadata } from 'next';
import { getNewsArticleBySlug, getNewsArticleNavigation } from '@/lib/data';
import NewsTemplate from '@/app/topics/components/NewsTemplate';

export const metadata: Metadata = {
    title: '第48回神奈川マラソン 結果報告 | 大東文化大学陸上競技部',
    description: '第48回神奈川マラソンの結果報告です。',
};

export default async function NewsDetailPage() {
    const slug = 'kanagawa-marathon-48';
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
                本日、日清オイリオグループ横浜磯子事業場にて行われた第48回神奈川マラソンに出場しました！<br />
                自己ベストを更新する選手が多く、収穫のあるレースとなりました。ここからまた気を引き締め、練習に励んでいきます！<br />
                本日はたくさんのご声援ありがとうございました！
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
                        <tr>
                            <td className="py-3 px-4">日髙 龍之助 <span className="text-neutral-400">①</span></td>
                            <td className="py-3 px-4">42位</td>
                            <td className="py-3 px-4 font-mono">1:03&#39;50&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">和田 麻里 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4">48位</td>
                            <td className="py-3 px-4 font-mono">1:03&#39;55&quot;</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">平田 碧 <span className="text-neutral-400">②</span></td>
                            <td className="py-3 px-4">55位</td>
                            <td className="py-3 px-4 font-mono">1:04&#39;07&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">石川 郁弥 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4">59位</td>
                            <td className="py-3 px-4 font-mono">1:04&#39;10&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">早乙女 良真 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4">63位</td>
                            <td className="py-3 px-4 font-mono">1:04&#39;13&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">沖野 凌我 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4">73位</td>
                            <td className="py-3 px-4 font-mono">1:04&#39;27&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">中村 一誠 <span className="text-neutral-400">①</span></td>
                            <td className="py-3 px-4">81位</td>
                            <td className="py-3 px-4 font-mono">1:04&#39;57&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">宮倉 騎士 <span className="text-neutral-400">③</span></td>
                            <td className="py-3 px-4">97位</td>
                            <td className="py-3 px-4 font-mono">1:05&#39;10&quot;</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">大澤 琉欧 <span className="text-neutral-400">②</span></td>
                            <td className="py-3 px-4">101位</td>
                            <td className="py-3 px-4 font-mono">1:05&#39;12&quot; ⭐️</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">岡村 将英 <span className="text-neutral-400">①</span></td>
                            <td className="py-3 px-4">136位</td>
                            <td className="py-3 px-4 font-mono">1:06&#39;10&quot; ⭐️</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </NewsTemplate>
    );
}
