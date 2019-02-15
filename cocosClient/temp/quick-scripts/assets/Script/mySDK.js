(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mySDK.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5adcfXt8sdMlqqbBr0Qu8un', 'mySDK', __filename);
// Script/mySDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
//获取微信界面大小
var width = 0;
var height = 0;
function login(lable) {
    wx.login({
        success: function (res) {
            lable.string = "" + res.code;
            if (res.code) {
                console.log("登录成功！");
            }
            else {
                console.log("登录失败！" + res.errMsg);
            }
        }
    });
}
exports.login = login;
//获取授权
function getSetting(lable) {
    try {
        //获取微信界面大小
        var sysInfo = wx.getSystemInfoSync();
        width = sysInfo.screenWidth;
        height = sysInfo.screenHeight;
    }
    catch (e) {
        console.log("获取系统参数失败");
    }
    wx.getSetting({
        success: function (res) {
            console.log(res.authSetting);
            if (res.authSetting["scope.userInfo"]) {
                console.log("userInfo 已经授权");
                //获取用户信息
                getUserInfo(lable);
            }
            else {
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
                }
                else {
                    // console.log("用户 userInfo 首次操作");
                    // console.log(res.authSetting)
                    // createUserInfoButton(lable);
                    wx.authorize({
                        scope: "scope.userInfo",
                        success: function () {
                            console.log("用户 成功 授权");
                            getUserInfo(lable);
                        },
                        fail: function () {
                            console.log("用户 拒绝 授权");
                        }
                    });
                }
            }
        }
    });
}
exports.getSetting = getSetting;
function getUserInfo(lable) {
    wx.getUserInfo({
        success: function (res) {
            console.log("getUserInfo success ");
            console.log("res is ", res);
            console.log("在微信登录里面昵称是 :" + res.userInfo.nickName);
            console.log("用户头像信息 :" + res.userInfo.avatarUrl);
            //必须加上?aa=aa.jpg
            cc.loader.load(res.userInfo.avatarUrl + "?aa=aa.jpg", function (err, texture) {
                // Use texture to create sprite frame
                var sf = new cc.SpriteFrame();
                sf.setTexture(texture);
                lable.getComponent(cc.Sprite).spriteFrame = sf;
            });
        },
        fail: function () {
            console.log("getUserInfo fail ");
        },
        complete: function () {
            console.log("getUserInfo complete ");
        }
    });
}
exports.getUserInfo = getUserInfo;
function createUserInfoButton(lable) {
    console.log("width", width);
    console.log("height", height);
    var button = wx.createUserInfoButton({
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
    button.onTap(function (res) {
        if (res.userInfo) {
            console.log("用户授权:", res);
            //此时可进行登录操作
            //获取用户信息
            getUserInfo(lable);
            button.destroy();
        }
        else {
            console.log("用户拒绝授权:", res);
            button.destroy();
        }
    });
}
exports.createUserInfoButton = createUserInfoButton;
/////////////////////////////游戏圈相关
function getGameClub(lable) {
    var button = wx.createGameClubButton({
        icon: "green",
        style: {
            left: 10,
            top: 76,
            width: 40,
            height: 40
        }
    });
}
exports.getGameClub = getGameClub;
////////////////////////////分享功能
function showMenu() {
    wx.onShareAppMessage(function () {
        // 用户点击了“转发”按钮
        return {
            title: "玩家手动"
        };
    });
    wx.showShareMenu();
}
exports.showMenu = showMenu;
function hideMenu() {
    wx.hideShareMenu();
}
exports.hideMenu = hideMenu;
function shareAppMessage() {
    wx.shareAppMessage({
        title: "直接分享"
    });
}
exports.shareAppMessage = shareAppMessage;
//////////////////////////////获取好友链,群玩家数据链
//调用会失败(必须放在开放数据域中)
function getGroupCloudStorage() {
    wx.getGroupCloudStorage({
        keyList: ["score"],
        success: function (res) {
            console.log("getGroupCloudStorage      success ------", res.data);
        },
        fail: function (res) {
            console.log("getGroupCloudStorage      fail ------", res.data);
        }
    });
}
exports.getGroupCloudStorage = getGroupCloudStorage;
//调用会失败(必须放在开放数据域中)
function getFriendCloudStorage() {
    wx.getFriendCloudStorage({
        keyList: ["score"],
        success: function (res) {
            console.log("getFriendCloudStorage      success ------", res.data);
        },
        fail: function (res) {
            console.log("getFriendCloudStorage      fail ------", res.data);
        }
    });
}
exports.getFriendCloudStorage = getFriendCloudStorage;
//调用会失败(必须放在开放数据域中)
function getUserCloudStorage(score, label) {
    wx.getUserCloudStorage({
        keyList: [score],
        success: function (res) {
            console.log("getUserCloudStorage success ---  ", res);
            // label.string = res[score];
        }
    });
}
exports.getUserCloudStorage = getUserCloudStorage;
//主域和开放数据域的通信---开放数据域不能向主域发送消息。
function my_postMessage(type, data) {
    var openDataContext = wx.getOpenDataContext();
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
exports.my_postMessage = my_postMessage;
//////////////////////////////托管用户数据
function setUserCloudStorage(score) {
    wx.setUserCloudStorage({
        KVDataList: [{ key: "score", value: score }],
        success: function (res) {
            console.log("setUserCloudStorage success ---  ", res);
        },
        fail: function (res) {
            console.log("setUserCloudStorage fail ---  ", res);
        }
    });
}
exports.setUserCloudStorage = setUserCloudStorage;
///
function getRandomInt(min, max) {
    var minCeil = Math.ceil(min);
    var maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
}
exports.getRandomInt = getRandomInt;

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
        //# sourceMappingURL=mySDK.js.map
        