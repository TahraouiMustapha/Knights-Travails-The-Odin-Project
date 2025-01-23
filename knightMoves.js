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
        do {
            square = myQueue.dequeue();
            // this node had visited
            adjacencyMatrice[square.x][square.y] = true; 
            square.findPossibleMoves();
            let myList = square.possibleMoves; // is a linked list for child nodes
            let myEndMove = myList.doOnEachNode((move) => {
                if(move.equalTo(endSquare)) {
                    console.log('we find it');
                    return move;
                } else {
                    if(!adjacencyMatrice[move.x][move.y]) myQueue.enqueue(move); // if this node had visited do not enter it
                    return null;
                }
            })

            if(myEndMove) {
                square = myEndMove;
                break;
            }
            
        } while(!myQueue.isEmpty());

        return getPath(square);

    }
}


function getPath(square) {
    let stack = [], path= [];
    while(square != null) {
        stack.push(square.toArray());
        square = square.previous;
    }
    while(stack.length !== 0) {
        path.push(stack.pop());
    }
    return path;
}



console.log(knightMoves([0, 0], [7, 7]))



