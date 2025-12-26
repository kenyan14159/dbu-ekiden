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
}

interface ResultEvent {
  id: string;
  slug: string;
  date: string;
  title: string;
  venue: string;
  results: Result[];
  teamResult?: TeamResult;
}

interface ResultsData {
  year: number;
  events: ResultEvent[];
}

async function getResultsData(): Promise<ResultsData> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'results', 'results-2025.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    // 日付でソート（新しい順）
    data.events.sort((a: ResultEvent, b: ResultEvent) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return data;
  } catch (error) {
    console.error('Failed to load results data:', error);
    return { year: 2025, events: [] };
  }
}

export default async function ResultsPage() {
  const resultsData = await getResultsData();

  return <ResultsClient events={resultsData.events} />;
}
