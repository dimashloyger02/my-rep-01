// В init.js или другом месте
console.log('Файлы подключены:', 
  !!document.querySelector('link[href="css/style.css"]'),
  !!document.querySelector('script[src="js/core.js"]')
);
