<script>
    import {tweened} from "svelte/motion"
    import {cubicIn} from "svelte/easing"

    export let max = 100
    export let lost = 0
    export let text = false

    $: hpLeft = max - lost
    $: hpText = `${hpLeft.toFixed(1)}/${max.toFixed(1)}`
    $: value = hpLeft / max * 100
    $: tween.set(value)

    const tween = tweened(100, {duration : 400, easing: cubicIn})

</script>

<div class="bar" style="--hp-value:{value.toFixed(2)}%;--hp-tween:{$tween.toFixed(2)}%">
    <div class="tween"></div>
    <div class="value"></div>
    {#if text}
        <span class="text">
            {hpText}
        </span>
    {/if}
</div>

<style>
    div.bar {
        position: absolute;
        left : 0;
        top : 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.tween {
        position: absolute;
        background-color: #FF000088;
        left : 0;
        top : 0;
        width: var(--hp-tween);
        height: 100%;
    }
    div.value {
        position: absolute;
        background-color: #008800;
        left : 0;
        top : 0;
        width: var(--hp-value);
        height: 100%;
    }
    span.text {
        z-index: 2;
    }
</style>
