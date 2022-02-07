/*
[
    { body: "No" },
    { body: "Yes" },
]
*/

let text = `!setOptions {key1: value1},{key2: value2}`;
// !setOptions to "";
let options = text
  .replace(/^!setOptions\s*(.*)/, "$1")
  .replaceAll("{", "")
  .replaceAll("}", "");
let optionsArray = options.split(",");
let optionsObject = [];
for (let i = 0; i < optionsArray.length; i++) {
  // push key value pair to optionsObject
  let keyValue = optionsArray[i].split(":");
  optionsObject.push({
    [keyValue[0].trim()]: keyValue[1].trim(),
  });
}
console.log(optionsObject);
