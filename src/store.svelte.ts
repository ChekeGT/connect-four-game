type GameMode = "PvE" | "PvP";

function createGame(){
    let gameMode: GameMode = $state("PvP");
    let isPlaying: boolean = $state(false);

    function switchGameMode(){
        if(gameMode == 'PvE'){
            gameMode = 'PvP'
        }else{
            gameMode = 'PvE'
        }
    }
    function toggleIsPlaying(){
        isPlaying = !isPlaying;
    }

    return {
        get gameMode(){
            return gameMode;
        },
        get isPlaying(){return isPlaying},
        switchGameMode,
        toggleIsPlaying
    }
}

export let game = createGame();