import { Metadata } from 'next';
import { getNewsArticleBySlug, getNewsArticleNavigation } from '@/lib/data';
import NewsTemplate from '@/app/topics/components/NewsTemplate';

export const metadata: Metadata = {
  title: '冬季強化合宿を実施 | 大東文化大学陸上競技部',
  description: '冬季強化合宿を実施',
};

export default async function NewsDetailPage() {
  const article = await getNewsArticleBySlug('winter-camp-2025');
  const navigation = await getNewsArticleNavigation('winter-camp-2025');

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
          11月25日〜12月3日まで、千葉県富津市で合宿を行いました。
          今回もいつもお世話になっている 味覚の宿 志ら井様 に宿泊させていただきました。今回もたくさんサポートしていただき、本当にありがとうございました❗️
        </p>
        <p className="text-neutral-700 leading-relaxed mb-4">
          チーム全体として、とても内容の濃い合宿にすることができました❗️
          箱根駅伝まで一ヶ月切りました。感染症対策をしっかりしながら、本番で100％以上の力を出せるよう、ここからさらに頑張ります🔥
        </p>
      </div>
    </NewsTemplate>
  );
}
