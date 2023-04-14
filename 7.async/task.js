class AlarmClock {
    constructor() {
      this.alarmCollection = [];
      this.intervalId = null;
    }
  
    addClock(time, callback, id) {
      if (!id) {
        id = Math.random().toString(36).substr(2, 9);
      }
      if (this.alarmCollection.some(alarm => alarm.id === id)) {
        console.warn('Звонок с таким id уже существует');
        return;
      }
      this.alarmCollection.push({ id, time, callback });
    }
  
    removeClock(id) {
      const index = this.alarmCollection.findIndex(alarm => alarm.id === id);
      if (index === -1) {
        console.warn('Звонок с таким id не найден');
        return;
      }
      this.alarmCollection.splice(index, 1);
    }
  
    getCurrentFormattedTime() {
      const now = new Date();
      return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }
  
    start() {
      if (this.intervalId !== null) {
        return;
      }
      this.intervalId = setInterval(() => {
        const currentTime = this.getCurrentFormattedTime();
        this.alarmCollection.forEach(alarm => {
          if (alarm.time === currentTime) {
            if (alarm.canCall) {
              alarm.canCall = false;
              alarm.callback();
            }
          } else {
            alarm.canCall = true;
          }
        });
      }, 1000);
    }
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  
    resetAllCalls() {
      this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }
  
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
    }
  }
  
  const clock = new AlarmClock();
  
  // Добавляем звонок на 10:30
  clock.addClock('10:30', () => console.log('Просыпайся!'), 1);
  
  // Пробуем добавить звонок на то же время (должно вывести предупреждение)
  clock.addClock('10:30', () => console.log('Вставай!'), 2);
  
  // Добавляем звонок на 10:35
  clock.addClock('10:35', () => console.log('Пора вставать!'), 3);
  
  // Удаляем звонок с id = 2
  clock.removeClock(2);
  
  // Запускаем будильник
  clock.start();
  
  // Ждем 10 секунд и останавливаем будильник
  setTimeout(() => {
    clock.stop();
  }, 10000);
  
  // Ждем еще 5 секунд и сбрасываем возможность запуска всех звонков
  setTimeout(() => {
    clock.resetAllCalls();
  }, 15000);
  
  // Ждем еще 5 секунд и удаляем все звонки
  setTimeout(() => {
    clock.clearAlarms();
  }, 20000);