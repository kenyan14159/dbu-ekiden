import NewsClient from './NewsClient';
import { getNewsMetadata } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEWS | 大東文化大学陸上競技部男子長距離ブロック',
  description: '大東文化大学陸上競技部男子長距離ブロックの最新ニュースをご覧いただけます。試合結果や活動報告などを随時更新しています。',
};

export default async function NewsPage() {
  const newsMetadata = await getNewsMetadata();

  return <NewsClient newsMetadata={newsMetadata} />;
}
