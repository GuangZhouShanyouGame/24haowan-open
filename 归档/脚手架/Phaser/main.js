/* 游戏管理器 */
var Game = function(bestScore, config, domId) {
	this.bestScore = bestScore || 0;
	this.config = config;
	this.domId = domId || '';
};
Game.prototype = {
	// 得分
	score: 0,
	// 最高得分
	bestScore: 0,
	// 初始化标记
	isInit: false,
	// 音乐管理器
	musicManager: null,
	// 游戏实例插入的domId
	domId: null,
	// 设备信息
	device: {
		type : null,
		platform : null,
		width : 0,
		height : 0
	},
	// 画布大小
	canvasSize : {
		width : 0,
		height : 0,
		ratio : 0
	},
	// Phaser游戏对象实例
	instance : null,
	// 是否已经播放过音乐了（Safari访问必须同步调用才能播放音乐）
	playedMusic: false,

	// 初始化-设备信息
	initDevice : function() {
		this.device.width = game_width;
		this.device.height = game_height;
		if (game_width > game_height) {
			this.device.width = game_height;
			this.device.height = game_width;
		}
		this.device.platform = (navigator.userAgent.toLowerCase().indexOf('android') < 0) ? 'apple' : 'android';
		this.device.type = (this.device.width > 700) ? 'pad' : 'mobile';
	},
	// 初始化-画布大小
	initCanvasSize : function() {
		if (game_width < game_height) {
			this.canvasSize.width = game_width * 2;
			this.canvasSize.height = game_height * 2;
			this.canvasSize.ratio = this.canvasSize.width/this.canvasSize.height;
		}
	},
	// 开始游戏时的播放音乐方法（Safari访问必须同步调用才能播放音乐）
	toPlayMusic: function() {
		if (!this.playedMusic) {
			this.musicManager.play("bg", true);
			this.playedMusic = true;
		}
	},
	// 初始化-游戏
	init : function() {
		/**
		 * 上线用
		 * 显示加载页面
		 */
		// hwsdk.showLoadingPage();

		// Game实例（用于闭包）
		var self = this;

		// 初始化设备信息
		this.initDevice();

		// 初始化画布大小
		this.initCanvasSize();

		// 设置初始化标记
		this.isInit = true;

		// 创建Phaser游戏实例
		this.instance = new Phaser.Game(this.canvasSize.width, this.canvasSize.height, Phaser.CANVAS, this.domId);

		// 声明游戏场景集合
		this.instance.States = {};

		// Phaser游戏实例（非必须，game只是为了方便理解）
		var game = this.instance;

		// State - boot
		// 启动场景
		game.States.boot = function() {
			this.preload = function() {
				// 设置画布大小（视网膜屏下需要将Canvas压缩一下，才能保持高清）
				game.canvas.style.width = self.canvasSize.width/2 + "px";
				game.canvas.style.height = self.canvasSize.height/2 + "px";
				// 设置默认背景颜色
				game.stage.backgroundColor = '#aaa';
			};
			this.create = function() {
				game.state.start('preload');
			};
		};

		// State - preload
		// 加载场景
		game.States.preload = function() {
			this.preload = function() {
				/**
				 * 上线用
				 * 资源加载最小时长，平台要求加载页至少显示3秒
				 */
				// var deadLine = false;
				// setTimeout(function() {
				// 	deadLine = true;
				// }, 3000);

				/**
				 * 上线用
				 * 资源加载回调函数
				 */
				// function callback() {
				// 	if (deadLine == true) { // 已达到加载最少时长，进入准备场景
				// 		game.state.start('create');
				// 	} else { // 未达到加载最少时长，1秒后重试
				// 		setTimeout(function() {
				// 			callback();
				// 		}, 1000);
				// 	}
				// }

				/**
				 * 上线用
				 * 设置Phaser加载资源回调事件
				 */
				// game.load.onLoadComplete.add(callback);
				// game.load.onFileComplete.add(function(progress){
				// 	// 设置通用加载页进度条进度
				// 	hwsdk.configLoadingPage({progress: progress});
				// });

				/**----------------------------
				 * 加载资源示例
				 * 按需要参考下面的示例进行资源的加载
				------------------------------ */
				// 游戏资源集合，详情参考配置表
				// var config = self.config['game'];

				// 加载游戏背景
				// if (config['bg'].indexOf('#') !== 0) game.load.image('bg', config['bg']);

				// 加载普通图片资源
				// game.load.image('man', config['man']);

				// 加载音频资源
				// game.load.audio('bg', config['music_bg']);
				// if (self.device.platform != 'android') { // 大部分Android在浏览器中不支持多个音频同时播放，因此不加载以下音效
				// 	game.load.audio('dead', "//24haowan-cdn.shanyougame.com/skip/assets/audio/dead.mp3");
				// 	game.load.audio('pickup', "//24haowan-cdn.shanyougame.com/skip/assets/audio/pickup.mp3");
				// 	game.load.audio('move', config['music_move']);
				// }

				// 加载合图资源
				// game.load.atlasJSONArray('people', config['man'][0], config['man'][1]);

				/**
		         * 本地开发用，上线时请删除
		         */
				// 加载完毕，进入准备场景
				game.state.start('create');
			};
		};

		// State - create
		// 准备场景
		game.States.create = function() {
			this.create = function() {
				/**----------------------------
				 * 创建音乐播放器实例，详见下面的MusicManager
				 * 参数说明：（三个参数都是必须）
				 * 1: 游戏对象实例
				 * 2: 设备信息
				 * 3: 音频资源索引集合（数组类型，每个元素的值为音频资源的key）
				 * 注：这里不用考虑Android的音频播放问题，音乐播放器在播放时会进行判断
				---------------------------- */
				// self.musicManager = new MusicManager(game, self.device, ['bg', 'dead', 'pickup', 'move']);

				// 准备完毕，进入游戏场景
                game.state.start('play');
			};
		};

		// State - play
		// 游戏场景
		game.States.play = function() {
			this.create = function() {
				/**
				 * 上线用
				 * 第一次开始游戏时执行的操作
				 * 说明：由于还没有播放过音乐，需要暂停游戏，让用户通过点击同步调用音乐的播放才能正常播放（Safari）
				 */
				// if (!self.playedMusic) {
				// 	// 暂停游戏
				// 	game.paused = true;
				// 	// 隐藏加载页面，显示开始页面，悬浮按钮
				// 	hwsdk.hideLoadingPage().showStartPage().showPageBtn();
				// 	// 工作台特殊处理
				// 	if (skip) { // 工作台直接开始游戏
				// 		game.paused = false;
				// 		gameManager.toPlayMusic();
				// 	} else { // 正常游戏
				// 		hwsdk.showBox(); // 弹出提示框
				// 	}
				// }

				/**----------------------------
				 * 游戏逻辑写在这里
				---------------------------- */
				// 在游戏结束的时候，执行gameover方法
				// this.gameover();
			};
			this.gameover = function() {
				/**
				 * 上线用
				 * 游戏结束后调用hwsdk的接口进行数据的提交等
				 */
				// if (skip) { // 工作台不提交数据，继续循环游戏
				//     game.state.start('play');
				// } else {
				// 	/**
				// 	 * 调用得分接口示例
				// 	 */
				// 	// 提交分数
				//     hwsdk.requestGameScore({
				//         'game_score': score,
				//         'game_id': game_info['game_id'],
				//         'device_type': self.device.platform
				//     }, function() {
				//     	// 提交分数后的回调操作
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

				// 	/**
				// 	 * 调用抽奖接口示例
				// 	 */
				//     // 抽奖
				//     hwsdk.requestLottery(null, function(result) {
				//         // 判断是否中奖
				//         if (result && result != "empty") { // 已中奖
				//             var giftImg = result['lottery'].img; // 获得的奖品图片
				//             var giftName = result['lottery'].name; // 获得的奖品名称
				//         	// 设置微信分享参数
				//         	// 1.获取微信分享参数对象，具体属性请查看HWSDK文档
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
			};
		}

		// State - end
		// 结束场景
		game.States.end = function() {
			this.create = function() {
				/**----------------------------
				 * 游戏结束后的逻辑
				 * 说明：
				 * 1.此时背景音乐会继续播放
				 * 2.为了游戏结束后停止运行（例如计时，碰撞计算等），因此可以切换到结束场景来
				---------------------------- */
			}
		};

		// 注册各个游戏场景
		game.state.add('boot',game.States.boot);
		game.state.add('preload',game.States.preload);
		game.state.add('create',game.States.create);
		game.state.add('play',game.States.play);
		game.state.add('end',game.States.end);
		// 进入启动场景
		game.state.start('boot');
	}
};

/* 音乐管理器 */
var MusicManager = function(gameInstance, deviceInfo, assets) {
	this.gameInstance = gameInstance;
	this.deviceInfo = deviceInfo;
	this.assets = assets;
	this.init();
};
MusicManager.prototype = {
	// 游戏实例
	gameInstance : null,
	// 设备信息
	deviceInfo : null,
	// 资源
	assets : null,
	// 音乐对象
	musicObject : null,
	// 静音标记
	isBaned : false,
	// 是否播放中
	isPlaying : false,
	// 正在播放列表
	playingList : [],
	// 初始化
	init : function() {
		var self = this;
		if (this.assets) {
			this.musicObject = {};
			for (var index=0,len = this.assets.length;index<len;index++) {
				var audio = this.gameInstance.add.audio(this.assets[index]);
				audio.name = this.assets[index];
				audio.onPause.add(function() {
					self.playingList = self.playingList.splice(self.playingList.indexOf(audio.name), 1);
					if (self.playingList.length == 0) self.isPlaying = false;
				});
				audio.onStop.add(function() {
					self.playingList = self.playingList.splice(self.playingList.indexOf(audio.name), 1);
					if (self.playingList.length == 0) self.isPlaying = false;
				});
				this.musicObject[this.assets[index]] = audio;
			}
		}
	},
	// 播放
	play : function(assetName, loop) {
		if (!this.isBaned) {
			var playTag = false;
			if (this.deviceInfo.platform == "apple") {
				playTag = true;
			} else if (this.deviceInfo.platform == "android" && !this.isPlaying) {
				playTag = true;
			}
			if (playTag) {
				if (loop) {
					if (!this.musicObject[assetName].isPlaying){
						this.musicObject[assetName].loopFull();
						this.playingList.push(assetName);
					}
				} else {
					this.musicObject[assetName].stop();
					this.musicObject[assetName].play();
					this.playingList.push(assetName);
				}
				this.isPlaying = true;
			}
		}
	},
	resume : function() {
		for (var item in this.playingList) {
			var name = this.playingList[item];
			this.musicObject[name].resume();
		}
		this.isPlaying = true;
	},
	pause : function() {
		for (var item in this.playingList) {
			var name = this.playingList[item];
			this.musicObject[name].pause();
		}
		this.isPlaying = false;
	},
	stop : function() {
		for (var item in this.playingList) {
			var name = this.playingList[item];
			this.musicObject[name].stop();
		}
		this.isPlaying = false;
		this.playingList = [];
	},
	ban : function() {
		this.isBaned = true;
		this.pause();
	},
	disban : function() {
		this.isBaned = false;
		this.resume();
	}
};

/**
 * 本地开发用，上线时请删除
 */
var game_width = window.innerWidth; // 游戏窗口宽度
var game_height = window.innerHeight; // 游戏窗口高度
var gameManager = new Game(null, null, "game_div");
gameManager.init(); // 初始化游戏
