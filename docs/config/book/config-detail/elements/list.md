# 列表

## 说明

列表是一组元素的集合，每个元素都使用同样的配置。

## 示例

```json
{
    "id": "gameAssets",
    "name": "游戏素材",
    "type": "list",
    "minLength": 7,
    "maxLength": 7,
    "itemConfig": {},
    "itemType": "picture",
    "kvmode": true
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: []}
dynamic | 发布后是否可修改 | Boolean | true
itemConfig | 子项配置 | Object | {}
itemType | 子项类型 | String | 'input'
kvmode | 键值模式 | Boolean | false
maxLength | 最大长度（0代表不生效） | Number | 0
minLength | 最小长度（0代表不生效） | Number | 0
name | 名称 | String | ''
type | 类型 | String | 'list'
vip | 是否为付费功能 | Boolean | false

## 值示例

```json
{
    "gameAssets": {
        "value": [
            {
                "key": "背景",
                "value": "//24haowan-cdn.shanyougame.com/downhill/assets/images/bg.png"
            },
            {
                "key": "主角图片",
                "value": "//24haowan-cdn.shanyougame.com/downhill/assets/images/cat.png"
            },
            {
                "key": "障碍物",
                "value": "//24haowan-cdn.shanyougame.com/downhill/assets/images/barrier.png"
            },
            {
                "key": "方块左侧",
                "value": "//24haowan-cdn.shanyougame.com/downhill/assets/images/left.png"
            },
            {
                "key": "方块右侧",
                "value": "//24haowan-cdn.shanyougame.com/downhill/assets/images/right.png"
            },
            {
                "key": "方块顶部",
                "value": "//24haowan-cdn.shanyougame.com/downhill/assets/images/top.png"
            },
            {
                "key": "奖励图片",
                "value": "//24haowan-cdn.shanyougame.com/downhill/assets/images/score.png"
            }
        ]
    }
}
```

## 附录

#### 1. 目前支持的子项类型

- input 单行文本
- textarea 文本域
- picture 图片
- gift 奖品