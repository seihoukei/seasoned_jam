<script>
    import LOCATIONS from "../../../data/locations.js"
    import UIWorldLocation from "../elements/UIWorldLocation.svelte"
    import UIPlayerStat from "../elements/UIPlayerStat.svelte"
    import PLAYER_SKILLS from "../../../data/player-skills.js"
    import UIPlayerSkill from "../elements/UIPlayerSkill.svelte"
    import UIPlayerTrait from "../elements/UIPlayerTrait.svelte"

    export let game

    const STATS = {
        attack : {
            name : "Attack",
            description : "Increases dealt physical damage",
            change : true,
        },
        defence : {
            name : "Defence",
            description : "Reduces received physical damage",
            change : true,
        },
        magic : {
            name : "Magic",
            description : "Increases magical damage",
            change : true,
        },
        speed : {
            name : "Speed",
            description : "Increases casting speed and evasion",
            change : true,
        },
        slots : {
            name : "Action slots",
            description : "Allows multiple abilities to be used"
        } ,
    }

    const STATS_LIST = Object.keys(STATS)
    const skills = Object.keys(PLAYER_SKILLS)

    for (let id of STATS_LIST) {
        STATS[id].id = id
    }

    $: player = game?.player
    $: traits = player?.traits
        ?.filter(x => x.active)
        ?? []

</script>

<div class="layout">
    <div class="stats">
        {#each STATS_LIST as id}
            <UIPlayerStat stat={STATS[id]} {player} />
        {/each}
    </div>
    <div class="hint">
        Level: {player?.level}
    </div>
    <div class="hint">
        Exp: {player?.exp}
    </div>
    <div class="hint">
        Next level cost: {player?.levelCost}
    </div>
<!--
    <div class="skills">
        {#each skills as id}
            <UIPlayerSkill {id} {player} />
        {/each}
    </div>
-->
    <div class="traits">
        {#each traits as trait}
            <UIPlayerTrait {trait}/>
        {/each}
    </div>
</div>

<style>
    div.layout {
        display:flex;
        flex-direction: column;
        row-gap: 2em;
        background-color: #00000088;
        height : 100%;
        padding : 5rem;
        border-radius: 0 2em 2em 2em;
        border : 1em solid #00000055;
    }

    div.hint {
        font-size: 4em;
        text-align: center;
    }

    div.stats {
        display: flex;
        flex-direction: column;
        row-gap: 2em;
    }

    div.traits {
        display : flex;
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 0.5em;
        column-gap: 0.5em;
    }
</style>
