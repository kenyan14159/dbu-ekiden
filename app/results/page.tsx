import fs from 'fs';
import path from 'path';
import ResultsClient from './ResultsClient';

interface Result {
  event: string;
  name: string;
  time: string;
  rank: string;
  note?: string;
}

interface TeamResult {
  rank: string;
  totalTime: string;
  outboundRank?: string;
  outboundTime?: string;
  inboundRank?: string;
  inboundTime?: string;
}

interface ResultEvent {
  id: string;
  slug: string;
  date: string;
  title: string;
  venue: string;
  results: Result[];
  teamResult?: TeamResult;
  description?: string;
}

interface ResultsData {
  year: number;
  events: ResultEvent[];
}

async function getResultsData(): Promise<ResultsData> {
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
    allEvents.sort((a: ResultEvent, b: ResultEvent) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return { year: Math.max(...years), events: allEvents };
  } catch (error) {
    console.error('Failed to load results data:', error);
    return { year: 2026, events: [] };
  }
}

export default async function ResultsPage() {
  const resultsData = await getResultsData();

  return <ResultsClient events={resultsData.events} />;
}
