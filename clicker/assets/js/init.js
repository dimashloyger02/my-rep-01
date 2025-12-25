document.addEventListener('DOMContentLoaded', () => {
    // Загружаем сохраненные данные
    loadData();
    updateAchievementsList();
    
    // Дополнительные инициализации
    // ...
});

// В init.js или другом месте
alert('Файлы подключены:', 
  !!document.querySelector('link[href="css/style.css"]'),
  !!document.querySelector('script[src="js/core.js"]')
);
