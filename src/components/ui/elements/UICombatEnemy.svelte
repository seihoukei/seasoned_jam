<script>
    import UIHPBar from "./UIHPBar.svelte"
    import Trigger from "../../../utility/trigger.js"
    import UICombatEnemyAbility from "./UICombatEnemyAbility.svelte"
    import UICombatEnemyTrait from "./UICombatEnemyTrait.svelte"

    export let enemy
    export let isTarget


    $: background = `url('../resources/images/enemies/${enemy?.id?.toLowerCase() ?? "unknown"}.jpg')`
    $: abilities = enemy?.abilities ?? []
    $: traits = enemy?.traits ?? []

    function target() {
        Trigger("setPlayerTarget", enemy)
    }

</script>

<div class="container" class:dead={enemy?.dead} class:target={isTarget} on:click={target}>
    <div class="name"><span class="name">{enemy.name} (Lv{enemy.level})</span></div>
    <div class="image" style="--enemy-background: {background}">
        <div class="traits">
            {#each traits as trait}
                <UICombatEnemyTrait {trait}/>
            {/each}
        </div>
    </div>
    <div class="hp"><UIHPBar max={enemy?.hp} lost={enemy?.lostHp} text /></div>
    <div class="abilities">
        {#each abilities as ability}
            <UICombatEnemyAbility {ability}/>
        {/each}
    </div>
</div>

<style>
    div.container {
        border : 0.5rem solid #00000066;
        width : 10em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position : relative;
        border-radius: 0.5em;
        overflow: hidden;
    }
    div.target {
        border : 0.5rem solid maroon;
    }
    div.dead {
        opacity: 0.5;
    }
    div.name {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #00000088;
        width : 10em;
        margin-bottom: -1em;
        z-index : 1;
        position : absolute;
        top : 0;
        left: 0;
    }
    span.name {
        font-size: 0.8em;
    }
    div.image {
        position : relative;
        width: 10em;
        height: 10em;
        background: var(--enemy-background);
        background-size: 10em 10em;
    }
    div.abilities {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
    }
    div.hp {
        position : relative;
        width: 10em;
        height: 1em;
        background-color: #000000CC;
        display : flex;
        align-items: center;
        justify-content: center;
    }
    div.traits {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        row-gap: 1rem;
        column-gap: 1rem;
        width : 100%;
        justify-content: center;
        bottom: 1rem;
    }
</style>
