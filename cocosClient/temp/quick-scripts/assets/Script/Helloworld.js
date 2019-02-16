(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Helloworld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Helloworld', __filename);
// Script/Helloworld.ts

Object.defineProperty(exports, "__esModule", { value: true });
var mySDK_1 = require("./mySDK");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Helloworld = /** @class */ (function (_super) {
    __extends(Helloworld, _super);
    function Helloworld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Helloworld.prototype.onLoad = function () {
        mySDK_1.setUserCloudStorage("" + mySDK_1.getRandomInt(10, 1000));
        this.tex = new cc.Texture2D();
    };
    Helloworld.prototype.start = function () { };
    // 刷新开放数据域的纹理
    Helloworld.prototype.updateSubDomainCanvas = function () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.opendataRoot.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.tex);
    };
    Helloworld.prototype.update = function () {
        this.updateSubDomainCanvas();
    };
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
        mySDK_1.getGameClub(this.touxiang);
    };
    Helloworld.prototype.hideMenuEvent = function (event, customEventData) {
        console.log("ljy------hideMenuEvent");
        mySDK_1.hideMenu();
    };
    Helloworld.prototype.showMenuEvent = function (event, customEventData) {
        console.log("ljy------showMenuEvent");
        mySDK_1.showMenu();
    };
    Helloworld.prototype.shareEvent = function (event, customEventData) {
        console.log("ljy------shareEvent");
        mySDK_1.shareAppMessage();
    };
    Helloworld.prototype.getGroupCloudStorage = function (event, customEventData) {
        console.log("ljy------getGroupCloudStorage");
        mySDK_1.my_postMessage("3", "");
    };
    Helloworld.prototype.getFriendCloudStorage = function (event, customEventData) {
        console.log("ljy------getFriendCloudStorage");
        mySDK_1.my_postMessage("2", "");
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
        