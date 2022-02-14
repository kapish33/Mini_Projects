const inputMessage = document.getElementById("inputMessage");
let finalText = "";
inputMessage.addEventListener("keyup", function (event) {
  finalText = inputMessage.value;
});
const handelfunction = (e) => {
  let finnalText = `${e} ${finalText}`;
  // copy to clipboard
  copyToClipboard(finnalText);

  // redirect to home page
  // window.location.href = "https://wa.me/+917984399290";
};
const copyToClipboard = (text) => {
  // Create a textarea element
  var textArea = document.createElement("textarea");
  // Set its value to the string that you want copied
  textArea.value = text;
  // Set its ID to "temp_element"
  textArea.id = "temp_element";
  // Now append it to the HTML document
  document.body.appendChild(textArea);
  // Select it
  textArea.select();
  // Copy its contents
  document.execCommand("copy");
  // Remove it from the document
  document.body.removeChild(textArea);
  // redirect to home page
  alert("Copied to clipboard");
  inputMessage.value = "";
  // window.location.href = "https://wa.me/+917984399290";
  setTimeout(() => {
    window.location.href = "https://wa.me/+917984399290";
  }, 1000);
};
