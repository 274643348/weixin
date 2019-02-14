import { login, getUserInfo, getSetting } from './mySDK';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label;

  @property(cc.Node)
  touxiang: cc.Node;

  loginEvent(event: cc.Event.EventTouch, customEventData: any) {
    console.log("ljy------loginevent")
     login(this.label);

     getSetting(this.touxiang)

    //域名被限制
    // var remoteUrl = "http://172.16.0.143:8080/static/img/tuoyuan.png";
    // cc.loader.load(remoteUrl, function (err, texture) {
    //     // Use texture to create sprite frame
    //     const sf = new cc.SpriteFrame();
    //     sf.setTexture(texture)
    //     this.touxiang.getCompment(cc.Sprite).SpriteFrame = sf;
    // });
  }
}
