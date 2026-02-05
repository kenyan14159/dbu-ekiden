"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // バリデーション
      if (!formData.name.trim()) {
        throw new Error('お名前を入力してください');
      }
      if (!formData.email.trim()) {
        throw new Error('メールアドレスを入力してください');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('有効なメールアドレスを入力してください');
      }
      if (!formData.subject) {
        throw new Error('お問い合わせ種類を選択してください');
      }
      if (!formData.message.trim()) {
        throw new Error('お問い合わせ内容を入力してください');
      }

      const subjectLabelMap: Record<string, string> = {
        general: '一般的なお問い合わせ',
        support: 'ご支援・サポーター関連',
        media: '取材・メディア関連',
        other: 'その他',
      };

      const subjectLabel = subjectLabelMap[formData.subject] || 'お問い合わせ';
      const mailSubject = `【${subjectLabel}】${formData.name}`;
      const mailBody =
        `お名前: ${formData.name}\n` +
        `メールアドレス: ${formData.email}\n` +
        `お問い合わせ種類: ${subjectLabel}\n\n` +
        `${formData.message}`;

      if (typeof window !== 'undefined') {
        const mailto = `mailto:Info@daito-ekiden.jp?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
        window.location.href = mailto;
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
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
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-100 via-amber-50 to-orange-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-light text-neutral-900 mb-4">
                THANK YOU
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
                送信手続きのご案内
              </h2>
              <p className="text-neutral-600 mb-6">
                既定のメールアプリが開きます。
                <br />
                送信内容をご確認のうえ、送信してください。
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
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-100 via-amber-50 to-orange-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/5 via-transparent to-daito-orange/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-light text-neutral-900 mb-4">
              CONTACT
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: 'Contact' }]}
            className="mb-8 max-w-3xl mx-auto"
          />

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 bg-daito-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-daito-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 mb-1">住所</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      <span className="block">埼玉県東松山市大字西本宿1828番地2</span>
                      <span className="block text-xs mt-1 text-neutral-500">大東文化大学陸上競技部クラブハウス</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 bg-daito-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-daito-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 mb-1">メールアドレス</h4>
                    <p className="text-sm text-neutral-600 min-h-[1.25rem]">

                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 bg-daito-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-daito-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 mb-1">電話番号</h4>
                    <p className="text-sm text-neutral-600">070-6453-0318</p>
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
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
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
                        disabled={isSubmitting}
                        placeholder="大東 太郎"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isSubmitting}
                        placeholder="taro@example.com"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      disabled={isSubmitting}
                      rows={6}
                      placeholder="お問い合わせ内容をご記入ください"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-daito-green text-white font-bold rounded-lg hover:bg-daito-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          送信中...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          送信する
                        </>
                      )}
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
