import NewsClient from './NewsClient';
import { getNewsData } from '@/lib/data';

export default async function NewsPage() {
  const newsData = await getNewsData();

  return <NewsClient articles={newsData.articles} />;
}
