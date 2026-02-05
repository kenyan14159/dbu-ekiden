import fs from 'fs';
import path from 'path';
import Script from 'next/script';
import { generateSportsEventSchema } from '@/lib/structured-data';
import ScheduleClient from './ScheduleClient';

interface ScheduleEvent {
  id: number;
  title: string;
  date: string;
  endDate?: string;
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

  return (
    <>
      {scheduleData.events.map((event, index) => {
        const eventSchema = generateSportsEventSchema({
          name: event.title,
          startDate: event.date,
          endDate: event.endDate,
          location: event.location || '未定',
          description: event.description,
        });

        return (
          <Script
            key={`event-schema-${event.id}-${index}`}
            id={`event-schema-${event.id}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
          />
        );
      })}
      <ScheduleClient year={scheduleData.year} events={scheduleData.events} />
    </>
  );
}
