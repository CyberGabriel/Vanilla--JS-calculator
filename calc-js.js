const numberBtn = document.querySelectorAll('.numberBtn');
const operatorBtn = document.querySelectorAll('.operatorBtn');
const clearBtn = document.querySelector('#clear');
const equalBtn = document.querySelector('#equal');
const decimalBtn = document.querySelector('#decimalPoint');

const currentDisplay = document.querySelector('.currentDisplay');
const previousDisplay = document.querySelector('.previous');
const pastOperationsDisplay = document.querySelector('.past');
const backSpace = document.querySelector('#backSpace');

let result = 0;
let myNumber = "";
let previousOperation = false;
let currentOperand = "";
let afterEqual = false;
let chooseOperation = true;
let status = 1;
currentDisplay.innerText = 0;
let allowBackSpace = false;

function animateCurrentDisplay() {
    if (status == 1) {
        currentDisplay.classList.add("feedbackDisplay");
        currentDisplay.classList.remove("feedbackDisplay2");
        status = 2;
    } else if (status == 2) { 
        currentDisplay.classList.add("feedbackDisplay2");
        currentDisplay.classList.remove("feedbackDisplay");
        status = 1;
    }
}

function buildNumber(btVal) {
    myNumber += btVal;
    currentDisplay.innerText = myNumber;
    animateCurrentDisplay();
    if (afterEqual === true) {
            result = Number(myNumber);
    }
    currentDisplay.classList.remove("currentDisplayFade");
    currentDisplay.classList.add("currentDisplay");
    allowBackSpace = true;
}

function updatePreviousDisplay(opVal) {
        previousDisplay.innerText += currentDisplay.innerText + opVal;
}

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        buildNumber(button.value);
        chooseOperation = true;
    })
})

decimalBtn.addEventListener('click', () => {
    if (myNumber.indexOf(".") == -1) {
        buildNumber(decimalBtn.value);
    } return;
})

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (chooseOperation === true) {
            updatePreviousDisplay(button.value);
            if (afterEqual === true) {
                currentOperand = button.value;
                previousOperation = true;
                myNumber = "";
                afterEqual = false;
                currentDisplay.classList.remove("currentDisplay");
                currentDisplay.classList.add("currentDisplayFade");
            } else {
                if (previousOperation === true) {
                    compute(currentOperand);
                    currentOperand = button.value;
                    animateCurrentDisplay();
                } else {
                    currentOperand = button.value;
                    previousOperation = true;
                    result = Number(myNumber);
                    myNumber = "";
                    currentDisplay.classList.remove("currentDisplay");
                    currentDisplay.classList.add("currentDisplayFade");
                    }
                }
        chooseOperation = false;
        allowBackSpace = false;
        } return;

    })
})

function compute(operation) {
    switch(operation) {
        case "+":
            result += Number(myNumber);
            currentDisplay.innerText = result;
            myNumber = "";
            currentOperand = "";
            chooseOperation = true;
            break;
        case "*":
            result *= Number(myNumber);
            currentDisplay.innerText = result;
            myNumber = "";
            currentOperand = "";
            chooseOperation = true;
            break;
        case "-":
            result -= Number(myNumber);
            currentDisplay.innerText = result;
            myNumber = "";
            currentOperand = "";
            chooseOperation = true;
            break;
        case "/":
            if (result == 0 && Number(myNumber) == 0) {
                currentDisplay.innerText = "Result is undefined";
                result = 0;
                myNumber = "";
                currentOperand = "";
                chooseOperation = false;
                break;
            } else if (Number(myNumber) == 0) {
                currentDisplay.innerText = "Cannot divide by zero";
                result = 0;
                myNumber = "";
                currentOperand = "";
                chooseOperation = false;
                break;
            } else {
                result /= Number(myNumber);
                currentDisplay.innerText = result;
                myNumber = "";
                currentOperand = "";
                chooseOperation = true;
                break;
            }
        case "":
            myNumber = "";
    }
}

equalBtn.addEventListener('click', () => {
    if (currentOperand == "") {
        return;
    } else {
        pastOperationsDisplay.innerText = previousDisplay.innerText + myNumber;
        compute(currentOperand);
        animateCurrentDisplay();
        previousDisplay.innerText = "";
        previousOperation = false;
        afterEqual = true;
        allowBackSpace = false;
    }
})

clearBtn.addEventListener('click', () => {
    result = 0;
    animateCurrentDisplay();
    myNumber = "";
    previousOperation = false;
    currentOperand = "";
    currentDisplay.innerText = "";
    previousDisplay.innerText = "";
    pastOperationsDisplay.innerText = "";
    currentDisplay.innerText = 0;
    afterEqual = false;
    chooseOperation = true;
    allowBackSpace = false;
    currentDisplay.classList.remove("currentDisplayFade");
    currentDisplay.classList.add("currentDisplay");
})

function backspace () {
    if (allowBackSpace) {
        if (myNumber.length < 2) {
            myNumber = "";
            currentDisplay.innerText = 0;
            animateCurrentDisplay();
        } else {
            myNumber = myNumber.slice(0, -1);
            currentDisplay.innerText = myNumber;
            animateCurrentDisplay();
        }
    }
}

backSpace.addEventListener('click', backspace);