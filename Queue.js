class Queue {
    constructor() {
        this.head = null;
        this.queue = null;
    }

    enqueue(obj) {
        let newNode = new Node(obj);
        newNode.next = null;

        if(this.head == null) {
            this.head = newNode;
            this.queue = newNode;
        } else {
            if(this.queue) {
                this.queue.next = newNode;
                this.queue = this.queue.next;
            }
        }
    }

    dequeue() {
        if(this.head) {
            let myObj = this.head.obj;
            if(this.head == this.queue) {
                this.queue = this.queue.next;
            } 
            this.head = this.head.next;
            return myObj;
        }
        return null;
    }
}

class Node {
    constructor(obj) {
        this.obj = obj;
        this.next = null;
    }
}


