const pullzeBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-butto");
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
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value !== "") {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
};
solveButton.addEventListener("click", () => {
  joinValues();
  const solution = solveSudoku(submission);
  if (solution) {
    alert("Solved");
  } else {
    alert("Unsolvable");
  }
});

function solveSudoku(submission) {
  const board = submission.slice();
  const empty = findEmpty(board);
  if (!empty) {
    return true;
  }
  for (let i = 1; i <= 9; i++) {
    if (isValid(board, empty, i)) {
      board[empty] = i;
      if (solveSudoku(board)) {
        return true;
      }
      board[empty] = ".";
    }
  }
  return false;
}
