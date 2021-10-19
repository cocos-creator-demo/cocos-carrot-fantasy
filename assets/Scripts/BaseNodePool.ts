
const { property } = cc._decorator;


export default class BasePool extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab

    pool: cc.NodePool = null
    nodeList: cc.Node[]

    init() {
        this.nodeList = []
        this.initPool()
    }

    initPool() {
        this.pool = new cc.NodePool();
        let initCount = 3; // 最大节点，3个
        for (let i = 0; i < initCount; ++i) {
            let node = cc.instantiate(this.prefab); // 创建节点
            this.pool.put(node); // 通过 put 接口放入对象池
            this.nodeList.push(node)
        }
    }

    // 从节点池获取一个节点
    createPipe() {
        let pipe = null
        if (this.pool.size() > 0) {
            pipe = this.pool.get()
        } else {
            pipe = cc.instantiate(this.prefab)
        }
        return pipe
    }

    // 回收节点，在合适的时机调用
    reusePipe(pipe: cc.Node) {
        this.pool.put(pipe)
    }

    reset() {
        this.nodeList.forEach(node => {
            this.reusePipe(node)
        })
    }
}