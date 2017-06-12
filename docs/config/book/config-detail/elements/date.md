# 日期

## 说明

日期允许用户选择一个日期。

## 示例

```json
{
    "id": "date",
    "name": "日期",
    "type": "date",
    "max": "2017-05-05"
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
min | 最小日期 | String | ''
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
type | 类型 | String | 'date'
unit | 单位（day-天，month-月，year-年） | String | ''
vip | 是否为付费功能 | Boolean | false