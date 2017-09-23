# 运行配置 dist

## 说明

dist中存放的数据是运行配置，用户可以通过工作台修改这些配置。模板运行所需要的所有配置的值都存储在这一部分。<br>

## 关于键值对的key的命名

定义的值的key没有规定，开发者可自由命名。（如示例中的gameTitle，改成title也没有影响。）

## 关于键值对的值的格式

其中`value`是元素最主要的值，例如输入框的value对应的是文本。而其他配置，则会使用其他key来对应，例如背景颜色，则是`backgroundColor`。

键值对的值必须是对象类型，这也是为了以后可以很好地进行扩展。

```json
{
    "key": {
        "value": "...",
        "property1": "...",
        "property2": "..."
    }
}
```

## 示例

```json
{
    "dist": {
        "gameTitle": {
            "value": "小恐龙快闪",
            "backgroundColor": "#000000",
            "color": "#FFFFFF"
        }
    }
}
```
