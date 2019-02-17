import { gameUiTools } from "../GameUiTools";
import { gameTools } from "../GameTools";
import { shareAppMessage } from "../mySDK";
import { GameConfig } from "../GameConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export  class RankingListView extends cc.Component {

    @property(cc.Node)
    backButton: cc.Node;

    @property(cc.Node)
    shareButton: cc.Node;

    @property(cc.Node)
    rankingScrollView: cc.Sprite;

    @property(String)
    shareTicket: String;


    tex:cc.Texture2D;
    onLoad() {
        
    }
     
    start(){
        gameUiTools.setButtonClickEvents(this, this.backButton, "backButtonFunc");
        gameUiTools.setButtonClickEvents(this, this.shareButton, "shareButtonFunc");

        //TODO 需要做一个提示
        //AnimLayerTool.createShowMessageBox(120, -350, "分享到群里可查看群排行榜！", 0, this.node);

        if (this.shareTicket != null) {
            let shareNode = new cc.Node();
            shareNode.addComponent(cc.Label).string = "群排行";
            shareNode.setPosition(-260, 503);
            this.node.addChild(shareNode);
        }

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.tex = new cc.Texture2D();
            // 发消息给子域
            cc.log(this.shareTicket)
            if (this.shareTicket != null) {
                wx.postMessage({
                    messageType: 5,
                    MAIN_MENU_NUM: GameConfig.MAIN_MENU_NUM,
                    shareTicket: this.shareTicket
                });
            } else {
                wx.postMessage({
                    messageType: 1,
                    MAIN_MENU_NUM: GameConfig.MAIN_MENU_NUM,
                });
            }
        } else {
            let gameTypeNode = new cc.Node();
            gameTypeNode.addComponent(cc.Label).string = "暂无排行榜数据";
            this.node.addChild(gameTypeNode);
            cc.log("获取排行榜数据。" + GameConfig.MAIN_MENU_NUM);
        }

    }

    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (!this.tex) {
                return;
              }
              var openDataContext = wx.getOpenDataContext();
              var sharedCanvas = openDataContext.canvas;
              this.tex.initWithElement(sharedCanvas);
              this.tex.handleLoadedTexture();
              this.rankingScrollView.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(
                this.tex
              );
        }
    }
    update() {
        this._updateSubDomainCanvas();
    }

    //分享
    shareButtonFunc(event){
        gameTools.playSimpleAudioEngine(4);
        setTimeout(() => {
            shareAppMessage("shareTicket");
        }, 100);
    }

    //返回
    backButtonFunc(event) {
        gameTools.playSimpleAudioEngine(0);
        gameTools.removeRankData();
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({// 发消息给子域
                messageType: 4,
                MAIN_MENU_NUM: GameConfig.MAIN_MENU_NUM,
            });
        }
        this.node.destroy();
    }
}
