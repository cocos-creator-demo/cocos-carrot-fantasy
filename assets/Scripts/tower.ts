// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    icon: cc.Node

    onLoad() {

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.showIcon.bind(this))

        this.icon.on(cc.Node.EventType.MOUSE_DOWN, this.buildTower.bind(this))
    }

    start() {

    }
    showIcon() {
        this.icon.active = true
    }
    buildTower() {

    }



    // update (dt) {}
}
