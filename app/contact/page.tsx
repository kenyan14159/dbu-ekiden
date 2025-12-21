"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle, MapPin, Mail } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <section className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-4">
                CONTACT
              </p>
              <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
                お問い合わせ
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-white rounded-2xl border border-neutral-100 p-8 text-center"
            >
              <div className="w-16 h-16 bg-daito-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-daito-green" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                送信完了
              </h2>
              <p className="text-neutral-600 mb-6">
                お問い合わせいただきありがとうございます。
                <br />
                内容を確認の上、担当者よりご連絡いたします。
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-daito-green font-medium hover:underline"
              >
                新しいお問い合わせを送る
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-4">
              CONTACT
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
              お問い合わせ
            </h1>
            <p className="text-white/60 text-lg">
              ご質問・取材のご依頼はこちらから
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 bg-daito-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-daito-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 mb-1">住所</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      埼玉県東松山市大字西本宿1753<br />
                      大東文化大学陸上競技部クラブハウス
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 bg-daito-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-daito-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 mb-1">メールアドレス</h4>
                    <p className="text-sm text-neutral-600">
                      Info@daito-ekiden.jp
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-10 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-900 mb-8 text-center">お問い合わせフォーム</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="大東 太郎"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="taro@example.com"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                      お問い合わせ種類 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors"
                    >
                      <option value="">選択してください</option>
                      <option value="general">一般的なお問い合わせ</option>
                      <option value="support">ご支援・サポーター関連</option>
                      <option value="media">取材・メディア関連</option>
                      <option value="other">その他</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="お問い合わせ内容をご記入ください"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-daito-green text-white font-bold rounded-lg hover:bg-daito-green/90 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                      送信する
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
