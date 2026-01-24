"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
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
              ABOUT US
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
              サイトについて
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Breadcrumbs */}
            <Breadcrumbs 
              items={[{ label: 'サイトについて' }]} 
              className="mb-8"
            />

            {/* Introduction */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">はじめに</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                このホームページは、大東文化大学 陸上競技部 長距離ブロックを応援する皆様との繋がりを広げるため、また、より多くの方々からのご支援をいただけるよう願いを込めて、公式サイトの一つとして運営しております。
              </p>
              <div className="text-sm text-neutral-500 border-l-2 border-daito-green pl-4">
                <p>管理：趣味で制作する現役駅伝部学生</p>
                <p className="text-daito-green font-medium">shotaro.dev</p>
              </div>
              <p className="text-neutral-600 leading-relaxed mt-4">
                活動状況により更新が不定期になる点、また、一人で運営しているため記録に誤り等が含まれる可能性がある点をご了承ください。誤りを発見された際や、コンテンツのご要望等ございましたら、お気軽にご連絡いただけますと幸いです。
              </p>
            </div>

            {/* Privacy Policy */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">プライバシーポリシー</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                当サイトでは、お客様の個人情報を適切に取り扱うことをお約束します。
              </p>
              <div className="space-y-4 text-sm text-neutral-600">
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">1. 個人情報の収集と利用について</h3>
                  <p>当サイトでは、お問い合わせフォーム送信時にお客様の個人情報を収集し、サービス提供およびサポート、お問い合わせへの対応を目的として利用します。</p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">2. 個人情報の保護について</h3>
                  <p>お客様の個人情報保護のため、漏洩や不正アクセス防止に適切なセキュリティ対策を講じます。</p>
                </div>
              </div>
            </div>

            {/* Terms of Use */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">利用規約</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                この利用規約は、当サイトの利用条件を定めるものです。当サイトを利用することで、本規約に同意したものとみなされます。
              </p>
              <div className="space-y-4 text-sm text-neutral-600">
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">1. 禁止事項</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>当サイトの運営を妨害する行為</li>
                    <li>他の利用者の個人情報を収集する行為</li>
                    <li>不正アクセスを試みる行為</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">2. 免責事項</h3>
                  <p>当サイトは、提供する情報の正確性・完全性について保証しません。当サイトの利用により損害が生じた場合でも、一切責任を負いかねます。</p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">3. 著作権について</h3>
                  <p>当サイトに掲載されているコンテンツ（テキスト、画像等）の無断使用はご遠慮ください。</p>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">ご理解とご協力のお願い</h2>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>・ホームページの更新が遅れる場合があります</li>
                <li>・画像の無断使用は固くお断りいたします</li>
                <li>・お問い合わせ先への迷惑行為はご遠慮ください</li>
                <li>・パスワード保護されたコンテンツは、パスワードをお持ちの方のみ閲覧可能です</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">お問い合わせ</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                ご意見・ご要望、プライバシーポリシーや利用規約に関するお問い合わせなど、当サイトに関するご連絡は下記までお願いいたします。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-daito-green text-white font-medium rounded-full hover:bg-daito-green/90 transition-colors"
              >
                お問い合わせはこちら
              </Link>
            </div>

            {/* Closing */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-8"
            >
              <p className="text-neutral-600 leading-relaxed mb-4">
                今後とも変わらぬご支援、ご声援をよろしくお願い申し上げます。<br />
                箱根路を一緒に駆け抜ける日を、部員一同心待ちにしております。
              </p>
              <p className="text-neutral-900 font-medium">
                大東文化大学 陸上競技部 長距離ブロック 一同
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
