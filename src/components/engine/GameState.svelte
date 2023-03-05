<script>
    import GamePlayer from "./GamePlayer.svelte"
    import GameLocation from "./GameLocation.svelte"
    import GameCombat from "./GameCombat.svelte"
    import GameEncounter from "./GameEncounter.svelte"
    import {onDestroy, onMount} from "svelte"
    import GameAbilityQueue from "./GameAbilityQueue.svelte"
    import Trigger from "../../utility/trigger.js"

//    const START_LOCATION = "forest"
    const START_LOCATION = "academy"

    export let game = {
        nextLocation : START_LOCATION,
        currentLocation : START_LOCATION,
        locations : {},
    }

    $: gameLocation = game.locations[game.currentLocation]

//    setInterval(() => setLocation(["academy", "forest"][Math.random() * 2 | 0]), 1000)

    function setLocation(id = game.nextLocation) {
        game.currentLocation = id
    }

    function setNextLocation(id) {
        game.nextLocation = id
    }

//    setLocation()
    onMount(() => setLocation())

    const triggers = {}
    onMount(() => {
        triggers.next = Trigger.on("setNextLocation", setNextLocation)
        triggers.move = Trigger.on("updateLocation", () => setLocation())
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })

</script>

{#key game.currentLocation}
    <GameLocation
            id={game.currentLocation}
            bind:location={game.locations[game.currentLocation]}
    />

    {#if gameLocation}
        {#key gameLocation.progress}
            <GameEncounter
                    player={game.player}
                    location={gameLocation}
                    bind:encounter={game.encounter}
            />
        {/key}

        <GameCombat
                player={game.player}
                encounter={game.encounter}
                location={gameLocation}
        />
    {/if}
{/key}

<GamePlayer
        bind:player={game.player}
        location={gameLocation}
/>
<GameAbilityQueue />
