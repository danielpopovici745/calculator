function add(text) {
    let textArr = text.split("+");
    let numArr = textArr.map((current) => parseInt(current));
    clearScreen();
    let addition = numArr[0] + numArr[1];
    displayScreen(addition);
}
function subtract(num1,num2) {
    return num1 - num2;
}
function multiply(num1,num2) {
    return num1 * num2;
}
function divide(num1,num2) {
    return num1 / num2;
}
function sqroot(num1) {
    return Math.sqrt(num1);
}
//Find which operator the user picked
function operate(text){
    let textArr = [...text];

    if(textArr.find((element) => element == '+') === '+'){
        add(text);
    }
}

function displayScreen(text){
    displaySpan.textContent += text;
}

function clearScreen(){
    displaySpan.textContent='';
    operatorsEventListener();
}

function operatorsEventListener(){
    operators = document.querySelectorAll('#operators button.display');
    operators.forEach(operator => operator.addEventListener('click', displayOperator));
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
    operators.forEach(operator => operator.removeEventListener('click',displayOperator));
}

let displaySpan = document.querySelector('#display span');
numbersEventListener();
operatorsEventListener();

//Numbers Event Listeners



//Operators EventListeners



let clear = document.querySelector('#clr');
clear.addEventListener('click',()=> clearScreen());

// Equals EventListener

let equals = document.querySelector('#equals');
equals.addEventListener('click',function (){
    let text = displaySpan.textContent;
    operate(text)
})

