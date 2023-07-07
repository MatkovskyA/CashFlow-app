// поле ввода суммы трат
const inputNode = document.querySelector('.js-expenses__input');
// кнопка добавить 
const addButtonNode = document.querySelector('.js-expenses__btn');
//кнопка обнуления истории трат
const resetButtonNode = document.querySelector('.js-reset__btn');
// отображение заданного лимита
const limitNode = document.querySelector('.js-limit');
// отображение итоговой суммы расходов
const sumNode = document.querySelector('.js-sum');
// статус расходов
const statusNode = document.querySelector('.js-status');
// определение поля отображения истории
const historyListNode = document.querySelector('.js-history');
// выбор категории
const categorySelectedNode = document.querySelector('.js-category__select');
// задаем новый лимит 
const changeLimitBtn = document.querySelector('.js-change__limit');

// лимит суммы расходов
let limit = parseInt(limitNode.innerText);
// значение валюты
const CURRENCY = 'руб.';

//Объявление переменных строковых + цвет
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const NEW_LIMIT_TEXT = 'Задайте новый лимит';
// Объявление основной переменной с тратами, которая пополняется нажатием кнопки "Добавить"
// РАСХОДЫ!
let expenses = [];


// ФУНКЦИИ ------------------------------------------
// итоговая сумма трат
function getTotal() {
    let sum = 0;
    expenses.forEach((expense) => { // 1 РАСХОД !!!
        sum += expense.amount; // amount - количество
    })
    return sum;
}
// определяем значение статуса, в зависимости от суммы трат к лимиту
function renderStatus() {
    const total = getTotal(expenses);
    sumNode.innerText = total;

    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.style.color = 'green';
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total}) ${CURRENCY}`;
        statusNode.style.color = 'brown';
    }
};
//---------------------------------------------------------------
//получение числа введенной пользователем суммы трат
getExpenseFromUser = () => parseInt(inputNode.value);
//полуяение категории траты
getSelectCategory = () => categorySelectedNode.value;
//
function render() {
    renderStatus();
    renderHistory();
}
// приводим значение инпута к ""
const clearInput = function (input) {
    input.value = '';
}
// добавляем значения категории, траты и "руб" в историю трат
// каждое новое значение добавлется в конец списка
function renderHistory() {
    historyListNode.innerHTML = "";
    expenses.forEach((expense) => {
        const historyItem = document.createElement("li");
        historyItem.innerText = `${expense.category} - ${expense.amount} ${CURRENCY}`;
        historyListNode.appendChild(historyItem);
    });
};
// выводим значение через кнопку "добавить"; если значение пустое - алерт!
function addBtnHandler() {
    const currentAmount = getExpenseFromUser();
    if (!currentAmount || currentAmount === "") {
        alert('Внесите сумму расходов');
        return;
    }
// сохраняем выбранную категорию пользователем; если не выбрано - алерт!
const currentCategory = getSelectCategory();
if (currentCategory === "Категория") {
    alert('Выберите категорию расходов');
    return;
}
// задаем новое значение - трата+категория
    const newExpence = {amount: currentAmount, category: currentCategory};

    expenses.push(newExpence);


    render();

    clearInput(inputNode);
}

// обновлем поля ввода и историю после нажатия 
function clearBtnHandler() {
    expenses = [];
    render();
    statusNode.innerText = '';
}

function changeLimitIconHandler() {
    const newLimit = prompt(NEW_LIMIT_TEXT);
    const newLimitValue = parseInt(newLimit);

    if (!newLimitValue) {
        return
    }

    limitNode.innerText = newLimitValue;
    limit = newLimitValue;

    render();
}

// //обработчик по нажатию передает введенные данные пользователя
addButtonNode.addEventListener('click', addBtnHandler);
//обработчик по нажатию обнуляет введенные данные истории, статуса, итоговой суммы.
resetButtonNode.addEventListener("click", clearBtnHandler);
//обработчик по нажатию задает новый лимит 
changeLimitBtn.addEventListener('click', changeLimitIconHandler)
