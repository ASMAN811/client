# 📦 クライアント管理システム v2.0 - ダウンロード

## ✅ ダウンロード可能なファイル

### 🎁 推奨: ZIPファイル（全体）
**[client-management-system.zip をダウンロード](computer:///mnt/user-data/outputs/client-management-system.zip)** (50KB)

すべてのファイルが含まれています。ダウンロード後、解凍してください。

---

### 📄 個別ドキュメント

以下のファイルを個別にダウンロードできます：

1. **[CHANGELOG.md](computer:///mnt/user-data/outputs/CHANGELOG.md)** - 変更履歴（v2.0の全変更内容）

2. **[README_PROJECT.md](computer:///mnt/user-data/outputs/README_PROJECT.md)** - プロジェクト概要・使い方

3. **[SETUP_GUIDE.md](computer:///mnt/user-data/outputs/SETUP_GUIDE.md)** - 詳細セットアップ手順

4. **[DOWNLOAD_GUIDE.md](computer:///mnt/user-data/outputs/DOWNLOAD_GUIDE.md)** - このガイド

---

### 🗜️ 代替: tar.gzファイル
**[client-management-system.tar.gz をダウンロード](computer:///mnt/user-data/outputs/client-management-system.tar.gz)** (28KB)

Mac/Linuxユーザー向け。

---

## 🚀 セットアップ手順

### 1. ダウンロード
上記のZIPファイルをダウンロード

### 2. 解凍
```bash
# Windowsの場合
# エクスプローラーで右クリック → 「すべて展開」

# Mac/Linuxの場合
unzip client-management-system.zip
```

### 3. インストール
```bash
cd client-management-system
npm install
```

### 4. 起動
```bash
npm start
```

ブラウザで `http://localhost:3000` が自動的に開きます。

---

## 📋 含まれるファイル

```
client-management-system/
├── README.md              ← プロジェクト概要
├── CHANGELOG.md           ← 変更履歴
├── SETUP_GUIDE.md         ← セットアップ手順
├── package.json           ← パッケージ設定
├── .gitignore            ← Git設定
├── public/
│   └── index.html
└── src/
    ├── App.js            ← メインアプリ
    ├── index.js
    ├── index.css
    ├── components/       ← 全コンポーネント（14ファイル）
    ├── contexts/         ← 認証システム
    ├── config/           ← Firebase設定
    └── utils/            ← ユーティリティ（5ファイル）
```

---

## 🎯 初回ログイン

アプリ起動後：

1. ログイン画面が表示されます
2. 以下のいずれかを入力：
   - **管理者**: `admin@example.com`
   - **編集者**: `editor@example.com`
   - **担当者**: `sato@example.com`
3. 権限を選択
4. 「ログイン」をクリック

---

## 💡 主な機能

### ✨ v2.0の新機能
- 🔐 Gmailログイン機能
- 👥 権限管理（管理者・編集者・担当者）
- 📝 編集履歴の自動記録
- 🧑‍💼 担当者による自己プロフィール編集
- 📋 11項目の拡張プロフィール

### 📊 既存機能
- クライアント管理
- セッション記録
- 統計情報
- データエクスポート（CSV）
- バックアップ・復元（JSON）

---

## ⚠️ 必要な環境

- **Node.js v14以上**
- **npm または yarn**

確認方法：
```bash
node -v
npm -v
```

---

## 🆘 トラブルシューティング

### ダウンロードできない
1. ブラウザのポップアップブロックを無効化
2. 右クリック →「名前を付けて保存」
3. 別のブラウザで試す

### 解凍できない
- **Windows**: 7-Zip または WinRAR
- **Mac**: The Unarchiver

### npm installでエラー
```bash
# キャッシュをクリア
npm cache clean --force

# 再インストール
rm -rf node_modules
npm install
```

### 起動時のエラー
```bash
# ポート3000が使用中の場合
PORT=3001 npm start
```

---

## 📞 サポート

問題が解決しない場合：
- GitHubのIssueで報告
- README.mdを確認
- SETUP_GUIDE.mdの詳細手順を参照

---

## 🎨 カラーテーマ

水色（cyan）ベースの爽やかなデザイン

---

## 📄 ライセンス

MIT License

---

**作成日**: 2025年11月4日  
**バージョン**: 2.0.0  
**認証機能**: ✅ 実装済み  
**権限管理**: ✅ 実装済み
