// В script.js добавляем функции для работы с API
let username = prompt('Введите ваше имя пользователя:');

async function saveToServer() {
  try {
    const response = await fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        clickCount,
        achievements
      })
    });
    
    if (response.ok) {
      console.log('Данные сохранены на сервере');
    }
  } catch (error) {
    console.error('Ошибка сохранения:', error);
  }
}

async function loadFromServer() {
  try {
    const response = await fetch(`/load/${username}`);
    const data = await response.json();
    
    clickCount = data.clickCount;
    achievements = data.achievements;
    counter.innerText = clickCount;
    updateAchievementsList();
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  }
}

// Модифицируем saveProgress
function saveProgress() {
  saveToServer();
  // Сохраняем локально как резерв
  localStorage.setItem('clickCount', clickCount);
  localStorage.setItem('achievements', JSON.stringify(achievements));
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
  await loadFromServer();
  // Остальной код инициализации
});
