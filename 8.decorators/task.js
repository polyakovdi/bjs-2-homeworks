//Задача № 1
    const md5 = require('js-md5');

    function cachingDecoratorNew(func) {
      const cache = [];
    
      function wrapper(...args) {
        const hash = md5(JSON.stringify(args)); // получаем хеш аргументов в JSON-формате
        const index = cache.findIndex(item => item.hash === hash); // ищем элемент по хешу аргументов
        
        if (index !== -1) { // если элемент найден в кеше
          const { value } = cache[index];
          console.log(`Из кеша: ${value}`);
          cache.push(cache.splice(index, 1)[0]); // перемещаем найденный элемент в конец кеша
          return `Из кеша: ${value}`;
        }
    
        const result = func(...args);
        console.log(`Вычисляем: ${result}`);
    
        if (cache.length >= 5) { // удаляем первый элемент кеша при превышении его длины
          cache.shift();
        }
    
        cache.push({ hash, value: result });
        return `Вычисляем: ${result}`;
      }
    
      return wrapper;
    }
    
    // Пример использования:
    const addAndMultiply = (a, b, c) => (a + b) * c;
    const upgraded = cachingDecoratorNew(addAndMultiply);
    
    console.log(upgraded(1, 2, 3)); // Вычисляем: 9
    console.log(upgraded(1, 2, 3)); // Из кеша: 9
    console.log(upgraded(2, 2, 3)); // Вычисляем: 12
    console.log(upgraded(3, 2, 3)); // Вычисляем: 15
    console.log(upgraded(4, 2, 3)); // Вычисляем: 18
    console.log(upgraded(5, 2, 3)); // Вычисляем: 21
    console.log(upgraded(6, 2, 3)); // Вычисляем: 18
    console.log(upgraded(1, 2, 3)); // Вычисляем: 9


//Задача № 2
function debounceDecoratorNew(func, delay) {
  
}
