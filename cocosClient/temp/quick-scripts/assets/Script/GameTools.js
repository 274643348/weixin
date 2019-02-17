(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameTools.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f6582Nvf0VFuJGj30MVSqud', 'GameTools', __filename);
// Script/GameTools.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
/**
 * 0--removeRank
 * 1--好友排名
 * 3--提交得分
 * 4--gameover
 * 5--群排名
 */
var GameTools = /** @class */ (function () {
    function GameTools() {
    }
    //获取排行榜()
    GameTools.prototype.getRankData = function (shareTicket) {
        console.log("rangkData---------", shareTicket);
        cc.loader.loadRes("panel/RankingListView", function (err, prefab) {
            console.log("rangkData---------", err);
            if (!err) {
                var node = cc.instantiate(prefab);
                if (shareTicket != undefined) {
                    node.getComponent(cc.Component).shareTicket = shareTicket;
                }
                cc.director.getScene().children[0].addChild(node);
            }
        });
    };
    //移除排行榜数据
    GameTools.prototype.removeRankData = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({
                messageType: 0,
            });
        }
        else {
            cc.log("移除排行榜数据。");
        }
    };
    GameTools.prototype.submitScore = function (score) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: GameConfig_1.GameConfig.MAIN_MENU_NUM,
                score: score,
            });
        }
        else {
            cc.log("提交得分:" + GameConfig_1.GameConfig.MAIN_MENU_NUM + " : " + score);
        }
    };
    //获取本地数据
    GameTools.prototype.getItemByLocalStorage = function (key, value) {
        var values = cc.sys.localStorage.getItem(key);
        if (values === undefined || values === null || values === '') {
            cc.sys.localStorage.setItem(key, value);
            return value;
        }
        if (typeof value === 'boolean') {
            if (typeof values === 'boolean') {
                return values;
            }
            return "true" == values;
        }
        else if (typeof value === 'number') {
            return Number(values);
        }
        return values;
    };
    GameTools.prototype.playSimpleAudioEngine = function (engineType) {
        if (GameConfig_1.GameConfig.IS_GAME_MUSIC) {
            switch (engineType) {
                case 0:
                    cc.audioEngine.play(cc.url.raw('resources/audios/sfx_button.wav'), false, 0.5);
                    break;
                case 1:
                    cc.audioEngine.play(cc.url.raw('resources/audios/sfx_highscore.wav'), false, 0.5);
                    break;
                case 2:
                    cc.audioEngine.play(cc.url.raw("resources/audios/sfx_player_die.wav"), false, 0.5);
                    break;
                case 3:
                    cc.audioEngine.play(cc.url.raw("resources/audios/sfx_player_jump.wav"), false, 0.5);
                    break;
                case 4:
                    cc.audioEngine.play(cc.url.raw("resources/audios/sfx_score.wav"), false, 0.5);
                    break;
                default:
                    break;
            }
        }
    };
    return GameTools;
}());
exports.gameTools = new GameTools();

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameTools.js.map
        