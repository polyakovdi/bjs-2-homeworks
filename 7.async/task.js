class AlarmClock { 
  constructor() { 
    this.alarmCollection = []; 
    this.intervalId = null; 
  } 
 
  addClock(time, callback) { 
    if (!time || callback === undefined) { 
      throw new Error("Отсутствуют обязательные аргументы"); 
    } 
    if (this.alarmCollection.some((alarm) => alarm.time === time)) { 
      console.warn("Уже присутствует звонок на это же время"); 
    } 
    this.alarmCollection.push({ time, callback, canCall: true }); 
  } 
  removeClock(time) { 
    this.alarmCollection = this.alarmCollection.filter( 
      (alarm) => alarm.time !== time 
    ); 
  } 
 
  getCurrentFormattedTime() { 
    return new Date().toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit", 
    }); 
  } 
  start() { 
    if (this.intervalId) { 
      return; 
    } 
    this.intervalId = setInterval( 
      () => 
        this.alarmCollection.forEach((alarm) => { 
          if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) { 
            alarm.canCall = false; 
            alarm.callback(); 
          } 
        }), 
      1000 
    ); 
  } 
  stop() { 
    clearInterval(this.intervalId); 
    this.intervalId = null; 
  } 
  resetAllCalls() { 
    this.alarmCollection.forEach((alarm) => (alarm.canCall = true)); 
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
  alarmClock.addClock("08:02", () => console.log("Звонок 3"), '3');
  alarmClock.removeClock('2'); // удаляем звонок с id 2 
  
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