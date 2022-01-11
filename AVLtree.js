class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
    insert(data, node) {

        if (node === null)
            return new Node(data);
        if (data < node.data)
            node.left = this.insert(data, node.left);
        else if (data > node.data)
            node.right = this.insert(data, node.right);

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        if (this.getBalance(node) === 2 && this.getBalance(node.left) >= 0)
            return this.rightRotation(node);
        else if (this.getBalance(node) === 2 && this.getBalance(node.left) < 0) {
            node.left = this.leftRotation(node.left);
            return this.rightRotation(node);
        }
        else if (this.getBalance(node) === -2 && this.getBalance(node.right) <= 0)
            return this.leftRotation(node);
        else if (this.getBalance(node) === -2 && this.getBalance(node.right) > 0) {
            node.right = this.rightRotation(node.right);
            return this.leftRotation(node);
        }
        return node;
    }

    getHeight(node) {
        return node === null ? -1 : node.height;
    }

    getBalance(node) {
        return node.getHeight(node.left) - node.getHeight(node.right);
    }

    leftRotation(x) {
        const y = x.right;
        const yLeftChild = y.left;
        y.left = x;
        x.right = yLeftChild;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    rightRotation(x) {
        const y = x.left;
        const yRightChild = y.right;
        y.right = x;
        x.left = yRightChild;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    delete(data, node) {
        if (data < node.data && node.left)
            node.left = node.left.delete(data);
        else if (data > node.data && node.right)
            node.right = node.right.delete(data);
        else {
            if (node.data === data) {
                if (node.right && node.left) {
                    let minVal = node.right.findMin();
                    node.data = minVal;
                    node.right = node.right.delete(minVal);
                }
                else if (node.left)
                    return node.left;
                else if (node.right)
                    return node.right;
                else
                    return null;
            }
        }
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        if (this.getBalance(node) === 2 && this.getBalance(node.left) >= 0)
            return this.rightRotation(node);
        else if (this.getBalance(node) === 2 && this.getBalance(node.left) < 0) {
            node.left = this.leftRotation(node.left);
            return this.rightRotation(node);
        }
        else if (this.getBalance(node) === -2 && this.getBalance(node.right) <= 0)
            return this.leftRotation(node);
        else if (this.getBalance(node) === -2 && this.getBalance(node.right) > 0) {
            node.right = this.rightRotation(node.right);
            return this.leftRotation(node);
        }
        return node;
    }
}

module.exports = class AVL {
    constructor() {
        this.root = null;
    }

    insert(data) {
        if (this.root)
            this.root = this.root.insert(data, this.root);
        else
            this.root = new Node(data);
    }

    delete(data) {
        if (this.root)
            this.root.delete(data, this.root);
    }

    contains(data) {
        if (this.root === null) return false;
        let temp = this.root;

        while (temp) {
            if (data < temp.data) {
                temp = temp.left;
            } else if (data > temp.data) {
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
            results.push(currentNode.data)

            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return results;
    }


    DFSPreOrder() {
        let results = [];
        function traverse(currentNode) {
            results.push(currentNode.data);
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
            results.push(currentNode.data);
        }
        traverse(this.root);
        return results;
    }

    DFSInOrder() {
        let results = [];
        function traverse(currentNode) {
            if (currentNode.left) traverse(currentNode.left)
            results.push(currentNode.data);
            if (currentNode.right) traverse(currentNode.right)
        }
        traverse(this.root);
        return results;
    }

    countNodes() {
        let numberOfNodes = 0;
        function traverse(currentNode) {
            numberOfNodes++;
            if (currentNode.left) traverse(currentNode.left)
            if (currentNode.right) traverse(currentNode.right)
        }
        traverse(this.root);
        return numberOfNodes;
    }
}

