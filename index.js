const LIMIT = 10000;

const expenses = [];

const inputNode = document.querySelector('.js-expenses__input');
const buttonNode = document.querySelector('.js-expenses__btn');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

limitNode.innerText = LIMIT;

buttonNode.addEventListener('click', function() {
    // 1. Получаем значение из поля ввода
    if (!inputNode.value) {
        return;
    }

    const consumption = parseInt(inputNode.value);
    
    inputNode.value = "";

    // 2. Сохраняем трату в список
    expenses.push(consumption);

    // 3. Выводим новый список трат
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li>${element} руб.</li>`;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}`;

    //4. Посчитать сумму и вывести ее

    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    sumNode.innerText = sum;

    // 5. Сравнение с лимитом и вывод в статус
    if (sum <= LIMIT) {
        statusNode.innerText = 'Всё хорошо';
    } else {
        statusNode.innerText = 'Всё плохо';
        statusNode.classList.add('status_red');
    }  
       
});