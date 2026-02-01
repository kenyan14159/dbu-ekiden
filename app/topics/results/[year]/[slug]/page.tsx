import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getResultArticleBySlug, getResultDetailBySlug, getResultsMetadata } from '@/lib/data';
import { generateSportsEventSchema } from '@/lib/structured-data';
import ResultTemplate from '@/app/topics/components/ResultTemplate';

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateStaticParams() {
  const data = await getResultsMetadata();
  return data.articles.map((article) => ({
    year: '2026',
    slug: article.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const article = await getResultArticleBySlug(slug);

  if (!article) {
    return {
      title: 'リザルトが見つかりません | 大東文化大学陸上競技部',
    };
  }

  const title = `${article.title} | 大東文化大学陸上競技部`;
  const description = article.title;
  const image = article.image || '/images/ogp/default-ogp.jpg';

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

export default async function ResultDetailPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const article = await getResultArticleBySlug(slug);
  const detail = await getResultDetailBySlug(slug);

  if (!article) {
    notFound();
  }

  // 詳細データがある場合はそれを使用、ない場合は基本データを使用
  const event = detail || {
    id: article.id.toString(),
    slug: article.slug,
    date: article.date,
    title: article.title,
    venue: '',
    results: [],
    teamResult: undefined,
  };

  const eventSchema = generateSportsEventSchema({
    name: event.title,
    startDate: event.date,
    location: event.venue || (event as any).location || '会場情報なし',
    url: `/topics/results/2026/${slug}`,
    description: event.description,
  });

  return (
    <>
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <ResultTemplate
        date={event.date}
      title={event.title}
      location={event.venue || event.location || '会場情報なし'}
      image={article.image || (event as any).image}
      teamResult={event.teamResult ? {
        rank: event.teamResult.rank,
        totalTime: event.teamResult.totalTime,
        outwardRank: event.teamResult.outboundRank,
        outwardTime: event.teamResult.outboundTime,
        returnRank: event.teamResult.inboundRank,
        returnTime: event.teamResult.inboundTime,
      } : undefined}
    >
      {event.description && (
        <div className="prose prose-lg max-w-none mb-8">
          {event.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-neutral-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {event.results && event.results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">個人成績</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-4 py-3 text-left text-sm font-bold text-neutral-700 border-b border-neutral-200">区間</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-neutral-700 border-b border-neutral-200">選手名</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-neutral-700 border-b border-neutral-200">タイム</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-neutral-700 border-b border-neutral-200">区間順位</th>
                </tr>
              </thead>
              <tbody>
                {event.results.map((result, index) => (
                  <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3 text-sm text-neutral-900">{result.event || `区間${index + 1}`}</td>
                    <td className="px-4 py-3 text-sm font-medium text-neutral-900">{result.name}</td>
                    <td className="px-4 py-3 text-sm font-mono text-neutral-900">{result.time}</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">{result.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </ResultTemplate>
    </>
  );
}
