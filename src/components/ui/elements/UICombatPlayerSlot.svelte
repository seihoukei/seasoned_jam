<script>
    import Trigger from "../../../utility/trigger.js"
    import Seasons from "../../../utility/seasons.js"

    export let slot
    export let player
    export let index

    function showSelector(event) {
        Trigger("showAbilitySelector", event.clientX, event.clientY, index)
    }

    $: progress = slot?.progress?.current / slot?.progress?.max * 100
</script>

{#if slot}
    <div class="container" class:empty={!slot.ability} class:available={slot.state.available} class:active={slot.state.active} on:mouseup={showSelector}>
        <div class="progress" style="--bar-progress:{progress}%"></div>
        <div class="name">
            {#if slot?.ability?.seasons}
                {@html Seasons.iconsFor(slot.ability.seasons)}
            {/if}
            {slot?.ability?.name ?? "- empty -"}
        </div>
    </div>
{/if}

<style>
    div.container {
        position : relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width : 90em;
        height: 8em;
        background-color: #00000088;
        border-radius: 2em;
        cursor: pointer;
        overflow: hidden;
    }
    div.name {
        font-size: 5em;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.container.available:not(.active, .empty) {
        color : red;
    }
    div.container:not(.available) {
        opacity: 0.2;
        cursor : default;
    }
    div.progress {
        position: absolute;
        left: 0;
        top : 0;
        width : var(--bar-progress);
        height : 100%;
        background-color: #FFFFFF44;
    }
</style>
