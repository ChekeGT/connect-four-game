<script>
    import logoSvg from '../assets/images/logo.svg'; 
    import playerOne from '../assets/images/player-one.svg';
    import playerTwo from '../assets/images/player-two.svg';
</script>
<div class="w-11/12 mx-auto py-10 flex flex-col gap-8">
    <div class="flex justify-between text-white font-spaceGrotesk text-xl font-bold">
        <button class=" rounded-[20px] bg-darkPurple min-w-[108px]">MENU</button>
        <img class="w-[40px] h-[40px]" src={logoSvg} alt="">
        <button class=" rounded-[20px] bg-darkPurple min-w-[108px]">RESTART</button>
    </div>
    <div class=" flex justify-between font-spaceGrotesk px-4">
        <div class="player-card text-center p-2 min-w-[142px] h-[81px] relative">
            <p class="font-bold">PLAYER 1</p>
            <p class="font-bold text-3xl">12</p>
            <img class="absolute top-[50%] translate-y-[-50%] translate-x-[-65%] w-[35%]" src={playerOne} alt="" />
        </div>
        <div class="player-card text-center p-2 min-w-[142px] relative">
            <p class="font-bold">PLAYER 2</p>
            <p class="font-bold text-3xl">12</p>
            <img class="absolute top-[50%] translate-y-[-50%] right-0 translate-x-[50%] w-[35%]" src={playerTwo} alt="" />
        </div>
    </div>
</div>


<style>
    .player-card{
        border-radius: 20px;
        border: 3px solid var(--Black, #000);
        background: var(--White, #FFF);
        box-shadow: 0px 10px 0px 0px #000;
    }
</style>