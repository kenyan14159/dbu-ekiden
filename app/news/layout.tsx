import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ニュース | 大東文化大学陸上競技部男子長距離ブロック',
  description: '大東文化大学陸上競技部男子長距離ブロックの最新ニュース・お知らせを掲載しています。',
  openGraph: {
    title: 'ニュース | 大東文化大学陸上競技部男子長距離ブロック',
    description: '大東文化大学陸上競技部男子長距離ブロックの最新ニュース・お知らせ',
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

