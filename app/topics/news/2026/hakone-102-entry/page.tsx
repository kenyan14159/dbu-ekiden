import { Metadata } from 'next';
import { getNewsArticleBySlug, getNewsArticleNavigation } from '@/lib/data';
import NewsTemplate from '@/app/topics/components/NewsTemplate';

export const metadata: Metadata = {
  title: '第102回箱根駅伝エントリーメンバー（16名）発表！ | 大東文化大学陸上競技部',
  description: '第102回箱根駅伝エントリーメンバー（16名）発表！',
};

export default async function NewsDetailPage() {
  const article = await getNewsArticleBySlug('hakone-102-entry');
  const navigation = await getNewsArticleNavigation('hakone-102-entry');

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
      <div className="prose prose-lg max-w-none">
        <p className="text-neutral-700 leading-relaxed mb-4">
          第102回箱根駅伝まであと18日です！
          本日は大東文化大学です！
        </p>
        <p className="text-neutral-700 leading-relaxed mb-4 font-bold">
          #大東文化大学 チームエントリーメンバー
        </p>
        <div className="text-neutral-700 leading-relaxed mb-4 space-y-1">
          <p>#赤星龍舞 4年</p>
          <p>#入濵輝大 4年</p>
          <p>#照井海翔 4年</p>
          <p>#戸田優真 4年</p>
          <p>#石川郁弥 3年</p>
          <p>#庄司瑞輝 3年</p>
          <p>#棟方一楽 3年</p>
          <p>#エヴァンスキプロップ 2年</p>
          <p>#大濱逞真 2年</p>
          <p>#清水雄翔 2年</p>
          <p>#中澤真大 2年</p>
          <p>#松浦輝仁 2年</p>
          <p>#上田翔大 1年</p>
          <p>#菅﨑大翔 1年</p>
          <p>#鈴木要 1年</p>
          <p>#日髙龍之助 1年</p>
        </div>
      </div>
    </NewsTemplate>
  );
}
