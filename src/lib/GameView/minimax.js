import { game } from "../../store.svelte";

function cloneBoard(board){
    let newBoard = []
    for (let r = 0; r < board.length; r++){
        let row = []
        for (let c = 0; c < board[r].length; c++){
            row.push(board[r][c])
        }
        newBoard.push(row)
    }
    return newBoard
}

function getAvailableMoves(board){
    let moves = []
    for (let c = 0; c < board[0].length; c++){
        if (board[0][c] === 'empty'){
            moves.push(c)
        }
    }
    return moves
}
function isGameOver(board){
    let moves = getAvailableMoves(board)
    if (moves.length == 0){
        return true
    }
    if (heuristicFunction(board, true).winner != null){
        return true
    }
    return false
}
function heuristicFunction(board, maximizingPlayer){
    const lines = [...game.getDiagonals(board), ...game.getRows(board), ...game.getColumns(board)];
    let p1Score = 0;
    let p2Score = 0;
    lines.forEach(line => {
        let playerOnePieces = [];
        let playerTwoPieces = [];
        line.forEach(element => {
            if (playerOnePieces.length == 4 || playerTwoPieces.length == 4){
                return;
            }
            if (element[1] == 'PlayerOne'){
                if (playerTwoPieces.length > 0){
                    p2Score += playerTwoPieces.length ** 5;
                }
                playerOnePieces.push(element[0]);
                playerTwoPieces = [];
            }else if (element[1] == 'PlayerTwo'){
                if (playerOnePieces.length > 0){
                    p1Score += playerOnePieces.length ** 5;
                }
                playerTwoPieces.push(element[0]);
                playerOnePieces = [];
            }else{
                playerOnePieces = [];
                playerTwoPieces = [];
            }
        });
        if (playerOnePieces.length == 4){
            p1Score = Infinity
        }else if (playerTwoPieces.length == 4){
            p2Score = Infinity
        }
    });
    if (board.every(row => row.every(column => column != 'empty'))){
        return {
            winner: 'draw',
            value: 0
        }
    }
    let obj = {
        winner: p1Score == Infinity ? 'PlayerOne' : p2Score == Infinity ? 'PlayerTwo' : null,
        value: maximizingPlayer ? p2Score - p1Score ** 6 : -p1Score + p2Score ** 6
    }
    return obj
}

function playPiece(board, column, player){
    let row = 5;
    while (board[row][column] != 'empty'){
        row--;
        if (row < 0){
           return;
        }
    }
    board[row][column] = player;
}

export function computateMinimax(){
    let board = cloneBoard(game.board)

    function minimax(board, depth, alpha, beta, maximizingPlayer, initialDepth){
        if (depth == 0 || isGameOver(board)){
            return heuristicFunction(board, maximizingPlayer).value
        }

        if (maximizingPlayer){
            let maxEval = -Infinity
            let moves = getAvailableMoves(board)
            let bestMove;
            let evaluations = []
            for (let i = 0; i < moves.length; i++){
                let move = moves[i]
                let newBoard = cloneBoard(board)
                playPiece(newBoard, move, 'PlayerTwo')
                let playEval = minimax(newBoard, depth - 1, alpha, beta, false, initialDepth)
                evaluations.push([playEval, move])
                maxEval = Math.max(maxEval, playEval)
                alpha = Math.max(alpha, playEval)
                if (depth == initialDepth && maxEval == playEval){
                    bestMove = move
                }
                if (beta <= alpha && depth != initialDepth){
                    return maxEval
                }
            }
            if (depth == initialDepth){
                return {
                    move: bestMove,
                    maxEval: maxEval,
                }
            }
            return maxEval
        }else{
            let minEval = Infinity
            let moves = getAvailableMoves(board)
            let evaluations = []
            for (let i = 0; i < moves.length; i++){
                let move = moves[i]
                let newBoard = cloneBoard(board)
                playPiece(newBoard, move, 'PlayerOne')
                let playerEval = minimax(newBoard, depth - 1, alpha, beta, true, initialDepth)
                evaluations.push([playerEval, move])
                minEval = Math.min(minEval, playerEval)
                beta = Math.min(beta, playerEval)
                if (beta <= alpha){
                    return minEval
                }
            }
            return minEval
        }
    }
    return minimax(board, 6, -Infinity, Infinity, true, 6).move
}