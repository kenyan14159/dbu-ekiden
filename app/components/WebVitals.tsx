"use client";

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/analytics';
import { measureResourceTiming, measurePageLoadTime } from '@/lib/performance';

export default function WebVitals() {
  useEffect(() => {
    // Web Vitalsライブラリを動的にインポート
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals);
    }).catch((error) => {
      console.error('Failed to load web-vitals:', error);
    });

    // リソース読み込み時間の測定
    measureResourceTiming();
    
    // ページ読み込み時間の測定
    measurePageLoadTime();
  }, []);

  return null;
}

