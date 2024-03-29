<script>
    import { game } from '../../store.svelte'
    import boardLayerLarge from '../../assets/images/board-layer-white-large.svg';
    import turnBackgroundRed from '../../assets/images/turn-background-red.svg';
    import turnBackgroundYellow from '../../assets/images/turn-background-yellow.svg';
    import markerRed from '../../assets/images/marker-red.svg';
    import markerYellow from '../../assets/images/marker-yellow.svg';
    import GameViewMenu from '../GameViewMenu.svelte';
    import BlackFilter from '../BlackFilter.svelte';
    import { computateMinimax } from './minimax';
    import Player1Marker from './Player1Marker.svelte';
    import Player2Marker from './Player2Marker.svelte';
    import ButtonMenu from './ButtonMenu.svelte';

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

    let selectedColumn = $state(null);

    function setSelectedColumnToNull(){
        selectedColumn = null
    }

    let winnerCardHeight = $state();
    let boardImageHeight = $state();
    let boardImageWidth = $state();
    let turnImageHeight = $state(); 
    let containerHeight = $state();
    let bottomImageColor = $derived(game.winner.winner == 'PlayerOne' ? 'bg-mainRed' : game.winner.winner == 'PlayerTwo' ? 'bg-mainYellow' : 'bg-darkPurple')
    let columnWidth = $state();

    function getColumnStyling(columnWidth, boardImageHeight){
        return  window.innerWidth < 768 ? `transform: translateY(-${boardImageHeight / 9}px);` : `transform: translate(${columnWidth / 4}px,-${boardImageHeight / 15}px);`
    }

    function calculateCPUMovement(currentPlayer){
        if (currentPlayer == 'PlayerTwo' && game.gameMode == 'PvE'){
            let minimaxResult = computateMinimax()
            game.playPiece(minimaxResult)
        }
    }
    $effect(() => {
        calculateCPUMovement(game.currentPlayer)
    })
</script>
{#if game.gameState == 'playingMenu'}
    <BlackFilter/>
{/if}
<div bind:clientHeight={containerHeight} class="w-11/12 mx-auto py-10 flex flex-col gap-8">
    <ButtonMenu boardImageWidth={boardImageWidth}/>
    <div style={`width: ${boardImageWidth}px`} class=" flex justify-between font-spaceGrotesk px-4 lg:hidden gap-1 mx-auto">
        <Player1Marker/>
        <Player2Marker/>
    </div>
    <div class="relative w-full" style={`height: ${boardImageHeight}px;`}>
        {#if game.gameState == 'playingMenu'}
            <GameViewMenu minHeight={boardImageHeight}/>
        {/if}
        <div class=" hidden lg:block lg:absolute top-[50%] font-spaceGrotesk left-0">
            <Player1Marker/>
        </div>
        <div class="hidden lg:block lg:absolute top-[50%] font-spaceGrotesk right-0">
            <Player2Marker/>
        </div>
     <!-- BOARD -->
        <img bind:clientHeight={boardImageHeight} bind:clientWidth={boardImageWidth} class="absolute z-40 left-[50%] translate-x-[-50%]" src={boardLayerLarge} alt="A connect four gaming board.">
        <!-- PLAYED PIECES -->
        <div style={`height: ${boardImageHeight}px; width:${boardImageWidth}px;`} class="grid grid-cols-7 grid-rows-6 absolute  w-full  gap-0 pb-[5.2%] lg:pb-[4%] px-[1%] pt-[1%] left-[50%] translate-x-[-50%]">
            {#each game.board as row, rowIndex }
                {#each row as colValue, colIndex}
                    <div class="relative">
                        {#if colValue != 'empty'}
                            <div class={`absolute z-20 ${colValue == 'PlayerOne' ? 'bg-mainRed' : 'bg-mainYellow'} w-full h-full flex justify-center items-center rounded-full`}>
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
        <div on:mouseleave={setSelectedColumnToNull} role="application" style={`height: ${boardImageHeight}px; width:${boardImageWidth}px;`} class=" grid grid-cols-7 z-50 absolute left-[50%] translate-x-[-50%] gap-[10px] px-[1%]">
            {#each Array(7) as _, columnIndex}
                <div bind:clientWidth={columnWidth} class="relative">
                    {#if selectedColumn == columnIndex}
                        <img class="absolute z-30" style={`top: 0; ${getColumnStyling(columnWidth, boardImageHeight)} `} src={game.currentPlayer == 'PlayerOne' ? markerRed : markerYellow} alt="A red marker.">
                    {/if}
                    <button class="h-full w-full" on:click={() => {game.playPiece(columnIndex)}}  on:mouseenter ={() => {selectedColumn = columnIndex}} aria-label={`Column ${columnIndex + 1}`}></button>
                </div>
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
<div class={`absolute w-full rectangle ${bottomImageColor}`} style={`height: ${window.innerHeight - containerHeight + 16 * 4 + (window.innerWidth >= 500 ? 200 : 0)}px; bottom: ${window.innerWidth >= 500 ? -200 : 0}px`}>
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
