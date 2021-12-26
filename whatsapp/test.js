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
+91123456789
+91888888888
91123456789
5666979
91986111111
3311111111
45454545
9145  45454
`;
// console.log(value);
let setNumbers = [];
if (value.startsWith("!setNumbers ")) {
  // remove !setNumbers
  value = value.replace("!setNumbers", "");
  value = value.trim();
  // seplit by new line
  // if number not starts with +91 then remove + or not contain 91 then add 91 and remove voided number and space in between number
  value.split("\n").forEach((number) => {
    if (number.startsWith("+")) {
      number = number.replace("+", "");
    }
    if (!number.startsWith("91")) {
      number = "91" + number;
    }
    setNumbers.push(number);
  });
}
console.log(setNumbers);
