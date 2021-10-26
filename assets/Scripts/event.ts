// 定义一些全局事件
export enum eventNameEnum {
  MONSTER_EAT_CARROT = 'MONSTER_EAT_CARROT', // 怪物吃到萝卜
  GAME_OVER = 'GAME_OVER', // 游戏结束
  UPDATE_CARROT_BLOOD = 'UPDATE_CARROT_BLOOD', // 更新萝卜血量
  CREATE_TOWER = 'CREATE_TOWER', // 创建防御塔
  REMOVE_BULLET = 'REMOVE_BULLET', // 移除子弹
  WAVE_CHANGE = 'WAVE_CHANGE', // 波数更新
}

// https://docs.cocos.com/creator/api/zh/classes/EventTarget.html?h=eventtarget
// 借助node的eventTarget实现一个全局的eventBus
export const eventBus = new cc.Node()

