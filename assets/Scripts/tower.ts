// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import Bullet from './bullet'

import GameManager from './GameManager'


@ccclass
export default class Tower extends cc.Component {

  @property(cc.Prefab)
  bulletPrefab: cc.Prefab // 子弹类型


  @property(cc.Node)
  weapon:cc.Node // 炮管

  attackScope: number = 100 // 攻击范围

  codeGold: number = 150 // 建造时消耗的金币

  // 一些属性
  nearestMonster: cc.Node // 最近的敌人

  onLoad() {
    // 定期调整转向和开火
    this.schedule(this.onRoateAndFire.bind(this), 0.5)
  }

  // 遍历敌人列表，找到最近的敌人
  findNearestMonster() {
    var monsterArray = GameManager.currMonsterPool;
    var currMinDistant = this.attackScope;
    var nearestEnemy = null;
    var monster = null;
    var distance = 0;
    for (var i = 0; i < monsterArray.length; i++) {
      for (var j = 0; j < monsterArray[i].length; j++) {
        monster = monsterArray[i][j];

        const p1 = this.node.position
        const p2 = monster.position
        distance = p1.sub(p2).mag()

        if (distance < currMinDistant) {
          currMinDistant = distance;
          nearestEnemy = monster;
        }
      }
    }
    this.nearestMonster = nearestEnemy;
    return nearestEnemy;
  }

  onRoateAndFire() {
    const monster = this.findNearestMonster()
    console.log(monster)

    if (!monster) return

    // 计算两个点之间的位置，然后调整转向
    const p1 = this.node.position
    const p2 = this.nearestMonster.position
    const angle = p1.angle(p2)


    // 旋转位置后开火
    const action = cc.sequence(
      cc.rotateTo(0.2, angle),
      cc.callFunc(() => {
        this.fire()
      })
    )

    this.node.runAction(action)
  }

  fire() {
    const node = cc.instantiate(this.bulletPrefab)
    node.x = this.node.x
    node.y = this.node.y

    const bullet = node.getComponent(Bullet)
    bullet.init(this.nearestMonster)

    this.node.parent.addChild(node)
  }

}
