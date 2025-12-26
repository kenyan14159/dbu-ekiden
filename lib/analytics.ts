/**
 * パフォーマンス監視とアナリティクスユーティリティ
 */

import { reportWebVitalsMetric, type WebVitalsMetric } from './performance';

/**
 * Web Vitalsメトリクスをレポートする（後方互換性のため）
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: string;
  delta?: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
}) {
  // 新しいパフォーマンス監視システムに委譲
  reportWebVitalsMetric(metric as WebVitalsMetric);
}

