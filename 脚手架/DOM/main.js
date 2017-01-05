/* 游戏管理器 */
var Game = function(bestScore, config, domId) {
    this.bestScore = bestScore || 0;
    this.config = config;
    this.domId = domId || '';
};
/* 游戏属性 */
Game.prototype = {
    // 得分
    score: 0,
    // 最高得分
    bestScore: 0,
    // 初始化标记
    isInit: false,
    // 插入的domId
    domId: null,
    // 设备信息
    device: {
        type: null,
        platform: null,
        width: 0,
        height: 0
    },
    // 游戏DOM内容，方便重置游戏（即game_div里面的内容）
    gameContent: null,
    // 音频集合
    audios: {},
    // 图片集合
    imgs: {},

    // 初始化-设备信息
    initDevice: function() {
        this.device.width = game_width;
        this.device.height = game_height;
        if (game_width > game_height) {
            this.device.width = game_height;
            this.device.height = game_width;
        }
        this.device.platform = (navigator.userAgent.toLowerCase().indexOf('android') < 0) ? 'apple' : 'android';
        this.device.type = (this.device.width > 700) ? 'pad' : 'mobile';
    },

    // 初始化-游戏
    init: function() {
        /**
         * 上线用
         * 显示加载页面
         */
        // hwsdk.showLoadingPage();

        // 初始化设备信息
        this.initDevice();

        // 设置初始化标记
        this.isInit = true;

        // 进入加载场景
        this.load();
    },

    // State - load
    // 加载场景
    load: function() {
        // Game实例（用于闭包）
        var self = this;

        /**----------------------------
         * 加载资源示例
         * 按需要参考下面的示例进行资源的加载
        ------------------------------ */
        // 游戏资源集合，详情参考配置表
        // var config = this.config['game'];

        // 图片资源集合
        // this.imgs = {
        //     bg: config["bg"],
        //     baozi: config["baozi"]
        // };

        // 音频资源集合
        // var audioList = {
        //     bg: config["music_bg"],
        //     eat: config["music_eat"]
        // };
        // if (this.device.platform == "android") { // 大部分Android在浏览器中不支持多个音频同时播放，因此只加载一个音效
        //     audioList = {
        //         bg: config['music_bg']
        //     };
        // }
        
        // 资源数
        // var currentLoadedAssets = 0; // 当前加载资源数
        // var totalImgs = Object.keys(this.imgs).length; // 总共图片数量
        // var totalAudios = (this.device.platform == "android") ? 1 : Object.keys(audioList).length; // 总共音频数量
        // var totalAssets = totalImgs + totalAudios; // 总资源数

        // 开始加载资源
        // loadImg();
        // loadAudio();
        
        /**
         * 上线用
         * 平台要求加载页至少显示3秒，3秒后进入准备场景
         */
        // var loadingLock = true;
        // setTimeout(function() {
        //     loadingLock = false;
        //     setTimeout(function() {
        //         self.create();
        //     }, 500);
        //     // 设置通用加载页进度条进度
        //     var progress = 100;
        //     hwsdk.configLoadingPage({progress: progress});
        // }, 3000);

        // 加载图片方法
        function loadImg() {
            for (var index in this.imgs) {
                // 判断是否为纯色背景
                if (this.imgs[index].indexOf("#") != 0) { // 图片资源
                    var img = new Image();
                    img.onload = img.onerror = loadDone;
                    img.src = this.imgs[index];
                } else { // 纯色背景
                    ++currentLoadedAssets;
                }
            }
        }

        // 加载音频方法
        function loadAudio() {
            for (var index in audioList) {
                this.audios[index] = new Audio();
                this.audios[index].addEventListener("canplaythrough", loadDone, false);
                this.audios[index].src = audioList[index];
                this.audios[index].load();
            }
        }
        
        // 加载资源完成回调
        function loadDone() {
            // 音频可能会多次触发
            if (this.tagName === "AUDIO") this.removeEventListener("canplaythrough", loadDone);
            ++currentLoadedAssets;
            if (currentLoadedAssets <= totalAssets) {
                // 设置通用加载页进度条进度
                var progress = 100 * currentLoadedAssets / totalAssets;
                hwsdk.configLoadingPage({progress: progress});
            }
        }

        /**
         * 本地开发用，上线时请删除
         */
        // 加载完毕，进入准备场景
        this.create();
    },

    // State - create
    // 准备场景
    create: function() {
        /**----------------------------
         * 游戏元素的初始化逻辑写在这里
        ---------------------------- */
        // 示例：设置游戏背景
        // if (this.imgs.bg.indexOf('#') == 0) {
        //     $("#game_div").css("background-color", this.imgs.bg);
        // } else {
        //     $("#game_div").css("background-image", 'url(' + this.imgs.bg + ')');
        // }

        // 设置游戏内容（方便后面重置）
        this.gameContent = $("#" + this.domId).html();

        /**
         * 上线用
         */
        // 隐藏加载页面，显示开始页面，悬浮按钮
        // hwsdk.hideLoadingPage().showStartPage().showPageBtn();
        // // 工作台特殊处理
        // if (skip) { // 工作台
        //     gameManager.play();
        // } else { // 正常游戏
        //     hwsdk.showBox();
        // }

        /**
         * 本地开发用，上线时请删除
         */
        // 准备完毕，进入游戏场景
        this.play();
    },

    // State - play
    // 游戏场景
    play: function() {
        /**----------------------------
         * 游戏逻辑写在这里
        ---------------------------- */
        // 在游戏结束的时候，执行gameover方法
        // this.gameover();

        console.log("play");
    },

    // State - end
    // 结束场景
    end: function() {
        this.reset();
    },

    // 游戏结束
    gameover: function() {
        /**
         * 上线用
         * 游戏结束后调用hwsdk的接口进行数据的提交等
         */
        // if (skip) { // 工作台不提交数据，继续循环游戏
        //     this.end();
        //     this.replay();
        // } else {
        //     /**
        //      * 调用得分接口示例
        //      */
        //     // 提交分数
        //     hwsdk.requestGameScore({
        //         'game_score': score,
        //         'game_id': game_info['game_id'],
        //         'device_type': self.device.platform
        //     }, function() {
        //      // 提交分数后的回调操作
        //         // 显示结束页，悬浮按钮，弹框
        //         hwsdk.showOverPage().showPageBtn().showBox();
        //     });
        //     // 设置微信分享参数
        //     // 1.获取微信分享参数对象，具体属性请查看HWSDK文档
        //     var wxObj = hwsdk.getWxShareObj();
        //     // 2.游戏分享链接后添加得分参数（分享登录页用）
        //     wxObj.link = wxObj.link + "?score="+score;
        //     // 3.正则匹配替换{score}为游戏的得分，注：如果为通关类的游戏，则替换{level}
        //     var reg = /\{score\}/ig;
        //     if (score != 0) {
        //         wxObj["title"] = wxObj["title"].replace(reg, function(){return score});
        //         wxObj["desc"] = wxObj["desc"].replace(reg, function(){return score});
        //     }
        //     // 4.设置微信分享参数
        //     hwsdk.setWxShare(wxObj, score);

        //     /**
        //      * 调用抽奖接口示例
        //      */   
        //     // 抽奖
        //     hwsdk.requestLottery(null, function(result) {
        //         // 判断是否中奖
        //         if (result && result != "empty") { // 已中奖
        //             var giftImg = result['lottery'].img; // 获得的奖品图片
        //             var giftName = result['lottery'].name; // 获得的奖品名称
        //          // 设置微信分享参数
        //          // 1.获取微信分享参数对象，具体属性请查看HWSDK文档
        //             var wxObj = hwsdk.getWxShareObj();
        //             // 2.游戏分享链接后添加奖品图片和名称的参数（分享登录页用）
        //             wxObj.link = wxObj.link + "?banner_img="+giftImg+"&gift_name="+giftName;
        //             // 3.正则匹配替换{result}为抽奖的结果（奖品名称）
        //             var reg = /\{result\}/ig;
        //             wxObj["title"] = wxObj["title"].replace(reg, function(){return giftName});
        //             wxObj["desc"] = wxObj["desc"].replace(reg, function(){return giftName});
        //             // 4.设置微信分享参数
        //             hwsdk.setWxShare(wxObj, 1);
        //         }
        //         // 显示结束页，悬浮按钮，弹框
        //         hwsdk.showOverPage().showPageBtn().showBox();
        //     });

        //     // 示例：进入结束场景
        //     game.state.start("end");
        // }
    },

    // 重置游戏数据和dom结构
    reset: function() {
        // 直接把内容替换掉
        $("#" + this.domId).children().remove();
        $("#" + this.domId).html(this.gameContent);
    },

    // 再玩一次
    replay: function() {
        this.play();
    }
}

/**
 * 本地开发用，上线时请删除
 */
var game_width = window.innerWidth; // 游戏窗口宽度
var game_height = window.innerHeight; // 游戏窗口高度
var gameManager = new Game(null, null, "game_div");
gameManager.init(); // 初始化游戏
