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