# 数字

## 说明

数字允许用户输入一个数字，可设定最小、最大值、精度等。

## 示例

```json
{
    "id": "gameTime",
    "name": "游戏时间",
    "type": "number",
    "min": 10,
    "max": 30,
    "placeholder": "请输入游戏时间，最小10，最大30",
    "suffix": "秒",
    "description": "游戏时间内尽可能得分游戏时间内尽可能得分",
    "accuracy": 2
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
accuracy | 精度，保留几位小数 | Number | 0
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
max | 最大值，0表示不生效 | Number | 0
min | 最小值，0表示不生效 | Number | 0
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
prefix | 前缀，例如“第” | String | ''
suffix | 后缀，例如“个” | String | ''
type | 类型 | String | 'number'
vip | 是否为付费功能 | Boolean | false
