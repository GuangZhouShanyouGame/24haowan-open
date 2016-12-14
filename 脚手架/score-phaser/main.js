/**-----------------------------------------------
 * 
 * 分数类/通关类游戏框架 Phaser
 * game_tpl type=1
 * 
 * 注意事项（请仔细阅读）：
 * 1.获取窗口大小window.innerWidth、window.innerHeight时，使用game_width, game_height来代替，本地开发时将自定义这两个变量。
 * 2.注释带“测试用”的代码块要认真阅读，如无特别说明，上线时应将代码块注释。
 * 3.注释带“上线用”的代码块要认真阅读，如无特别说明，上线时应取消代块的注释。
 * 4.游戏场景基本分为加载（preload）、开始（create）、游戏（play）、结束（end），实际情况则根据游戏内容而定，开发时要注意场景之间切换所需要做的操作。
 * 5.接入平台后能获取的全局变量说明：（以下参数请勿修改）
 * 		game_width	 Number		游戏宽度
 * 		game_height  Number 	游戏高度
 * 		case_tag	 Boolean	是否为案例
 * 		skip 		 Boolean    是否跳过开始界面和结束界面，并循环游戏
 * 		configJson 	 Object    	游戏配置表
 * 		tpl_info	 Object		模板信息（数据库表：game_tpl）
 * 		game_info    Object		游戏信息（数据库表：custom_game）
 * 		bestScore	 Number		最高得分/关卡数（抽奖类可忽略）
 * 		game_test	 Number		0-正式环境 1-测试环境 
 * 		gift_config	 Array		游戏奖品配置
 * 		game_type	 Number		游戏类型（对应game_tpl中的type）
 * 		best_rank	 Number		最高排名（通关类、抽奖类可忽略）
 * 		play_times	 Number		游戏次数
 * 		left_times	 Number		剩余可游戏次数（若为-1，则表示无限次）
 * 		first_play	 Number		0-不是第一次游戏 1-第一次游戏
 * 6.新建游戏配置表请务必注意复制的是不是最新的配置，以免有字段的遗漏或丢失。
 *
 * 关于平台调用游戏操作：
 * 1.开始按钮
 * 		game.state.start('play');
 * 2.再玩一次按钮
 * 		game.state.start('play');
 * 		game.paused = false;
 * 3.点击暂停蒙版（仅在工作台中会显示）
 * 		game.paused = false;
 *
 * 关于游戏调用平台操作：
 * 1.加载完毕，显示提示框
 * 		showBox()
 * 
 * 关于平台的接入，请参考文档：
 * https://docs.google.com/document/d/1wJZly0FEdk5rYvRNmh2wclIWEBBz_N8ayYrik1wLZ-U/edit
 * 
 * 关于framework的维护：
 * 1.如有对framework进行修改，则须在提交SVN前跟开发人员说明，以免造成沟通上的失误。
 * 2.如有新的注意事项，请添加到头部的代码说明中。
 * 
 * -----------------------------------------------*/

// 测试用 - 启动游戏
var gameManager;
$(document).ready(function() {
	gameManager = new Game();
	gameManager.init();
});
var game_width = window.innerWidth;
var game_height = window.innerHeight;

var Game = function(bestScore, config ,domId) {
	this.bestScore = bestScore || 0;
	this.config = config;
	this.domId = domId || '';
};
Game.prototype = {
	// 得分
	score : 0,
	// 最高得分
	bestScore : 0,
	// 初始化标记
	isInit : false,
	// 音乐管理器
	musicManager : null,
	// 插入的domId
	domId : null,
	// 设备信息
	device : {
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
	// phaser游戏对象实例
	instance : null,

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
	// 初始化-游戏
	init : function() {
		var self = this;
		// 初始化设备信息
		this.initDevice();
		// 初始化画布大小
		this.initCanvasSize();
		// 设置已进入初始化阶段
		this.isInit = true;
		// 创建游戏实例
		this.instance = new Phaser.Game(this.canvasSize.width, this.canvasSize.height, Phaser.CANVAS, this.domId);
		// 创建游戏状态
		this.instance.States = {};

		var game = this.instance;
		// State - boot
		// 加载加载页所需资源
		game.States.boot = function() {
			this.preload = function() {
				// 设置画布大小
				$(game.canvas).css("width", self.canvasSize.width/2);
				$(game.canvas).css("height", self.canvasSize.height/2);
				// 设置默认背景颜色
				game.stage.backgroundColor = '#aaa';
			};
			this.create = function() {
				// 进入preload状态
				game.state.start('preload');
			};
		};

		// State - preload
		// 加载游戏所需资源
		game.States.preload = function() {
			this.preload = function() {
				// 上线用 - 说明：加载页面至少显示3秒，由deadline控制是否允许进入下一个状态
				// var deadLine = false;
				// setTimeout(function() {
				// 	deadLine = true;
				// }, 3000);
				// 加载完成回调
				function callback(){
					// 测试用 - 直接进入create状态
					game.state.start('create');

					// 上线用
					// if (deadLine == true) { // 到deadline了
					// 	// 隐藏加载界面
					// 	$('#loading').hide();
					// 	// 显示提示框，在game.php里面加载的
					// 	if (!skip) showBox();
					// 	// 进入create状态
					// 	game.state.start('create');
					// } else { // 还没到deadline
					// 	setTimeout(function(){
					// 		callback();
					// 	}, 1000);
					// }
				}
				// 全部文件加载完成
				game.load.onLoadComplete.add(callback);
				// 文件加载完成
				game.load.onFileComplete.add(function(progress){
					$('.bar').width(2.6*progress/100 + 'rem');
				});


				// 上线用 - 加载资源
				// var config = self.config['game'];
				// if(config['bg'].indexOf('#') != 0){
				// 	game.load.image('bg',config['bg']);
				// }
				
				// game.load.atlasJSONArray('fort', "assets/images/fort.png", "assets/images/fort.json");
				// game.load.image('foreground', "assets/images/foreground.png");
				// game.load.image('ball_blue', "assets/images/ball_blue.png");
				// game.load.image('ball_yellow', "assets/images/ball_yellow.png");
				// game.load.image('clock', "assets/images/clock.png");
				// game.load.image('boom', "assets/images/boom.png");
				// game.load.image('plus', "assets/images/plus.png");
				// game.load.image('minus', "assets/images/minus.png");
				//加载音效
				// game.load.audio('bgMusic',config['music_bg']);
				// if (self.device.platform != 'android') {
				// 	game.load.audio('click',config['music_click']);
				// }
			};
		};

		// State - create
		// 开始界面
		game.States.create = function() {
			this.create = function() {
				// 测试用 - 直接进入play状态
				game.state.start('play');

				// 上线用
				// 创建音乐管理器，传入的第三个参数是音乐的key
				// self.musicManager = new MusicManager(game, self.device, ['bgMusic','click']);
				// 显示开始菜单页面 使用dom构建
				// if (skip) { // 如果是工作台里面的直接进入游戏界面
				// 	game.state.start('play');
				// } else {
				// 	$('#start-menu').show();
				// }
			}
		};

		// State - play
		// 游戏界面
		game.States.play = function(){
			this.create = function(){
				// 上线用
				// if(self.config['game']['bg'].indexOf('#') == 0){
				// 	game.stage.backgroundColor = self.config['game']['bg'];
				// } else {
				// 	var bg = game.add.image(0, 0, "bg");
				// 	bg.width = self.canvasSize.width;
				// 	bg.height = self.canvasSize.height;
				// }

				// 此处写游戏逻辑

				// 上线用 - 如果暂停蒙版正在显示，则暂停
				if ($(".pause-mask").css("display") == "block") game.paused = true;

				// 上线用 - 提交分数
				// if (skip) {
				// 	game.state.start('play');
				// } else {
				// 	setGameScore({
				// 		'game_score':score,
				// 		'game_id':game_info['game_id'],
				// 		'device_type':self.device.platform
				// 	});
				// 	game.state.start('end');
				// }
				
			};
			this.update = function() {
				// 每一帧更新都会触发
				
			};
			// 游戏结束
			this.gameEnd = function() {
				// 测试用 - 提示分数
				game.paused = true;
				console.log("得分是: "+self.score);
				alert("得分是: "+self.score);
			};
		};
		
		// State - end
		// 游戏结束界面
		game.States.end = function() {
			this.create = function() {
				// 游戏结束
			}
		};

		// 添加游戏状态
		game.state.add('boot',game.States.boot);
		game.state.add('preload',game.States.preload);
		game.state.add('create',game.States.create);
		game.state.add('play',game.States.play);
		game.state.add('end',game.States.end);
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
					if (!this.musicObject[assetName].isPlaying) {
						this.musicObject[assetName].play();
						this.playingList.push(assetName);
					}
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
