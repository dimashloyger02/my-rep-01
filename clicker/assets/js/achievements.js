// Массив для хранения достижений
let achievements = [];

// Функция добавления нового достижения
function addAchievement(name, condition, description) {
    achievements.push({
        id: achievements.length + 1,
        name: name,
        condition: condition,
        description: description,
        unlocked: false
    });
    updateList(); // Обновляем список после добавления
}

// Начальные достижения
addAchievement('Новичок', 10, 'Сделайте 10 кликов');
addAchievement('Опытный игрок', 100, 'Сделайте 100 кликов');
addAchievement('Мастер кликов', 500, 'Сделайте 500 кликов');

// Функция проверки достижений
function checkAchievements() {
    achievements.forEach(achievement => {
        if (counter >= achievement.condition && !achievement.unlocked) {
            achievement.unlocked = true;
            updateList();
        }
    });
}

// Функция обновления списка достижений
function updateList() {
    const list = document.querySelector('.achievements-list');
    list.innerHTML = '';
    
    achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.classList.add(achievement.unlocked ? 'unlocked' : 'locked');
        li.textContent = `${achievement.name}: ${achievement.description}`;
        list.appendChild(li);
    });
}

// Инициализация списка при загрузке
window.addEventListener('load', () => {
    updateList();
});
