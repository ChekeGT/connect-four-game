<script>
    import InitialMenu from "./lib/initialMenu.svelte";
    import Rules from "./lib/Rules.svelte";
    import { game } from "./store.svelte";
</script>
<main class="w-[100vw] h-[100vh] bg-mainPurple">
    {#if game.showRules}
        <Rules/>
    {:else}
        <InitialMenu/>
    {/if}
</main>