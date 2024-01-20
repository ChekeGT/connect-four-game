<script>
    let { minHeight } = $props()
    import { game } from "../store.svelte";
</script>

<div style={`min-height: ${minHeight}px;`} class=" font-spaceGrotesk absolute w-11/12  left-[50%] translate-x-[-50%] z-[80] card bg-mainPurple py-4 ">
    <div class=" flex flex-col w-9/12 mx-auto gap-5">
        <p class=" font-2xl text-center text-white text-3xl font-bold">PAUSE</p>
        <button on:click={() => { game.gameState = 'playing'}} class=" card bg-white p-3">CONTINUE</button>
        <button on:click={game.resetBoard} class=" card bg-white p-3">RESTART</button>
        <button on:click={() => {game.gameState = 'initialMenu'}} class=" card bg-mainRed text-white p-3">QUIT GAME</button>
    </div>
</div>

<style>
    .card{
        border-radius: 20px;
        border: 3px solid var(--Black, #000);
        box-shadow: 0px 10px 0px 0px #000;
    }
</style>