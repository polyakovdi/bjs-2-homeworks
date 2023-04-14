class AlarmClock {
    constructor() {
      this.alarmCollection = []; // массив звонков
      this.intervalId = null; // id для таймера
    }
  
    addClock(time, callback, id) { // добавление нового звонка
      if (!id) { // если id не передан, используется автоматически сгенерированный
        id = Math.random().toString();
      }
      // проверка наличия звонка с таким же временем
      let isExist = this.alarmCollection.some(alarm => alarm.id === id);
      if (isExist) {
        console.warn('Уже присутствует звонок на это же время');
        return;
      }
      // добавляем звонок
      this.alarmCollection.push({
        id,
        time,
        callback,
        canCall: true
      });
    }
  
    removeClock(id) { // удаление звонка
      let index = this.alarmCollection.findIndex(alarm => alarm.id === id);
      if (index !== -1) {
        this.alarmCollection.splice(index, 1);
        return true;
      }
      return false;
    }
  
    getCurrentFormattedTime() { // текущее время в формате HH:MM
      let date = new Date();
      let hours = date.getHours().toString().padStart(2, 0);
      let minutes = date.getMinutes().toString().padStart(2, 0);
      return `${hours}:${minutes}`;
    }
  
    start() { // запуск будильника
      if (this.intervalId === null) {
        // создаем интервал в 1 секунду для проверки звонков
        this.intervalId = setInterval(() => {
          this.alarmCollection.forEach(alarm => {
            // проверяем возможность запуска звонка
            if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
              alarm.canCall = false; // устанавливаем признак запуска звонка
              alarm.callback(); // вызываем колбек
            }
          })
        }, 1000);
      }
    }
  
    stop() { // остановка будильника
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  
    resetAllCalls() { // сброс возможности запуска всех звонков
      this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }
  
    clearAlarms() { // удаление всех звонков
      this.stop();
      this.alarmCollection = [];
    }
  }
  
  // создаем экземпляр будильника
  let alarmClock = new AlarmClock();
  
  // добавляем звонки
  alarmClock.addClock("08:00", () => console.log("Спать пора"), 1);
  alarmClock.addClock("08:01", () => {console.log("Вставай уже!"); alarmClock.removeClock(2)}, 2);
  alarmClock.addClock("08:01", () => console.log("Не проспи!"), 3);
  
  // стартуем будильник
  alarmClock.start();