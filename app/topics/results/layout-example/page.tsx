"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

/**
 * リザルトページのレイアウトテンプレート
 * 
 * 使い方:
 * 1. このページをコピーして新しいリザルト記事ページを作成
 * 2. metadata（タイトル、description）を変更
 * 3. 日付、タイトル、開催地を変更
 * 4. チーム成績カードの内容を変更（不要な場合は削除）
 * 5. 成績表のデータを変更
 * 6. レース分析やコメントを編集
 */

export default function ResultLayoutExample() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - 他のページと統一されたデザイン */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-neutral-900 mb-4">
              RESULTS
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
              リザルト
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Link */}
            <Link
              href="/results"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-daito-green transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>リザルト一覧に戻る</span>
            </Link>

            {/* Article Header */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 mb-8 shadow-sm">
              {/* Date and Location */}
              <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2026-01-15">2026年1月15日</time>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>開催地名</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                大会名をここに入力
              </h2>

              {/* Description */}
              <p className="text-lg text-neutral-600 leading-relaxed">
                大会の概要や結果の要約をここに入力します。
              </p>
            </div>

            {/* Team Result Card - 駅伝など団体戦の場合に使用 */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-8 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">チーム成績</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-daito-green/5 to-transparent rounded-xl">
                  <p className="text-sm text-neutral-600 mb-2">総合順位</p>
                  <p className="text-3xl font-bold text-daito-green">3位</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-daito-green/5 to-transparent rounded-xl">
                  <p className="text-sm text-neutral-600 mb-2">総合タイム</p>
                  <p className="text-2xl font-bold text-neutral-900">2:03:45</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-daito-green/5 to-transparent rounded-xl">
                  <p className="text-sm text-neutral-600 mb-2">往路</p>
                  <p className="text-xl font-bold text-neutral-900">2位 1:01:23</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-daito-green/5 to-transparent rounded-xl">
                  <p className="text-sm text-neutral-600 mb-2">復路</p>
                  <p className="text-xl font-bold text-neutral-900">4位 1:02:22</p>
                </div>
              </div>
            </div>

            {/* Race Summary */}
            <div className="bg-gradient-to-r from-daito-green/5 to-transparent border-l-4 border-daito-green pl-6 py-4 mb-8 rounded-r-lg">
              <p className="text-lg font-medium text-neutral-900 mb-2">📊 大会結果</p>
              <p className="text-neutral-700 leading-relaxed">
                大会の総評や印象的だったポイントを簡潔にまとめます。
              </p>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden mb-12 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 p-6 border-b border-neutral-100">
                成績一覧
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b-2 border-neutral-200">
                    <tr>
                      <th className="text-left py-4 px-4 md:px-6 font-bold text-neutral-900">順位</th>
                      <th className="text-left py-4 px-4 md:px-6 font-bold text-neutral-900">選手名</th>
                      <th className="text-left py-4 px-4 md:px-6 font-bold text-neutral-900">学年</th>
                      <th className="text-left py-4 px-4 md:px-6 font-bold text-neutral-900">記録</th>
                      <th className="text-left py-4 px-4 md:px-6 font-bold text-neutral-900">備考</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {/* サンプルデータ - 実際のデータに置き換えてください */}
                    {[
                      { rank: '1位', name: '選手A', grade: '4', time: '1:02:34', note: '自己新' },
                      { rank: '2位', name: '選手B', grade: '3', time: '1:03:12', note: '' },
                      { rank: '3位', name: '選手C', grade: '2', time: '1:04:45', note: '' },
                    ].map((result, index) => (
                      <tr key={index} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-4 md:px-6 font-bold text-neutral-900">{result.rank}</td>
                        <td className="py-4 px-4 md:px-6 text-neutral-700 font-medium">{result.name}</td>
                        <td className="py-4 px-4 md:px-6 text-neutral-600">{result.grade}年</td>
                        <td className="py-4 px-4 md:px-6 font-mono font-bold text-neutral-900">{result.time}</td>
                        <td className="py-4 px-4 md:px-6">
                          {result.note && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-daito-green/10 text-daito-green">
                              {result.note}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-daito-green/10 to-transparent border border-neutral-200 rounded-xl p-6">
                <p className="text-sm text-neutral-600 mb-1">統計1</p>
                <p className="text-3xl font-bold text-daito-green mb-2">8名</p>
                <p className="text-sm text-neutral-700">出場選手数</p>
              </div>
              <div className="bg-gradient-to-br from-daito-green/10 to-transparent border border-neutral-200 rounded-xl p-6">
                <p className="text-sm text-neutral-600 mb-1">統計2</p>
                <p className="text-3xl font-bold text-daito-green mb-2">3名</p>
                <p className="text-sm text-neutral-700">自己新記録</p>
              </div>
              <div className="bg-gradient-to-br from-daito-green/10 to-transparent border border-neutral-200 rounded-xl p-6">
                <p className="text-sm text-neutral-600 mb-1">統計3</p>
                <p className="text-3xl font-bold text-daito-green mb-2">1:03:30</p>
                <p className="text-sm text-neutral-700">平均タイム</p>
              </div>
            </div>

            {/* Race Analysis */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">レース分析</h3>
              
              {/* Highlights Section */}
              <div className="space-y-6 mb-12">
                <div className="bg-gradient-to-r from-daito-green/5 to-transparent border-l-4 border-daito-green pl-6 py-4 rounded-r-lg">
                  <h4 className="text-lg font-bold text-daito-green mb-2">🏆 ハイライト1</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    レースのハイライトや印象的なポイントを記載します。
                  </p>
                </div>
                <div className="bg-gradient-to-r from-daito-orange/5 to-transparent border-l-4 border-daito-orange pl-6 py-4 rounded-r-lg">
                  <h4 className="text-lg font-bold text-daito-orange mb-2">📈 ハイライト2</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    その他の注目ポイントや選手の活躍を記載します。
                  </p>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-daito-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    良かった点
                  </h4>
                  <ul className="space-y-2 text-neutral-700">
                    <li>• ポイント1</li>
                    <li>• ポイント2</li>
                    <li>• ポイント3</li>
                  </ul>
                </div>
                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-daito-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    課題点
                  </h4>
                  <ul className="space-y-2 text-neutral-700">
                    <li>• 課題1</li>
                    <li>• 課題2</li>
                    <li>• 課題3</li>
                  </ul>
                </div>
              </div>

              {/* Future Outlook */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">今後に向けて</h3>
              <p className="text-neutral-700 leading-relaxed">
                今回の大会を振り返っての総括や、今後の展望を記載します。
              </p>

              {/* Closing Message */}
              <div className="bg-gradient-to-r from-daito-green/5 to-daito-orange/5 border border-neutral-200 rounded-xl p-6 mt-8">
                <p className="text-center text-lg font-medium text-neutral-900">
                  応援ありがとうございました。
                </p>
              </div>
            </div>

            {/* Back Link (Bottom) */}
            <div className="mt-12">
              <Link
                href="/results"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-daito-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>リザルト一覧に戻る</span>
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
