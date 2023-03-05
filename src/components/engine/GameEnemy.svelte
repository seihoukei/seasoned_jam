<script>
    import ENEMIES from "../../data/enemies.js"
    import Trigger from "../../utility/trigger.js"
    import {onDestroy, onMount} from "svelte"
    import TRAITS from "../../data/traits.js"
    import DEFAULT_EFFECTS from "../../data/default-effects.js"
    import applyTraits from "../../utility/apply-traits.js"
    import Seasons from "../../utility/seasons.js"

    export let template
    export let enemy
    export let location
    export let player

    $: checkIfDead(enemy?.lostHp)
    $: season = location.season
    $: toggleTraitsBySeason(season)

    function finalizeTraits() {
        enemy.traits = enemy.traits
            .filter(trait => Math.random() < (trait.chance ?? 1))

        for (const trait of enemy.traits) {
            const minLevel = trait.minLevel ?? 1
            const maxLevel = trait.maxLevel ?? 1
            trait.level = trait.level ?? Math.floor(minLevel + (maxLevel - minLevel + 1) * Math.random())
            trait.modifier = TRAITS[trait.trait](trait.level)

            delete trait.minLevel
            delete trait.maxLevel
            delete trait.chance
        }
    }

    function checkIfDead() {
        if (!enemy || enemy.dead)
            return
        enemy.dead = enemy.lostHp >= enemy.hp
        if (enemy.dead) {
            Trigger("enemyDied", enemy)
        }
    }

    function initializeEnemy() {
        const archetype = ENEMIES[template.enemy]
        enemy = archetype(template.level)
        finalizeTraits()

        enemy.lostHp = 0
        enemy.id = template.enemy
        enemy.level = template.level
    }

    if (!enemy) {
        initializeEnemy()
        Trigger("enemySpawned", enemy)
    }

    function dealDamage(damage, breakdown) {
        enemy.lostHp += damage
    }

    function heal(amount) {
        enemy.lostHp -= amount
        if (enemy.lostHp < 0)
            enemy.lostHp = 0
    }

    function toggleTraitsBySeason() {
        for (const trait of enemy.traits) {
            trait.active = Seasons.belongsTo(season, trait.seasons ?? Seasons.ANY)
        }
    }

    function advance(time) {
        let effects = Object.assign({}, DEFAULT_EFFECTS)
        effects = applyTraits(effects, enemy.traits, "tick")

        dealDamage(effects.hpLoss * time)
        heal(effects.hpGain * time)

        const abilityTime = effects.speed * time
        if (enemy.abilities)
        for (let ability of enemy.abilities) {
            ability.progress = (ability.progress ?? 0) + abilityTime
            while (ability.progress > ability.time) {
                ability.progress -= ability.time
                Trigger("queueActivation", ability.action, {
                    source : enemy,
                    target : player,
                }, ability.data, -ability.progress.current)
            }
        }
        //charge actions, apply speed
    }

    const triggers = {}
    onMount(() => {
        triggers.tick = Trigger.on("tick", (time, boost, rawTime) => {
            advance(time)
        })
        triggers.damage = Trigger.on("dealDamage", (target, damage, breakdown) => {
            if (target !== enemy)
                return
            dealDamage(damage, breakdown)
        })
        triggers.heal = Trigger.on("heal", (target, amount) => {
            if (target !== enemy)
                return
            heal(amount)
        })
        triggers.setSeason = Trigger.on("setSeason", toggleTraitsBySeason)
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })
</script>
