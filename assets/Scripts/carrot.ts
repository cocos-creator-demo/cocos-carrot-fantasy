
const { ccclass, property } = cc._decorator;


@ccclass
export default class Carrot extends cc.Component {

    @property
    hp: number = 10

    @property(cc.Label)
    hpLabel:cc.Label

    onLoad() {

    }

    init(hp:number){
        this.hp = hp
    }

    updateHp(val) {
        this.hp += val
        this.hpLabel.string = `${this.hp}`
    }
}