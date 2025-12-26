import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'リザルト | 大東文化大学陸上競技部男子長距離ブロック',
  description: '大東文化大学陸上競技部男子長距離ブロックの大会結果・リザルトを掲載しています。',
  openGraph: {
    title: 'リザルト | 大東文化大学陸上競技部男子長距離ブロック',
    description: '大東文化大学陸上競技部男子長距離ブロックの大会結果・リザルト',
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

