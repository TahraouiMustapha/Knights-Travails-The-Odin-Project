 import { LinkedList } from "./LinkedList.js";

 class Square {

    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.previous = null;
        this.possibleMoves = new LinkedList();
    }

    findPossibleMoves = () => {
        
        const possibleNode = (newX, newY) => {
            const isValid = (newX <= 7 && newX >= 0) && (newY <= 7 && newY >= 0 );
            if(isValid) {
                let newNode = new Square(newX, newY);
                newNode.previous = this;
                return newNode;
            }
            return null;
        };

        const myRules = [
            [2, 1],
            [2, -1],
            [1, 2],
            [1, -2],
            [-2, 1],
            [-2, -1],
            [-1, 2],
            [-1, -2],
        ];
        myRules.forEach((arr) => {
            let myMove = possibleNode(this.x + arr[0], this.y + arr[1]);
            if(myMove) {
                this.possibleMoves.add(myMove);
            }
        })

    }

}

const node = new Square(0, 0);
node.findPossibleMoves()
console.log(node.possibleMoves);

