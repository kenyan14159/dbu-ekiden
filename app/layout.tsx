import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import CustomCursor from '@/app/components/ui/CustomCursor';
import OpeningLoader from '@/app/components/layout/OpeningLoader';

const notoSansJP = Noto_Sans_JP({
    subsets: ['latin'],
    variable: '--font-noto-sans-jp',
    display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-noto-serif-jp',
    display: 'swap',
});

export const metadata: Metadata = {
    title: '大東文化大学陸上競技部男子長距離ブロック',
    description: '大東文化大学陸上競技部男子長距離ブロック公式サイト。箱根駅伝、全日本大学駅伝、出雲駅伝などの情報を発信しています。',
    keywords: ['大東文化大学', '駅伝', '箱根駅伝', '陸上競技', '長距離'],
    icons: {
        icon: '/images/daito-ekiden-logo.png',
        apple: '/images/daito-ekiden-logo.png',
    },
    openGraph: {
        title: '大東文化大学陸上競技部男子長距離ブロック',
        description: '大東文化大学陸上競技部男子長距離ブロック公式サイト',
        type: 'website',
        locale: 'ja_JP',
        images: [
            {
                url: '/images/ogp/default-ogp.jpg',
                width: 1200,
                height: 630,
                alt: '大東文化大学陸上競技部男子長距離ブロック',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '大東文化大学陸上競技部男子長距離ブロック',
        description: '大東文化大学陸上競技部男子長距離ブロック公式サイト',
        images: ['/images/ogp/default-ogp.jpg'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable}`}>
            <body className="font-sans antialiased">
                <div className="film-grain" />
                <OpeningLoader />
                <CustomCursor />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
