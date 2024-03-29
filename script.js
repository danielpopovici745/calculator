/* global operators:writable,squareRt:writable, negative:writable,numbers:writable */
// get operands from text into an array then use the operator the user selected.
function add(text) {
  const textArr = text.split("+");

  const numArr = textArr.map((current) => parseFloat(current));
  clearScreen();
  const addition = numArr[0] + numArr[1];
  if (addition < 0) {
    removeNegativeEventListener();
  } else {
    addNegativeEventListener();
  }
  displayScreen(parseFloat(addition.toFixed(4)));
}
function subtract(text) {
  let subtraction;

  const textArr = text.split("−");

  const numArr = textArr.map((current) => parseFloat(current));

  clearScreen();

  if (Number.isNaN(numArr[0]) && Number.isNaN(numArr[2])) {
    subtraction = -numArr[1] - -numArr[3];
  } else if (Number.isNaN(numArr[0])) {
    subtraction = -numArr[1] - numArr[2];
  } else if (Number.isNaN(numArr[1])) {
    subtraction = numArr[0] - -numArr[2];
  } else {
    subtraction = numArr[0] - numArr[1];
  }

  if (subtraction < 0) {
    removeNegativeEventListener();
  } else {
    addNegativeEventListener();
  }

  displayScreen(parseFloat(subtraction.toFixed(4)));
}
function multiply(text) {
  const textArr = text.split("×");

  const numArr = textArr.map((current) => parseFloat(current));

  clearScreen();

  const multiplication = numArr[0] * numArr[1];

  if (multiplication < 0) {
    removeNegativeEventListener();
  } else {
    addNegativeEventListener();
  }

  displayScreen(parseFloat(multiplication.toFixed(4)));
}
function divide(text) {
  const textArr = text.split("÷");

  const numArr = textArr.map((current) => parseFloat(current));

  clearScreen();

  const division = numArr[0] / numArr[1];

  if (division < 0) {
    removeNegativeEventListener();
  } else {
    addNegativeEventListener();
  }

  displayScreen(parseFloat(division.toFixed(4)));
}
function sqRoot(text) {
  const textArr = text.split("√");

  const numArr = textArr.map((current) => parseFloat(current));

  clearScreen();

  let sqrt;

  if (textArr[0] === "-") {
    sqrt = Math.sqrt(numArr[1]).toFixed(4);
    sqrt = -Math.abs(sqrt);
  } else {
    sqrt = Math.sqrt(numArr[1]).toFixed(4);
  }

  if (sqrt < 0) {
    removeNegativeEventListener();
  } else {
    addNegativeEventListener();
  }

  displayScreen(parseFloat(sqrt));
}
// Find which operator the user picked
function operate(text) {
  if ((text.includes("+") && text.includes("-")) || text.includes("+")) {
    add(text);
  } else if ((text.includes("×") && text.includes("-")) || text.includes("×")) {
    multiply(text);
  } else if ((text.includes("÷") && text.includes("-")) || text.includes("÷")) {
    divide(text);
  } else if ((text.includes("√") && text.includes("-")) || text.includes("√")) {
    sqRoot(text);
  } else if (text.includes("−")) {
    subtract(text);
  }
}

// Controls what is displayed on the screen and how

function displayScreen(text) {
  const screenNumber = Number(displaySpan.textContent);
  if (text === "√" && Number.isInteger(parseInt(displaySpan.textContent, 10))) {
    displaySpan.textContent = text + displaySpan.textContent;
  } else if (text[1] === "-" && screenNumber > 0) {
    displaySpan.textContent = text[1] + displaySpan.textContent;
  }
  // puts negative symbol before √ if present
  else if (text[1] === "-" && displaySpan.textContent.includes("√")) {
    displaySpan.textContent = text[1] + displaySpan.textContent;
  } else if (text[1] === "-") {
    displaySpan.textContent += text[1];
  } else {
    displaySpan.textContent += text;
  }
  operatorPresent();
}

function operatorPresent() {
  const numOfNegative = displaySpan.textContent.match(/[-]/g);
  const operatorOnScreen = displaySpan.textContent.match(/[+√×÷−]/g);
  const sqrtOnScreen = displaySpan.textContent.match(/[√]/g);
  const lastEntry = displaySpan.textContent[displaySpan.textContent.length - 1];

  if (operatorOnScreen) {
    removeOperatorsListeners();
    operatorPressed = true;
  } else {
    operatorsEventListener();
    operatorPressed = false;
  }

  negative: if (numOfNegative) {
    if (numOfNegative.length === 1 && operatorPressed && !sqrtOnScreen) {
      if (lastEntry === "-" || parseInt(lastEntry, 10)) {
        removeNegativeEventListener();
        break negative;
      }
      addNegativeEventListener();
    } else if (numOfNegative.length === 1) {
      removeNegativeEventListener();
    } else {
      removeNegativeEventListener();
    }
  }
}

function displayNumbers(e) {
  const text = e.target.textContent;
  numberOnScreen();
  displayScreen(text);
}

function numberOnScreen() {
  addNegativeEventListener();
  operatorsEventListener();
  clearButtonEventListener();
}

function displayOperator(e) {
  const text = e.target.textContent;
  displayScreen(text);
}

function clearScreen() {
  displaySpan.textContent = "";
  removeNegativeEventListener();
  removeOperatorsListeners();
  operatorPressed = false;
}

function clearButtonEventListener() {
  const clear = document.querySelector("#clr");
  clear.tabIndex = "-1";
  clear.addEventListener("click", () => clearScreen());
}

function equalsEventListener() {
  const equals = document.querySelector("#equals");
  equals.tabIndex = "-1";
  equals.addEventListener("click", () => {
    const text = displaySpan.textContent;
    operate(text);
  });
}

function operatorsEventListener() {
  operators = document.querySelectorAll("#operators button.display");
  operators.forEach((operator) => {
    const operatorPlacement = operator;
    operatorPlacement.tabIndex = "-1";
  });
  squareRt = document.querySelector("#sqrt");
  squareRt.tabIndex = "-1";
  squareRt.addEventListener("click", displayOperator);
  operators.forEach((operator) =>
    operator.addEventListener("click", displayOperator)
  );
}

function addNegativeEventListener() {
  negative = document.querySelector("#negative");
  negative.tabIndex = "-1";
  negative.addEventListener("click", displayNumbers);
}

function numbersEventListener() {
  numbers = document.querySelectorAll("#numContainer button.display");
  numbers.forEach((number) => {
    const numberPlacement = number;
    numberPlacement.addEventListener("click", displayNumbers);
    numberPlacement.tabIndex = "-1";
  });
}

function removeOperatorsListeners() {
  squareRt.removeEventListener("click", displayOperator);
  operators.forEach((operator) =>
    operator.removeEventListener("click", displayOperator)
  );
}

function removeNegativeEventListener() {
  negative.removeEventListener("click", displayNumbers);
}
function calculatorStart() {
  equalsEventListener();
  numbersEventListener();
}
let operatorPressed = false;
let displaySpan = document.querySelector("#display span");
calculatorStart();

window.addEventListener("keydown", keyPressed);

function keyPressed(e) {
  const { key } = e;

  if (!operatorPressed) {
    switch (key) {
      case "+":
        displayScreen("+");
        operatorPressed = true;
        break;
      case "/":
        displayScreen("÷");
        operatorPressed = true;
        break;
      case "x":
        displayScreen("×");
        operatorPressed = true;
        break;
      case "-":
        displayScreen("−");
        operatorPressed = true;
        break;
      default:
    }
  }
  switch (true) {
    case key >= 0 && key <= 9:
      displayScreen(key);
      break;
    case key === "Enter":
      operate(displaySpan.textContent);
      operatorPressed = false;
      break;
    case key === "Backspace":
      displaySpan.textContent = displaySpan.textContent.slice(0, -1);
      operatorPresent();
      break;
    default:
  }
}
