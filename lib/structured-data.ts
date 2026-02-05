/**
 * 構造化データ（JSON-LD）生成ユーティリティ
 * Schema.org準拠の構造化データを生成します
 */

const BASE_URL = 'https://dbu-ekiden.com';

/**
 * Organization（組織）スキーマを生成
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "大東文化大学陸上競技部男子長距離ブロック",
    "alternateName": "大東文化大学駅伝部",
    "url": BASE_URL,
    "logo": `${BASE_URL}/images/daito-ekiden-logo.png`,
    "sameAs": [
      "https://www.instagram.com/daitobunka_ekiden/",
      "https://x.com/DaitoBunka__TF"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "東松山市",
      "addressRegion": "埼玉県",
      "postalCode": "355-8501",
      "addressCountry": "JP",
      "streetAddress": "大字西本宿1753"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "お問い合わせ",
      "url": `${BASE_URL}/contact`
    }
  };
}

/**
 * SportsTeam（スポーツチーム）スキーマを生成
 */
export function generateSportsTeamSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "name": "大東文化大学陸上競技部男子長距離ブロック",
    "sport": "陸上競技（駅伝・長距離）",
    "memberOf": {
      "@type": "CollegeOrUniversity",
      "name": "大東文化大学",
      "url": "https://www.daito.ac.jp"
    },
    "url": BASE_URL,
    "logo": `${BASE_URL}/images/daito-ekiden-logo.png`
  };
}

/**
 * NewsArticle（ニュース記事）スキーマを生成
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.headline,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "image": article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/images/default-ogp.jpg`,
    "url": `${BASE_URL}${article.url}`,
    "author": {
      "@type": "Organization",
      "name": "大東文化大学陸上競技部男子長距離ブロック"
    },
    "publisher": {
      "@type": "Organization",
      "name": "大東文化大学陸上競技部男子長距離ブロック",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/images/daito-ekiden-logo.png`
      }
    }
  };
}

/**
 * BreadcrumbList（パンくずリスト）スキーマを生成
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };
}

/**
 * Person（選手）スキーマを生成
 */
export function generatePersonSchema(person: {
  name: string;
  affiliation: string;
  alumniOf?: string;
  url?: string;
  image?: string;
  jobTitle?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "affiliation": {
      "@type": "Organization",
      "name": person.affiliation
    },
    ...(person.alumniOf && {
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": person.alumniOf
      }
    }),
    ...(person.url && { "url": `${BASE_URL}${person.url}` }),
    ...(person.image && { "image": `${BASE_URL}${person.image}` }),
    ...(person.jobTitle && { "jobTitle": person.jobTitle })
  };
}

/**
 * SportsEvent（スポーツイベント）スキーマを生成
 */
export function generateSportsEventSchema(event: {
  name: string;
  startDate: string;
  endDate?: string;
  location: string;
  url?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": event.name,
    "startDate": event.startDate,
    ...(event.endDate && { "endDate": event.endDate }),
    "location": {
      "@type": "Place",
      "name": event.location
    },
    ...(event.url && { "url": `${BASE_URL}${event.url}` }),
    ...(event.description && { "description": event.description }),
    "organizer": {
      "@type": "Organization",
      "name": "大東文化大学陸上競技部男子長距離ブロック"
    }
  };
}

