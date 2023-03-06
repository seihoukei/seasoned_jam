<script>
    import GameEnemy from "./GameEnemy.svelte"
    import LOCATIONS from "../../data/locations.js"
    import Seasons from "../../utility/seasons.js"
    import weighedRandomItem from "../../utility/weighed-random-item.js"
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../../utility/trigger.js"

    export let player
    export let location

    export let encounter = {
        message : "",
        templates : [],
        enemies : [],
    }

    encounter.enemies.length = 0
    encounter.templates.length = 0

    function belongsToSeason(encounter) {
        const encounterSeason = encounter.seasons ?? Seasons.ANY
        return Seasons.belongsTo(location.season, encounterSeason)
    }

    function updateEnemies() {
        if (encounter.enemies.every(x => x.dead)) {
            Trigger("advanceLocation", 1)
        }
    }

    function getFixedEncounterData() {
        const encounters = LOCATIONS[location.id].fixedEncounters
            .filter(belongsToSeason)

        const encounter = encounters
            .find(encounter => encounter.progress === location.progress)

        return encounter ?? null
    }

    function getRandomEncounterData() {
        const encounters = LOCATIONS[location.id].randomEncounters
            .filter(belongsToSeason)

        const encounter = weighedRandomItem(encounters)

        return encounter
    }

    function getEncounterData() {
        return getFixedEncounterData()
            ?? getRandomEncounterData()
            ?? []
    }

    function initializeEncounter() {
        const encounterData = getEncounterData()
        if (!encounterData)
            return

        for (const data of encounterData.enemies) {
            const minLevel = data.minLevel ?? 1
            const maxLevel = data.maxLevel ?? 1
            const minAmount = data.minAmount ?? 1
            const maxAmount = data.maxAmount ?? 1
            const amount = data.amount ?? Math.floor(minAmount + (maxAmount - minAmount + 1) * Math.random())
            for (let i = 0; i < amount; i++) {
                const level = data.fixedLevel
                    ?? Math.floor(LOCATIONS[location.id].levelScaling(
                        data.level ?? Math.floor(minLevel + (maxLevel - minLevel + 1) * Math.random()),
                        location.progress
                    ))
                encounter.templates.push({
                    enemy : data.enemy,
                    level
                })
            }
        }

        encounter.message = encounterData.message ?? ""
    }

    function resetEncounter() {
        encounter.enemies.length = 0
        encounter.templates.length = 0
        initializeEncounter()
    }

    onMount(() => {
        if (encounter.enemies.length === 0) {
            initializeEncounter()
        }

        Trigger("setSeason", location.season)
    })

    const triggers = {}
    onMount(() => {
        /*
                triggers.tick = Trigger.on("tick", (time, boost, rawTime) => {
                    advance(time)
                })
        */
        triggers.enemyDied = Trigger.on("enemyDied", updateEnemies)
        triggers.playerDied = Trigger.on("playerDied", resetEncounter)
        triggers.flee = Trigger.on("flee", resetEncounter)
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })


</script>

{#each encounter.templates as template, index (template)}
    {#if (!encounter.enemies[index] || !encounter.enemies[index].dead)}
        <GameEnemy
                {template}
                {location}
                {player}
                bind:enemy={encounter.enemies[index]}
        />
    {/if}
{/each}
