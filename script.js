function add(num1,num2) {
    return num1 + num2;
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

function operate(operator,num1,num2){
    add(num1,num2);
}

function displayScreen(text){
    displaySpan.textContent += text;
}

function clearScreen(){
    displaySpan.textContent='';
}

let displaySpan = document.querySelector('#display span');

//Numbers Event Listeners

let numbers = document.querySelectorAll('#numContainer button.display');
numbers.forEach(number => number.addEventListener('click',function getText(){
    let text = number.textContent;
    displayScreen(text);
}));

//Operators EventListeners

let operators = document.querySelectorAll('#operators button.display');
operators.forEach(operator => operator.addEventListener('click',function getText(){
    let text = operator.textContent;
    displayScreen(text);
}));


let clear = document.querySelector('#clr');
clear.addEventListener('click',()=> clearScreen());



