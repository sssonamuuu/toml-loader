能够生成 `typescript` 类型声明的 `toml-loader`

``` bash
npm install @front-end-club/toml-loader
```

`webpack` 配置

``` javascript
{
  test: /\.toml$/,
  use: {
    loader: '@front-end-club/toml-loader',
    options: { typescript: true },
  },
},
```

## 参数

|参数|默认值|说明|
|:--|:--|:--|
|typescript|false|是否生成 `typescript` 类型声明|