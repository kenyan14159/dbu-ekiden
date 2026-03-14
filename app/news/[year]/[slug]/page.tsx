import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getNewsArticleBySlug, getNewsArticleNavigation, getNewsMetadata } from '@/lib/data';
import { generateArticleSchema } from '@/lib/structured-data';
import NewsTemplate from '@/app/components/news/NewsTemplate';
import NewsImageGallery from '@/app/components/news/NewsImageGallery';

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const OFFICIAL_STORE_SLUG = 'official-store-smartphone-case-2026';
const OFFICIAL_STORE_URL = 'https://daito-trackfield-men.my-megaphone.jp/item/purchase';

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
    'futtsu-camp-started-2026': `2月9日から富津にて合宿がスタートしました。

今回の合宿には麗澤大学から数名が参加し、トラックシーズンに向けて、互いに切磋琢磨しながら練習に励んでいます。

2月10日`,

    'futtsu-camp-ended-2026': `2月9日から富津にて行われた合宿が本日無事終了いたしました。

まだまだ強化期間は続きますが、春先のレースでそれぞれが結果を残せるように精進して参ります。

これからも応援よろしくお願いします。

2月14日`,

    'mixed-ekiden-6-2026-results': `本日、第6回全国大学対校男女混合駅伝に出場し、総合2位でゴールしました。

＜総合＞ 🥈

第2位 59分43秒 ※シード権獲得！！！

＜個人＞

1区（3k） 棟方一楽③ 8'09 区間3位

2区（2k） 相葉茉奈③ 6'01 区間1位 ※区間新記録

3区（5k） 松浦輝仁② 14'03 区間3位

4区（3k） 平尾暁絵③ 9'47 区間7位

5区（2k） 上田翔大① 5'27 区間4位

6区（5k） 蔦野萌々香③ 16'16 区間3位

たくさんのご声援ありがとうございました！

2月15日`,

    'official-store-smartphone-case-2026': `大東文化大学陸上競技部男子長距離のオフィシャルオンラインストアにて、本日2月26日（木）より大東文化大学男子陸上競技部オフィシャルスマホケースが発売開始しました。

Phone 16 Pro Maxをはじめ、iPhone X／XSまで各種サイズに対応しています。

下記のURLからグッズ販売サイトにアクセスできます。

https://daito-trackfield-men.my-megaphone.jp/item/purchase

応援グッズを身に着けて、大東文化大学へご声援のほどよろしくお願いいたします！

2月26日`,

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

function getNewsImages(slug: string): string[] {
  const imageMap: Record<string, string[]> = {
    'futtsu-camp-started-2026': [
      '/images/news/2026/02-10_1.jpg',
      '/images/news/2026/02-10_2.jpg',
    ],
    'futtsu-camp-ended-2026': [
      '/images/news/2026/02-14_.jpg',
    ],
    'mixed-ekiden-6-2026-results': [
      '/images/news/2026/02-15_1.jpg',
      '/images/news/2026/02-15_2.jpg',
      '/images/news/2026/02-15_3.jpg',
      '/images/news/2026/02-15_4.jpg',
      '/images/news/2026/02-15_5.jpg',
    ],
    'official-store-smartphone-case-2026': [
      '/images/news/2026/02-26_1.jpg',
      '/images/news/2026/02-26_2.jpg',
      '/images/news/2026/02-26_3.jpg',
    ],
  };

  return imageMap[slug] || [];
}

function renderParagraphWithLinks(paragraph: string) {
  const segments = paragraph.split(URL_REGEX);

  return segments.map((segment, index) => {
    if (/^https?:\/\/[^\s]+$/.test(segment)) {
      return (
        <a
          key={`url-${segment}-${index}`}
          href={segment}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all font-medium text-daito-green underline underline-offset-2 hover:text-daito-orange"
        >
          {segment}
        </a>
      );
    }

    return <span key={`text-${index}`}>{segment}</span>;
  });
}

export default async function NewsDetailPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const article = await getNewsArticleBySlug(slug);
  const navigation = await getNewsArticleNavigation(slug);

  if (!article) {
    notFound();
  }

  const content = getNewsContent(slug);
  const articleImages = getNewsImages(slug);
  const isOfficialStoreArticle = slug === OFFICIAL_STORE_SLUG;

  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.title,
    datePublished: article.date,
    image: article.image,
    url: `/news/2026/${slug}`,
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
        previousArticle={navigation.previous ? { slug: navigation.previous.slug, title: navigation.previous.title } : null}
        nextArticle={navigation.next ? { slug: navigation.next.slug, title: navigation.next.title } : null}
      >
        <div className="space-y-8">
          <div className="prose prose-lg max-w-none">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-neutral-700 leading-relaxed mb-4">
                {renderParagraphWithLinks(paragraph)}
              </p>
            ))}
          </div>

          {isOfficialStoreArticle && (
            <div className="not-prose rounded-xl border border-daito-green/20 bg-daito-green/5 p-4 md:p-5">
              <p className="text-sm text-neutral-600 mb-3">オフィシャルオンラインストアへのアクセスはこちら</p>
              <a
                href={OFFICIAL_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-daito-green px-4 py-2.5 text-sm font-semibold !text-white no-underline transition-colors hover:bg-daito-orange hover:!text-white"
              >
                オンラインストアを開く
                <span aria-hidden="true" className="!text-white">↗</span>
              </a>
            </div>
          )}

          <div className="not-prose">
            <NewsImageGallery images={articleImages} title={article.title} />
          </div>
        </div>
      </NewsTemplate>
    </>
  );
}
