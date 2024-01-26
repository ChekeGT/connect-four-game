<script>
    let { minHeight } = $props()
    import { game } from "../store.svelte";
    function getHeight(minHeight){
        if (window.innerWidth < 400) {
            return minHeight - 20
        }else if (window.innerWidth < 1024) {
            return minHeight - 70
        }
        else{
            return minHeight - 200
        }
    }
</script>

<div style={`height: ${getHeight(minHeight)}px`} class=" my-[20px] max-w-[480px] lg:my-[90px] font-spaceGrotesk absolute w-11/12  left-[50%] translate-x-[-50%] top-0 z-[80] card bg-mainPurple py-4 ">
    <div class=" flex flex-col w-9/12 mx-auto gap-3 h-full md:gap-5">
        <p class=" font-2xl text-center text-white text-3xl font-bold">PAUSE</p>
        <div class=" flex justify-between flex-col gap-5">    
            <button on:click={() => { game.gameState = 'playing'}} class=" card bg-white p-3">CONTINUE</button>
            <button on:click={game.resetBoard} class=" card bg-white p-3">RESTART</button>
            <button on:click={() => {game.gameState = 'initialMenu'}} class=" card bg-mainRed text-white p-3">QUIT GAME</button>
        </div>
    </div>
</div>

<style>
    .card{
        border-radius: 20px;
        border: 3px solid var(--Black, #000);
        box-shadow: 0px 10px 0px 0px #000;
    }
</style>