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

@ccclass
export default class NewClass extends cc.Component {

    tiledMap: cc.TiledMap
    mapNode: cc.Node
    currGroupCreatedMonsterCount: number
    currGroupCreatedMonsterSum: number

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

        GameManager.loadLevelData(0);
        this.initMap()
        this.mapNode = cc.find('Canvas/map')
    }


    start() { }

    initMap() {

        const themeID = GameManager.getThemeID();
        const level = GameManager.getLevel() + 1;

        const file = `GamePlay/Theme/Theme${themeID}/BG${level}/Level${level}`

        console.log(file)

        cc.resources.load(file, cc.TiledMapAsset, (err, tmx) => {
            const node = new cc.Node()
            node.setAnchorPoint(0, 1)
            const map = node.addComponent(cc.TiledMap)
            map.tmxAsset = tmx as cc.TiledMapAsset

            node.active = false
            this.mapNode.addChild(node)


            this.tiledMap = map

            // map和path的尺寸不一样，处理每个点的偏移
            // const tiledSize = map.getTileSize()
            // const groups = map.getObjectGroups()
            // var offsetX = (cc.winSize.width - node.width) / 2;
            // var offsetY = (cc.winSize.height - node.height) / 2;
            // var finalOffsetX = 0;
            // var finalOffsetY = 0;

            // for (const group of groups) {
            //     // console.log(group)
            //     const groupName = group.getGroupName();
            //     // console.log(group.getPositionOffset())

            //     // 大障碍物[占4格]
            //     if (groupName == "big") {
            //         finalOffsetX = offsetX;
            //         finalOffsetY = offsetY;
            //     }
            //     // 中等障碍物[占用左右2格]
            //     else if (groupName == "little") {
            //         finalOffsetX = offsetX;
            //         finalOffsetY = offsetY + tiledSize.height / 2;
            //     } else if (groupName == "small"
            //         || groupName == "road"
            //         || groupName == "start_end"
            //         || groupName == "invalid") {
            //         finalOffsetX = offsetX + tiledSize.width / 2;
            //         finalOffsetY = offsetY + tiledSize.height / 2;
            //     } else {
            //         cc.warn("GPMainLayer.loadTiledMap(): " + groupName + "对象组的坐标未调整");
            //     }

            // }

            this.initMapRoad()
            this.initStartPoint()
            this.initEndPoint()
            this.loadNextGroupMonster()
        })
    }

    initMapRoad() {
        const roadGroup = this.tiledMap.getObjectGroup("road")
        const roads = roadGroup.getObjects()

    }

    initStartPoint() {
        const tiledSize = this.tiledMap.getTileSize()
        const group = this.tiledMap.getObjectGroup("start_end")
        const [startPoint] = group.getObjects()

        const node = cc.find('Canvas/map/start')
        node.zIndex = 99
        node.active = true

        node.x = startPoint.x + group.getPositionOffset().x + tiledSize.width / 2;
        node.y = startPoint.y + group.getPositionOffset().y + tiledSize.height / 2 + 20;
    }
    initEndPoint() {
        const tiledSize = this.tiledMap.getTileSize()
        const group = this.tiledMap.getObjectGroup("start_end")
        const [_, endPoint] = group.getObjects()
        const node = cc.find('Canvas/map/carrot')
        node.zIndex = 99
        node.active = true

        node.x = endPoint.x + group.getPositionOffset().x + tiledSize.width / 2;
        node.y = endPoint.y + group.getPositionOffset().y + tiledSize.height / 2 + 20;
    }

    loadNextGroupMonster() {
        if (GameManager.getGroup() > GameManager.getMaxGroup()) {
            cc.log("GPMainLayer.loadNextGroupMonster() : 怪物添加完毕");
            return;
        }
        console.log('loadNextGroupMonster')
        GameManager.currMonsterDataPool = GameManager.popNextMonsterGroupData();
        GameManager.currMonsterPool[GameManager.getGroup() - 1] = [];

        this.currGroupCreatedMonsterCount = 0;
        // 怪物总数统计
        this.currGroupCreatedMonsterSum = GameManager.getCurrGroupMonsterSum();

        this.createMonster()
        return
        var groupDelay = cc.delayTime(GameManager.getGroupInterval());
        // 延迟时间
        var enemyDelay = cc.delayTime(GameManager.getEnemyInterval());
        var callback = cc.callFunc(this.createMonster.bind(this));
        var createMonsterAction = cc.sequence(enemyDelay.clone(), callback).repeat(this.currGroupCreatedMonsterSum);
        var finalAction = cc.sequence(groupDelay, createMonsterAction);
        this.node.runAction(finalAction);

    }
    createMonster() {
        var data = GameManager.currMonsterDataPool[0];

        const tiledSize = this.tiledMap.getTileSize()
        const roadPointArray = []

        var roadGroup = this.tiledMap.getObjectGroup("road");
        var roads = roadGroup.getObjects().sort((a, b) => a.id - b.id);
        for (var i = 0; i < roads.length; i++) {
            roadPointArray.push(cc.v2(roads[i].x + roadGroup.getPositionOffset().x + tiledSize.width / 2, roads[i].y + roadGroup.getPositionOffset().y + tiledSize.height / 2));
        }


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
    }


    // update (dt) {}
}
