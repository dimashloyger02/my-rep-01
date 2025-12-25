// Инициализация основных переменных
let counter = 0;
const counterElement = document.getElementById('counter');

// Основная функция клика
function clickButton() {
    counter++;
    counterElement.textContent = counter;
    checkAchievements();
}

// Привязка обработчика
document.getElementById('clickButton').addEventListener('click', clickButton);
