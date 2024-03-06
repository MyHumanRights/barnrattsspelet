const fs = require('fs')
const path = require('path')

// Read the JSON file
const data = fs.readFileSync(
  path.join(__dirname, '../data/antagonists.json'),
  'utf-8'
)
const json = JSON.parse(data)

// Get the keys
const keys = Object.keys(json)

// Generate the TypeScript type
const type = `export type Antagonist = "${keys.join('" | "')}"`

// Write the type to a TypeScript file
fs.writeFileSync(path.join(__dirname, './antagonistType.ts'), type)
