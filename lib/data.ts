/**
 * データフェッチユーティリティ
 * サーバーコンポーネントで使用するためのデータ取得関数
 */

import fs from 'fs';
import path from 'path';
import type { TopicItem } from './types';

// 簡略化されたメタデータ型
export interface NewsMetadata {
  articles: {
    slug: string;
    id: number | string;
    title: string;
    date: string;
    image: string;
  }[];
}

export interface ResultMetadata {
  articles: {
    slug: string;
    id: number;
    title: string;
    date: string;
    image: string;
  }[];
}

/**
 * ニュース記事のメタデータを取得
 */
export async function getNewsMetadata(): Promise<NewsMetadata> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news', 'news-2026.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as NewsMetadata;
    
    // 日付でソート（新しい順）
    data.articles.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return data;
  } catch (error) {
    console.error('Failed to load news metadata:', error);
    return { articles: [] };
  }
}

/**
 * リザルトのメタデータを取得
 */
export async function getResultsMetadata(): Promise<ResultMetadata> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'results', 'results-2026.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as ResultMetadata;
    
    // 日付でソート（新しい順）
    data.articles.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return data;
  } catch (error) {
    console.error('Failed to load results metadata:', error);
    return { articles: [] };
  }
}

/**
 * 最新トピックスを取得（ニュースとリザルトを統合）
 */
export async function getLatestTopics(limit: number = 3): Promise<TopicItem[]> {
  try {
    const [newsMetadata, resultsMetadata] = await Promise.all([
      getNewsMetadata(),
      getResultsMetadata(),
    ]);

    const toDisplayDate = (date: string) => date.replace(/-/g, '.');
    const toSortKey = (date: string) => {
      const time = Date.parse(date);
      return Number.isNaN(time) ? 0 : time;
    };

    const combined = [
      ...newsMetadata.articles.map((article) => ({
        id: `news-${article.id}`,
        type: 'NEWS' as const,
        date: toDisplayDate(article.date),
        title: article.title,
        link: `/topics/news/2026/${article.slug}`,
        excerpt: article.title,
        sortKey: toSortKey(article.date),
      })),
      ...resultsMetadata.articles.map((result) => ({
        id: `result-${result.id}`,
        type: 'RESULT' as const,
        date: toDisplayDate(result.date),
        title: result.title,
        link: `/topics/results/2026/${result.slug}`,
        excerpt: result.title,
        sortKey: toSortKey(result.date),
      })),
    ]
      .sort((a, b) => b.sortKey - a.sortKey)
      .slice(0, limit)
      .map(({ sortKey, ...item }) => item);

    return combined;
  } catch (error) {
    console.error('Failed to load latest topics:', error);
    return [];
  }
}
