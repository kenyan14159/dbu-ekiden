"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

/**
 * ニュースページのレイアウトテンプレート
 * 
 * 使い方:
 * 1. このページをコピーして新しいニュース記事ページを作成
 * 2. metadata（タイトル、description）を変更
 * 3. 日付、タイトル、サブタイトルを変更
 * 4. 統計カードの内容を変更（不要な場合は削除）
 * 5. 記事本文を編集
 * 6. 画像を追加する場合は、画像セクションのコメントを解除
 */

export default function NewsLayoutExample() {
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-light text-neutral-900 mb-4">
              NEWS
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
              ニュース
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
              href="/news"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-daito-green transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ニュース一覧に戻る</span>
            </Link>

            {/* Article Header */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 mb-8 shadow-sm">
              {/* Date */}
              <div className="flex items-center gap-2 text-neutral-600 mb-4">
                <Calendar className="w-4 h-4" />
                <time dateTime="2026-01-15">2026年1月15日</time>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                ニュース記事のタイトルをここに入力
              </h2>

              {/* Subtitle */}
              <p className="text-lg text-neutral-600 leading-relaxed">
                記事のサブタイトルや要約文をここに入力します。読者の興味を引く内容を簡潔にまとめます。
              </p>
            </div>

            {/* Statistics Cards - 必要に応じて使用 */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-daito-green/10 to-transparent border border-neutral-200 rounded-xl p-6">
                <p className="text-sm text-neutral-600 mb-1">統計1のラベル</p>
                <p className="text-3xl font-bold text-daito-green mb-2">12位</p>
                <p className="text-sm text-neutral-700">補足説明</p>
              </div>
              <div className="bg-gradient-to-br from-daito-orange/10 to-transparent border border-neutral-200 rounded-xl p-6">
                <p className="text-sm text-neutral-600 mb-1">統計2のラベル</p>
                <p className="text-3xl font-bold text-daito-orange mb-2">28:45.23</p>
                <p className="text-sm text-neutral-700">補足説明</p>
              </div>
              <div className="bg-gradient-to-br from-daito-green/10 to-transparent border border-neutral-200 rounded-xl p-6">
                <p className="text-sm text-neutral-600 mb-1">統計3のラベル</p>
                <p className="text-3xl font-bold text-daito-green mb-2">3名</p>
                <p className="text-sm text-neutral-700">補足説明</p>
              </div>
            </div>

            {/* Article Body */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 shadow-sm">
              {/* Main Content Section */}
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">見出し1</h3>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  本文の内容をここに入力します。段落ごとに分けて、読みやすく記載します。
                  適度に改行を入れて、視覚的に見やすいレイアウトを心がけます。
                </p>

                {/* Highlight Box - 重要な情報を強調 */}
                <div className="bg-gradient-to-r from-daito-green/5 to-transparent border-l-4 border-daito-green pl-6 py-4 my-8 rounded-r-lg">
                  <p className="text-lg font-medium text-neutral-900 mb-2">💡 ポイント</p>
                  <p className="text-neutral-700 leading-relaxed">
                    重要なポイントや補足情報をこのボックスで強調できます。
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-neutral-900 mb-4 mt-12">見出し2</h3>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  次のセクションの内容を入力します。箇条書きも使用できます：
                </p>

                <ul className="space-y-2 mb-6 text-neutral-700">
                  <li>• ポイント1の説明</li>
                  <li>• ポイント2の説明</li>
                  <li>• ポイント3の説明</li>
                </ul>

                {/* Image Section - 画像を追加する場合 */}
                {/* 
                <div className="my-12">
                  <Image
                    src="/images/記事画像.jpg"
                    alt="画像の説明"
                    width={1200}
                    height={675}
                    className="rounded-xl"
                  />
                  <p className="text-sm text-neutral-600 text-center mt-2">画像のキャプション</p>
                </div>
                */}

                <h3 className="text-2xl font-bold text-neutral-900 mb-4 mt-12">見出し3</h3>
                <p className="text-neutral-700 leading-relaxed">
                  最後のセクションの内容を入力します。締めの言葉や今後の展望などを記載します。
                </p>
              </div>

              {/* Closing Message */}
              <div className="bg-gradient-to-r from-daito-green/5 to-daito-orange/5 border border-neutral-200 rounded-xl p-6 mt-12">
                <p className="text-center text-lg font-medium text-neutral-900">
                  引き続き応援よろしくお願いします。
                </p>
              </div>
            </div>

            {/* Back Link (Bottom) */}
            <div className="mt-12">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-daito-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ニュース一覧に戻る</span>
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
