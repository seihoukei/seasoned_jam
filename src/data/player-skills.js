const PLAYER_SKILLS = {
    boostMagic: {
        name : "Boosting magic",
        description: "Every level unlocks spells that boost stats",
        exp : 10,
        multi : 10,
        max : 2,
    },
    battleMagic: {
        name : "Battle magic",
        description: "Every level unlocks powerful magic spell",
        exp : 100,
        multi : 10,
        max : 1,
    },
    healing: {
        name : "Healing magic",
        description: "Unlocks healing spell",
        exp : 100,
        max : 1,
    },
    extraSlot: {
        name : "Extra action slot",
        description : "Unlocks extra slots for simultaneous actions",
        exp : 100,
        multi : 10,
        max : 4,
        statModifier : (stats, level) => ({
                ...stats,
                slots : stats.slots + level,
        })
    },
    
}

export default PLAYER_SKILLS
