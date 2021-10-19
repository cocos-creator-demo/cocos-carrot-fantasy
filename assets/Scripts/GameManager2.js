var LevelData = [
    {
        // 第1关
        themeID: 1, // 主题
        group: 6, // 组数
        gold: 800, // 初始金币
        enemyInterval: 1, // 刷怪时间间隔
        groupInterval: 1, // 组数时间间隔
        levelName: "level 1", // 关卡名字
        blood: 10, // 萝卜血量

        monsterGroup: [
            // 每一关的怪物数据
            {
                // 第1组
                index: 1,
                team: [{ name: "L11", count: 5, blood: 5.0, speed: 180 },],
            },
            {
                // 第2组
                index: 2,
                team: [{ name: "L21", count: 5, blood: 10.0, speed: 180 }],
            },
            {
                // 第3组
                index: 3,
                team: [
                    { name: "L21", count: 5, blood: 20.0, speed: 180 },
                    { name: "L31", count: 10, blood: 15.0, speed: 180 },
                ],
            },
            {
                // 第4组
                index: 4,
                team: [{ name: "L11", count: 5, blood: 20.0, speed: 180 }],
            },
            {
                // 第5组
                index: 5,
                team: [
                    { name: "L31", count: 5, blood: 40.0, speed: 180 },
                    { name: "L11", count: 5, blood: 40.0, speed: 180 },
                    { name: "L21", count: 5, blood: 45.0, speed: 180 },
                ],
            },
            {
                // 第6组
                index: 6,
                team: [
                    { name: "L31", count: 5, blood: 50.0, speed: 180 },
                    { name: "L11", count: 5, blood: 50.0, speed: 180 },
                    { name: "L21", count: 5, blood: 50.0, speed: 180 },
                ],
            },
        ],
    },
    {
        // 第2关
        themeID: 1, // 主题
        group: 10, // 组数
        gold: 750, // 初始金币
        enemyInterval: 1, // 刷怪时间间隔
        groupInterval: 3, // 组数时间间隔
        levelName: "level 2", // 关卡名字
        bloodScale: 0.3, // 道具血量乘数
        blood: 10, // 萝卜血量

        monsterGroup: [
            {
                // 第1组
                index: 1,
                team: [
                    { name: "F11", count: 2, blood: 10.0, speed: 180 },
                    { name: "L31", count: 8, blood: 10.0, speed: 180 },
                ],
            },
            {
                // 第2组
                index: 2,
                team: [
                    { name: "F11", count: 4, blood: 10.0, speed: 180 },
                    { name: "L21", count: 5, blood: 10.0, speed: 180 },
                ],
            },
            {
                // 第3组
                index: 3,
                team: [
                    { name: "F11", count: 5, blood: 15.0, speed: 180 },
                    { name: "F21", count: 5, blood: 15.0, speed: 180 },
                ],
            },
            {
                // 第4组
                index: 4,
                team: [
                    { name: "L11", count: 8, blood: 20.0, speed: 180 },
                    { name: "L31", count: 2, blood: 20.0, speed: 180 },
                ],
            },
            {
                // 第5组
                index: 5,
                team: [
                    { name: "F11", count: 6, blood: 33.15, speed: 180 },
                    { name: "L11", count: 2, blood: 47.36, speed: 180 },
                    { name: "P11", count: 2, blood: 56.84, speed: 180 },
                ],
            },
            {
                // 第6组
                index: 6,
                team: [
                    { name: "F11", count: 2, blood: 44.73, speed: 180 },
                    { name: "L31", count: 8, blood: 63.9, speed: 180 },
                ],
            },
            {
                // 第7组
                index: 7,
                team: [
                    { name: "L11", count: 8, blood: 60.44, speed: 180 },
                    { name: "F21", count: 2, blood: 45.31, speed: 180 },
                ],
            },
            {
                // 第8组
                index: 8,
                team: [
                    { name: "L31", count: 4, blood: 96.98, speed: 180 },
                    { name: "P11", count: 6, blood: 116.38, speed: 180 },
                ],
            },
            {
                // 第9组
                index: 9,
                team: [
                    { name: "F11", count: 5, blood: 79.47, speed: 180 },
                    { name: "F21", count: 5, blood: 79.47, speed: 180 },
                ],
            },
            {
                // 第10组
                index: 10,
                team: [
                    { name: "L11", count: 5, blood: 130.06, speed: 180 },
                    { name: "F11", count: 5, blood: 91.04, speed: 180 },
                    { name: "L21", count: 5, blood: 130.06, speed: 180 },
                ],
            },
        ],
    },
    {
        // 第3关
        themeID: 1, // 主题
        group: 15, // 组数
        gold: 900, // 初始金币
        enemyInterval: 1, // 刷怪时间间隔
        groupInterval: 3, // 组数时间间隔
        levelName: "level 3", // 关卡名字
        bloodScale: 0.3, // 道具血量乘数
        blood: 10, // 萝卜血量

        monsterGroup: [
            {
                // 第1组
                index: 1,
                team: [
                    { name: "L11", count: 5, blood: 5.0, speed: 180 },
                    { name: "L21", count: 5, blood: 5.0, speed: 180 },
                ],
            },
            {
                // 第2组
                index: 2,
                team: [
                    { name: "L21", count: 5, blood: 10.0, speed: 180 },
                    { name: "L31", count: 5, blood: 10.0, speed: 180 },
                ],
            },
            {
                // 第3组
                index: 3,
                team: [
                    { name: "L11", count: 5, blood: 15.0, speed: 180 },
                    { name: "L31", count: 5, blood: 15.0, speed: 180 },
                ],
            },
            {
                // 第4组
                index: 4,
                team: [
                    { name: "L21", count: 5, blood: 20.0, speed: 180 },
                    { name: "L11", count: 5, blood: 20.0, speed: 180 },
                ],
            },
            {
                // 第5组
                index: 5,
                team: [{ name: "P11", count: 10, blood: 50.0, speed: 180 }],
            },
            {
                // 第6组
                index: 6,
                team: [
                    { name: "P11", count: 2, blood: 80.0, speed: 180 },
                    { name: "L11", count: 8, blood: 60.0, speed: 180 },
                ],
            },
            {
                // 第7组
                index: 7,
                team: [
                    { name: "L31", count: 4, blood: 80.0, speed: 180 },
                    { name: "P11", count: 6, blood: 100.0, speed: 180 },
                ],
            },
            {
                // 第8组
                index: 8,
                team: [
                    { name: "L21", count: 4, blood: 100.0, speed: 180 },
                    { name: "L31", count: 6, blood: 100.0, speed: 180 },
                ],
            },
            {
                // 第9组
                index: 9,
                team: [
                    { name: "L11", count: 2, blood: 120.0, speed: 180 },
                    { name: "P11", count: 2, blood: 140.0, speed: 180 },
                    { name: "L21", count: 6, blood: 120.0, speed: 180 },
                ],
            },
            {
                // 第10组
                index: 10,
                team: [
                    { name: "L21", count: 5, blood: 150.0, speed: 180 },
                    { name: "L31", count: 5, blood: 150.0, speed: 180 },
                    { name: "P11", count: 2, blood: 200.0, speed: 180 },
                ],
            },
            {
                // 第11组
                index: 11,
                team: [
                    { name: "P11", count: 2, blood: 220.0, speed: 180 },
                    { name: "L31", count: 8, blood: 170.0, speed: 180 },
                ],
            },
            {
                // 第12组
                index: 12,
                team: [
                    { name: "L21", count: 4, blood: 200.0, speed: 180 },
                    { name: "L11", count: 6, blood: 200.0, speed: 180 },
                ],
            },
            {
                // 第13组
                index: 13,
                team: [
                    { name: "P11", count: 6, blood: 280.0, speed: 180 },
                    { name: "L21", count: 4, blood: 240.0, speed: 180 },
                ],
            },
            {
                // 第14组
                index: 14,
                team: [
                    { name: "L11", count: 8, blood: 280.0, speed: 180 },
                    { name: "P11", count: 2, blood: 340.0, speed: 180 },
                ],
            },
            {
                // 第15组
                index: 15,
                team: [
                    { name: "L21", count: 5, blood: 300.0, speed: 180 },
                    { name: "P11", count: 8, blood: 350.0, speed: 180 },
                ],
            },
        ],
    },
];

// 游戏管理对象
var GameManager = {
    level: 0, // 关卡[从0开始]
    levelData: [], // 关卡[数据]
    themeID: 0, // 主题
    monsterGroup: [], // 怪物[数据]池
    group: 0, // 组别
    maxGroup: 0, // 组别[最大值]
    _groupIndex: 0, // 组别索引[仅在遍历时候用]
    carrotBlood: 0, // 萝卜的血量
    gold: 0, // 初始金币
    enemyInterval: 0, // 刷怪时间间隔
    groupInterval: 0, // 组数时间间隔
    levelName: 0, // 关卡名字

    // [获取下一个怪物数据]相关属性
    _teamIndex: 0, // 队伍游标
    _teamCount: 0, // 队伍总数
    _teamMonsterCount: 0, // 当前队伍怪物总数
    _teamMonsterIndex: 0, // 当前队伍怪物游标
    isMonsterGetFinish: false, // 所有怪物是否获取完毕

    // [弹出下一组怪物数据]相关属性
    _monsterDataArray: [], // 怪物数据二维数组

    currMonsterDataPool: [], // [当前]怪物数据池
    currMonsterPool: [], // [当前]怪物节点池
    currBulletPool: [], // [当前]子弹节点池

    isWin: false, // 是否赢了
    // 加载[关卡数据]
    loadLevelData: function (level) {
        this.level = level;
        this.levelData = LevelData[level];
        this.themeID = this.levelData.themeID;
        this.monsterGroup = this.levelData.monsterGroup;
        this.group = 0;
        this.maxGroup = this.monsterGroup.length - 1;
        this._groupIndex = 0;
        this.carrotBlood = this.levelData.blood;
        this.gold = this.levelData.gold;
        this.enemyInterval = this.levelData.enemyInterval;
        this.groupInterval = this.levelData.groupInterval;
        this.levelName = this.levelData.levelName;

        this._teamIndex = 0;
        this._teamCount = this.monsterGroup[0].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount = this.monsterGroup[0].team[0].count - 1;
        this.isMonsterGetFinish = false;

        this._monsterDataArray = [];

        this.currMonsterDataPool = [];
        this.currMonsterPool = [];
        this.currBulletPool = [];

        this.isWin = false;

        // 加载[怪物数据]
        this._loadMonsterData();
    },
    // 加载[怪物数据]
    _loadMonsterData: function () {
        var group; // 组
        var team; // 队
        var unit; // 只
        var data = {};
        this._monsterDataArray = [];
        for (group = 0; group < this.monsterGroup.length; group++) {
            this._monsterDataArray[group] = [];
            for (
                team = 0;
                team < this.monsterGroup[group].team.length;
                team++
            ) {
                for (
                    unit = 0;
                    unit < this.monsterGroup[group].team[team].count;
                    unit++
                ) {
                    data = this._getNextMonsterData();
                    //cc.log("GameManager._loadMonsterData() : ", data);
                    this._monsterDataArray[group].push(data);
                }
            }
        }
    },
    // 获取下一个怪物数据
    _getNextMonsterData: function () {
        if (this.isMonsterGetFinish == true) {
            cc.warn(
                "GameManager._getNextMonsterData() : 所有怪物数据已经获取完毕！"
            );
            return;
        }

        var teamData =
            this.monsterGroup[this._groupIndex].team[this._teamIndex];
        var monsterData = {};
        monsterData.group = this._groupIndex;
        monsterData.name = teamData.name;
        monsterData.blood = teamData.blood;
        monsterData.speed = teamData.speed;
        monsterData.index = this._teamMonsterIndex;

        this._teamMonsterIndex++;
        // 是否进入到下一队
        if (this._teamMonsterIndex > this._teamMonsterCount) {
            this._enterNextTeam();
        }

        return monsterData;
    },
    // 弹出下一组怪物数据
    popNextMonsterGroupData: function () {
        var groupData = [];
        if (this.group <= this.maxGroup) {
            this.group++;
            groupData = this._monsterDataArray[0];
            this._monsterDataArray.splice(0, 1);

            // [抛出事件]组别更新
            // var event = new cc.EventCustom(jf.EventName.GP_UPDATE_GROUP);
            // event.setUserData({
            //     group: this.group,
            // });
            // cc.eventManager.dispatchEvent(event);
        } else {
            groupData = [];
        }
        return groupData;
    },
    // 进入到下一队
    _enterNextTeam: function () {
        this._teamMonsterIndex = 0;
        this._teamIndex++;
        // 进入下一组
        if (this._teamIndex > this._teamCount) {
            this._enterNextGroup();
        }
        // 进入到下一队
        else {
            this._teamMonsterCount =
                this.monsterGroup[this._groupIndex].team[this._teamIndex]
                    .count - 1;
        }
    },
    // 进入到下一组
    _enterNextGroup: function () {
        this._groupIndex++;
        // 添加完毕
        if (this._groupIndex > this.maxGroup) {
            this.isMonsterGetFinish = true;
            return;
        }
        this._teamIndex = 0;
        this._teamCount = this.monsterGroup[this._groupIndex].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount =
            this.monsterGroup[this._groupIndex].team[this._teamIndex].count - 1;
    },
    // 获取当前组怪物总数
    getCurrGroupMonsterSum: function () {
        var monsterCount = 0;
        var team = this.monsterGroup[this.group - 1].team;
        for (var i = 0; i < team.length; i++) {
            monsterCount += team[i].count;
        }
        return monsterCount;
    },
    // 萝卜每次扣一滴血
    subtractCarrotBlood: function () {
        this.carrotBlood = this.carrotBlood <= 0 ? 0 : this.carrotBlood - 1;
        // [抛出事件]血量更新
        // var event = new cc.EventCustom(jf.EventName.GP_UPDATE_CARROT_BLOOD);
        // event.setUserData({
        //     blood: this.carrotBlood,
        // });
        cc.eventManager.dispatchEvent(event);

        // [抛出事件]游戏结束
        if (this.carrotBlood <= 0) {
            // var gameOverEvent = new cc.EventCustom(jf.EventName.GP_GAME_OVER);
            // gameOverEvent.setUserData({
            //     isWin: false,
            // });
            // cc.eventManager.dispatchEvent(gameOverEvent);
        }
    },
    //////////////////////////////
    // getter && setter
    //////////////////////////////
    getLevel: function () {
        return this.level;
    },
    setLevel: function (level) {
        this.level = level;
    },
    getLevelData: function () {
        return this.levelData;
    },
    getThemeID: function () {
        return this.themeID;
    },
    getMonsterGroup: function () {
        return this.monsterGroup;
    },
    getGroup: function () {
        return this.group;
    },
    getMaxGroup: function () {
        return this.maxGroup;
    },
    getGold: function () {
        return this.gold;
    },
    getEnemyInterval: function () {
        return this.enemyInterval;
    },
    getGroupInterval: function () {
        return this.groupInterval;
    },
    getLevelName: function () {
        return this.levelName;
    },
    getCarrotBlood: function () {
        return this.carrotBlood;
    },
    setCarrotBlood: function (blood) {
        this.carrotBlood = blood;
    },
    getCurrMonsterDataPool: function () {
        return this.currMonsterDataPool;
    },
    getCurrMonsterPool: function () {
        return this.currMonsterPool;
    },
    getCurrBulletPool: function () {
        return this.currBulletPool;
    },
    getIsWin: function () {
        return this.isWin;
    },
    setIsWin: function (isWin) {
        this.isWin = isWin;
    },
};

module.exports = GameManager;
