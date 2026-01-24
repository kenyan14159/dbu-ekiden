import ResultsClient from './ResultsClient';
import { getResultsMetadata } from '@/lib/data';

export default async function ResultsPage() {
  const resultsMetadata = await getResultsMetadata();

  return <ResultsClient resultsMetadata={resultsMetadata} />;
}
