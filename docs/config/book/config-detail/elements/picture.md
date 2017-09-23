# 图片

## 说明

图片允许用户从素材库选择并更改图片。

## 示例

```json
{
    "id": "picture",
    "name": "加载页图片",
    "type": "picture"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
fileSize | 文件大小（单位：KB） | Number | 1024
format | 可选的文件格式 | Array | ['png', 'jpg']
name | 名称 | String | ''
size | 图片尺寸建议 | Object | {width: 2000, height: 2000}
type | 类型 | String | 'picture'
vip | 是否为付费功能 | Boolean | false