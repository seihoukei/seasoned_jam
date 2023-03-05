<script>
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../../utility/trigger.js"
    import Seasons from "../../utility/seasons.js"

    export let player
    export let index
    export let slot = {
        index,
        ability : null,
        progress : {
            current : 0,
            max : 0,
        },
        state : {
            available : false,
            active : false,
            inSeason : false,
        },
        once : index === "-1"
    }
    export let location

    const progress = slot.progress

    $: ability = slot.ability
    $: state = slot.state
    $: state.available = slot.index < player.calculatedStats.slots
    $: state.inSeason = Seasons.belongsTo(location?.season, ability?.seasons ?? Seasons.ANY)
    $: state.active = state.available && ability && state.inSeason
    $: progress.max = state.active
        ? ability?.time
        : Infinity

    function advance(time) {
        if (!state.active)
            return
        progress.current += time
        while (progress.current > progress.max) {
            progress.current -= progress.max
            Trigger("queueActivation", ability.action, {
                source : player,
                target : player.target ?? null,
            }, ability.data, -progress.current)

            if (slot.once) {
                setAbility(null)
                break
            }
        }
        slot = slot //Svelte trigger
    }

    function setAbility(ability) {
        if (slot.ability === ability)
            return

        if (slot.ability !== null) {
            delete slot.ability.slot
        }
        slot.ability = ability
        if (ability)
            ability.slot = index
        progress.current = 0
    }

    // in case ability assigned to other slot, other slot will adjust ability.slot
    function releaseAbility() {
        slot.ability = null
        progress.current = 0
    }

    const triggers = {}
    onMount(() => {
        triggers.tick = Trigger.on("playerTick", (time, boost, raw) => {
            advance(time)
        })
        triggers.change = Trigger.on("setSlotAbility", (target, ability) => {
            if (target === slot)
                setAbility(ability)
            else
                if (ability === slot.ability)
                    releaseAbility()
        })
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })
</script>
