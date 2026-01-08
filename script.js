//Define variable
let num1 = "";
let num2 = "";
let operator = "";
let result = "";

let num1Debug = document.querySelector("#num1")
let num2Debug = document.querySelector("#num2")
let operatorDebug = document.querySelector("#operator")
let debugRes = document.querySelector("#res")
let calculationLogs = document.querySelector("#debug ul")

function quickDebug(){
  console.log("Num1:", num1)
  console.log("Num2:", num2)
  console.log("Operator:", operator)
}
function createCalculationLog(x, operator, y, res){
  let createdLog = document.createElement("li")
  createdLog.textContent = `${x} ${operator} ${y} = ${res}`
  calculationLogs.appendChild(createdLog)
}

//Function
function storeNumber(number) {
  if (num1 && !num2 && !operator && result) {
    num1 = "";
    num2 = "";
    operator = "";
    num1 += number;
    display.textContent = num1;
  } else if (!operator) {
    num1 += number;
    display.textContent = num1;
  } else if (operator) {
    num2 += number;
    display.textContent = num2;
  }
}

function reset() {
  num1 = "";
  num2 = "";
  operator = "";
  result = "";
  display.textContent = "";
}

function storeOperator(operatorAdded) {
  console.log("Store opeator!")
  console.log(`Num1:${num1}, Num2:${num2}`)
  if (num1!=='' && num2!=='') {
    console.log("Both numbers detected!")
    num1 = operate(operator, Number(num1), Number(num2));
    operator = operatorAdded;
    num2 = "";
    display.textContent = num1;
  } else {
    operator = operatorAdded;
  }
}

function quickDebug() {
  console.log(`Num 1: ${num1}`);
  console.log(`Operator: ${operator}`)
  console.log(`Num 2: ${num2}`);
}

//Calculate results and return
function operate(operation, x, y) {
  //If no operator exist
  if (operation == "") {
    reset();
    return;
  }

  console.log(x,y)
  if(isNaN(x)){
    console.log("NAN")
    num1 = ""
    num2 = ""
    operator = ""
    alert("This operation is not allowed. All variables have been resetted. Please choose a number")
    return "x"
  }

  // Prevent division by 0
  if (operation === "/" && y === 0) {
    alert("This operation is not allowed");
  }

  //Reset num2 and operator to default state since we store results in num1 variable
  num2 = "";
  operator = "";
  let res = null;
  switch (operation) {
    case "+":
      res = x + y;
      break;
    case "-":
      res = x - y;
      break;
    case "*":
      res = x * y;
      break;
    case "/":
      res = x / y;
      break;
  }
  createCalculationLog(x, operation, y, res)

  return res
}

//Get the buttons
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const display = document.querySelector(".display");

//Loop through all number buttons and add appropriate behavior
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", (e) => {
    let numberToBeAdded = e.target.textContent;
    storeNumber(numberToBeAdded);
  });
}

//Loop through all the operators and add appropriate behavior
for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener("click", (e) => {
    let operatorToBeAdded = e.target.textContent;
    storeOperator(operatorToBeAdded);
  });
}

//Add functionality to the equal button
equalButton.addEventListener("click", () => {
  result = operate(operator, Number(num1), Number(num2));
  if(result==="x") return
  if (operator != "") {
    num1 = result;
    num2 = "";
  }
  num1 = result;
  display.textContent = result;
});

//Debug Button
// let debugButton = document.querySelector(".debug");
// debugButton.addEventListener("click", () => {
//   console.log(`Num1: ${num1}`);
//   console.log(`Operator: ${operator}`);
//   console.log(`Num2: ${num2}`);
//   //   console.log(`State: ${state}`);
// });

//Clear Button
let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  reset();
});
