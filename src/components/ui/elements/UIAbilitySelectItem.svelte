<script>
    import Seasons from "../../../utility/seasons.js"

    export let player
    export let item

    let available = true

    if (item.requirements) {
        for (let [skill, level] of Object.entries(item.requirements)) {
            if ((player.skills[skill] ?? 0) < level)
                available = false
        }
    }

    const icons = Seasons.iconsFor(item.seasons)
</script>

{#if available}
    <div class="item" class:active={item.slot !== undefined} on:click>
        {@html icons}
        {item.name}
    </div>
{/if}

<style>
    div.item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        padding: 2rem;
        cursor: pointer;
        background-color: #FFFFFF00;
        transition: background-color 0.2s;
    }
    div.item:hover {
        background-color: #FFFFFF66;
    }
    div.item.active {
        color : yellow;
    }
</style>
