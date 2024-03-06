var fs = require('fs');
var path = require('path');
// Read the JSON file
var data = fs.readFileSync(path.join(__dirname, '../data/antagonists.json'), 'utf-8');
var json = JSON.parse(data);
// Get the keys
var keys = Object.keys(json);
// Generate the TypeScript type
var type = "export type Antagonist = \"".concat(keys.join('" | "'), "\"");
// Write the type to a TypeScript file
fs.writeFileSync(path.join(__dirname, './antagonistType.ts'), type);
