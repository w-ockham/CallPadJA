# CallPadJA
日本国内のコールサイン入力用キーパッドです。
## 使い方
呼び出し方は以下の通りです。
```HTML
  <script src="./CallPadJA.js"></script>
  <div id="example"></div>
  <script>
  $("#example").keypad({width:300,height:100,candidates:15})
  </script>
```
パラメータ`width`でキーの幅(デフォルト300px)を、`height`で高さ(デフォルト100px)を指定します。

パラメータ`candidates`で、[総務省無線局等情報検索Web-API](https://www.tele.soumu.go.jp/j/musen/webapi/)を使ったコールサイン検索の候補数の最大値(デフォルト20)を指定します。
