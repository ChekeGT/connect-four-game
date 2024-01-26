<script>
    import {game} from '../../store.svelte'
    import playerTwo from '../../assets/images/player-two.svg';
</script>

<div class="player-card text-center p-2 min-w-[142px] relative">
    <p class="font-bold">PLAYER 2</p>
    <p class="font-bold text-3xl">{game.playerTwoScore}</p>
    <img class="absolute top-[50%] translate-y-[-50%] right-0 translate-x-[50%] w-[35%]" src={playerTwo} alt="" />
</div>

<style>
    .player-card{
        border-radius: 20px;
        border: 3px solid var(--Black, #000);
        background: var(--White, #FFF);
        box-shadow: 0px 10px 0px 0px #000;
    }
</style>