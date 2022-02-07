const buttons = document.querySelector(".button");

buttons.onclick = function () {
  const fisrtKey = document.querySelector("#fisrtKey").value;
  const firtsValue = document.querySelector("#firtsValue").value;
  const secondKey = document.querySelector("#secondKey").value;
  const secondValue = document.querySelector("#secondValue").value;
  const thirdKet = document.querySelector("#thirdKet").value;
  const thirdValue = document.querySelector("#thirdValue").value;

  const array = [];
  if (fisrtKey && firtsValue) {
    array.push({ [fisrtKey]: firtsValue });
  }
  if (secondKey && secondValue) {
    array.push({ [secondKey]: secondValue });
  }
  if (thirdKet && thirdValue) {
    array.push({ [thirdKet]: thirdValue });
  }
  let str = "!setOptions ";
  for (let i = 0; i < array.length; i++) {
    for (let key in array[i]) {
      str += `{${key}: ${array[i][key]}}`;
      if (i < array.length - 1) {
        str += ",";
      }
    }
  }
  console.log(str);
  //   console.log(array);
  //   copy the str to clipboard
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Copied to clipboard");
};
