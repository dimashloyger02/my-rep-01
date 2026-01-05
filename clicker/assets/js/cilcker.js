const counterElement = document.getElementById('counter');
        const shareTextElement = document.getElementById('shareText');
        let count = 0;

        function increment() {
            count++;
            counterElement.textContent = count;
        }

        function resetCounter() {
            count = 0;
            counterElement.textContent = count;
            shareTextElement.value = ''; // Очищаем текст при сбросе
        }

        function shareResult() {
            const message = `Я накликал ${count} кликов в кликере! А сколько ты сможешь?`;
            shareTextElement.value = message;
            
            // Автоматически выделяем текст для удобства копирования
            shareTextElement.select();
        }
