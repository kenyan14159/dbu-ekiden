import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import ResultDetailView from './ResultDetailView';
import { generateSportsEventSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import { getResultsData } from '@/lib/data';

export async function generateStaticParams() {
    const data = await getResultsData();
    return data.events.map((event) => ({
        slug: event.slug,
    }));
}

// Next.js 15/16 uses Promise for params in dynamic routes
type Props = {
    params: Promise<{ slug: string }>;
}

const BASE_URL = 'https://dbu-ekiden.com';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { slug } = params;
    
    const data = await getResultsData();
    const event = data.events.find((e) => e.slug === slug);

    if (!event) {
        return {
            title: 'リザルトが見つかりません | 大東文化大学陸上競技部',
        };
    }

    const venue = event.venue ?? event.location ?? '';
    const description = event.teamResult 
        ? `${event.title} - ${venue} - チーム成績: ${event.teamResult.rank}位（${event.teamResult.totalTime}）`
        : `${event.title} - ${venue}`;

    return {
        title: `${event.title} | 大東文化大学陸上競技部`,
        description: description,
        openGraph: {
            title: event.title,
            description: description,
            images: [
                {
                    url: event.image ? (event.image.startsWith('http') ? event.image : `${BASE_URL}${event.image}`) : `${BASE_URL}/images/ogp/default-ogp.jpg`,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: event.title,
            description: description,
            images: [event.image ? (event.image.startsWith('http') ? event.image : `${BASE_URL}${event.image}`) : `${BASE_URL}/images/ogp/default-ogp.jpg`],
        },
    };
}

export default async function ResultDetailPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    const data = await getResultsData();
    const event = data.events.find((e) => e.slug === slug) || null;
    const currentIndex = data.results.findIndex((r) => r.slug === slug);
    const previousEvent = currentIndex > 0 ? data.results[currentIndex - 1] : null;
    const nextEvent = currentIndex >= 0 && currentIndex < data.results.length - 1
        ? data.results[currentIndex + 1]
        : null;

    if (!result) {
        notFound();
    }

    // 新しい構造にリダイレクト
    redirect(`/topics/results/2026/${slug}`);
}
