import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '限定コンテンツ | 大東文化大学陸上競技部男子長距離ブロック',
  description: '関係者限定のページです。閲覧には認証が必要です。',
  openGraph: {
    title: '限定コンテンツ | 大東文化大学陸上競技部男子長距離ブロック',
    description: '関係者限定のページです。閲覧には認証が必要です。',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ExclusiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
