//get operands from text into an array then use the operator the user selected.
function add(text) {
    let textArr = text.split("+");
    
    let numArr = textArr.map((current) => parseFloat(current));
    clearScreen();
    let addition = numArr[0] + numArr[1];
    displayScreen(parseFloat(addition.toFixed(4)));
}
function subtract(text) {
    let subtraction;
    let num1;

    let textArr = text.split("−")

    let numArr = textArr.map((current) => parseFloat(current));

    clearScreen();

    if(Number.isNaN(numArr[0]) && Number.isNaN(numArr[2])){
        subtraction = -numArr[1] - -numArr[3];
    }
    else if(Number.isNaN(numArr[0])){
        subtraction = -numArr[1] - numArr[2];
    }
    else if(Number.isNaN(numArr[1])){
        subtraction = numArr[0] - -numArr[2];
    }
    else{
        subtraction = numArr[0] - numArr[1];
    }

    displayScreen(parseFloat(subtraction.toFixed(4)));
}
function multiply(text) {
    let textArr = text.split("×");

    let numArr = textArr.map((current) => parseFloat(current));

    clearScreen();

    let multiplication = numArr[0] * numArr[1];

    displayScreen(parseFloat(multiplication.toFixed(4)));
}
function divide(text) {
    let textArr = text.split("÷");
    

    let numArr = textArr.map((current) => parseFloat(current));

    clearScreen();

    let division = numArr[0] / numArr[1];

    displayScreen(parseFloat(division.toFixed(4)));
}
function sqRoot(text) {
    let textArr = text.split('√');

    let numArr = textArr.map((current) => parseFloat(current));

    clearScreen();

    let sqrt

    if (textArr[0] == "-"){
        sqrt = Math.sqrt(numArr[1]).toFixed(4);
        sqrt = -Math.abs(sqrt);
    }
    else{
        sqrt = Math.sqrt(numArr[1]).toFixed(4);
    }

    displayScreen(parseFloat(sqrt));
}
//Find which operator the user picked
function operate(text){
    if(text.includes('+') && text.includes('-') || text.includes('+')){
        add(text);
    }
    else if(text.includes('×') && text.includes('-') || text.includes('×')){
        multiply(text);
    }
    else if(text.includes('÷') && text.includes('-') || text.includes('÷')){
        divide(text);
    }
    else if(text.includes('√') && text.includes('-') || text.includes('√')){
        sqRoot(text);
    }
    else if(text.includes('−')){
        subtract(text);
    }
}

//Controls what is displayed on the screen and how

function displayScreen(text){
    let screenNumber = Number(displaySpan.textContent);
    if(text === '√' && Number.isInteger(parseInt(displaySpan.textContent))){
        displaySpan.textContent = text + displaySpan.textContent;
    }
    else if (text[1] === '-' && Number.isInteger(screenNumber) && screenNumber !== 0 && screenNumber > 0) {
        displaySpan.textContent = text[1] + displaySpan.textContent;

    }
    else if(text[1] == '-'){
        displaySpan.textContent += text[1];
    }
    else{
        displaySpan.textContent += text;
    }
    operatorPresent();
}

function operatorPresent(){
    let numOfNegative = displaySpan.textContent.match(/[-]/g);
    let operatorOnScreen = displaySpan.textContent.match(/[+√×÷−]/g);
    let sqrtOnScreen = displaySpan.textContent.match(/[√]/g);    

    if(operatorOnScreen){
        removeOperatorsListeners();
        operatorPressed = true;
    }
    else{
        operatorsEventListener();
        operatorPressed = false;
    }

    if(numOfNegative){
        if (numOfNegative.length == 1 && operatorPressed){
            addNegativeEventListener();
        }
        else if(numOfNegative.length == 1){
            removeNegativeEventListener();
        }
        else{
            removeNegativeEventListener();
        }
    }
}

function displayNumbers(e){
    let text = e.target.textContent;
    numberOnScreen();
    displayScreen(text);
}

function numberOnScreen(){
    addNegativeEventListener();
    operatorsEventListener();
}

function displayOperator(e){
    let text = e.target.textContent;
    if(text === '√'){
        removeNegativeEventListener();
    }
    displayScreen(text);
}

function clearScreen(){
    displaySpan.textContent='';
    removeNegativeEventListener();
    removeOperatorsListeners();
    operatorPressed = false;
}

function clearButtonEventListener(){
    let clear = document.querySelector('#clr');
    clear.tabIndex = '-1';
    clear.addEventListener('click',()=> clearScreen());
}

function equalsEventListener(){
    let equals = document.querySelector('#equals');
    equals.tabIndex = '-1';
    equals.addEventListener('click',function (){
    let text = displaySpan.textContent;
    operate(text);
});
}

function operatorsEventListener(){
    operators = document.querySelectorAll('#operators button.display');
    operators.forEach((operator) =>{ operator.tabIndex = '-1'
    });
    squareRt = document.querySelector("#sqrt");
    squareRt.tabIndex = '-1';
    squareRt.addEventListener('click', displayOperator);
    operators.forEach(operator => operator.addEventListener('click', displayOperator));

}

function addNegativeEventListener(){
    negative = document.querySelector('#negative');
    negative.tabIndex = '-1';
    negative.addEventListener('click',displayNumbers);
}

function numbersEventListener(){
    numbers = document.querySelectorAll('#numContainer button.display');
    numbers.forEach(function(number){
        number.addEventListener('click', displayNumbers);
        number.tabIndex = '-1';
    });
    
}

function removeOperatorsListeners(){
    squareRt.removeEventListener('click', displayOperator)
    operators.forEach(operator => operator.removeEventListener('click',displayOperator));
}

function removeNegativeEventListener(){
    hasListener = false;
    negative.removeEventListener('click',displayNumbers)
}
function calculatorStart(){
    equalsEventListener();
    numbersEventListener();
    clearButtonEventListener();
}
let operatorPressed = false;
let hasListener;
let displaySpan = document.querySelector('#display span');
calculatorStart();

window.addEventListener('keydown', keyPressed);

function keyPressed(e){
    let key = e.key;

    if(!operatorPressed){
        switch (key){
            case "+":
                displayScreen("+")
                operatorPressed = true
                break;
            case "/":
                displayScreen("÷")
                operatorPressed = true
                break;
            case "x":
                displayScreen("×")
                operatorPressed = true
                break;
            case '-':
                displayScreen('−');
                operatorPressed = true;
                break;
        }
    }
    switch (true){
        case key >=0 && key <=9:
            displayScreen(key);
            break;
        case key == 'Enter':
            operate(displaySpan.textContent);
            operatorPressed = false;
            break;
        case key == "Backspace":
            displaySpan.textContent = displaySpan.textContent.slice(0,-1);
            operatorPresent();
            break;
    }
}
