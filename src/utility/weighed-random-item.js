export default function (list) {
    const totalWeight = list.reduce((v,x) => v + x.weight, 0)
    
    let value = Math.random() * totalWeight
    for (const item of list) {
        value -= item.weight
        if (value <= 0)
            return item
    }
    
    return list.at(-1)
}
