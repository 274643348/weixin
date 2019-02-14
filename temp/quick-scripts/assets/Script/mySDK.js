(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mySDK.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5adcfXt8sdMlqqbBr0Qu8un', 'mySDK', __filename);
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
        