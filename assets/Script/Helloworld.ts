import { login } from './mySDK';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label;

  @property(cc.Node)
  touxiang: cc.Node;

  loginEvent(event: cc.Event.EventTouch, customEventData: any) {
    login(this.label);
  }
}
