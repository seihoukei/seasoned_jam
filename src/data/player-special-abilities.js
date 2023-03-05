import Seasons from "../utility/seasons.js"

const PLAYER_SPECIAL_ABILITIES = [{
    name : "Flee",
    action : "flee",
    time : 5,
}, {
    name : "Invoke summer",
    seasons : Seasons.ANY - Seasons.SUMMER,
    time : 10,
    action : "invokeSeason",
    data : {
        season : Seasons.SUMMER
    }
}, {
    name : "Invoke autumn",
    seasons : Seasons.ANY - Seasons.AUTUMN,
    time : 10,
    action : "invokeSeason",
    data : {
        season : Seasons.AUTUMN
    }
}, {
    name : "Invoke winter",
    seasons : Seasons.ANY - Seasons.WINTER,
    time : 10,
    action : "invokeSeason",
    data : {
        season : Seasons.WINTER
    }
}, {
    name : "Invoke spring",
    seasons : Seasons.ANY - Seasons.SPRING,
    time : 10,
    action : "invokeSeason",
    data : {
        season : Seasons.SPRING
    }
}]

export default PLAYER_SPECIAL_ABILITIES
