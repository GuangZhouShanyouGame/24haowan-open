/**-----------------------------------------------
 * 
 * 分数类/通关类游戏框架 DOM
 * game_tpl type=3
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
 * 		gameManager.play();
 * 2.再玩一次按钮
 * 		gameManager.replay();
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

// 测试用 - 直接启动
var gameManager;
$(document).ready(function() {
	gameManager = new Game(0, {}, 'game_div');
	gameManager.init();
});
var game_width = game_width;
var game_height = game_height;

var Game = function(bestScore, config, domId) {
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
	// 插入的domId
	domId : null,
	// 设备信息
	device : {
		type : null,
		platform : null,
		width : 0,
		height : 0
	},
	// 游戏内容，方便重置游戏
	gameContent: null,
	// 音频
	audios: {},
	// 图片
	imgs: {},

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

	// 初始化-游戏
	init : function() {
		var self = this;
		// 初始化设备信息
		this.initDevice();
		// 设置已进入初始化阶段
		this.isInit = true;
		// 加载资源
		this.load();
	},

	// 加载资源
	load: function() {
		var self = this;

		// 上线用
		// var config = this.config['game'];
		
		// 加载图片资源
		// 所有需要加载的图片资源都写到这里来
		this.imgs = {
			// role: config['role'],
			// role1: config['role1'],
   //      	role2: config['role2'],
   //      	role3: config['role3'],
   //      	bg: config['bg'],
   //      	button: config['button'],
   //      	time: '//24haowan-cdn.shanyougame.com/dance/img/time.png'
		};
		var imgLoaded = false;
		var currentLoadedImg = 0;
		var totalImg = Object.keys(this.imgs).length;
		for (var index in this.imgs) {
			if (this.imgs[index].indexOf("#") != 0) {
				var img = new Image();
				img.onload = img.onerror = function() {
					++currentLoadedImg;
					$('.bar').width(2.6*(0.8*currentLoadedImg/totalImg+0.2*currentLoadedAudio/totalAudio) + 'rem');
					if (currentLoadedImg == totalImg) {
						imgLoaded = true;
					}
				}
				img.src = this.imgs[index];
			} else {
				totalImg--;
			}
		}

		// 加载音频资源
		// 所有需要加载的音频资源都写到这里来
		var audioList = {
			// bg: config['music_bg'],
			// right: config['music_right'],
			// wrong: config['music_wrong']
		};
		if (this.device.platform == "android") audioList = {bg: config['music_bg']};
		var audioLoaded = false;
		var currentLoadedAudio = 0;
		var totalAudio = (this.device.platform == "android") ? 1 : Object.keys(audioList).length;
		for (var index in audioList) {
			this.audios[index] = new Audio();
			this.audios[index].addEventListener("canplaythrough", audioOnload, false);
			this.audios[index].src = audioList[index];
			this.audios[index].load();
		}
		// 音频加载完毕回调
		function audioOnload() {
			this.removeEventListener("canplaythrough", audioOnload);
			++currentLoadedAudio;
			if (currentLoadedAudio <= totalAudio) {
				$('.bar').width(2.6*(0.8*currentLoadedImg/totalImg+0.2*currentLoadedAudio/totalAudio) + 'rem');
				if (currentLoadedAudio == totalAudio) {
					audioLoaded = true;
				}
			}
		}

		// 加载时间锁
		var loading_lock = true;
		setTimeout(function() {
			loading_lock = false;
				$('.bar').width('2.6rem');
				setTimeout(function() {
					self.create();
				}, 500);
		}, 3000);
	},

	// 开始状态
	create: function() {
		// 上线用 - 添加背景
		// if (this.config['game']['bg'].indexOf('#') == 0) {
		// 	$("#game_div").css("background-color", this.config['game']['bg']);
		// } else {
		// 	$("#game_div").css("background-image", 'url('+this.imgs['bg']+')');
		// }

		// // 配置元素
		// $("#role1").attr("src", this.imgs["role"]);
		// $("#role2").attr("src", this.imgs["role1"]);
		// $("#role3").attr("src", this.imgs["role1"]);
		// $("#key1").attr("src", this.imgs['button']);
		// $("#key2").attr("src", this.imgs['button']);
		// $("#key3").attr("src", this.imgs['button']);
		// $(".timer img").attr("src", this.imgs['time']);
		// 
		// 上线用
		// // 隐藏加载界面
		// $('#loading').hide();
		// // 显示开始菜单页面 使用dom构建
		// if (skip) { // 如果是工作台里面的直接进入游戏界面
		// 	this.play();
		// } else {
		// 	showBox();
		// 	$('#start-menu').show();
		// }

		// 设置游戏内容
		this.gameContent = $("#"+this.domId).html();

		// 测试用 - 直接进入游戏状态
		this.play();
	},

	// 游戏状态
	play: function() {
		// 此处写游戏逻辑
		var self = this;

		// 上线用 - 提交分数接口
		// if (skip) {
		// 	game.state.start('play');
		// } else {
		// 	setGameScore({
		// 		'game_score':score,
		// 		'game_id':game_info['game_id'],
		// 		'device_type':self.device.platform
		// 	});
		// 	self.end();
		// }
	},

	// 结束状态
	end: function() {
		this.reset();
	},

	// 重置游戏数据和dom结构
	reset: function() {
		// 直接把内容替换掉
		$("#"+this.domId).children().remove();
		$("#"+this.domId).html(this.gameContent);
	},

	// 再玩一次
	replay: function() {
	    this.play();
	}

}