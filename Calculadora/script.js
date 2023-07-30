const checkTheme = document.getElementById("btnTheme");
const output = document.querySelector("div.output");

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;

      case "–":
        result = _previousOperand - _currentOperand;
        break;

      case "÷":
        result = _previousOperand / _currentOperand;
        break;

      case "×":
        result = _previousOperand * _currentOperand;
        break;

      case "^":
        result = _previousOperand ** _currentOperand;
        break;

      case "/":
        result = parseInt(_previousOperand / _currentOperand);
        break;

      case "%":
        if (_previousOperand != "")
          result = _previousOperand * (_currentOperand / 100);
        break;

      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) integerDisplay = "";
    else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) return `${integerDisplay}.${decimalDigits}`;
    else return integerDisplay;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  chooseOperation(operation) {
    if (this.currentOperand == "") return;

    if (this.previousOperand != "") {
      calculator.calculate();
    }

    this.operation = operation;
    this.previousOperand = `${this.currentOperand}`;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number == ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

function escuro() {
  document.body.style.background = "#282A36";
  document.body.style.color = "#ffffff";
  output.style.background = "#1c1c1c";

  previousOperandTextElement.style.color = "#f4f4f4";
  currentOperandTextElement.style.color = "white";

  equalsButton.classList.remove("operator-light");
  equalsButton.classList.add("operator-dark");

  allClearButton.classList.remove("operator-light");
  allClearButton.classList.add("operator-dark");

  deleteButton.classList.remove("operator-light");
  deleteButton.classList.add("operator-dark");

  for (const numberButton of numberButtons) {
    numberButton.classList.remove("numeric-light");
    numberButton.classList.add("numeric-dark");
  }

  for (const operationButton of operationButtons) {
    operationButton.classList.remove("operator-light");
    operationButton.classList.add("operator-dark");
  }
}

function claro() {
  document.body.style.background = "azure";
  document.body.style.color = "#000000";
  output.style.background = "#b8b4b4";

  previousOperandTextElement.style.color = "rgba(15, 14, 14, 0.75)";
  currentOperandTextElement.style.color = "rgb(31, 29, 29)";

  equalsButton.classList.remove("operator-dark");
  equalsButton.classList.add("operator-light");

  allClearButton.classList.remove("operator-dark");
  allClearButton.classList.add("operator-light");

  deleteButton.classList.remove("operator-dark");
  deleteButton.classList.add("operator-light");

  for (const numberButton of numberButtons) {
    numberButton.classList.remove("numeric-dark");
    numberButton.classList.add("numeric-light");
  }

  for (const operationButton of operationButtons) {
    operationButton.classList.remove("operator-dark");
    operationButton.classList.add("operator-light");
  }
}

checkTheme.addEventListener("change", function () {
  if (checkTheme.checked) {
    escuro();
  } else {
    claro();
  }
});
