<script>
    import logoSvg from '../assets/images/logo.svg';
    import playerVsPlayerSvg from '../assets/images/player-vs-player.svg'
    import playerVsCpuSvg from '../assets/images/player-vs-cpu.svg'
    import { game } from '../store.svelte'
    
    let gameModeText = $derived(game.gameMode == 'PvP' ? 'Play vs Player' : 'Play vs CPU');
    let gameModeIcon = $derived(game.gameMode == 'PvP' ? playerVsPlayerSvg : playerVsCpuSvg);

</script>
<div class="w-full h-full flex items-center justify-center">
    <div class=" w-11/12 mx-auto flex flex-col gap-8">
        <div class="w-full flex justify-center">
            <img src={logoSvg} alt="">
        </div>
        <div class="flex flex-col gap-4">
            <div class={`button ${game.gameMode == 'PvP' ? 'bg-mainYellow' : 'bg-mainRed text-white'} rounded-2xl p-3 flex justify-between items-center font-bold text-xl`}>
                <button on:click={() => {game.gameState = 'playing'}}>
                    <p class=" font-spaceGrotesk">{gameModeText}</p>
                </button>
                <button on:click={game.switchGameMode} class="w-[15%]">
                    <img class=" w-full" src={gameModeIcon} alt="">
                </button>
            </div>
            <button on:click={() => {game.gameState = 'showRules'}} class="button bg-white rounded-2xl p-3 shadow-lg flex justify-start text-xl font-bold">
                <p class="font-spaceGrotesk">Game Rules</p>
            </button>
        </div>
    </div>
</div>

<style>
    .button{
        box-shadow: 0px 10px 0px 0px #000;
        border: 3px solid var(--Black, #000);
        border-radius: 20px;
    }
</style>