import { redirect } from 'next/navigation';
import { getResultsMetadata } from '@/lib/data';

export async function generateStaticParams() {
    const data = await getResultsMetadata();
    return data.articles.map((article) => ({
        slug: article.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
}

export default async function ResultDetailPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    // 新しい構造にリダイレクト
    redirect(`/topics/results/2026/${slug}`);
}
