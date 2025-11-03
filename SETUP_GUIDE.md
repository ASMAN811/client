# セットアップガイド

## 📥 インストール手順

### 1. リポジトリのクローン
```bash
git clone <your-repository-url>
cd client-management-system
```

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. アプリケーションの起動
```bash
npm start
```

ブラウザで `http://localhost:3000` が自動的に開きます。

## 🔑 初回ログイン（デモモード）

1. ログイン画面が表示されます
2. 以下のいずれかでログイン：

**管理者として試す:**
- メールアドレス: `admin@example.com`
- 権限: 管理者

**編集者として試す:**
- メールアドレス: `editor@example.com`
- 権限: 編集者

**担当者として試す:**
- メールアドレス: `sato@example.com`（サンプルデータと同じ）
- 権限: 担当者

3. 「ログイン」ボタンをクリック

## 👥 担当者プロフィールの編集

### 担当者権限でログインした場合

1. トップページで「担当者管理」をクリック
2. 自分のメールアドレスと一致する担当者をクリック
3. 「編集」ボタンが表示されます
4. プロフィールを更新して「更新」をクリック
5. 編集履歴が自動的に記録されます

### 管理者・編集者権限の場合

- 全ての担当者プロフィールを編集できます
- 新規担当者の登録も可能です

## 📋 新規担当者の登録

1. 管理者または編集者でログイン
2. 「担当者管理」→「新規担当者登録」
3. 必須項目を入力：
   - **メールアドレス**（ログインIDとして使用）
   - **氏名**
   - **ふりがな**
4. その他の項目を入力（任意）
5. 「登録」をクリック

## 🔐 権限の理解

### 管理者 (admin)
- 全ての機能にアクセス可能
- クライアント・担当者の追加・編集・削除
- システム全体の管理

### 編集者 (editor)
- クライアント情報の編集
- 担当者プロフィールの編集
- 新規担当者の登録
- 削除はできません

### 担当者 (staff)
- クライアント情報の閲覧
- **自分のプロフィールのみ編集可能**
- 他の担当者の情報は閲覧のみ

## 📝 編集履歴の確認

担当者詳細ページの上部に表示：
```
作成者: admin@example.com (2025-11-03 10:30)
最終編集: sato@example.com (2025-11-03 14:45)
```

## 💾 データのバックアップ

1. トップページ右上の「バックアップ」ボタンをクリック
2. JSONファイルがダウンロードされます
3. 定期的にバックアップを取ることを推奨

## 🔄 データの復元

1. 「復元」ボタンをクリック
2. バックアップしたJSONファイルを選択
3. 確認ダイアログで「OK」をクリック

## 🚀 本番環境でのFirebase設定

### 前提条件
- Firebaseアカウント
- Googleアカウント

### 手順

#### 1. Firebaseプロジェクトの作成
1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: client-management-system）
4. Google Analyticsは任意で設定
5. プロジェクトを作成

#### 2. Google認証の有効化
1. プロジェクト > Build > Authentication をクリック
2. 「始める」をクリック
3. Sign-in method タブを選択
4. 「Google」を選択して有効化
5. プロジェクトのサポートメールを設定
6. 「保存」をクリック

#### 3. Firebase SDKのインストール
```bash
npm install firebase
```

#### 4. Firebase設定の取得
1. プロジェクト設定（歯車アイコン）をクリック
2. 「全般」タブで下にスクロール
3. 「アプリを追加」→「ウェブ」を選択
4. アプリのニックネームを入力
5. Firebase SDKの設定をコピー

#### 5. 設定ファイルの更新
`src/config/firebaseConfig.js` を開いて、以下を実際の値に置き換え：
```javascript
const firebaseConfig = {
  apiKey: "実際のAPI_KEY",
  authDomain: "実際のAUTH_DOMAIN",
  projectId: "実際のPROJECT_ID",
  storageBucket: "実際のSTORAGE_BUCKET",
  messagingSenderId: "実際のMESSAGING_SENDER_ID",
  appId: "実際のAPP_ID"
};
```

#### 6. AuthContext.jsの書き換え
`src/contexts/AuthContext.js` を Firebase Authentication用に書き換え：

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseConfig from '../config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// login関数を書き換え
const login = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = {
    email: result.user.email,
    displayName: result.user.displayName,
    // 権限はFirestoreなどで管理
  };
  setCurrentUser(user);
  return user;
};
```

#### 7. デプロイ
```bash
npm run build
```

生成された `build` フォルダをFirebase Hosting等にデプロイ

## 🐛 トラブルシューティング

### ログインできない
- ブラウザの開発者ツール（F12）でエラーを確認
- LocalStorageが有効か確認
- ブラウザのキャッシュをクリア

### 編集が保存されない
- 編集権限があるか確認（自分のプロフィールか？）
- ブラウザのコンソールでエラーを確認

### データが消えた
- LocalStorageをクリアしていないか確認
- バックアップから復元

### Firebase認証エラー
- Firebase Console で Google認証が有効か確認
- firebaseConfig.js の設定が正しいか確認
- ドメインがFirebase認証の許可リストに含まれているか確認

## 📞 サポート

問題が解決しない場合は、GitHubのIssueで報告してください。
