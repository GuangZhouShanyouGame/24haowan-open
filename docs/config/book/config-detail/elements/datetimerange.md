# 日期时间范围

## 说明

日期时间范围允许用户选择起始日期时间和结束日期时间。

## 示例

```json
{
    "id": "datetimerange",
    "name": "日期时间范围",
    "type": "datetimerange",
    "min": "2017-05-01 00:00:00",
    "max": "2017-05-05 10:00:00",
    "minLength": "100000",
    "maxLength": "172800"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
format | 日期格式 | String | 'yyyy-MM-dd HH:mm:ss'
max | 最大日期 | String | ''
maxLength | 最大长度（单位：秒，0代表不生效） | Number | 0
min | 最小日期 | String | ''
minLength | 最小长度（单位：秒，0代表不生效） | Number | 0
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
type | 类型 | String | 'datetimerange'
vip | 是否为付费功能 | Boolean | false