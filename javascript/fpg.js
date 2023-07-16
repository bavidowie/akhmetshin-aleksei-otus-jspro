class Node {
    constructor(name) {
        this.name = name
        this.children = []
    }
    setFromHere() {
        let set = []

        function getSubSet(node) {
            set.push(node.name)
            for (let child of node.children) {
                getSubSet(child)
            }
        }

        getSubSet(this)
        return set
    }
}

class FPTree {
    constructor() {
        let Root = new Node('root')
        this.Root = Root
    }
    addTransaction(Transaction) {
        let CurrentNode = this.Root
        Transaction.forEach(item => {
            let found = false
            CurrentNode.children?.forEach(node => {
                if (node.name === item) {
                    found = true
                    CurrentNode = node
                }
            })
            if (!found) {
                let NewNode = new Node(item)
                if (CurrentNode.children.length > 0)
                    CurrentNode.children.push(NewNode)
                else
                    CurrentNode.children = [NewNode]
                CurrentNode = NewNode
            }
        })
    }
}

function maxItemAssociation (input) {
    if (typeof input !== 'object')
        return 'Wrong input! ' + typeof input
    // Создаем псевдо-FP дерево
    let Tree = new FPTree()
    input.forEach(set => {
        Tree.addTransaction(set.sort())
    })
    // По первым потомкам корневого эл-та определяем наборы для поддеревьев
    let BranchSets = []
    for (let Trunk of Tree.Root.children) {
        BranchSets.push(Trunk.setFromHere())
    }
    // К наборам добавляем пересекающиеся
    let longestSet = []
    for (let LeftSet of BranchSets) {
        for (let RightSet of BranchSets) {
            if (LeftSet.filter(value => RightSet.includes(value)).length > 0) {
                LeftSet = LeftSet.concat(RightSet)
            }
        }
        if (LeftSet.length > longestSet.length) {
            longestSet = LeftSet

        }
    }
    return Array.from(new Set(longestSet)).sort()
}

const testInput1 = [["a", "b"], ["b", "c"], ["d", "e"]],
    testInput2 = [["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"]]


console.log('input: ', testInput1, '\n--------------------->\n', maxItemAssociation(testInput1))
console.log('input: ', testInput2, '\n--------------------->\n', maxItemAssociation(testInput2))
