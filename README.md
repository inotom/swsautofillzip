# swsautofillzip.js

[zipcloud](http://zipcloud.ibsnet.co.jp/) の [郵便番号検索API](http://zipcloud.ibsnet.co.jp/doc/api) を利用した住所自動入力スクリプト。

## Usage

HTML 要素に指定の ID を追加して住所入力フォームを作成する。

"住所検索ボタン" が存在する場合はボタンクリックで検索し、
無い場合は "郵便番号入力フィールド" に完全な郵便番号が入力されると検索する。

### 必須要素

|**要素タイプ**|**ID**|**入力例**|
|--------------|------|----------|
|郵便番号入力フィールド|`swsautofillzip-zipcode`|`1000001`

### オプション要素

|**要素タイプ**|**ID**|**結果例**|
|--------------|------|----------|
|住所検索ボタン|`swsautofillzip-search`||
|都道府県入力フィールド|`swsautofillzip-prefecture`|東京都|
|市町村入力フィールド|`swsautofillzip-city`|千代田区|
|その他住所入力フィールド|`swsautofillzip-address`|千代田|
|半住所入力フィールド|`swsautofillzip-half-address`|千代田区千代田
|全住所入力フィールド|`swsautofillzip-full-address`|東京都千代田区千代田|
|メッセージ表示要素|`swsautofillzip-message`||

## License

MIT

## Author

iNo
