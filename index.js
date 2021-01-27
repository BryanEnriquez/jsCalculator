"use strict";
///// Calc v1.1 /////
///// 1-26-21   /////

// Element class selectors
const container = document.querySelector(".container");
const displayText = document.querySelector(".display-text");
const btnAdd = document.querySelector(".btn-add");
const btnSub = document.querySelector(".btn-sub");
const btnTimes = document.querySelector(".btn-times");
const btnDivide = document.querySelector(".btn-divide");
const btnSeven = document.querySelector(".btn-seven");
const btnEight = document.querySelector(".btn-eight");
const btnNine = document.querySelector(".btn-nine");
const btnEquals = document.querySelector(".btn-equals");
const btnFour = document.querySelector(".btn-four");
const btnFive = document.querySelector(".btn-five");
const btnSix = document.querySelector(".btn-six");
const btnOne = document.querySelector(".btn-one");
const btnTwo = document.querySelector(".btn-two");
const btnThree = document.querySelector(".btn-three");
const btnZero = document.querySelector(".btn-zero");
const btnDecimal = document.querySelector(".btn-decimal");
const btnClear = document.querySelector(".btn-clear");

// State variables
let [operandOne, operandTwo] = ["", ""];
let [opOneValid, opTwoValid] = [false, false];
let operator = "";
let clear = false;
let previousKeyPress;

const printVars = () => {
  console.log(`
  Operand One: ${operandOne}
  Operator: ${operator}
  Operand Two: ${operandTwo}
  Operation: ${operandOne} ${operator} ${operandTwo}
  opOneValid: ${opOneValid},  opTwoValid: ${opTwoValid}
  clear: ${clear}`);
};

const highlightKey = function (target) {
  if (!previousKeyPress) {
    target.classList.add("last-pressed"); // Add highlight
  } else {
    // Remove previously highlighted key
    previousKeyPress.classList.remove("last-pressed");
    target.classList.add("last-pressed"); // Add highlight
  }
  previousKeyPress = target; // Save to remove later
};

const updateDisplay = (val) => (displayText.textContent = val);

const pushNum = function (num) {
  highlightKey(this);

  // clear is TRUE if "=" was just pressed
  // Entering another number without CHAINING an operator
  // implies the user wants to SET operand one
  if (clear) {
    operandOne = num;
    clear = !clear; // Set back to false
    updateDisplay(operandOne);
    // If empty, then operand one is still being entered
  } else if (operator == "") {
    operandOne += num;
    opOneValid = true;
    updateDisplay(operandOne);
    // Else operand one is set and operator is set
  } else {
    operandTwo += num;
    opTwoValid = true;
    updateDisplay(operandTwo);
  }
  printVars();
};

const useOperator = function (op) {
  operandOne = Number(operandOne);
  switch (op) {
    case "-":
      operandOne -= operandTwo;
      break;
    case "+":
      operandOne += Number(operandTwo);
      break;
    case "/":
      operandOne /= operandTwo;
      break;
    case "*":
      operandOne *= operandTwo;
      break;
  }
  operandTwo = ""; // Clear 2nd operand
  opTwoValid = false; // Set to FALSE to build 2nd num
  updateDisplay(operandOne);
};

const addDec = function () {
  highlightKey(this);
  // clear is true if "=" was just pressed
  // Starting with . should clear operand one
  if (clear) {
    opOneValid = false; // set to FALSE until num is entered
    operandOne = ".";
    clear = !clear; // Set to false
    updateDisplay(operandOne);
    // True is operator ISN'T set and operand one has no decimal
  } else if (operator == "" && !operandOne.includes(".")) {
    operandOne += ".";
    updateDisplay(operandOne);
    // True is operator IS set and operand two has no decimal
  } else if (operator != "" && !operandTwo.includes(".")) {
    operandTwo += ".";
    updateDisplay(operandTwo);
  }
  printVars();
};

const pushOperator = function (nextOp) {
  highlightKey(this);
  // Scenarios:
  // clear is TRUE if "=" was just pressed, operator should also be ""
  // set clear to FALSE so 2nd operand can be added after
  // setting operator
  clear = false;
  // Operand one is valid
  if (opOneValid) {
    // if both operands and previous operator are already
    // set, then calculate result
    if (operator != "" && opTwoValid) {
      useOperator(operator);
      operator = nextOp; // Set next operator to use
      // updateDisplay(operandOne);
    } else {
      switch (nextOp) {
        case "-":
          if (operandOne == "") {
            operandOne += "-";
          } else if (opOneValid && operator == "") {
            operator = "-";
          } else if (operandTwo == "") {
            operandTwo += "-";
            updateDisplay(operandTwo);
          }
          break;
        case "+":
          if (operator == "") operator = "+";
          break;
        case "/":
          if (operator == "") operator = "/";
          break;
        case "*":
          if (operator == "") operator = "*";
          break;
      }
    }
  } else if (operandOne == "" && nextOp == "-") {
    operandOne += "-";
    updateDisplay(operandOne);
  }
  printVars();
};

const equals = function () {
  highlightKey(this);
  // If all args are valid then compute result
  if (opOneValid && operator != "" && opTwoValid) {
    useOperator(operator);
    operator = "";
    clear = true;
    // updateDisplay(operandOne);
  }
  printVars();
};

// Pass clicked number
btnZero.addEventListener("click", pushNum.bind(btnZero, "0"));
btnOne.addEventListener("click", pushNum.bind(btnOne, "1"));
btnTwo.addEventListener("click", pushNum.bind(btnTwo, "2"));
btnThree.addEventListener("click", pushNum.bind(btnThree, "3"));
btnFour.addEventListener("click", pushNum.bind(btnFour, "4"));
btnFive.addEventListener("click", pushNum.bind(btnFive, "5"));
btnSix.addEventListener("click", pushNum.bind(btnSix, "6"));
btnSeven.addEventListener("click", pushNum.bind(btnSeven, "7"));
btnEight.addEventListener("click", pushNum.bind(btnEight, "8"));
btnNine.addEventListener("click", pushNum.bind(btnNine, "9"));
// Add decimal
btnDecimal.addEventListener("click", addDec);

// Operators
btnAdd.addEventListener("click", pushOperator.bind(btnAdd, "+"));
btnSub.addEventListener("click", pushOperator.bind(btnSub, "-"));
btnTimes.addEventListener("click", pushOperator.bind(btnTimes, "*"));
btnDivide.addEventListener("click", pushOperator.bind(btnDivide, "/"));
btnEquals.addEventListener("click", equals.bind(btnEquals));

// Reset state data
btnClear.addEventListener("click", function () {
  highlightKey(this);
  displayText.textContent = "0";
  [operandOne, operandTwo, operator] = ["", "", ""];
  [opOneValid, opTwoValid, clear] = [false, false, false];
  printVars();
});

// Unselect current key
document.addEventListener("click", function (e) {
  // If click is outside container then remove highlight
  if (previousKeyPress && !container.contains(e.target)) {
    previousKeyPress.classList.remove("last-pressed");
  }
});
