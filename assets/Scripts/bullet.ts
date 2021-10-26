// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;


type BulletTarget = cc.Node


// todo 对象池
@ccclass
export default class Bullet extends cc.Component {

  target: BulletTarget

  onLoad() {

  }

  init(target: BulletTarget) {
    this.target = target

    const pos = cc.v2(target.x, target.y)
    const action = cc.moveTo(0.2, pos)

    this.node.runAction(cc.sequence(
      action,
      cc.callFunc(() => {
        this.node.parent.removeChild(this.node)
        // todo 消灭monster，扣除monster血量

        if(target.parent) {
          target.parent.removeChild(target)
          GameManager.removeMonster(target)
        }
      })
    ))
  }

  update(dt) {
    // 向 target 位置移动

    // 到达时进行攻击

  }
}
