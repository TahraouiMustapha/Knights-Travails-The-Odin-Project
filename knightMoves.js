import { Square } from "./Square.js";
import { Queue } from "./Queue.js";

function knightMoves(coordinates1, coordinates2) {
    if(coordinates1.length !== 2 || coordinates2.length !== 2) {
        throw new Error('Invalid coordinates : [x, y]');
    }
    const startSquare = new Square(...coordinates1);
    const endSquare = new Square(...coordinates2);

    if(startSquare.equalTo(endSquare)) { // if the knight are in the end square
        return endSquare.toArray();
    } else {
        const adjacencyMatrice = new Array(8).fill(null).map(() => new Array(8).fill(false)) ;
         
        let myQueue = new Queue();
        // Enqueue the start square
        myQueue.enqueue(startSquare);

        // loop for explore the child nodes level by level
        let square;
        let myEndMove = null;
        do {
            square = myQueue.dequeue();
            // this node had visited
            adjacencyMatrice[square.x][square.y] = true; 
            square.findPossibleMoves();
            let myList = square.possibleMoves; // is a linked list for child nodes
            myEndMove = myList.doOnEachNode((move) => {
                if(move.equalTo(endSquare)) {
                    return move;
                } else {
                    if(!adjacencyMatrice[move.x][move.y]) myQueue.enqueue(move); // if this node had visited do not enter it
                    return null;
                }
            })
            
        } while(!myQueue.isEmpty() && !myEndMove);

        createPath(myEndMove).displayResult();

    }
}


function createPath(square) {
    let stack = [], path= [];
    while(square != null) {
        stack.push(square.toArray());
        square = square.previous;
    }
    while(stack.length !== 0) {
        path.push(stack.pop());
    }

    return {
        path, 
        movesNum: path.length - 1,
        displayResult: function() {
            console.log(`You made it in ${ this.movesNum } moves!  Here's your path:`);
            console.log(this.path);
        }
    };
}



knightMoves([0, 0], [7, 7])




