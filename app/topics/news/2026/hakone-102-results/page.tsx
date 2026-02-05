import { Metadata } from 'next';
import { getNewsArticleBySlug, getNewsArticleNavigation } from '@/lib/data';
import NewsTemplate from '@/app/topics/components/NewsTemplate';

export const metadata: Metadata = {
    title: '第102回東京箱根間往復大学駅伝競走 結果報告 | 大東文化大学陸上競技部',
    description: '第102回東京箱根間往復大学駅伝競走の結果報告です。',
};

export default async function NewsDetailPage() {
    const slug = 'hakone-102-results';
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
            {/* Summary Section */}
            <div className="text-center py-8 mb-8 border-b border-neutral-200">
                <div className="text-3xl md:text-4xl font-bold text-daito-green mb-4">総合 19位</div>
                <div className="flex justify-center gap-8 text-neutral-600 mb-2">
                    <span>往路 18位 (5:30:43)</span>
                    <span>復路 20位 (5:34:14)</span>
                </div>
                <div className="text-xl font-bold text-neutral-800">総合タイム 11:04:57</div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Outbound */}
                <div className="border border-neutral-200">
                    <div className="bg-daito-green text-white py-3 px-4 font-bold flex justify-between">
                        <span>往路</span>
                        <span>5:30:43 (18位)</span>
                    </div>
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-neutral-100">
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 w-12 font-bold text-neutral-500">1区</td>
                                <td className="py-3 px-4">大濱 逞真 <span className="text-neutral-400">(2年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:01:46</td>
                                <td className="py-3 px-4 text-right text-daito-green text-xs">区間15位</td>
                            </tr>
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 font-bold text-neutral-500">2区</td>
                                <td className="py-3 px-4">棟方 一楽 <span className="text-neutral-400">(3年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:09:29</td>
                                <td className="py-3 px-4 text-right text-daito-green text-xs">区間17位</td>
                            </tr>
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 font-bold text-neutral-500">3区</td>
                                <td className="py-3 px-4">菅﨑 大翔 <span className="text-neutral-400">(1年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:04:11</td>
                                <td className="py-3 px-4 text-right text-daito-green text-xs">区間20位</td>
                            </tr>
                            <tr className="bg-daito-green/5 hover:bg-daito-green/10">
                                <td className="py-3 px-4 font-bold text-daito-green">4区</td>
                                <td className="py-3 px-4 font-bold">松浦 輝仁 <span className="text-neutral-400 font-normal">(2年)</span></td>
                                <td className="py-3 px-4 text-right font-mono font-bold text-daito-green">1:01:48</td>
                                <td className="py-3 px-4 text-right text-daito-green text-xs font-bold">区間6位</td>
                            </tr>
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 font-bold text-neutral-500">5区</td>
                                <td className="py-3 px-4">上田 翔大 <span className="text-neutral-400">(1年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:13:29</td>
                                <td className="py-3 px-4 text-right text-daito-green text-xs">区間14位</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Inbound */}
                <div className="border border-neutral-200">
                    <div className="bg-daito-orange text-white py-3 px-4 font-bold flex justify-between">
                        <span>復路</span>
                        <span>5:34:14 (20位)</span>
                    </div>
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-neutral-100">
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 w-12 font-bold text-neutral-500">6区</td>
                                <td className="py-3 px-4">戸田 優真 <span className="text-neutral-400">(4年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:01:15</td>
                                <td className="py-3 px-4 text-right text-daito-orange text-xs">区間20位</td>
                            </tr>
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 font-bold text-neutral-500">7区</td>
                                <td className="py-3 px-4">中澤 真大 <span className="text-neutral-400">(2年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:04:51</td>
                                <td className="py-3 px-4 text-right text-daito-orange text-xs">区間18位</td>
                            </tr>
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 font-bold text-neutral-500">8区</td>
                                <td className="py-3 px-4">照井 海翔 <span className="text-neutral-400">(4年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:06:44</td>
                                <td className="py-3 px-4 text-right text-daito-orange text-xs">区間17位</td>
                            </tr>
                            <tr className="bg-daito-orange/5 hover:bg-daito-orange/10">
                                <td className="py-3 px-4 font-bold text-daito-orange">9区</td>
                                <td className="py-3 px-4 font-bold">入濵 輝大 <span className="text-neutral-400 font-normal">(4年)</span></td>
                                <td className="py-3 px-4 text-right font-mono font-bold text-daito-orange">1:09:28</td>
                                <td className="py-3 px-4 text-right text-daito-orange text-xs font-bold">区間11位</td>
                            </tr>
                            <tr className="hover:bg-neutral-50">
                                <td className="py-3 px-4 font-bold text-neutral-500">10区</td>
                                <td className="py-3 px-4">赤星 龍舞 <span className="text-neutral-400">(4年)</span></td>
                                <td className="py-3 px-4 text-right font-mono">1:11:56</td>
                                <td className="py-3 px-4 text-right text-daito-orange text-xs">区間19位</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Message */}
            <div className="py-6 border-t border-neutral-200 text-center text-neutral-700">
                2日間、温かいご声援本当にありがとうございました！<br />
                この悔しさを糧に、来年は必ずリベンジします。
            </div>
        </NewsTemplate>
    );
}
