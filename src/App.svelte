<script>
    import GameView from "./lib/GameView.svelte";
    import InitialMenu from "./lib/initialMenu.svelte";
    import Rules from "./lib/Rules.svelte";
    import { game } from "./store.svelte";
</script>
<main class="w-[100vw] h-[100vh] bg-mainPurple">
    {#if game.gameState == "initialMenu"}
        <InitialMenu/>
    {:else if game.gameState == "showRules"}
        <Rules/>
    {:else if game.gameState == "playing" || game.gameState == "gameOver"}
        <GameView/>
    {:else if game.gameState == 'playingMenu'}
        <!-- We will add later on the playingMenu -->
        <GameView/>
    {/if}
</main>