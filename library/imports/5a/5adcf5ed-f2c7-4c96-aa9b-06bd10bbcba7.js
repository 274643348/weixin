"use strict";
cc._RF.push(module, '5adcfXt8sdMlqqbBr0Qu8un', 'mySDK');
// Script/mySDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
function login(lable) {
    wx.login({
        success: function (res) {
            lable.string = "" + res.code;
            if (res.code) {
                // 发起网络请求
                wx.request({
                    url: "https://test.com/onLogin",
                    data: {
                        code: res.code
                    }
                });
            }
            else {
                console.log("登录失败！" + res.errMsg);
            }
        }
    });
}
exports.login = login;

cc._RF.pop();