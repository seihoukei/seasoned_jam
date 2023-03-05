import ENEMIES from "../enemies.js"
import Seasons from "../../../utility/seasons.js"

/*
    name : display name
    
    fixedEncounters: [
        {
            progress - mandatory, at what progress encounter happens
            seasons - default to Seasons.ANY
            enemies: *enemies
        }
    ]
    
    randomEncounters: [
        {
            weight - default to 1
            seasons - default to Seasons.ANY
            enemies: *enemies
        }
    ]
    
    *enemies [
        {
            enemy : enemy type
            level / minLevel + maxLevel - default to 1
            amount / minAmount + maxAmount - default to 1
        }
    ]
 */

const LOCATION = /*+location_start+*/{
    name: "Name",
    
    fixedEncounters: [
    ],
    
    randomEncounters: [
    ],
} /*+location_end+*/
