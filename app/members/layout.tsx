import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メンバー紹介 | 大東文化大学陸上競技部男子長距離ブロック',
  description: '大東文化大学陸上競技部男子長距離ブロックの選手・スタッフを紹介しています。',
  openGraph: {
    title: 'メンバー紹介 | 大東文化大学陸上競技部男子長距離ブロック',
    description: '大東文化大学陸上競技部男子長距離ブロックの選手・スタッフ紹介',
  },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

