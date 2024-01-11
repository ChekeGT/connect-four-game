type GameMode = "PvE" | "PvP";
type playerTypes = 'PlayerOne' | 'PlayerTwo' | null;

type pieces = 'empty' | 'PlayerOne' | 'PlayerTwo';
export interface winnerInteface {
    winner: playerTypes,
    pieces: string[]
}

interface boardInterface {
    [x: string]: pieces
}

interface timerInterface{
    time: number,
    timer: any
}

type gameStates = 'initialMenu' | 'playingMenu' | 'showRules' | 'playing' | 'gameOver';

function createBoard(){
    let board: boardInterface = $state({});
    for (let r = 0; r <= 5; r++) {
        for (let c = 0; c <= 6; c++) {
            let key = `${r},${c}`;
            board[key] = 'empty'
        }
    }
    return board;
}

function createGame(){
    let gameMode: GameMode = $state("PvP");
    let gameState: gameStates = $state('initialMenu');
    

    let currentPlayer: playerTypes = $state('PlayerOne');
    let playerOneScore: number = $state(0);
    let playerTwoScore: number = $state(0);

    let board: boardInterface = createBoard();
    let turnTimer: timerInterface = $state({time: 0, timer: 0});
    let winner: winnerInteface = $derived(getWinner(board));

    const switchCurrentPlayer = () => {currentPlayer = currentPlayer == 'PlayerOne' ? 'PlayerTwo' : 'PlayerOne';}
    function getColumns() {
        let columns = [];
        for (let c = 0; c <= 6; c++) {
            let column = [];
            for (let r = 0; r <= 5; r++) {
                let key = `${r},${c}`;
                column.push([key, board[key]]);
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
                let key = `${r},${c}`;
                row.push([key, board[key]]);
            }
            rows.push(row);
        }
        return rows; 
    }

    function getDiagonals() {
        // Convert the board object into a 2D array
        let matrix = [];
        for (let r = 0; r <= 5; r++) {
            let row = [];
            for (let c = 0; c <= 6; c++) {
                let key = `${r},${c}`;
                row.push(board[key]);
            }
            matrix.push(row);
        }
        let diagonals = [];

    // Get diagonals from top-left to bottom-right
    for (let i = 0; i < matrix.length; i++) {
        let diagonal = [];
        for (let j = 0; j <= i && j < matrix[0].length; j++) {
            diagonal.push(matrix[i - j][j]);
        }
        diagonals.push(diagonal);
    }

        for (let i = 1; i < matrix[0].length; i++) {
            let diagonal = [];
            for (let j = 0; j < matrix.length && i + j < matrix[0].length; j++) {
                let key = `${matrix.length -1 - j},${i + j}`;
                diagonal.push([key, matrix[matrix.length - 1 - j][i + j]]);
            }
            diagonals.push(diagonal);
        }

        // Get diagonals from top-right to bottom-left
        for (let i = 0; i < matrix.length; i++) {
            let diagonal = [];
            for (let j = 0; j <= i && j < matrix[0].length; j++) {
                let key = `${i - j},${matrix[0].length - 1 - j}`;
                diagonal.push([key, matrix[i - j][matrix[0].length - 1 - j]]);
            }
            diagonals.push(diagonal);
        }

        for (let i = 1; i < matrix[0].length; i++) {
            let diagonal = [];
            for (let j = 0; j < matrix.length && i + j < matrix[0].length; j++) {
                let key = `${j},${matrix[0].length - 1 - i - j}`;
                diagonal.push([key, matrix[j][matrix[0].length - 1 - i - j]]);
            }
            diagonals.push(diagonal);
        }

        return diagonals;
    }

    function getWinner(board: boardInterface){
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
    function toggleShowRules(){
        showRules = !showRules;
    }

    function playPiece(column: number){
        let r = 5;
        let key = `${r},${column}`;
        while (board[key] != 'empty' && r >= 0){
            r--;
            key = `${r},${column}`;
        }
        if (r >= 0){
            board[key] = currentPlayer;
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
        switchGameMode,
        toggleShowRules,
        playPiece,
        switchCurrentPlayer
    }
}

export let game = createGame();