# Cloudflare Pages デプロイ設定ガイド

## 📋 前提条件

- Cloudflareアカウント
- GitHubリポジトリへのアクセス権限

## 🚀 Cloudflare Pagesでの設定手順

### 1. プロジェクト作成

1. Cloudflareダッシュボードにログイン
2. 「Workers & Pages」→「Create application」→「Pages」→「Connect to Git」
3. GitHubリポジトリを選択して接続

### 2. ビルド設定

以下の設定をCloudflare Pagesのダッシュボードで行ってください：

| 設定項目 | 値 |
|---------|-----|
| **Framework preset** | Next.js (Static HTML Export) |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | `/` (デフォルト) |
| **Node.js version** | `20` |
| **Deploy command** | **空欄（設定しない）** ⚠️ |

⚠️ **重要**: 「Deploy command」フィールドは**空欄のまま**にしてください。Cloudflare Pagesはビルドが成功すると自動的にデプロイします。

### 3. 環境変数

現在、環境変数は不要です。必要に応じて後で追加できます。

### 4. カスタムドメイン設定

1. 「Custom domains」セクションで「Set up a custom domain」をクリック
2. `dbu-ekiden.com`を入力
3. Cloudflareが自動的にDNS設定を提案します
4. 提案されたDNS設定を確認して適用

### 5. DNS設定

ドメインのDNS設定で以下を設定：

| タイプ | 名前 | コンテンツ |
|--------|------|-----------|
| CNAME | `@` または `dbu-ekiden.com` | `your-project.pages.dev` |
| CNAME | `www` | `your-project.pages.dev` |

または、Cloudflareが自動的に設定を提案する場合は、それに従ってください。

## 🔧 トラブルシューティング

### エラー: "Missing entry-point to Worker script"

**原因**: Cloudflare Pagesの設定で「Deploy command」に`npx wrangler deploy`などが設定されている

**解決方法**:
1. Cloudflare Pagesのダッシュボードを開く
2. 「Settings」→「Builds & deployments」
3. 「Deploy command」フィールドを**空欄**にする
4. 保存して再デプロイ

### ビルドは成功するがデプロイされない

**確認事項**:
- 「Build output directory」が`out`に設定されているか
- `next.config.mjs`で`output: 'export'`が設定されているか
- ビルドログで`out`ディレクトリが生成されているか

## 📝 手動デプロイ（オプション）

GitHub経由の自動デプロイを使用することを推奨しますが、手動でデプロイする場合：

```bash
# 1. ビルド
npm run build

# 2. Cloudflare Pagesにデプロイ
npx wrangler pages deploy out --project-name=dbu-ekiden
```

## ✅ デプロイ確認

デプロイが成功すると、以下のURLでアクセスできます：

- **プレビューURL**: `https://your-project.pages.dev`
- **カスタムドメイン**: `https://dbu-ekiden.com`

## 🔄 自動デプロイ

`main`ブランチにpushすると、自動的にビルドとデプロイが実行されます。

デプロイの状態はCloudflare Pagesのダッシュボードで確認できます。
