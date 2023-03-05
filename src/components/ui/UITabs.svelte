<script>
    export let pageData = {}
    export let page

    $: tabs = Object.entries(pageData)
</script>

<div class="row">
    {#each tabs as tab}
        <div class="tab" class:active={page === tab[0]} on:click={() => page = tab[0]}>
            {tab[1].title}
        </div>
    {/each}
</div>

<style>
    div.row {
        display: flex;
        flex-direction: row;
        align-items: end;
    }
    div.tab {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        width : 19rem;
        height : 7rem;
        padding-bottom: 1rem;
        transition: padding 0.2s, background-color 0.2s;
        cursor: pointer;
        background-color: #00000044;
        border-radius: 2rem 2rem 0 0;
    }
    div.tab.active {
        padding-bottom : 0;
        padding-top : 1rem;
        cursor: default;
        background-color: #000000AA;
    }
</style>
