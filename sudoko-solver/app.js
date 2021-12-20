const pullzeBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const clearButton = document.querySelector("#clear-button");
// const gnerateButton = document.querySelector("#generate-solved-puzzle");
const generateSudukoQuestion = document.querySelector("#generate-button");
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
  var matrix = [];
  var track = 0;
  for (let i = 0; i < 9; i++) {
    var met = [];
    for (let j = 0; j < 9; j++) {
      met.push(submission[track++]);
    }
    matrix.push(met);
  }
  solveSudoku(matrix);
  console.log(matrix);
  var k = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      inputs[k++].value = matrix[i][j];
    }
  }
};
solveButton.addEventListener("click", joinValues);
clearButton.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    // set background color to white
    input.style.backgroundColor = "white";
  });
  inputs.forEach((input) => {
    input.value = "";
  });
});

generateSudukoQuestion.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
  inputs.forEach((input) => {
    // set background color to white
    input.style.backgroundColor = "white";
  });
  var matrix = [];
  var track = 0;
  for (let i = 0; i < 9; i++) {
    var met = [];
    for (let j = 0; j < 9; j++) {
      met.push(Math.floor(Math.random() * 9) + 1);
    }
    matrix.push(met);
  }
  var k = 0;
  var arr = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var me = Math.floor(Math.random() * 8) + 1; // radnom number between 1 to 9
      if ((me == 3 || me == 2 || me == 1) && !arr.includes(matrix[i][j])) {
        inputs[k].value = matrix[i][j];
        // set background color
        inputs[k++].style.backgroundColor = "red";
        arr.push(matrix[i][j]);
      } else {
        inputs[k++].value = "";
      }
    }
  }
});

// line 102 to 135 is dedicated to solev suduko solver ends here
const solveSudoku = (g) => {
  dfs(g);
};

const dfs = (g) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (g[i][j] != ".") continue;
      for (let c = 1; c <= 9; c++) {
        if (isValid(g, i, j, c + "")) {
          g[i][j] = c + "";
          if (dfs(g)) return true;
          g[i][j] = ".";
        }
      }
      return false;
    }
  }
  return true;
};

const int = parseInt;
const isValid = (g, i, j, val) => {
  for (let k = 0; k < 9; k++) {
    if (g[k][j] != "." && g[k][j] == val) return false;
    if (g[i][k] != "." && g[i][k] == val) return false;
    let row = int(i / 3) * 3 + int(k / 3);
    let col = int(j / 3) * 3 + (k % 3);
    if (g[row][col] != "." && g[row][col] == val) return false;
  }
  return true;
};
