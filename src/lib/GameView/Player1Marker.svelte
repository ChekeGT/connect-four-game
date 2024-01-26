<script>
    import {game} from '../../store.svelte'
    import playerOne from '../../assets/images/player-one.svg';
</script>
<div class="player-card text-center p-2 min-w-[142px] h-[81px] relative">
    <p class="font-bold">PLAYER 1</p>
    <p class="font-bold text-3xl">{game.playerOneScore}</p>
    <img class="absolute top-[50%] translate-y-[-50%] translate-x-[-65%] w-[35%]" src={playerOne} alt="" />
</div>

<style>
    .player-card{
        border-radius: 20px;
        border: 3px solid var(--Black, #000);
        background: var(--White, #FFF);
        box-shadow: 0px 10px 0px 0px #000;
    }
</style>