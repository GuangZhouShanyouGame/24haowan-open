# 模块配置

## 说明

模块是页面层级下的容器，在每个页面上按顺序显示。每个模块可包含一个或多个元素。

## 示例

```json
{
    "modules": [
        {
            "id": "base",
            "name": "基本信息",
            "icon": "icon-Game-page",
            "description": "这里是模块描述",
            "elements": []
        }
    ]
}
```

## 配置细项

字段名称     | 说明         | 类型   |  默认值   | 必须
:------- | :--------- | :------ | :-| :---
desc     | 模块描述       | String | `''` | 否
elements   | 元素集合      | Array  | `[]` | 否
icon     | 模块图标     | String | `''` | 否
id      | 模块的ID     | String | `''`  | 否
name     | 模块名称       | String | `''` | 是
optional | 显示启用/不启用选项 | Boolean | `false`| 否
