import {
  getFriendCloudStorage,
  createGameClub,
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
  LaunchOptions,
} from './mySDK';
import { GameConfig } from './GameConfig';
import { gameTools } from './GameTools';

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
    
    setUserCloudStorage({ key: "xClassic", value: "" + getRandomInt(10, 1000) });
    this.tex = new cc.Texture2D();
  }

  start() {

    //111111111
    setTimeout(() => {
      this.loadingResource();
    }, 10);


  }
  loadingResource(){
    //22222222
    GameConfig.IS_GAME_MUSIC = gameTools.getItemByLocalStorage("IS_GAME_MUSIC", true);
    GameConfig.GameHeightScore = gameTools.getItemByLocalStorage("GameHeightScore", 0);
    // 提前记载需要的图集
    this.initFrameCache();
    this.initWxSetting();
    //加载并切换到主界面
    // cc.director.preloadScene("MenuUI", function () {
    //   cc.director.loadScene("MenuUI");
    // });
  }

  //33333333
  initWxSetting(){
    //右上角“...”显示分享按钮
    showMenu();

    //游戏圈
    GameConfig.GameClubButton = createGameClub();
    GameConfig.GameClubButton.show();

    //对用户托管数据进行写数据操作
    if (gameTools.getItemByLocalStorage("UserPlayGame", true)) {
      cc.sys.localStorage.setItem("UserPlayGame", false);
      // 对用户托管数据进行写数据操作
      setUserCloudStorage({key: "UserPlayGame", value: "1"});
    }
      // 获取小游戏启动时的参数。
      LaunchOptions();


  }


  initFrameCache(){
    //加载图集
    cc.loader.loadRes("watchout", cc.SpriteAtlas, function (err, atlas) {
        gameTools.love2048FrameCache = atlas;
    });

    // 使用图集
    // let messageBack = new cc.Node();
    // messageBack.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("messageBox0");
    // messageBack.setPosition(x, y);
    // messageBack.rotation = rotation;
    // messageBack.opacity = 0;
    // parentNode.addChild(messageBack);
  }

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
    createGameClub();
  }

  hideMenuEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------hideMenuEvent");
    hideMenu();
  }

  showMenuEvent(event: cc.Event.EventTouch, customEventData: any) {
    
  }

  shareEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------shareEvent");
    shareAppMessage("shareTicket");
  }

  getGroupCloudStorage(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------getGroupCloudStorage");
    my_postMessage("3", "");
    shareAppMessage("shareTicket");
  }

  getFriendCloudStorage(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------getFriendCloudStorage");
    my_postMessage("2", "");

    gameTools.getRankData(null);
  }

  getUserCloudStorage(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------getUserCloudStorage");
    my_postMessage("1", "");
  }
}
