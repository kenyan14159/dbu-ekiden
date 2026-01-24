import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '応援してくださる皆様へ | 大東文化大学陸上競技部男子長距離ブロック',
  description: '監督からのメッセージとチームの想いをお届けします。',
  openGraph: {
    title: '応援してくださる皆様へ | 大東文化大学陸上競技部男子長距離ブロック',
    description: '監督からのメッセージとチームの想いをお届けします。',
  },
};

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
