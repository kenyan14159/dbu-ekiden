import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サポーターの皆様 | 大東文化大学陸上競技部男子長距離ブロック',
  description: '日頃のご支援に感謝し、サポーター各社をご紹介します。',
  openGraph: {
    title: 'サポーターの皆様 | 大東文化大学陸上競技部男子長距離ブロック',
    description: '日頃のご支援に感謝し、サポーター各社をご紹介します。',
  },
};

export default function SupportersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
