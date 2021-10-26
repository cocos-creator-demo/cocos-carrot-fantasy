// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {eventBus, eventNameEnum} from "./event";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Label)
  currentWave: cc.Label = null

  @property(cc.Label)
  totalWave: cc.Label = null

  @property(cc.Label)
  goldNumLabel: cc.Label = null

  // LIFE-CYCLE CALLBACKS:

  init(){

  }

  start() {
    const totalWave = GameManager.monsterGroup.length
    this.currentWave.string = `${totalWave}`

    // todo 找到一种比较好的同步数据的方法
    eventBus.on(eventNameEnum.WAVE_CHANGE, (event: cc.Event.EventCustom) => {
      const {wave} = event.getUserData()
      this.updateCurrentWave(wave)
    })
  }

  updateCurrentWave(wave) {
    this.currentWave.string = `${wave}`
  }

  updateGoldNum(num) {
    this.goldNumLabel.string = `${num}`
  }

  // update (dt) {}
}
