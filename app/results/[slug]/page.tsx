import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Script from 'next/script';
import ResultDetailView from './ResultDetailView';
import { generateSportsEventSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

interface Result {
    event: string;
    name: string;
    time: string;
    rank: string;
    note?: string;
}

interface TeamResult {
    rank: string;
    totalTime: string;
    outboundRank?: string;
    outboundTime?: string;
    inboundRank?: string;
    inboundTime?: string;
}

interface ResultEvent {
    id: string;
    slug: string;
    date: string;
    title: string;
    venue: string;
    results: Result[];
    teamResult?: TeamResult;
    description?: string;
}

interface ResultsData {
    year: number;
    events: ResultEvent[];
}

async function getResultsData(): Promise<ResultsData> {
    const years = [2026, 2025]; // 新しい年度から順に読み込む
    const allEvents: ResultEvent[] = [];
    
    for (const year of years) {
        try {
            const filePath = path.join(process.cwd(), 'public', 'data', 'results', `results-${year}.json`);
            const fileContents = await fs.promises.readFile(filePath, 'utf8');
            const data = JSON.parse(fileContents) as ResultsData;
            allEvents.push(...data.events);
        } catch (error) {
            // ファイルが存在しない場合はスキップ
            console.warn(`Failed to load results-${year}.json:`, error);
        }
    }
    
    // 日付でソート（新しい順）
    allEvents.sort((a: ResultEvent, b: ResultEvent) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return { year: Math.max(...years), events: allEvents };
}

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

const BASE_URL = 'https://daito-ekiden.com';

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

    const description = event.teamResult 
        ? `${event.title} - ${event.venue} - チーム成績: ${event.teamResult.rank}位（${event.teamResult.totalTime}）`
        : `${event.title} - ${event.venue}`;

    return {
        title: `${event.title} | 大東文化大学陸上競技部`,
        description: description,
        openGraph: {
            title: event.title,
            description: description,
            images: [
                {
                    url: `${BASE_URL}/images/ogp/default-ogp.jpg`,
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
            images: [`${BASE_URL}/images/ogp/default-ogp.jpg`],
        },
    };
}

export default async function ResultDetailPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    const data = await getResultsData();
    const event = data.events.find((e) => e.slug === slug) || null;

    if (!event) {
        return <ResultDetailView event={null} />;
    }

    const sportsEventSchema = generateSportsEventSchema({
        name: event.title,
        startDate: event.date,
        location: event.venue,
        url: `/results/${event.slug}/`,
        description: event.teamResult 
            ? `チーム成績: ${event.teamResult.rank}位（${event.teamResult.totalTime}）`
            : undefined,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'ホーム', url: '/' },
        { name: 'リザルト', url: '/results/' },
        { name: event.title, url: `/results/${event.slug}/` },
    ]);

    return (
        <>
            <Script
                id="sports-event-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ResultDetailView event={event} />
        </>
    );
}
