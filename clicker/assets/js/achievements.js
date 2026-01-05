// Массив достижений (теперь с сохранением в localStorage)
let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

// Функция добавления достижения
function addAchievement(name, condition, description) {
    const newAchievement = {
        id: Date.now(), // Уникальный ID (избегает коллизий)
        name,
        condition,
        description,
        unlocked: false,
        progress: 0 // Текущий прогресс (опционально)
    };
    
    achievements.push(newAchievement);
    saveAchievements(); // Сохраняем в localStorage
    updateList();
}

// Начальные достижения (только если список пустой)
if (achievements.length === 0) {
    addAchievement('Новичок', 10, 'Сделайте 10 кликов');
    addAchievement('Опытный игрок', 100, 'Сделайте 100 кликов');
    addAchievement('Мастер кликов', 500, 'Сделайте 500 кликов');
}

// Функция проверки достижений
function checkAchievements(counter) {
    achievements.forEach(achievement => {
        if (counter >= achievement.condition && !achievement.unlocked) {
            achievement.unlocked = true;
            achievement.progress = 100; // 100% прогресса
            saveAchievements();
            updateList();
            showUnlockNotification(achievement); // Уведомление о разблокировке
        } else if (!achievement.unlocked) {
            // Обновляем прогресс для незаблокированных
            achievement.progress = Math.min((counter / achievement.condition) * 100, 100);
        }
    });
}

// Сохранение в localStorage
function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

// Обновление списка достижений
function updateList() {
    const list = document.querySelector('.achievements-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.classList.add(achievement.unlocked ? 'unlocked' : 'locked');
        
        // Формируем текст с прогрессом
        let text = `${achievement.name}: ${achievement.description}`;
        if (!achievement.unlocked) {
            text += ` (${Math.floor(achievement.progress)}%)`;
        }
        
        li.textContent = text;
        list.appendChild(li);
    });
}

// Уведомление о разблокировке (опционально)
function showUnlockNotification(achievement) {
    alert(`🏆 Достижение разблокировано: ${achievement.name}!\n${achievement.description}`);
}

// Инициализация
window.addEventListener('load', () => {
    updateList();
});

// Экспорт функций для использования в других модулях
window.achievementsAPI = {
    addAchievement,
    checkAchievements,
    updateList
};
