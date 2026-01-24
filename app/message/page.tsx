"use client";

import { motion } from 'framer-motion';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

export default function MessagePage() {
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
              MESSAGE
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl font-light tracking-[0.3em]">
              応援してくださる皆様へ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[{ label: 'メッセージ' }]} 
            className="mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Director's Message */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-12">
                監督からのメッセージ
              </h2>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                {/* Director Photo / Placeholder */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center mb-4">
                    <span className="text-sm text-neutral-400 tracking-wider">NO IMAGE</span>
                  </div>

                  {/* Name with Furigana */}
                  <div className="text-center">
                    <p className="text-xs text-neutral-500 tracking-wider mb-1">
                      まなこ きよし
                    </p>
                    <p className="text-xl font-bold text-neutral-900">
                      真名子 圭
                    </p>
                    <p className="text-sm text-daito-green font-medium mt-1">
                      監督
                    </p>
                  </div>
                </div>

                {/* Profile & Message */}
                <div className="w-full md:w-2/3">
                  {/* Profile */}
                  <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                    <h3 className="text-sm font-bold text-neutral-900 mb-3">プロフィール</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      1978年9月27日、三重県生まれ。四日市工業高校で陸上競技を始め、卒業後、大東文化大学に進学して箱根駅伝には4回出場。最終学年となった第77回大会では主将として10区を走り、当時の区間新記録で区間賞を獲得。
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed mt-3">
                      大学卒業後はHondaに所属し、実業団ランナーとしてニューイヤー駅伝にも出場。引退後は、三重県の高校陸上部を経て、2012年4月より仙台育英学園高校の陸上競技部長距離男子ブロック監督を10年間務め、2019年には全国高校駅伝で12年ぶり8回目の優勝に導く。
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed mt-3">
                      2022年4月より母校である大東文化大学の陸上競技部男子長距離ブロック監督に就任し、箱根駅伝第100回大会において、低迷するチームをわずか2年で9年ぶりのシード権獲得に導いた。
                    </p>
                  </div>

                  {/* Hakone Record */}
                  <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                    <h3 className="text-sm font-bold text-neutral-900 mb-4">箱根駅伝出場記録</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white rounded-lg p-3 text-center border border-neutral-100">
                        <p className="text-xs text-neutral-500 mb-1">第74回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">1年</p>
                        <p className="text-sm font-medium text-neutral-900">７区</p>
                        <p className="text-lg font-bold text-neutral-700">14位</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-neutral-100">
                        <p className="text-xs text-neutral-500 mb-1">第75回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">2年</p>
                        <p className="text-sm font-medium text-neutral-900">１区</p>
                        <p className="text-lg font-bold text-neutral-700">14位</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-neutral-100">
                        <p className="text-xs text-neutral-500 mb-1">第76回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">3年</p>
                        <p className="text-sm font-medium text-neutral-900">１区</p>
                        <p className="text-lg font-bold text-neutral-700">9位</p>
                      </div>
                      <div className="bg-gradient-to-br from-daito-orange/10 to-daito-orange/5 rounded-lg p-3 text-center border-2 border-daito-orange/30">
                        <p className="text-xs text-daito-orange mb-1">第77回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">4年・主将</p>
                        <p className="text-sm font-medium text-neutral-900">１０区</p>
                        <p className="text-lg font-bold text-daito-orange">1位</p>
                        <p className="text-xs font-bold text-daito-orange mt-1">区間新記録</p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="prose prose-lg max-w-none">
                    <p className="leading-relaxed text-neutral-700 mb-4">
                      日頃より大東文化大学陸上競技部男子長距離ブロックへの多大なるご支援、ご声援をいただき、誠にありがとうございます。
                    </p>
                    <p className="leading-relaxed text-neutral-700 mb-4">
                      今季のスローガンは『歴史への礎～あの場所でやり返す～』。箱根駅伝を終え、選手一人ひとりが課題と向き合いながら、次のシーズンへ向けて歩みを進めています。結果と内容の両面で得た手応えを土台に、シード権奪回、そして将来的な優勝を見据えたチームづくりを継続してまいります。
                    </p>
                    <p className="leading-relaxed text-neutral-700">
                      これからも皆様のご期待に応えられるよう、日々の鍛錬を積み重ねてまいります。今後とも変わらぬご声援を賜りますよう、よろしくお願い申し上げます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
