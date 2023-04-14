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

function debounceDecoratorNew(delay) {
  let timeoutId;
  let count = 0;
  let allCount = 0;

  return function (func) {
    function wrapper(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      } else {
        func.count = 0;
      }

      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);

      const result = func.apply(this, args);
      func.count++;
      count++;

      wrapper.count = func.count;
      wrapper.allCount = count;

      return result;
    }

    wrapper.count = 0;
    wrapper.allCount = 0;

    return wrapper;
  };
}

const debounce = debounceWithCount(1000);

function myFunc() {
  console.log("Function called");
}

const debouncedFunc = debounce(myFunc);

debouncedFunc(); // Function called
debouncedFunc(); // (no output)
debouncedFunc(); // (no output)

console.log(debouncedFunc.count); // 1
console.log(debouncedFunc.allCount); // 3

