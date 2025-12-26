import { Metadata } from 'next';
import Script from 'next/script';
import NewsArticleView from './NewsArticleView';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import { getNewsData } from '@/lib/data';

export async function generateStaticParams() {
    const data = await getNewsData();
    return data.articles.map((article) => ({
        slug: article.slug,
    }));
}

// Next.js 15/16 uses Promise for params in dynamic routes
type Props = {
    params: Promise<{ slug: string }>;
}

const BASE_URL = 'https://daito-ekiden.com';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { slug } = params;
    
    const data = await getNewsData();
    const article = data.articles.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: '記事が見つかりません | 大東文化大学陸上競技部',
        };
    }

    const ogImageUrl = article.image 
        ? `${BASE_URL}${article.image}` 
        : `${BASE_URL}/images/ogp/default-ogp.jpg`;

    return {
        title: `${article.title} | 大東文化大学陸上競技部`,
        description: article.excerpt,
        keywords: ['大東文化大学', '駅伝', article.category, article.title],
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            locale: 'ja_JP',
            publishedTime: article.date,
            modifiedTime: article.date,
            authors: ['大東文化大学陸上競技部'],
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [ogImageUrl],
        },
        alternates: {
            canonical: `${BASE_URL}/news/${slug}/`,
        },
    };
}

export default async function NewsDetailPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    const data = await getNewsData();
    const article = data.articles.find((a) => a.slug === slug) || null;

    if (!article) {
        return <NewsArticleView article={null} />;
    }

    const articleSchema = generateArticleSchema({
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.dateModified || article.date,
        image: article.image,
        url: `/news/${article.slug}/`,
        author: article.author,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'ホーム', url: '/' },
        { name: 'ニュース', url: '/news/' },
        { name: article.title, url: `/news/${article.slug}/` },
    ]);

    return (
        <>
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <NewsArticleView article={article} />
        </>
    );
}
