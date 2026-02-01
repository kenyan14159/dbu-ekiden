import { Metadata } from 'next';
import { getNewsArticleBySlug, getNewsArticleNavigation } from '@/lib/data';
import NewsTemplate from '@/app/topics/components/NewsTemplate';

export const metadata: Metadata = {
  title: '第102回箱根駅伝壮行会を開催 | 大東文化大学陸上競技部',
  description: '第102回箱根駅伝壮行会を開催',
};

export default async function NewsDetailPage() {
  const article = await getNewsArticleBySlug('hakone-102-soukoukai');
  const navigation = await getNewsArticleNavigation('hakone-102-soukoukai');

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
          本日、大東文化大学東松山キャンパスにて、共同記者会見が行われました。
          お越しくださった皆様、ありがとうございました。
        </p>
        <p className="text-neutral-700 leading-relaxed mb-4">
          今年度のスローガンである「歴史への礎〜あの場所でやり返す〜」をこの1年間掲げ続けてきました。
          昨年度の悔しさを晴らす為に、いつも応援してくださる多くの方の為に、そしてシード権を獲得する為に、第102回箱根駅伝までの残りの時間最大限に努力して参ります！
        </p>
        <p className="text-neutral-700 leading-relaxed mb-4">
          大東文化大学の応援、よろしくお願いいたします✨
        </p>
      </div>
    </NewsTemplate>
  );
}
