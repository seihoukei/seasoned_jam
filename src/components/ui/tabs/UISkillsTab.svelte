<script>
    import PLAYER_SKILLS from "../../../data/player-skills.js"
    import UISkill from "../elements/UISkill.svelte"

    export let game

    $: player = game?.player

</script>

<div class="layout">
    {#each Object.keys(PLAYER_SKILLS) as id}
        <UISkill {id} {player} />
    {/each}
    <div class="hint">
        Exp: {player?.exp}
    </div>
</div>

<style>
    div.layout {
        display:flex;
        flex-direction: column;
        row-gap: 2em;
        background-color: #00000088;
        height : 100%;
        padding : 5rem;
        border-radius: 0 2em 2em 2em;
        border : 1em solid #00000055;
    }

    div.hint {
        font-size: 4em;
        text-align: center;
    }
</style>
