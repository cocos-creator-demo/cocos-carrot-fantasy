// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {eventBus, eventNameEnum} from "./event";
import GameManager from "./GameManager";

import Tower from './tower'

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerPanel extends cc.Component {

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

    const cost = tower.getComponent(Tower).costGold
    if (cost > GameManager.gold) {
      cc.log('金币不足，无法创建')
      return
    }

    tower.x = this.node.x
    tower.y = this.node.y
    this.node.active = false
    this.node.parent.addChild(tower)

    GameManager.gold -= cost

    const event = new cc.Event.EventCustom(eventNameEnum.CREATE_TOWER, false)
    event.setUserData({
      cost: cost
    })
    eventBus.dispatchEvent(event)
  }

  // update (dt) {}
}
