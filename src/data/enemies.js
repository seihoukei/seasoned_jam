import Seasons from "../utility/seasons.js"

/*
    every entry is f(level)

    name : display name
    hp : max hp
    exp : exp gained from killing
    
    pic : enemy image
    pics : images by season
    
    traits : list of traits, default to empty
        trait : {
            name - display name
            trait - TRAITS.type
            level - fixed trait level
            minLevel / maxLevel - alternative
            chance - chance to have trait (default to 1)
            seasons - seasons where trait appears, default to Seasons.ANY
        }
 */

const ENEMIES = {
    woodenDummy : (level) => ({
        name : "Wooden dummy",
        hp : 5 * level,
        exp : level,
        traits: [{
            name : "Sturdy",
            trait : "normalDefence",
            level : 10,
            chance : level > 1 ? 1 : 0,
        }],
        abilities : [],
    }),
    iceDummy : (level) => ({
        name : "Ice dummy",
        hp : 100 * level,
        exp: level * 3,
        traits : [{
            name : "Melt",
            trait : "hpLoss",
            level : 10,
            seasons : Seasons.WARM,
        }, {
            name : "Sturdy",
            trait : "normalDefence",
            minLevel : 5,
            maxLevel : 25,
            chance : 0.5,
        }, {
            name : "Ice resistance",
            trait : "iceDefence",
            level : 80,
        }],
        abilities : [],
    }),
    liquidDummy : (level) => ({
        name : "Liquid dummy",
        hp : level,
        exp : level * 2,
        traits : [{
            name : "Liquid",
            trait : "normalDefence",
            level : 99.9,
            seasons : Seasons.ANY - Seasons.WINTER,
        }],
    }),
    blob : (level) => ({
        name : "Blob",
        hp : 20 * level,
        exp : level * 5,
        traits : [],
        abilities : [{
            name : "Bite",
            time : Math.max(1, 3 - Math.random() * level / 10),
            action : "attack",
            data : {
                normal : 1,
            },
        }]
    }),
    spider : (level) => ({
        name : "Spider",
        hp : 25 * level,
        exp : level * 5,
        traits : [],
        abilities : [{
            name : "Bite",
            time : Math.max(1, 3 - Math.random() * level / 10),
            action : "attack",
            data : {
                normal : 3 + level / 10,
            },
        }, {
            name : "Web",
            time : Math.max(2, 5 - Math.random() * level / 10),
            action : "curse",
            data : {
                name : "-Speed",
                trait : "speed",
                level : Math.max(-50, -5 - Math.random() * level),
                duration : 5 + Math.random() * level,
            },
        }]
    }),
    mushroom : (level) => ({
        name : "Mushroom",
        hp : 25 * level,
        exp : level * 5,
        traits : [{
            seasons : Seasons.SUMMER + Seasons.SPRING + Seasons.AUTUMN,
            name : "Regeneration",
            trait : "hpGain",
            level : 1,
        }],
        abilities : [{
            name : "Poison",
            time : Math.max(3, 6 - Math.random() * level / 10),
            action : "curse",
            data : {
                name : "Poison",
                trait : "hpLoss",
                level : level / 10,
                duration : 5 + Math.random() * level
            },
        }, {
            name : "Heal",
            time : Math.max(10, 20 - Math.random() * level / 10),
            action : "heal",
            data : {
               amount : level,
            },
        }]
    }),
}

export default ENEMIES
