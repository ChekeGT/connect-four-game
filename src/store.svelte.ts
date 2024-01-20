type GameMode = "PvE" | "PvP";
type playerTypes = 'PlayerOne' | 'PlayerTwo' | null;

type winnerTypes = 'PlayerOne' | 'PlayerTwo' | 'draw'

type pieces = 'empty' | 'PlayerOne' | 'PlayerTwo';
export interface winnerInteface {
    winner: winnerTypes,
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
                if (playerOnePieces.length == 4 || playerTwoPieces.length == 4){
                    return;
                }
                if (element[1] == 'PlayerOne'){
                    playerOnePieces.push(element[0]);
                    playerTwoPieces = []; 
                }else if (element[1] == 'PlayerTwo'){
                    playerTwoPieces.push(element[0]);
                    playerOnePieces = [];
                }else{
                    playerOnePieces = [];
                    playerTwoPieces = [];
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
            gameState = 'gameOver';
            clearInterval(turnTimer.timer);
        }else if (board.every(row => row.every(column => column != 'empty'))){
            gameState = 'gameOver';
            clearInterval(turnTimer.timer);
            winner.winner = 'draw'
            winner.pieces = []
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

    function playPiece(column: number){
        if (gameState == 'gameOver'){
            return;
        }
        let row = 5;
        while (board[row][column] != 'empty'){
            row--;
            if (row < 0){
                return;
            }
        }
        board[row][column] = currentPlayer;
        switchCurrentPlayer();
        setTimer(30)
    }

    function setTimer(timerTime){
        clearInterval(turnTimer.timer)
        turnTimer.time = timerTime;
        turnTimer.timer = setInterval(() => {
            turnTimer.time--;
            if (turnTimer.time == 0){
                switchCurrentPlayer()
                setTimer(30)
            }
        }, 1000)
    }

    function resetBoard(){
        // We can not create a new board, because it gets passed as reference on the state.
        // So if we create a new one it will not trigger a render. really dont know why
        for (let r = 0; r < board.length; r++){
            let row = board[r]
            for (let c = 0; c < row.length; c++ ){
                board[r][c] = 'empty'
            }
        }
        currentPlayer = 'PlayerOne'
        gameState = 'playing'
        setTimer(30)
    }

    function playAgain(){
        resetBoard()
        gameState = 'playing'
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
                clearInterval(turnTimer.timer);
                turnTimer.time = 0;
                turnTimer.timer = 0;
            }else if (v == 'playing' && gameState == "playingMenu"){
                setTimer(turnTimer.time)
            }else{
                setTimer(30)
            }
            gameState = v
        },
        get turnTimer(){return turnTimer},
        set turnTimer(v){turnTimer = v},
        get playerOneScore(){return playerOneScore},
        get playerTwoScore(){return playerTwoScore},
        get currentPlayer(){return currentPlayer},
        switchGameMode,
        playPiece,
        switchCurrentPlayer,
        resetBoard,
        playAgain
    }
}

export let game = createGame();