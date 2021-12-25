// console.log("test");
// const csvFilePath = "./Sheet1.csv"; // this is for import only
// const csv = require("csvtojson");
// const numbers = [];
// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     console.log(jsonObj);
//     for (let i = 0; i < jsonObj.length; i++) {
//       let number = jsonObj[i]["Name"];
//       //   remove + sumbole if exists in string
//       if (number.includes("+")) {
//         number = number.replace("+", "");
//       }
//       // if not contains 91 in strating then add 91
//       if (!number.startsWith("91")) {
//         number = "91" + number;
//       }
//       numbers.push(number);
//     }
//     console.log(numbers);
//   });
let value = `!setNumbers 
+9888888888
91986111111
3311111111
45454545
914545454
`;
// console.log(value);
let setNumbers = [];
if (msg.body.startsWith("!setNumbers ")) {
  // remove !setNumbers
  value = value.replace("!setNumbers", "");
  // seplit by new line
  let lines = value.trim().split("\n");
  // if lines doen't conatin 91 then add 91
  for (let i = 0; i < lines.length; i++) {
    let number = lines[i];
    if (!number.startsWith("91")) {
      number = "91" + number;
    }
    setNumbers.push(number);
  }
  // if lines contains + then remove it
  for (let i = 0; i < setNumbers.length; i++) {
    let number = setNumbers[i];
    if (number.includes("+")) {
      number = number.replace("+", "");
    }
    setNumbers[i] = number;
  }
}
console.log(setNumbers);
