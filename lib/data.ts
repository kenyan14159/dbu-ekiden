/**
 * データフェッチユーティリティ
 * サーバーコンポーネントで使用するためのデータ取得関数
 */

import fs from 'fs';
import path from 'path';
import type { TopicItem, NewsMetadata, ResultMetadata, ResultEvent, ResultArticleMeta } from './types';

// 型を再エクスポート
export type { NewsMetadata, ResultMetadata } from './types';

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
 * リザルトのメタデータを取得
 */
export async function getResultsMetadata(): Promise<ResultMetadata> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'results', 'results-2026.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const data: ResultMetadata = JSON.parse(fileContents);
    
    // 日付でソート（新しい順）
    if (data.articles && Array.isArray(data.articles)) {
      data.articles.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    
    return data;
  } catch (error) {
    console.error('Failed to load results metadata:', error);
    return { articles: [] };
  }
}

/**
 * スラッグからニュース記事を取得
 */
export async function getNewsArticleBySlug(slug: string): Promise<NewsMetadata['articles'][0] | null> {
  try {
    const newsMetadata = await getNewsMetadata();
    const article = newsMetadata.articles.find((a) => a.slug === slug);
    return article || null;
  } catch (error) {
    console.error('Failed to load news article:', error);
    return null;
  }
}

/**
 * ニュース記事の前後の記事を取得
 */
export async function getNewsArticleNavigation(slug: string): Promise<{
  previous: NewsMetadata['articles'][0] | null;
  next: NewsMetadata['articles'][0] | null;
}> {
  try {
    const newsMetadata = await getNewsMetadata();
    const currentIndex = newsMetadata.articles.findIndex((a) => a.slug === slug);
    
    if (currentIndex === -1) {
      return { previous: null, next: null };
    }
    
    return {
      previous: currentIndex > 0 ? newsMetadata.articles[currentIndex - 1] : null,
      next: currentIndex < newsMetadata.articles.length - 1 ? newsMetadata.articles[currentIndex + 1] : null,
    };
  } catch (error) {
    console.error('Failed to load news article navigation:', error);
    return { previous: null, next: null };
  }
}

/**
 * スラッグからリザルト記事を取得
 */
export async function getResultArticleBySlug(slug: string): Promise<ResultMetadata['articles'][0] | null> {
  try {
    const resultsMetadata = await getResultsMetadata();
    const article = resultsMetadata.articles.find((a) => a.slug === slug);
    return article || null;
  } catch (error) {
    console.error('Failed to load result article:', error);
    return null;
  }
}

/**
 * リザルト記事の前後の記事を取得
 */
export async function getResultArticleNavigation(slug: string): Promise<{
  previous: ResultMetadata['articles'][0] | null;
  next: ResultMetadata['articles'][0] | null;
}> {
  try {
    const resultsMetadata = await getResultsMetadata();
    const currentIndex = resultsMetadata.articles.findIndex((a) => a.slug === slug);
    
    if (currentIndex === -1) {
      return { previous: null, next: null };
    }
    
    return {
      previous: currentIndex > 0 ? resultsMetadata.articles[currentIndex - 1] : null,
      next: currentIndex < resultsMetadata.articles.length - 1 ? resultsMetadata.articles[currentIndex + 1] : null,
    };
  } catch (error) {
    console.error('Failed to load result article navigation:', error);
    return { previous: null, next: null };
  }
}

/**
 * リザルトの詳細データを取得（results-2026.jsonから）
 */
export async function getResultDetailBySlug(slug: string): Promise<ResultEvent | null> {
  try {
    // まず、詳細データが含まれているファイルを確認
    const detailedFilePath = path.join(process.cwd(), 'public', 'data', 'results', 'results-2026.json');
    const detailedFileContents = await fs.promises.readFile(detailedFilePath, 'utf8');
    const detailedData = JSON.parse(detailedFileContents);
    
    // events配列がある場合（詳細データ）
    if (detailedData.events && Array.isArray(detailedData.events)) {
      const event = detailedData.events.find((e: ResultEvent) => e.slug === slug);
      if (event) return event;
    }
    
    // articles配列がある場合（メタデータのみ）
    if (detailedData.articles && Array.isArray(detailedData.articles)) {
      const article = detailedData.articles.find((a: ResultArticleMeta) => a.slug === slug);
      if (article) {
        // メタデータのみの場合は、基本構造を返す
        return {
          id: article.id,
          slug: article.slug,
          date: article.date,
          title: article.title,
          venue: '',
          results: [],
          teamResult: undefined,
          image: article.image
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to load result detail:', error);
    return null;
  }
}

/**
 * 最新リザルトを取得
 */
export async function getLatestResults(limit: number = 3): Promise<TopicItem[]> {
  try {
    const resultsMetadata = await getResultsMetadata();

    const toDisplayDate = (date: string) => date.replace(/-/g, '.');
    const toSortKey = (date: string) => {
      const time = Date.parse(date);
      return Number.isNaN(time) ? 0 : time;
    };

    const results: TopicItem[] = resultsMetadata.articles.map((result) => ({
      id: `result-${result.id}`,
      type: 'RESULT' as const,
      date: toDisplayDate(result.date),
      title: result.title,
      link: `/topics/results/2026/${result.slug}`,
      excerpt: result.title,
      image: result.image,
      // sortKeyは後で削除するので型アサーションで一時的に持たせる、あるいは別オブジェクトで処理する
    }))
    // sortKeyのために一時的なオブジェクトを作成
    .map((item, index) => ({
      ...item,
      sortKey: toSortKey(resultsMetadata.articles[index].date)
    }))
    .sort((a, b) => b.sortKey - a.sortKey)
    .slice(0, limit)
    .map(({ sortKey, ...item }) => item);

    return results;
  } catch (error) {
    console.error('Failed to load latest results:', error);
    return [];
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

    const resultItems = resultsMetadata.articles.map((result) => ({
      id: `result-${result.id}`,
      type: 'RESULT' as const,
      date: toDisplayDate(result.date),
      title: result.title,
      link: `/topics/results/2026/${result.slug}`,
      excerpt: result.title,
      image: result.image,
      sortKey: toSortKey(result.date),
    }));

    const combined: TopicItem[] = [...newsItems, ...resultItems]
      .sort((a, b) => b.sortKey - a.sortKey)
      .slice(0, limit)
      .map(({ sortKey, ...item }) => item);

    return combined;
  } catch (error) {
    console.error('Failed to load latest topics:', error);
    return [];
  }
}
