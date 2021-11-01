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
  weapon: cc.Node // 炮管

  attackScope: number = 140 // 攻击范围

  costGold: number = 150 // 建造时消耗的金币

  // 一些属性
  nearestMonster: cc.Node // 最近的敌人

  onLoad() {
    // 定期调整转向和开火
    this.schedule(this.onRotateAndFire.bind(this), 0.5)
  }

  // 遍历敌人列表，找到最近的敌人
  findNearestMonster() {
    const currentMonsterList = GameManager.currentMonsterList;
    let currMinDistant = this.attackScope;
    let nearestEnemy = null;
    let monster = null;
    let distance = 0;
    for (let i = 0; i < currentMonsterList.length; i++) {
      monster = currentMonsterList[i];
      const p1 = this.node.position
      const p2 = monster.position
      distance = p1.sub(p2).mag()

      if (distance < currMinDistant) {
        currMinDistant = distance;
        nearestEnemy = monster;
      }
    }
    this.nearestMonster = nearestEnemy;
    return nearestEnemy;
  }

  onRotateAndFire() {
    const monster = this.findNearestMonster()

    if (!monster) return

    // 计算两个点之间的位置，然后调整转向
    const p1 = this.node.position
    const p2 = this.nearestMonster.position
    // 炮台需要旋转的角度
    const angle = p2.sub(p1).signAngle(cc.v2(1, 0))

    const degree = angle * 180 / Math.PI
    // 旋转位置后开火
    const action = cc.sequence(
      cc.rotateTo(0.2, degree),
      cc.callFunc(() => {
        this.fire()
      })
    )

    this.weapon.runAction(action)
  }

  fire() {
    const node = cc.instantiate(this.bulletPrefab)
    node.x = this.node.x
    node.y = this.node.y
    node.angle = this.weapon.angle

    const bullet = node.getComponent(Bullet)
    bullet.init(this.nearestMonster)

    this.node.parent.addChild(node)
  }

}
