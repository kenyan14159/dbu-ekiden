/**
 * アプリケーション全体で使用する型定義
 */

/**
 * ニュース記事のメタデータ型
 */
export interface NewsMetadata {
  articles: NewsArticleMeta[];
}

export interface NewsArticleMeta {
  slug: string;
  id: number;
  title: string;
  date: string;
  image: string;
}



/**
 * ニュース記事の型定義（詳細）
 */
export interface NewsArticle {
  id: number;
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
  id: number;
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
 * トピックアイテムの型定義
 */
export interface TopicItem {
  id: string;
  type: 'NEWS';
  date: string;
  title: string;
  link: string;
  excerpt?: string;
  image?: string;
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
    typeof (data as NewsArticle).id === 'number' &&
    typeof (data as NewsArticle).slug === 'string' &&
    typeof (data as NewsArticle).title === 'string'
  );
}

/**
 * イベントの型定義
 */
export interface Event {
  id: number;
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



export function isEvent(data: unknown): data is Event {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'slug' in data &&
    'title' in data &&
    'date' in data &&
    'location' in data &&
    typeof (data as Event).id === 'number' &&
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

