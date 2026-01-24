import { redirect } from 'next/navigation';
import { getNewsMetadata } from '@/lib/data';

export async function generateStaticParams() {
    const data = await getNewsMetadata();
    return data.articles.map((article) => ({
        slug: article.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    // 新しい構造にリダイレクト
    redirect(`/topics/news/2026/${slug}`);
}
