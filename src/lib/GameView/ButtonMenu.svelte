<script>
    import {game} from '../../store.svelte'
    import logoSvg from '../../assets/images/logo.svg'; 

    let {boardImageWidth} = $props()
</script>

<div style={`width: ${boardImageWidth}px;`} class="flex justify-between text-white font-spaceGrotesk text-xl font-bold mx-auto">
    <button on:click={() => {game.gameState = 'playingMenu'}} class=" rounded-[20px] bg-darkPurple min-w-[108px]">MENU</button>
    <img class="w-[40px] h-[40px]" src={logoSvg} alt="">
    <button on:click={game.resetBoard} class=" rounded-[20px] bg-darkPurple min-w-[108px]">RESTART</button>
</div>