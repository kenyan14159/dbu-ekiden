import NewsClient from './NewsClient';
import { getNewsMetadata } from '@/lib/data';

export default async function NewsPage() {
  const newsMetadata = await getNewsMetadata();

  return <NewsClient articles={newsMetadata.articles} />;
}
