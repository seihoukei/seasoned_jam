import applyTraits from "../utility/apply-traits.js"
import DEFAULT_DAMAGE from "./default-damage.js"
import Trigger from "../utility/trigger.js"
import TRAITS from "./traits.js"

const ACTIONS = {
    attack(data, source, target) {
        let damage = Object.assign({}, DEFAULT_DAMAGE, data)
        
        //apply source atk/magic
        if (source?.calculatedStats) {
            const stats = source?.calculatedStats
            damage.normal *= stats.attack / 10
            damage.ice *= stats.magic / 10
            damage.fire *= stats.magic / 10
            damage.water *= stats.magic / 10
            damage.grass *= stats.magic / 10
        }
    
        if (source.traits)
            damage = applyTraits(damage, source.traits, "dealDamage")
        
        if (target.traits)
            damage = applyTraits(damage, target.traits, "receiveDamage")
    
        if (target?.calculatedStats) {
            const stats = target?.calculatedStats
            damage.normal /= stats.defence / 10
            damage.hitChance /= 1 + (stats.speed - 10) / 100
        }
        
        if (data.hitChance < Math.random()) {
            Trigger("miss", target)
            return
        }
        
        damage.critical = damage.criticalChance > Math.random()
        
        let dealtDamage = damage.normal + damage.fire + damage.ice + damage.water + damage.grass
        if (damage.critical)
            dealtDamage *= damage.criticalMulti

        dealtDamage -= damage.reduction
        dealtDamage = Math.min(damage.max, Math.max(damage.min, dealtDamage))
        
        //TODO: life drain?
        
        Trigger("dealDamage", target, dealtDamage, damage)
    },
    
    invokeSeason(data, source, target) {
        Trigger("setSeason", data.season)
    },
    
    flee() {
        Trigger("updateLocation")
        Trigger("flee")
    },
    
    curse(data, source, target) {
        let duration = data.duration
        if (source.stats) {
            duration *= 1 + (source.stats.magic - 10) / 50
        }
        const curse = {
            name : data.name,
            cooldown : duration,
            active : true,
            modifier : TRAITS[data.trait](data.level),
        }
        Trigger("addTrait", target, curse)
    },
    
    bless(data, source, target) {
        let duration = data.duration
        if (source.stats) {
            duration *= 1 + (source.stats.magic - 10) / 50
        }
        const blessing = {
            name : data.name,
            cooldown : duration,
            active : true,
            modifier : TRAITS[data.trait](data.level),
        }
        Trigger("addTrait", source, blessing)
    },
    
    heal(data, source, target) {
        let amount = data.amount
        if (source.stats) {
            amount *= source.stats.magic / 10
        }
        Trigger("heal", source, amount)
    }
}

export default ACTIONS
