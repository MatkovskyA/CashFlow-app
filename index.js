const LIMIT = 10000;
const CURRENCY = 'руб.';

//Объявление переменных строковых + цвет
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

// Объявление ссылок из HTML документа
const inputNode = document.querySelector('.js-expenses__input');
const buttonNode = document.querySelector('.js-expenses__btn');
const categorySelectedNode = document.querySelector('.js-category__select');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const button2Node = document.querySelector('.js-reset__btn');

// Объявление основной переменной, которая пополняется нажатием кнопки "Добавить"
let expenses = [];

init(expenses);

// ФУНКЦИИ ------------------------------------------
// Добавление значения через нажатие на кнопку
buttonNode.addEventListener('click', function() {
    const consumption = getConsumptionFromUser();

    if (!consumption) {
        return;
    }

    trackConsumption(consumption);
    render(expenses);
});


// Сброс трат и обнуление истории
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

// Возвращает выбранную пользователем категорию


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
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} руб.)`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
        statusNode.style.color = 'red';

    }  
};