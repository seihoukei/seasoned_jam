<script>
    import LOCATIONS from "../../../data/locations.js"
    import UIWorldLocation from "../elements/UIWorldLocation.svelte"

    export let game

</script>

<div class="layout">
    <div class="hint">
        Unlock locations by reaching higher levels in available ones.<br>
        Location changes after you beat current encounter or if you flee successfully.
    </div>
    {#each Object.keys(LOCATIONS) as id}
        <UIWorldLocation {id} {game} />
    {/each}
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
</style>
