document.addEventListener('DOMContentLoaded', function() {
    alert('Страница загружена, скрипт работает');
    
    // Пример дополнительной проверки
    var testElement = document.createElement('div');
    testElement.innerHTML = 'Тест';
    document.body.appendChild(testElement);
});
