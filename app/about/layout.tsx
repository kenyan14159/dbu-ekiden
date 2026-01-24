import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '本サイトについて | 大東文化大学陸上競技部男子長距離ブロック',
  description: '本サイトの目的、プライバシーポリシー、利用規約についてご案内します。',
  openGraph: {
    title: '本サイトについて | 大東文化大学陸上競技部男子長距離ブロック',
    description: '本サイトの目的、プライバシーポリシー、利用規約についてご案内します。',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
