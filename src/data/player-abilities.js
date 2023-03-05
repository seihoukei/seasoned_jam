import Seasons from "../utility/seasons.js"

const PLAYER_ABILITIES = [{
    name : "Attack",
    time : 2,
    action : "attack",
    data : {
        normal : 1,
    },
}, {
    name : "Boost defence",
    time : 1.2,
    action : "bless",
    data : {
        name : "+Defence",
        trait : "bonusDefence",
        level : 10,
        duration : 10,
    },
    requirements: {
        boostMagic : 1,
    },
}, {
    name : "Boost attack",
    time : 1.2,
    action : "bless",
    data : {
        name : "+Attack",
        trait : "bonusAttack",
        level : 10,
        duration : 10,
    },
    requirements: {
        boostMagic : 2,
    },
}, {
    name : "Blizzard",
    time : 5,
    seasons : Seasons.WINTER,
    action : "attack",
    data : {
        ice : 5,
    },
    requirements: {
        battleMagic : 1,
    },
}, {
    name : "Heal",
    time : 5,
    seasons: Seasons.SPRING + Seasons.SUMMER,
    action: "heal",
    data : {
        amount : 10
    },
    requirements: {
        healing : 1,
    },
}]

export default PLAYER_ABILITIES
