import {
  getFriendCloudStorage,
  getGameClub,
  getGroupCloudStorage,
  getRandomInt,
  getSetting,
  getUserCloudStorage,
  getUserInfo,
  hideMenu,
  login,
  my_postMessage,
  setUserCloudStorage,
  shareAppMessage,
  showMenu,
} from './mySDK';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label;

  @property(cc.Node)
  touxiang: cc.Node;

  @property(cc.Node)
  opendataRoot: cc.Node;

  private tex: cc.Texture2D;
  onLoad() {
    setUserCloudStorage("" + getRandomInt(10, 1000));

    this.tex = new cc.Texture2D();
  }

  start() {}
  // 刷新开放数据域的纹理
  updateSubDomainCanvas() {
    if (!this.tex) {
      return;
    }
    var openDataContext = wx.getOpenDataContext();
    var sharedCanvas = openDataContext.canvas;
    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.opendataRoot.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(
      this.tex
    );
  }
  update() {
    this.updateSubDomainCanvas();
  }

  loginEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------loginevent");
    login(this.label);

    getSetting(this.touxiang);

    //域名被限制
    // var remoteUrl = "http://172.16.0.143:8080/static/img/tuoyuan.png";
    // cc.loader.load(remoteUrl, function (err, texture) {
    //     // Use texture to create sprite frame
    //     const sf = new cc.SpriteFrame();
    //     sf.setTexture(texture)
    //     this.touxiang.getCompment(cc.Sprite).SpriteFrame = sf;
    // });
  }

  GameClubEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------GameClubEvent");
    getGameClub(this.touxiang);
  }

  hideMenuEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------hideMenuEvent");
    hideMenu();
  }

  showMenuEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------showMenuEvent");
    showMenu();
  }

  shareEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------shareEvent");
    shareAppMessage();
  }

  getGroupCloudStorage(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------getGroupCloudStorage");
    my_postMessage("3", "");
  }

  getFriendCloudStorage(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------getFriendCloudStorage");
    my_postMessage("2", "");
  }

  getUserCloudStorage(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------getUserCloudStorage");
    my_postMessage("1", "");
  }
}
