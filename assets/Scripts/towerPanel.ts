// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {eventBus, eventNameEnum} from './event';
import Bullet from './bullet'

@ccclass
export default class NewClass extends cc.Component {

  // LIFE-CYCLE CALLBACKS:
  @property(cc.Node)
  icon: cc.Node

  @property(cc.Prefab)
  towerPrefab: cc.Prefab

  onLoad() {
    this.node.zIndex = 999

    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.showIcon.bind(this))

    // todo 根据选择的icon创建不同的塔
    this.icon.on(cc.Node.EventType.MOUSE_DOWN, this.buildTower.bind(this))

    this.node.addComponent(cc.BlockInputEvents)
  }

  showIcon() {
    this.icon.active = true
  }

  // 创建一个塔
  buildTower(e) {
    e.stopPropagation()
    const tower = cc.instantiate(this.towerPrefab)

    tower.x = this.node.x
    tower.y = this.node.y
    this.node.active = false
    // todo 这里需要解耦
    this.node.parent.addChild(tower)
    // todo 扣除金币
  }

  // update (dt) {}
}
