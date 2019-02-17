"use strict";
cc._RF.push(module, '08264wwBKxFUJnHLzeaPKem', 'RankingListView');
// Script/panel/RankingListView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameUiTools_1 = require("../GameUiTools");
var GameTools_1 = require("../GameTools");
var mySDK_1 = require("../mySDK");
var GameConfig_1 = require("../GameConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankingListView = /** @class */ (function (_super) {
    __extends(RankingListView, _super);
    function RankingListView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankingListView.prototype.onLoad = function () {
    };
    RankingListView.prototype.start = function () {
        GameUiTools_1.gameUiTools.setButtonClickEvents(this, this.backButton, "backButtonFunc");
        GameUiTools_1.gameUiTools.setButtonClickEvents(this, this.shareButton, "shareButtonFunc");
        //TODO 需要做一个提示
        //AnimLayerTool.createShowMessageBox(120, -350, "分享到群里可查看群排行榜！", 0, this.node);
        if (this.shareTicket != null) {
            var shareNode = new cc.Node();
            shareNode.addComponent(cc.Label).string = "群排行";
            shareNode.setPosition(-260, 503);
            this.node.addChild(shareNode);
        }
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.tex = new cc.Texture2D();
            // 发消息给子域
            cc.log(this.shareTicket);
            if (this.shareTicket != null) {
                wx.postMessage({
                    messageType: 5,
                    MAIN_MENU_NUM: GameConfig_1.GameConfig.MAIN_MENU_NUM,
                    shareTicket: this.shareTicket
                });
            }
            else {
                wx.postMessage({
                    messageType: 1,
                    MAIN_MENU_NUM: GameConfig_1.GameConfig.MAIN_MENU_NUM,
                });
            }
        }
        else {
            var gameTypeNode = new cc.Node();
            gameTypeNode.addComponent(cc.Label).string = "暂无排行榜数据";
            this.node.addChild(gameTypeNode);
            cc.log("获取排行榜数据。" + GameConfig_1.GameConfig.MAIN_MENU_NUM);
        }
    };
    // 刷新子域的纹理
    RankingListView.prototype._updateSubDomainCanvas = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (!this.tex) {
                return;
            }
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            this.tex.initWithElement(sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.tex);
        }
    };
    RankingListView.prototype.update = function () {
        this._updateSubDomainCanvas();
    };
    //分享
    RankingListView.prototype.shareButtonFunc = function (event) {
        GameTools_1.gameTools.playSimpleAudioEngine(4);
        setTimeout(function () {
            mySDK_1.shareAppMessage("shareTicket");
        }, 100);
    };
    //返回
    RankingListView.prototype.backButtonFunc = function (event) {
        GameTools_1.gameTools.playSimpleAudioEngine(0);
        GameTools_1.gameTools.removeRankData();
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({
                messageType: 4,
                MAIN_MENU_NUM: GameConfig_1.GameConfig.MAIN_MENU_NUM,
            });
        }
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], RankingListView.prototype, "backButton", void 0);
    __decorate([
        property(cc.Node)
    ], RankingListView.prototype, "shareButton", void 0);
    __decorate([
        property(cc.Node)
    ], RankingListView.prototype, "rankingScrollView", void 0);
    __decorate([
        property(String)
    ], RankingListView.prototype, "shareTicket", void 0);
    RankingListView = __decorate([
        ccclass
    ], RankingListView);
    return RankingListView;
}(cc.Component));
exports.RankingListView = RankingListView;

cc._RF.pop();