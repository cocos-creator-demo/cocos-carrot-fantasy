// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

// import GameManager from "./GameManager";
import * as GameManager from './GameManager2'
import Monster from './Monster'

import { eventBus, eventNameEnum } from './event';
import Carrot from './carrot'

enum MapCellEnum {
    blank = 0,
    road = 1,
    big = 2,
    little = 3,
    small = 4
}

@ccclass
export default class NewClass extends cc.Component {

    tiledMap: cc.TiledMap
    mapNode: cc.Node
    currGroupCreatedMonsterCount: number
    currGroupCreatedMonsterSum: number

    roadPointArray: cc.Vec2[]

    @property(Carrot)
    carrot: Carrot

    @property(cc.Prefab)
    towerPanelPrefab: cc.Prefab

    mapArr: any[][]

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

        GameManager.loadLevelData(0);

        this.mapNode = cc.find('Canvas/map')

        this.initMap(() => {

            this.initRoads()
            this.initStartPoint()
            this.initEndPoint()
            this.initObstances()

            this.initMapTouchEvent()

            this.initBlankPos()

            // 开始关卡
            // this.loadNextGroupMonster()
        })

        this.initListener()
    }


    start() { }

    initListener() {

        eventBus.on(eventNameEnum.MONSTER_EAT_CARROT, this.onMonsterEatCarrot.bind(this))

        eventBus.on(eventNameEnum.GAME_OVER, this.onGameOver.bind(this))

        eventBus.on(eventNameEnum.CREATE_TOWER, this.onCreateTower.bind(this))


    }

    initMap(cb) {
        const themeID = GameManager.getThemeID();
        const level = GameManager.getLevel() + 1;

        const file = `GamePlay/Theme/Theme${themeID}/BG${level}/Level${level}`

        cc.resources.load(file, cc.TiledMapAsset, (err, tmx) => {
            const node = new cc.Node()
            node.setAnchorPoint(0, 1)
            const map = node.addComponent(cc.TiledMap)
            map.tmxAsset = tmx as cc.TiledMapAsset

            node.active = false
            this.mapNode.addChild(node)
            this.tiledMap = map

            const mapSize = this.tiledMap.getMapSize()

            // 保存每个地图点
            const arr = []
            for (let i = 0; i < mapSize.height; ++i) {
                const row = new Array(mapSize.width).fill(MapCellEnum.blank)
                arr.push(row)
            }

            this.mapArr = arr

            cb()
        })
    }

    initStartPoint() {
        const tiledSize = this.tiledMap.getTileSize()
        const group = this.tiledMap.getObjectGroup("start_end")
        const [startPoint] = group.getObjects()

        const node = cc.find('Canvas/map/start')
        node.active = true

        node.x = startPoint.x + group.getPositionOffset().x + tiledSize.width / 2;
        node.y = startPoint.y + group.getPositionOffset().y + tiledSize.height / 2 + 20;
    }

    initEndPoint() {
        const tiledSize = this.tiledMap.getTileSize()
        const group = this.tiledMap.getObjectGroup("start_end")
        const [_, endPoint] = group.getObjects()
        const node = cc.find('Canvas/map/carrot')
        node.active = true

        node.x = endPoint.x + group.getPositionOffset().x + tiledSize.width / 2;
        node.y = endPoint.y + group.getPositionOffset().y + tiledSize.height / 2 + 20;

        // 初始化萝卜和血量状态
        this.carrot = node.getComponent(Carrot)
        this.carrot.init(10)
    }

    initRoads() {
        const tiledSize = this.tiledMap.getTileSize()
        const roadPointArray = []

        var roadGroup = this.tiledMap.getObjectGroup("road");
        // 这里要按顺序排序才行
        var roads = roadGroup.getObjects().sort((a, b) => a.id - b.id);

        for (const point of roads) {
            const x = point.x + tiledSize.width / 2
            const y = point.y + tiledSize.height / 2

            roadPointArray.push(cc.v2(x, y));
        }

        this.roadPointArray = roadPointArray

        for (let i = 0; i < roads.length; ++i) {
            const cur = roads[i]

            const x0 = cur.x / tiledSize.width
            const y0 = cur.y / tiledSize.height

            this.mapArr[y0][x0] = MapCellEnum.road

            const next = roads[i + 1]
            if (!next) continue

            const x1 = next.x / tiledSize.width
            const y1 = next.y / tiledSize.height

            if (y0 === y1) {
                // 水平
                for (let j = Math.min(x0, x1); j <= Math.max(x0, x1); ++j) {
                    this.mapArr[y0][j] = MapCellEnum.road
                }
            } else if (x0 === x1) {
                // 竖直
                for (let j = Math.min(y0, y1); j <= Math.max(y0, y1); ++j) {
                    this.mapArr[j][x0] = MapCellEnum.road
                }
            }
        }
    }

    // 创建障碍
    initObstances() {

        const list = ['big', 'small', 'little']
        list.forEach(key => {
            this.initObstance(key)
        })

    }
    initObstance(name) {
        const themeID = GameManager.getThemeID();

        const tiledSize = this.tiledMap.getTileSize()


        const group = this.tiledMap.getObjectGroup(name)
        const points = group.getObjects()

        const arr = this.mapArr
        for (const point of points) {

            const i = point.x / tiledSize.width
            const j = point.y / tiledSize.height
            // console.log(point.x / tiledSize.width, point.y / tiledSize.height)

            const node = new cc.Node()
            if (name === 'little') {
                arr[j][i] = MapCellEnum.little
                arr[j][i - 1] = MapCellEnum.little

                node.x = point.x
                node.y = point.y + group.getPositionOffset().y + tiledSize.height / 2;
            } else if (name === 'small') {
                arr[j][i] = MapCellEnum.small

                node.x = point.x + group.getPositionOffset().x + tiledSize.width / 2;
                node.y = point.y + group.getPositionOffset().y + tiledSize.height / 2;
            } else if (name === 'big') {
                arr[j][i] = MapCellEnum.big
                arr[j][i - 1] = MapCellEnum.big
                arr[j - 1][i] = MapCellEnum.big
                arr[j - 1][i - 1] = MapCellEnum.big

                node.x = point.x
                node.y = point.y
            }

            const sp = node.addComponent(cc.Sprite)
            const file = `GamePlay/Object/Theme${themeID}/Object/${point.name}`

            cc.resources.load(file, cc.SpriteFrame, (err, texture: cc.SpriteFrame) => {
                sp.spriteFrame = texture
            })

            this.mapNode.addChild(node)
        }
    }
    // 创建可建造区域
    initBlankPos() {

        // 需要翻转一下
        this.mapArr = this.mapArr.reverse()

        const mapSize = this.tiledMap.getMapSize()
        const tiledSize = this.tiledMap.getTileSize()

        const layer = this.tiledMap.getLayer('bg')
        console.log(layer.node)
        layer.node.zIndex = 999

        layer.node.on(cc.Node.EventType.MOUSE_DOWN, (e: cc.Touch) => {
            console.log('layer touch')
        })

        for (let i = 0; i < mapSize.height; ++i) {
            for (let j = 0; j < mapSize.width; ++j) {
                const cell = this.mapArr[i][j]
                if (cell === MapCellEnum.blank) {
                    // 这里貌似tiled.node不能注册点击事件，有点奇怪
                    const tiled = layer.getTiledTileAt(j, i, true)

                    tiled.node.width = tiledSize.width
                    tiled.node.height = tiledSize.height
                    tiled.node.zIndex = 9999
                    tiled.node.on(cc.Node.EventType.MOUSE_DOWN, () => {
                        console.log('tiled click')
                    })

                    // const node = cc.instantiate(this.towerPanelPrefab)
                    // node.x = tiled.node.x + tiledSize.width / 2;
                    // node.y = tiled.node.y + tiledSize.height / 2;

                    // node.zIndex = 999
                    // // node.on(cc.Node.EventType.MOUSE_DOWN, () => {
                    // //     console.log('tiled click')
                    // // })
                    // this.mapNode.addChild(node)
                }

            }
        }

    }

    initMapTouchEvent() {
        console.log(this.mapNode)
        this.mapNode.color = cc.Color.RED
        const tiledSize = this.tiledMap.getTileSize()
        this.mapNode.on(cc.Node.EventType.MOUSE_DOWN, (e: cc.Touch) => {
            const { x, y } = e.getLocation()

            console.log(y, x)
            const j = Math.floor(x / tiledSize.width)
            const i = Math.floor(y / tiledSize.height)
            console.log(j, i)
        })
    }


    // 产生怪物的逻辑
    loadNextGroupMonster() {
        if (GameManager.getGroup() > GameManager.getMaxGroup()) {
            cc.log("GPMainLayer.loadNextGroupMonster() : 怪物添加完毕");
            return;
        }

        GameManager.currMonsterDataPool = GameManager.popNextMonsterGroupData();
        GameManager.currMonsterPool[GameManager.getGroup() - 1] = [];

        this.currGroupCreatedMonsterCount = 0;
        // 怪物总数统计
        this.currGroupCreatedMonsterSum = GameManager.getCurrGroupMonsterSum();

        // 根据时间间隔依次创建怪物
        var groupDelay = cc.delayTime(GameManager.getGroupInterval());
        // 延迟时间
        var enemyDelay = cc.delayTime(GameManager.getEnemyInterval());
        var callback = cc.callFunc(this.createMonster.bind(this));

        var createMonsterAction = cc.sequence(enemyDelay.clone(), callback).repeat(this.currGroupCreatedMonsterSum);
        var finalAction = cc.sequence(groupDelay, cc.callFunc(() => {
            this.node.runAction(createMonsterAction);
        }));
        // this.node.runAction(finalAction);
        this.node.runAction(finalAction);
    }
    isNeedLoadNextGroup() {
        return this.currGroupCreatedMonsterCount == this.currGroupCreatedMonsterSum
    }
    createMonster() {
        var data = GameManager.currMonsterDataPool[0];
        const roadPointArray = this.roadPointArray

        // 创建怪物数量+1
        this.currGroupCreatedMonsterCount++;

        var monsterData = {
            road: roadPointArray,
            speed: data.speed,
            index: data.index
        };

        var namePrefix = data.name.substring(0, data.name.length - 1);
        var fileNamePrefix = "Theme" + GameManager.getThemeID() + "/Monster/" + namePrefix;

        const themeID = GameManager.getThemeID();

        var fileName = `GamePlay/Object/Theme${themeID}/Monster/${namePrefix}1`;
        var node = new Monster(fileName, monsterData, fileNamePrefix);


        // todo 处理这个坐标的问题

        this.mapNode.addChild(node, 99);
        GameManager.currMonsterPool[GameManager.getGroup() - 1].push(node);
        node.setPosition(roadPointArray[0]);
        node.run();

        // 删除掉第一个数据
        GameManager.currMonsterDataPool.splice(0, 1);

        if (this.isNeedLoadNextGroup()) {
            this.loadNextGroupMonster()
        }
    }

    // 注册事件回调
    onMonsterEatCarrot(event: cc.Event.EventCustom) {
        const { target } = event.getUserData()
        // todo 回收monster节点到对象池
        target.parent.removeChild(target)

        if (this.carrot.hp <= 0) {
            this.onGameOver()
        } else {
            // 修改萝卜的血量
            this.carrot.updateHp(-1)
        }
    }

    onGameOver() {
        console.log('game over')
    }
    onCreateTower() {

    }
    // update (dt) {}
}
