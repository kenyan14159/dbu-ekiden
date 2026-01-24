import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';

interface Record {
  rank: number;
  name: string;
  fullName: string;
  time: string;
  date: string;
  competition: string;
  year: string;
}

interface RecordsData {
  event: string;
  records: Record[];
}

async function getRecordsData(): Promise<{ [key: string]: RecordsData }> {
  try {
    const recordsDir = path.join(process.cwd(), 'public/data/records');
    const files = ['1500m.json', '3000m.json', '5000m.json', '10000m.json', 'half-marathon.json'];
    
    const recordsData: { [key: string]: RecordsData } = {};
    
    for (const file of files) {
      const filePath = path.join(recordsDir, file);
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      const key = file.replace('.json', '');
      recordsData[key] = data;
    }
    
    return recordsData;
  } catch (error) {
    console.error('Failed to load records data:', error);
    return {};
  }
}

export default async function RecordsPage() {
  const recordsData = await getRecordsData();

  return <RecordsClient recordsData={recordsData} />;
}
