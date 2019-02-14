
  //获取微信界面大小
  let width = 0;
  let height = 0;
export function login(lable: cc.Label) {
  wx.login({
    success(res) {
      lable.string = `${res.code}`;
      if (res.code) {
        console.log("登录成功！" );
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
    console.log("获取系统参数失败")
  }

  wx.getSetting({
    success(res) {
      console.log(res.authSetting)
      if (res.authSetting['scope.userInfo']) {
        console.log("userInfo 已经授权");

        //获取用户信息
        getUserInfo(lable);
      }else{
        console.log("userInfo 未授权");
        //请求用户信息

      if (res.authSetting['scope.userInfo'] === false){
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
          } else{
            // console.log("用户 userInfo 首次操作");
            // console.log(res.authSetting)
            // createUserInfoButton(lable);
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log("用户 成功 授权");
              getUserInfo(lable);
            },
            fail(){
              console.log("用户 拒绝 授权");
            }
          })
        }

      }
    }
  })

}


export function getUserInfo(lable: cc.Node) {
  wx.getUserInfo({
    success(res) {
      console.log("getUserInfo success ");
      console.log("res is ",res);
      console.log("在微信登录里面昵称是 :"+res.userInfo.nickName);
      console.log("用户头像信息 :"+res.userInfo.avatarUrl);

      //必须加上?aa=aa.jpg
      cc.loader.load(res.userInfo.avatarUrl+"?aa=aa.jpg", function (err, texture) {
        // Use texture to create sprite frame
        const sf = new cc.SpriteFrame();
        sf.setTexture(texture)
        lable.getComponent(cc.Sprite).spriteFrame = sf;
    });
    },
    fail:function(){
      console.log("getUserInfo fail ");
    },
    complete:function(){
      console.log("getUserInfo complete ");
    },
  });
}

export function createUserInfoButton(lable:cc.Node){
  console.log("width",width);
  console.log("height",height);
  const button = wx.createUserInfoButton({
    type: 'text',
    text: '获取用户信息',
    style: {
      left: width/2 -100,
      top: height/2 -20,
      width: 200,
      height: 40,
      lineHeight: 40,
      backgroundColor: '#ff0000',
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 16,
      borderRadius: 4,
    },
  });

  button.onTap((res) => {
    if (res.userInfo) {
      console.log("用户授权:", res);
      //此时可进行登录操作

      //获取用户信息
      getUserInfo(lable);
      button.destroy();
  }else {
      console.log("用户拒绝授权:", res);
      button.destroy();
  }
  })
}




// export function authorize(lable: cc.Node) {
//   wx.authorize({
//     success(res) {
//       console.log(res.authSetting)
//       if (res.authSetting['scope.userInfo']) {
//         console.log("userInfo 已经授权")
//         getUserInfo(lable)
//       }else{
//         console.log("userInfo 未授权")
//       }
//     }
//   })
// }
