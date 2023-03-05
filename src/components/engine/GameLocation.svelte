<script>
    import Seasons from "../../utility/seasons.js"
    import LOCATIONS from "../../data/locations.js"
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../../utility/trigger.js"

    export let id = "academy"
    const locationData = LOCATIONS[id]

    export let location = {
        id,
        progress : 0,
        season : locationData.defaultSeason ?? Seasons.SUMMER,
    }

    function setSeason(season) {
        location.season = season
    }

    function advanceLocation(step = 1) {
        location.progress += step
        Trigger("updateLocation")
    }

    const triggers = {}
    onMount(() => {
        triggers.setSeason = Trigger.on("setSeason", setSeason)
        triggers.advanceLocation = Trigger.on("advanceLocation", advanceLocation)
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })
</script>
