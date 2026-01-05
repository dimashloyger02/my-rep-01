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

    // Дополнительно: сразу проверить достижения (на случай, если счётчик уже был сохранён)
    checkAchievementsIfAvailable(count);
});

// Функция увеличения счётчика
function increment() {
    count++;
    counterElement.textContent = count;

    // Сохраняем в localStorage
    localStorage.setItem('clicker_count', count);

    // Проверяем достижения (с защитой от отсутствия API)
    checkAchievementsIfAvailable(count);
    checkAchievements(clicks)
}

// Функция сброса счётчика
function resetCounter() {
    count = 0;
    counterElement.textContent = count;
    shareTextElement.value = '';

    // Сохраняем сброс
    localStorage.setItem('clicker_count', 0);

    // После сброса тоже проверяем достижения (могут быть условия на 0 кликов)
    checkAchievementsIfAvailable(0);
    checkAchievements(clicks)
}

// Функция для генерации текста для шеринга
function shareResult() {
    const message = `Я накликал ${count} кликов в кликере! А сколько ты сможешь?`;
    shareTextElement.value = message;
    shareTextElement.select();
}

// Вспомогательная функция: проверить достижения, если API доступно
function checkAchievementsIfAvailable(currentCount) {
    if (window.achievementsAPI && typeof window.achievementsAPI.checkAchievements === 'function') {
        window.achievementsAPI.checkAchievements(currentCount);
    } else {
        console.warn('API достижений недоступно. Убедитесь, что achievements.js загружен.');
    }
}

// Экспорт функций для внешних вызовов
window.clickerAPI = {
    increment,
    resetCounter,
    shareResult,
    getCount: () => count
};
