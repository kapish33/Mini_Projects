// text
const text = document.getElementById("text");
const output = document.getElementById("output");

// console text
text.addEventListener("keyup", function (e) {
  //   console.log(text.value);
  // split value into array by line
  const textArray = text.value.split("\n");

  const textArrayClean = textArray.map((element) => {
    // remove all voide spaces in element
    return element.replace(/\s+/g, "");
  });
  let optext = "";
  // loop through array
  textArrayClean.forEach((element) => {
    optext += `${element}\n`;
  });

  output.innerText = optext;
});
//-------------------------------
const span = document.querySelector("#output");

span.onclick = function () {
  document.execCommand("copy");
};

span.addEventListener("copy", function (event) {
  event.preventDefault();
  if (event.clipboardData) {
    // copy text to clipboard as new line
    event.clipboardData.setData("text/plain", output.innerText);
    alert("Copied to clipboard");
  }
});
