export default class Seasons {
    static SUMMER = 1
    static AUTUMN = 2
    static WINTER = 4
    static SPRING = 8
    
    static WARM = Seasons.SPRING + Seasons.SUMMER
    static COLD = Seasons.AUTUMN + Seasons.WINTER
    static ANY = Seasons.SUMMER + Seasons.AUTUMN + Seasons.SPRING + Seasons.WINTER
    
    static #NAMES = {
        [Seasons.SUMMER] : "Summer",
        [Seasons.AUTUMN] : "Autumn",
        [Seasons.WINTER] : "Winter",
        [Seasons.SPRING] : "Spring",
    }
    
    static #NEXT = {
        [Seasons.SUMMER] : Seasons.AUTUMN,
        [Seasons.AUTUMN] : Seasons.WINTER,
        [Seasons.WINTER] : Seasons.SPRING,
        [Seasons.SPRING] : Seasons.SUMMER,
    }
    
    static #LAST = {
        [Seasons.SUMMER] : Seasons.SPRING,
        [Seasons.AUTUMN] : Seasons.SUMMER,
        [Seasons.WINTER] : Seasons.AUTUMN,
        [Seasons.SPRING] : Seasons.WINTER,
    }
    
    static after(current) {
        return Seasons.#NEXT[current] ?? Seasons.SUMMER
    }
    
    static before(current) {
        return Seasons.#LAST[current] ?? Seasons.SUMMER
    }
    
    static belongsTo(season, range) {
        return (season & range) === season
    }
    
    static isWarm(season) {
        return Seasons.belongsTo(season, Seasons.WARM)
    }
    
    static isCold(season) {
        return Seasons.belongsTo(season, Seasons.COLD)
    }
    
    static getSeasonName(season) {
        return Seasons.#NAMES[season]
    }
    
    static iconsFor(seasons) {
        let result = ""
        if (Seasons.belongsTo(Seasons.SUMMER, seasons))
            result += `<span class="text-icon summer"></span>`
        if (Seasons.belongsTo(Seasons.AUTUMN, seasons))
            result += `<span class="text-icon autumn"></span>`
        if (Seasons.belongsTo(Seasons.WINTER, seasons))
            result += `<span class="text-icon winter"></span>`
        if (Seasons.belongsTo(Seasons.SPRING, seasons))
            result += `<span class="text-icon spring"></span>`
        return result
    }
}
