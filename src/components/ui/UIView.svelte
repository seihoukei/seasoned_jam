<script>
    import UITabs from "./UITabs.svelte"

    export let page = "combat"
    export let pageData
    export let scale = 1
    export let game

</script>

<div>
    <UITabs bind:page {pageData} />
    <svelte:component this={pageData[page].component} {game} />
</div>

<style>
    div {
        display : flex;
        flex-direction: column;
        height : 200em;
        width: 100em;
        border-radius: 2em;
    }
</style>
