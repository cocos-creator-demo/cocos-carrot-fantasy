保卫萝卜 cocos creator版本
===


在[Cocos2d-JS游戏开发](https://www.ituring.com.cn/book/1783)这本书中介绍了cocosJS，及实现保卫萝卜2。

本项目使用随书资源和cocos creator实现保卫萝卜2复刻版，参与一个比较完整的游戏项目，用于学习cocos和游戏开发

核心学习知识点包括
* UI开发
* 动作和动画
* tiledmap的编辑和使用
* 游戏数据配置化
* 塔防游戏的核心实现


## 游戏菜单页面

* UI布局
* 动作系统与动画，页面上的一些动画

## 关卡选择页面

* ScrollView，可以滑动查看长地图
* tiledMap


注意 Sprite组件的 sizeMode 和type为SIMPLE时的trim开关，开启时会自动剔除多余的像素，在使用路径图片时需要使用原图来确保对应的坐标准确，因此需要处理一下

```ts
  for (let i = 0; i < level - 1; ++i) {
            const node = new cc.Node()
            const sp = node.addComponent(cc.Sprite)
            const texture = `ChooseLevel/Route/route_${i + 1}`;
            cc.resources.load(texture, cc.SpriteFrame, (err, texture) => {
                // 使用不做处理的原始图片
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
```

## 游戏界面

塔防游戏的核心玩法

* 读取数据配置
* 读取地图配置
* ...


地图配置数据包括起点、终点、路径、障碍物等地方

数值数据包括怪物类型、数量、波数等


功能点 
* 怪物工厂，负责生成和回收怪物实例到对象池
* 防御塔工厂，负责生成防御塔、升级塔
* 防御塔攻击逻辑： 怪物进行攻击范围，发射子弹，子弹与怪物碰撞检测