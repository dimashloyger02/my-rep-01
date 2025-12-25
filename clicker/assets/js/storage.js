// Функция сохранения данных
function saveData() {
    localStorage.setItem('counter', counter);
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

// Функция загрузки данных
function loadData() {
    counter = localStorage.getItem('counter') || 0;
    achievements = JSON.parse(localStorage.getItem('achievements')) || [];
    counterElement.textContent = counter;
}

// Обработчик кнопки сохранения
document.getElementById('saveButton').addEventListener('click', saveData);

// Обработчик кнопки сброса
document.getElementById('resetButton').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
