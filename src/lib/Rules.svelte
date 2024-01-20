<script>
    import checkmark from '../assets/images/icon-check.svg';
    import { game } from '../store.svelte'
    let checkMarkHeight = $state();
</script>
<div class="flex w-full h-full justify-center items-center">
    <div class="rules-container w-11/12 min-h-[80%] font-spaceGrotesk p-5 relative">
        <p class=" text-3xl text-center font-bold mb-10">Rules</p>
        <p class=" text-mainPurple text-3xl font-bold text-start mb-10">Objective</p>
        <p class=" text-justify break-words text-lg mb-10">Be the first player to connect 4 of the same colored discs in a row(either vertically, horizontally, or diagonally).</p>
        <p class=" text-mainPurple text-3xl font-bold mb-10">How To Play</p>
        <ol class="grid grid-cols-rules-grid">
            <span>1</span>
            <li class="text-lg mb-4">Red Goes first in the first game.</li>
            <span>2</span>
            <li class="text-lg mb-4">Players must alternate turns, and only one disc can be dropped in each turn. </li>
            <span>3</span>
            <li class="text-lg mb-4">The game ends when there is a 4-in-a-row or a stalemate.</li>
            <span>4</span>
            <li class="text-lg mb-4">The starter of the previous game goes second on the next game.</li>
        </ol>
        <button style={`bottom: -${checkMarkHeight / 2}px;`} bind:clientHeight={checkMarkHeight} on:click={() => {game.gameState = 'initialMenu'}} class="w-2/12 absolute left-[50%] translate-x-[-50%]">
            <img src={checkmark} class="w-full" alt="">
        </button>
    </div>
</div>


<style>
    .rules-container{
        border-radius: 40px;
        border: 3px solid var(--Black, #000);
        background: var(--White, #FFF);
        box-shadow: 0px 10px 0px 0px #000;
    }
    span{
        font-size: 1.125rem;
        line-height: 1.75rem;
    }
</style>