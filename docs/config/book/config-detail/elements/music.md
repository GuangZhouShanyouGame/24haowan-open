# 音乐

## 说明

音乐允许用户播放音乐、下载音乐，上传音乐文件以及恢复成模板默认音乐。

## 示例

```json
{
    "id": "bgMusic",
    "name": "背景音乐",
    "type": "music",
    "formats": [
        ".mp3"
    ],
    "description": "背景音乐，大小不超过1M"
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: ''}
dynamic | 发布后是否可修改 | Boolean | true
fileSize | 文件大小（单位：KB） | Number | 1024
format | 可选的文件格式 | Array | ['mp3']
name | 名称 | String | ''
type | 类型 | String | 'music'
vip | 是否为付费功能 | Boolean | false