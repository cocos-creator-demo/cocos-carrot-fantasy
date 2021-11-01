// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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

  updateTotalWave(wave) {
    this.totalWave.string = `${wave}`
  }

  updateCurrentWave(wave) {
    this.currentWave.string = `${wave}`
  }

  updateGoldNum(num) {
    this.goldNumLabel.string = `${num}`
  }

  // update (dt) {}
}
