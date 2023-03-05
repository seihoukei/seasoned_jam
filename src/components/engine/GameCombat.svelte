<script>
    import Trigger from "../../utility/trigger.js"
    import {onDestroy, onMount} from "svelte"

    export let player
    export let encounter
    export let location

    function updateTarget(newOption) {
        if (!encounter || !player)
            return
        if (!player.target || player.target.dead || !encounter.enemies.includes(player.target)) {
            const aliveEnemies = encounter.enemies.filter(x => !x.dead)
            const target = newOption ?? aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]
            Trigger("setPlayerTarget", target)
        }
    }

    const triggers = {}
    onMount(() => {
/*
        triggers.tick = Trigger.on("tick", (time, boost, rawTime) => {
            advance(time)
        })
*/
        triggers.enemySpawned = Trigger.on("enemySpawned", enemy => updateTarget(enemy))
        triggers.enemyDied = Trigger.on("enemyDied", () => updateTarget())
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })

</script>
