# 依赖属性

## 示例：

```
{
    "id": "picture",
    "name": "图片",
    "type": "picture",
    "description": "图片描述",
    "format": ["jpg"],
    "dependencies": [{
        "action": "disabled",
        "path": "dist.number.value",
        "expect": "20.00",
        "description": "只有数值为20时才可编辑"
    }]
}
```

## 说明

每个`page`、`module`或`element`都可以添加自己的依赖属性。其中`dependencies`为数组类型，其中每一个元素都是单独的依赖对象。

## 依赖对象

名称 | 说明 | 类型
:--- | :--- | :---
action | 当依赖条件满足时执行的操作名称 | String
path | 依赖的值的路径，以`.`连接 | String
expect | 依赖的期望值，当从`path`获取到的值与此值完全相等时，即满足依赖条件。 | String
notNull | 非空，当从`path`获取到的值不为空时，即满足依赖条件。 | Boolean

## 可选的依赖操作

操作名称 |  说明
:---    | :---
show    |  显示，当满足条件才进行显示该项。
disabled |  禁止编辑，当满足条件时禁止编辑该项。

## 并列条件

dependencies为数组类型，表示一个`page`、`module`或`element`可添加多个依赖对象，例如同时使用show和disabled的依赖。同时，可以设置多个依赖对象的action是同一个，意味着需要多个依赖条件达成才会执行该action。

现有下列依赖：

```
"dependencies": [{
    "action": "disabled",
    "path": "dist.number.value",
    "expect": "20.00"
}， {
    "action": "disabled",
    "path": "dist.title.value",
    "expect": "小恐龙"
}]
```

则对应达成依赖的条件可翻译成：

```
dist.number.value === "20.00" && dist.title.value === "小恐龙"
```