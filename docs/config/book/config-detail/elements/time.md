# 时间

## 说明

时间允许用户选择一个时间。

## 示例

```json
{
    "id": "time",
    "name": "时间",
    "type": "time",
    "min": "09:00:00",
    "max": "18:00:00"
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
min | 最小日期 | String | ''
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
type | 类型 | String | 'time'
vip | 是否为付费功能 | Boolean | false