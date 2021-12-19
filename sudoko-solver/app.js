const pullzeBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("maxlength", "1");
  inputElement.setAttribute("size", "1");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "9");
  inputElement.setAttribute("class", "square");
  pullzeBoard.appendChild(inputElement);
}
const joinValues = () => {
  submission.length = 0;
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
  console.log(submission);
};
solveButton.addEventListener("click", joinValues);
