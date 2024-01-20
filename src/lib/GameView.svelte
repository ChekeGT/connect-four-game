<script>
    import logoSvg from '../assets/images/logo.svg'; 
    import playerOne from '../assets/images/player-one.svg';
    import playerTwo from '../assets/images/player-two.svg';
    import { game } from '../store.svelte'
    import boardLayerSmall from '../assets/images/board-layer-white-small.svg';
    import counterRedSmall from '../assets/images/counter-red-small.svg';
    import counterYellowSmall from '../assets/images/counter-yellow-small.svg';
    import turnBackgroundRed from '../assets/images/turn-background-red.svg';
    import turnBackgroundYellow from '../assets/images/turn-background-yellow.svg';

    function isWinnerPiece(rowIndex, colIndex){
        if (game.winner.pieces.length > 0){
            for (let i = 0; i < game.winner.pieces.length; i++) {
                // @ts-ignore
                let winnerPiece = game.winner.pieces[i]
                let rowWinnerPiece = winnerPiece[0]
                let colWinnerPiece = winnerPiece[1]
                if (rowWinnerPiece == rowIndex && colWinnerPiece == colIndex){
                    return true
                }
            }
        }
        return false
    
    }

    function getCurrentPlayerText(currentPlayer){
        if (currentPlayer == 'PlayerOne'){
            return 'PLAYER 1\'S TURN'
        } else {
            return 'PLAYER 2\'S TURN'
        }
    }

    function getWinnerPlayer(winner){
        if (winner == 'PlayerOne'){
            return 'PLAYER 1'
        }else{
            return 'PLAYER 2'
        }
    }

    let currentPlayerText = $derived(getCurrentPlayerText(game.currentPlayer))
    let winner = $derived(getWinnerPlayer(game.winner.winner))
    
    let winnerCardHeight = $state();
    let boardImageHeight = $state();
    let boardImageWidth = $state();
    let turnImageHeight = $state(); 
    let containerHeight = $state();
</script>
<div bind:clientHeight={containerHeight} class="w-11/12 mx-auto py-10 flex flex-col gap-8">
    <div class="flex justify-between text-white font-spaceGrotesk text-xl font-bold">
        <button class=" rounded-[20px] bg-darkPurple min-w-[108px]">MENU</button>
        <img class="w-[40px] h-[40px]" src={logoSvg} alt="">
        <button on:click={game.resetBoard} class=" rounded-[20px] bg-darkPurple min-w-[108px]">RESTART</button>
    </div>
    <div class=" flex justify-between font-spaceGrotesk px-4">
        <div class="player-card text-center p-2 min-w-[142px] h-[81px] relative">
            <p class="font-bold">PLAYER 1</p>
            <p class="font-bold text-3xl">{game.playerOneScore}</p>
            <img class="absolute top-[50%] translate-y-[-50%] translate-x-[-65%] w-[35%]" src={playerOne} alt="" />
        </div>
        <div class="player-card text-center p-2 min-w-[142px] relative">
            <p class="font-bold">PLAYER 2</p>
            <p class="font-bold text-3xl">{game.playerTwoScore}</p>
            <img class="absolute top-[50%] translate-y-[-50%] right-0 translate-x-[50%] w-[35%]" src={playerTwo} alt="" />
        </div>
    </div>
    <div class="relative w-full" style={`height: ${boardImageHeight}px;`}>
        <!-- BOARD -->
        <img bind:clientHeight={boardImageHeight} bind:clientWidth={boardImageWidth} class="absolute z-40 left-[50%] translate-x-[-50%]" src={boardLayerSmall} alt="A connect four gaming board.">
        <!-- PLAYED PIECES -->
        <div style={`height: ${boardImageHeight}px; width:${boardImageWidth}px;`} class="grid grid-cols-7 grid-rows-6 absolute  w-full gap-1 pb-[8%] pt-[2%] px-[2%] left-[50%] translate-x-[-50%]">
            {#each game.board as row, rowIndex }
                {#each row as colValue, colIndex}
                    <div class="relative">
                        {#if colValue != 'empty'}
                            <img class="absolute z-10" src={colValue == 'PlayerOne' ? counterRedSmall : counterYellowSmall} alt="A red counter.">
                            <div class={`absolute z-20 ${colValue == 'PlayerOne' ? 'bg-mainRed' : 'bg-mainYellow'} w-full h-full flex justify-center items-center`}>
                                {#if isWinnerPiece(rowIndex, colIndex)}
                                    <div id={game.winner.winner} class="w-[33%] h-[33%] border-[3px] border-solid border-white rounded-full"></div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            {/each}
        </div>
        <!-- COLUMN SELECTOR / PLAY PIECE BUTTONS -->
        <div style={`height: ${boardImageHeight}px; width:${boardImageWidth}px;`} class=" grid grid-cols-7 z-50 absolute gap-1 pb-[8%] pt-[2%] px-[2%] left-[50%] translate-x-[-50%]">
            {#each Array(7) as _, columnIndex}
                <button class="h-full w-full" on:click={() => {game.playPiece(columnIndex)}} ></button>
            {/each}
        </div>
        <!-- Winner badge -->
        <div class="absolute w-full z-50 flex justify-center" style={`${game.winner.winner ? `bottom: -${winnerCardHeight - 20}px;` : `bottom: -${turnImageHeight / 6 * 5}px;`}`}>
            {#if game.winner.winner}
                <div bind:clientHeight={winnerCardHeight} class="w-8/12 flex flex-col justify-center text-center font-spaceGrotesk bg-white player-card p-4">
                    <div class="mb-2">
                        {#if game.winner.winner == 'draw'}
                            <p class="font-bold text-base">NOBODY WINS</p>
                            <p class=" font-extrabold text-6xl">IT'S A DRAW</p>
                        {:else}
                            <p class="font-bold text-base">{winner}</p>
                            <p class=" font-extrabold text-6xl">WINS</p>
                        {/if}
                    </div>
                    <button class=" rounded-lg font-spaceGrotesk flex justify-center items-center p-4 text-white font-bold bg-mainPurple mx-auto max-h-[40px] text-base text-justify" on:click={game.playAgain}>PLAY AGAIN</button>
                </div>
            {:else}
                <img bind:clientHeight={turnImageHeight} src={game.currentPlayer == 'PlayerOne' ? turnBackgroundRed : turnBackgroundYellow} alt="">
                <div class={`absolute py-8 flex flex-col gap-4 font-spaceGrotesk ${game.currentPlayer == 'PlayerOne' ? ' text-white' : ''}`}>
                    <p class=" font-bold">{currentPlayerText}</p>
                    <p class="font-extrabold text-4xl text-center">{game.turnTimer.time}S</p>
                </div>
            {/if}
        </div>
    </div>
</div>
<div class={`absolute bottom-0 w-full rectangle ${game.winner.winner == 'PlayerOne' ? 'bg-mainRed' : game.winner.winner == 'PlayerTwo' ? 'bg-mainYellow' : 'bg-darkPurple'}`} style={`height: ${window.innerHeight - containerHeight + 16 * 4 }px`}>
</div>

<style>
    .player-card{
        border-radius: 20px;
        border: 3px solid var(--Black, #000);
        background: var(--White, #FFF);
        box-shadow: 0px 10px 0px 0px #000;
    }
    .rectangle{
        border-radius: 60px 60px 0px 0px;
    }
</style>
