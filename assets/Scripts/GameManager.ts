// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html



type MonsterTeam = {
    name: string, // 精灵图
    count: number, // 数量
    blood: number, // 血量
    speed: number // 移动速度
}

type MonsterGroup = {
    index: number,
    team: MonsterTeam[]

}

type LevelData = {
    themeId: number, // 主题
    gold: number, // 初始金币
    blood: number, // 萝卜血量
    enemyInterval: number // 怪物刷新时间
    groupInterval: number // 每组刷新时间
    // 每一组的怪物配置
    monsterGroup: MonsterGroup[]
}


const levelDataList: LevelData[] = [
    {
        themeId: 1,
        gold: 500,
        blood: 10,
        enemyInterval: 2,
        groupInterval: 1,
        // 一共m波怪物，每波怪物由n个team组成，每个team有count个怪物
        monsterGroup: [
            {
                index: 1,
                team: [
                    { name: '1', count: 3, blood: 10, speed: 180 },
                    { name: '1', count: 3, blood: 10, speed: 180 },
                    { name: '1', count: 3, blood: 10, speed: 180 },
                ]
            },
            {
                index: 2,
                team: [
                    { name: '2', count: 3, blood: 10, speed: 180 },
                    { name: '2', count: 3, blood: 10, speed: 180 },
                    { name: '2', count: 3, blood: 10, speed: 180 },
                ]
            }
        ]
    }
]

// 用来管理游戏的数据对象
export default class GameManager {
    level: number = -1
    themeId: number = 1

    currentGroupIndex: number = 0
    currentTeamIndex: number = 0

    currentTeamCount: number = 0

    data: LevelData = null
    constructor(level: number) {
        this.level = level
        this.data = this.loadLevelData(level)
    }


    //  获取指定关卡的数据
    private loadLevelData(level: number): LevelData {
        return levelDataList[level - 1]
    }

    get currentGroup(): MonsterGroup | null {
        return this.data.monsterGroup[this.currentGroupIndex]
    }

    get currentTeam(): MonsterTeam | null {
        if (!this.currentGroup) return null
        return this.currentGroup[this.currentTeamIndex]
    }

    // 产生一个怪物
    spawMonster() {
        let teamChange = false
        let groupChange = false
        if (this.currentTeamCount === this.currentTeam.count) {
            this.currentTeamIndex++
            this.currentTeamCount = 0
            teamChange = true
        }

        if (!this.currentTeam) {
            // 当前波已经遍历完了,切换到下一波
            this.currentTeamIndex = 0
            this.currentGroupIndex++
        }

        if (!this.currentGroup) {
            // 游戏结束 
            return null
        }

        const monster = this.currentTeam[this.currentTeamCount]

        this.currentTeamCount++

        return {
            monster
        }
    }

    getTiledMap(): string {
        const file = `GamePlay/Theme/Theme${this.themeId}/BG${this.level}/Level${this.level}`
        return file
    }

}



