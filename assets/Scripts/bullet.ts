// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";
import {eventBus, eventNameEnum} from "./event";

const {ccclass, property} = cc._decorator;


type BulletTarget = cc.Node


// todo 对象池
@ccclass
export default class Bullet extends cc.Component {

  target: BulletTarget
  damage: number = 2

  onLoad() {

  }

  init(target: BulletTarget) {
    this.target = target

    const pos = cc.v2(target.x, target.y)
    const action = cc.moveTo(0.2, pos)

    this.node.runAction(cc.sequence(
      action,
      cc.callFunc(() => {
        const event = new cc.Event.EventCustom(eventNameEnum.REMOVE_BULLET, false)
        event.setUserData({
          bullet: this.node,
          monster: target
        })

        eventBus.dispatchEvent(event)
        this.node.parent.removeChild(this.node)
      })
    ))
  }

  update(dt) {
    // 向 target 位置移动

    // 到达时进行攻击

  }
}
