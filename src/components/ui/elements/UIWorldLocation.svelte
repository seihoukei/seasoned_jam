<script>
    import LOCATIONS from "../../../data/locations.js"
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../../../utility/trigger.js"

    export let game
    export let id

    let available = false

    $: location = LOCATIONS[id]
    $: gameLocations = game?.locations ?? {}
    $: gameLocation = gameLocations[id] ?? {}

    $: active = game?.currentLocation === id
    $: next = game?.nextLocation === id

    function checkRequirements() {
        available = false
        if (location.requirements) {
            if (location.requirements.locations) {
                for (const [id, progress] of Object.entries(location.requirements.locations)) {
                    if (!gameLocations[id] || gameLocations[id].progress < progress)
                        return
                }
            }
        }
        available = true
    }

    function setNext() {
        if (active || !available)
            return

        Trigger("setNextLocation", id)
    }

    function scheduleUpdate() {
        setTimeout(checkRequirements, 0)
    }

    scheduleUpdate()

    const triggers = {}
    onMount(() => {
        triggers.advanceLocation = Trigger.on("advanceLocation", scheduleUpdate)
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })

</script>

<div class="container" class:active class:available on:click={setNext}>
    <span class="name">
        {#if next && !active}
            >>
        {/if}
        {location.name}
        {#if available}
            ({gameLocation?.progress ?? 0})
        {:else}
            (locked)
        {/if}
    </span>
</div>

<style>
    div.container {
        display: flex;
        width: 90em;
        height: 10em;
        align-items: center;
        justify-content: center;
        background-color: #00000088;
        border-radius : 2em;
        transition: background-color 0.2s;
        cursor: pointer;
    }
    div.container:not(.available) {
        cursor: default;
        background-color: #00000088;
        color : #777777;
    }
    div.container.active {
        cursor : default;
    }
    div.container.available:not(.active):hover {
        background-color: #FFFFFF66;
    }
    span.name {
        font-size: 5em;
    }
</style>
