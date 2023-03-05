import Seasons from "../../utility/seasons.js"

const LOCATION = /*+location_start+*/{
    name: "Forest",
    requirements: {
        locations : {
            "academy" : 10,
        },
    },
    defaultSeason : Seasons.SUMMER,
    levelScaling : (level, progress) => level + progress * 0.2,
    
    fixedEncounters: [
        {
            progress : 0,
            message: "Actual enemies fight back! ",
            enemies : [{
                enemy: "blob",
                level: 1
            }],
        },
    ],
    
    randomEncounters: [

        {
            weight: 3,
            enemies: [{
                enemy: "blob",
                minLevel: 1,
                maxLevel: 2,
                minAmount: 2,
                maxAmount: 4,
            }]
        },

        {
            weight: 1,
            enemies: [{
                enemy: "spider",
                minLevel: 1,
                maxLevel: 3,
                minAmount: 1,
                maxAmount: 2,
            }]
        },

        {
            weight: 1,
            enemies: [{
                enemy: "mushroom",
                minLevel: 1,
                maxLevel: 3,
                minAmount: 1,
                maxAmount: 2,
            }]
        },

        {
            weight: 1,
            enemies: [{
                enemy: "mushroom",
                minLevel: 1,
                maxLevel: 2,
            },{
                enemy: "spider",
                minLevel: 1,
                maxLevel: 2,
            }]
        },

    ],
}/*+location_end+*/
