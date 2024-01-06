<script>
    import checkmark from '../assets/images/icon-check.svg';
    import { game } from '../store.svelte'
</script>
<div class="flex w-full h-full justify-center items-center">
    <div class="rules-container w-11/12 font-spaceGrotesk p-5 relative">
        <p class=" text-3xl text-center font-bold">Rules</p>
        <p class=" text-mainPurple text-xl font-bold text-start">Objective</p>
        <p class=" text-justify break-words text-sm">Be the first player to connect 4 of the same colored discs in a row(either vertically, horizontally, or diagonally).</p>
        <p class=" text-mainPurple text-xl font-bold">How To Play</p>
        <ol class="grid grid-cols-rules-grid">
            <div class="flex flex-col">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
            </div>
            <div class="flex flex-col text-justify">
                <li class="text-sm">Red Goes first in the first game.</li>
                <li class="text-sm">Players must alternate turns, and only one disc can be dropped in each turn. </li>
                <li class="text-sm">The game ends when there is a 4-in-a-row or a stalemate.</li>
                <li class="text-sm">The starter of the previous game goes second on the next game.</li>
            </div>
        </ol>
        <button on:click={game.toggleShowRules} class="w-2/12 absolute bottom-[-28px] left-[50%] translate-x-[-50%]">
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
</style>