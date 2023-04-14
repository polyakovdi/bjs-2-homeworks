function cachingDecoratorNew(func) {
  let cache = [];

function wrapper(...args) {
    const hash = args.join(','); // получаем правильный хэш
    let idx = cache.findIndex((item)=> item.hash === hash ); // ищем элемент, хэш которого равен нашему хэшу
    if (idx !== -1 ) { // если элемент не найден
        console.log("Из кэша: " + cache[idx].result); // индекс нам известен, по индексу в массиве лежит объект, как получить нужное значение?
        return "Из кэша: " + cache[idx].result;
    }

    let result = func(...args); // в кэше результата нет - придётся считать
    cache.push({hash, result}) ; // добавляем элемент с правильной структурой
    if (cache.length > 5) { 
      cache.shift() // если слишком много элементов в кэше надо удалить самый старый (первый) 
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;  
}
return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let count = 0;
  let allCount = 0;
  
  function wrapper(...args) {
    
    if (!timeoutId) {
      func.apply(this, args);
      count++;
    } else {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func.apply(this, args);
      count++;
    }, delay);
  }
  
  wrapper.count = function() {
    return count;
  }
  
  wrapper.allCount = function() {
    return allCount;
  }
  
  return wrapper;
}

