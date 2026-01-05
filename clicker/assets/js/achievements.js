// Массив достижений (с загрузкой из localStorage)
let achievements = JSON.parse(localStorage.getItem('achievements')) || [
    { id: 1, name: 'Новичок', condition: 10, description: 'Сделайте 10 кликов', unlocked: false, progress: 0 },
    { id: 2, name: 'Опытный игрок', condition: 100, description: 'Сделайте 100 кликов', unlocked: false, progress: 0 },
    { id: 3, name: 'Мастер кликов', condition: 500, description: 'Сделайте 500 кликов', unlocked: false, progress: 0 }
];

// Функция проверки достижений
function checkAchievements(clicks) {
    achievements.forEach(achievement => {
        if (clicks >= achievement.condition && !achievement.unlocked) {
            achievement.unlocked = true;
            achievement.progress = 100;
            saveAchievements();
            updateList();
            showUnlockNotification(achievement);
        } else if (!achievement.unlocked) {
            achievement.progress = Math.min((clicks / achievement.condition) * 100, 100);
        }
    });
}

// Сохранение достижений в localStorage
function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

// Обновление списка достижений в интерфейсе
function updateList() {
    const list = document.querySelector('.achievements-list');
    if (!list) return;

    list.innerHTML = '';

    achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.classList.add(achievement.unlocked ? 'unlocked' : 'locked');

        let text = `<strong>${achievement.name}</strong>: ${achievement.description}`;
        if (!achievement.unlocked) {
            text += ` <span style="color:#6c757d;">(${Math.floor(achievement.progress)}%)</span>`;
        }

        li.innerHTML = text;
        list.appendChild(li);
    });
}

// Уведомление о разблокировке достижения
function showUnlockNotification(achievement) {
    alert(`🏆 Достижение разблокировано: ${achievement.name}!\n${achievement.description}`);
}

// Инициализация списка достижений при загрузке
window.addEventListener('load', () => {
    updateList();
});

// Экспорт API для внешних вызовов
window.achievementsAPI = {
    checkAchievements,
    updateList,
    addAchievement: (name, condition, description) => {
        const newAchievement = {
            id: Date.now(),
            name,
            condition,
            description,
            unlocked: false,
            progress: 0
        };
        achievements.push(newAchievement);
        saveAchievements();
        updateList();
    }
};
