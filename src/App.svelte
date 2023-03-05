<script>
    import GameTimer from "./components/GameTimer.svelte"
    import GameState from "./components/engine/GameState.svelte"
    import GameUI from "./components/ui/GameUI.svelte"
    import GameDebug from "./components/GameDebug.svelte"

    let game

</script>

<GameState bind:game />
<GameUI {game} />

<GameTimer rate=60 boost=1 event="tick" />

{#if import.meta.env.DEV}
    <GameDebug {game} />
{/if}
