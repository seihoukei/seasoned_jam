<script>
    export let ability

    $: max = ability.time ?? 10
    $: progress = (ability.progress ?? 0) / max * 100

</script>

<div class="ability" style="--progress:{progress.toFixed(2)}%">
    <div class="progress"></div>
    <span class="title">{ability.name}</span>
</div>

<style>
    div.ability{
        position: relative;
        width: 10em;
        height: 1em;
        background-color: #000000CC;
        display : flex;
        align-items: center;
        justify-content: center;
    }
    div.progress {
        position: absolute;
        left : 0;
        top : 0;
        width : var(--progress);
        height : 100%;
        background-color: #FFFFFF66;
    }
    span.title {
        z-index: 2;
        font-size: 0.8em;
    }

</style>
