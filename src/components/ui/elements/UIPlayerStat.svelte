<script>
    import Trigger from "../../../utility/trigger.js"

    export let stat
    export let player

    $: canLevelUp = player?.exp >= player?.levelCost

    function levelUp() {
        if (!canLevelUp)
            return

        Trigger("levelUp", stat.id)
    }
</script>


<div class="container">
    <div class="stat">
        <div class="title">{stat.name}</div>
        <div class="value">{player?.stats?.[stat.id]}</div>
        <div class="value calculated">({player?.calculatedStats?.[stat.id]})</div>
        {#if stat.change}
            <div class="levelup" class:active={canLevelUp} on:click={levelUp}>+</div>
        {:else}
            <div class="levelup"></div>
        {/if}
    </div>
    <div class="description">
        {stat.description}
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

    div.stat {
        display: flex;
        flex-direction: row;
        column-gap: 0.5em;
    }

    div.title {
        padding : 2rem;
        background-color: #00000088;
        display: flex;
        align-items: center;
        justify-content: start;
        font-size:6em;
        flex: 1;
    }

    div.value, div.levelup {
        display : flex;
        align-items: center;
        justify-content: center;
        width : 10rem;
        padding: 2rem;
        font-size: 6em;
        background-color: #00000088;
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
