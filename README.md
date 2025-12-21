# 大東文化大学陸上競技部男子長距離ブロック 公式ウェブサイト

<div align="center">

![大東文化大学駅伝部](https://img.shields.io/badge/大東文化大学-駅伝部-004d25?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)

**歴史への礎 ～あの場所でやり返す〜**

</div>

---

## 🌐 サイト情報

| 項目 | 内容 |
|------|------|
| **本番URL** | https://daito-ekiden.com (予定) |
| **ホスティング** | Cloudflare Pages / Vercel |
| **ステータス** | 🚧 開発中 |

---

## 🚀 技術スタック

### コア技術

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 16.x | フレームワーク（Turbopack） |
| React | 19.x | UIライブラリ |
| TypeScript | 5.x | 型安全な開発 |

### スタイリング・アニメーション

| 技術 | 用途 |
|------|------|
| Tailwind CSS 4 | ユーティリティファーストCSS |
| Framer Motion | 宣言的アニメーション |

### UIコンポーネント

| 技術 | 用途 |
|------|------|
| shadcn/ui | プリビルドコンポーネント |
| Radix UI | アクセシブルなUIプリミティブ |
| Lucide Icons | SVGアイコン |

---

## 📦 開発環境セットアップ

### 必要環境
- Node.js 20.x 以上
- npm

### クイックスタート

```bash
# 1. リポジトリクローン
git clone https://github.com/xxx/daito-ekiden.git
cd daito-ekiden

# 2. 依存関係インストール
npm install

# 3. 開発サーバー起動
npm run dev
# → http://localhost:3000
```

### 開発コマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # 本番ビルド
npm run start     # ビルド結果プレビュー
npm run lint      # ESLintチェック
```

---

## 📁 プロジェクト構造

```
daito-ekiden/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ
│   ├── globals.css        # グローバルスタイル
│   ├── sitemap.ts         # サイトマップ
│   ├── components/        # Reactコンポーネント
│   │   ├── ui/           # shadcn/ui
│   │   ├── home/         # ホーム用
│   │   └── layout/       # レイアウト
│   └── [pages]/          # 各ページ
├── lib/                    # ユーティリティ
│   ├── utils.ts           # 汎用ユーティリティ
│   ├── structured-data.ts # 構造化データ
│   └── seo-image-alt.ts   # SEO画像alt
├── public/                 # 静的ファイル
│   └── data/              # JSONデータ
├── types/                  # 型定義
└── .github/workflows/      # CI/CD
```

---

## 📚 ドキュメント

詳細なドキュメントは以下を参照してください：

- [**COMPREHENSIVE.md**](./COMPREHENSIVE.md) - プロジェクト完全ガイド
- [**DESIGN.md**](./DESIGN.md) - デザインシステム詳細

---

## 🎨 デザインシステム

### ブランドカラー

| カラー | HEX | 用途 |
|--------|-----|------|
| 大東グリーン | `#004d25` | メインカラー |
| 大東オレンジ | `#f39800` | アクセントカラー |

### フォント

- **ヒーロー**: Noto Serif JP
- **本文**: Noto Sans JP, システムフォント

---

## 🤝 貢献

貢献を歓迎します！詳細は [COMPREHENSIVE.md](./COMPREHENSIVE.md#8-貢献ガイド) を参照してください。

### コミットメッセージ規約

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更
refactor: リファクタリング
```

---

## 📄 ライセンス

© 2025 大東文化大学 陸上競技部男子長距離ブロック. All rights reserved.

---

<div align="center">

**🏃 真紅の襷を繋ぎ、新たな歴史を刻む 🏃**

</div>
