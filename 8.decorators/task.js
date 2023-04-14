//Задача № 1
const cachingDecoratorNew = (func) => {
    const cache = [];
    return (...args) => {
      const hash = md5(JSON.stringify(args));
      const objectInCache = cache.find((item) => item.hash === hash);
      if (objectInCache) {
        console.log(`Из кеша: ${objectInCache.result}`);
        return `Из кеша: ${objectInCache.result}`;
      }
      const result = func(...args);
      cache.push({ hash, result });
      if (cache.length > 5) {
        cache.shift();
      }
      console.log(`Вычисляем: ${result}`);
      return `Вычисляем: ${result}`;
    };
  }

//Задача № 2
function debounceDecoratorNew(func, delay) {
  
}
