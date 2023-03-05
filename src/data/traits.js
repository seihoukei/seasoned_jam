/*
    every entry is f(level)
    
    tick : (time, owner) - every tick event
    dealDamage : (damage, source, target) - transformation of dealt damage (reduction / increment)
    receiveDamage : (damage, source, target) - transformation of received damage
 */

const TRAITS = {
    hpLoss : (level) => ({
        tick : effects => ({
            ...effects,
            hpLoss : effects.hpLoss + level,
        })
    }),
    hpGain : (level) => ({
        tick : effects => ({
            ...effects,
            hpGain : effects.hpGain + level,
        })
    }),
    normalDefence : (level) => ({
        receiveDamage : damage => ({
            ...damage,
            normal : damage.normal * Math.max(0, Math.min(1, 1 - (level / 100)))
        })
    }),
    iceDefence : (level) => ({
        receiveDamage : damage => ({
            ...damage,
            ice : damage.ice * Math.max(0, Math.min(1, 1 - (level / 100)))
        })
    }),
    speed : (level) => ({
        tick : (effects) => ({
            ...effects,
            speed : effects.speed * (1 + level / 100),
        })
    }),
    bonusAttack : (level) => ({
        stats : stats => ({
            ...stats,
            attack : stats.attack + level,
        })
    }),
    bonusDefence : (level) => ({
        stats : stats => ({
            ...stats,
            defence : stats.defence + level,
        })
    }),
}

export default TRAITS
