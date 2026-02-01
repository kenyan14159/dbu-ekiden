"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lock, Eye, EyeOff, XCircle } from 'lucide-react';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_EXCLUSIVE_PASSWORD ?? "";

export default function ExclusivePage() {
  const [password, setPassword] = useState('');
  // 初期状態を計算（useEffect内でのsetStateを回避）
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('exclusive_auth') === 'true';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isPasswordConfigured = CORRECT_PASSWORD.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!isPasswordConfigured) {
      setError('現在このページは管理者が準備中です。');
      setIsLoading(false);
      return;
    }

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      // Store in sessionStorage so it persists during the session
      sessionStorage.setItem('exclusive_auth', 'true');
    } else {
      setError('パスワードが正しくありません');
      setPassword('');
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
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
                EXCLUSIVE
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
                限定コンテンツ
              </p>
            </motion.div>
          </div>
        </section>

        {/* Exclusive Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {/* Breadcrumbs */}
              <Breadcrumbs 
                items={[{ label: '限定コンテンツ' }]} 
                className="mb-8"
              />

              <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 shadow-sm mb-8">
                <div className="text-center py-12">
                  <p className="text-neutral-500 text-lg font-medium">コンテンツ準備中</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

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
              EXCLUSIVE
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
              限定コンテンツ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            {/* Breadcrumbs */}
            <Breadcrumbs 
              items={[{ label: '限定コンテンツ' }]} 
              className="mb-8"
            />

            <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-daito-green/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-daito-green" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 text-center mb-2">
                パスワードを入力してください
              </h2>
              <p className="text-sm text-neutral-500 text-center mb-8">
                このコンテンツは関係者限定です
              </p>
              {!isPasswordConfigured && (
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
                  現在このページは準備中です。閲覧には管理者側の設定が必要です。
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="password" className="sr-only">
                    パスワード
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="パスワード"
                      className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors"
                        disabled={isLoading || !isPasswordConfigured}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm mb-4"
                  >
                    <XCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !password || !isPasswordConfigured}
                  className="w-full py-3 bg-daito-green text-white font-bold rounded-lg hover:bg-daito-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      確認中...
                    </span>
                  ) : (
                    'ログイン'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
