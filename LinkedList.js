
class LinkedList {
    constructor() {
        this.head = null;
    }

    add(obj) {
        let newNode = new Node(obj);
        newNode.next = null;
        if(this.head == null) this.head = newNode;
        else {
            let ptr = this.head;
            while(ptr.next != null) {
                ptr = ptr.next;
            }
            ptr.next = newNode;   
        }
    }

    doOnEachNode(callback, node = this.head) {
        if(typeof callback !== 'function') throw new Error('the argument pass in must be a callback!');
        if(node) {
            let result = callback(node);
            if(result) return result;
            return this.doOnEachNode(callback, node.next);
        }
    }
}

class Node {
    constructor(obj) {
        this.obj = obj;
        this.next = null;
    }
}


export { LinkedList };