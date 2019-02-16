import { PlayerCtrl } from "./PlayerCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property(cc.Node)
  playerPrefab: cc.Node;


  @property(cc.Node)
  playerLayout: cc.Node;

  start() {


    //测试
    // this.updataFriend("");
  }
  onLoad() {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      wx.onMessage(data => {
        console.log("open data project ------", data);
        this.getUserCloudStorage("score", this.label);
  
        this.getFriendCloudStorage();
      });
    }
  }



  updataFriend(data:any[]){
    // this.playerPrefab.getComponent(PlayerCtrl).setData("https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYIAkP3iaQzq4vdaVLibQ2xGeuaVNkOZMa73Uttpn1pbP2j7kNHSsd2S3ZCfTsyd9OibyTnd9Gm2ecQ/132","刘敬焱");
    for (let index = 0; index < data.length; index++) {
      const datalist = data[index].KVDataList;
      const avatarUrl = data[index].avatarUrl;
      const nickname = data[index].nickname;

      const mydata = nickname +datalist[0].value;
      const playerNode = cc.instantiate(this.playerPrefab);
      playerNode.x = 0;
      playerNode.getComponent(PlayerCtrl).setData(avatarUrl,mydata);
      this.playerLayout.addChild(playerNode);
    }
  }

  

    //调用会失败(必须放在开放数据域中)
   getGroupCloudStorage() {
    // wx.getGroupCloudStorage({
    //   keyList: ["score"], // 你要获取的、托管在微信后台都key
    //   success: res => {
    //     console.log("getGroupCloudStorage      success ------", res.data);
    //   },
    //   fail: res => {
    //     console.log("getGroupCloudStorage      fail ------", res.data);
    //   }
    // });
  }
  //调用会失败(必须放在开放数据域中)
   getFriendCloudStorage() {
    wx.getFriendCloudStorage({
      keyList: ["score"], // 你要获取的、托管在微信后台都key
      success: res => {
        console.log("getFriendCloudStorage      success ------", res.data);
        this.updataFriend(res.data);
      },
      fail: res => {
        console.log("getFriendCloudStorage      fail ------", res.data);
      }
    });
  }
  //调用会失败(必须放在开放数据域中)
   getUserCloudStorage(score: string, label: cc.Label) {
    wx.getUserCloudStorage({
      keyList: [score],
      success(res) {
        console.log("getUserCloudStorage success ---  ", res);
        label.string = res["KVDataList"][0].value;
      }
    });
  }
}


