# 文本域

## 说明

文本域允许用户输入多行文本。

## 示例

```json
{
    "id": "textarea",
    "name": "文本域",
    "type": "textarea",
    "maxLength": 100
}
```

## 默认属性

属性 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
description | 描述 | String | ''
dist | 输出值 | Object | {value: '', backgroundColor: 'transparent', color: '#000000', align: 'left', fontWeight: 'normal', italic: false, underline: false, fontSize: 14}
dynamic | 发布后是否可修改 | Boolean | true
fontSizeOptions | 字体大小选项（单位：px） | Array | [14, 16, 18, 20, 24, 28, 36, 44, 60, 76, 100]
maxLength | 最大长度（0代表不生效） | Number | 0
minLength | 最小长度（0代表不生效） | Number | 0
name | 名称 | String | ''
placeholder | 输入提示 | String | ''
toolbar | 工具栏选项 | Array | ['fontSize', 'fontWeight', 'italic', 'underline', 'align', 'color', 'backgroundColor']
type | 类型 | String | 'textarea'
vip | 是否为付费功能 | Boolean | false

## 附录

#### 1.工具栏选项

当toolbar属性中，出现以下工具栏选项，分别对应会出现的工具是：

- fontSize 字体大小
- fontWeight 粗体
- italic 斜体
- underline 下划线
- align 对齐方式（左、中、右、两端）
- color 字体颜色
- backgroundColor 背景颜色