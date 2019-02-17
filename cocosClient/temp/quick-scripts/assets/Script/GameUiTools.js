(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameUiTools.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '80c2bRDDYhPV7DSLGLN3J35', 'GameUiTools', __filename);
// Script/GameUiTools.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameUiTools = /** @class */ (function () {
    function GameUiTools() {
    }
    GameUiTools.prototype.setButtonClickEvents = function (target, menu, handler, customEventData, isScale) {
        if (customEventData === void 0) { customEventData = "0"; }
        if (isScale === void 0) { isScale = true; }
        var arrayMenu = new Array();
        if (menu.length == undefined) {
            arrayMenu[0] = menu;
        }
        else {
            arrayMenu = menu;
        }
        for (var i = 0; i < arrayMenu.length; i++) {
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = target.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = target.node.name; //这个是代码文件名
            clickEventHandler.handler = handler;
            if (menu.length == undefined) {
                clickEventHandler.customEventData = customEventData;
            }
            else {
                clickEventHandler.customEventData = "" + i;
            }
            var button = arrayMenu[i].addComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
            if (isScale == undefined || isScale) {
                button.transition = cc.Button.Transition.SCALE;
                button.duration = 0.1;
                button.zoomScale = 1.2;
            }
        }
    };
    return GameUiTools;
}());
exports.gameUiTools = new GameUiTools();

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
        //# sourceMappingURL=GameUiTools.js.map
        