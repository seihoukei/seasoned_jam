<script>
    import UIView from "./UIView.svelte"
    import {onDestroy, onMount} from "svelte"
    import Seasons from "../../utility/seasons.js"
    import UICombatTab from "./tabs/UICombatTab.svelte"
    import UIPlayerTab from "./tabs/UIPlayerTab.svelte"
    import UISkillsTab from "./tabs/UISkillsTab.svelte"
    import UIMenuTab from "./tabs/UIMenuTab.svelte"
    import UIAbilitySelect from "./elements/UIAbilitySelect.svelte"
    import UIWorldTab from "./tabs/UIWorldTab.svelte"


    const pageData = {
        "combat" : {
            component : UICombatTab,
            title : "Combat",
        },
        "player" : {
            component : UIPlayerTab,
            title : "Player",
        },
        "skills" : {
            component : UISkillsTab,
            title : "Skills",
        },
        "world" : {
            component: UIWorldTab,
            title : "World"
        },
/*        "menu" : {
            component : UIMenuTab,
            title : "Menu",
        },*/
    }

    export let game
    let scale = "1px"

    let pages = []
//    $: console.log(pages)
    $: document.documentElement.style.setProperty('--base-unit', scale)

    $: season = game?.locations?.[game?.currentLocation]?.season ?? 0
    $: document.body.className = Seasons.getSeasonName(season)?.toLowerCase() ?? ""

    let width = -1
    let height = -1

    function updateView() {
        if (window.innerWidth === width && window.innerHeight === height)
            return

        width = window.innerWidth
        height = window.innerHeight
        let elements = pages.length

        if (width > height / 2) {
            scale = `${(height / 220).toFixed(2)}px`
            elements = Math.floor(2 * width / height)
        } else {
            scale = `${(width / 110).toFixed(2)}px`
            elements = 1
        }

        if (pages.length > elements)
            pages.length = elements

        if (pages.length < elements) {
            const pageList = Object.keys(pageData)
                .filter(x => !pages.includes(x))
            pages.push(...pageList.slice(0, elements - pages.length))
        }

        pages = pages
    }

    updateView()

    window.onresize = () => updateView()

    let interval = null
    onMount(() => {
        interval = setInterval(updateView, 1000)
    })

    onDestroy(() => {
        clearInterval(interval)
    })

//    <pre>{JSON.stringify(game, null, 1)}</pre>
</script>

<div>
    {#each pages as page}
        <UIView bind:page {game} {pageData} />
    {/each}
</div>

<UIAbilitySelect {game} />

<style>
    div {
        display : flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        width : 100vw;
        height: 100vh;
    }
</style>
