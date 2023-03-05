<script>
    export let trait
</script>

{#if trait.active}
    <div class="container">
        {trait.name ?? "???"}
        {#if trait.cooldown}
            ({trait.cooldown.toFixed(1)})
        {/if}
    </div>
{/if}

<style>
    div.container {
        font-size: 4rem;
        border-radius: 1rem;
        background-color: #00000088;
        padding : 1rem;
    }
</style>
