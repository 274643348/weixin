//获取微信界面大小
let width = 0;
let height = 0;
export function login(lable: cc.Label) {
  wx.login({
    success(res) {
      lable.string = `${res.code}`;
      if (res.code) {
        console.log("登录成功！");
      } else {
        console.log("登录失败！" + res.errMsg);
      }
    }
  });
}

//获取授权
export function getSetting(lable: cc.Node) {
  try {
    //获取微信界面大小
    let sysInfo = wx.getSystemInfoSync();
    width = sysInfo.screenWidth;
    height = sysInfo.screenHeight;
  } catch (e) {
    console.log("获取系统参数失败");
  }

  wx.getSetting({
    success(res) {
      console.log(res.authSetting);
      if (res.authSetting["scope.userInfo"]) {
        console.log("userInfo 已经授权");

        //获取用户信息
        getUserInfo(lable);
      } else {
        console.log("userInfo 未授权");
        //请求用户信息

        if (res.authSetting["scope.userInfo"] === false) {
          console.log("用户 userInfo 已经拒绝");
          // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
          // wx.authorize({
          //   scope: 'scope.userInfo',
          //   success() {
          //     console.log("用户 成功 授权");
          //     getUserInfo(lable);
          //   },
          //   fail(){
          //     console.log("用户 拒绝 授权");
          //   }
          // });

          //通过button可以实现继续授权;
          createUserInfoButton(lable);
          //  wx.openSetting({
          //   success(res) {
          //     console.log(res.authSetting)
          //   }
        } else {
          // console.log("用户 userInfo 首次操作");
          // console.log(res.authSetting)
          // createUserInfoButton(lable);
          wx.authorize({
            scope: "scope.userInfo",
            success() {
              console.log("用户 成功 授权");
              getUserInfo(lable);
            },
            fail() {
              console.log("用户 拒绝 授权");
            }
          });
        }
      }
    }
  });
}

export function getUserInfo(lable: cc.Node) {
  wx.getUserInfo({
    success(res) {
      console.log("getUserInfo success ");
      console.log("res is ", res);
      console.log("在微信登录里面昵称是 :" + res.userInfo.nickName);
      console.log("用户头像信息 :" + res.userInfo.avatarUrl);

      //必须加上?aa=aa.jpg
      cc.loader.load(res.userInfo.avatarUrl + "?aa=aa.jpg", function(
        err,
        texture
      ) {
        // Use texture to create sprite frame
        const sf = new cc.SpriteFrame();
        sf.setTexture(texture);
        lable.getComponent(cc.Sprite).spriteFrame = sf;
      });
    },
    fail: function() {
      console.log("getUserInfo fail ");
    },
    complete: function() {
      console.log("getUserInfo complete ");
    }
  });
}

export function createUserInfoButton(lable: cc.Node) {
  console.log("width", width);
  console.log("height", height);
  const button = wx.createUserInfoButton({
    type: "text",
    text: "获取用户信息",
    style: {
      left: width / 2 - 100,
      top: height / 2 - 20,
      width: 200,
      height: 40,
      lineHeight: 40,
      backgroundColor: "#ff0000",
      color: "#ffffff",
      textAlign: "center",
      fontSize: 16,
      borderRadius: 4
    }
  });

  button.onTap(res => {
    if (res.userInfo) {
      console.log("用户授权:", res);
      //此时可进行登录操作

      //获取用户信息
      getUserInfo(lable);
      button.destroy();
    } else {
      console.log("用户拒绝授权:", res);
      button.destroy();
    }
  });
}

/////////////////////////////游戏圈相关
export function getGameClub(lable: cc.Node) {
  const button = wx.createGameClubButton({
    icon: "green",
    style: {
      left: 10,
      top: 76,
      width: 40,
      height: 40
    }
  });
}

////////////////////////////分享功能

export function showMenu() {
  wx.onShareAppMessage(function() {
    // 用户点击了“转发”按钮
    return {
      title: "玩家手动"
    };
  });
  wx.showShareMenu();
}
export function hideMenu() {
  wx.hideShareMenu();
}

export function shareAppMessage() {
  wx.shareAppMessage({
    title: "直接分享"
  });
}

//////////////////////////////获取好友链,群玩家数据链

//调用会失败(必须放在开放数据域中)
export function getGroupCloudStorage() {
  wx.getGroupCloudStorage({
    keyList: ["score"], // 你要获取的、托管在微信后台都key
    success: res => {
      console.log("getGroupCloudStorage      success ------", res.data);
    },
    fail: res => {
      console.log("getGroupCloudStorage      fail ------", res.data);
    }
  });
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
      // label.string = res[score];
    }
  });
}

//主域和开放数据域的通信---开放数据域不能向主域发送消息。
export function my_postMessage(type: string, data: string) {
  const openDataContext = wx.getOpenDataContext();
  /**
   * type
   * 1:getUserCloudStorage
   * 2:getFriendCloudStorage
   * 3:getGroupCloudStorage
   */
  openDataContext.postMessage({
    text: type,
    data: data
  });
}

//////////////////////////////托管用户数据
export function setUserCloudStorage(score: string) {
  wx.setUserCloudStorage({
    KVDataList: [{ key: "score", value: score }],
    success: res => {
      console.log("setUserCloudStorage success ---  ", res);
    },
    fail: res => {
      console.log("setUserCloudStorage fail ---  ", res);
    }
  });
}

///
export function getRandomInt(min: number, max: number) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
}
