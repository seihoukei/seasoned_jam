const fs = require("fs")

const files = fs.readdirSync(".")
    .filter(x => x.slice(0,2) !== "__")

let  output = `\
//DO NOT EDIT DIRECTLY
//USE locations/__build_locations.cjs

import Seasons from "../utility/seasons.js"

const LOCATIONS = {`

for (let file of files) {
    const id = file.slice(0,-3)
        //kebab-case to camelCase
        .replace(/-\S/g, (x) => x[1].toUpperCase())
    
    console.log(`building ${id}:`)
    const content = fs.readFileSync(file).toString()
    const match = content.match(/\/\*\+location_start\+\*\/([\s\S]*)\/\*\+location_end\+\*\//m)
    if (match) {
        console.log(`   location data found`)
        const location = match[1].replace(/\n/g, "\n    ")
        output += `\n    ${id}: ${location},\n`
    } else {
        console.log(`   location data not found`)
    }
}

output += `}

export default LOCATIONS`

fs.writeFileSync("../locations.js", output)
