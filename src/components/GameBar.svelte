<script>
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../utility/trigger.js"

    let event = null

    onMount(() => {
        event = Trigger.on("tick", tick)
    })

    function tick(...a) {
        console.log(a.join(","))
    }

    onDestroy(() => {
        event?.cancel()
    })
</script>
