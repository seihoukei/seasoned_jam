<script>
    import PLAYER_SKILLS from "../../../data/player-skills.js"
    import Trigger from "../../../utility/trigger.js"

    export let id
    export let player

    $: skill = PLAYER_SKILLS[id]
    $: level = player?.skills?.[id] ?? 0
    $: cost = skill.exp * (skill.multi ?? 1) ** level

    $: maxed = level >= skill.max ?? 1
    $: canLevelUp = player?.exp >= cost && !maxed

    function levelUp() {
        if (!canLevelUp)
            return

        Trigger("levelUpSkill", id)
    }
</script>

<div class="container">
    <div class="skill">
        <div class="title">{skill.name}</div>
        <div class="value">{player?.skills?.[id] ?? 0}</div>
        {#if maxed}
            <div class="levelup">MAX</div>
        {:else}
            <div class="levelup" class:active={canLevelUp} on:click={levelUp}>{cost} exp</div>
        {/if}
    </div>
    <div class="description">
        {skill.description}
    </div>
</div>

<style>
    div.container {
        display: flex;
        flex-direction: column;
        border-radius: 2em;
        overflow: hidden;
        row-gap: 0.5em;
    }

    div.skill {
        display: flex;
        flex-direction: row;
        column-gap: 0.5em;
    }

    div.title {
        padding: 2rem;
        background-color: #00000088;
        display: flex;
        align-items: center;
        justify-content: start;
        font-size: 6em;
        flex: 1;
    }

    div.value, div.levelup {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10rem;
        padding: 2rem;
        font-size: 6em;
        background-color: #00000088;
    }

    div.levelup {
        width: 16rem;
        font-size: 4em;
    }

    div.levelup.active:hover {
        cursor: pointer;
        background-color: #FFFFFF66;
    }

    div.levelup:not(.active) {
        color: #777777;
    }

    div.description {
        padding: 2rem;
        font-size: 4em;
        background-color: #00000088;
    }

</style>
