# disabled属性的计算

## 说明

每个`page`、`module`、`element`在运行时都会计算一个名为`disabled`的属性，当该属性为true时，该项将不可编辑。

## 计算方法

参考值有两个来源，当其中一项计算为true时，则disabled属性为true：

属性名称 | 说明
:----- | :---
dependencies | 依赖属性，当其中包含action为disabled的依赖对象，并达成依赖条件时，该项disabled计算为true。关于依赖属性的计算，请参考[依赖属性](./dependency.html)一节。
dynamic | 动态编辑，当该活动已发布，并且dynamic属性设置为false时，该项disabled计算为true。