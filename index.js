const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

let inputNode = document.querySelector('.js-expenses__input');
let buttonNode = document.querySelector('.js-expenses__btn');
let historyNode = document.querySelector('.js-history');
let sumNode = document.querySelector('.js-sum');
let limitNode = document.querySelector('.js-limit');
let statusNode = document.querySelector('.js-status');
let button2Node = document.querySelector('.js-reset__btn');


let expenses = [];

init(expenses);

buttonNode.addEventListener('click', function() {
    const consumption = getConsumptionFromUser();

    if (!consumption) {
        return;
    }

    trackConsumption(consumption);

    render(expenses);

});

button2Node.addEventListener("click", function () {
    expenses = [];
    sumNode.innerText = expenses;
    historyNode.innerText = expenses;
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.style.color = 'green';
});

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpanses(expenses);
};

function trackConsumption(consumption) {
    expenses.push(consumption);
};

function getConsumptionFromUser() {
    if (!inputNode.value) {
        return null;
    }

    const consumption = parseInt(inputNode.value);
    
    clearInput();

    return consumption;
};

function clearInput() {
    inputNode.value = "";
};

function calculateExpanses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    return sum;
};

function render(expenses) {
    const sum = calculateExpanses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}`;
};

function renderSum(sum) {
    sumNode.innerText = calculateExpanses(expenses);
};

function renderStatus(sum) {
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.style.color = 'green';
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
        statusNode.style.color = 'red';

    }  
};