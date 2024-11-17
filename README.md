# 2025 quaint app
## 伝言
Nuxt3(フロントフレームワーク)
Vuetify(UIフレームワーク)
yarn(パッケージマネージャー)
→npmを使わないように気をつけて
eslint(developとmainにマージするようにチェックするようにgithub actionでworkflowを組んでおいた)
本当はcommitしたときにeslintのチェックいれるべきだと思うけどhuskyがnot in a git repositoryとかでて面倒だったので断念
こだわりがあったら後々直してください、、
prettier
→ファイル保存時にeslintとprettierは実行するようにした気がする
sidebase-nuxt-auth(認証用モジュール)
→パッケージをインストールしただけでセットアップしてないです

devcontainerとdocker composeの両方使えるようにしてあります
docker compose でコンテナ立ち上げるときはcloneして最初に起動するときはyarn installをするのを忘れないで。
→devcontainerのほうはコンテナ作成と同時にyarn installを自動でするようになってます

＜フォルダ解説＞
.github : github actionのworkflowが入ってます
.vscode : vscodeの設定と推薦する拡張機能を書いておきました。このリポジトリ開くと右下あたりにポップアップがでてくるはず
pages : nuxt2と同じ。フロントのいわゆるメインとなる部分です。.vueファイルを入れていくことになる
plugins : pluginの設定ようです。vuetifyを入れるためのファイルがあるのがわかると思います。
.node-version : nodeのバージョン書いてます。cloudflare pagesでデプロイするときにnodeのバージョン指定してもなんかうまく認識してくれなかったのでここにファイルとしておいてあります。
.prettierignore : prettierがコード整形しないファイルを記述する場所
.prettierrc : prettierの設定ファイル。好きなようにカスタマイズして
eslint.config.js : eslintの設定ファイル。自分で一からやるの面倒だったから適当なテンプレート読み込んであります。変数命名規則ぐらいは自分で作ったほうがいいよ
nuxt.config.ts : nuxt3の設定が書いてあるファイルです
package.json : モジュールの依存関係とか色々。詳しくは調べて
tsconfig.json : 調べてないから知らん。多分typescriptの設定を書いていく場所
yarn.lock : yarnが勝手に書いていく場所です。人の手で絶対に編集しないようにして

＜デプロイに関して＞
mainブランチの内容が毎日0時とpushされたときに自動でデプロイするようにしたはず。時間なさすぎて何も確認してないからエラー出るかも。少なくとも技術主任の人はcloudflare使って手動でデプロイする権限あるので自動でできてなかったら、組み直すか手でやってください。cloudflareのデプロイの設定はすでにしてあります

## ブランチの使い分け
main : 本番のコードをおいておく
develop : 開発用のコードをおいておく
その他 : 新しい機能を開発する

ということでつまり
1 developから新しくブランチを作って新しい機能を開発
2 developに新しい機能を作ったブランチをマージ
3 develop → main にマージ
という流れに統一してください

eslintとcloudflareのチェックがpull requestを作ると自動で行われるようになってます。よく確認してからマージしてください。

## これからやること
nuxt3用の認証モジュールはsidebase-nuxt-authを入れておきました。
これにした理由は推奨されていた３つのモジュールの中で一番有名だったから

moduleとしてnuxtにこのライブラリ読み込ませると、他のセットアップまで色々やるまでページが正しく動かなくなっちゃうっぽかったから、ライブラリインストールしただけでそれ以外のセットアップは僕は何もやってないです（セットアップまで全部やろうとするには時間がなさすぎた、すみません、、、、）。nuxt.config.tsのmoduleの欄を見ると僕がmoduleのsidebase-nuxt-authのインポートをコメントアウトしている部分が見つかると思います。

ということで一番はじめにやる必要があるのはこれのセットアップだと思います（整理券取るのにログイン正しくできなかったら大問題）。

みんな協力して頑張って！！