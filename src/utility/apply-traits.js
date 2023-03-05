export default function (base, traits, modifier) {
    const modifiers = traits
        .filter(x => x.active)
        .map(x => x.modifier)
        .filter(x => x[modifier])
        .map(x => x[modifier])
    
    return modifiers
        .reduce((v,x) => x(v), base)
}
