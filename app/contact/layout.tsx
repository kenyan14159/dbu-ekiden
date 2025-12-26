import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 大東文化大学陸上競技部男子長距離ブロック',
  description: '大東文化大学陸上競技部男子長距離ブロックへのお問い合わせ・ご連絡はこちらから。',
  openGraph: {
    title: 'お問い合わせ | 大東文化大学陸上競技部男子長距離ブロック',
    description: '大東文化大学陸上競技部男子長距離ブロックへのお問い合わせ',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

