class AlarmClock {

    constructor() {
      this.alarmCollection = [];
      this.intervalId = null;
    }
  
    addClock(time, callback, id) {
      if (!id) {
        throw new Error('Отсутствуют обязательные аргументы');
      }
      if (this.alarmCollection.some(alarm => alarm.id === id)) {
        console.warn('Уже присутствует звонок на это же время');
        return;
      }
      this.alarmCollection.push({id, time, callback, canCall: true});
    }
  
    removeClock(id) {
      const len = this.alarmCollection.length;
      this.alarmCollection = this.alarmCollection.filter(alarm => alarm.id !== id);
      return len !== this.alarmCollection.length;
    }
  
    getCurrentFormattedTime() {
      const now = new Date();
      let hours = now.getHours().toString();
      let minutes = now.getMinutes().toString();
      hours = hours.length === 1 ? '0' + hours : hours;
      minutes = minutes.length === 1 ? '0' + minutes : minutes;
      return hours + ':' + minutes;
    }
  
    start() {
      if (this.intervalId !== null) {
        return;
      }
      this.intervalId = setInterval(() => {
        this.alarmCollection.forEach(alarm => {
          if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
            alarm.canCall = false;
            alarm.callback();
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