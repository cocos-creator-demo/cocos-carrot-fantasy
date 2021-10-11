// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.TiledMap)
    map: cc.TiledMap

    @property(cc.Node)
    contetnNode: cc.Node

    @property(cc.Prefab)
    pointPrefab: cc.Prefab

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        const currentLv = 10
        this.initMap(currentLv)
    }

    start() { }

    initMap(currentLv: number) {
        const pointGroup = this.map.getObjectGroup("point")
        const objs = pointGroup.getObjects()
        

        objs.forEach((point,index)=>{
            const node = cc.instantiate(this.pointPrefab)
            node.setPosition(point.x, point.y);

            if(currentLv - 1 === index){
                node.getComponent(cc.Animation).play('button_wave')
            }

            // const node = new cc.Node()


            // node.setPosition(point.x, point.y);
            // node.width = 40
            // node.height = 40

            // node.addComponent(cc.Sprite)

            // const btn = node.addComponent(cc.Button)
            // btn.target = node
            // btn.transition = cc.Button.Transition.SPRITE

            // let texture = "ChooseLevel/stagepoint_adv";
            // if (point.isBoos == "YES") {
            //     texture = "ChooseLevel/stagepoint_boss";
            // }
            // else if (point.isTime == "YES") {
            //     texture = "ChooseLevel/stagepoint_time";
            // }
            // else if (point.isChange == "YES") {
            //     texture = "ChooseLevel/stagepoint_chance";
            // } else {
            //     texture = "ChooseLevel/stagepoint_adv";
            // }
            // cc.resources.load(texture, cc.SpriteFrame, (err, texture) => {
            //     btn.normalSprite = texture as cc.SpriteFrame
            // })

            this.contetnNode.addChild(node, 2, 'btn')
            // this.map.node.addChild(node, 100, 'btn')
        })

        this.initRoad(currentLv)


    }

    initRoad(level) {

        for (let i = 0; i < level - 1; ++i) {
            const node = new cc.Node()
            const sp = node.addComponent(cc.Sprite)
            const texture = `ChooseLevel/Route/route_${i + 1}`;
            cc.resources.load(texture, cc.SpriteFrame, (err, texture) => {
                sp.sizeMode = cc.Sprite.SizeMode.RAW
                sp.spriteFrame = texture as cc.SpriteFrame
                sp.type = cc.Sprite.Type.SIMPLE
                sp.trim = false

                if (i % 10 === 9) {
                    node.setAnchorPoint(0, 0.5)
                }

                node.x = node.width / 2 + Math.floor(i / 10) * 960;
                node.y = this.contetnNode.height / 2


                this.contetnNode.addChild(node, 1)
            })

            // const point = this.pointNodeList[i]


        }

    }

    // update (dt) {}
}
