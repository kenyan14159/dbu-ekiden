import { getNewsMetadata } from '@/lib/data';
import ObNewsPreviewClient from './ObNewsPreviewClient';

export default async function ObNewsPreview() {
  const newsMetadata = await getNewsMetadata();
  const preview = newsMetadata.articles.slice(0, 3);

  return <ObNewsPreviewClient articles={preview} />;
}
