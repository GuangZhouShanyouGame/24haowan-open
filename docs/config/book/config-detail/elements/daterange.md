# 日期范围

## 说明

日期范围允许用户选择一个起始日期和结束日期。

## 示例

```json
{
    "id": "daterange",
    "name": "日期范围",
    "type": "daterange",
    "min": "2017-05-01",
    "max": "2017-05-30"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
format | 日期格式 | String | 'yyyy-MM-dd'
max | 最大日期 | String | ''
maxLength | 最大长度（单位：秒，0代表不生效） | Number | 0
min | 最小日期 | String | ''
minLength | 最小长度（单位：秒，0代表不生效） | Number | 0
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
type | 类型 | String | 'daterange'
unit | 单位（day-天，month-月，year-年） | String | ''
vip | 是否为付费功能 | Boolean | false