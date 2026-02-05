import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';

interface Record {
  rank: number;
  fullName: string;
  highSchool: string;
  time: string;
}

interface EventRecords {
  event: string;
  records: Record[];
}

export const dynamic = 'force-static';

async function getRecordsData(): Promise<EventRecords[]> {
  try {
    const recordsDir = path.join(process.cwd(), 'public/data/records');
    const files = await fs.promises.readdir(recordsDir);
    
    const recordsData: EventRecords[] = [];
    
    // 読み込む順序を定義
    const eventOrder = ['5000m', '10000m', 'half-marathon'];
    
    for (const eventFile of eventOrder) {
      const fileName = `${eventFile}.json`;
      if (files.includes(fileName)) {
        const filePath = path.join(recordsDir, fileName);
        const data = await fs.promises.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        if (parsed.records && parsed.records.length > 0) {
          recordsData.push(parsed);
        }
      }
    }
    
    return recordsData;
  } catch (error) {
    console.error('Failed to load records data:', error);
    return [];
  }
}

export default async function RecordsPage() {
  const recordsData = await getRecordsData();

  return <RecordsClient recordsData={recordsData} />;
}
