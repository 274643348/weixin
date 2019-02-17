class GameUiTools{

     setButtonClickEvents(target:cc.Component, menu:any, handler:string, customEventData:string = "0",isScale:boolean = true) {
        let arrayMenu = new Array();
        if (menu.length == undefined) {
            arrayMenu[0] = menu;

        } else {
            arrayMenu = menu;
        }
        for (let i = 0; i < arrayMenu.length; i++) {
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = target.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = target.node.name;//这个是代码文件名
            clickEventHandler.handler = handler;
            if (menu.length == undefined) {
                clickEventHandler.customEventData = customEventData;
            } else {
                clickEventHandler.customEventData = ""+i;
            }
            let button = arrayMenu[i].addComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
            if(isScale == undefined || isScale) {
                button.transition = cc.Button.Transition.SCALE;
                button.duration = 0.1;
                button.zoomScale = 1.2;
            }
        }
    }
}

export const gameUiTools = new GameUiTools();