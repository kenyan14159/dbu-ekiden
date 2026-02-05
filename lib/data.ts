/**
 * データフェッチユーティリティ
 * サーバーコンポーネントで使用するためのデータ取得関数
 */

import fs from 'fs';
import path from 'path';
import type { TopicItem, NewsMetadata } from './types';

// 型を再エクスポート
export type { NewsMetadata, NewsArticle } from './types';

/**
 * ニュース記事のメタデータを取得
 */
export async function getNewsMetadata(): Promise<NewsMetadata> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news', 'news-2026.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const data: NewsMetadata = JSON.parse(fileContents);

    // 日付でソート（新しい順）
    if (data.articles && Array.isArray(data.articles)) {
      data.articles.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return data;
  } catch (error) {
    console.error('Failed to load news metadata:', error);
    return { articles: [] };
  }
}

/**
 * スラッグからニュース記事を取得
 */
import { NewsArticleMeta } from './types';

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticleMeta | null> {
  const metadata = await getNewsMetadata();
  return metadata.articles.find((article) => article.slug === slug) || null;
}

/**
 * ニュース記事のナビゲーション（前後の記事）を取得
 */
export async function getNewsArticleNavigation(slug: string) {
  const metadata = await getNewsMetadata();
  const currentIndex = metadata.articles.findIndex((article) => article.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  // 配列は新しい順（日付降順）にソートされている前提
  // next（新しい記事）は index - 1
  // previous（古い記事）は index + 1
  const next = currentIndex > 0 ? metadata.articles[currentIndex - 1] : null;
  const previous = currentIndex < metadata.articles.length - 1 ? metadata.articles[currentIndex + 1] : null;

  return { previous, next };
}



/**
 * 最新トピックスを取得（ニュースとリザルトを統合）
 */
export async function getLatestTopics(limit: number = 3): Promise<TopicItem[]> {
  try {
    const newsMetadata = await getNewsMetadata();

    const toDisplayDate = (date: string) => date.replace(/-/g, '.');
    const toSortKey = (date: string) => {
      const time = Date.parse(date);
      return Number.isNaN(time) ? 0 : time;
    };

    const newsItems = newsMetadata.articles.map((article) => ({
      id: `news-${article.id}`,
      type: 'NEWS' as const,
      date: toDisplayDate(article.date),
      title: article.title,
      link: `/topics/news/2026/${article.slug}`,
      excerpt: article.title,
      image: article.image,
      sortKey: toSortKey(article.date),
    }));

    const combined: TopicItem[] = [...newsItems]
      .sort((a, b) => b.sortKey - a.sortKey)
      .slice(0, limit)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ sortKey, ...item }) => item);

    return combined;
  } catch (error) {
    console.error('Failed to load latest topics:', error);
    return [];
  }
}
