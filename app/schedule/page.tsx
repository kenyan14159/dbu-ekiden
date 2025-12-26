import fs from 'fs';
import path from 'path';
import ScheduleClient from './ScheduleClient';

interface ScheduleEvent {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  category: string;
  description?: string;
  location?: string;
  isCancelled?: boolean;
}

interface ScheduleData {
  year: number;
  events: ScheduleEvent[];
}

async function getScheduleData(): Promise<ScheduleData> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'events', 'schedule-2026.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to load schedule data:', error);
    return { year: 2026, events: [] };
  }
}

export default async function SchedulePage() {
  const scheduleData = await getScheduleData();

  return <ScheduleClient year={scheduleData.year} events={scheduleData.events} />;
}
