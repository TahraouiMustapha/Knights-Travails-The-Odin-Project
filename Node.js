 class Node {

    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.previous = null;
        this.possibleMoves =[];
    }
    
    findPossibleMoves = () => {
        
        const possibleNode = (newX, newY) => {
            const isValid = (newX <= 7 && newX >= 0) && (newY <= 7 && newY >= 0 );
            if(isValid) {
                let newNode = new Node(newX, newY);
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
                this.possibleMoves.push(myMove);
            }
        })

    }

}

const node = new Node(0, 0);
node.findPossibleMoves()
console.log(node.possibleMoves);