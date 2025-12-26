import { getLatestTopics } from '@/lib/data';
import LatestTopicsClient from './LatestTopicsClient';

/**
 * 最新トピックスセクション（サーバーコンポーネント）
 * データフェッチはサーバーサイドで実行され、クライアントコンポーネントに渡される
 */
export default async function LatestTopics() {
  const topics = await getLatestTopics(3);

  return <LatestTopicsClient topics={topics} />;
}
