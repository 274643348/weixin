const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  start() {
    // init logic
    this.label.string = this.text;
  }
  onLoad() {
    wx.onMessage(data => {
      console.log("open data project ------", data);
      getUserCloudStorage("score", this.label);

      getFriendCloudStorage();
    });
  }
}

//调用会失败(必须放在开放数据域中)
export function getGroupCloudStorage() {
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
export function getFriendCloudStorage() {
  wx.getFriendCloudStorage({
    keyList: ["score"], // 你要获取的、托管在微信后台都key
    success: res => {
      console.log("getFriendCloudStorage      success ------", res.data);
    },
    fail: res => {
      console.log("getFriendCloudStorage      fail ------", res.data);
    }
  });
}
//调用会失败(必须放在开放数据域中)
export function getUserCloudStorage(score: string, label: cc.Label) {
  wx.getUserCloudStorage({
    keyList: [score],
    success(res) {
      console.log("getUserCloudStorage success ---  ", res);
      label.string = res["KVDataList"][0].value;
    }
  });
}
