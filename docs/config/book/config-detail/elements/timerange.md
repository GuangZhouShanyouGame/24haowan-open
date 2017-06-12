# 时间范围

## 说明

时间范围允许用户选择起始时间和结束时间。

## 示例

```json
{
    "id": "timerange",
    "name": "时间范围",
    "type": "timerange",
    "min": "09:00",
    "max": "18:00"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
format | 日期格式 | String | 'HH:mm:ss'
max | 最大日期 | String | ''
maxLength | 最大长度（单位：秒，0代表不生效） | Number | 0
min | 最小日期 | String | ''
minLength | 最小长度（单位：秒，0代表不生效） | Number | 0
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
type | 类型 | String | 'timerange'
unit | 单位（day-天，month-月，year-年） | String | ''
vip | 是否为付费功能 | Boolean | false