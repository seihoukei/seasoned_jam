<script>
    import UICombatPlayerSlot from "./UICombatPlayerSlot.svelte"
    import UIHPBar from "./UIHPBar.svelte"

    export let game

    $: player = game?.player
</script>

{#if player}
    <div class="container">
        <div class="hp"><UIHPBar max={player.hp} lost={player.lostHp}/><span class="hp">{(player?.hp - player?.lostHp).toFixed(1)} / {player?.hp?.toFixed(1)}</span></div>
        <div class="traits"></div>
        <div class="slots">
            {#each player.abilitySlots as slot, index}
                <UICombatPlayerSlot {slot} {index} {player} />
            {/each}
            <UICombatPlayerSlot slot={player.specialSlot} index=-1 {player} />
        </div>
    </div>
{/if}

<style>
    div.container {
        display: flex;
        flex-direction: column;
        row-gap: 5em;
        align-items: stretch;
    }
    div.hp {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height : 10em;
        background-color: #000000CC;
        border-radius: 2em;
        border : 0.5em solid #00000088;
        overflow: hidden;
    }
    span.hp {
        font-size: 6em;
        z-index: 2;
    }

    div.slots {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
    }
</style>
