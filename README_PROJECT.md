# クライアント管理システム v2.0

Gmail認証・権限管理・担当者自己編集機能を備えた統合管理システム

## 🎯 新機能（v2.0）

### 🔐 認証・権限管理
- **Gmailログイン**（デモ版では簡易実装）
- **3段階権限**: 管理者・編集者・担当者
- **編集履歴**: 誰がいつ編集したか自動記録
- **自己編集**: 担当者は自分のプロフィールのみ編集可能

### 📋 担当者プロフィール拡張
- メールアドレス（ログインID）
- 氏名・ふりがな・生年月日
- 居住地・連絡先（電話・LINE）
- **姉妹兄弟構成・家族構成**（NEW）
- **DNA歴**（更新）
- **職業経歴**（詳細記述対応）
- **公的な資格**
- **稼働可能時間**（NEW）
- **自身の使命**（NEW）
- **その他**（NEW）

## 👤 権限システム

| 機能 | 管理者 | 編集者 | 担当者 |
|------|--------|--------|--------|
| クライアント管理 | ✅ | ✅ | 閲覧のみ |
| 担当者新規登録 | ✅ | ✅ | ❌ |
| 全担当者編集 | ✅ | ✅ | ❌ |
| 自己プロフィール編集 | ✅ | ✅ | ✅ |
| 担当者削除 | ✅ | ❌ | ❌ |

## 🚀 クイックスタート

```bash
# インストール
git clone <repository-url>
cd client-management-system
npm install

# 起動
npm start
```

ブラウザで `http://localhost:3000` を開く

## 📖 使い方

### 1. ログイン
- メールアドレスを入力（デモ版ではどのアドレスでも可）
- 権限を選択（管理者・編集者・担当者）
- 「ログイン」をクリック

### 2. 担当者プロフィール編集
**担当者の場合：**
1. 「担当者管理」→ 自分の名前をクリック
2. 「編集」ボタンで各項目を更新
3. 保存すると編集履歴が自動記録

**管理者・編集者の場合：**
- 全ての担当者プロフィールを編集可能

### 3. 編集履歴の確認
プロフィール詳細画面の上部に表示：
- 作成者と作成日時
- 最終編集者と編集日時

## 🔧 本番環境でのFirebase設定

### 手順
1. [Firebase Console](https://console.firebase.google.com/) でプロジェクト作成
2. Authentication > Google を有効化
3. `npm install firebase`
4. `src/config/firebaseConfig.js` に設定を記入
5. `src/contexts/AuthContext.js` をFirebase Auth用に書き換え

詳細は `src/config/firebaseConfig.js` を参照

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── Login.js              # ログイン画面（NEW）
│   ├── StaffForm.js          # 新項目対応（更新）
│   ├── StaffDetail.js        # 編集履歴表示（更新）
│   └── ...
├── contexts/
│   └── AuthContext.js        # 認証管理（NEW）
├── config/
│   └── firebaseConfig.js     # Firebase設定（NEW）
├── utils/
│   └── staffStorageUtils.js  # 編集履歴機能（更新）
└── App.js                     # 認証統合（更新）
```

## 💾 データ保存

- **クライアント**: `clientManagementData`
- **担当者**: `staffManagementData`
- **認証情報**: `currentUser`

全てLocalStorageに保存（デモ版）

## ⚠️ セキュリティ注意

**デモモード（現在）:**
- パスワード認証なし
- 本番環境では使用しないでください

**本番環境:**
- Firebase Authenticationを使用
- HTTPS必須
- 適切なセキュリティルール設定

## 📝 変更履歴

### v2.0.0 (2025-11-03)
- ✨ Gmail認証機能
- ✨ 権限管理システム
- ✨ 担当者プロフィール拡張（11項目）
- ✨ 編集履歴自動記録
- ✨ 自己編集機能

### v1.0.0
- 初期リリース

## 📄 ライセンス

MIT License
