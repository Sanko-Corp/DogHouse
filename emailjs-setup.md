# EmailJS セットアップガイド

## 概要
このサイトでは、問い合わせフォームからのメール送信にEmailJSを使用しています。
以下の手順に従って、EmailJSを設定してください。

## セットアップ手順

### 1. EmailJSアカウントの作成
1. [EmailJS](https://www.emailjs.com/)にアクセス
2. 無料アカウントを作成（月200通まで無料）

### 2. メールサービスの設定
1. ダッシュボードから「Email Services」を選択
2. 「Add New Service」をクリック
3. Gmailを選択（または他のメールサービス）
4. サービスIDをメモ（例：`service_xxxxx`）

### 3. メールテンプレートの作成
1. 「Email Templates」を選択
2. 「Create New Template」をクリック
3. 以下の内容でテンプレートを作成：

**Subject:**
```
DogHouseシェアハウス - 新規お問い合わせ
```

**Content:**
```
新しいお問い合わせがありました。

【お名前】
{{from_name}}

【メールアドレス】
{{from_email}}

【電話番号】
{{phone}}

【ご興味のあるお部屋】
{{room_interest}}

【ペットの有無】
{{pet}}

【お問い合わせ内容】
{{message}}

---
このメールはDogHouseシェアハウスのウェブサイトから送信されました。
```

4. 「To Email」に`1supagety@gmail.com`を設定
5. テンプレートIDをメモ（例：`template_xxxxx`）

### 4. 公開キーの取得
1. 「Account」→「API Keys」を選択
2. Public Keyをコピー

### 5. JavaScriptファイルの更新
`js/main.js`の213行目を更新：

```javascript
// 変更前
emailjs.init("YOUR_PUBLIC_KEY");

// 変更後
emailjs.init("ここに公開キーを入力");
```

256-272行目のコメントアウトを解除し、以下を更新：

```javascript
emailjs.send('ここにサービスID', 'ここにテンプレートID', {
    to_email: '1supagety@gmail.com',
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    room_interest: formData.room_interest,
    pet: formData.pet,
    message: formData.message
})
```

### 6. テスト
1. ブラウザでサイトを開く
2. 問い合わせフォームに入力
3. 送信ボタンをクリック
4. `1supagety@gmail.com`にメールが届くことを確認

## 注意事項
- 無料プランでは月200通までの制限があります
- 本番環境では、セキュリティのためバックエンドサーバーを使用することを推奨します
- EmailJSの公開キーは、フロントエンドで表示されるため、悪用防止のためドメイン制限を設定してください

## トラブルシューティング
- メールが届かない場合は、EmailJSダッシュボードでログを確認
- ブラウザのコンソールでエラーメッセージを確認
- スパムフォルダも確認してください