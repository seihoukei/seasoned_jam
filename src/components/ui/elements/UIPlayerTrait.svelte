<script>
    export let trait
</script>

<div class="container">
    {trait.name ?? "???"}
    {#if trait.cooldown}
        ({trait.cooldown.toFixed(1)})
    {/if}
</div>

<style>
    div.container {
        font-size: 4em;
        border-radius: 1rem;
        background-color: #00000088;
        padding : 1rem;
    }
</style>
