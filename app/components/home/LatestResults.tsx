import { getLatestResults } from '@/lib/data';
import LatestTopicsClient from './LatestTopicsClient';

/**
 * 最新リザルトセクション（サーバーコンポーネント）
 * データフェッチはサーバーサイドで実行され、クライアントコンポーネントに渡される
 */
export default async function LatestResults() {
  const results = await getLatestResults(3);

  return <LatestTopicsClient topics={results} />;
}
