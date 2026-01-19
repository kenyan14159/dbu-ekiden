/**
 * データフェッチユーティリティ
 * サーバーコンポーネントで使用するためのデータ取得関数
 */

import fs from 'fs';
import path from 'path';
import type { NewsData, ResultsData, NewsArticle, ResultEvent, TopicItem } from './types';

/**
 * ニュースデータを取得
 */
export async function getNewsData(): Promise<NewsData> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news', 'news-2025.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as NewsData;
    
    // 日付でソート（新しい順）
    data.articles.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return data;
  } catch (error) {
    console.error('Failed to load news data:', error);
    return { year: 2025, articles: [] };
  }
}

/**
 * リザルトデータを取得
 */
export async function getResultsData(): Promise<ResultsData> {
  try {
    const years = [2026, 2025]; // 新しい年度から順に読み込む
    const allEvents: ResultEvent[] = [];
    
    for (const year of years) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'results', `results-${year}.json`);
        const fileContents = await fs.promises.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents) as ResultsData;
        allEvents.push(...data.events);
      } catch (error) {
        // ファイルが存在しない場合はスキップ
        console.warn(`Failed to load results-${year}.json:`, error);
      }
    }
    
    // 日付でソート（新しい順）
    allEvents.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return { year: Math.max(...years), events: allEvents };
  } catch (error) {
    console.error('Failed to load results data:', error);
    return { year: 2026, events: [] };
  }
}

/**
 * スラッグからニュース記事を取得
 */
export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const newsData = await getNewsData();
    const article = newsData.articles.find((a) => a.slug === slug);
    return article || null;
  } catch (error) {
    console.error('Failed to load news article:', error);
    return null;
  }
}

/**
 * スラッグからリザルトイベントを取得
 */
export async function getResultEventBySlug(slug: string): Promise<ResultEvent | null> {
  try {
    const resultsData = await getResultsData();
    const event = resultsData.events.find((e) => e.slug === slug);
    return event || null;
  } catch (error) {
    console.error('Failed to load result event:', error);
    return null;
  }
}

/**
 * 最新トピックスを取得（ニュースとリザルトを統合）
 */
export async function getLatestTopics(limit: number = 3): Promise<TopicItem[]> {
  try {
    const [newsData, resultsData] = await Promise.all([
      getNewsData(),
      getResultsData(),
    ]);

    // ニュースアイテムを変換
    const newsItems: TopicItem[] = newsData.articles.slice(0, 2).map((article) => ({
      id: `news-${article.id}`,
      type: 'NEWS' as const,
      date: article.date.replace(/-/g, '.'),
      title: article.title,
      link: `/news/${article.slug}`,
      excerpt: article.excerpt,
    }));

    // リザルトアイテムを変換
    const resultItems: TopicItem[] = resultsData.events.slice(0, 1).map((event) => ({
      id: `result-${event.id}`,
      type: 'RESULT' as const,
      date: event.date.replace(/-/g, '.'),
      title: event.title,
      link: `/results/${event.slug}`,
      excerpt: event.description,
    }));

    // 統合して日付順にソート
    const combined = [...newsItems, ...resultItems]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit);

    return combined;
  } catch (error) {
    console.error('Failed to load latest topics:', error);
    return [];
  }
}

