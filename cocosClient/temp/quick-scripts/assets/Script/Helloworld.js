(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Helloworld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Helloworld', __filename);
// Script/Helloworld.ts

Object.defineProperty(exports, "__esModule", { value: true });
var mySDK_1 = require("./mySDK");
var GameConfig_1 = require("./GameConfig");
var GameTools_1 = require("./GameTools");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Helloworld = /** @class */ (function (_super) {
    __extends(Helloworld, _super);
    function Helloworld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Helloworld.prototype.onLoad = function () {
        mySDK_1.setUserCloudStorage({ key: "xClassic", value: "" + mySDK_1.getRandomInt(10, 1000) });
        this.tex = new cc.Texture2D();
    };
    Helloworld.prototype.start = function () {
        var _this = this;
        //111111111
        setTimeout(function () {
            _this.loadingResource();
        }, 10);
    };
    Helloworld.prototype.loadingResource = function () {
        //22222222
        GameConfig_1.GameConfig.IS_GAME_MUSIC = GameTools_1.gameTools.getItemByLocalStorage("IS_GAME_MUSIC", true);
        GameConfig_1.GameConfig.GameHeightScore = GameTools_1.gameTools.getItemByLocalStorage("GameHeightScore", 0);
        // 提前记载需要的图集
        this.initFrameCache();
        this.initWxSetting();
        //加载并切换到主界面
        // cc.director.preloadScene("MenuUI", function () {
        //   cc.director.loadScene("MenuUI");
        // });
    };
    //33333333
    Helloworld.prototype.initWxSetting = function () {
        //右上角“...”显示分享按钮
        mySDK_1.showMenu();
        //游戏圈
        GameConfig_1.GameConfig.GameClubButton = mySDK_1.createGameClub();
        GameConfig_1.GameConfig.GameClubButton.show();
        //对用户托管数据进行写数据操作
        if (GameTools_1.gameTools.getItemByLocalStorage("UserPlayGame", true)) {
            cc.sys.localStorage.setItem("UserPlayGame", false);
            // 对用户托管数据进行写数据操作
            mySDK_1.setUserCloudStorage({ key: "UserPlayGame", value: "1" });
        }
        // 获取小游戏启动时的参数。
        mySDK_1.LaunchOptions();
    };
    Helloworld.prototype.initFrameCache = function () {
        //加载图集
        cc.loader.loadRes("watchout", cc.SpriteAtlas, function (err, atlas) {
            GameTools_1.gameTools.love2048FrameCache = atlas;
        });
        // 使用图集
        // let messageBack = new cc.Node();
        // messageBack.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("messageBox0");
        // messageBack.setPosition(x, y);
        // messageBack.rotation = rotation;
        // messageBack.opacity = 0;
        // parentNode.addChild(messageBack);
    };
    // // 刷新开放数据域的纹理
    // updateSubDomainCanvas() {
    //   if (!this.tex) {
    //     return;
    //   }
    //   var openDataContext = wx.getOpenDataContext();
    //   var sharedCanvas = openDataContext.canvas;
    //   this.tex.initWithElement(sharedCanvas);
    //   this.tex.handleLoadedTexture();
    //   this.opendataRoot.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(
    //     this.tex
    //   );
    // }
    // update() {
    //   this.updateSubDomainCanvas();
    // }
    Helloworld.prototype.loginEvent = function (event, customEventData) {
        console.log("ljy------loginevent");
        mySDK_1.login(this.label);
        mySDK_1.getSetting(this.touxiang);
        //域名被限制
        // var remoteUrl = "http://172.16.0.143:8080/static/img/tuoyuan.png";
        // cc.loader.load(remoteUrl, function (err, texture) {
        //     // Use texture to create sprite frame
        //     const sf = new cc.SpriteFrame();
        //     sf.setTexture(texture)
        //     this.touxiang.getCompment(cc.Sprite).SpriteFrame = sf;
        // });
    };
    Helloworld.prototype.GameClubEvent = function (event, customEventData) {
        console.log("ljy------GameClubEvent");
        mySDK_1.createGameClub();
    };
    Helloworld.prototype.hideMenuEvent = function (event, customEventData) {
        console.log("ljy------hideMenuEvent");
        mySDK_1.hideMenu();
    };
    Helloworld.prototype.showMenuEvent = function (event, customEventData) {
    };
    Helloworld.prototype.shareEvent = function (event, customEventData) {
        console.log("ljy------shareEvent");
        mySDK_1.shareAppMessage("shareTicket");
    };
    Helloworld.prototype.getGroupCloudStorage = function (event, customEventData) {
        console.log("ljy------getGroupCloudStorage");
        mySDK_1.my_postMessage("3", "");
        mySDK_1.shareAppMessage("shareTicket");
    };
    Helloworld.prototype.getFriendCloudStorage = function (event, customEventData) {
        console.log("ljy------getFriendCloudStorage");
        mySDK_1.my_postMessage("2", "");
        GameTools_1.gameTools.getRankData(null);
    };
    Helloworld.prototype.getUserCloudStorage = function (event, customEventData) {
        console.log("ljy------getUserCloudStorage");
        mySDK_1.my_postMessage("1", "");
    };
    __decorate([
        property(cc.Label)
    ], Helloworld.prototype, "label", void 0);
    __decorate([
        property(cc.Node)
    ], Helloworld.prototype, "touxiang", void 0);
    __decorate([
        property(cc.Node)
    ], Helloworld.prototype, "opendataRoot", void 0);
    Helloworld = __decorate([
        ccclass
    ], Helloworld);
    return Helloworld;
}(cc.Component));
exports.default = Helloworld;

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
        //# sourceMappingURL=Helloworld.js.map
        