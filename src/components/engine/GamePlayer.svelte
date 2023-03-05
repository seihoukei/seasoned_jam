<script>
    import GamePlayerSlot from "./GamePlayerSlot.svelte"
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../../utility/trigger.js"
    import PLAYER_ABILITIES from "../../data/player-abilities.js"
    import PLAYER_SPECIAL_ABILITIES from "../../data/player-special-abilities.js"
    import DEFAULT_EFFECTS from "../../data/default-effects.js"
    import applyTraits from "../../utility/apply-traits.js"
    import DEFAULT_PLAYER_STATS from "../../data/default-player-stats.js"
    import Fibonacci from "../../data/fibonacci.js"
    import PLAYER_SKILLS from "../../data/player-skills.js"

    const PLAYER_SLOTS = 5
    export let player = {
        stats : Object.assign({}, DEFAULT_PLAYER_STATS),
        skills : {
//            extraSlot:2,
        }, //TODO
        hp : 100,
        lostHp : 0,
        exp : 0,
        level : 0,
        levelCost : 1,
        target : null,
        abilitySlots : new Array(PLAYER_SLOTS),
        traits : [],

        //TODO: decouple from data
        abilities : PLAYER_ABILITIES,
        specialAbilities : PLAYER_SPECIAL_ABILITIES,
    }


    export let location = {}

    calculateStats()

    function setTarget(enemy) {
        if (enemy && !enemy.dead)
            player.target = enemy
    }

    function advance(time) {
        let effects = Object.assign({}, DEFAULT_EFFECTS)
        effects = applyTraits(effects, player.traits, "tick")

        let cleanup = false
        for (let trait of player.traits) {
            if (trait.cooldown) {
                trait.cooldown -= time
                if (trait.cooldown < 0)
                    cleanup = true
            }
        }

        if(cleanup) {
            cleanupTraits()
        }
        dealDamage(effects.hpLoss * time)
        heal(effects.hpGain * time)

        const playerSpeed = player.calculatedStats.speed / 10 * effects.speed
        Trigger("playerTick", time * playerSpeed)
        //accumulate continuous effect of traits
    }

    function resetPlayer() {
        player.lostHp = 0
        for (let trait of player.traits)
            if (trait.cooldown)
                trait.cooldown = -1
        cleanupTraits()
    }

    function dealDamage(damage, breakdown) {
        player.lostHp += damage
        if (player.lostHp >= player.hp) {
            resetPlayer()
            Trigger("playerDied")
        }
    }

    function heal(amount) {
        player.lostHp -= amount
        if (player.lostHp < 0)
            player.lostHp = 0
    }

    function getTrophy(enemy) {
        player.exp += enemy.exp ?? 0
    }

    function levelUp(stat) {
        if (player.exp < player.levelCost)
            return
        if (!player.stats[stat])
            return
        player.exp -= player.levelCost

        player.stats[stat] += 1
        player.level += 1

        calculateStats()
    }

    function levelUpSkill(id) {
        const skill = PLAYER_SKILLS[id]
        const level = player?.skills?.[id] ?? 0
        const cost = skill.exp * (skill.multi ?? 1) ** level
        const maxed = level >= skill.max ?? 1
        const canLevelUp = player?.exp >= cost && !maxed

        if (!canLevelUp)
            return

        player.exp -= cost

        player.skills[id] = (player.skills[id] ?? 0) + 1

        calculateStats()
    }


    function addTrait(trait) {
        player.traits.push(trait)
        calculateStats()
    }

    function cleanupTraits(){
        player.traits = player.traits.filter(x => x.cooldown > 0 || x.cooldown === undefined)
        calculateStats()
    }

    function calculateStats() {
        let calculated = Object.assign({}, player.stats)
        calculated = applyTraits(calculated, player.traits, "stats")
        for (let [id, level] of Object.entries(player.skills)) {
            const skill = PLAYER_SKILLS[id]
            if (!skill || level <= 0)
                continue
            if (skill.statModifier) {
                calculated = skill.statModifier(calculated, level)
            }
        }
        player.calculatedStats = calculated
        player.levelCost = Fibonacci.nth(player.level)
        player.hp = 100 + 4 * player.level ** 2
    }

    const triggers = {}
    onMount(() => {
        triggers.tick = Trigger.on("tick", (time, boost, rawTime) => {
            advance(time)
        })
        triggers.target = Trigger.on("setPlayerTarget", (enemy) => {
            setTarget(enemy)
        })
        triggers.damage = Trigger.on("dealDamage", (target, damage, breakdown) => {
            if (target !== player)
                return
            dealDamage(damage, breakdown)
        })
        triggers.heal = Trigger.on("heal", (target, amount) => {
            if (target !== player)
                return
            heal(amount)
        })
        triggers.target = Trigger.on("enemyDied", (enemy) => {
            getTrophy(enemy)
        })
        triggers.levelUp = Trigger.on("levelUp", (stat) => {
            levelUp(stat)
        })
        triggers.levelUpSkill = Trigger.on("levelUpSkill", (skill) => {
            levelUpSkill(skill)
        })
        triggers.trait = Trigger.on("addTrait", (target, trait) => {
            if (target !== player)
                return
            addTrait(trait)
        })
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })

    //TODO: FIX WHEN LOADING
    setTimeout(() => Trigger("setSlotAbility", player.abilitySlots[0], player.abilities[0]), 0)

</script>

{#each player.abilitySlots as slot, index}
    <GamePlayerSlot
            {player}
            {index}
            bind:slot
            {location}
    />
{/each}

<GamePlayerSlot
        {player}
        index=-1
        bind:slot={player.specialSlot}
        {location}
/>
