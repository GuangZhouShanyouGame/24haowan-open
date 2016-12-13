# 24haowan-workbench2.0
工作台 2.0版本
##Developer 开发者
####第一步 编写模板信息
```javascript
"static": {
    "author": "Vincent", // 作者
    "banner": "XXX.png", // 横幅图片
    "desc": "小恐龙快闪是一款躲避游戏", // 模板介绍
    "version": "1.0.4", // 模板版本
    "name": "小恐龙快闪", // 模板名称
    "tags": "分数|闪躲|手速" // 模板标签
}
```
####第二步 编写要暴露的值信息
```javascript
"dist": {
    "gameTitle": {
        "access": "public", // 可访问属性，public-公共
        "value": "小恐龙快闪"
    },
    "startBanner": {
        "access": "client", // 可访问属性，client-客户端
        "value": "banner.png"
    },
    "startBg": {
        "access": "client", // 可访问属性，client-客户端
        "value": "bg.png"
    },
    "maxScore": {
        "access": "server", // 可访问属性，server-服务端
        "value": 60
    }
}
```
####第三步 编写工作台控件信息
```javascript
"platform": {
    "elements": {
        "gameTitle": {
            "backgroundColor": "#000000",
            "color": "#FFFFFF",
            "copy": false,
            "desc": "活动的标题",
            "dynamic": true,
            "maxLength": 6,
            "minLength": 0,
            "name": "活动标题",
            "placeholder": "请输入活动标题，限制6个字符",
            "prefix": "",
            "rows": 1,
            "suffix": "",
            "type": "text"
        },
        "startBanner": {
            "desc": "开始页面的横幅",
            "dynamic": true,
            "format": "png",
            "maxHeight": "100",
            "maxSize": "1000",
            "maxWidth": "100",
            "name": "开始页横幅",
            "type": "picture"
        },
        "startBg": {
            "desc": "开始页面的背景",
            "dynamic": true,
            "format": "png",
            "maxHeight": "100",
            "maxSize": "1000",
            "maxWidth": "100",
            "name": "开始页背景",
            "pureColor": true,
            "type": "picture"
        }
    },
    "modules": {
        "pic-start": {
            "desc": "开始页面的图片",
            "elements": [
                "startBg",
                "startBanner"
            ],
            "name": "图片",
            "optional": false
        },
        "text-start": {
            "desc": "开始页的文本",
            "elements": [
                "gameTitle"
            ],
            "name": "图片",
            "optional": false
        }
    },
    "pages": [
        {
            "desc": "基本信息",
            "modules": [],
            "name": "基本信息"
        },
        {
            "desc": "加载页",
            "modules": [],
            "name": "加载页"
        },
        {
            "desc": "开始页",
            "modules": [
                "pic-start",
                "text-start"
            ],
            "name": "开始页"
        },
        {
            "desc": "活动页",
            "modules": [],
            "name": "活动页"
        },
        {
            "desc": "结束页",
            "modules": [],
            "name": "结束页"
        }
    ]
}
```
##Server 服务端
####开发者上传新模板（或更新）
- 将static中数据存储到数据库中

####运营人员使用模板
- 基于原始配置表复制一份新的配置表
- 在新的配置表中加入以下信息
```javascript
"info": {
    "lastModified": "2016-12-01 00:00:00",
    "version": "1.0.0"
}
```
- 保存配置表
- 生成游戏用配置表，过滤掉dist中客户端不可访问的数据，并且将工作台空间信息与模板信息去除
```javascript
{
	"dist": {
        "startBg": "bg.png",
        "startBanner": "banner.png",
        "gameTitle": "小恐龙快闪"
    },
    "info": {
        "lastModified": "2016-12-01 00:00:00",
        "version": "1.0.0"
    }
}
```
