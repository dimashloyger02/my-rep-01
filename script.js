let username = prompt('Введите ваше имя пользователя:');

async function saveToServer() {
    try {
        await fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                data: {
                    clickCount: clickCount,
                    achievements: achievements
                }
            })
        });
    } catch (error) {
        console.error('Ошибка сохранения:', error);
    }
}

async function loadFromServer() {
    try {
        const response = await fetch(`http://localhost:3000/load/${username}`);
        const data = await response.json();
        
        clickCount = data.clickCount;
        achievements = data.achievements;
        counter.innerText = clickCount;
        updateAchievementsList();
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}

function saveProgress() {
    saveToServer();
    // Локальное сохранение как резерв
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadFromServer();
    // Остальной код инициализации
});
