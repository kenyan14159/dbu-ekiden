"use client";

import { motion } from 'framer-motion';

export default function MessagePage() {
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
              MESSAGE
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
              応援してくださる皆様へ
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Message Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
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
                      １９７８年９月２７日、三重県生まれ。四日市工業高校で陸上競技を始め、卒業後、大東文化大学に進学して箱根駅伝には４回出場。最終学年となった第７７回大会では主将として１０区を走り、当時の区間新記録で区間賞を獲得。
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed mt-3">
                      大学卒業後はＨｏｎｄａに所属し、実業団ランナーとしてニューイヤー駅伝にも出場。引退後は、三重県の高校陸上部を経て、２０１２年４月より仙台育英学園高校の陸上競技部長距離男子ブロック監督を１０年間務め、２０１９年には全国高校駅伝で１２年ぶり８回目の優勝に導く。
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed mt-3">
                      ２０２２年４月より母校である大東文化大学の陸上競技部男子長距離ブロック監督に就任し、箱根駅伝第１００回大会において、低迷するチームをわずか２年で９年ぶりのシード権獲得に導いた。
                    </p>
                  </div>

                  {/* Hakone Record */}
                  <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                    <h3 className="text-sm font-bold text-neutral-900 mb-4">箱根駅伝出場記録</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white rounded-lg p-3 text-center border border-neutral-100">
                        <p className="text-xs text-neutral-500 mb-1">第７４回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">１年</p>
                        <p className="text-sm font-medium text-neutral-900">７区</p>
                        <p className="text-lg font-bold text-neutral-700">１４位</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-neutral-100">
                        <p className="text-xs text-neutral-500 mb-1">第７５回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">２年</p>
                        <p className="text-sm font-medium text-neutral-900">１区</p>
                        <p className="text-lg font-bold text-neutral-700">１４位</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-neutral-100">
                        <p className="text-xs text-neutral-500 mb-1">第７６回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">３年</p>
                        <p className="text-sm font-medium text-neutral-900">１区</p>
                        <p className="text-lg font-bold text-neutral-700">９位</p>
                      </div>
                      <div className="bg-gradient-to-br from-daito-orange/10 to-daito-orange/5 rounded-lg p-3 text-center border-2 border-daito-orange/30">
                        <p className="text-xs text-daito-orange mb-1">第７７回大会</p>
                        <p className="text-xs text-neutral-400 mb-2">４年・主将</p>
                        <p className="text-sm font-medium text-neutral-900">１０区</p>
                        <p className="text-lg font-bold text-daito-orange">１位</p>
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
                      今季のスローガンは『歴史への礎～あの場所でやり返す』。前回の箱根は総合19位と苦しみました。その悔しさを胸にシード権奪回、そして近い将来に優勝を狙えるチームになるための土台作りをテーマにチームを作ってきました。
                    </p>
                    <p className="leading-relaxed text-neutral-700">
                      今後とも変わらぬご声援を賜りますよう、よろしくお願い申し上げます。
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
