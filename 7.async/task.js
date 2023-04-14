class AlarmClock {
    constructor() {
      this.alarmCollection = [];
      this.intervalId = null;
    }
  
    addClock(time, callback, id) {
      if (!id) {
        id = Math.random().toString().substr(2, 6);
      }
  
      if (this.alarmCollection.find(item => item.id === id)) {
        console.warn('Уже присутствует звонок с таким id');
        return;
      }
  
      this.alarmCollection.push({id, time, callback, canCall: true});
    }
  
    removeClock(id) {
      const index = this.alarmCollection.findIndex(item => item.id === id);
  
      if (index === -1) {
        return false;
      }
  
      this.alarmCollection.splice(index, 1);
      return true;
    }
  
    getCurrentFormattedTime() {
      return new Date().toTimeString().slice(0, 5);
    }
  
    start() {
      if (this.intervalId !== null) {
        return;
      }
  
      const checkClock = (alarm) => {
        if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      }
  
      this.intervalId = setInterval(() => {
        this.alarmCollection.forEach(item => checkClock(item));
      }, 1000);
    }
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  
    resetAllCalls() {
      this.alarmCollection.forEach(item => item.canCall = true);
    }
  
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
    }
  }
  
  // Пример использования
  const alarmClock = new AlarmClock();
  
  // добавляем звонки
  alarmClock.addClock("08:00", () => console.log("Звонок 1"), '1');
  alarmClock.addClock("08:01", () => console.log("Звонок 2"), '2');
  alarmClock.addClock("08:02", () => {
    console.log("Звонок 3");
    alarmClock.removeClock('2'); // удаляем звонок с id 2
  }, '3');
  
  // запускаем будильник
  alarmClock.start();
  
  // останавливаем будильник через 10 секунд
  setTimeout(() => alarmClock.stop(), 10000);
  
  // сбрасываем возможность запуска всех звонков и добавляем новый звонок
  setTimeout(() => {
    alarmClock.resetAllCalls();
    alarmClock.addClock("08:03", () => console.log("Звонок 4"), '4');
  }, 15000);
  
  // удаляем все звонки через 20 секунд
  setTimeout(() => alarmClock.clearAlarms(), 20000);