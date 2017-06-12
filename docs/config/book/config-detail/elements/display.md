# 展示标签

## 说明

展示标签使用单行文本展示信息，方便用户进行复制信息。

## 示例

```json
{
    "id": "link",
    "name": "链接地址",
    "type": "display",
    "content": "http://www.24haowan.com",
    "enableCopy": true
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
enableCopy | 是否允许被复制 | Boolean | false
description | 描述 | String | ''
dependencies | 依赖 | Array | []
dist | 输出值 | Object | {value: null}
name | 名称 | String | ''
type | 类型 | String | 'display'

