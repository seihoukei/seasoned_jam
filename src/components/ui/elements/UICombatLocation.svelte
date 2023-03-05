<script>
    import LOCATIONS from "../../../data/locations.js"
    import Seasons from "../../../utility/seasons.js"
    import UICombatEncounter from "./UICombatEncounter.svelte"

    export let game

    $: location = game?.locations[game?.currentLocation]
    $: locationData = LOCATIONS[game?.currentLocation]

    $: background = `url('../resources/images/locations/${location?.id}.jpg')`

</script>

<div class="container">
    <div class="title">
        {#if location}
            {locationData.name} : {location.progress}
        {/if}
    </div>
    <div class="encounter" style="--location-background: {background}">
        <UICombatEncounter {game} />
    </div>
</div>

<style>
    div.container {
        display : flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2em;
    }

    div.title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        height: 8rem;
        width : 90rem;
        background-color: #00000066;
        border-radius: 2rem;
    }

    div.encounter {
        background-color: #00000066;
        background: var(--location-background) no-repeat;
        background-size: 90rem 90rem;
        border : 0.5rem solid #00000088;
        border-radius: 2rem;
        font-size:5rem;
        min-width : 90rem;
        min-height: 90rem;
    }


</style>
