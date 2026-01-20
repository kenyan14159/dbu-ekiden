# Cloudflare Pages トラブルシューティング: "Hello world" が表示される問題

## 🔍 問題の症状

`https://dbu-ekiden.com/` にアクセスすると「Hello world」としか表示されない。

## ✅ 確認すべき設定

Cloudflare Pagesのダッシュボードで以下の設定を確認してください：

### 1. ビルド設定の確認

**Settings** → **Builds & deployments** で以下を確認：

| 設定項目 | 正しい値 | 確認方法 |
|---------|---------|---------|
| **Framework preset** | `Next.js (Static HTML Export)` | ドロップダウンで選択 |
| **Build command** | `npm run build` | テキストフィールド |
| **Build output directory** | `out` ⚠️ **重要** | テキストフィールド |
| **Root directory** | `/` または 空欄 | テキストフィールド |
| **Node.js version** | `20` | ドロップダウンで選択 |
| **Deploy command** | `echo "Deploying static site..."` または `true` | テキストフィールド |

⚠️ **最も重要**: 「Build output directory」が `out` に設定されているか確認してください。

### 2. ビルドログの確認

1. Cloudflare Pagesのダッシュボードで最新のデプロイを開く
2. 「Build logs」タブを確認
3. 以下のメッセージが表示されているか確認：
   ```
   ✓ Generating static pages using 1 worker (20/20)
   Route (app)
   ┌ ○ /
   ├ ○ /about
   ...
   ```
4. ビルドが成功しているか確認

### 3. デプロイされたファイルの確認

ビルドログの最後に、デプロイされたファイルのリストが表示されます。`index.html`が`out`ディレクトリに含まれているか確認してください。

## 🔧 解決方法

### 方法1: 設定を修正

1. Cloudflare Pagesのダッシュボードを開く
2. プロジェクトを選択
3. **Settings** → **Builds & deployments** を開く
4. 以下の設定を確認・修正：
   - **Build output directory**: `out` に設定
   - **Root directory**: `/` または空欄
   - **Deploy command**: `echo "Deploying static site..."` または `true`
5. **Save** をクリック
6. **Retry deployment** をクリックして再デプロイ

### 方法2: 手動でデプロイを確認

ローカルでビルドして、正しく生成されているか確認：

```bash
# 1. ビルド
npm run build

# 2. out/index.htmlが存在するか確認
ls -la out/index.html

# 3. out/index.htmlの内容を確認（最初の数行）
head -20 out/index.html
```

`out/index.html`に正しいHTMLが含まれているはずです。

### 方法3: デプロイを再実行

1. Cloudflare Pagesのダッシュボードで最新のデプロイを開く
2. **Retry deployment** をクリック
3. ビルドログを確認して、エラーがないか確認

## 🚨 よくある間違い

### ❌ 間違い1: Build output directoryが間違っている

```
Build output directory: dist  ← 間違い
Build output directory: build  ← 間違い
```

```
Build output directory: out  ← 正しい
```

### ❌ 間違い2: Root directoryが間違っている

```
Root directory: /app  ← 間違い（通常は不要）
Root directory: /src  ← 間違い（通常は不要）
```

```
Root directory: /  ← 正しい（または空欄）
```

### ❌ 間違い3: Deploy commandが間違っている

```
Deploy command: npx wrangler deploy  ← 間違い（エラーになる）
Deploy command: wrangler pages deploy  ← 間違い
```

```
Deploy command: echo "Deploying static site..."  ← 正しい
Deploy command: true  ← 正しい（より簡潔）
```

## 📋 チェックリスト

- [ ] Build output directory が `out` に設定されている
- [ ] Root directory が `/` または空欄に設定されている
- [ ] Deploy command が `echo "Deploying static site..."` または `true` に設定されている
- [ ] ビルドログで `out` ディレクトリが生成されている
- [ ] ビルドログで `index.html` が生成されている
- [ ] デプロイが成功している（エラーがない）

## 🔄 再デプロイ手順

1. Cloudflare Pagesのダッシュボードを開く
2. プロジェクトを選択
3. **Settings** → **Builds & deployments** で設定を確認
4. 設定を修正（必要に応じて）
5. **Save** をクリック
6. **Deployments** タブに戻る
7. **Retry deployment** をクリック
8. ビルドログを確認

設定を修正後、再デプロイを実行してください。
