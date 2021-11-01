// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {eventBus, eventNameEnum} from "./event"

export default class Monster extends cc.Node {
  road: any[]   // 移动路径
  data: any   // 数据
  speed: number = 0    // 速度
  index: number = 0    // 索引
  roadIndex: number = 0    // 当前移动路径的前缀
  fileNamePrefix: string   // 帧前缀
  hp: number = 5 // 怪物血量
  constructor(fileName, data, fileNamePrefix) {
    super();
    this.loadProperty(data, fileNamePrefix);

    const sp = this.addComponent(cc.Sprite)

    // todo 改成prefab
    cc.resources.load(fileName, cc.SpriteFrame, (err, texture) => {
      sp.spriteFrame = texture as cc.SpriteFrame
    })

    // this.initHpBar()

  }

  // 貌似不展示
  initHpBar() {
    const hpBar = new cc.Node()
    const progress = hpBar.addComponent(cc.ProgressBar)
    hpBar.width = 67
    hpBar.height = 10
    hpBar.x = -100
    this.addChild(hpBar)
  }

  loadProperty(data, fileNamePrefix) {

    this.data = data;
    this.speed = data.speed;
    this.road = data.road;
    this.index = data.index;
    this.fileNamePrefix = fileNamePrefix;
  }

  run() {
    this.runNextRoad();
    // 跑到下一个标记点上
    this.playRunAnimation();
  }

  runNextRoad() {
    const cur = this.road[this.roadIndex]
    const next = this.road[this.roadIndex + 1]
    // 转方向
    if (cur.x <= next.x) {
      this.scaleX = -1
    } else {
      this.scaleX = 1
    }
    // var distance = cc.pDistance(this.road[this.roadIndex], this.road[this.roadIndex + 1]);
    const distance = cur.sub(next).mag()
    const time = distance / this.speed;
    const moveTo = cc.moveTo(time, next);
    const callback = cc.callFunc(function () {
      if (this.roadIndex < this.road.length - 1) {
        this.runNextRoad();
      } else {
        // 吃到萝卜事件抛出
        const event = new cc.Event.EventCustom(eventNameEnum.MONSTER_EAT_CARROT, false)
        event.setUserData({
          target: this
        })
        eventBus.dispatchEvent(event)
      }
    }.bind(this));
    var seq = cc.sequence(moveTo, callback);
    this.runAction(seq);
    this.roadIndex++;
  }

  playRunAnimation() {

    // 播放动画

  }

  updateHp(){

  }
}
