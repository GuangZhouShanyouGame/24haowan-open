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
optional | 是否可选开启/关闭 | Boolean | `false`| 否

## 可选开启/关闭的作用

当一个模块是可选的时候，值的变化不会立即保存，需要点击模块下的确认才会把整个模块下的值一起保存。

如有以下模块配置：

```json
{
    "modules": [
        {
            "id": "mymodule",
            "name": "我的模块",
            "optional": true,
            "elements": [
                {
                    "id": "title",
                    "name": "标题",
                    "type": "input"
                },
                {
                    "id": "subTitle",
                    "name": "副标题",
                    "type": "input"
                }
            ]
        }
    ]
}
```

对应的dist结构应是：

```json
{
    "dist": {
        "mymodule": {
            "enable": false,
            "title": {
                "value": "这是标题"
            },
            "subTitle": {
                "value": "这是副标题"
            }
        }
    }
}
```

注意：其中的enable代表的是该模块有没有被启用，开发者可根据enable的值进行相应的处理。
