//get operands from text into an array then use the operator the user selected.
function add(text) {
    let textArr = text.split("+");
    console.log(textArr);
    let numArr = textArr.map((current) => parseFloat(current));
    clearScreen();
    let addition = numArr[0] + numArr[1];
    displayScreen(addition);
}
function subtract(text) {
    let subtraction;
    let num1;

    let textArr = text.split("-")
    console.log(textArr);

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

    displayScreen(subtraction);
}
function multiply(text) {
    let textArr = text.split("×");

    let numArr = textArr.map((current) => parseFloat(current));

    clearScreen();

    let multiplication = numArr[0] * numArr[1];

    displayScreen(multiplication);
}
function divide(text) {
    let textArr = text.split("÷");
    console.log(textArr);

    let numArr = textArr.map((current) => parseFloat(current));

    clearScreen();

    let division = numArr[0] / numArr[1];

    displayScreen(division);
}
function sqRoot(text) {
    let textArr = text.split('√');

    let numArr = textArr.map((current) => parseFloat(current));

    clearScreen();

    let sqrt = Math.sqrt(numArr[1]).toFixed(4);

    displayScreen(sqrt);
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
    else if(text.includes('-')){
        subtract(text);
    }
}

//Controls what is displayed on the screen and how

function displayScreen(text){
    if(text === '√' && Number.isInteger(parseInt(displaySpan.textContent))){
        displaySpan.textContent = text + displaySpan.textContent;
    }
    else if (text[1] === '-' && Number.isInteger(parseInt(displaySpan.textContent)) && displaySpan.textContent.length == 1) {
        displaySpan.textContent = text[1] + displaySpan.textContent;
    }
    else if(text[1] == '-'){
        displaySpan.textContent += text[1];
    }
    else{
        displaySpan.textContent += text;
    }
    
}

function displayNumbers(e){
    let text = e.target.textContent;
    displayScreen(text);
}

function displayOperator(e){
    let text = e.target.textContent;
    if(text === '√'){
        removeNegativeEventListener();
    }
    displayScreen(text);
    removeOperatorsListeners();
}

function clearScreen(){
    displaySpan.textContent='';
    operatorsEventListener();
    negativeEventListener();
}

function clearButtonEventListener(){
    let clear = document.querySelector('#clr');
    clear.addEventListener('click',()=> clearScreen());
}

function equalsEventListener(){
    let equals = document.querySelector('#equals');
    equals.addEventListener('click',function (){
    let text = displaySpan.textContent;
    operate(text);
});
}

function operatorsEventListener(){
    operators = document.querySelectorAll('#operators button.display');
    sqaureRt = document.querySelector("#sqrt");
    sqaureRt.addEventListener('click', displayOperator);
    operators.forEach(operator => operator.addEventListener('click', displayOperator));

}

function negativeEventListener(){
    negative = document.querySelector('#negative');
    negative.addEventListener('click',displayNumbers);
}

function numbersEventListener(){
    numbers = document.querySelectorAll('#numContainer button.display');
    numbers.forEach(function(number){
        number.addEventListener('click', displayNumbers);
    });
    
}

function removeOperatorsListeners(){
    sqaureRt.removeEventListener('click', displayOperator)
    operators.forEach(operator => operator.removeEventListener('click',displayOperator));
}

function removeNegativeEventListener(){
    negative.removeEventListener('click',displayNumbers)
}
function calculatorStart(){
    equalsEventListener();
    numbersEventListener();
    negativeEventListener();
    operatorsEventListener();
    clearButtonEventListener();
}
let operatorPressed = false;
let displaySpan = document.querySelector('#display span');
calculatorStart();

window.addEventListener('keydown', keyPressed);

function keyPressed(e){
    let key = e.key;
    console.log(e);

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
        }
    }
    switch (true){
        case key >=0 && key <=9:
            displayScreen(key);
            break;
        case key == '-':
            displayScreen(key);
            break;
        case key == 'Enter':
            operate(displaySpan.textContent);
            operatorPressed = false;
            break;
        case key == "Backspace":
            displaySpan.textContent = displaySpan.textContent.slice(0,-1);
            operatorPressed = false;
            break;
    }
    
}