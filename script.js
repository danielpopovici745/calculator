function add(text) {
    let textArr = text.split("+");
    console.log(textArr);
    let numArr = textArr.map((current) => parseFloat(current));
    clearScreen();
    let addition = numArr[0] + numArr[1];
    displayScreen(addition);
}
function subtract(text) {
    let textArr = text.split("-");
    console.log(textArr);
    let numArr = textArr.map((current) => parseFloat(current));
    clearScreen();
    let subtraction = numArr[0] - numArr[1];
    displayScreen(subtraction);
}
function multiply(text) {
    let textArr = text.split("×");
    let numArr = textArr.map((current) => parseFloat(current));
    clearScreen();
    console.log(numArr);
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

function displayScreen(text){
    displaySpan = document.querySelector('#display span');
    if(text === '√' && Number.isInteger(parseInt(displaySpan.textContent[0]))){
        displaySpan.textContent = text + displaySpan.textContent;
    }
    else if (text[1] === '-' && Number.isInteger(parseInt(displaySpan.textContent[0]))) {
        displaySpan.textContent = text[1] + displaySpan.textContent;
    }
    else if(text[1] == '-'){
        displaySpan.textContent += text[1];
    }
    else{
        displaySpan.textContent += text;
    }
    
}

function clearScreen(){
    displaySpan.textContent='';
    operatorsEventListener();
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
    let negative = document.querySelector('#negative');
    negative.addEventListener('click',displayNumbers);
}

function numbersEventListener(){
    numbers = document.querySelectorAll('#numContainer button.display');
    numbers.forEach(function(number){
        number.addEventListener('click', displayNumbers);
    });
    
}

function displayNumbers(e){
    let text = e.target.textContent;
    displayScreen(text);
}

function displayOperator(e){
    let text = e.target.textContent;
    displayScreen(text);
    removeOperatorsListeners();
}

function removeOperatorsListeners(){
    sqaureRt.removeEventListener('click', displayOperator)
    operators.forEach(operator => operator.removeEventListener('click',displayOperator));
}
function calculatorStart(){
    equalsEventListener();
    numbersEventListener();
    negativeEventListener();
    operatorsEventListener();
    clearButtonEventListener();
}

calculatorStart();