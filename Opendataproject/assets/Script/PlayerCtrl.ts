const {ccclass, property} = cc._decorator;

@ccclass
export  class PlayerCtrl extends cc.Component {

    @property(cc.Label)
    label: cc.Label;

    @property(cc.Node)
    head: cc.Node;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.head;
    }

    setData(headUrl:string,name:string){
        const head =this.head;
        const label =this.label;
        cc.loader.load(headUrl + "?aa=aa.jpg", function(
            err,
            texture
          ) {
            // Use texture to create sprite frame
            const sf = new cc.SpriteFrame();
            sf.setTexture(texture);
            head.getComponent(cc.Sprite).spriteFrame = sf;
            label.string = name;
          });

    }

    // update (dt) {}
}
