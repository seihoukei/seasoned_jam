<script>
    import {onDestroy} from "svelte"
    import Trigger from "../utility/trigger.js"

    export let rate = 60
    export let boost = 1
    export let event = "tick"

    let interval = null
    let lastTime = performance.now()

    $: updateInterval(rate)

    function updateInterval(rate, boost) {
        if (interval)
            clearInterval(interval)

        interval = setInterval(tick, 1000 / rate)
    }

    function tick() {
        const now = performance.now()
        const delta = (now - lastTime) / 1000
        const boostedDelta = delta * boost

        Trigger(event, boostedDelta, boost, delta)

        lastTime = now
    }

    onDestroy(() => {
        clearInterval(interval)
    })
</script>
