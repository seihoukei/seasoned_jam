<script>
    import UICombatLocation from "../elements/UICombatLocation.svelte"
    import UICombatPlayer from "../elements/UICombatPlayer.svelte"

    export let game


</script>

<div class="layout">
    <UICombatLocation {game} />
    <UICombatPlayer {game} />
</div>

<style>
    div {
        display:flex;
        flex-direction: column;
        row-gap: 5em;
        background-color: #00000088;
        height : 100%;
        padding : 5rem;
        border-radius: 0 2em 2em 2em;
        border : 1em solid #00000055;
    }
</style>
