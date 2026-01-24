/**
 * アプリケーション全体で使用する型定義
 */

/**
 * ニュース記事のメタデータ型（簡略版）
 */
export interface NewsMetadata {
  articles: {
    slug: string;
    id: string | number;
    title: string;
    date: string;
    image: string;
  }[];
}

/**
 * リザルトのメタデータ型（簡略版）
 */
export interface ResultMetadata {
  articles: {
    slug: string;
    id: number;
    title: string;
    date: string;
    image: string;
  }[];
}

/**
 * ニュース記事の型定義
 */
export interface NewsArticle {
  id: string;
  slug: string;
  date: string;
  dateModified?: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  tags?: string[];
  author?: string;
}

/**
 * OBニュース記事の型定義
 */
export interface ObNewsArticle {
  id: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  tags?: string[];
  author?: string;
}

/**
 * ニュースデータの型定義
 */
export interface NewsData {
  year: number;
  articles: NewsArticle[];
}

/**
 * OBニュースデータの型定義
 */
export interface ObNewsData {
  year: number;
  articles: ObNewsArticle[];
}

/**
 * リザルトイベントの型定義
 */
export interface ResultEvent {
  id: string;
  slug: string;
  date: string;
  title: string;
  venue?: string;
  location?: string;
  description?: string;
  results?: Result[];
  teamResult?: TeamResult;
  image?: string;
}

/**
 * 個別リザルトの型定義
 */
export interface Result {
  event?: string;
  name?: string;
  time?: string;
  rank?: string;
  note?: string;
  runnerName?: string;
  position?: number;
  distance?: string;
  notes?: string;
}

/**
 * 団体成績の型定義
 */
export interface TeamResult {
  rank: string;
  totalTime: string;
  outboundRank?: string;
  outboundTime?: string;
  inboundRank?: string;
  inboundTime?: string;
}

/**
 * リザルトデータの型定義
 */
export interface ResultsData {
  year: number;
  events: ResultEvent[];
}

/**
 * イベントの型定義
 */
export interface Event {
  id: string;
  slug: string;
  date: string;
  endDate?: string;
  title: string;
  location: string;
  description?: string;
  type: 'race' | 'training' | 'meeting' | 'other';
  url?: string;
}

/**
 * イベントデータの型定義
 */
export interface EventsData {
  year: number;
  events: Event[];
}

/**
 * メンバーの型定義
 */
export interface Member {
  id: string;
  name: string;
  nameKana?: string;
  grade: string;
  position?: string;
  profile?: string;
  image?: string;
  achievements?: string[];
  personalBest?: {
    distance: string;
    time: string;
    date?: string;
  };
}

/**
 * メンバーデータの型定義
 */
export interface MembersData {
  year: number;
  members: Member[];
}

/**
 * トピックアイテムの型定義
 */
export interface TopicItem {
  id: string;
  type: 'NEWS' | 'RESULT';
  date: string;
  title: string;
  link: string;
  excerpt?: string;
}

/**
 * 型ガード関数
 */
export function isNewsArticle(data: unknown): data is NewsArticle {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'slug' in data &&
    'title' in data &&
    'date' in data &&
    typeof (data as NewsArticle).id === 'string' &&
    typeof (data as NewsArticle).slug === 'string' &&
    typeof (data as NewsArticle).title === 'string'
  );
}

export function isResultEvent(data: unknown): data is ResultEvent {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'slug' in data &&
    'title' in data &&
    'date' in data &&
    typeof (data as ResultEvent).id === 'string' &&
    typeof (data as ResultEvent).slug === 'string' &&
    typeof (data as ResultEvent).title === 'string'
  );
}

export function isEvent(data: unknown): data is Event {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'slug' in data &&
    'title' in data &&
    'date' in data &&
    'location' in data &&
    typeof (data as Event).id === 'string' &&
    typeof (data as Event).slug === 'string' &&
    typeof (data as Event).title === 'string'
  );
}

export function isMember(data: unknown): data is Member {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'grade' in data &&
    typeof (data as Member).id === 'string' &&
    typeof (data as Member).name === 'string'
  );
}

