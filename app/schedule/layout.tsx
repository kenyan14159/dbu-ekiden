import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '年間スケジュール | 大東文化大学陸上競技部男子長距離ブロック',
  description: '大東文化大学陸上競技部男子長距離ブロックの年間スケジュール・大会予定を掲載しています。',
  openGraph: {
    title: '年間スケジュール | 大東文化大学陸上競技部男子長距離ブロック',
    description: '大東文化大学陸上競技部男子長距離ブロックの年間スケジュール・大会予定',
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

