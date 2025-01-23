import { Square } from "./Square.js";
import { Queue } from "./Queue.js";

function knightMoves(coordinates1, coordinates2, adjacencyMatrice = []) {
    if(coordinates1.length !== 2 || coordinates2.length !== 2) {
        throw new Error('Invalid coordinates : [x, y]');
    }
    const startSquare = new Square(...coordinates1);
    const endSquare = new Square(...coordinates2);

    if(startSquare.equalTo(endSquare)) { // if the knight are in the end square
        return {
            path: endSquare.toArray(),
            doesFindIt: true
        }
    } else {
        adjacencyMatrice.length === 0 ? adjacencyMatrice = new Array(8).fill(null).map(() => new Array(8).fill(false)) : null;
         
        let myQueue = new Queue();
        // Enqueue the possible moves 
        startSquare.findPossibleMoves();
        let myLinkedList = startSquare.possibleMoves;
        let result = myLinkedList.doOnEachNode((node) => {
            let move = node.obj; // get the square obj from node in possibe moves list
            if(move.equalTo(endSquare)) return move;
            else {
                !adjacencyMatrice[move.x][move.y] ? myQueue.enqueue(move) : null; // if had visited 
            }
            adjacencyMatrice[move.x][move.y] = true; // we have visited this node
        })
        
        if(result) return {
            path : [startSquare.toArray(), result.toArray()],
            doesFindIt: true
        };
        
        let myResutlObj = { path: []};
        while(!myQueue.isEmpty()) {
            let value = myQueue.dequeue().toArray();
            console.log(value, endSquare.toArray())
            myResutlObj = knightMoves(value, endSquare.toArray(), adjacencyMatrice);
            if(myResutlObj.doesFindIt) myQueue.freeQueue();
        }

        return {
            path:[startSquare.toArray()].concat(myResutlObj.path),
            doesFindIt: false
        };
    }
}

console.log(knightMoves([3, 3], [0, 0]).path)

