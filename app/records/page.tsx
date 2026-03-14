import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';

interface RawRecord {
  fullName: string;
  highSchool: string;
  time: string;
}

interface RankedRecord extends RawRecord {
  rank: number;
}

interface EventRecords {
  event: string;
  records: RankedRecord[];
}

interface RawEventRecords {
  event: string;
  records: RawRecord[];
}

export const dynamic = 'force-static';

function parseTimeToSeconds(time: string): number {
  const value = time.trim();
  if (!value) {
    return Number.POSITIVE_INFINITY;
  }

  const hourMinuteSecond = value.match(/^(\d+):(\d+):(\d+(?:\.\d+)?)$/);
  if (hourMinuteSecond) {
    const [, hours, minutes, seconds] = hourMinuteSecond;
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  }

  const minuteSecond = value.match(/^(\d+):(\d+(?:\.\d+)?)$/);
  if (minuteSecond) {
    const [, minutes, seconds] = minuteSecond;
    return Number(minutes) * 60 + Number(seconds);
  }

  const minuteSecondCenti = value.match(/^(\d+)'(\d+)"(\d+)$/);
  if (minuteSecondCenti) {
    const [, minutes, seconds, centiseconds] = minuteSecondCenti;
    return Number(minutes) * 60 + Number(seconds) + Number(centiseconds) / 100;
  }

  const hourMinuteSecondQuote = value.match(/^(\d+):(\d+)'(\d+)$/);
  if (hourMinuteSecondQuote) {
    const [, hours, minutes, seconds] = hourMinuteSecondQuote;
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  }

  return Number.POSITIVE_INFINITY;
}

function toRankedRecords(records: RawRecord[]): RankedRecord[] {
  return records
    .map((record, index) => ({
      ...record,
      originalIndex: index,
      seconds: parseTimeToSeconds(record.time),
    }))
    .sort((a, b) => a.seconds - b.seconds || a.originalIndex - b.originalIndex)
    .map(({ fullName, highSchool, time }, index) => ({
      rank: index + 1,
      fullName,
      highSchool,
      time,
    }));
}

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
        const parsed: RawEventRecords = JSON.parse(data);
        if (parsed.records && parsed.records.length > 0) {
          recordsData.push({
            event: parsed.event,
            records: toRankedRecords(parsed.records),
          });
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
