<script>
    import UICombatEnemy from "./UICombatEnemy.svelte"

    export let game

    $: encounter = game?.encounter
    $: enemies = encounter?.enemies ?? []

    $: number = enemies?.length ?? 0
    $: enemyScale = ["5rem","5rem","3rem","3rem","3rem"][number] ?? "2.5rem"

</script>

<div class="container" style="--enemy-scale: {enemyScale}">
{#if encounter}
    {#if encounter.message}
        <div class="message">{encounter.message}</div>
    {/if}
    {#each enemies as enemy (enemy)}
        <UICombatEnemy {enemy} isTarget={game?.player?.target === enemy}/>
    {/each}
{/if}
</div>

<style>
    div.container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width : 90rem;
        height: 90rem;
        flex-wrap: wrap;
        font-size: var(--enemy-scale);
    }
    div.message {
        position: absolute;
        left : 0;
        top : 0;
        width : 100%;
        background-color: #00000088;
        font-size: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>
