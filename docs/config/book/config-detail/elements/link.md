# 跳转链接

## 说明

跳转链接允许用户快速选择一个URL地址。

## 示例

```json
{
    "id": "link",
    "name": "跳转链接",
    "type": "link"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: {}}
dynamic | 发布后是否可修改 | Boolean | true
linkType | 链接类型 | String | 'activity'
name | 名称 | String | ''
type | 类型 | String | 'link'
vip | 是否为付费功能 | Boolean | false

## 附录

#### 1. 链接类型

- activity 平台活动链接