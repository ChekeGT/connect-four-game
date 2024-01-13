type GameMode = "PvE" | "PvP";
type playerTypes = 'PlayerOne' | 'PlayerTwo' | null;

type pieces = 'empty' | 'PlayerOne' | 'PlayerTwo';
export interface winnerInteface {
    winner: playerTypes,
    pieces: number[]
}


interface timerInterface{
    time: number,
    timer: any
}

type gameStates = 'initialMenu' | 'playingMenu' | 'showRules' | 'playing' | 'gameOver';

function createBoard(){
    let board: Array<Array<pieces>> = $state([]);
    for (let r = 0; r <= 5; r++) {
        let row:Array<pieces> = []
        for (let c = 0; c <= 6; c++) {
            row.push('empty');
        }
        board.push(row);
    }
    return board;
}

function createGame(){
    let gameMode: GameMode = $state("PvP");
    let gameState: gameStates = $state('initialMenu');
    

    let currentPlayer: playerTypes = $state('PlayerOne');
    let playerOneScore: number = $state(0);
    let playerTwoScore: number = $state(0);

    let board: Array<Array<pieces>> = createBoard();
    let turnTimer: timerInterface = $state({time: 0, timer: 0});
    let winner: winnerInteface = $derived(getWinner(board));

    const switchCurrentPlayer = () => {currentPlayer = currentPlayer == 'PlayerOne' ? 'PlayerTwo' : 'PlayerOne';}
    function getColumns() {
        let columns = [];
        for (let c = 0; c <= 6; c++) {
            let column = [];
            for (let r = 0; r <= 5; r++) {
                let key = [r,c]
                column.push([key, board[r][c]]);
            }
            columns.push(column);
        }
        return columns;
    }

    function getRows() {
        let rows = []
        for (let r = 0; r <= 5; r++) {
            let row = [];
            for (let c = 0; c <= 6; c++) {
                let key = [r, c];
                row.push([key, board[r][c]]);
            }
            rows.push(row);
        }
        return rows; 
    }

    function getDiagonals() {
    let matrix = board;
    let diagonals = [];
    // Get diagonals from top-left to bottom-right
    for (let i = 0; i < matrix.length; i++) {
        let diagonal = [];
        for (let j = 0; j <= i && j < matrix[0].length; j++) {
            let key = [i - j, j];
            diagonal.push([key, matrix[i - j][j]]);
        }
        diagonals.push(diagonal);
    }

        for (let i = 1; i < matrix[0].length; i++) {
            let diagonal = [];
            for (let j = 0; j < matrix.length && i + j < matrix[0].length; j++) {
                let key = [matrix.length - 1 - j, i + j];
                diagonal.push([key, matrix[matrix.length - 1 - j][i + j]]);
            }
            diagonals.push(diagonal);
        }

        // Get diagonals from top-right to bottom-left
        for (let i = 0; i < matrix.length; i++) {
            let diagonal = [];
            for (let j = 0; j <= i && j < matrix[0].length; j++) {
                let key = [i - j, matrix[0].length - 1 - j];
                diagonal.push([key, matrix[i - j][matrix[0].length - 1 - j]]);
            }
            diagonals.push(diagonal);
        }

        for (let i = 1; i < matrix[0].length; i++) {
            let diagonal = [];
            for (let j = 0; j < matrix.length && i + j < matrix[0].length; j++) {
                let key = [j, matrix[0].length - 1 - i - j];
                diagonal.push([key, matrix[j][matrix[0].length - 1 - i - j]]);
            }
            diagonals.push(diagonal);
        }

        return diagonals;
    }

    function getWinner(board: Array<Array<pieces>>){
        let winner = {
            winner: null,
            pieces: []
        };
        const lines = [...getDiagonals(), ...getRows(), ...getColumns()];
        lines.forEach(line => {
            let playerOnePieces = [];
            let playerTwoPieces = [];
            line.forEach(element => {
                if (element[1] == 'PlayerOne'){
                    playerOnePieces.push(element[0]);
                    playerTwoPieces = []; 
                }else if (element[1] == 'PlayerTwo'){
                    playerTwoPieces.push(element[0]);
                    playerOnePieces = [];
                }
            });
            if (playerOnePieces.length == 4){
                winner =  ({winner: 'PlayerOne', pieces: playerOnePieces});
            }else if (playerTwoPieces.length == 4){
                winner = ({winner: 'PlayerTwo', pieces: playerTwoPieces});
            }
        });
        if (winner.winner){
            if (winner.winner == 'PlayerOne'){
                playerOneScore++;
            }else{
                playerTwoScore++;
            }
        }
        return winner;
    }

    function switchGameMode(){
        if(gameMode == 'PvE'){
            gameMode = 'PvP';
        }else{
            gameMode = 'PvE';
        }
    }

    function playPiece(row:number, column: number){
        const isPieceTheLastOne = (row:number, column:number) => {
            if (row == 0){
                if (board[1][column] != 'empty'){
                    return true;
                }
                return false;
            }
            if (row == 5){
                return true;
            }
            return board[row + 1][column] != 'empty';
        }
        if (isPieceTheLastOne(row, column)){
            board[row][column] = currentPlayer;
            switchCurrentPlayer();
        }
    }

    return {
        get gameMode(){
            return gameMode;
        },
        get board(){return board},
        get winner(){return winner},
        get gameState(){return gameState},
        set gameState(v){
            if (v == 'initialMenu' || v == 'showRules'){
                clearTimeout(turnTimer.timer);
                turnTimer.time = 0;
                turnTimer.timer = 0;
            }else if(v == 'playing'){
                turnTimer.timer = setTimeout(() => {
                    turnTimer.time--;
                }, 1000);
            }else{
                clearTimeout(turnTimer.timer);
                turnTimer.timer = 0;
            }
            gameState = v
        },
        get turnTimer(){return turnTimer},
        set turnTimer(v){turnTimer = v},
        get playerOneScore(){return playerOneScore},
        get playerTwoScore(){return playerTwoScore},
        switchGameMode,
        playPiece,
        switchCurrentPlayer
    }
}

export let game = createGame();