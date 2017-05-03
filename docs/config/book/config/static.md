# 静态配置 static

## 说明

`static`中存放的数据是静态配置，是用户不可配置的数据。

## 注意事项

`validateConfig`为开发者自定义验证文件的路径。当开发者定义了自定义验证方法时，`validateConfig`是必须的。

## 示例

```json
{
    "static": {
        "author": "Vincent",
        "banner": "XXX.png",
        "desc": "小恐龙快闪是一款躲避游戏",
        "version": "1.0.4",
        "name": "小恐龙快闪",
        "tags": "分数|闪躲|手速",
        "validateConfig": "/example/validateConfig.js",
        "marketing": {
            "rank": {
                "optional": true
            },
            "auth": {
                "optional": true
            },
            "lottery": {
                "optional": false
            }
        }
    }
}
```

## 配置细项

字段名称           | 说明                                            | 类型     | 必须
:------------- | :-------------------------------------------- | :----- | :-
author         | 模板作者                                          | String | 是
banner         | 横幅链接地址                                        | String | 是
desc           | 模板说明                                          | String | 是
version        | 模板版本                                          | String | 否
name           | 模板名称                                          | String | 是
tags           | 模板标签（以竖线分割）                                   | String | 是
validateConfig | 开发者自定义验证脚本的路径，[查看详细说明](../custom-validate.md) | String | 否
marketing      | 营销模块，详情请查看[营销模块](../marketing/desc.md)        | Object | 否
service        | 公共服务，详情请查看[公共服务](../service/desc.md)          | Object | 否
