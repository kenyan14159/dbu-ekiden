import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '自己ベストランキング | 大東文化大学陸上競技部男子長距離ブロック',
  description: '大東文化大学陸上競技部男子長距離ブロックの選手たちの種目別自己ベストランキングを掲載しています。',
  openGraph: {
    title: '自己ベストランキング | 大東文化大学陸上競技部男子長距離ブロック',
    description: '大東文化大学陸上競技部男子長距離ブロックの種目別自己ベストランキング',
  },
};

export default function RecordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
