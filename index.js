const expenses = [];

const inputNode = document.querySelector('.js-expenses__input');
const buttonNode = document.querySelector('.js-expenses__btn');
const historyNode = document.querySelector('.js-history');

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
        const elementHTML = `<li>${element}</li>`
        expensesListHTML += elementHTML
    
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}`;
});