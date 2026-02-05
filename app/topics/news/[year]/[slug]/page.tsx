import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getNewsArticleBySlug, getNewsMetadata } from '@/lib/data';
import { generateArticleSchema } from '@/lib/structured-data';
import NewsTemplate from '@/app/topics/components/NewsTemplate';

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateStaticParams() {
  const data = await getNewsMetadata();
  return data.articles.map((article) => ({
    year: '2026',
    slug: article.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: '記事が見つかりません | 大東文化大学陸上競技部',
    };
  }

  const title = `${article.title} | 大東文化大学陸上競技部`;
  const description = article.title;
  const image = article.image || '/images/default-ogp.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.date,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// ニュース記事のコンテンツを取得する関数
function getNewsContent(slug: string): string {
  const contentMap: Record<string, string> = {
    'hakone-102-soukoukai': `本日、大東文化大学東松山キャンパスにて、共同記者会見が行われました。
お越しくださった皆様、ありがとうございました。

今年度のスローガンである「歴史への礎〜あの場所でやり返す〜」をこの1年間掲げ続けてきました。
昨年度の悔しさを晴らす為に、いつも応援してくださる多くの方の為に、そしてシード権を獲得する為に、第102回箱根駅伝までの残りの時間最大限に努力して参ります！

大東文化大学の応援、よろしくお願いいたします✨`,

    'hakone-102-entry': `第102回箱根駅伝まであと18日です！
本日は大東文化大学です！

#大東文化大学 チームエントリーメンバー

#赤星龍舞 4年
#入濵輝大 4年
#照井海翔 4年
#戸田優真 4年
#石川郁弥 3年
#庄司瑞輝 3年
#棟方一楽 3年
#エヴァンスキプロップ 2年
#大濱逞真 2年
#清水雄翔 2年
#中澤真大 2年
#松浦輝仁 2年
#上田翔大 1年
#菅﨑大翔 1年
#鈴木要 1年
#日髙龍之助 1年`,

    'winter-camp-2025': `11月25日〜12月3日まで、千葉県富津市で合宿を行いました。
今回もいつもお世話になっている 味覚の宿 志ら井様 に宿泊させていただきました。今回もたくさんサポートしていただき、本当にありがとうございました❗️

チーム全体として、とても内容の濃い合宿にすることができました❗️
箱根駅伝まで一ヶ月切りました。感染症対策をしっかりしながら、本番で100％以上の力を出せるよう、ここからさらに頑張ります🔥`,
  };

  return contentMap[slug] || '記事の内容が準備中です。';
}

export default async function NewsDetailPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const content = getNewsContent(slug);

  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.title,
    datePublished: article.date,
    image: article.image,
    url: `/topics/news/2026/${slug}`,
  });

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <NewsTemplate
        date={article.date}
        title={article.title}
        colorTheme="green"
      >
        <div className="prose prose-lg max-w-none">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-neutral-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </NewsTemplate>
    </>
  );
}
