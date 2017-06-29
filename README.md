# danganronpa-flavored-label

### 使い方
DanganronpaFlavoredLabelクラスのインスタンスを作ってshow()を呼ぶだけです。
```javascript
var label = new DanganronpaFlavoredLabel();
label.show();
```
第1引数でテキストの中身を指定できます。また、第2引数でラベルにcssのオプションを与えることができます。
```javascript
var label = new DanganronpaFlavoredLabel("this is my label", {transform: "rotate(-20deg)"});
label.show();
```