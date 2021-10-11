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

    actionDuration: number = 0.6

    start() {

    }

    onLoad() {
        this.initAnim()

    }


    initAnim() {
        this.initHelpAnim()
        this.initSettingAnim()
        this.initMonsterAnim()
        this.initCarrotAnim()
    }

    initHelpAnim() {

        // 身体上下移动
        const body = cc.find('Canvas/help/front_monster_4')
        body?.runAction(cc.sequence(
            cc.moveBy(this.actionDuration, cc.v2(0, 5)),
            cc.moveBy(this.actionDuration, cc.v2(0, -5))
        ).repeatForever())

        // 手臂旋转
        const hand = cc.find('Canvas/help/hand')
        hand?.runAction(cc.sequence(
            cc.rotateBy(this.actionDuration, 6),
            cc.rotateBy(this.actionDuration, -6),
        ).repeatForever());
    }

    initSettingAnim() {
        const node = cc.find('Canvas/setting')
        node?.runAction(cc.sequence(
            cc.moveBy(this.actionDuration * 1.05, cc.v2(0, 8)),
            cc.moveBy(this.actionDuration * 1.05, cc.v2(0, -8))
        ).repeatForever());
    }

    initMonsterAnim() {
        const node1 = cc.find('Canvas/ui/front_monster_3')
        node1?.runAction(cc.sequence(
            cc.moveBy(this.actionDuration * 1.1, cc.v2(0, 3)),
            cc.moveBy(this.actionDuration * 1.1, cc.v2(0, -3))
        ).repeatForever());

        const node2 = cc.find('Canvas/ui/front_monster_1')
        node2?.runAction(cc.sequence(
            cc.moveBy(this.actionDuration * 1.2, cc.v2(3, 0)),
            cc.moveBy(this.actionDuration * 1.2, cc.v2(-3, 0))
        ).repeatForever());

        const node3 = cc.find('Canvas/ui/front_monster_2')
        let rawX = node3.x
        let rawY = node3.y
        node3.x = rawX - 100
        node3.y = rawY - 20
        // 先水平移动，在上下运动
        let action = cc.sequence(
            cc.moveTo(this.actionDuration * 0.5, cc.v2(rawX, rawY)),
            cc.callFunc(() => {
                node3?.runAction(cc.sequence(
                    cc.moveBy(this.actionDuration, cc.v2(0, 3)),
                    cc.moveBy(this.actionDuration, cc.v2(0, -3))
                ).repeatForever())
            }, this)
        )
        node3?.runAction(action)
    }

    initCarrotAnim() {
        const node = cc.find('Canvas/ui/front_carrot')
        node.scale = 0.7
        const x = node.x
        const y = node.y
        node.x = x + 200
        node.y = y + 40
        const pointsTo = [
            cc.v2(node.x, node.y),
            cc.v2(x + 170, y + 30),
            // cc.v2(x + 120, y + 20),
            cc.v2(x, y),
        ]

        node.runAction(cc.spawn(
            cc.bezierTo(this.actionDuration * 0.5, pointsTo),
            cc.scaleTo(this.actionDuration * 0.5, 1)
        ))
    }

    // update (dt) {}
}
