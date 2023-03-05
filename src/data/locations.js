//DO NOT EDIT DIRECTLY
//USE locations/__build_locations.cjs

import Seasons from "../utility/seasons.js"

const LOCATIONS = {
    academy: {
        name: "Academy",
        defaultSeason : Seasons.SUMMER,
        levelScaling : (level, progress) => level + progress * 0.1,
        
        fixedEncounters: [
            {
                progress : 0,
                enemies : [{
                    enemy: "woodenDummy",
                    level: 1
                }],
            },
        
            {
                progress : 1,
                message : "You can use bottom slot to invoke seasons",
                enemies : [{
                    enemy: "woodenDummy",
                    level: 2
                }],
            },
        
            {
                progress : 2,
                message : "You can click enemy to change target",
                enemies : [{
                    enemy: "woodenDummy",
                    level: 2
                }, {
                    enemy: "woodenDummy",
                    level: 1
                }],
            },
        
            {
                progress : 3,
                message : "Liquid dummy freezes in winter",
                enemies : [{
                    enemy: "liquidDummy",
                    level: 1
                }],
            },
        
            {
                message : "Ice dummy is strong, but melts easily in a warm season.",
                progress : 4,
                enemies : [{
                    enemy: "iceDummy",
                    level: 1
                }],
            },
        
            {
                message : "Beating this level will unlock forest",
                progress : 9,
                enemies : [{
                    enemy: "iceDummy",
                    level: 5,
                },{
                    enemy: "woodenDummy",
                    level: 5,
                },{
                    enemy: "liquidDummy",
                    level: 5,
                }],
            },
        ],
        
        randomEncounters: [
            {
                weight : 10,
                enemies: [{
                    enemy: "woodenDummy",
                    minLevel: 1,
                    maxLevel: 3,
                    minAmount: 1,
                    maxAmount: 3,
                }],
            },
            
            {
                weight : 3,
                seasons : Seasons.COLD,
                enemies: [{
                    enemy: "iceDummy",
                    minLevel: 1,
                    maxLevel: 3,
                }],
            },
            
            {
                weight : 1,
                seasons : Seasons.WARM,
                enemies: [{
                    enemy: "liquidDummy",
                    minLevel: 1,
                    maxLevel: 3,
                }],
            },
        ]
    },

    forest: {
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
    },
}

export default LOCATIONS