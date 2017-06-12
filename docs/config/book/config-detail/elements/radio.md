# 单选按钮

## 说明

单选按钮允许用户选择一个选项。

## 示例

```json
{
    "id": "radio",
    "name": "游戏难度",
    "options": [
        {
            "value": "easy",
            "text": "简单"
        },
        {
            "value": "normal",
            "text": "普通"
        },
        {
            "value": "hard",
            "text": "困难"
        }
    ],
    "type": "radio"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
name | 名称 | String | ''
options | 选项 | Array | []
type | 类型 | String | 'radio'
vip | 是否为付费功能 | Boolean | false

## 附录

#### 1.选项内容

属性 | 说明 | 类型
:-- | :-- | :--
text | 展示文本 | String
value | 选项的值 | Any

选项示例：

```
{
    "value": "easy",
    "text": "简单"
}
```
