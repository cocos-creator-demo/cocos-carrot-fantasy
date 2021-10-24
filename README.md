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


## 数据管理GameManager

在游戏玩法主页面，有很多数据，书中使用了一个GameManger单例来管理。

## 向量的一些知识点

发射子弹，涉及到向量的计算，如距离、夹角等

参考： 
* [Cocos Creator | 炮弹发射效果模拟](https://cloud.tencent.com/developer/article/1592765)
* [Cocos Creator实用技巧七：方向与角度转换](https://blog.csdn.net/u013321328/article/details/92805107)

### 获取两个点之间的距离

每个炮塔需要遍历怪物列表，找到距离炮塔自身最近的那个怪物作为目标。

因此需要获得炮塔和每个怪物之间的距离 勾股定理可以轻松解决，当然也可以使用向量

问题抽象：两个向量之前的距离等于他们之差的模

```ts
const distance = p2.sub(p1).mag()
```

### 让一个对象朝向另一个对象

当炮塔的攻击范围内出现怪物时，需要将炮管的对准怪物的位置

问题抽象为：让一个对象朝向另一个对象， 例如求点(0,1)到点(1,0)之间的方向， 实际上是求两个向量之差

```ts
function lookAt(p1, p2){
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dir = cc.v2(dx, dy);
  const angle = dir.signAngle(cc.v2(1, 0));  // 与x轴正方向的夹角,rotation的值也是以这个为标准

  const angle2degree = (angle) => {
    return angle * 180 / Math.PI // 弧度转角度
  }
  const degree = angle2degree(angle)
  p1.rotation = degree
}
```

cc.Vec2提供了向量相减的方法，因此可以更简单的实现
```ts
const angle = p2.sub(p1).signAngle(cc.v2(1, 0))
const degree = angle2degree(angle)
p1.rotation = degree
```

### 让一个对象朝着他的方向移动

炮管锁定怪物位置后，需要发射子弹，子弹会朝其初始化的方向做直线运行

问题抽象为：让一个对象朝着他的方向移动，比如一个子弹的初始rotation的角度是45度，则节点会一直朝正右下方移动

首先根据节点的rotation计算出对应方向的单位向量
```js
const rotation = this.node.rotation
// 算出弧度
const angle = rotation / 180 * Math.PI
const dir = cc.v2(Math.cos(angle), Math.sin(angle))
// 单位化向量
dir.normalizeSelf()
```

然后在update的时候计算出对应的偏移即可
```js
const moveSpeed = 100;
this.node.x += dt * dir.x * moveSpeed;
this.node.y += dt * dir.y * moveSpeed;
```


