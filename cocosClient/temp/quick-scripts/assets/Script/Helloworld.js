(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Helloworld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Helloworld', __filename);
// Script/Helloworld.ts

Object.defineProperty(exports, "__esModule", { value: true });
var mySDK_1 = require("./mySDK");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Helloworld = /** @class */ (function (_super) {
    __extends(Helloworld, _super);
    function Helloworld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Helloworld.prototype.loginEvent = function (event, customEventData) {
        console.log("ljy------loginevent");
        mySDK_1.login(this.label);
        mySDK_1.getSetting(this.touxiang);
        //域名被限制
        // var remoteUrl = "http://172.16.0.143:8080/static/img/tuoyuan.png";
        // cc.loader.load(remoteUrl, function (err, texture) {
        //     // Use texture to create sprite frame
        //     const sf = new cc.SpriteFrame();
        //     sf.setTexture(texture)
        //     this.touxiang.getCompment(cc.Sprite).SpriteFrame = sf;
        // });
    };
    __decorate([
        property(cc.Label)
    ], Helloworld.prototype, "label", void 0);
    __decorate([
        property(cc.Node)
    ], Helloworld.prototype, "touxiang", void 0);
    Helloworld = __decorate([
        ccclass
    ], Helloworld);
    return Helloworld;
}(cc.Component));
exports.default = Helloworld;

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
        //# sourceMappingURL=Helloworld.js.map
        