import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const BASE_URL = 'https://dbu-ekiden.com';

async function getNewsArticles() {
  try {
    const newsPath = path.join(process.cwd(), 'public/data/news/news-2025.json');
    if (fs.existsSync(newsPath)) {
      const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
      return newsData.articles || [];
    }
    return [];
  } catch (error) {
    console.error('Failed to load news articles:', error);
    return [];
  }
}

async function getResults() {
  try {
    const years = [2026, 2025]; // 新しい年度から順に読み込む
    const allEvents: Array<{ slug: string; date?: string }> = [];
    
    for (const year of years) {
      try {
        const resultsPath = path.join(process.cwd(), 'public/data/results', `results-${year}.json`);
        if (fs.existsSync(resultsPath)) {
          const resultsData = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
          if (resultsData.events) {
            allEvents.push(...resultsData.events);
          }
        }
      } catch (error) {
        // ファイルが存在しない場合はスキップ
        console.warn(`Failed to load results-${year}.json:`, error);
      }
    }
    
    return allEvents;
  } catch (error) {
    console.error('Failed to load results:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/members`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/results`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/schedule`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/supporters`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/message`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 動的ページ: ニュース記事
  const newsArticles = await getNewsArticles();
  const newsPages: MetadataRoute.Sitemap = newsArticles.map((article: { slug: string; date?: string }) => ({
    url: `${BASE_URL}/news/${article.slug}/`,
    lastModified: article.date || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 動的ページ: リザルト
  const results = await getResults();
  const resultPages: MetadataRoute.Sitemap = results.map((result: { slug: string; date?: string }) => ({
    url: `${BASE_URL}/results/${result.slug}/`,
    lastModified: result.date || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...newsPages, ...resultPages];
}
