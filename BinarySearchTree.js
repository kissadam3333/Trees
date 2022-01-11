class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    findMin() {
        let current = this;
        while (current.left) {
            current = current.left;
        }
        return current.value;
    }
    delete(value) {
        if (value < this.value && this.left)
            this.left = this.left.delete(value);
        else if (value > this.value && this.right)
            this.right = this.right.delete(value);
        else {
            if (this.value === value) {
                if (this.right && this.left) {
                    let minVal = this.right.findMin();
                    this.value = minVal;
                    this.right = this.right.delete(minVal);
                }
                else if (this.left)
                    return this.left;
                else if (this.right)
                    return this.right;
                else
                    return null;
            }
        }
        return this;
    }
}


module.exports = class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value)
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let temp = this.root;

        while (true) {
            if (newNode.value === temp.value) throw new Error('Data already exist within the tree');
            if (newNode.value < temp.value) {
                if (temp.left === null) {
                    temp.left = newNode;
                    return this;
                }
                temp = temp.left;
            } else {
                if (temp.right === null) {
                    temp.right = newNode;
                    return this;
                }
                temp = temp.right;
            }
        }
    }

    contains(value) {
        if (this.root === null) return false;
        let temp = this.root;

        while (temp) {
            if (value < temp.value) {
                temp = temp.left;
            } else if (value > temp.value) {
                temp = temp.right;
            } else {
                return true;
            }
        }

        return false;
    }

    BFS() {
        let currentNode = this.root;
        let queue = [];
        let results = [];

        queue.push(currentNode);

        while (queue.length) {

            currentNode = queue.shift();
            results.push(currentNode.value)

            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return results;
    }

    DFSPreOrder() {
        let results = [];

        function traverse(currentNode) {
            results.push(currentNode.value);
            if (currentNode.left) traverse(currentNode.left)
            if (currentNode.right) traverse(currentNode.right)
        }
        traverse(this.root);
        return results;
    }

    DFSPostOrder() {
        let results = [];

        function traverse(currentNode) {
            if (currentNode.left) traverse(currentNode.left);
            if (currentNode.right) traverse(currentNode.right);
            results.push(currentNode.value);
        }
        traverse(this.root);
        return results;
    }

    DFSInOrder() {
        let results = [];
        function traverse(currentNode) {
            if (currentNode.left) traverse(currentNode.left)
            results.push(currentNode.value);
            if (currentNode.right) traverse(currentNode.right)
        }
        traverse(this.root);
        return results;
    }

    getHeight() {
        const calcHeight = (currentNode) => {
            if (currentNode === null) return -1;
            let leftHeight = calcHeight(currentNode.left);
            let rightHeight = calcHeight(currentNode.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }
        return calcHeight(this.root)
    }

    delete(value) {
        if (this.root)
            this.root = this.root.delete(value);
    }

}
