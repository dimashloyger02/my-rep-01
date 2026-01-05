// Элементы DOM
const counterElement = document.getElementById('counter');
const shareTextElement = document.getElementById('shareText');

// Счётчик кликов
let count = 0;

// Инициализация при загрузке
window.addEventListener('load', () => {
    // Восстанавливаем счётчик из localStorage (если есть)
    const savedCount = localStorage.getItem('clicker_count');
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        counterElement.textContent = count;
    }
});

// Функция увеличения счётчика
function increment() {
    count++;
    counterElement.textContent = count;
    // Передаём текущее значение в систему достижений
    window.achievementsAPI?.checkAchievements(count);
    // Сохраняем в localStorage
    localStorage.setItem('clicker_count', count);
}

// Функция сброса счётчика
function resetCounter() {
    count = 0;
    counterElement.textContent = count;
    shareTextElement.value = '';
    // Сохраняем сброс
    localStorage.setItem('clicker_count', 0);
}

// Функция для генерации текста для шеринга
function shareResult() {
    const message = `Я накликал ${count} кликов в кликере! А сколько ты сможешь?`;
    shareTextElement.value = message;
    shareTextElement.select();
}

// Экспорт функций для внешних вызовов
window.clickerAPI = {
    increment,
    resetCounter,
    shareResult,
    getCount: () => count
};
