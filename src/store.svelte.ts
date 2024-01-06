type GameMode = "PvE" | "PvP";

function createGame(){
    let gameMode: GameMode = $state("PvP");
    let isPlaying: boolean = $state(false);
    let showRules: boolean = $state(false);

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
    function toggleShowRules(){
        showRules = !showRules;
    }

    return {
        get gameMode(){
            return gameMode;
        },
        get isPlaying(){return isPlaying},
        get showRules(){return showRules},
        switchGameMode,
        toggleIsPlaying,
        toggleShowRules
    }
}

export let game = createGame();