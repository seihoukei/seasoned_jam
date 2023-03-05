<script>
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../../utility/trigger.js"
    import ACTIONS from "../../data/actions.js"

    const queue = []

    function executeQueue() {
        queue.sort((x,y) => x.time - y.time)
        for (let item of queue) {
            const action = ACTIONS[item.action]
            if (!action)
                continue
            action(item.data, item.direction.source, item.direction.target)
        }
        queue.length = 0
    }

    function queueActivation(action, direction, data, time) {
        queue.push({
            action, direction, data, time
        })
    }

    const triggers = {}
    onMount(() => {
        triggers.tick = Trigger.on("tick", (time, boost, raw) => {
            setTimeout(executeQueue, 0)
        })
        triggers.queue = Trigger.on("queueActivation", queueActivation)
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })
</script>
