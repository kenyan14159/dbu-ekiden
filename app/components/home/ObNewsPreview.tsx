import { getLatestTopics } from '@/lib/data';
import LatestTopicsClient from './LatestTopicsClient';

export default async function ObNewsPreview() {
  const topics = await getLatestTopics(3); // デスクトップで3件表示

  return <LatestTopicsClient topics={topics} />;
}
