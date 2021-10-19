// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { eventBus, eventNameEnum } from "./event"

export default class Monster extends cc.Node {
    road: any[]   // 移动路径
    data: any   // 数据
    speed: number = 0    // 速度
    index: number = 0    // 索引
    roadIndex: number = 0    // 当前移动路径的前缀
    fileNamePrefix: string   // 帧前缀
    constructor(fileName, data, fileNamePrefix) {
        super();
        this.loadProperty(data, fileNamePrefix);

        const sp = this.addComponent(cc.Sprite)

        cc.resources.load(fileName, cc.SpriteFrame, (err, texture) => {
            sp.spriteFrame = texture as cc.SpriteFrame
        })
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
        // todo 找到 pDistance 的替代
        var distance = cur.sub(next).mag()
        // console.log(distance)
        // console.log(distance2)
        // console.log(distance === distance2)
        var time = distance / this.speed;
        var moveTo = cc.moveTo(time, next);
        var callback = cc.callFunc(function () {
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
}
