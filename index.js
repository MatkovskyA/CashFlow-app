const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

const inputNode = document.querySelector('.js-expenses__input');
const buttonNode = document.querySelector('.js-expenses__btn');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = [];

init(expenses);

buttonNode.addEventListener('click', function() {
    const consumption = getConsumptionFromUser();

    if (!consumption) {
        return;
    }

    trackConsumption(consumption);

    render(expenses);

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
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }  
};