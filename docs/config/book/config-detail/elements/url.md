# URL

## 说明

URL允许用户输入一个链接以及选择协议等。

## 示例

```json
{
    "id": "gameLink",
    "name": "分享链接",
    "type": "url",
    "placeholder": "请输入分享链接",
    "protocols": [
        "http://",
        "https://"
    ]
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
protocols | 可选的协议类型 | Array | ['http://']
type | 类型 | String | 'url'
vip | 是否为付费功能 | Boolean | false