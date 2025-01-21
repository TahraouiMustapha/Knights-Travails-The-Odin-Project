
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
}

class Node {
    constructor(obj) {
        this.obj = obj;
        this.next = null;
    }
}


export { LinkedList };