# 奖品

## 说明

奖品允许用户创建一个奖品或从奖品列表中选择一个奖品。

## 示例

```json
{
    "id": "gift",
    "name": "奖品",
    "type": "gift"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: null}
dynamic | 发布后是否可修改 | Boolean | true
name | 名称 | String | ''
type | 类型 | String | 'gift'
vip | 是否为付费功能 | Boolean | false