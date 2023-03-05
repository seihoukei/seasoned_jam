<script>
    import {onDestroy, onMount} from "svelte"
    import Trigger from "../../../utility/trigger.js"
    import Seasons from "../../../utility/seasons.js"
    import UIAbilitySelectItem from "./UIAbilitySelectItem.svelte"

    export let game
    const dialog = {
        visible : false,
        x : 0,
        y : 0,
    }

    let slot = null
    let items
    let dialogElement

    $: player = game?.player
    $: location = game?.locations?.[game?.currentLocation]
    $: validatePosition(dialogElement)

    function hide() {
        dialog.visible = false
    }

    function show(x, y, index) {
        if (+index > -1) {
            slot = game.player.abilitySlots[index]
            items = game.player.abilities
        } else {
            slot = game.player.specialSlot
            items = game.player.specialAbilities
        }

        if (!slot || !items)
            return

        dialog.x = x - 10
        dialog.y = y - 10
        dialog.visible = true
    }

    function validatePosition() {
        if (!dialogElement)
            return
        dialog.x = Math.min(dialog.x, window.innerWidth - dialogElement.clientWidth)
        dialog.y = Math.min(dialog.y, window.innerHeight - dialogElement.clientHeight)
    }

    function select(item) {
        Trigger("setSlotAbility", slot, item)
        hide()
    }

    const triggers = {}
    onMount(() => {
        triggers.show = Trigger.on("showAbilitySelector", show)
    })

    onDestroy(() => {
        Object.values(triggers)
            .forEach(trigger => trigger.cancel())
    })

</script>

{#if dialog.visible}
    <div class="holder" on:click={hide}>
        <div class="dialog" style="--x:{dialog.x}px;--y:{dialog.y}px" bind:this={dialogElement} on:click={(event) => event.stopPropagation()}>
            <div class="item" on:click={() => select(null)}>- empty -</div>
            {#each items as item}
                <UIAbilitySelectItem {item} {player} on:click={select(item)}/>
            {/each}
        </div>
    </div>
{/if}

<style>
    div.holder {
        position: absolute;
        left : 0;
        top : 0;
        width : 100vw;
        height: 100vh;
        z-index : 2
    }
    div.dialog {
        white-space: nowrap;
        position: absolute;
        left : var(--x);
        top : var(--y);
        padding: 2em;
        background-color: #000000CC;
        border-radius: 2em;
    }
    div.item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        padding: 2rem;
        cursor: pointer;
        background-color: #FFFFFF00;
        transition: background-color 0.2s;
    }
    div.item:hover {
        background-color: #FFFFFF66;
    }
    div.item.active {
        color : yellow;
    }
</style>
