import { Square } from "./Square.js";
import { Queue } from "./Queue.js";

function knightMoves(coordinates1, coordinates2, adjacencyMatrice = []) {
    if(coordinates1.length !== 2 || coordinates2.length !== 2) {
        throw new Error('Invalid coordinates : [x, y]');
    }
    const startSquare = new Square(...coordinates1);
    const endSquare = new Square(...coordinates2);

    if(startSquare.equalTo(endSquare)) { // if the knight are in the end square
        return createResultObj(endSquare.toArray() ,true);
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

        if(result) return createResultObj([startSquare.toArray(), result.toArray()], true)
        
        let myResutlObj = createResultObj();
        while(!myQueue.isEmpty()) {
            let value = myQueue.dequeue().toArray();
            myResutlObj = knightMoves(value, endSquare.toArray(), adjacencyMatrice);
            if(myResutlObj.doesFindIt) myQueue.freeQueue();
        }

        return createResultObj([startSquare.toArray()].concat(myResutlObj.path), false);
    }
}

function createResultObj(path = [] , doesFindIt = false) {
    return {
        path, 
        doesFindIt
    }
}


function resetTheAdjacencyMatrice(matrix) {
    for( let i=0 ; i< matrix.length ; i++) {
        for(let j = 0 ; j < matrix[i].length ; j++) {
            matrix[i][j] = false;
        }
    }
}

console.log(knightMoves([3, 3], [0, 0]).path)



